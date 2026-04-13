"use server";

import "server-only";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { CATEGORY_BY_SLUG } from "@/data/categories";
import { maxDescriptionCharsForPackage } from "@/lib/listing-constants";
import {
  maxImagesForPackage,
  parseListingPackage,
} from "@/lib/listing-packages";
import { userHasActivePremiumForPackage } from "@/lib/payment-service";
import type { ListingPackage } from "@/types/business";

function addOneMonth(from: Date): Date {
  const d = new Date(from);
  d.setMonth(d.getMonth() + 1);
  return d;
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

  const descMax = maxDescriptionCharsForPackage(listingPackage);
  if (description.length > descMax) {
    redirect("/dodaj-biznis?err=desc");
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
  const now = new Date();
  const freeUntil =
    listingPackage === "free" ? addOneMonth(now) : null;

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
        freeUntil,
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

export async function updateListingForm(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect(`/prijava?callbackUrl=${encodeURIComponent("/moi-oglasi")}`);
  }

  const listingId = String(formData.get("listingId") ?? "").trim();
  if (!listingId) {
    redirect("/moi-oglasi?err=missing");
  }

  const existing = await prisma.listing.findFirst({
    where: { id: listingId, userId: session.user.id },
  });
  if (!existing) {
    redirect("/moi-oglasi?err=notfound");
  }

  const listingPackage = parseListingPackage(existing.listingPackage);
  if (!listingPackage) {
    redirect("/moi-oglasi?err=package");
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

  if (!name || !categorySlug || !city || !phone) {
    redirect(`/moi-oglasi/${listingId}/uredi?err=missing`);
  }

  const descMax = maxDescriptionCharsForPackage(listingPackage);
  if (description.length > descMax) {
    redirect(`/moi-oglasi/${listingId}/uredi?err=desc`);
  }

  const cat = CATEGORY_BY_SLUG.get(categorySlug);
  if (!cat) {
    redirect(`/moi-oglasi/${listingId}/uredi?err=missing`);
  }

  const subOk = cat.subcategories.some((s) => s.slug === subcategorySlugRaw);
  if (!subOk || !subcategorySlugRaw) {
    redirect(`/moi-oglasi/${listingId}/uredi?err=subcategory`);
  }

  let imageCount = existing.imageCount;
  let newFileCount = 0;
  for (const entry of formData.getAll("images")) {
    if (entry instanceof File && entry.size > 0) newFileCount++;
  }
  if (newFileCount > 0) {
    const cap = maxImagesForPackage(listingPackage);
    imageCount = Math.min(newFileCount, cap);
  }

  const website =
    listingPackage === "free"
      ? null
      : websiteRaw.length > 0
        ? websiteRaw
        : null;

  const priceTier = priceTierForPackage(listingPackage);
  const featured = listingPackage === "premium12";

  try {
    await prisma.listing.update({
      where: { id: listingId },
      data: {
        name,
        categorySlug,
        subcategorySlug: subcategorySlugRaw,
        city,
        phone,
        website,
        description,
        priceTier,
        imageCount,
        featured,
      },
    });
    revalidatePath("/");
    revalidatePath(`/${existing.categorySlug}`);
    revalidatePath(`/${categorySlug}`);
    revalidatePath("/kategorii");
    revalidatePath("/moi-oglasi");
  } catch {
    redirect(`/moi-oglasi/${listingId}/uredi?err=db`);
  }

  redirect("/moi-oglasi?ok=edit");
}

export async function deleteListing(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect(`/prijava?callbackUrl=${encodeURIComponent("/moi-oglasi")}`);
  }

  const listingId = String(formData.get("listingId") ?? "").trim();
  if (!listingId) {
    redirect("/moi-oglasi?err=missing");
  }

  const row = await prisma.listing.findFirst({
    where: { id: listingId, userId: session.user.id },
  });
  if (!row) {
    redirect("/moi-oglasi?err=notfound");
  }

  const slug = row.categorySlug;
  try {
    await prisma.listing.delete({ where: { id: listingId } });
    revalidatePath("/");
    revalidatePath(`/${slug}`);
    revalidatePath("/kategorii");
    revalidatePath("/moi-oglasi");
  } catch {
    redirect("/moi-oglasi?err=db");
  }

  redirect("/moi-oglasi?ok=deleted");
}
