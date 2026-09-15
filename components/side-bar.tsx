"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "./cart-context";
import { Icon } from "./icons";
import { useEffect } from "react";

interface NavItem {
  id: string;
  label: string;
  href: string;
}

interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigationItems: NavItem[] = [
  { id: "homepage", label: "صفحه اصلی", href: "/" },
  { id: "about", label: "درباره ما", href: "/#story" },
  { id: "menu", label: "مشاهده منو", href: "/menu" },
  { id: "reserve", label: "رزرو میز", href: "/reserve" },
];

function SideBar({ isOpen, onClose }: SideBarProps) {
  const pathName = usePathname();
  const { count, open } = useCart();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />
      <aside
        dir="rtl"
        className={`fixed top-0 right-0 z-50 h-full w-72 sm:w-80 bg-white/95 dark:bg-[#1a1a1a]/95 backdrop-blur-md shadow-2xl p-6 transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-5 border-b border-gray-100 dark:border-white/10">
              <span className="font-sans font-medium text-sm tracking-widest text-[#eb5e28]">
                منوی ناوبری
              </span>
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                aria-label="بستن منو"
              >
                <Icon name="close" size={20} />
              </button>
            </div>

            <ul className="mt-6 flex flex-col gap-3">
              {navigationItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathName === "/"
                    : pathName.startsWith(item.href);
                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`block px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
                        isActive
                          ? "bg-[#eb5e28]/10 text-[#eb5e28] font-bold"
                          : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <button
            onClick={() => {
              onClose();
              open();
            }}
            className="header-cart-button w-full justify-center mt-auto"
            aria-label="باز کردن سبد سفارش"
          >
            <Icon name="bag" size={16} />
            <span>سفارشات من</span>
            <span
              className={"cart-count " + (count > 0 ? "cart-count-active" : "")}
            >
              {count}
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default SideBar;
