// Giveaway hero — BM-style product hero: a large 3D gift icon, a big gradient
// headline, a clear subtitle, and two CTAs (Telegram + Discord).
// Static server component. Tokens only — zero hex in JSX.

import Image from "next/image"
import { SectionContainer } from "@/components/atoms/section-container"
import { CtaButton } from "@/components/atoms/cta-button"
import { siteText, SITE_HERO_GRADIENT } from "@/components/atoms/typography"
import { cn } from "@/lib/utils"
import { giveawayHero } from "@/data/giveaway-page-data"

export function GiveawayHero() {
  return (
    <SectionContainer variant="wide">
      {/* relative z-[1] keeps content above the section DotBg */}
      <div className="relative z-[1] flex flex-col items-center justify-start pt-[10px] pb-0 text-center max-md:pt-16 max-sm:pt-6 max-sm:pb-6">
        {/* Big 3D gift icon — 256px slot like the BM product hero icon. */}
        <div className="relative flex size-64 items-center justify-center -mt-6 -mb-6 max-md:my-0 max-md:size-auto max-md:p-6 max-sm:p-4">
          <Image
            src={giveawayHero.iconSrc}
            alt="Free aged Facebook Page giveaway gift"
            width={256}
            height={256}
            priority
            sizes="(max-width: 768px) 132px, 256px"
            className="size-full object-contain max-md:size-32 max-sm:size-[112px]"
          />
        </div>

        {/* Hero content — gap 28px (BM .product-hero-content) */}
        <div className="flex flex-col items-center justify-start gap-7 pb-[42px] max-md:gap-6 max-md:pb-6">
          {/* Headline + subtitle */}
          <div className="flex max-w-[900px] flex-col items-center justify-start gap-4 max-md:gap-3">
            <h1
              className={cn(
                siteText.displayH1,
                "whitespace-pre-line [text-wrap:balance]",
                SITE_HERO_GRADIENT,
              )}
            >
              {giveawayHero.title}
            </h1>
            <div className="max-w-[512px]">
              <div className="text-[var(--alpha-100)]">
                <p className={siteText.bodyL}>{giveawayHero.subtitle}</p>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="relative z-[2] flex items-center justify-center gap-3 max-sm:grid max-sm:grid-cols-1 max-sm:self-stretch">
            <CtaButton href={giveawayHero.primaryCta.href} variant="hero">
              {giveawayHero.primaryCta.label}
            </CtaButton>
            <CtaButton href={giveawayHero.secondaryCta.href} variant="secondary">
              {giveawayHero.secondaryCta.label}
            </CtaButton>
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}
