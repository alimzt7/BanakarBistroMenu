"use client";

import { useState } from "react";
import type { MenuItem, ProductVariant } from "../lib/menu";
import { formatPrice } from "../lib/menu";
import { Icon } from "./icons";

interface VariantModalProps {
  item: MenuItem;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (itemWithVariant: MenuItem) => void;
}

export function VariantModal({
  item,
  isOpen,
  onClose,
  onAddToCart,
}: VariantModalProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    item.variants?.[0] ?? {
      id: "default",
      nameFa: "ساده",
      nameEn: "Basic",
      price: item.price,
    },
  );

  if (!isOpen || !item.variants?.length) return null;

  const handleConfirm = () => {
    onAddToCart({
      ...item,
      id: `${item.id}-${selectedVariant.id}`, // برای اینکه تو سبد خرید با نسخه ساده تداخل نکنه
      price: selectedVariant.price,
      selectedVariant: selectedVariant,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md transition-all duration-300 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-neutral-900 border border-white/10 p-6 shadow-2xl text-paper"
        onClick={(e) => e.stopPropagation()} // جلوگیری از بستن موقع کلیک روی بدنه مودال
        dir="rtl"
      >
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div>
            <span className="text-xs font-semibold text-[#eb5e28] tracking-wide">
              انتخاب نوع سرو
            </span>
            <h3 className="text-xl font-bold mt-1 text-white">{item.nameFa}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Icon name="close" size={20} />
          </button>
        </div>

        <div className="mt-5 space-y-3">
          {item.variants.map((variant) => {
            const isSelected = selectedVariant.id === variant.id;
            return (
              <label
                key={variant.id}
                onClick={() => setSelectedVariant(variant)}
                className={`flex items-center justify-between p-3.5 rounded-xl cursor-pointer border transition-all duration-200 ${
                  isSelected
                    ? "border-[#ffc000] bg-[#ffc000]/10 text-white shadow-sm"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20 text-neutral-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                      isSelected
                        ? "border-[#ffc000] bg-[#ffc000]"
                        : "border-white/30 bg-transparent"
                    }`}
                  >
                    {isSelected && (
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </div>
                  <div>
                    <span className="block font-medium text-sm">
                      {variant.nameFa}
                    </span>
                    <span className="block text-[10px] text-white/40 tracking-wider">
                      {variant.nameEn}
                    </span>
                  </div>
                </div>

                <div className="text-sm font-bold">
                  {formatPrice(variant.price)}{" "}
                  <span className="text-[10px] font-normal text-white/60">
                    تومان
                  </span>
                </div>
              </label>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-white/10 text-sm font-medium hover:bg-white/5 transition-colors"
          >
            انصراف
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="flex-[2] py-2.5 rounded-xl bg-[#ffc000] text-[var(--ink)] text-sm font-bold shadow-lg shadow-[#ffc000]/25 hover:brightness-110 active:scale-[0.98] transition-all"
          >
            افزودن به سبد • {formatPrice(selectedVariant.price)}
          </button>
        </div>
      </div>
    </div>
  );
}
