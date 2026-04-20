"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "@/components/locale-provider";
import { useTransition, useState } from "react";
import { submitListingReview } from "@/app/oglasi/[id]/actions";

type Props = {
  listingId: string;
  disabled: boolean;
  existingRating?: number;
  existingComment?: string;
};

export function ListingReviewForm({
  listingId,
  disabled,
  existingRating,
  existingComment,
}: Props) {
  const { t } = useLocale();
  const ld = t.ui.listingDetail;
  const [rating, setRating] = useState(existingRating ?? 5);
  const [comment, setComment] = useState(existingComment ?? "");
  const [err, setErr] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const mapErr = (code: string) => {
    switch (code) {
      case "auth":
        return ld.errorAuth;
      case "rating":
        return ld.errorRating;
      case "notFound":
        return ld.errorNotFound;
      case "ownListing":
        return ld.errorOwn;
      default:
        return ld.errorGeneric;
    }
  };

  if (disabled) {
    return (
      <p className="rounded-lg border border-amber-100 bg-amber-50/80 px-3 py-2 text-sm text-amber-950">
        {ld.ownListingHint}
      </p>
    );
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    startTransition(async () => {
      const res = await submitListingReview(listingId, rating, comment);
      if (!res.ok) {
        setErr(mapErr(res.error));
        return;
      }
      router.refresh();
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 rounded-xl border border-slate-200 bg-slate-50/80 p-4">
      <p className="text-sm font-medium text-slate-800">{ld.yourReview}</p>
      <div>
        <label htmlFor="review-rating" className="block text-xs font-medium text-slate-600">
          {ld.ratingLabel}
        </label>
        <select
          id="review-rating"
          name="rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="mt-1 w-full max-w-xs rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="review-comment" className="block text-xs font-medium text-slate-600">
          {ld.commentLabel}
        </label>
        <textarea
          id="review-comment"
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          placeholder={ld.commentPlaceholder}
          className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </div>
      {err ? (
        <p className="text-sm text-red-700" role="alert">
          {err}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-800 disabled:opacity-60"
      >
        {pending ? ld.submitting : existingRating != null ? ld.updateReview : ld.submitReview}
      </button>
    </form>
  );
}
