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

import { HeroContent } from "@/components/home/hero-content"
import { CtaButton } from "@/components/atoms/cta-button"
import { HomeHeroBottom } from "@/components/home/hero-bottom"
import { HomeHeroVideo } from "@/components/home/hero-video"
import { useHeroScrollAnimation } from "@/components/home/use-hero-scroll-animation"

export function HomeHero() {
  const { triggerRef, stickyRef } = useHeroScrollAnimation()

  return (
    <div className="relative flex flex-col gap-16 pt-16 pb-0">
      {/* .home-hero-animation-trigger: invisible scroll trigger zone */}
      <div
        ref={triggerRef}
        className="pointer-events-none absolute inset-x-0 -top-[72px] h-screen"
        aria-hidden="true"
      />

      {/* .home-hero-sticky: animated on scroll (desktop). On ≤991px Foreplay
          disables the pin (position:static) + shows the hero fully — the
          `home-hero-sticky-anim` class + globals rule force static/opacity:1/
          transform:none with !important (beats the inline animation styles +
          the JS hook), so the scroll-scale effect is desktop-only. */}
      <div
        ref={stickyRef}
        className="home-hero-sticky-anim sticky top-[132px] [transform-style:preserve-3d] [will-change:opacity,transform]"
        style={{ opacity: 0, transform: "translate3d(0, -33%, 0) scale3d(0.75, 0.75, 1)" }}
      >
        {/* .home-hero-top — pb 80px desktop/tablet, 48px @≤479 (Foreplay) */}
        <div className="flex flex-col items-center gap-10 pt-3 pb-20 -mt-3 max-fp-sm:pb-12">
          <HeroContent
            title={
              <>
                {/* Mobile (<768): shorter 2-line title (full size, no shrink) */}
                <span className="md:hidden">Meta Assets<br />Winning Campaigns</span>
                {/* Desktop (≥768): full title */}
                <span className="hidden md:inline">Premium Meta Assets<br />Built for Winning Campaigns</span>
              </>
            }
            description="GOADS provides verified Business Managers, agency ad accounts, profiles, pages, and Meta infrastructure for teams scaling serious campaigns."
          />

          {/* .home-hero-cta */}
          <div className="flex items-center gap-3">
            <CtaButton href="/pricing" variant="hero">
              View Products
            </CtaButton>
          </div>
        </div>

        {/* .home-hero-bottom — KPI strip */}
        <HomeHeroBottom />
      </div>

      {/* .home-hero-overlay + .home-hero-middle (video) */}
      <HomeHeroVideo />
    </div>
  )
}
