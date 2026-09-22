"use client";

import { useState } from "react";
import type { SubmitEvent } from "react";
import { categories, type MenuCategory, type MenuItem } from "../../lib/menu";
import { createClient } from "../../lib/supabase/client";
import { Icon } from "../icons";
import { ProductImageUploader } from "./product-image-uploader";

export function ProductCreateModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: (product: MenuItem) => void;
}) {
  const [form, setForm] = useState({
    nameFa: "",
    nameEn: "",
    slug: "",
    price: "",
    category: "صبحانه" as Exclude<MenuCategory, "همه">,
    image: "",
    description: "",
    ingredients: "",
    tag: "",
    time: "",
    note: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const update = (key: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [key]: value }));
  function makeSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }
  async function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const slug = form.slug.trim() || makeSlug(form.nameEn);
    if (!slug) {
      setError("برای محصول یک slug انگلیسی وارد کن.");
      setLoading(false);
      return;
    }
    const payload = {
      name_fa: form.nameFa.trim(),
      name_en: form.nameEn.trim() || null,
      slug,
      price: Number(form.price),
      category: form.category,
      image_url: form.image.trim() || null,
      description: form.description.trim() || null,
      ingredients: form.ingredients
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      tag: form.tag.trim() || null,
      preparation_time: form.time.trim() || null,
      note: form.note.trim() || null,
      is_available: true,
      is_featured: false,
      is_archived: false,
    };
    const { data, error: insertError } = await createClient()
      .from("products")
      .insert(payload)
      .select("*, product_variants(*)")
      .single();
    setLoading(false);
    if (insertError) {
      setError(insertError.message);
      return;
    }
    onCreated({
      id: data.id,
      productId: data.id,
      displayId: data.display_code ?? "",
      isAvailable: data.is_available,
      isFeatured: data.is_featured,
      isArchived: data.is_archived,
      slug: data.slug,
      nameFa: data.name_fa,
      nameEn: data.name_en ?? "",
      description: data.description,
      price: data.price,
      category: data.category,
      image: data.image_url ?? "",
      tag: data.tag,
      time: data.preparation_time ?? "",
      ingredients: data.ingredients ?? [],
      note: data.note,
      variants: [],
    });
    onClose();
  }
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="max-h-[92vh] w-full max-w-4xl overflow-y-auto bg-[var(--paper)] p-5 text-[var(--ink)] shadow-2xl md:p-8"
        dir="rtl"
      >
        <div className="mb-7 flex items-center justify-between border-b border-ink/15 pb-5">
          <div>
            <p className="eyebrow text-copper">مدیریت منو</p>
            <h2 className="display mt-2 text-3xl">افزودن محصول جدید</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="بستن">
            <Icon name="close" size={22} />
          </button>
        </div>
        <form onSubmit={submit} className="space-y-6">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="field-label">
              نام فارسی
              <input
                required
                value={form.nameFa}
                onChange={(event) => update("nameFa", event.target.value)}
                placeholder="مثلاً لاته"
              />
            </label>
            <label className="field-label">
              نام انگلیسی
              <input
                required
                value={form.nameEn}
                onChange={(event) => update("nameEn", event.target.value)}
                placeholder="مثلاً Caffe Latte"
              />
            </label>
            <label className="field-label">
              Slug
              <input
                value={form.slug}
                onChange={(event) => update("slug", event.target.value)}
                placeholder="caffe-latte"
              />
            </label>
            <label className="field-label">
              قیمت
              <input
                required
                type="number"
                min="0"
                value={form.price}
                onChange={(event) => update("price", event.target.value)}
                placeholder="337000"
              />
            </label>
            <label className="field-label">
              دسته‌بندی
              <select
                required
                value={form.category}
                onChange={(event) => update("category", event.target.value)}
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
            <div className="field-label md:col-span-2">
              تصویر محصول
              <ProductImageUploader
                value={form.image}
                onChange={(url) => update("image", url)}
                onError={setError}
              />
            </div>
            <label className="field-label">
              زمان آماده‌سازی
              <input
                value={form.time}
                onChange={(event) => update("time", event.target.value)}
                placeholder="۱۰ دقیقه"
              />
            </label>
            <label className="field-label">
              برچسب
              <input
                value={form.tag}
                onChange={(event) => update("tag", event.target.value)}
                placeholder="پیشنهاد ویژه"
              />
            </label>
          </div>
          <label className="field-label">
            توضیحات
            <textarea
              rows={4}
              value={form.description}
              onChange={(event) => update("description", event.target.value)}
            />
          </label>
          <label className="field-label">
            مواد اولیه
            <input
              value={form.ingredients}
              onChange={(event) => update("ingredients", event.target.value)}
              placeholder="اسپرسو، شیر گرم"
            />
          </label>
          <label className="field-label">
            یادداشت
            <textarea
              rows={3}
              value={form.note}
              onChange={(event) => update("note", event.target.value)}
            />
          </label>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex justify-end gap-3 border-t border-ink/15 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-ink/20 px-5 py-3 text-sm"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={loading}
              className="primary-button rounded-xl disabled:opacity-50"
            >
              {loading ? "در حال ثبت..." : "افزودن محصول"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
