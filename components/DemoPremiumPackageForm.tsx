import Link from "next/link";
import { auth } from "@/auth";
import { activateSimplePremiumPackage } from "@/app/dodaj-biznis/simple-premium-action";
import { PaymentMethodPicker } from "@/components/PaymentMethodPicker";
import { canUseSimplePremiumForm } from "@/lib/simple-premium-form";

const loginHref = `/prijava?callbackUrl=${encodeURIComponent("/dodaj-biznis")}`;
const loginPaketiHref = `/prijava?callbackUrl=${encodeURIComponent("/paketi")}`;

type Props = {
  redirectAfter: "dodaj-biznis" | "paketi";
};

export async function DemoPremiumPackageForm({ redirectAfter }: Props) {
  if (!canUseSimplePremiumForm()) return null;

  const session = await auth();
  const login =
    redirectAfter === "paketi" ? loginPaketiHref : loginHref;

  return (
    <div id="demo-premium-form" className="w-full max-w-lg">
      {!session?.user ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-700">Најави се за да платиш / активираш пакет.</p>
          <Link
            href={login}
            className="mt-3 inline-flex rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            Најави се
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
