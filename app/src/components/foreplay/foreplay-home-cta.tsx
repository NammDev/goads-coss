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
        title="Your next winning campaign starts here"
        titleTag="h2" titleSize="h2"
        description="Join 500+ advertisers who trust GoAds. Stable assets, real support, instant replacement."
        descSize="l"
        variant="light"
        size="large"
      />

      {/* .main-cta-buttons */}
      <div className="flex items-center gap-3">
        <ForeplayCtaButton href="/talk-to-sales" variant="hero">
          Get Started
        </ForeplayCtaButton>
        <ForeplayCtaButton href="/pricing" variant="secondary" showIcon={false}>
          View Pricing
        </ForeplayCtaButton>
      </div>

      {/* Image: transparent cutout, max-w 1037 (~72% of 1440 / 10% below prior 1152), centered.
          No negative margin — parent overflow-hidden would clip the fade.
          Footer has no bg (inherits .foreplay #020308 = this section), so the bottom
          mask-gradient (starts at 40% — laptop level — to hide lower body/belly) dissolves
          the subject seamlessly into the footer. */}
      <div className="flex justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/foreplay/goads/goads-cta-command-center.webp"
          alt="GoAds account infrastructure command center"
          width={1440}
          height={966}
          className="h-auto w-full max-w-[1037px] [mask-image:linear-gradient(to_bottom,black_62%,transparent_98%)] [-webkit-mask-image:linear-gradient(to_bottom,black_62%,transparent_98%)]"
          loading="lazy"
        />
      </div>
    </div>
  )
}
