"use client";

import { useEffect, useState } from "react";

function getTehranNow() {
  const now = new Date();
  return {
    time: new Intl.DateTimeFormat("fa-IR", {
      timeZone: "Asia/Tehran",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(now),
    date: new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
      timeZone: "Asia/Tehran",
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(now),
  };
}

export function AdminClock() {
  const [current, setCurrent] = useState<ReturnType<
    typeof getTehranNow
  > | null>(null);
  useEffect(() => {
    setCurrent(getTehranNow());
    const timer = window.setInterval(() => setCurrent(getTehranNow()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <div className="admin-clock" dir="rtl">
      <strong>{current?.time ?? "--:--:--"}</strong>
      <span>{current?.date ?? "در حال بارگذاری تاریخ"}</span>
    </div>
  );
}
