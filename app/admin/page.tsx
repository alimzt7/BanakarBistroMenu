import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "../../lib/supabase/server";
import { AdminNotifications } from "../../components/admin/admin-notifications";
import { Icon } from "../../components/icons";

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  return (
    <>
      <AdminNotifications />
      <main className="admin-dashboard">
        <div className="admin-welcome">
          <div>
            <p className="admin-eyebrow">داشبورد مدیریت باناکار</p>
            <h1 className="admin-title">خوش آمدی</h1>
            <p className="admin-muted">وارد شده با: {user.email}</p>
          </div>
          <div className="admin-date-card">
            <Icon name="spark" size={18} />
            <span>امروز، آماده خدمت‌رسانی</span>
          </div>
        </div>
        <div className="admin-stat-grid">
          <Link
            href="/admin/products"
            className="admin-stat-card admin-stat-card-yellow"
          >
            <span className="admin-stat-icon">
              <Icon name="utensils" size={21} />
            </span>
            <span>
              <small>مدیریت منو</small>
              <strong>محصولات و قیمت‌ها</strong>
            </span>
            <Icon name="arrow-left" size={17} />
          </Link>
          <Link href="/admin/orders" className="admin-stat-card">
            <span className="admin-stat-icon">
              <Icon name="bag" size={21} />
            </span>
            <span>
              <small>مرکز سفارش‌ها</small>
              <strong>بررسی سفارش‌های جدید</strong>
            </span>
            <Icon name="arrow-left" size={17} />
          </Link>
          <Link href="/admin/reservations" className="admin-stat-card">
            <span className="admin-stat-icon">
              <Icon name="calendar" size={21} />
            </span>
            <span>
              <small>تقویم رزرو</small>
              <strong>مدیریت میزها</strong>
            </span>
            <Icon name="arrow-left" size={17} />
          </Link>
        </div>
        <section className="admin-dashboard-note">
          <div className="admin-note-mark">
            <Icon name="spark" size={24} filled />
          </div>
          <div>
            <p>همه چیز برای یک سرویس خوب آماده است.</p>
            <span>
              از منوی کناری، بخش موردنظر را انتخاب کن و مدیریت کافه را سریع
              ادامه بده.
            </span>
          </div>
        </section>
      </main>
    </>
  );
}
