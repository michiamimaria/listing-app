"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { CATEGORY_BY_SLUG } from "@/data/categories";
import { userHasActivePremiumForPackage } from "@/lib/payment-service";
import type { ListingPackage } from "@/types/business";

function parseListingPackage(v: string): ListingPackage | null {
  if (
    v === "free" ||
    v === "premium3" ||
    v === "premium6" ||
    v === "premium12"
  ) {
    return v;
  }
  return null;
}

function maxImagesForPackage(pkg: ListingPackage): number {
  switch (pkg) {
    case "free":
      return 1;
    case "premium3":
      return 5;
    case "premium6":
      return 10;
    case "premium12":
      return 99;
    default:
      return 0;
  }
}

function priceTierForPackage(pkg: ListingPackage): number {
  if (pkg === "premium12") return 3;
  if (pkg === "premium3" || pkg === "premium6") return 2;
  return 1;
}

export async function submitListingForm(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect(`/prijava?callbackUrl=${encodeURIComponent("/dodaj-biznis")}`);
  }

  const name = String(formData.get("name") ?? "").trim();
  const categorySlug = String(formData.get("categorySlug") ?? "").trim();
  const subcategorySlugRaw = String(
    formData.get("subcategorySlug") ?? ""
  ).trim();
  const city = String(formData.get("city") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const websiteRaw = String(formData.get("website") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const listingPackageRaw = String(
    formData.get("listingPackage") ?? "free"
  ).trim();

  if (!name || !categorySlug || !city || !phone) {
    redirect("/dodaj-biznis?err=missing");
  }

  const listingPackage = parseListingPackage(listingPackageRaw);
  if (!listingPackage) {
    redirect("/dodaj-biznis?err=package");
  }

  const cat = CATEGORY_BY_SLUG.get(categorySlug);
  if (!cat) {
    redirect("/dodaj-biznis?err=missing");
  }

  const subOk = cat.subcategories.some((s) => s.slug === subcategorySlugRaw);
  if (!subOk || !subcategorySlugRaw) {
    redirect("/dodaj-biznis?err=subcategory");
  }

  if (listingPackage !== "free") {
    const ok = await userHasActivePremiumForPackage(
      session.user.id,
      listingPackage
    );
    if (!ok) {
      redirect("/dodaj-biznis?err=package");
    }
  }

  let imageCount = 0;
  for (const entry of formData.getAll("images")) {
    if (entry instanceof File && entry.size > 0) imageCount++;
  }
  const cap = maxImagesForPackage(listingPackage);
  imageCount = Math.min(imageCount, cap);

  const website =
    listingPackage === "free"
      ? null
      : websiteRaw.length > 0
        ? websiteRaw
        : null;

  const priceTier = priceTierForPackage(listingPackage);
  const featured = listingPackage === "premium12";

  try {
    await prisma.listing.create({
      data: {
        userId: session.user.id,
        name,
        categorySlug,
        subcategorySlug: subcategorySlugRaw,
        city,
        phone,
        website,
        description,
        listingPackage,
        rating: 0,
        reviewCount: 0,
        priceTier,
        imageCount,
        featured,
      },
    });
    revalidatePath("/");
    revalidatePath(`/${categorySlug}`);
    revalidatePath("/kategorii");
  } catch {
    redirect("/dodaj-biznis?err=db");
  }

  redirect("/dodaj-biznis?ok=1");
}
