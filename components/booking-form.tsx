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
  date: string;
  time: string;
}

export function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<AppointmentForm>({
    name: "",
    date: "",
    time: "09:00",
  });
  const handleChange = (field: keyof AppointmentForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted)
    return (
      <div className="booking-success">
        <span className="success-orb">
          <Icon name="spark" size={26} />
        </span>
        <p className="display mt-6 text-3xl leading-[0.8]">
          رزرو میز شما انجام شد.
        </p>
        <p className="mt-5 max-w-[300px] text-sm leading-6 text-ink/55">
          در نهایت، جزئیات رزرو از طریق پیامک برای شما ارسال خواهد شد.
        </p>
        <button
          className="mt-8 text-[10px] font-bold uppercase tracking-[0.15em] underline underline-offset-4"
          onClick={() => setSubmitted(false)}
        >
          رزرو دیگری ثبت کن
        </button>
      </div>
    );

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      <div className="grid gap-8 md:grid-cols-2">
        <label className="field-label">
          نام و نام خانوادگی
          <input required placeholder="مثلاً سارا احمدی" />
        </label>
        <label className="field-label">
          شماره تماس
          <input required type="tel" placeholder="۰۹۱۲ ۰۰۰ ۰۰۰۰" />
        </label>
        <label className="field-label">
          تاریخ
          <DatePicker
            value={formData.date}
            onChange={(date) =>
              handleChange("date", date?.format("YYYY/MM/DD") ?? "")
            }
            calendar={persian}
            locale={persian_fa}
            format="YYYY/MM/DD"
            calendarPosition="bottom-right"
            inputClass="booking-date-input"
            placeholder="انتخاب تاریخ"
            required
          />
        </label>
        <TimeField
          value={formData.time}
          onChange={(time) => handleChange("time", time)}
        />
        <label className="field-label">
          تعداد مهمان
          <select defaultValue="۲">
            <option>۲</option>
            <option>۳</option>
            <option>۴</option>
            <option>۵</option>
            <option>۶+</option>
          </select>
        </label>
        <label className="field-label">
          حال و هوای میز
          <select defaultValue="آرام و صمیمی">
            <option>آرام و صمیمی</option>
            <option>تولد</option>
            <option>قرار کاری</option>
            <option>یک شب خاص</option>
          </select>
        </label>
      </div>
      <label className="field-label mt-8">
        یادداشت کوتاه
        <textarea
          rows={3}
          placeholder="اگر چیزی هست که باید بدانیم، این‌جا بنویس…"
        />
      </label>
      <button className="primary-button mt-9 w-full justify-between md:w-auto md:min-w-[260px] rounded-xl">
        درخواست رزرو <Icon name="arrow-up-left" size={17} />
      </button>
    </form>
  );
}
