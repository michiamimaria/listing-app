import type { Metadata } from "next";
import Link from "next/link";
import { registerUser } from "./actions";

export const metadata: Metadata = {
  title: "Регистрација",
  description: "Креирај сметка на listaj.mk за да додаваш огласи.",
};

type Props = {
  searchParams: Promise<{ err?: string }>;
};

export default async function RegisterPage({ searchParams }: Props) {
  const sp = await searchParams;

  return (
    <main className="mx-auto max-w-md px-4 py-10 sm:px-6">
      <nav className="text-sm text-slate-500">
        <Link href="/" className="hover:text-emerald-700">
          Почетна
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800">Регистрација</span>
      </nav>

      <h1 className="mt-4 text-2xl font-semibold text-slate-900">
        Нова сметка
      </h1>
      <p className="mt-2 text-sm text-slate-600">
        Потоа ќе можеш да додаваш огласи од страницата{" "}
        <Link href="/dodaj-biznis" className="text-emerald-700 underline">
          Додај бизнис
        </Link>
        .
      </p>

      {sp.err === "missing" ? (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-900">
          Внеси е-пошта и лозинка.
        </p>
      ) : null}
      {sp.err === "password" ? (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-900">
          Лозинката мора да има најмалку 8 знаци.
        </p>
      ) : null}
      {sp.err === "exists" ? (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-900">
          Оваа е-пошта веќе е регистрирана.{" "}
          <Link href="/prijava" className="font-medium underline">
            Најави се
          </Link>
          .
        </p>
      ) : null}
      {sp.err === "db" ? (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-900">
          Грешка при зачувување. Провери дали базата е поставена.
        </p>
      ) : null}

      <form
        action={registerUser}
        className="mt-6 space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">
            Име (незадолжително)
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
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
            Лозинка (мин. 8 знаци)
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-xl bg-emerald-700 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800"
        >
          Регистрирај се
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        Веќе имаш сметка?{" "}
        <Link href="/prijava" className="font-medium text-emerald-700 hover:underline">
          Најави се
        </Link>
      </p>
    </main>
  );
}
