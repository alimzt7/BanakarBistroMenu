"use client";

import { useMemo, useState } from "react";
import DatePicker from "react-multi-date-picker";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import type { AdminReservation } from "../../lib/supabase/reservations";
import { ReservationStatusSelect } from "./reservation-status-select";
import TimeField from "../time-field";

const statusText: Record<string, string> = {
  pending: "در انتظار بررسی",
  confirmed: "تأیید شده",
  rejected: "رد شده",
  completed: "انجام شده",
  cancelled: "لغو شده",
};

function ReservationCard({
  item,
  onStatusChanged,
}: {
  item: AdminReservation;
  onStatusChanged: (id: string, status: string) => void;
}) {
  return (
    <article
      className={`border p-5 ${item.status === "pending" ? "border-[#e6ad00] bg-[#ffc000]/20" : "border-ink/15 bg-white/40"}`}
    >
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="font-bold">{item.name}</p>
          <p className="mt-1 text-xs text-ink/55">
            {item.phone} ·{" "}
            {item.source === "admin" ? "ثبت توسط ادمین" : "ثبت توسط مشتری"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-ink/55">
            {statusText[item.status] ?? item.status}
          </span>
          <ReservationStatusSelect
            reservationId={item.id}
            initialStatus={item.status}
            onStatusChanged={(status) => onStatusChanged(item.id, status)}
          />
        </div>
      </div>
      <div className="mt-5 grid gap-3 text-sm md:grid-cols-3">
        <p>تاریخ: {item.reservation_date}</p>
        <p>ساعت: {item.reservation_time}</p>
        <p>مهمان: {item.guest_count}</p>
      </div>
      {item.mood && (
        <p className="mt-3 text-sm text-ink/65">حال‌وهوا: {item.mood}</p>
      )}
      {item.note && (
        <p className="mt-3 text-sm leading-7 text-ink/65">
          یادداشت: {item.note}
        </p>
      )}
    </article>
  );
}

function AddReservation({
  onAdded,
  onClose,
}: {
  onAdded: (item: AdminReservation) => void;
  onClose: () => void;
}) {
  const [data, setData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "12:00",
    guestCount: "2",
    mood: "",
    note: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const set = (key: keyof typeof data, value: string) =>
    setData((old) => ({ ...old, [key]: value }));
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const response = await fetch("/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        reservationDate: data.date,
        reservationTime: data.time,
        source: "admin",
      }),
    });
    const result = await response.json();
    setLoading(false);
    if (!response.ok) {
      setError("ثبت رزرو انجام نشد.");
      return;
    }
    onAdded(result.reservation as AdminReservation);
    onClose();
  }
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
      <form
        onSubmit={submit}
        className="w-full max-w-xl space-y-4 bg-[var(--paper)] p-6"
        dir="rtl"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">افزودن رزرو تلفنی</h2>
          <button type="button" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <input
            required
            placeholder="نام مشتری"
            value={data.name}
            onChange={(e) => set("name", e.target.value)}
            className="border border-ink/20 bg-white/60 p-3"
          />
          <input
            required
            placeholder="شماره تماس"
            value={data.phone}
            onChange={(e) => set("phone", e.target.value)}
            className="border border-ink/20 bg-white/60 p-3"
          />
          <DatePicker
            calendar={persian}
            locale={persian_fa}
            value={data.date}
            onChange={(value) => set("date", value?.format("YYYY/MM/DD") ?? "")}
            format="YYYY/MM/DD"
            placeholder="تاریخ رزرو"
            inputClass="w-full border border-ink/20 bg-white/60 p-3"
          />
          <TimeField
            value={data.time}
            onChange={(value) => set("time", value)}
          />
          <input
            required
            min="1"
            type="number"
            placeholder="تعداد مهمان"
            value={data.guestCount}
            onChange={(e) => set("guestCount", e.target.value)}
            className="border border-ink/20 bg-white/60 p-3"
          />
          <input
            placeholder="حال‌وهوا"
            value={data.mood}
            onChange={(e) => set("mood", e.target.value)}
            className="border border-ink/20 bg-white/60 p-3"
          />
        </div>
        <textarea
          placeholder="یادداشت"
          value={data.note}
          onChange={(e) => set("note", e.target.value)}
          className="min-h-24 w-full border border-ink/20 bg-white/60 p-3"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          disabled={loading}
          className="w-full bg-[var(--banakar)] p-3 text-white disabled:opacity-50"
        >
          {loading ? "در حال ثبت..." : "ثبت رزرو"}
        </button>
      </form>
    </div>
  );
}

