"use client";

import { useState } from "react";
import { formatPrice } from "../lib/menu";
import { useCart } from "./cart-context";
import { Icon } from "./icons";
import { tables } from "../lib/tables";
import Image from "next/image";

export function CartDrawer() {
  const { cart, lines, total, isOpen, close, change, clear } = useCart();
  const [confirmed, setConfirmed] = useState(false);
  const [tableNumber, setTableNumber] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function submitOrder() {
    if (!tableNumber || lines.length === 0 || submitting) return;

    setSubmitting(true);
    setError("");

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tableNumber,
        items: lines.map((item) => ({
          productId: item.productId ?? item.id,
          productName: item.nameFa,
          variantName: item.selectedVariant?.nameFa ?? null,
          quantity: cart[item.id] ?? 0,
          unitPrice: item.price,
        })),
      }),
    });

    setSubmitting(false);

    if (!response.ok) {
      setError("ثبت سفارش انجام نشد. دوباره تلاش کن.");
      return;
    }

    clear();
    setConfirmed(true);
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex justify-end bg-ink/60 backdrop-blur-sm"
      onClick={close}
    >
      <aside
        className="cart-drawer"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-ink/15 px-6 py-4 md:px-8">
          <div>
            <p className="eyebrow text-copper">میز شما</p>
            <h2 className="display mt-2 text-2xl">انتخاب شما برای لذت بردن</h2>
          </div>
          <button
            className="icon-button icon-button-light"
            onClick={close}
            aria-label="بستن سبد"
          >
            <Icon name="close" size={17} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 md:px-8">
          {confirmed ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <span className="success-orb">
                <Icon name="spark" size={28} />
              </span>
              <p className="display mt-6 text-3xl leading-[0.8]">
                ثبت شد.
                <br />
                به زودی می بینیمتون
              </p>
              <p className="mt-5 max-w-[260px] text-xs leading-6 text-ink/55">
                این نسخه یک تجربه‌ی نمایشی است؛ سفارش شما برای تست رابط کاربری
                ثبت شد.
              </p>
              <button
                className="mt-7 text-[10px] font-bold uppercase tracking-[0.15em] underline underline-offset-4"
                onClick={close}
              >
                بازگشت به منو
              </button>
            </div>
          ) : lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-ink/70">
              <span className="empty-bag">
                <Icon name="bag" size={28} />
              </span>
              <p className="display mt-6 text-3xl leading-[0.8]">
                آیتم دیگری وجود ندارد.
              </p>
              <p className="mt-4 max-w-[250px] text-xs leading-6 text-ink/50">
                یک طعم انتخاب کن، بقیه‌ی شب خودش اتفاق می‌افتد.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {lines.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 border-b border-ink/10 pb-5"
                >
                  <Image
                    src={item.image}
                    alt=""
                    width={70}
                    height={70}
                    className="h-[70px] w-[70px] shrink-0 object-cover grayscale-[0.12] rounded-lg"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="display text-xl leading-[0.8]">
                          {item.nameFa}
                        </p>

                        {item.selectedVariant && (
                          <span className="inline-block mt-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-[#ffc000]/15 text-[#ffc000]">
                            {item.selectedVariant.nameFa} (
                            {item.selectedVariant.nameEn})
                          </span>
                        )}

                        <p className="mt-1.5 font-sans text-[9px] uppercase tracking-[0.13em] text-ink/45">
                          {item.nameEn}
                        </p>
                      </div>
                      <p className="font-sans text-xs font-bold">
                        {formatPrice(item.price * (cart[item.id] ?? 0))}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      <button
                        className="quantity-button"
                        onClick={() => change(item.id, -1)}
                        aria-label="کم کردن"
                      >
                        <Icon name="minus" size={12} />
                      </button>
                      <span className="min-w-4 text-center font-sans text-xs">
                        {cart[item.id]}
                      </span>
                      <button
                        className="quantity-button"
                        onClick={() => change(item.id, 1)}
                        aria-label="زیاد کردن"
                      >
                        <Icon name="plus" size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {!confirmed && (
          <div className="border-t border-ink/15 px-6 py-6 md:px-8">
            <label className="field-label mb-5 block">
              نام میز
              <select
                value={tableNumber}
                onChange={(event) => setTableNumber(event.target.value)}
                required
              >
                <option value="">انتخاب میز</option>
                {tables.map((table) => (
                  <option key={table.value} value={table.value}>
                    {table.label}
                  </option>
                ))}
              </select>
            </label>

            <div className="mb-4 flex items-center justify-between font-sans text-xs uppercase tracking-[0.12em]">
              <span>جمع سفارش</span>
              <span className="font-bold">{formatPrice(total)} تومان</span>
            </div>
            <button
              className="primary-button w-full justify-between disabled:cursor-not-allowed disabled:opacity-35"
              disabled={lines.length === 0 || !tableNumber || submitting}
              onClick={submitOrder}
            >
              {submitting ? "در حال ثبت..." : "تایید سفارش"}{" "}
              <Icon name="arrow-up-left" size={17} />
            </button>
            {error && (
              <p className="mt-3 text-center text-xs text-red-600">{error}</p>
            )}
          </div>
        )}
      </aside>
    </div>
  );
}
