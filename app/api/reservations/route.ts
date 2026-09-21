import { NextResponse } from "next/server";
import { createClient } from "../../../lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      phone?: string;
      reservationDate?: string;
      reservationTime?: string;
      guestCount?: string;
      mood?: string;
      note?: string;
      source?: "customer" | "admin";
    };

    if (!body.name || !body.phone || !body.reservationDate || !body.reservationTime || !body.guestCount) {
      return NextResponse.json({ error: "Required reservation fields are missing" }, { status: 400 });
    }

    const supabase = await createClient();
    const source = body.source === "admin" ? "admin" : "customer";

    if (source === "admin") {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { data, error } = await supabase
      .from("reservations")
      .insert({
        name: body.name.trim(),
        phone: body.phone.trim(),
        reservation_date: body.reservationDate,
        reservation_time: body.reservationTime,
        guest_count: body.guestCount,
        mood: body.mood || null,
        note: body.note || null,
        source,
      })
      .select("*")
      .single();

    if (error) throw error;
    return NextResponse.json({ reservationId: data.id, reservation: data }, { status: 201 });
  } catch (error) {
    console.error("Reservation creation failed", error);
    return NextResponse.json({ error: "Could not create reservation" }, { status: 500 });
  }
}

