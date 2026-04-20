export function HomeFeedSkeleton() {
  return (
    <div className="space-y-14" aria-busy="true" aria-label="Loading listings">
      {[1, 2, 3].map((block) => (
        <section key={block} className="mb-14">
          <div className="h-7 w-48 animate-pulse rounded bg-slate-200" />
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <li
                key={i}
                className="h-48 animate-pulse rounded-2xl border border-slate-100 bg-slate-100/80"
              />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
