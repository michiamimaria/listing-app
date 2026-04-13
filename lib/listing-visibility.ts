import type { Prisma } from "@/generated/prisma";

/** Бесплатниот пакет е видлив додека не истече freeUntil (или legacy: до 1 месец од createdAt ако freeUntil е null). */
export function publiclyVisibleListingWhere(): Prisma.ListingWhereInput {
  const now = new Date();
  const trialStartCutoff = new Date(now);
  trialStartCutoff.setMonth(trialStartCutoff.getMonth() - 1);

  return {
    OR: [
      { listingPackage: { not: "free" } },
      {
        AND: [
          { listingPackage: "free" },
          {
            OR: [
              { freeUntil: { gte: now } },
              {
                AND: [
                  { freeUntil: null },
                  { createdAt: { gte: trialStartCutoff } },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
}
