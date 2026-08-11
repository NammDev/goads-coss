// Rental hero — dark scope, sits above the plan cards.
//
// Deliberately thin: headline, one sentence, two CTAs. It previously carried a
// badge and a three-fact stat strip, which restated the price, the replacement
// promise and the track count — all three of which the cards below say properly,
// with the numbers attached. Repeating them here only delayed the customer
// reaching the thing that answers their question.
//
// The one sentence covers what the page is selling, in the order a buyer cares:
// what you get, what happens when it breaks, and the one term no competitor
// matches (running on your own card).

import { cn } from "@/lib/utils"
import { CtaButton } from "@/components/atoms/cta-button"
import { SITE_HERO_GRADIENT, siteText } from "@/components/atoms/typography"
import { CONTACT } from "@/data/contact-info"

export function RentalHero() {
  return (
    <div className="relative z-[1] flex flex-col items-center gap-8 text-center max-md:gap-7">
      <h1
        className={cn(
          siteText.displayH1,
          "max-w-[900px] [text-wrap:balance]",
          SITE_HERO_GRADIENT,
        )}
      >
        Rent your Meta assets
      </h1>

      {/* Primary jumps to the plan cards further down the page */}
      <div className="flex items-center justify-center gap-3 max-sm:grid max-sm:w-full max-sm:grid-cols-1">
        <CtaButton href="#plans" variant="hero">
          See rental plans
        </CtaButton>
        <CtaButton href={CONTACT.telegram.sales} variant="secondary">
          Talk to sales
        </CtaButton>
      </div>
    </div>
  )
}
