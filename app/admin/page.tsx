import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";
import { AdminNotifications } from "../../components/admin/admin-notifications";
import Link from "next/link";

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <>
      <AdminNotifications />
      <main className="min-h-screen bg-[var(--paper)] px-5 py-12 text-[var(--ink)]">
        <div className="mx-auto max-w-5xl">
          <p className="eyebrow text-copper">پنل مدیریت بناکار</p>

          <h1 className="display mt-5 text-5xl">خوش آمدی</h1>

          <p className="mt-5 text-sm text-ink/60">وارد شده با: {user.email}</p>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <Link
              href="/admin/products"
              className="border border-ink/15 p-6 transition hover:bg-black/5"
            >
              مدیریت محصولات
            </Link>

            <Link
              href="/admin/orders"
              className="border border-ink/15 p-6 transition hover:bg-black/5"
            >
              سفارش‌ها
            </Link>

            <Link
              href="/admin/reservations"
              className="border border-ink/15 p-6 transition hover:bg-black/5"
            >
              رزروها
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
