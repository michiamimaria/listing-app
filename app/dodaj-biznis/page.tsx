import type { Metadata } from "next";
import Link from "next/link";
import { MAIN_CATEGORIES } from "@/data/categories";
import { submitListingForm } from "./actions";

export const metadata: Metadata = {
  title: "Додај бизнис",
  description:
    "Креирај профил на listaj.mk — категорија, локација, контакт, веб, опис и слики.",
};

type Props = {
  searchParams: Promise<{ ok?: string; err?: string }>;
};

export default async function AddBusinessPage({ searchParams }: Props) {
  const sp = await searchParams;

  return (
    <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <nav className="text-sm text-slate-500">
        <Link href="/" className="hover:text-emerald-700">
          Почетна
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800">Додај бизнис</span>
      </nav>

      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">
        Додај го твојот бизнис
      </h1>
      <p className="mt-2 text-slate-600">
        Пополни ги основните податоци. Најава, качување слики и мапи можат да
        се поврзат кога backend-от ќе биде готов.
      </p>

      {sp.ok ? (
        <p
          className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900"
          role="status"
        >
          Ви благодариме — пораката е примена (демо). За вистински огласи
          поврзи база на податоци и автентикација.
        </p>
      ) : null}
      {sp.err === "missing" ? (
        <p
          className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900"
          role="alert"
        >
          Пополни ги име на бизнис, категорија, град и телефон.
        </p>
      ) : null}

      <form
        action={submitListingForm}
        className="mt-8 space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">
            Име на бизнис
          </label>
          <input
            id="name"
            name="name"
            required
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="categorySlug"
            className="block text-sm font-medium text-slate-700"
          >
            Категорија
          </label>
          <select
            id="categorySlug"
            name="categorySlug"
            required
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            defaultValue=""
          >
            <option value="" disabled>
              Избери категорија
            </option>
            {MAIN_CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.emoji} {c.name}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-slate-500">
            Подкатегорија и пакет можат да се изберат по најава во целосна
            верзија.
          </p>
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-slate-700">
            Град / населба
          </label>
          <input
            id="city"
            name="city"
            required
            placeholder="на пр. Скопје"
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
            Телефон
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label htmlFor="website" className="block text-sm font-medium text-slate-700">
            Веб-страница (премиум)
          </label>
          <input
            id="website"
            name="website"
            type="url"
            placeholder="https://"
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-slate-700"
          >
            Опис на услугите
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label htmlFor="images" className="block text-sm font-medium text-slate-700">
            Слики
          </label>
          <input
            id="images"
            name="images"
            type="file"
            accept="image/*"
            multiple
            className="mt-1 w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-emerald-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-emerald-800"
          />
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-emerald-700 px-6 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            Испрати оглас
          </button>
          <Link
            href="/paketi"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 px-6 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Спореди пакети
          </Link>
        </div>
      </form>
    </main>
  );
}
