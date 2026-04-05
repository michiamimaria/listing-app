"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState, Suspense } from "react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const registered = searchParams.get("registered");
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
      setError("Погрешна е-пошта или лозинка.");
      return;
    }
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <>
      {registered === "1" ? (
        <p className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
          Сметката е креирана. Сега се најави.
        </p>
      ) : null}

      {error ? (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-900">
          {error}
        </p>
      ) : null}

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700">
            Е-пошта
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-700">
            Лозинка
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-xl bg-emerald-700 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-60"
        >
          {pending ? "Се најавувам…" : "Најави се"}
        </button>
      </form>
    </>
  );
}

export default function LoginPage() {
  return (
    <main className="mx-auto max-w-md px-4 py-10 sm:px-6">
      <nav className="text-sm text-slate-500">
        <Link href="/" className="hover:text-emerald-700">
          Почетна
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800">Најава</span>
      </nav>

      <h1 className="mt-4 text-2xl font-semibold text-slate-900">Најава</h1>
      <p className="mt-2 text-sm text-slate-600">
        Демо: <span className="font-mono text-xs">demo@listaj.mk</span> /{" "}
        <span className="font-mono text-xs">listaj-demo</span>
      </p>

      <Suspense fallback={<p className="mt-6 text-slate-500">Се вчитува…</p>}>
        <LoginForm />
      </Suspense>

      <p className="mt-6 text-center text-sm text-slate-600">
        Немаш сметка?{" "}
        <Link
          href="/registracija"
          className="font-medium text-emerald-700 hover:underline"
        >
          Регистрирај се
        </Link>
      </p>
    </main>
  );
}
