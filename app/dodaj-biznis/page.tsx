import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";
import { MAIN_CATEGORIES } from "@/data/categories";
import { getCityFilterGroups } from "@/lib/business-queries";
import { CategorySubcategoryFields } from "@/components/CategorySubcategoryFields";
import { submitListingForm } from "./actions";

export const metadata: Metadata = {
  title: "Додај бизнис",
  description:
    "Креирај профил на listaj.mk — категорија, локација, контакт, веб, опис и слики.",
};

const categoryOptions = MAIN_CATEGORIES.map((c) => ({
  slug: c.slug,
  emoji: c.emoji,
  name: c.nameShort ?? c.name,
  subcategories: c.subcategories,
}));

type Props = {
  searchParams: Promise<{ ok?: string; err?: string }>;
};

export default async function AddBusinessPage({ searchParams }: Props) {
  const sp = await searchParams;
  const session = await auth();
  const cityGroups = await getCityFilterGroups();

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
        Избери категорија и подкатегорија, пакет и град. За премиум пакет прво
        плати на страницата{" "}
        <Link href="/paketi" className="font-medium text-emerald-700 underline">
          Пакети
        </Link>
        , потоа избери го истиот пакет тука.
      </p>

      {!session?.user ? (
        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
          <p className="font-medium">Најави се за да зачуваш оглас</p>
          <p className="mt-1 text-amber-900/90">
            Немаш сметка?{" "}
            <Link href="/registracija" className="font-semibold underline">
              Регистрирај се
            </Link>
            , потоа пополни ја формата.
          </p>
          <Link
            href={`/prijava?callbackUrl=${encodeURIComponent("/dodaj-biznis")}`}
            className="mt-3 inline-flex rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            Најави се
          </Link>
        </div>
      ) : null}

      {sp.ok ? (
        <p
          className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900"
          role="status"
        >
          Огласот е зачуван. Ќе се појави на почетната страна и во избраната
          категорија.
        </p>
      ) : null}
      {sp.err === "missing" ? (
        <p
          className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900"
          role="alert"
        >
          Пополни ги име на бизнис, категорија, подкатегорија, град и телефон.
        </p>
      ) : null}
      {sp.err === "subcategory" ? (
        <p
          className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900"
          role="alert"
        >
          Подкатегоријата не одговара на избраната категорија.
        </p>
      ) : null}
      {sp.err === "package" ? (
        <p
          className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900"
          role="alert"
        >
          За избраниот премиум пакет треба успешно плаќање. Отвори{" "}
          <Link href="/paketi" className="font-semibold underline">
            Пакети
          </Link>{" "}
          и заврши го Stripe Checkout, потоа повтори го поднесувањето.
        </p>
      ) : null}
      {sp.err === "db" ? (
        <p
          className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900"
          role="alert"
        >
          Грешка при зачувување. Провери дали базата е креирана (
          <code className="rounded bg-red-100 px-1">npx prisma db push</code>).
        </p>
      ) : null}

      <form
        action={submitListingForm}
        encType="multipart/form-data"
        className="mt-8 space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="space-y-6">
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

          <CategorySubcategoryFields categories={categoryOptions} />

          <div>
            <label
              htmlFor="listingPackage"
              className="block text-sm font-medium text-slate-700"
            >
              Пакет за огласот
            </label>
            <select
              id="listingPackage"
              name="listingPackage"
              required
              defaultValue="free"
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            >
              <option value="free">Бесплатно (1 слика, без веб)</option>
              <option value="premium3">
                Премиум 3 месеци — по плаќање (до 5 слики)
              </option>
              <option value="premium6">
                Премиум 6 месеци — по плаќање (до 10 слики)
              </option>
              <option value="premium12">
                Премиум 12 месеци — по плаќање (истакнат, повеќе слики)
              </option>
            </select>
            <p className="mt-1 text-xs text-slate-500">
              Премиум се активира откако ќе платиш на /paketi со истата сметка.
            </p>
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-slate-700">
              Град / населба
            </label>
            <select
              id="city"
              name="city"
              required
              defaultValue=""
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            >
              <option value="" disabled>
                Избери град
              </option>
              {cityGroups.map((g) => (
                <optgroup key={g.label} label={g.label}>
                  {g.cities.map((c) => (
                    <option key={`${g.label}-${c}`} value={c}>
                      {c}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <p className="mt-1 text-xs text-slate-500">
              Листа: Македонија (општински центри) + големи светски градови.
            </p>
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
              Веб-страница (за премиум; за бесплатно се игнорира)
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
              Слики (бројот се зачувува; качување на фајлови наскоро)
            </label>
            <input
              id="images"
              name="images"
              type="file"
              accept="image/*"
              multiple
              className="mt-1 w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-emerald-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-emerald-800"
            />
            <p className="mt-1 text-xs text-slate-500">
              Лимити по пакет: бесплатно 1, 3м до 5, 6м до 10, 12м повеќе.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-emerald-700 px-6 text-sm font-semibold text-white hover:bg-emerald-800"
            >
              Зачувај оглас
            </button>
            <Link
              href="/paketi"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 px-6 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Спореди пакети
            </Link>
          </div>
        </div>
      </form>
    </main>
  );
}
