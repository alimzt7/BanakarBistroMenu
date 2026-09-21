"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { categories, type MenuCategory, type MenuItem } from "../../lib/menu";
import { Icon } from "../icons";
import { ProductEditModal } from "./product-edit-modal";
import Image from "next/image";

export function ProductsManager({
  initialProducts,
}: {
  initialProducts: MenuItem[];
}) {
  const [products, setProducts] = useState(initialProducts);
  const [activeCategory, setActiveCategory] = useState<MenuCategory | "آرشیو">(
    "همه",
  );
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(
    initialProducts[0] ?? null,
  );
  const [editingProduct, setEditingProduct] = useState<MenuItem | null>(null);

  const visibleProducts = useMemo(() => {
    if (activeCategory === "آرشیو") {
      return products.filter((product) => product.isArchived);
    }

    return products.filter(
      (product) =>
        !product.isArchived &&
        (activeCategory === "همه" || product.category === activeCategory),
    );
  }, [activeCategory, products]);

  function handleSaved(nextProduct: MenuItem) {
    setProducts((current) =>
      current.map((product) =>
        product.id === nextProduct.id ? nextProduct : product,
      ),
    );
    setSelectedProduct(nextProduct);
  }

  return (
    <main className="min-h-screen bg-[var(--paper)] px-4 py-6 text-[var(--ink)] md:px-8">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-6 flex items-end justify-between gap-5">
          <div>
            <p className="eyebrow text-copper">مدیریت منو</p>
            <h1 className="display mt-3 text-4xl md:text-5xl">محصولات</h1>
          </div>
          <Link href="/admin" className="text-sm text-ink/60 hover:text-copper">
            بازگشت به پنل
          </Link>
        </div>

        <div
          className="grid gap-4 lg:grid-cols-[220px_minmax(300px,1fr)_300px]"
          dir="rtl"
        >
          <aside className="border border-ink/15 bg-white/35 p-4">
            <h2 className="mb-4 text-sm font-bold">دسته‌بندی‌ها</h2>
            <div className="space-y-1">
              {[...categories, "آرشیو" as const].map((category) => {
                const count =
                  category === "آرشیو"
                    ? products.filter((product) => product.isArchived).length
                    : category === "همه"
                      ? products.filter((product) => !product.isArchived).length
                      : products.filter(
                          (product) =>
                            !product.isArchived &&
                            product.category === category,
                        ).length;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-right text-sm transition ${activeCategory === category ? "bg-[var(--banakar)] font-bold" : "hover:bg-black/5"}`}
                  >
                    <span>{category}</span>
                    <span className="text-xs opacity-60">{count}</span>
                  </button>
                );
              })}
            </div>
          </aside>

          <section className="min-h-[620px] border border-ink/15 bg-white/35 p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-bold">محصولات {activeCategory}</h2>
              <span className="text-xs text-ink/50">
                {visibleProducts.length} محصول
              </span>
            </div>

            <div className="space-y-2">
              {visibleProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition ${selectedProduct?.id === product.id ? "border-[var(--banakar)] bg-[var(--banakar)]/15" : "border-ink/10 bg-white/30 hover:bg-black/5"}`}
                >
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-black/10">
                    {product.image && (
                      <Image
                        src={product.image}
                        alt=""
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">
                      {product.nameFa}
                    </p>
                    <p className="mt-1 text-xs text-ink/50">
                      {product.price.toLocaleString("fa-IR")} تومان
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {!product.isAvailable && (
                      <span className="text-[10px] text-red-600">تمام‌شده</span>
                    )}
                    {product.isFeatured && (
                      <span className="text-[10px] text-copper">ویژه</span>
                    )}
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        setEditingProduct(product);
                      }}
                      className="rounded-lg p-2 text-ink/55 transition hover:bg-[var(--banakar)] hover:text-ink"
                      aria-label={`ویرایش ${product.nameFa}`}
                    >
                      <Icon name="edit" size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <aside className="border border-ink/15 bg-white/35 p-5">
            {selectedProduct ? (
              <>
                <div className="relative aspect-square overflow-hidden bg-black/10">
                  {selectedProduct.image && (
                    <Image
                      src={selectedProduct.image}
                      alt={selectedProduct.nameFa}
                      fill
                      sizes="300px"
                      className="object-cover"
                    />
                  )}
                </div>
                <p className="eyebrow mt-5 text-copper">پیش‌نمایش محصول</p>
                <h2 className="display mt-3 text-3xl">
                  {selectedProduct.nameFa}
                </h2>
                <p className="mt-2 text-xs text-ink/50">
                  {selectedProduct.nameEn}
                </p>
                <p className="mt-5 text-sm leading-7 text-ink/65">
                  {selectedProduct.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-black/5 px-3 py-2">
                    {selectedProduct.category}
                  </span>
                  <span className="rounded-full bg-black/5 px-3 py-2">
                    {selectedProduct.isAvailable ? "موجود" : "تمام‌شده"}
                  </span>
                  {selectedProduct.isArchived && (
                    <span className="rounded-full bg-red-100 px-3 py-2 text-red-700">
                      بایگانی
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setEditingProduct(selectedProduct)}
                  className="primary-button mt-7 w-full justify-between rounded-xl"
                >
                  ویرایش محصول <Icon name="edit" size={16} />
                </button>
              </>
            ) : (
              <div className="flex min-h-[500px] items-center justify-center text-center text-sm text-ink/50">
                محصولی انتخاب نشده است.
              </div>
            )}
          </aside>
        </div>
      </div>

      {editingProduct && (
        <ProductEditModal
          key={editingProduct.id}
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSaved={handleSaved}
        />
      )}
    </main>
  );
}
