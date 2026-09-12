"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "./cart-context";
import { Icon } from "./icons";

const links = [
  { href: "/menu", label: "منو" },
  { href: "/#story", label: "داستان ما" },
  { href: "/reserve", label: "رزرو میز" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { count, open } = useCart();

  return (
    <header className="site-header">
      <div className="mx-auto flex max-w-[1480px] items-center justify-between gap-6 px-5 py-5 md:px-10 md:py-7">
        <Link href="/" className="brand-mark group flex items-center gap-3">
          <span className="brand-symbol">
            <Icon name="utensils" size={17} />
          </span>
          <span className="text-right">
            <span className="block font-sans text-[12px] font-bold uppercase tracking-[0.22em]">
              Ambre
            </span>
            <span className="mt-1 block font-sans text-[9px] uppercase tracking-[0.22em] text-paper/45">
              Café · Table · Ritual
            </span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-9 md:flex"
          aria-label="منوی اصلی"
        >
          {links.map((link) => {
            const active =
              link.href === "/menu"
                ? pathname.startsWith("/menu")
                : pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={"nav-link " + (active ? "nav-link-active" : "")}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/reserve"
            className="header-outline-button hidden sm:flex"
          >
            یک میز می‌خواهم <Icon name="arrow-up-left" size={14} />
          </Link>
          <button
            onClick={open}
            className="header-cart-button"
            aria-label="باز کردن سبد سفارش"
          >
            <Icon name="bag" size={16} />
            <span className="hidden sm:inline">سفارش من</span>
            <span
              className={"cart-count " + (count > 0 ? "cart-count-active" : "")}
            >
              {count}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
