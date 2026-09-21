"use client";

import Link from "next/link";
import { useState } from "react";
import type { MenuItem } from "../lib/menu";
import { formatPrice } from "../lib/menu";
import { useCart } from "./cart-context";
import { Icon } from "./icons";
import { VariantModal } from "./variant-modal";
import Image from "next/image";

export function MenuCard({ item }: { item: MenuItem }) {
  const [saved, setSaved] = useState(false);
  const [isVariantModalOpen, setIsVariantModalOpen] = useState(false);
  const { add } = useCart();

  const handleAddClick = () => {
    if (item.isAvailable === false) return;

    if (item.variants && item.variants.length > 0) {
      setIsVariantModalOpen(true);
    } else {
      add(item);
    }
  };

  return (
    <>
      <article
        className={`menu-card group flex h-[380px] flex-col overflow-hidden ${
          item.isAvailable === false ? "menu-card-sold-out" : ""
        }`}
      >
        <Link href={"/menu/" + item.slug} className="relative block">
          <div className="menu-card-media">
            <Image
              src={item.image}
              alt={item.nameFa}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover"
            />
            <div className="menu-card-shade" />
            <div className="absolute right-4 top-4 flex items-center gap-2">
              {item.isFeatured && (
                <span className="pill pill-featured">
                  <Icon name="spark" size={11} />
                  پیشنهاد ویژه
                </span>
              )}
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
                  {item.category}
                </p>
                <h3 className="display mt-2 text-[1.3rem] leading-[0.76]">
                  {item.nameFa}
                </h3>
                <p className="mt-2 font-sans text-[9px] uppercase tracking-[0.14em] text-paper/60">
                  {item.nameEn}
                </p>
              </div>
            </div>
            {item.isAvailable === false && (
              <div className="sold-out-overlay">فعلاً تمام شده</div>
            )}
          </div>
        </Link>
        <div className="flex justify-around items-start h-full gap-4 p-5">
          <div className="flex justify-start flex-col gap-2">
            <p className="flex-1 text-sm">
              {item.description && item.description.length > 50
                ? item.description.slice(0, 25) + "..."
                : item.description}
            </p>
            <p className="font-bold">
              {formatPrice(item.price)}{" "}
              <span className="font-thin text-xs">تومان</span>
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddClick}
            disabled={item.isAvailable === false}
            className={
              "mini-add-button" +
              " " +
              (item.id === "04" ? "mini-add-button-dark" : "") +
              (item.isAvailable === false ? " mini-add-button-disabled" : "")
            }
            aria-label={
              item.isAvailable === false
                ? item.nameFa + " فعلاً تمام شده"
                : "افزودن " + item.nameFa + " به سفارش"
            }
          >
            <Icon name="plus" size={15} />
          </button>
        </div>
      </article>

      <VariantModal
        item={item}
        isOpen={isVariantModalOpen}
        onClose={() => setIsVariantModalOpen(false)}
        onAddToCart={(itemWithVariant) => add(itemWithVariant)}
      />
    </>
  );
}
