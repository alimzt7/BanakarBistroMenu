import { createClient } from "./server";

export type AdminOrderItem = {
  id: string;
  order_id: string;
  product_id: string | null;
  product_name: string;
  variant_name: string | null;
  quantity: number;
  unit_price: number;
  created_at: string;
};

export type AdminOrder = {
  id: string;
  table_number: string;
  customer_name: string | null;
  customer_phone: string | null;
  note: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  order_items: AdminOrderItem[];
};

export async function getOrders(): Promise<AdminOrder[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Could not load orders: ${error.message}`);
  }

  return (data ?? []) as AdminOrder[];
}
