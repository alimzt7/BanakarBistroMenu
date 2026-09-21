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
  clear: () => void;
  open: () => void;
  close: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [items, setItems] = useState<Record<string, MenuItem>>({});
  const [isOpen, setIsOpen] = useState(false);

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
    setItems((current) => ({
      ...current,
      [item.id]: item,
    }));

    setCart((current) => ({
      ...current,
      [item.id]: (current[item.id] ?? 0) + 1,
    }));

    setIsOpen(true);
  }

  function change(id: string, delta: number) {
    setCart((current) => {
      const next = { ...current };
      const quantity = (next[id] ?? 0) + delta;
      if (quantity <= 0) {
        delete next[id];
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

  function clear() {
    setCart({});
    setItems({});
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
        clear,
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
