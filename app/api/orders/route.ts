import { NextResponse } from "next/server";
import { createClient } from "../../../lib/supabase/server";

type OrderRequestItem = {
  productId: string;
  productName: string;
  variantName: string | null;
  quantity: number;
  unitPrice: number;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      tableNumber?: string;
      items?: OrderRequestItem[];
    };

    if (!body.tableNumber || !body.items?.length) {
      return NextResponse.json(
        { error: "tableNumber and items are required" },
        { status: 400 },
      );
    }

    const validItems = body.items.filter(
      (item) => item.quantity > 0 && item.unitPrice >= 0,
    );

    if (!validItems.length) {
      return NextResponse.json({ error: "Invalid items" }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({ table_number: body.tableNumber })
      .select("id")
      .single();

    if (orderError) throw orderError;

    const { error: itemsError } = await supabase.from("order_items").insert(
      validItems.map((item) => ({
        order_id: order.id,
        product_id: item.productId,
        product_name: item.productName,
        variant_name: item.variantName,
        quantity: item.quantity,
        unit_price: item.unitPrice,
      })),
    );

    if (itemsError) {
      await supabase.from("orders").delete().eq("id", order.id);
      throw itemsError;
    }

    return NextResponse.json({ orderId: order.id }, { status: 201 });
  } catch (error) {
    console.error("Order creation failed", error);
    return NextResponse.json(
      { error: "Could not create order" },
      { status: 500 },
    );
  }
}
