import type { Metadata } from "next";
import Link from "next/link";
import { StripeCheckoutButton } from "@/components/StripeCheckoutButton";
import { isStripeConfigured } from "@/lib/stripe";
import { STRIPE_PACKAGE_KEYS, STRIPE_PACKAGES } from "@/lib/listing-packages";

export const metadata: Metadata = {
  title: "Пакети за листање",
  description:
    "Бесплатно и премиум листање на listaj.mk — видливост, слики, категории и приоритет во пребарување.",
};

const freeFeatures = [
  "Име на бизнис",
  "Една категорија",
  "Град / локација",
  "Телефон",
  "Краток опис",
  "Појава во резултати од пребарување",
  "1 слика",
];

const freeLimits = [
  "Нема приоритет во пребарување",
  "Нема истакнување",
  "Ограничен опис",
  "Нема линк кон веб-страница",
];

export default function PackagesPage() {
  const stripeOn = isStripeConfigured();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav className="text-sm text-slate-500">
        <Link href="/" className="hover:text-emerald-700">
          Почетна
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800">Пакети</span>
      </nav>

      <header className="mt-4 max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          Пакети за листање на бизниси
        </h1>
        <p className="mt-3 text-slate-600">
          Секој бизнис може бесплатно да се појави. Премиум пакетите додаваат
          видливост, побогат профил и подобро место во пребарувањето — цените се
          во денари (MKD). Плаќање со картичка преку Stripe.
        </p>
      </header>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Бесплатно листање
          </h2>
          <p className="mt-1 text-3xl font-bold text-emerald-800">0 денари</p>
          <p className="mt-2 text-sm text-slate-600">
            Основно присуство на платформата за бизниси што започнуваат.
          </p>
          <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Вклучено
          </h3>
          <ul className="mt-3 space-y-2 text-slate-700">
            {freeFeatures.map((f) => (
              <li key={f} className="flex gap-2">
                <span className="text-emerald-600">✓</span>
                {f}
              </li>
            ))}
          </ul>
          <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Ограничувања
          </h3>
          <ul className="mt-3 space-y-2 text-slate-600">
            {freeLimits.map((f) => (
              <li key={f} className="flex gap-2">
                <span className="text-slate-400">—</span>
                {f}
              </li>
            ))}
          </ul>
          <Link
            href="/dodaj-biznis"
            className="mt-8 inline-flex h-11 items-center justify-center rounded-xl border-2 border-emerald-700 px-6 text-sm font-semibold text-emerald-800 hover:bg-emerald-50"
          >
            Започни бесплатно
          </Link>
        </section>

        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Премиум пакети
          </h2>
          {STRIPE_PACKAGE_KEYS.map((key) => {
            const p = STRIPE_PACKAGES[key];
            return (
              <section
                key={key}
                className={`rounded-2xl border p-8 shadow-sm ${
                  p.popular
                    ? "border-emerald-400 bg-emerald-50/50 ring-2 ring-emerald-200"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {p.badge}
                  </h3>
                  {p.popular ? (
                    <span className="rounded-full bg-emerald-700 px-2 py-0.5 text-xs font-semibold text-white">
                      Најдобра вредност
                    </span>
                  ) : null}
                </div>
                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {p.amountMkd}{" "}
                  <span className="text-lg font-normal text-slate-600">ден</span>
                </p>
                <p className="text-sm text-slate-600">{p.monthlyHint}</p>
                <ul className="mt-6 space-y-2 text-slate-700">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="text-emerald-600">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <StripeCheckoutButton packageKey={key} disabled={!stripeOn}>
                    Плати со Stripe — {p.amountMkd} ден
                  </StripeCheckoutButton>
                </div>
              </section>
            );
          })}
          <Link
            href="/dodaj-biznis"
            className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-emerald-700 px-6 text-sm font-semibold text-white hover:bg-emerald-800 lg:w-auto"
          >
            Додај бизнис — избери пакет во формата
          </Link>
          <p className="text-xs text-slate-500">
            По успешно плаќање отвори{" "}
            <Link href="/dodaj-biznis" className="underline">
              Додај бизнис
            </Link>{" "}
            и избери го истиот премиум пакет.
          </p>
        </div>
      </div>
    </main>
  );
}
