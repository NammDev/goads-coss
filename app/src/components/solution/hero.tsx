// Foreplay solution/industry hero — .section > .container.section-container
// DOM: .industries-icon + .section-head (h1 subtitle + h2 title + desc) + .industru-buttons-padding > .main-cta-buttons
// .industries-icon: border 1px neutral-600, rounded-[15px], flex center, 60x60, my-5
// .industru-buttons-padding: pt-5
// .main-cta-buttons: z-2, flex, gap-3, items-center, relative

import type { ReactNode } from "react"
import { SectionHead } from "@/components/atoms/section-head"
import { CtaButton } from "@/components/atoms/cta-button"
import { TrialCtaButton } from "@/components/atoms/trial-cta-button"

interface SolutionHeroProps {
  icon: ReactNode
  subtitle: string        // h1 overline
  title: string           // h2 display
  description: string
  ctaLabel?: string
  ctaHref?: string
  secondaryLabel?: string
  secondaryHref?: string
  hideButtons?: boolean   // suppress the dual-CTA row for pages that don't need it
}

export function SolutionHero({
  icon,
  subtitle,
  title,
  description,
  ctaLabel = "Start Free Trial",
  ctaHref = "/sign-up",
  secondaryLabel = "Book a Demo",
  secondaryHref = "/book-demo",
  hideButtons = false,
}: SolutionHeroProps) {
  return (
    <>
      {/* .industries-icon */}
      <div className="mx-auto my-5 flex size-[60px] items-center justify-center rounded-[15px] border border-[#ffffff29]">
        {/* center the icon within the wrapper so SVGs smaller than size-9
            (e.g. 32px MailIcon) sit dead-center, not top-left */}
        <div className="flex size-9 items-center justify-center [&>svg]:size-8">{icon}</div>
      </div>

      {/* .section-head — uses h1 for subtitle (SEO), h2 for title */}
      <SectionHead
        subtitle={subtitle}
        title={title}
        titleTag="h2"
        titleSize="h2"
        description={description}
        descSize="l"
        variant="light"
      />

      {/* .industru-buttons-padding > .main-cta-buttons */}
      {!hideButtons && (
        <div className="pt-5">
          <div className="relative z-[2] flex items-center justify-center gap-3">
            {ctaHref === "/sign-up" ? (
              <TrialCtaButton variant="hero" trialLabel={ctaLabel} />
            ) : (
              <CtaButton href={ctaHref} variant="hero">
                {ctaLabel}
              </CtaButton>
            )}
            <CtaButton href={secondaryHref} variant="secondary" showIcon={false}>
              {secondaryLabel}
            </CtaButton>
          </div>
        </div>
      )}
    </>
  )
}
