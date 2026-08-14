// Rental hero — the /agency-ad-account product hero, stripped to the headline.
//
// Mounts ProductHero, the shared Foreplay product-page hero: Meta icon,
// overline, gradient headline, and the sticky scroll animation every other
// product page opens with. Text-only variant — no laptop preview — so
// ProductHero supplies its own --py-section padding (108/96/80).
//
// No supporting sentence: the plan cards directly below carry the offer and the
// price, and the hero was restating them.
//
// The ACTIONS go through ProductHero's `actions` slot rather than its single
// default CTA: two buttons plus the escape hatch to the one-time catalog.
//
// NOTE: the section that mounts this must NOT be overflow-hidden — ProductHero
// is position:sticky and any clipping ancestor kills the scroll animation.

import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { CtaButton } from "@/components/atoms/cta-button"
import { ProductHero } from "@/components/product/hero"
import { siteText } from "@/components/atoms/typography"
import { CONTACT } from "@/data/contact-info"

export function RentalHero() {
  return (
    <ProductHero
      iconSrc="/assets/META.webp"
      overline="Meta Asset Rental"
      title="Rent your Meta assets"
      actions={
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
              someone who dismissed the dialog and is now reading rental plans
              they never wanted has no signal that buying outright is an option.

              Deliberately a pill, not a third CtaButton: it is an escape hatch,
              not a third thing to weigh up, and at button weight it would
              compete with the two decisions above it. */}
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
      }
    />
  )
}
