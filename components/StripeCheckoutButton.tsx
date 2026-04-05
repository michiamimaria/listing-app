"use client";

import { useState } from "react";

type Props = {
  packageKey: "premium3" | "premium6" | "premium12";
  className?: string;
  /** Кога Stripe не е конфигуриран на серверот */
  disabled?: boolean;
  children: React.ReactNode;
};

export function StripeCheckoutButton({
  packageKey,
  className,
  disabled: disabledProp,
  children,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onClick() {
    if (disabledProp) return;
    setErr(null);
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageKey }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok) {
        setErr(data.error ?? "Неуспешно плаќање");
        return;
      }
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setErr("Нема линк од Stripe");
    } catch {
      setErr("Мрежна грешка");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={onClick}
        disabled={loading || disabledProp}
        className={
          className ??
          "inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#635BFF] px-6 text-sm font-semibold text-white hover:bg-[#544bdb] disabled:opacity-60"
        }
      >
        {loading ? "Се отвора Stripe…" : children}
      </button>
      {err ? (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {err}
        </p>
      ) : null}
    </div>
  );
}
