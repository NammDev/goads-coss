// Foreplay demo hero organism — .demo-hero
// DOM: .demo-hero > .demo-hero-top > .hero-text + .demo-embed + .demo-hero-logo-grid
// .demo-hero: flex col, items-center, py-20 (desktop override from pt-120 pb-120 → pt-80 pb-80)
// .demo-hero-top: flex col, gap-10 (40px), pb-12 (48px), items-stretch
// .hero-text: flex col, gap-3 (12px), items-center, max-w-[900px], text-center
// .overline-heading-wrapper: mb-2.5 (10px)
// h1.text-display-h2: Inter Display, 2.75rem/3.36rem, 600, tracking -0.0075em

import { cn } from "@/lib/utils"
import { siteText, SITE_HERO_GRADIENT } from "@/components/atoms/typography"
import { HomeHeroBottom } from "@/components/home/hero-bottom"
import { CalEmbed } from "@/components/cal/embed"

export function DemoHero() {
  // .demo-hero vertical rhythm — tightened top (single-column centered layout
  // doesn't need Foreplay's full 120px). 48px top / 80px bottom, scales down on mobile.
  return (
    <div className="flex flex-col items-center pt-12 pb-20 max-sm:pt-8 max-sm:pb-16">
      {/* .demo-hero-top: flex col, gap-10 (40px); pb-10 ≈ Foreplay logo-grid margin-top 40px */}
      <div className="flex w-full flex-col items-center gap-10 pb-10">
        {/* .hero-text: flex col, gap-3, items-center, max-w-[900px], centered */}
        <div className="flex max-w-[900px] flex-col items-center gap-3 text-center [text-wrap:balance]">
          {/* .text-alpha-100 > .overline-heading-wrapper > h1.text-overline */}
          <div className="text-[var(--alpha-100)]">
            <h1 className={siteText.overline}>Book a Call</h1>
          </div>
          {/* h1.text-display-h2 — Inter Display, responsive scale (Foreplay token) */}
          <h1 className={cn(siteText.displayH2, "[text-wrap:balance]", SITE_HERO_GRADIENT)}>
            Strategy Call
          </h1>
          {/* .text-alpha-50 > .text-body-l */}
          <div className="text-[var(--alpha-50)]">
            <div className={siteText.bodyL}>
              Book a free 30-minute call with a GOADS account specialist. We&apos;ll map out the right Business Manager, profiles, and ad account setup to scale your Meta campaigns, and keep them running without disables.
            </div>
          </div>
        </div>

        {/* Cal.com inline embed */}
        <CalEmbed />
      </div>

      {/* .demo-hero-logo-grid — reuse home hero bottom */}
      <HomeHeroBottom />
    </div>
  )
}
