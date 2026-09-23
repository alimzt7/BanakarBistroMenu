"use client";

import { useState } from "react";
import { tables } from "../lib/tables";
import { createClient } from "../lib/supabase/client";
import { Icon } from "./icons";

export function WaiterCallButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [tableNumber, setTableNumber] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function openModal() {
    setSent(false);
    setError("");
    setIsOpen(true);
  }

  function closeModal() {
    if (submitting) return;
    setIsOpen(false);
    setTableNumber("");
    setError("");
  }

  async function submit() {
    if (!tableNumber || submitting) return;

    setSubmitting(true);
    setError("");

    const { error: insertError } = await createClient()
      .from("waiter_calls")
      .insert({ table_number: tableNumber });

    setSubmitting(false);

    if (insertError) {
      setError("ارسال درخواست انجام نشد. دوباره تلاش کن.");
      return;
    }

    setSent(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[var(--banakar)] px-3 py-3 text-xs font-bold text-[var(--ink)] shadow-xl transition hover:-translate-y-1"
        aria-label="درخواست خدمت از میز"
      >
        <Icon name="bell" size={19} />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-5 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <section
            className="w-full max-w-sm rounded-2xl bg-[var(--paper)] p-6 text-[var(--ink)] shadow-2xl"
            dir="rtl"
          >
            {sent ? (
              <div className="text-center">
                <span className="success-orb mx-auto">
                  <Icon name="bell" size={25} />
                </span>
                <h2 className="display mt-5 text-2xl">درخواست شما ارسال شد</h2>
                <p className="mt-3 text-sm leading-7 text-ink/60">
                  همکاران ما به‌زودی به میز شما رسیدگی می‌کنند.
                </p>
                <button
                  type="button"
                  onClick={closeModal}
                  className="primary-button mt-6 w-full justify-center"
                >
                  بستن
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="eyebrow text-copper">درخواست راهنمایی</p>
                    <h2 className="display mt-2 text-2xl">اطلاع دادن به ما</h2>
                  </div>
                  <button type="button" onClick={closeModal} aria-label="بستن">
                    <Icon name="close" size={20} />
                  </button>
                </div>

                <label className="field-label mt-7 block">
                  نام میز
                  <select
                    value={tableNumber}
                    onChange={(event) => setTableNumber(event.target.value)}
                  >
                    <option value="">انتخاب میز</option>
                    {tables.map((table) => (
                      <option key={table.value} value={table.value}>
                        {table.label}
                      </option>
                    ))}
                  </select>
                </label>

                {error && <p className="mt-3 text-xs text-red-600">{error}</p>}

                <button
                  type="button"
                  onClick={submit}
                  disabled={!tableNumber || submitting}
                  className="primary-button mt-6 w-full justify-center disabled:opacity-40"
                >
                  {submitting ? "در حال ارسال..." : "اطلاع به ما"}
                </button>
              </>
            )}
          </section>
        </div>
      )}
    </>
  );
}
