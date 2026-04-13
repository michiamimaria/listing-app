"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useLocale } from "@/components/locale-provider";

type Props = {
  callbackUrl: string;
  registered: string | null;
};

export function LoginForm({ callbackUrl, registered }: Props) {
  const router = useRouter();
  const { t } = useLocale();
  const lf = t.ui.loginForm;
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setPending(false);
    if (res?.error) {
      setError(lf.errorInvalid);
      return;
    }
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <>
      {registered === "1" ? (
        <p className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
          {lf.successCreated}
        </p>
      ) : null}

      {error ? (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-900">
          {error}
        </p>
      ) : null}

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"
      >
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-700"
          >
            {lf.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-1 min-h-[44px] w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm sm:min-h-0"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-slate-700"
          >
            {lf.password}
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="mt-1 min-h-[44px] w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm sm:min-h-0"
          />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="min-h-[44px] w-full rounded-xl bg-emerald-700 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-60 sm:min-h-0"
        >
          {pending ? lf.submitting : lf.submit}
        </button>
      </form>
    </>
  );
}
