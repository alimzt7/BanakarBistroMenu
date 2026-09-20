"use client";

import { useState } from "react";
import type { SubmitEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError("ایمیل یا رمز عبور اشتباه است.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--ink)] px-5">
      <section className="w-full max-w-md bg-[var(--paper)] p-8 text-[var(--ink)]">
        <p className="eyebrow text-copper">پنل مدیریت</p>

        <h1 className="display mt-5 text-4xl">ورود ادمین</h1>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <label className="field-label">
            ایمیل
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="ایمیل ادمین"
              required
            />
          </label>

          <label className="field-label">
            رمز عبور
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="رمز عبور"
              required
            />
          </label>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="primary-button w-full justify-between disabled:opacity-50"
          >
            {loading ? "در حال ورود..." : "ورود به پنل"}
          </button>
        </form>
      </section>
    </main>
  );
}
