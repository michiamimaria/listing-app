"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { refreshListingReviewAggregates } from "@/lib/listing-review-stats";
import { publiclyVisibleListingWhere } from "@/lib/listing-visibility";
import { revalidatePath } from "next/cache";

const MAX_COMMENT = 2000;

export type SubmitListingReviewResult =
  | { ok: true }
  | { ok: false; error: string };

export async function submitListingReview(
  listingId: string,
  rating: number,
  commentRaw: string
): Promise<SubmitListingReviewResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { ok: false, error: "auth" };
  }

  const comment = commentRaw.trim().slice(0, MAX_COMMENT);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return { ok: false, error: "rating" };
  }

  const listing = await prisma.listing.findFirst({
    where: { AND: [{ id: listingId }, publiclyVisibleListingWhere()] },
    select: { id: true, userId: true, categorySlug: true },
  });

  if (!listing) {
    return { ok: false, error: "notFound" };
  }

  if (listing.userId === session.user.id) {
    return { ok: false, error: "ownListing" };
  }

  await prisma.listingReview.upsert({
    where: {
      listingId_userId: { listingId, userId: session.user.id },
    },
    create: {
      listingId,
      userId: session.user.id,
      rating,
      comment,
    },
    update: {
      rating,
      comment,
    },
  });

  await refreshListingReviewAggregates(listingId);

  revalidatePath(`/oglasi/${listingId}`);
  revalidatePath(`/${listing.categorySlug}`);
  revalidatePath("/");

  return { ok: true };
}
