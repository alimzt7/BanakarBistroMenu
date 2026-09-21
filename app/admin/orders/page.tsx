import Link from "next/link";
import { getOrders } from "../../../lib/supabase/orders";
import { AdminNotifications } from "../../../components/admin/admin-notifications";
import { OrdersManager } from "../../../components/admin/orders-manager";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await getOrders();
  return (
    <>
      <AdminNotifications />
      <main className="min-h-screen bg-[var(--paper)] px-5 py-10 text-[var(--ink)] md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-5">
            <div>
              <p className="eyebrow text-copper">مدیریت سفارش‌ها</p>
              <h1 className="display mt-4 text-5xl">سفارش‌ها</h1>
            </div>
            <Link
              href="/admin"
              className="text-sm text-ink/60 hover:text-copper"
            >
              بازگشت به پنل
            </Link>
          </div>
          {orders.length ? (
            <OrdersManager initialOrders={orders} />
          ) : (
            <div className="mt-10 border border-ink/15 p-10 text-center text-ink/55">
              هنوز سفارشی ثبت نشده است.
            </div>
          )}
        </div>
      </main>
    </>
  );
}
