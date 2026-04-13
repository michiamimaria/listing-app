import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";
import {
  hasStripeSecretKey,
  isCardlessDevPaymentMode,
  isDevStripeMock,
} from "@/lib/stripe";
import {
  getActivePremiumPackageKeys,
  recordPaymentFromCheckoutSession,
} from "@/lib/payment-service";

export const metadata: Metadata = {
  title: "Плаќањето е успешно",
};

type Props = {
  searchParams: Promise<{ session_id?: string; mock_ok?: string }>;
};

export default async function PaketiUspeshnoPage({ searchParams }: Props) {
  const { session_id, mock_ok } = await searchParams;
  let recorded = false;
  const session = await auth();

  if (session_id && hasStripeSecretKey()) {
    try {
      const row = await recordPaymentFromCheckoutSession(session_id);
      recorded = recorded || !!row;
    } catch {
      /* Недостапна сесија или не е платено */
    }
  }

  /** mock_ok само по query не значи плаќање — провери активен пакет во база. */
  if (
    !recorded &&
    mock_ok === "1" &&
    isDevStripeMock() &&
    session?.user?.id
  ) {
    const keys = await getActivePremiumPackageKeys(session.user.id);
    recorded = keys.length > 0;
  }

  const cardlessDev = isCardlessDevPaymentMode();

  return (
    <main className="mx-auto w-full min-w-0 max-w-lg px-3 py-12 text-center sm:px-6 sm:py-16">
      <h1 className="text-2xl font-semibold text-slate-900">
        {!recorded ? "Статус на плаќање" : "Плаќањето е примено"}
      </h1>
      {!recorded && mock_ok === "1" && isDevStripeMock() ? (
        <p className="mt-4 text-sm text-slate-600">
          Не најдовме активен премиум пакет за оваа најава. Ако симулираше плаќање,
          најави се со <strong>истата</strong> сметка со која го кликна копчето, или
          оди на{" "}
          <Link href="/paketi" className="font-medium text-emerald-700 underline">
            Пакети
          </Link>{" "}
          и обиди се повторно.
        </p>
      ) : null}
      {recorded ? (
        <>
          <p className="mt-4 text-slate-600">
            Твојот премиум пакет е зачуван.
            {cardlessDev ? (
              <>
                {" "}
                Ова беше локален тест без вистинска картичка.
              </>
            ) : null}{" "}
            Следниот чекор е да го пополниш огласот на страницата{" "}
            <Link
              href="/dodaj-biznis"
              className="font-medium text-emerald-700 underline"
            >
              Додај бизнис
            </Link>{" "}
            (подолг опис, повеќе слики).
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/dodaj-biznis"
              className="inline-block rounded-xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
            >
              Пополни премиум оглас
            </Link>
            <Link
              href="/"
              className="inline-block rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              На почетна
            </Link>
          </div>
        </>
      ) : session_id ? (
        <>
          <p className="mt-4 text-slate-600">
            Не можевме веднаш да го потврдиме плаќањето во базата. Ако картичката
            помина, почекај или провери ги тајните клучеви и повратните повици
            (webhook) во конфигурацијата на серверот.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/paketi"
              className="inline-block rounded-xl bg-[#635BFF] px-6 py-3 text-sm font-semibold text-white hover:bg-[#544bdb]"
            >
              Плати со картичка
            </Link>
            <Link
              href="/dodaj-biznis#plati-so-karticka"
              className="inline-block rounded-xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
            >
              Плати од Додај бизнис
            </Link>
            <Link
              href="/"
              className="inline-block rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              На почетна
            </Link>
          </div>
        </>
      ) : (
        <>
          <p className="mt-4 text-slate-600">
            Нема податоци за сесија. За плаќање со картичка оди на{" "}
            <Link href="/paketi" className="text-emerald-700 underline">
              пакети
            </Link>{" "}
            или на{" "}
            <Link
              href="/dodaj-biznis#plati-so-karticka"
              className="text-emerald-700 underline"
            >
              Додај бизнис
            </Link>
            .
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/paketi"
              className="inline-block rounded-xl bg-[#635BFF] px-6 py-3 text-sm font-semibold text-white hover:bg-[#544bdb]"
            >
              Пакети — плати со картичка
            </Link>
            <Link
              href="/dodaj-biznis#plati-so-karticka"
              className="inline-block rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Додај бизнис
            </Link>
          </div>
        </>
      )}
    </main>
  );
}
