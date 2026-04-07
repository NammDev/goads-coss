// Foreplay demo hero organism — .demo-hero
// DOM: .demo-hero > .demo-hero-top > .hero-text + .demo-embed + .demo-hero-logo-grid
// .demo-hero: flex col, items-center, py-20 (desktop override from pt-120 pb-120 → pt-80 pb-80)
// .demo-hero-top: flex col, gap-10 (40px), pb-12 (48px), items-stretch
// .hero-text: flex col, gap-3 (12px), items-center, max-w-[900px], text-center
// .overline-heading-wrapper: mb-2.5 (10px)
// h1.text-display-h2: Inter Display, 2.75rem/3.36rem, 600, tracking -0.0075em

import { cn } from "@/lib/utils"
import { fpText, FP_HERO_GRADIENT } from "@/components/foreplay/foreplay-typography"
import { ForeplayHomeHeroBottom } from "@/components/foreplay/foreplay-home-hero-bottom"
import { ForeplayCalEmbed } from "@/components/foreplay/foreplay-cal-embed"

export function ForeplayDemoHero() {
  return (
    <div className="flex flex-col items-center pt-16 pb-20">
      {/* .demo-hero-top: flex col, gap-10, pb-12 */}
      <div className="flex w-full flex-col items-center gap-10 pb-12">
        {/* .hero-text: flex col, gap-3, items-center, max-w-[900px], centered */}
        <div className="flex max-w-[900px] flex-col items-center gap-3 text-center [text-wrap:balance]">
          {/* .text-alpha-100 > .overline-heading-wrapper > h1.text-overline */}
          <div className="text-[var(--fp-alpha-100)]">
            <h1 className={fpText.overline}>Book a Demo</h1>
          </div>
          {/* h1.text-display-h2 — Inter Display, 2.75rem/3.36rem */}
          <h1
            className={cn(
              "font-display text-[2.75rem] font-semibold leading-[3.36rem] tracking-[-0.0075em]",
              "[font-optical-sizing:auto] [text-wrap:balance]",
              FP_HERO_GRADIENT,
            )}
          >
            1:1 Creative Solutions Call
          </h1>
          {/* .text-alpha-50 > .text-body-l */}
          <div className="text-[var(--fp-alpha-50)]">
            <div className={fpText.bodyL}>
              Launch winning ads on repeat. Book a 30 minute call with one of creative solution reps and walkthrough how Foreplay can help scale your ad workflow.
            </div>
          </div>
        </div>

        {/* Cal.com inline embed */}
        <ForeplayCalEmbed />
      </div>

      {/* .demo-hero-logo-grid — reuse home hero bottom */}
      <ForeplayHomeHeroBottom />
    </div>
  )
}
