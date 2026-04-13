"use server";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { recordDevMockPayment } from "@/lib/payment-service";
import {
  isStripePackageKey,
  type StripePackageKey,
} from "@/lib/listing-packages";
import { hasStripeSecretKey } from "@/lib/stripe";
import { canUseSimplePremiumForm } from "@/lib/simple-premium-form";

export async function activateSimplePremiumPackage(formData: FormData) {
  if (!canUseSimplePremiumForm() || hasStripeSecretKey()) {
    redirect("/dodaj-biznis?err=demo");
  }

  const session = await auth();
  if (!session?.user?.id) {
    redirect(
      `/prijava?callbackUrl=${encodeURIComponent("/dodaj-biznis")}`,
    );
  }

  const raw = String(formData.get("packageKey") ?? "").trim();
  if (!isStripePackageKey(raw)) {
    redirect("/dodaj-biznis?err=package");
  }

  await recordDevMockPayment(session.user.id, raw as StripePackageKey);

  const to = String(formData.get("redirectTo") ?? "dodaj-biznis").trim();
  if (to === "paketi") {
    redirect("/paketi/uspeshno?mock_ok=1");
  }
  redirect("/dodaj-biznis?plati=1");
}