function ReservationDetailsModal({
  date,
  reservations,
  onClose,
  onStatusChanged,
}: {
  date: string;
  reservations: AdminReservation[];
  onClose: () => void;
  onStatusChanged: (id: string, status: string) => void;
}) {
  return (
    <div
      className="fixed inset-0 z-40 grid place-items-center bg-black/50 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="max-h-[85vh] w-full max-w-3xl overflow-y-auto bg-[var(--paper)] p-5 md:p-7"
        dir="rtl"
      >
        <div className="mb-6 flex items-center justify-between border-b border-ink/15 pb-4">
          <div>
            <p className="eyebrow text-copper">جزئیات رزروها</p>
            <h2 className="mt-2 text-2xl font-bold">رزروهای {date}</h2>
          </div>
          <button onClick={onClose} className="text-xl" aria-label="بستن">
            ✕
          </button>
        </div>
        {reservations.length ? (
          <div className="space-y-4">
            {reservations.map((item) => (
              <ReservationCard
                key={item.id}
                item={item}
                onStatusChanged={onStatusChanged}
              />
            ))}
          </div>
        ) : (
          <p className="py-10 text-center text-ink/50">
            برای این روز رزروی ثبت نشده است.
          </p>
        )}
      </div>
    </div>
  );
}

export function ReservationsManager({
  initialReservations,
}: {
  initialReservations: AdminReservation[];
}) {
  const today = useMemo(
    () =>
      new DateObject({
        date: new Date(),
        calendar: persian,
        locale: persian_fa,
      }),
    [],
  );
  const [month, setMonth] = useState(today);
  const [items, setItems] = useState(initialReservations);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const firstDay = useMemo(
    () =>
      new DateObject({
        date: `${month.year}/${month.month.number}/1`,
        calendar: persian,
        locale: persian_fa,
      }),
    [month],
  );
  const days = useMemo(() => {
    const offset = firstDay.weekDay.index;
    return Array.from({ length: 42 }, (_, index) => {
      const date = new DateObject({
        date: firstDay.format("YYYY/MM/DD"),
        calendar: persian,
        locale: persian_fa,
      })
        .subtract(offset, "days")
        .add(index, "days");
      return {
        value: date.format("YYYY/MM/DD"),
        day: date.format("DD"),
        inMonth: date.month.number === month.month.number,
      };
    });
  }, [firstDay, month]);
  const selectedReservations = selectedDate
    ? items.filter((item) => item.reservation_date === selectedDate)
    : [];
  const update = (id: string, status: string) =>
    setItems((old) =>
      old.map((item) => (item.id === id ? { ...item, status } : item)),
    );
  return (
    <>
      <div className="mt-8 flex items-center justify-between gap-4">
        <button
          onClick={() => setShowAdd(true)}
          className="bg-[var(--banakar)] px-5 py-3 text-sm text-white"
        >
          + افزودن رزرو
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              setMonth((current) =>
                new DateObject({
                  date: current.format("YYYY/MM/DD"),
                  calendar: persian,
                  locale: persian_fa,
                }).subtract(1, "months"),
              )
            }
            className="border border-ink/15 px-3 py-2"
          >
            ماه قبل
          </button>
          <h2 className="min-w-36 text-center text-xl font-bold">
            {month.format("MMMM YYYY")}
          </h2>
          <button
            onClick={() =>
              setMonth((current) =>
                new DateObject({
                  date: current.format("YYYY/MM/DD"),
                  calendar: persian,
                  locale: persian_fa,
                }).add(1, "months"),
              )
            }
            className="border border-ink/15 px-3 py-2"
          >
            ماه بعد
          </button>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-7 overflow-hidden border border-ink/15">
        {[
          "شنبه",
          "یکشنبه",
          "دوشنبه",
          "سه‌شنبه",
          "چهارشنبه",
          "پنجشنبه",
          "جمعه",
        ].map((day) => (
          <div
            key={day}
            className="border-b border-ink/15 bg-black/[.04] p-2 text-center text-xs font-bold md:p-3"
          >
            {day}
          </div>
        ))}
        {days.map((day, index) => {
          const count = items.filter(
            (item) => item.reservation_date === day.value,
          ).length;
          return (
            <button
              key={`${day.value}-${index}`}
              onClick={() => setSelectedDate(day.value)}
              className={`min-h-24 border-b border-l border-ink/10 p-2 text-right transition hover:bg-[#ffc000]/15 md:min-h-28 md:p-3 ${day.inMonth ? "bg-white/40" : "bg-black/[.03] text-ink/35"}`}
            >
              <span className="block text-sm">{day.day}</span>
              {count > 0 && (
                <span className="mt-3 inline-flex rounded-full bg-[var(--banakar)] px-2 py-1 text-xs text-white">
                  {count} رزرو
                </span>
              )}
            </button>
          );
        })}
      </div>
      {showAdd && (
        <AddReservation
          onAdded={(item) => setItems((old) => [item, ...old])}
          onClose={() => setShowAdd(false)}
        />
      )}
      {selectedDate && (
        <ReservationDetailsModal
          date={selectedDate}
          reservations={selectedReservations}
          onClose={() => setSelectedDate(null)}
          onStatusChanged={update}
        />
      )}
    </>
  );
}
