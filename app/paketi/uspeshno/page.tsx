import type { Metadata } from "next";
import Link from "next/link";
import {
  hasStripeSecretKey,
  isDevStripeMock,
} from "@/lib/stripe";
import { recordPaymentFromCheckoutSession } from "@/lib/payment-service";

export const metadata: Metadata = {
  title: "Плаќањето е успешно",
};

type Props = {
  searchParams: Promise<{ session_id?: string; mock_ok?: string }>;
};

export default async function PaketiUspeshnoPage({ searchParams }: Props) {
  const { session_id, mock_ok } = await searchParams;
  let recorded = false;

  if (mock_ok === "1" && isDevStripeMock()) {
    recorded = true;
  }

  if (session_id && hasStripeSecretKey()) {
    try {
      const row = await recordPaymentFromCheckoutSession(session_id);
      recorded = recorded || !!row;
    } catch {
      /* останува recorded од mock_ok */
    }
  }

  return (
    <main className="mx-auto max-w-lg px-4 py-16 text-center sm:px-6">
      <h1 className="text-2xl font-semibold text-slate-900">
        Плаќањето е примено
      </h1>
      {recorded ? (
        <p className="mt-4 text-slate-600">
          {mock_ok === "1" && isDevStripeMock() ? (
            <span className="mb-3 block text-xs text-slate-500">
              Тест без Stripe — не е наплатено со картичка.
            </span>
          ) : null}
          Твојот премиум пакет е зачуван. Сега можеш да додадеш оглас и да го
          избереш истиот пакет во формата{" "}
          <Link href="/dodaj-biznis" className="font-medium text-emerald-700 underline">
            Додај бизнис
          </Link>
          .
        </p>
      ) : session_id ? (
        <p className="mt-4 text-slate-600">
          Ако плаќањето помина, провери дали <code className="rounded bg-slate-100 px-1">STRIPE_SECRET_KEY</code> е
          точен или почекај го webhook. Можеш да се обидеш повторно подоцна или да{" "}
          <Link href="/dodaj-biznis" className="text-emerald-700 underline">
            додадеш бесплатен оглас
          </Link>
          .
        </p>
      ) : (
        <p className="mt-4 text-slate-600">
          Нема податоци за сесија. Врати се на{" "}
          <Link href="/paketi" className="text-emerald-700 underline">
            пакети
          </Link>
          .
        </p>
      )}
      <Link
        href="/"
        className="mt-8 inline-block rounded-xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
      >
        На почетна
      </Link>
    </main>
  );
}
