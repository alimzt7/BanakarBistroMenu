import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen bg-[var(--paper)] px-5 py-12 text-[var(--ink)]">
      <div className="mx-auto max-w-5xl">
        <p className="eyebrow text-copper">پنل مدیریت بناکار</p>

        <h1 className="display mt-5 text-5xl">خوش آمدی</h1>

        <p className="mt-5 text-sm text-ink/60">وارد شده با: {user.email}</p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="border border-ink/15 p-6">مدیریت محصولات</div>

          <div className="border border-ink/15 p-6">سفارش‌ها</div>

          <div className="border border-ink/15 p-6">رزروها</div>
        </div>
      </div>
    </main>
  );
}
