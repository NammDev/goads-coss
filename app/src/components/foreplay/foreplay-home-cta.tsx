// Foreplay final CTA — .home-cta
// DOM: div.section.overflow-hidden > .container.section-container > .home-cta > .section-head.is-large + .main-cta-buttons + .home-cta-image-wrapper
// .home-cta: flex col, gap-9 (36px via grid-row-gap), items-center, pt-[108px]
// .section-head.is-large: max-w-[960px], z-2, relative
// .main-cta-buttons: flex, gap-3, items-center
// .home-cta-image-wrapper: margin -8% -40px (bleeds out)

import { ForeplaySectionHead } from "@/components/foreplay/foreplay-section-head"
import { ForeplayCtaButton } from "@/components/foreplay/foreplay-cta-button"

export function ForeplayHomeCta() {
  return (
    <div className="flex flex-col items-center gap-9 pt-[108px]">
      {/* .section-head.is-large */}
      <ForeplaySectionHead
        title="Ready to ship more winning ads?"
        titleTag="h2" titleSize="h2"
        description="Unlock the power of Foreplay with an unrestricted 7 day free trial."
        descSize="l"
        variant="light"
        size="large"
      />

      {/* .main-cta-buttons */}
      <div className="flex items-center gap-3">
        <ForeplayCtaButton href="/sign-up" variant="hero">
          Start free trial
        </ForeplayCtaButton>
        <ForeplayCtaButton href="/pricing" variant="secondary" showIcon={false}>
          View Pricing
        </ForeplayCtaButton>
      </div>

      {/* .home-cta-image-wrapper: margin -8% -40px */}
      <div className="-mx-10 -my-[8%]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/foreplay/banner.webp"
          alt="Two people looking at laptop with dashboard"
          width={1440}
          height={924}
          className="h-auto max-w-none"
          loading="lazy"
        />
      </div>
    </div>
  )
}
