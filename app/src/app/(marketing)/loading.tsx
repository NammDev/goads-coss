export default function MarketingLoading() {
  return (
    <div className="container animate-pulse py-20">
      {/* Hero skeleton */}
      <div className="mx-auto max-w-2xl space-y-4 text-center">
        <div className="mx-auto h-8 w-3/4 rounded bg-muted" />
        <div className="mx-auto h-4 w-1/2 rounded bg-muted" />
      </div>
      {/* Content skeleton */}
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-48 rounded-lg bg-muted" />
        ))}
      </div>
    </div>
  )
}
