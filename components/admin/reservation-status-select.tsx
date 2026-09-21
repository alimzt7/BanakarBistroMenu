"use client";

import { useState } from "react";
import { createClient } from "../../lib/supabase/client";

const statuses = [
  { value: "pending", label: "در انتظار بررسی" },
  { value: "confirmed", label: "تأیید شده" },
  { value: "rejected", label: "رد شده" },
  { value: "completed", label: "انجام شده" },
  { value: "cancelled", label: "لغو شده" },
];

export function ReservationStatusSelect({ reservationId, initialStatus, onStatusChanged }: { reservationId: string; initialStatus: string; onStatusChanged?: (status: string) => void }) {
  const supabase = createClient();
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  async function handleChange(nextStatus: string) {
    const previousStatus = status;
    setStatus(nextStatus);
    setLoading(true);
    const { error } = await supabase.from("reservations").update({ status: nextStatus }).eq("id", reservationId);
    setLoading(false);
    if (error) setStatus(previousStatus);
    else onStatusChanged?.(nextStatus);
  }

  return (
    <select value={status} disabled={loading} onChange={(event) => handleChange(event.target.value)} className="rounded-lg border border-ink/20 bg-transparent px-3 py-2 text-xs outline-none focus:border-[var(--banakar)] disabled:opacity-50" aria-label="وضعیت رزرو">
      {statuses.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
    </select>
  );
}
