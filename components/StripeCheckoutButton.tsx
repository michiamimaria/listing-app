"use client";

import { useState } from "react";
import { useLocale } from "@/components/locale-provider";

type Props = {
  packageKey: "premium3" | "premium6" | "premium12";
  className?: string;
  /** When card checkout is not available on the server. */
  disabled?: boolean;
  /** Which page to use for cancel return URL. */
  checkoutFrom?: "paketi" | "dodaj-biznis";
  children: React.ReactNode;
};

export function StripeCheckoutButton({
  packageKey,
  className,
  disabled: disabledProp,
  checkoutFrom = "paketi",
  children,
}: Props) {
  const { locale, t } = useLocale();
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
        body: JSON.stringify({ packageKey, from: checkoutFrom, locale }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok) {
        setErr(data.error ?? t.checkoutErrors.generic);
        return;
      }
      if (data.url) {
        const u = data.url;
        window.location.href =
          u.startsWith("/") && !u.startsWith("//")
            ? `${window.location.origin}${u}`
            : u;
        return;
      }
      setErr(t.checkoutErrors.noUrl);
    } catch {
      setErr(t.checkoutErrors.network);
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
        {loading ? t.checkoutErrors.opening : children}
      </button>
      {err ? (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {err}
        </p>
      ) : null}
    </div>
  );
}
