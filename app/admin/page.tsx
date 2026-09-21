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
            <p className="admin-eyebrow">داشبورد مدیریت بناکار</p>
            <h1 className="admin-title">سلام سلام!!</h1>
            <p className="admin-muted">وارد شده با: {user.email}</p>
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
      </main>
    </>
  );
}
