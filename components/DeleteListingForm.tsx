"use client";

import { deleteListing } from "@/app/dodaj-biznis/actions";

type Props = { listingId: string };

export function DeleteListingForm({ listingId }: Props) {
  return (
    <form action={deleteListing} className="inline">
      <input type="hidden" name="listingId" value={listingId} />
      <button
        type="submit"
        className="min-h-[44px] rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-800 hover:bg-red-50 sm:min-h-0"
        onClick={(e) => {
          if (
            !confirm(
              "Да го избришеш овој оглас? Ова не може да се врати."
            )
          ) {
            e.preventDefault();
          }
        }}
      >
        Избриши
      </button>
    </form>
  );
}
