"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";
import { Icon } from "../icons";
import { AdminClock } from "./admin-clock";

const navItems = [
  { href: "/admin", label: "داشبورد", icon: "spark" as const },
  { href: "/admin/products", label: "محصولات", icon: "utensils" as const },
  { href: "/admin/orders", label: "سفارش‌ها", icon: "bag" as const },
  { href: "/admin/reservations", label: "رزرو میز", icon: "calendar" as const },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  if (pathname === "/admin/login") return <>{children}</>;

  async function signOut() {
    await createClient().auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="admin-shell" dir="rtl">
      <aside className="admin-sidebar">
        <div>
          <div className="admin-brand">
            <span className="admin-brand-icon">
              <Image
                src="/icons/icon-128x128.png"
                alt="Banakar"
                width={42}
                height={42}
              />
            </span>
            <span>
              <strong>بناکار بیسترو</strong>
              <small>پنل مدیریت</small>
            </span>
          </div>
          <div className="admin-nav-label">مدیریت کافه</div>
          <nav className="admin-nav">
            {navItems.map((item) => {
              const active =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`admin-nav-item ${active ? "is-active" : ""}`}
                >
                  <Icon name={item.icon} size={18} />
                  <span>{item.label}</span>
                  {active && <i />}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="admin-sidebar-bottom">
          <Link href="/menu" className="admin-back-link">
            <Icon name="arrow-right" size={16} /> مشاهده منوی سایت
          </Link>
          <button type="button" onClick={signOut} className="admin-logout">
            <Icon name="arrow-left" size={16} /> خروج از حساب
          </button>
        </div>
      </aside>
      <div className="admin-workspace">
        <header className="admin-topbar">
          <div>
            <p className="admin-topbar-kicker">BANAKAR BISTRO</p>
            <p className="admin-topbar-title">پنل مدیریت</p>
          </div>
          <AdminClock />
        </header>
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
}
