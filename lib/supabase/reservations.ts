import { createClient } from "./server";

export type AdminReservation = {
  id: string;
  name: string;
  phone: string;
  reservation_date: string;
  reservation_time: string;
  guest_count: string;
  mood: string | null;
  note: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  source?: "customer" | "admin";
};

export async function getReservations(): Promise<AdminReservation[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reservations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(`Could not load reservations: ${error.message}`);
  return (data ?? []) as AdminReservation[];
}

