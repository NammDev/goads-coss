// Suspense fallback skeleton for the shared product-page shell used by
// /bm, /profiles, /pages, /agency-ad-account, /tiktok-accounts. Mirrors the
// common layout: hero → white block (pricing/catalog) → section with a
// 3-col 6-card feature grid. Cheap structural blocks only — no data.

import { ForeplaySectionContainer } from "@/components/foreplay"

function SkeletonBlock({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-white/5 ${className}`} />
}

export function ForeplayProductPageSkeleton() {
  return (
    <>
      {/* Section 1: Hero — heading + description + dual CTA */}
      <section className="section relative">
        <ForeplaySectionContainer variant="wide">
          <div className="flex flex-col items-center gap-6 py-24 text-center max-md:py-16">
            <SkeletonBlock className="h-5 w-40" />
            <div className="flex w-full flex-col items-center gap-3">
              <SkeletonBlock className="h-14 w-[80%] max-w-[720px]" />
              <SkeletonBlock className="h-14 w-[60%] max-w-[560px]" />
            </div>
            <div className="flex w-full flex-col items-center gap-2 pt-2">
              <SkeletonBlock className="h-4 w-[60%] max-w-[560px]" />
              <SkeletonBlock className="h-4 w-[45%] max-w-[440px]" />
            </div>
            <div className="flex gap-3 pt-4">
              <SkeletonBlock className="h-11 w-40 rounded-[10px]" />
              <SkeletonBlock className="h-11 w-32 rounded-[10px]" />
            </div>
          </div>
        </ForeplaySectionContainer>
      </section>

      {/* Section 2: White block placeholder (pricing/catalog rows). Mirrors
          ForeplaySectionWhiteBlock geometry: p-2 outer + rounded-[36px] body,
          and inner content constrained by ForeplaySectionContainer (the real
          page does the same) so it doesn't bleed edge-to-edge of the block. */}
      <div className="p-2">
        <div className="rounded-[36px] bg-white/[0.04] py-16 max-md:py-12">
          <ForeplaySectionContainer variant="wide">
            <div className="flex flex-col gap-4">
              <SkeletonBlock className="h-8 w-72" />
              <SkeletonBlock className="h-4 w-1/2 max-w-[480px]" />
              <div className="mt-6 flex flex-col gap-3">
                {[0, 1, 2, 3].map((i) => (
                  <SkeletonBlock key={i} className="h-14 w-full rounded-xl" />
                ))}
              </div>
            </div>
          </ForeplaySectionContainer>
        </div>
      </div>

      {/* Section 3: Feature grid — section head + 3-col 6-card grid */}
      <section className="section">
        <ForeplaySectionContainer>
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <SkeletonBlock className="h-5 w-32" />
            <SkeletonBlock className="h-10 w-[70%] max-w-[640px]" />
            <SkeletonBlock className="h-4 w-[55%] max-w-[520px]" />
          </div>
          <div className="grid grid-cols-3 gap-6 max-md:grid-cols-2 max-sm:grid-cols-1">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex flex-col overflow-hidden rounded-[20px] border border-[var(--fp-solid-700)] p-0"
              >
                {/* image area (2:1) */}
                <div className="aspect-[2/1] w-full animate-pulse bg-white/5" />
                <div className="flex flex-col gap-2 p-6">
                  <SkeletonBlock className="h-5 w-36" />
                  <SkeletonBlock className="h-4 w-full" />
                  <SkeletonBlock className="h-4 w-4/5" />
                </div>
              </div>
            ))}
          </div>
        </ForeplaySectionContainer>
      </section>
    </>
  )
}
