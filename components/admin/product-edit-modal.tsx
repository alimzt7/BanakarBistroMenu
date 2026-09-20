"use client";

import { useState, type FormEvent } from "react";
import { categories, type MenuCategory, type MenuItem } from "../../lib/menu";
import { createClient } from "../../lib/supabase/client";
import { Icon } from "../icons";

type ProductEditModalProps = {
  product: MenuItem;
  onClose: () => void;
  onSaved: (product: MenuItem) => void;
};

export function ProductEditModal({
  product,
  onClose,
  onSaved,
}: ProductEditModalProps) {
  const supabase = createClient();
  const [nameFa, setNameFa] = useState(product.nameFa);
  const [nameEn, setNameEn] = useState(product.nameEn);
  const [description, setDescription] = useState(product.description ?? "");
  const [price, setPrice] = useState(String(product.price));
  const [category, setCategory] = useState<MenuCategory>(product.category);
  const [tag, setTag] = useState(product.tag ?? "");
  const [time, setTime] = useState(product.time);
  const [ingredients, setIngredients] = useState(product.ingredients.join(", "));
  const [note, setNote] = useState(product.note ?? "");
  const [isAvailable, setIsAvailable] = useState(product.isAvailable ?? true);
  const [isFeatured, setIsFeatured] = useState(product.isFeatured ?? false);
  const [isArchived, setIsArchived] = useState(product.isArchived ?? false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const nextIngredients = ingredients
      .split(",")
      .map((ingredient) => ingredient.trim())
      .filter(Boolean);

    const { error: updateError } = await supabase
      .from("products")
      .update({
        name_fa: nameFa,
        name_en: nameEn || null,
        description: description || null,
        price: Number(price),
        category,
        tag: tag || null,
        preparation_time: time,
        ingredients: nextIngredients,
        note: note || null,
        is_available: isAvailable,
        is_featured: isFeatured,
        is_archived: isArchived,
      })
      .eq("id", product.id);

    setLoading(false);

    if (updateError) {
      setError("ذخیره تغییرات انجام نشد.");
      return;
    }

    onSaved({
      ...product,
      nameFa,
      nameEn,
      description: description || null,
      price: Number(price),
      category: category as Exclude<MenuCategory, "همه">,
      tag: tag || null,
      time,
      ingredients: nextIngredients,
      note: note || null,
      isAvailable,
      isFeatured,
      isArchived,
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
      <section className="max-h-[92vh] w-full max-w-5xl overflow-y-auto bg-[var(--paper)] text-[var(--ink)] shadow-2xl">
        <div className="flex items-center justify-between border-b border-ink/15 bg-[var(--banakar)] px-5 py-4 md:px-8">
          <div>
            <p className="text-xs font-bold tracking-[.12em]">ویرایش محصول</p>
            <h2 className="display mt-1 text-3xl">{product.nameFa}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 transition hover:bg-black/10"
            aria-label="بستن پنجره"
          >
            <Icon name="close" size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-8 p-5 md:grid-cols-[220px_1fr] md:p-8">
          <div>
            <p className="field-label">تصویر محصول</p>
            <div className="mt-3 aspect-square overflow-hidden bg-black/10">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.nameFa}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-ink/45">
                  بدون تصویر
                </div>
              )}
            </div>

            <div className="mt-6 space-y-3 text-sm">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(event) => setIsFeatured(event.target.checked)}
                />
                پیشنهاد ویژه
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={!isAvailable}
                  onChange={(event) => setIsAvailable(!event.target.checked)}
                />
                تمام‌شده
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={isArchived}
                  onChange={(event) => setIsArchived(event.target.checked)}
                />
                بایگانی محصول
              </label>
            </div>
          </div>

          <div className="space-y-7">
            <div className="grid gap-7 md:grid-cols-2">
              <label className="field-label">
                نام فارسی
                <input value={nameFa} onChange={(event) => setNameFa(event.target.value)} required />
              </label>
              <label className="field-label">
                نام انگلیسی
                <input value={nameEn} onChange={(event) => setNameEn(event.target.value)} />
              </label>
              <label className="field-label">
                قیمت
                <input type="number" min="0" value={price} onChange={(event) => setPrice(event.target.value)} required />
              </label>
              <label className="field-label">
                دسته‌بندی
                <select value={category} onChange={(event) => setCategory(event.target.value as MenuCategory)}>
                  {categories.filter((item) => item !== "همه").map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </label>
              <label className="field-label">
                برچسب
                <input value={tag} onChange={(event) => setTag(event.target.value)} placeholder="مثلاً پیشنهاد ویژه" />
              </label>
              <label className="field-label">
                زمان آماده‌سازی
                <input value={time} onChange={(event) => setTime(event.target.value)} />
              </label>
            </div>

            <label className="field-label">
              توضیحات
              <textarea rows={4} value={description} onChange={(event) => setDescription(event.target.value)} />
            </label>

            <label className="field-label">
              مواد اولیه
              <input value={ingredients} onChange={(event) => setIngredients(event.target.value)} placeholder="با کاما جدا کن" />
            </label>

            <label className="field-label">
              یادداشت
              <textarea rows={3} value={note} onChange={(event) => setNote(event.target.value)} />
            </label>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex justify-end gap-3 border-t border-ink/15 pt-5">
              <button type="button" onClick={onClose} className="rounded-xl border border-ink/20 px-5 py-3 text-sm">
                انصراف
              </button>
              <button type="submit" disabled={loading} className="primary-button rounded-xl disabled:opacity-50">
                {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
