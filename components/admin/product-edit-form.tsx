"use client";

import { useState } from "react";
import type { SubmitEvent } from "react";
import { useRouter } from "next/navigation";
import { categories, type MenuCategory, type MenuItem } from "../../lib/menu";
import { createClient } from "../../lib/supabase/client";

export function ProductEditForm({ product }: { product: MenuItem }) {
  const router = useRouter();
  const supabase = createClient();

  const [nameFa, setNameFa] = useState(product.nameFa);
  const [nameEn, setNameEn] = useState(product.nameEn);
  const [description, setDescription] = useState(product.description ?? "");
  const [price, setPrice] = useState(String(product.price));
  const [category, setCategory] = useState<MenuCategory>(product.category);
  const [tag, setTag] = useState(product.tag ?? "");
  const [time, setTime] = useState(product.time);
  const [note, setNote] = useState(product.note ?? "");
  const [isAvailable, setIsAvailable] = useState(product.isAvailable ?? true);
  const [isFeatured, setIsFeatured] = useState(product.isFeatured ?? false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    const { error } = await supabase
      .from("products")
      .update({
        name_fa: nameFa,
        name_en: nameEn,
        description: description || null,
        price: Number(price),
        category,
        tag: tag || null,
        preparation_time: time,
        note: note || null,
        is_available: isAvailable,
        is_featured: isFeatured,
      })
      .eq("id", product.id);

    setLoading(false);

    if (error) {
      setMessage("ذخیره اطلاعات انجام نشد.");
      return;
    }

    setMessage("تغییرات با موفقیت ذخیره شد.");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-7">
      <div className="grid gap-7 md:grid-cols-2">
        <label className="field-label">
          نام فارسی
          <input
            value={nameFa}
            onChange={(event) => setNameFa(event.target.value)}
            required
          />
        </label>

        <label className="field-label">
          نام انگلیسی
          <input
            value={nameEn}
            onChange={(event) => setNameEn(event.target.value)}
          />
        </label>

        <label className="field-label">
          قیمت
          <input
            type="number"
            min="0"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            required
          />
        </label>

        <label className="field-label">
          دسته‌بندی
          <select
            value={category}
            onChange={(event) =>
              setCategory(event.target.value as MenuCategory)
            }
          >
            {categories
              .filter((item) => item !== "همه")
              .map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
          </select>
        </label>

        <label className="field-label">
          برچسب
          <input
            value={tag}
            onChange={(event) => setTag(event.target.value)}
            placeholder="مثلاً پیشنهاد ویژه"
          />
        </label>

        <label className="field-label">
          زمان آماده‌سازی
          <input
            value={time}
            onChange={(event) => setTime(event.target.value)}
          />
        </label>
      </div>

      <label className="field-label">
        توضیحات
        <textarea
          rows={4}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </label>

      <label className="field-label">
        یادداشت
        <textarea
          rows={3}
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />
      </label>

      <div className="flex flex-wrap gap-6 text-sm">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isAvailable}
            onChange={(event) => setIsAvailable(event.target.checked)}
          />
          محصول موجود است
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={(event) => setIsFeatured(event.target.checked)}
          />
          پیشنهاد ویژه
        </label>
      </div>

      {message && <p className="text-sm text-copper">{message}</p>}

      <button
        type="submit"
        disabled={loading}
        className="primary-button disabled:opacity-50"
      >
        {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
      </button>
    </form>
  );
}
