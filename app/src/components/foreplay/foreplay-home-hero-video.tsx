// Foreplay home hero video section — .home-hero-middle + .home-hero-overlay
// DOM: .home-hero-overlay (gradient) + .home-hero-middle > .home-hero-mockup > .homepage-video > video + .home-video-overlay
// .home-hero-overlay: absolute, gradient 0deg from background 10% to transparent, inset 33% 0 -10%
// .home-hero-middle: z-1, relative — bleed mb-[-120px] removed (white founder block no longer exists)
// → next section's .home-product pt-32 (128px) now provides clean Foreplay-standard gap
// .home-hero-mockup: flex col, items-center, relative, overflow hidden
// .homepage-video: aspect-ratio 1400/730, w-full, h-auto, overflow hidden
// .home-video-overlay: absolute, gradient from background to transparent, inset 50% 0 0

"use client"

import { cn } from "@/lib/utils"

// Hero video replaced with a static GoAds product visual (FB-blue Foreplay-style)
const HERO_IMAGE_SRC = "/foreplay/goads/goads-hero.webp"

interface ForeplayHomeHeroVideoProps {
  className?: string
}

export function ForeplayHomeHeroVideo({ className }: ForeplayHomeHeroVideoProps) {
  return (
    <>
      {/* .home-hero-overlay: gradient fade from background, covers bottom of sticky */}
      <div
        className="pointer-events-none absolute inset-x-0 -bottom-[10%] top-[33%] bg-gradient-to-t from-background from-10% to-transparent"
        aria-hidden="true"
      />

      {/* .home-hero-middle: video container, bleeds below */}
      <div
        className={cn(
          "relative z-[1]",
          className,
        )}
      >
        {/* .home-hero-mockup */}
        <div className="relative flex flex-col items-center justify-start overflow-hidden">
          {/* .homepage-video slot: aspect 1400/730 — static hero image.
              Source desktop has no radius; rounded-3xl (24px, Foreplay large-block
              standard) added per request so the image corners are curved. */}
          <div className="w-full overflow-hidden rounded-3xl [aspect-ratio:1400/730]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={HERO_IMAGE_SRC}
              alt="GoAds verified Meta assets — Business Manager, Pages, Instagram, ad accounts, customer growth"
              className="size-full object-cover"
              loading="eager"
            />
          </div>

          {/* .home-video-overlay: gradient fade over bottom half of video */}
          <div
            className="pointer-events-none absolute inset-x-0 top-1/2 bottom-0 bg-gradient-to-t from-background to-transparent"
            aria-hidden="true"
          />
        </div>
      </div>
    </>
  )
}
