import { prisma } from "@/lib/prisma";

/** Пресметува просек и број од табелата ListingReview и ги запишува на Listing. */
export async function refreshListingReviewAggregates(listingId: string) {
  const agg = await prisma.listingReview.aggregate({
    where: { listingId },
    _avg: { rating: true },
    _count: { _all: true },
  });
  const count = agg._count._all;
  const rawAvg = agg._avg.rating ?? 0;
  const rating =
    count === 0 ? 0 : Math.round(rawAvg * 10) / 10;

  await prisma.listing.update({
    where: { id: listingId },
    data: { rating, reviewCount: count },
  });
}
