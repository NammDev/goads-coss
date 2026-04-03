// Foreplay solution/industry hero — .section > .container.section-container
// DOM: .industries-icon + .section-head (h1 subtitle + h2 title + desc) + .industru-buttons-padding > .main-cta-buttons
// .industries-icon: border 1px neutral-600, rounded-[15px], flex center, 60x60, my-5
// .industru-buttons-padding: pt-5
// .main-cta-buttons: z-2, flex, gap-3, items-center, relative

import type { ReactNode } from "react"
import { ForeplaySectionHead } from "@/components/foreplay/foreplay-section-head"
import { ForeplayCtaButton } from "@/components/foreplay/foreplay-cta-button"

interface ForeplaySolutionHeroProps {
  icon: ReactNode
  subtitle: string        // h1 overline
  title: string           // h2 display
  description: string
  ctaLabel?: string
  ctaHref?: string
  secondaryLabel?: string
  secondaryHref?: string
}

export function ForeplaySolutionHero({
  icon,
  subtitle,
  title,
  description,
  ctaLabel = "Start Free Trial",
  ctaHref = "/sign-up",
  secondaryLabel = "Book a Demo",
  secondaryHref = "/book-demo",
}: ForeplaySolutionHeroProps) {
  return (
    <>
      {/* .industries-icon */}
      <div className="mx-auto my-5 flex size-[60px] items-center justify-center rounded-[15px] border border-[#ffffff29]">
        <div className="size-9">{icon}</div>
      </div>

      {/* .section-head — uses h1 for subtitle (SEO), h2 for title */}
      <ForeplaySectionHead
        subtitle={subtitle}
        title={title}
        titleTag="h2"
        titleSize="h2"
        description={description}
        descSize="l"
        variant="light"
      />

      {/* .industru-buttons-padding > .main-cta-buttons */}
      <div className="pt-5">
        <div className="relative z-[2] flex items-center justify-center gap-3">
          <ForeplayCtaButton href={ctaHref} variant="hero">
            {ctaLabel}
          </ForeplayCtaButton>
          <ForeplayCtaButton href={secondaryHref} variant="secondary" showIcon={false}>
            {secondaryLabel}
          </ForeplayCtaButton>
        </div>
      </div>
    </>
  )
}
