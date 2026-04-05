"use server";

import { redirect } from "next/navigation";

export async function submitListingForm(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const categorySlug = String(formData.get("categorySlug") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();

  if (!name || !categorySlug || !city || !phone) {
    redirect("/dodaj-biznis?err=missing");
  }

  redirect("/dodaj-biznis?ok=1");
}
