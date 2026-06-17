// Giveaway hero — Foreplay MCP `.product-hero` block, content = giveaway (200 free
// FB pages). DOM + CSS mapped verbatim from docs/foreplay/html/mcp-hero.{html,css};
// copy from giveaway-page-data.ts. Static (scroll-fade removed — see git history:
// the sticky/IntersectionObserver effect dimmed the hero at rest). Server component.
// Tokens only — zero hex in JSX.
//
// EXACT CSS (mcp-hero.css):
//   .container          → max-w 1440 / px 40           → SectionContainer variant="wide"
//   .product-hero       → flex col center, text-center, pt 10 / pb 0
//   .api-hero-content   → flex col center, gap 28px, pb 42px
//   .mcp-tag            → flex items-center, gap 4px, bg neutral-700(--alpha-700),
//                         radius 100px, padding 6px 10px 6px 6px
//   .hero-text          → flex col center, gap 16px, max-w 900px
//   .text-display-h1    → Inter Display 3.75rem/4.25rem 600 ls -.0075em + radial gradient
//   .max-w-lg           → max-w 512px ; .text-alpha-100 → neutral-100 (68%)
//   .text-body-l        → Inter 1.125rem/1.75rem 400 ls -.0144em
//   .main-cta-buttons   → relative z-2, flex items-center, gap 12px

import { SectionContainer } from "@/components/atoms/section-container"
import { CtaButton } from "@/components/atoms/cta-button"
import { siteText, SITE_HERO_GRADIENT } from "@/components/atoms/typography"
import { cn } from "@/lib/utils"
import { giveawayHero } from "@/data/giveaway-page-data"

export function GiveawayHero() {
  return (
    <SectionContainer variant="wide">
      {/* .product-hero — relative z-[1] keeps content above the section DotBg */}
      <div className="relative z-[1] flex flex-col items-center justify-start pt-[10px] pb-0 text-center max-md:pt-16 max-sm:pt-6 max-sm:pb-6">
        {/* .api-hero-content */}
        <div className="flex flex-col items-center justify-start gap-7 pb-[42px] max-md:gap-6 max-md:pb-6">
          {/* .mcp-tag — padding 6px 10px 6px 6px = py-1.5 pr-2.5 pl-1.5 (🎁 emoji = icon) */}
          <div className="flex items-center gap-1 rounded-full bg-[var(--alpha-700)] py-1.5 pr-2.5 pl-1.5">
            <span className={cn(siteText.labelM, "px-1 text-foreground")}>
              {giveawayHero.tag}
            </span>
          </div>

          {/* .hero-text */}
          <div className="flex max-w-[900px] flex-col items-center justify-start gap-4 max-md:gap-3">
            {/* h3.text-display-h1.hero-title — <h1> for semantics; visual size identical */}
            <h1
              className={cn(
                siteText.displayH1,
                "whitespace-pre-line [text-wrap:balance]",
                SITE_HERO_GRADIENT,
              )}
            >
              {giveawayHero.title}
            </h1>
            {/* .max-w-lg */}
            <div className="max-w-[512px]">
              {/* .text-alpha-100 (neutral-100 = 68% white) */}
              <div className="text-[var(--alpha-100)]">
                <p className={siteText.bodyL}>{giveawayHero.subtitle}</p>
              </div>
            </div>
          </div>

          {/* .main-cta-buttons — z-2, gap 12px, items-center (.button-dark pair) */}
          <div className="relative z-[2] flex items-center justify-start gap-3 max-sm:grid max-sm:grid-cols-1 max-sm:self-stretch">
            {/* .button-dark.button-primary */}
            <CtaButton href={giveawayHero.primaryCta.href} variant="hero">
              {giveawayHero.primaryCta.label}
            </CtaButton>
            {/* .button-dark.button-secondary */}
            <CtaButton href={giveawayHero.secondaryCta.href} variant="secondary">
              {giveawayHero.secondaryCta.label}
            </CtaButton>
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}
