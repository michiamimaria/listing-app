import Link from "next/link";
import { auth } from "@/auth";
import { activateSimplePremiumPackage } from "@/app/dodaj-biznis/simple-premium-action";
import { PaymentMethodPicker } from "@/components/PaymentMethodPicker";
import { getServerLocale } from "@/lib/i18n/locale";
import { messages } from "@/lib/i18n/messages";
import { canUseSimplePremiumForm } from "@/lib/simple-premium-form";

type Props = {
  redirectAfter: "dodaj-biznis" | "paketi";
};

export async function DemoPremiumPackageForm({ redirectAfter }: Props) {
  if (!canUseSimplePremiumForm()) return null;

  const session = await auth();
  const locale = await getServerLocale();
  const demo = messages[locale].ui.demoPremium;
  const loginHref =
    redirectAfter === "paketi"
      ? `/prijava?callbackUrl=${encodeURIComponent("/paketi")}`
      : `/prijava?callbackUrl=${encodeURIComponent("/dodaj-biznis")}`;

  return (
    <div id="demo-premium-form" className="w-full max-w-lg">
      {!session?.user ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-700">{demo.needSignIn}</p>
          <Link
            href={loginHref}
            className="mt-3 inline-flex rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            {demo.signIn}
          </Link>
        </div>
      ) : (
        <form
          key="demo-simple-premium"
          action={activateSimplePremiumPackage}
          className="mx-auto w-full max-w-lg"
        >
          <input type="hidden" name="redirectTo" value={redirectAfter} />
          <PaymentMethodPicker
            redirectAfter={redirectAfter}
            userEmail={session.user.email ?? null}
          />
        </form>
      )}
    </div>
  );
}
