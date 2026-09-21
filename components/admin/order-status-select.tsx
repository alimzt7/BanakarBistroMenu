"use client";

import { useState } from "react";
import { createClient } from "../../lib/supabase/client";

const statuses = [
  { value: "pending", label: "در انتظار بررسی" },
  { value: "accepted", label: "تأیید شده" },
  { value: "completed", label: "تکمیل‌شده" },
  { value: "cancelled", label: "لغوشده" },
];

export function OrderStatusSelect({
  orderId,
  initialStatus,
  onStatusChanged,
}: {
  orderId: string;
  initialStatus: string;
  onStatusChanged?: (status: string) => void;
}) {
  const supabase = createClient();
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  async function handleChange(nextStatus: string) {
    const previousStatus = status;

    setStatus(nextStatus);
    setLoading(true);

    const { error } = await supabase
      .from("orders")
      .update({ status: nextStatus })
      .eq("id", orderId);

    setLoading(false);

    if (error) {
      setStatus(previousStatus);
      return;
    }

    onStatusChanged?.(nextStatus);
  }

  return (
    <select
      value={status}
      disabled={loading}
      onChange={(event) => handleChange(event.target.value)}
      className="rounded-lg border border-ink/20 bg-transparent px-3 py-2 text-xs outline-none focus:border-[var(--banakar)] disabled:opacity-50"
      aria-label="وضعیت سفارش"
    >
      {statuses.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
}
