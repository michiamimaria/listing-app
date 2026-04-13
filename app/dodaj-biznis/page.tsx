import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";
import { MAIN_CATEGORIES } from "@/data/categories";
import { getCityFilterGroups } from "@/lib/business-queries";
import { getActivePremiumPackageKeys } from "@/lib/payment-service";
import { isCardlessDevPaymentMode, isStripeConfigured } from "@/lib/stripe";
import { canUseSimplePremiumForm } from "@/lib/simple-premium-form";
import { DemoPremiumPackageForm } from "@/components/DemoPremiumPackageForm";
import { DodajBiznisPremiumPay } from "@/components/DodajBiznisPremiumPay";
import { ListingFormSection } from "./listing-form-section";

export const metadata: Metadata = {
  title: "Додај бизнис",
  description:
    "Креирај профил на listaj.mk — категорија, локација, контакт, веб, опис и слики.",
};

/** Свежа server-action мапа по барање (избегнува stale action id по HMR). */
export const dynamic = "force-dynamic";

const categoryOptions = MAIN_CATEGORIES.map((c) => ({
  slug: c.slug,
  emoji: c.emoji,
  name: c.nameShort ?? c.name,
  subcategories: c.subcategories,
}));

type Props = {
  searchParams: Promise<{
    ok?: string;
    err?: string;
    mode?: string;
    otkazano?: string;
    /** Симулирано / тест плаќање завршено — прикажи потврда. */
    plati?: string;
  }>;
};

