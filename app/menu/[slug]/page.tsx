import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "../../../components/add-to-cart-button";
import { Icon } from "../../../components/icons";
import { formatPrice, getMenuItem, menuItems } from "../../../lib/menu";

export function generateStaticParams() {
  return menuItems.map((item) => ({ slug: item.slug }));
}

export default async function MenuDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getMenuItem(slug);
  if (!item) notFound();

  return (
    <main className="detail-layout">
      <div className="mx-auto max-w-[1480px] px-5 py-8 md:px-10 md:py-12">
        <Link
          href="/menu"
          className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.14em] text-ink/55 transition-colors hover:text-copper"
        >
          <Icon name="arrow-right" size={15} /> بازگشت به منو
        </Link>
        <div
          className="mt-8 grid overflow-hidden md:grid-cols-[1.02fr_.98fr]"
          style={{ boxShadow: "0 0 0 1px rgba(18,17,16,.12)" }}
        >
          <div className="detail-image">
            <img src={item.image} alt={item.nameFa} />
          </div>
          <div className="detail-panel">
            <div>
              <div className="flex items-center justify-between gap-4">
                <span className="detail-tag">{item.tag}</span>
                <span className="font-sans text-[10px] font-bold uppercase tracking-[.14em] text-ink/50">
                  {item.id} / {item.category}
                </span>
              </div>
              <h1 className="display mt-10 text-[clamp(3rem,9vw,4rem)]">
                {item.nameFa}
              </h1>
              <p className="mt-7 font-sans text-[10px] uppercase tracking-[.15em] text-ink/45">
                {item.nameEn}
              </p>
              <p className="mt-9 max-w-[440px] text-sm leading-8 text-ink/62">
                {item.description}
              </p>
              <div className="mt-10 grid grid-cols-2 gap-4 border-y border-ink/15 py-5">
                <div>
                  <p className="eyebrow text-ink/40">زمان آماده‌سازی</p>
                  <p className="mt-3 flex items-center gap-2 text-xs">
                    <Icon name="clock" size={15} /> {item.time}
                  </p>
                </div>
                <div>
                  <p className="eyebrow text-ink/40">قیمت</p>
                  <p className="mt-3 text-xs font-bold">
                    {formatPrice(item.price)} تومان
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <p className="eyebrow text-ink/40">مواد اولیه</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.ingredients.map((ingredient) => (
                    <span key={ingredient} className="ingredient-chip">
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-12">
              <p className="mb-4 text-xs italic leading-6 text-ink/52">
                «{item.note}»
              </p>
              <AddToCartButton item={item} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
