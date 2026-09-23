"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "../../lib/supabase/client";
import { Icon } from "../icons";

type NotificationItem = {
  id: string;
  type: "order" | "reservation" | "waiter_call";
  title: string;
  description: string;
  createdAt: string;
  href: string;
};

function playDing() {
  const AudioContextClass =
    window.AudioContext ||
    (
      window as typeof window & {
        webkitAudioContext?: typeof AudioContext;
      }
    ).webkitAudioContext;

  if (!AudioContextClass) return;

  const context = new AudioContextClass();
  const masterGain = context.createGain();
  const startTime = context.currentTime;

  masterGain.gain.value = 0.32;
  masterGain.connect(context.destination);

  const tones = [
    { frequency: 660, delay: 0, volume: 0.28 },
    { frequency: 880, delay: 0.18, volume: 0.22 },
  ];

  tones.forEach(({ frequency, delay, volume }) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const toneStart = startTime + delay;
    const toneEnd = startTime + 1;

    oscillator.type = "triangle";
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.001, toneStart);
    gain.gain.linearRampToValueAtTime(volume, toneStart + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, toneEnd);

    oscillator.connect(gain);
    gain.connect(masterGain);
    oscillator.start(toneStart);
    oscillator.stop(toneEnd);
  });

  window.setTimeout(() => void context.close(), 1200);
}

function showSystemNotification(notification: NotificationItem) {
  if (
    typeof Notification === "undefined" ||
    Notification.permission !== "granted"
  ) {
    return;
  }

  const systemNotification = new Notification(notification.title, {
    body: notification.description,
    requireInteraction: true,
  });

  systemNotification.onclick = () => {
    window.focus();
    window.location.href = notification.href;
    systemNotification.close();
  };
}

export function AdminNotifications() {
  const supabase = createClient();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showToast, setShowToast] = useState<NotificationItem | null>(null);
  const [systemNotificationEnabled, setSystemNotificationEnabled] =
    useState(false);
  const audioReady = useRef(false);

  useEffect(() => {
    const savedSound =
      localStorage.getItem("admin-notification-sound") === "on";
    setSoundEnabled(savedSound);
    audioReady.current = savedSound;
    setSystemNotificationEnabled(
      typeof Notification !== "undefined" &&
        Notification.permission === "granted",
    );

    const channel = supabase
      .channel("admin-notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "orders",
        },
        (payload) => {
          const notification: NotificationItem = {
            id: `order-${payload.new.id}`,
            type: "order",
            title: "سفارش جدید",
            description: `سفارش جدید برای ${payload.new.table_number}`,
            createdAt: payload.new.created_at,
            href: "/admin/orders",
          };

          setNotifications((current) => [notification, ...current]);
          setShowToast(notification);

          if (audioReady.current) {
            playDing();
          }

          showSystemNotification(notification);

          window.setTimeout(() => setShowToast(null), 5000);
        },
      )
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "reservations",
        },
        (payload) => {
          if (payload.new.source === "admin") {
            return;
          }

          const notification: NotificationItem = {
            id: `reservation-${payload.new.id}`,
            type: "reservation",
            title: "رزرو جدید",
            description: `رزرو جدید برای ${payload.new.name}`,
            createdAt: payload.new.created_at,
            href: "/admin/reservations",
          };

          setNotifications((current) => [notification, ...current]);
          setShowToast(notification);

          if (audioReady.current) {
            playDing();
          }

          showSystemNotification(notification);

          window.setTimeout(() => setShowToast(null), 5000);
        },
      )
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "waiter_calls",
        },
        (payload) => {
          const notification: NotificationItem = {
            id: `waiter-call-${payload.new.id}`,
            type: "waiter_call",
            title: "درخواست جدید",
            description: `میز ${payload.new.table_number} نیاز به راهنمایی دارد.`,
            createdAt: payload.new.created_at,
            href: "/admin",
          };

          setNotifications((current) => [notification, ...current]);
          setShowToast(notification);

          if (audioReady.current) {
            playDing();
          }

          window.setTimeout(() => setShowToast(null), 5000);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  async function enableSystemNotifications() {
    if (!("Notification" in window)) {
      alert("مرورگر شما از اعلان سیستمی پشتیبانی نمی‌کند.");
      return;
    }

    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      setSystemNotificationEnabled(true);

      new Notification("اعلان‌ها فعال شد", {
        body: "اعلان سفارش‌ها و رزروهای جدید فعال شد.",
        requireInteraction: true,
      });
    }
  }

  function enableSound() {
    audioReady.current = true;
    setSoundEnabled(true);
    localStorage.setItem("admin-notification-sound", "on");
    playDing();
  }

  function clearNotifications() {
    setNotifications([]);
    setIsOpen(false);
  }

  return (
    <>
      <div className="fixed left-5 top-5 z-[90] flex items-center gap-2">
        {!soundEnabled && (
          <button
            type="button"
            onClick={enableSound}
            className="rounded-full bg-[var(--banakar)] px-4 py-2 text-xs font-bold text-[var(--ink)] shadow-lg"
          >
            فعال‌سازی صدای اعلان
          </button>
        )}

        {!systemNotificationEnabled && (
          <button
            type="button"
            onClick={enableSystemNotifications}
            className="rounded-full bg-[var(--banakar)] px-4 py-2 text-xs font-bold text-[var(--ink)] shadow-lg"
          >
            فعال‌سازی اعلان ویندوز
          </button>
        )}

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[var(--ink)] text-[var(--paper)] shadow-lg"
          aria-label="اعلان‌ها"
        >
          <Icon name="spark" size={18} />

          {notifications.length > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] text-white">
              {notifications.length}
            </span>
          )}
        </button>
      </div>

      {showToast && (
        <button
          type="button"
          onClick={() => {
            window.location.href = showToast.href;
          }}
          className="fixed left-5 top-20 z-[90] w-[280px] cursor-pointer rounded-xl bg-[var(--ink)] p-4 text-right text-[var(--paper)] shadow-2xl transition hover:scale-[1.02]"
        >
          <span className="block text-sm font-bold">{showToast.title}</span>
          <span className="mt-2 block text-xs text-paper/65">
            {showToast.description}
          </span>
          <span className="mt-3 block text-[10px] text-[var(--banakar)]">
            برای مشاهده کلیک کنید
          </span>
        </button>
      )}

      {isOpen && (
        <div className="fixed left-5 top-20 z-[89] w-[320px] rounded-xl border border-ink/15 bg-[var(--paper)] p-4 text-[var(--ink)] shadow-2xl">
          <div className="flex items-center justify-between border-b border-ink/10 pb-3">
            <p className="font-bold">اعلان‌ها</p>

            <button
              type="button"
              onClick={clearNotifications}
              className="text-xs text-ink/50 hover:text-copper"
            >
              پاک‌کردن
            </button>
          </div>

          <div className="mt-3 max-h-80 space-y-3 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="py-5 text-center text-xs text-ink/50">
                اعلان جدیدی وجود ندارد.
              </p>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="border-b border-ink/10 pb-3 last:border-0"
                >
                  <p className="text-sm font-bold">{notification.title}</p>
                  <p className="mt-1 text-xs text-ink/60">
                    {notification.description}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
}
