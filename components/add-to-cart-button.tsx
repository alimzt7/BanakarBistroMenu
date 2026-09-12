"use client";

import type { MenuItem } from "../lib/menu";
import { useCart } from "./cart-context";
import { Icon } from "./icons";

export function AddToCartButton({
  item,
  label = "افزودن به سفارش",
}: {
  item: MenuItem;
  label?: string;
}) {
  const { add, open } = useCart();

  function handleAdd() {
    add(item);
    open();
  }

  return (
    <button
      className="primary-button w-full justify-between"
      onClick={handleAdd}
    >
      {label}
      <Icon name="plus" size={16} />
    </button>
  );
}
