import type { Metadata } from "next";
import Link from "next/link";
import { DemoPremiumPackageForm } from "@/components/DemoPremiumPackageForm";
import { StripeCheckoutButton } from "@/components/StripeCheckoutButton";
import { canUseSimplePremiumForm } from "@/lib/simple-premium-form";
import { isStripeConfigured } from "@/lib/stripe";
import { STRIPE_PACKAGE_KEYS, STRIPE_PACKAGES } from "@/lib/listing-packages";

export const metadata: Metadata = {
  title: "Пакети за листање",
  description:
    "Еден месец бесплатно, потоа премиум на listaj.mk — опис по пакет (800–12.000 знаци), MKD.",
};

const freeFeatures = [
  "Прв месец без наплата",
  "Име на бизнис",
  "Една категорија",
  "Град / локација",
  "Телефон",
  "Опис до 800 карактери (премиум до 12.000)",
  "Појава во резултати од пребарување",
  "1 слика",
];

const freeLimits = [
  "По истек на месецот задолжителен еден од премиум пакетите",
  "Нема приоритет во пребарување",
  "Нема истакнување",
  "Нема линк кон веб-страница",
];

export default async function PackagesPage() {
  const stripeOn = isStripeConfigured();
  const simpleForm = canUseSimplePremiumForm();

  return (
    <main className="mx-auto w-full min-w-0 max-w-6xl px-3 py-8 sm:px-6 sm:py-10">
      <nav className="text-sm text-slate-500">
        <Link href="/" className="hover:text-emerald-700">
          Почетна
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800">Пакети</span>
      </nav>

      <header className="mt-4 max-w-2xl min-w-0">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Пакети за листање на бизниси
        </h1>
        <p className="mt-3 text-slate-600">
          Првиот месец е бесплатно: користиш го основниот пакет без наплата. По
          истек на тој период, за да останеш објавен мора да избереш еден од
          премиум пакетите. Плаќањето е со картичка на безбедна страница; цените се во денари (MKD).
        </p>
      </header>

      {!simpleForm ? (
        <p className="mt-8 max-w-2xl text-sm text-slate-600">
          По завршување на бесплатниот месец избери еден од пакетите подолу и
          плати со картичка (Visa, Mastercard, American Express и др.) на
          безбедна страница за плаќање.
        </p>
      ) : null}

      <div className="mt-10 grid min-w-0 gap-8 lg:grid-cols-2 lg:items-start">
        <div className="min-w-0 space-y-4">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            Бесплатно листање
          </h2>
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
            <p className="text-3xl font-bold text-emerald-800">
              0 денари <span className="text-lg font-normal">/ 1 месец</span>
            </p>
          <p className="mt-2 text-sm text-slate-600">
            Еден месец пробен период; потоа премин на премиум за да остане огласот
            активен на сајтот.
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
        </div>

        <div className="min-w-0 space-y-4 lg:space-y-5">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            Премиум пакети
          </h2>
          {simpleForm ? (
            <div className="w-full min-w-0">
              <DemoPremiumPackageForm redirectAfter="paketi" />
            </div>
          ) : null}
          {!simpleForm && !stripeOn ? (
            <p
              className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-950"
              role="status"
            >
              Страницата за плаќање со картичка моментално не е подготвена на
              серверот. Провери ја конфигурацијата (на пр. во{" "}
              <code className="rounded bg-amber-100 px-1">.env</code>) и рестартирај
              го серверот. Копчињата подолу се активни — ако нешто недостасува, ќе се појави порака за грешка.
            </p>
          ) : null}
          {STRIPE_PACKAGE_KEYS.map((key) => {
            const p = STRIPE_PACKAGES[key];
            return (
              <section
                key={key}
                className={`min-w-0 rounded-2xl border p-5 shadow-sm sm:p-8 ${
                  p.popular
                    ? "border-emerald-400 bg-emerald-50/50 ring-2 ring-emerald-200"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="min-w-0 break-words text-lg font-semibold text-slate-900">
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
                  {simpleForm ? (
                    <p className="text-sm text-slate-600">
                      Активирање:{" "}
                      <a
                        href="#demo-premium-form"
                        className="font-medium text-emerald-700 underline"
                      >
                        формата погоре
                      </a>
                      .
                    </p>
                  ) : (
                    <>
                      <p className="mb-2 text-xs text-slate-600">
                        Кликни за безбедна страница за плаќање — Visa, Mastercard,
                        American Express и други дебитни/кредитни картички.
                      </p>
                      <StripeCheckoutButton packageKey={key}>
                        Плати со картичка — {p.amountMkd} ден
                      </StripeCheckoutButton>
                    </>
                  )}
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
