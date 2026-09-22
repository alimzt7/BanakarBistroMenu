"use client";

import { useState } from "react";
import type { AdminOrder } from "../../lib/supabase/orders";
import { OrderStatusSelect } from "./order-status-select";
import { createClient } from "../../lib/supabase/client";

function OrderCard({
  order,
  onStatusChanged,
  onDeleted,
}: {
  order: AdminOrder;
  onStatusChanged: (id: string, status: string) => void;
  onDeleted: (id: string) => void;
}) {
  const total = order.order_items.reduce(
    (sum, item) => sum + item.unit_price * item.quantity,
    0,
  );
  async function deleteOrder() {
    if (
      !window.confirm(
        "آیا از حذف این سفارش مطمئن هستی؟ این عملیات قابل بازگشت نیست.",
      )
    )
      return;
    const supabase = createClient();
    const itemsResult = await supabase
      .from("order_items")
      .delete()
      .eq("order_id", order.id);
    if (itemsResult.error) {
      window.alert("حذف آیتم‌های سفارش انجام نشد.");
      return;
    }
    const result = await supabase.from("orders").delete().eq("id", order.id);
    if (result.error) {
      window.alert("حذف سفارش انجام نشد.");
      return;
    }
    onDeleted(order.id);
  }
  return (
    <article
      className={`border p-5 md:p-7 ${order.status === "pending" ? "border-[#e6ad00] bg-[#ffc000]/25" : "border-ink/15 bg-white/40"}`}
    >
      <div className="flex flex-col justify-between gap-4 border-b border-ink/15 pb-5 md:flex-row md:items-center">
        <div>
          <p className="text-lg font-bold">میز {order.table_number}</p>
          <p className="mt-1 text-xs text-ink/50">
            {new Date(order.created_at).toLocaleString("fa-IR")}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <OrderStatusSelect
            orderId={order.id}
            initialStatus={order.status}
            onStatusChanged={(status) => onStatusChanged(order.id, status)}
          />
          <button
            type="button"
            onClick={deleteOrder}
            className="rounded-lg border border-red-200 px-3 py-2 text-xs text-red-600 transition hover:bg-red-50"
          >
            حذف
          </button>
        </div>
      </div>
      <div className="mt-5 space-y-3">
        {order.order_items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-4 text-sm"
          >
            <div>
              <p className="font-bold">{item.product_name}</p>
              {item.variant_name && (
                <p className="mt-1 text-xs text-ink/50">
                  نوع: {item.variant_name}
                </p>
              )}
            </div>
            <div className="text-left text-xs">
              <p>تعداد: {item.quantity}</p>
              <p className="mt-1 text-ink/55">
                {item.unit_price.toLocaleString("fa-IR")} تومان
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 border-t border-ink/15 pt-4 text-left text-sm font-bold">
        جمع سفارش: {total.toLocaleString("fa-IR")} تومان
      </div>
    </article>
  );
}

export function OrdersManager({
  initialOrders,
}: {
  initialOrders: AdminOrder[];
}) {
  const [orders, setOrders] = useState(initialOrders);
  const updateStatus = (id: string, status: string) =>
    setOrders((items) =>
      items.map((item) => (item.id === id ? { ...item, status } : item)),
    );
  const deleteOrder = (id: string) =>
    setOrders((items) => items.filter((item) => item.id !== id));
  const pending = orders.filter((order) => order.status === "pending");
  const reviewed = orders.filter((order) => order.status !== "pending");
  const section = (
    title: string,
    items: AdminOrder[],
    pendingStyle: boolean,
  ) => (
    <section
      className={`border p-4 md:p-6 ${pendingStyle ? "border-amber-300 bg-amber-50/70" : "border-ink/15 bg-black/[.02]"}`}
    >
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold">{title}</h2>
        <span className="rounded-full bg-white/70 px-3 py-1 text-sm">
          {items.length}
        </span>
      </div>
      {items.length ? (
        <div className="space-y-4">
          {items.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onStatusChanged={updateStatus}
              onDeleted={deleteOrder}
            />
          ))}
        </div>
      ) : (
        <p className="py-8 text-center text-sm text-ink/50">
          موردی وجود ندارد.
        </p>
      )}
    </section>
  );
  return (
    <div className="mt-10 space-y-8">
      {section("بررسی‌نشده", pending, true)}
      {section("بررسی‌شده", reviewed, false)}
    </div>
  );
}
