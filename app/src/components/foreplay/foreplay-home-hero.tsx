// Foreplay home hero organism — .home-hero
// DOM: .home-hero > .home-hero-animation-trigger + .home-hero-sticky + .home-hero-overlay + .home-hero-middle
// .home-hero: flex col, gap-16 (64px from grid-row-gap on flex), pt-16 (64px), pb-0, relative
// CSS cascade: rule0 pt:60px pb:80px → rule1 pt:64px pb:48px → rule2 pb:0
// .home-hero-animation-trigger: absolute, h-screen, inset -72px 0 auto, pointer-events-none (scroll trigger)
// .home-hero-sticky: will-change opacity/transform, scroll-animated scale+opacity+translate
// .home-hero-top: flex col, gap 40px, items-center, -mt-3 pt-3 pb-20
// Desktop base CSS (not media-wrapped): grid-row-gap:40px; margin-top:-12px;
// padding-top:12px; padding-bottom:80px. Mobile overrides: 80px @767, 48px @479.

"use client"

import { ForeplayHeroContent } from "@/components/foreplay/foreplay-hero-content"
import { ForeplayCtaButton } from "@/components/foreplay/foreplay-cta-button"
import { ForeplayHomeHeroBottom } from "@/components/foreplay/foreplay-home-hero-bottom"
import { ForeplayHomeHeroVideo } from "@/components/foreplay/foreplay-home-hero-video"
import { useHeroScrollAnimation } from "@/components/foreplay/use-hero-scroll-animation"

export function ForeplayHomeHero() {
  const { triggerRef, stickyRef } = useHeroScrollAnimation()

  return (
    <div className="relative flex flex-col gap-16 pt-16 pb-0">
      {/* .home-hero-animation-trigger: invisible scroll trigger zone */}
      <div
        ref={triggerRef}
        className="pointer-events-none absolute inset-x-0 -top-[72px] h-screen"
        aria-hidden="true"
      />

      {/* .home-hero-sticky: animated on scroll */}
      <div
        ref={stickyRef}
        className="sticky top-[132px] [transform-style:preserve-3d] [will-change:opacity,transform]"
        style={{ opacity: 0, transform: "translate3d(0, -33%, 0) scale3d(0.75, 0.75, 1)" }}
      >
        {/* .home-hero-top */}
        <div className="flex flex-col items-center gap-10 pt-3 pb-20 -mt-3">
          <ForeplayHeroContent
            title={"Premium Meta Assets\nBuilt for Winning Campaigns"}
            description="GOADS provides verified Business Managers, agency ad accounts, profiles, pages, and Meta infrastructure for teams scaling serious campaigns."
          />

          {/* .home-hero-cta */}
          <div className="flex items-center gap-3">
            <ForeplayCtaButton href="/talk-to-sales" variant="hero">
              Contact Us
            </ForeplayCtaButton>
          </div>
        </div>

        {/* .home-hero-bottom — KPI strip */}
        <ForeplayHomeHeroBottom />
      </div>

      {/* .home-hero-overlay + .home-hero-middle (video) */}
      <ForeplayHomeHeroVideo />
    </div>
  )
}
