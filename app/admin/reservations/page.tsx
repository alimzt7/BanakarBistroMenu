import Link from "next/link";
import { getReservations } from "../../../lib/supabase/reservations";
import { AdminNotifications } from "../../../components/admin/admin-notifications";
import { ReservationsManager } from "../../../components/admin/reservations-manager";

export const dynamic = "force-dynamic";

export default async function AdminReservationsPage() {
  const reservations = await getReservations();
  return (
    <>
      <AdminNotifications />
      <main className="min-h-screen bg-[var(--paper)] px-5 py-10 text-[var(--ink)] md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-5">
            <div>
              <p className="eyebrow text-copper">مدیریت رزروها</p>
              <h1 className="display mt-4 text-5xl">رزرو میز</h1>
            </div>
            <Link
              href="/admin"
              className="text-sm text-ink/60 hover:text-copper"
            >
              بازگشت به پنل
            </Link>
          </div>
          <ReservationsManager initialReservations={reservations} />
        </div>
      </main>
    </>
  );
}
