"use client";

import Link from "next/link";
import { useState } from "react";
import type { MenuItem } from "../lib/menu";
import { formatPrice } from "../lib/menu";
import { useCart } from "./cart-context";
import { Icon } from "./icons";

export function MenuCard({
  item,
  index = 0,
}: {
  item: MenuItem;
  index?: number;
}) {
  const [saved, setSaved] = useState(false);
  const { add } = useCart();
  const tall = index % 5 === 0;

  return (
    <article
      className={
        "menu-card group flex flex-col overflow-hidden " +
        (tall ? "menu-card-tall" : "")
      }
    >
      <Link href={"/menu/" + item.slug} className="relative block h-full">
        <div
          className={"menu-card-media " + (tall ? "menu-card-media-tall" : "")}
        >
          <img src={item.image} alt={item.nameFa} />
          <div className="menu-card-shade" />
          <div className="absolute right-4 top-4 flex items-center gap-2">
            <span className="pill pill-paper">{item.tag}</span>
            <span className="pill pill-dark">{item.category}</span>
          </div>
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              setSaved((value) => !value);
            }}
            className="save-button"
            aria-label={saved ? "حذف از علاقه‌مندی‌ها" : "ذخیره کردن غذا"}
          >
            <Icon name="heart" size={16} filled={saved} />
          </button>
          <div className="absolute bottom-5 right-5 left-5 flex items-end justify-between text-paper">
            <div>
              <p className="font-sans text-[9px] font-bold tracking-[0.16em] text-paper/60">
                {item.id} / {item.category}
              </p>
              <h3 className="display mt-2 text-[1.8rem] leading-[0.76]">
                {item.nameFa}
              </h3>
              <p className="mt-2 font-sans text-[9px] uppercase tracking-[0.14em] text-paper/60">
                {item.nameEn}
              </p>
            </div>
            <span className="display text-3xl">{formatPrice(item.price)}</span>
          </div>
        </div>
      </Link>
      <div
        className={
          "flex items-start gap-4 p-5 " +
          (item.id === "04" ? "bg-coal text-paper" : "bg-paper text-ink")
        }
      >
        <p
          className={
            "min-h-[42px] flex-1 text-xs leading-6" +
            (item.id === "04" ? "text-paper/60" : "text-ink/60")
          }
        >
          {item.description && item.description.length > 50
            ? item.description.slice(0, 50) + "..."
            : item.description}
        </p>
        <button
          onClick={() => add(item)}
          className={
            "mini-add-button" +
            " " +
            (item.id === "04" ? "mini-add-button-dark" : "")
          }
          aria-label={"افزودن " + item.nameFa + " به سفارش"}
        >
          <Icon name="plus" size={15} />
        </button>
      </div>
    </article>
  );
}