export default async function AddBusinessPage({ searchParams }: Props) {
  const sp = await searchParams;
  const session = await auth();
  const cityGroups = await getCityFilterGroups();

  const activePremium =
    session?.user?.id != null
      ? await getActivePremiumPackageKeys(session.user.id)
      : [];
  const forceBasic = sp.mode === "basic";
  const showPremiumForm =
    Boolean(session?.user) && activePremium.length > 0 && !forceBasic;
  /** Најавен без пакет: прво плаќање на /dodaj-biznis, потоа премиум форма (не мешај со бесплатна). */
  const payFirstBeforePremiumForm =
    Boolean(session?.user) && activePremium.length === 0 && !forceBasic;
  const defaultPremium = activePremium[0] ?? "premium3";
  const stripeOn = isStripeConfigured();
  const simulateCardlessPayment = isCardlessDevPaymentMode();
  const simplePremiumForm = canUseSimplePremiumForm();

  return (
    <main className="mx-auto w-full min-w-0 max-w-2xl px-3 py-8 sm:px-6 sm:py-10">
      <nav className="text-sm text-slate-500">
        <Link href="/" className="hover:text-emerald-700">
          Почетна
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800">Додај бизнис</span>
      </nav>

      {showPremiumForm ? (
        <>
          <h1 className="mt-6 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Премиум оглас
          </h1>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Користи го активниот пакет: подолг опис, повеќе слики и веб-адреса.
          </p>
        </>
      ) : payFirstBeforePremiumForm ? (
        <>
          <h1 className="mt-6 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Премиум оглас
          </h1>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            <span className="font-semibold text-emerald-900">Чекор 1:</span>{" "}
            {simplePremiumForm
              ? "пополни ја формата подолу и активирај пакет (без картичка)."
              : simulateCardlessPayment
                ? "избери пакет подолу (тест без картичка)."
                : "плати пакет подолу со картичка (безбедна страница)."}{" "}
            <span className="font-semibold text-emerald-900">Чекор 2:</span> врати
            се на оваа страница — ќе се појави формата за премиум оглас.
          </p>
        </>
      ) : (
        <>
          <h1 className="mt-6 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Додај бизнис
          </h1>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Категорија, локација, контакт и краток опис. За веб и проширен
            профил има{" "}
            <Link
              href="/paketi"
              className="font-medium text-emerald-700 underline"
            >
              премиум пакети
            </Link>
            .
          </p>
        </>
      )}

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

      {session?.user && activePremium.length > 0 && forceBasic ? (
        <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-950">
          <p>
            Имаш активен премиум. За подолг опис и повеке слики отвори ја{" "}
            <Link href="/dodaj-biznis" className="font-semibold underline">
              премиум формата
            </Link>
            .
          </p>
        </div>
      ) : null}

      {!showPremiumForm && activePremium.length === 0 ? (
        <div id="plati-so-karticka" className="mt-6 scroll-mt-24 space-y-3">
          {simplePremiumForm ? (
            <DemoPremiumPackageForm redirectAfter="dodaj-biznis" />
          ) : (
            <DodajBiznisPremiumPay
              stripeOn={stripeOn}
              loggedIn={Boolean(session?.user)}
              simulateCardlessPayment={simulateCardlessPayment}
            />
          )}
          {payFirstBeforePremiumForm ? (
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">
              <p className="font-medium text-slate-900">По успешно плаќање</p>
              <p className="mt-1">
                {simplePremiumForm ? (
                  <>
                    По „Активирај пакет“ освежи ја страницата — премиум формата се
                    појавува веднаш.
                  </>
                ) : (
                  <>
                    Освежи ја страницата (или отвори повторно „Додај бизнис“) —
                    премиум формата се појавува автоматски.
                    {simulateCardlessPayment ? (
                      <> На локален тест нема форма за картичка.</>
                    ) : (
                      <>
                        {" "}
                        Ако се отвори нова страница за плаќање, затвори ја пред да
                        освежиш.
                      </>
                    )}
                  </>
                )}
              </p>
              <p className="mt-3 border-t border-slate-100 pt-3">
                <Link
                  href="/dodaj-biznis?mode=basic"
                  className="font-semibold text-emerald-800 underline hover:text-emerald-950"
                >
                  Објави бесплатен оглас наместо премиум
                </Link>
                <span className="text-slate-500">
                  {" "}
                  — една слика, пократок опис, без веб.
                </span>
              </p>
            </div>
          ) : null}
        </div>
      ) : null}


      {sp.otkazano ? (
        <p
          className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950"
          role="status"
        >
          Плаќањето е откажано. Можеш да пробаш повторно со копчињата погоре или
          на{" "}
          <Link href="/paketi" className="font-semibold underline">
            Пакети
          </Link>
          .
        </p>
      ) : null}

      {sp.plati === "1" && session?.user ? (
        activePremium.length > 0 ? (
          <p
            className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900"
            role="status"
          >
            Пакетот е активен.
            {simplePremiumForm || simulateCardlessPayment
              ? " (без картичка.)"
              : ""}{" "}
            Пополни го
            премиум огласот подолу.{" "}
            <Link
              href="/dodaj-biznis"
              className="font-semibold text-emerald-800 underline"
            >
              Исчисти ја адресата
            </Link>
          </p>
        ) : (
          <p
            className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950"
            role="status"
          >
            Не гледаме активен пакет. Освежи ја страницата или најави се со истата
            сметка со која го кликна копчето.
          </p>
        )
      ) : null}

      {sp.ok ? (
        <p
          className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900"
          role="status"
        >
          Огласот е зачуван. ќе се појави на почетната страна и во избраната
          категорија.
          {session?.user ? (
            <>
              {" "}
              <Link
                href="/moi-oglasi"
                className="font-semibold text-emerald-800 underline hover:text-emerald-950"
              >
                Мои огласи
              </Link>{" "}
              — уреди или избриши подоцна.
            </>
          ) : null}
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
          и заврши го пла��ањето, потоа повтори го поднесувањето.
        </p>
      ) : null}
      {sp.err === "demo" ? (
        <p
          className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900"
          role="alert"
        >
          Оваа опција за активирање не е достапно со тековната конфигурација на
          серверот. Користи пла��ање со картичка или контактирај админ.
        </p>
      ) : null}
      {sp.err === "desc" ? (
        <p
          className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900"
          role="alert"
        >
          Описот е подолг од дозволеното за избраниот пакет. Провери го лимитот
          под полето или избери поголем пакет.
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

      {!payFirstBeforePremiumForm ? (
        <ListingFormSection
          showPremiumForm={showPremiumForm}
          cityGroups={cityGroups}
          categoryOptions={categoryOptions}
          activePremium={activePremium}
          defaultPremium={defaultPremium}
        />
      ) : null}
    </main>
  );
}
