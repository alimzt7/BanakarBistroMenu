"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { MenuItem } from "../lib/menu";

type CartContextValue = {
  cart: Record<string, number>;
  lines: MenuItem[];
  count: number;
  total: number;
  isOpen: boolean;
  add: (item: MenuItem) => void;
  change: (id: string, delta: number) => void;
  open: () => void;
  close: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  // ذخیره تعداد: { "14-pomodoro-pasta-with-chicken": 1 }
  const [cart, setCart] = useState<Record<string, number>>({});
  // ذخیره اطلاعات کامل هر آیتم اضافه شده (شامل واریانت انتخابی و قیمت دقیق آن)
  const [items, setItems] = useState<Record<string, MenuItem>>({});
  const [isOpen, setIsOpen] = useState(false);

  // حالا lines مستقیماً از آیتم‌های واقعی سبد خرید ساخته می‌شه، نه آرایه استاتیک
  const lines = useMemo(() => {
    return Object.keys(cart)
      .filter((id) => (cart[id] ?? 0) > 0 && items[id])
      .map((id) => items[id]);
  }, [cart, items]);

  const count = useMemo(
    () => Object.values(cart).reduce((sum, quantity) => sum + quantity, 0),
    [cart],
  );

  const total = useMemo(
    () =>
      lines.reduce((sum, item) => sum + item.price * (cart[item.id] ?? 0), 0),
    [lines, cart],
  );

  function add(item: MenuItem) {
    // ۱. اطلاعات کامل آیتم رو در حافظه نگه می‌داریم
    setItems((current) => ({
      ...current,
      [item.id]: item,
    }));

    // ۲. تعدادش رو افزایش می‌دیم
    setCart((current) => ({
      ...current,
      [item.id]: (current[item.id] ?? 0) + 1,
    }));

    // در صورت تمایل سبد خرید باز بشه
    setIsOpen(true);
  }

  function change(id: string, delta: number) {
    setCart((current) => {
      const next = { ...current };
      const quantity = (next[id] ?? 0) + delta;
      if (quantity <= 0) {
        delete next[id];
        // تمیزکاری حافظه آیتم‌ها وقتی تعداد صفر شد
        setItems((currentItems) => {
          const nextItems = { ...currentItems };
          delete nextItems[id];
          return nextItems;
        });
      } else {
        next[id] = quantity;
      }
      return next;
    });
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        lines,
        count,
        total,
        isOpen,
        add,
        change,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used inside CartProvider");
  return value;
}
