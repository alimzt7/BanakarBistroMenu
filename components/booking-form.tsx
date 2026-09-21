"use client";

import { useState } from "react";
import type { SubmitEvent } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Icon } from "./icons";
import TimeField from "./time-field";

interface AppointmentForm {
  name: string;
  phone: string;
  date: string;
  time: string;
  guestCount: string;
  mood: string;
  note: string;
}

export function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<AppointmentForm>({
    name: "",
    phone: "",
    date: "",
    time: "09:00",
    guestCount: "۲",
    mood: "آرام و صمیمی",
    note: "",
  });

  const handleChange = (field: keyof AppointmentForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        phone: formData.phone,
        reservationDate: formData.date,
        reservationTime: formData.time,
        guestCount: formData.guestCount,
        mood: formData.mood,
        note: formData.note,
      }),
    });

    setLoading(false);

    if (!response.ok) {
      setError("ثبت رزرو انجام نشد. دوباره تلاش کن.");
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="booking-success">
        <span className="success-orb"><Icon name="spark" size={26} /></span>
        <p className="display mt-6 text-3xl leading-[0.8]">رزرو میز شما انجام شد.</p>
        <p className="mt-5 max-w-[300px] text-sm leading-6 text-ink/55">
          درخواست شما ثبت شد و جزئیات آن توسط مجموعه بررسی می‌شود.
        </p>
        <button
          type="button"
          className="mt-8 text-[10px] font-bold uppercase tracking-[0.15em] underline underline-offset-4"
          onClick={() => {
            setSubmitted(false);
            setFormData((current) => ({ ...current, date: "", note: "" }));
          }}
        >
          رزرو دیگری ثبت کن
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      <div className="grid gap-8 md:grid-cols-2">
        <label className="field-label">
          نام و نام خانوادگی
          <input required placeholder="مثلاً سارا احمدی" value={formData.name} onChange={(event) => handleChange("name", event.target.value)} />
        </label>
        <label className="field-label">
          شماره تماس
          <input required type="tel" placeholder="۰۹۱۲ ۰۰۰ ۰۰۰۰" value={formData.phone} onChange={(event) => handleChange("phone", event.target.value)} />
        </label>
        <label className="field-label">
          تاریخ
          <DatePicker
            value={formData.date}
            onChange={(date) => handleChange("date", date?.format("YYYY/MM/DD") ?? "")}
            calendar={persian}
            locale={persian_fa}
            format="YYYY/MM/DD"
            calendarPosition="bottom-right"
            inputClass="booking-date-input"
            placeholder="انتخاب تاریخ"
            required
          />
        </label>
        <TimeField value={formData.time} onChange={(time) => handleChange("time", time)} />
        <label className="field-label">
          تعداد مهمان
          <select value={formData.guestCount} onChange={(event) => handleChange("guestCount", event.target.value)}>
            <option>۲</option><option>۳</option><option>۴</option><option>۵</option><option>۶+</option>
          </select>
        </label>
        <label className="field-label">
          حال و هوای میز
          <select value={formData.mood} onChange={(event) => handleChange("mood", event.target.value)}>
            <option>آرام و صمیمی</option><option>تولد</option><option>قرار کاری</option><option>یک شب خاص</option>
          </select>
        </label>
      </div>
      <label className="field-label mt-8">
        یادداشت کوتاه
        <textarea rows={3} placeholder="اگر چیزی هست که باید بدانیم، این‌جا بنویس…" value={formData.note} onChange={(event) => handleChange("note", event.target.value)} />
      </label>
      {error && <p className="mt-5 text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={loading} className="primary-button mt-9 w-full justify-between rounded-xl disabled:opacity-50 md:w-auto md:min-w-[260px]">
        {loading ? "در حال ثبت..." : "درخواست رزرو"}<Icon name="arrow-up-left" size={17} />
      </button>
    </form>
  );
}
