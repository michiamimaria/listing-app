import type { Metadata } from "next";
import Link from "next/link";
import { getServerLocale } from "@/lib/i18n/locale";
import { messages } from "@/lib/i18n/messages";
import { registerUser } from "./actions";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const rp = messages[locale].ui.registerPage;
  return { title: rp.title, description: rp.description };
}

type Props = {
  searchParams: Promise<{ err?: string }>;
};

export default async function RegisterPage({ searchParams }: Props) {
  const sp = await searchParams;
  const locale = await getServerLocale();
  const rp = messages[locale].ui.registerPage;
  const ui = messages[locale].ui;
  const nav = messages[locale].nav;

  return (
    <main className="mx-auto w-full min-w-0 max-w-md px-3 py-8 sm:px-6 sm:py-10">
      <nav className="text-sm text-slate-500">
        <Link href="/" className="hover:text-emerald-700">
          {ui.common.home}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800">{rp.breadcrumb}</span>
      </nav>

      <h1 className="mt-4 text-2xl font-semibold text-slate-900">{rp.heading}</h1>
      <p className="mt-2 text-sm text-slate-600">
        {rp.intro}{" "}
        <Link href="/dodaj-biznis" className="text-emerald-700 underline">
          {nav.addBusiness}
        </Link>
        .
      </p>

      {sp.err === "missing" ? (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-900">
          {rp.hint}
        </p>
      ) : null}
      {sp.err === "password" ? (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-900">
          {rp.passwordShort}
        </p>
      ) : null}
      {sp.err === "exists" ? (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-900">
          {rp.emailTaken}{" "}
          <Link href="/prijava" className="font-medium underline">
            {rp.signInLink}
          </Link>
          .
        </p>
      ) : null}
      {sp.err === "db" ? (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-900">
          {rp.dbError}
        </p>
      ) : null}

      <form
        action={registerUser}
        className="mt-6 space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">
            {rp.nameOptional}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            className="mt-1 min-h-[44px] w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm sm:min-h-0"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700">
            {rp.email}
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
          <label htmlFor="password" className="block text-sm font-medium text-slate-700">
            {rp.password}
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            className="mt-1 min-h-[44px] w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm sm:min-h-0"
          />
        </div>
        <button
          type="submit"
          className="min-h-[44px] w-full rounded-xl bg-emerald-700 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800 sm:min-h-0"
        >
          {rp.submit}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        {rp.hasAccount}{" "}
        <Link href="/prijava" className="font-medium text-emerald-700 hover:underline">
          {rp.signIn}
        </Link>
      </p>
    </main>
  );
}
