"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { menuItems, type MenuItem } from "../lib/menu";

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
  const [cart, setCart] = useState<Record<string, number>>({});
  const [isOpen, setIsOpen] = useState(false);

  const lines = useMemo(
    () => menuItems.filter((item) => cart[item.id]),
    [cart],
  );
  const count = Object.values(cart).reduce(
    (sum, quantity) => sum + quantity,
    0,
  );
  const total = lines.reduce(
    (sum, item) => sum + item.price * (cart[item.id] ?? 0),
    0,
  );

  function add(item: MenuItem) {
    setCart((current) => ({
      ...current,
      [item.id]: (current[item.id] ?? 0) + 1,
    }));
  }

  function change(id: string, delta: number) {
    setCart((current) => {
      const next = { ...current };
      const quantity = (next[id] ?? 0) + delta;
      if (quantity <= 0) delete next[id];
      else next[id] = quantity;
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
