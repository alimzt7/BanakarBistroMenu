"use client";

import { useMemo, useState } from "react";
import { categories, type MenuCategory, type MenuItem } from "../lib/menu";
import { Icon } from "./icons";
import { MenuCard } from "./menu-card";

export function MenuExplorer({ items }: { items: MenuItem[] }) {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("همه");
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesCategory =
        activeCategory === "همه" || item.category === activeCategory;
      const matchesQuery =
        !needle ||
        [item.nameFa, item.nameEn, item.description, item.category].some(
          (value) => value?.toLowerCase().includes(needle),
        );
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query, items]);

  return (
    <section className="menu-stage">
      <div className="mx-auto max-w-[1480px] px-5 py-10 md:px-10">
        <div className="flex flex-col justify-between md:flex-row md:items-end px-10">
          <div>
            <p className="eyebrow text-copper">منوی جذاب ما</p>
          </div>
          <div className="flex flex-col max-w-[340px] text-sm leading-7 text-ink/55 pt-4 gap-2">
            <p>اگر بین انتخاب‌ها ماندی، تیم ما برای پیشنهاد دادن این‌جاست.</p>
            <label className="search-field ">
              <Icon name="search" size={16} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="جست‌وجوی یک طعم"
                aria-label="جست‌وجوی منو"
              />
            </label>
          </div>
        </div>

        <div className="menu-toolbar mt-14">
          <div className="flex min-w-0 gap-2 overflow-x-auto pb-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={
                  "category-chip " +
                  (activeCategory === category ? "category-chip-active" : "")
                }
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredItems.length ? (
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {filteredItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="empty-results">
            <p className="display text-3xl leading-none">
              طعمی با مورد جست و جوی شما یافت نشد...
            </p>
            <button
              className="mt-5 text-[10px] text-copper font-bold tracking-[0.14em] underline underline-offset-4"
              onClick={() => {
                setActiveCategory("همه");
                setQuery("");
              }}
            >
              بازگشت به منو
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
