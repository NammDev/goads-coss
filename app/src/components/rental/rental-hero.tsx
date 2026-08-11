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

import Link from "next/link"
import { ArrowRight } from "lucide-react"

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

      <div className="flex flex-col items-center gap-4">
        {/* Primary jumps to the plan cards further down the page */}
        <div className="flex items-center justify-center gap-3 max-sm:grid max-sm:w-full max-sm:grid-cols-1">
          <CtaButton href="#plans" variant="hero">
            See rental plans
          </CtaButton>
          <CtaButton href={CONTACT.telegram.sales} variant="secondary">
            Talk to sales
          </CtaButton>
        </div>

        {/* Way out to the one-time catalog, above the fold and always present.
            The arrival dialog offers the same choice but only once per browser,
            and the panel at the foot of the page is several screens down, so
            someone who dismissed the dialog and is now reading rental plans they
            never wanted has no signal that buying outright is even an option.

            Deliberately a pill, not a third CtaButton: it is an escape hatch,
            not a third thing to weigh up, and at button weight it would compete
            with the two decisions above it. */}
        <Link
          href="/pricing"
          className={cn(
            siteText.labelS,
            "inline-flex items-center gap-2 rounded-full border border-[var(--alpha-700)] px-4 py-2 no-underline",
            "text-[var(--alpha-100)] transition-colors duration-200",
            "hover:border-[var(--alpha-400)] hover:text-foreground",
            "max-sm:text-center",
          )}
        >
          Prefer to buy outright? See the one-time catalog
          <ArrowRight className="size-3.5 shrink-0" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}
