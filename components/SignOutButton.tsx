"use client";

import { signOut } from "next-auth/react";
import { useLocale } from "@/components/locale-provider";

export function SignOutButton() {
  const { t } = useLocale();

  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="rounded-lg px-2 py-1.5 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 sm:px-3"
    >
      {t.header.signOut}
    </button>
  );
}
