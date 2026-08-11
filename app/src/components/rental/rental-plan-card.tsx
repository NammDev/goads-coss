// One rental plan card — lives on the white block.
//
// The middle tier INVERTS to a near-black card while its siblings stay light.
// That is the whole visual idea of the section: the recommended plan is the one
// piece of dark on a white surface, so it is picked out by value rather than by
// a coloured border, and it echoes the dark primary buttons the rest of the site
// uses on white. It also lifts slightly out of the row on desktop.
//
// It does NOT reuse PricingCard: that component parses its price into a number
// and adds it to the cart, which is right for a one-time setup and wrong for a
// subscription (the cart has no billing term, so a $299/mo line would produce a
// checkout total that is wrong by construction). This card's CTA hands the plan
// to sales on Telegram instead.

import { cn } from "@/lib/utils"
import { siteText } from "@/components/atoms/typography"
import { CtaButton } from "@/components/atoms/cta-button"
import { CONTACT } from "@/data/contact-info"
import {
  buildPlanEnquiry,
  formatMonthlyFee,
  headlineSpecs,
  planDisplayName,
  type RentalPlan,
  type RentalTrack,
} from "@/data/rental-page-data"

export function RentalPlanCard({ plan, track }: { plan: RentalPlan; track: RentalTrack }) {
  const featured = !!plan.highlight
  const displayName = planDisplayName(track, plan)

  return (
    <article
      className={cn(
        // rounded-[20px] + p-6 are PricingCard's exact values — these sit in the
        // same role on the site, so they take the same frame. 24px radius / 28px
        // padding were off the Foreplay scale.
        "relative flex flex-col gap-6 rounded-[20px] p-6 max-sm:p-5",
        "transition-transform duration-[500ms] ease-[cubic-bezier(0.19,1,0.22,1)]",
        featured
          ? [
              "bg-background text-foreground",
              "shadow-[0_24px_60px_-24px_color-mix(in_oklab,var(--solid-900),transparent_45%)]",
              // Lifts out of the row on desktop; stacked layouts sit flush.
              "lg:-my-5 lg:py-12",
            ]
          : "bg-[var(--solid-25)] shadow-[inset_0_0_0_1px_var(--solid-50)]",
      )}
    >
      {featured && (
        <span
          className={cn(
            // Uppercase micro-label → `overline`, the one scale step that owns
            // uppercase. It was bodyXs + Tailwind's default `tracking-wide`,
            // which is a different letter-spacing from every other uppercase
            // label on the page.
            siteText.overline,
            "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-1.5 text-white",
            "bg-[linear-gradient(160deg,var(--meta-blue-light),var(--meta-blue-deep))]",
          )}
        >
          {/* "Recommended", not "Most popular" — the centre slot now holds the
              top tier, and calling the most expensive plan the most popular one
              is a claim we have no basis for. A recommendation is ours to make. */}
          Recommended
        </span>
      )}

      {/* Name + who it's for */}
      <header className="flex flex-col gap-1.5">
        {/* The track suffix lives in the name itself rather than a chip beside
            it: a chip is a second thing to read and gets cropped out of a
            screenshot, while "Diamond-S" stays intact wherever the name is
            quoted. */}
        <h3 className={cn(siteText.labelL, featured ? "text-foreground" : "text-[var(--solid-900)]")}>
          {displayName}
        </h3>
        <p
          className={cn(
            siteText.bodyS,
            "[text-wrap:pretty]",
            featured ? "text-[var(--alpha-100)]" : "text-[var(--solid-400)]",
          )}
        >
          {plan.description}
        </p>
      </header>

      {/* Price */}
      <div className="flex items-baseline gap-1.5">
        <span
          className={cn(
            siteText.displayH3,
            "tabular-nums",
            featured ? "text-foreground" : "text-[var(--solid-900)]",
          )}
        >
          {formatMonthlyFee(plan.monthlyFee)}
        </span>
        <span className={cn(siteText.bodyM, featured ? "text-[var(--alpha-100)]" : "text-[var(--solid-400)]")}>
          /month
        </span>
      </div>

      {/* Spend fee + cap — the two terms that actually separate the tiers, so
          they sit with the price rather than buried in the list below. */}
      <dl
        className={cn(
          "m-0 grid grid-cols-2 gap-px overflow-hidden rounded-[14px]",
          featured ? "bg-[var(--alpha-700)]" : "bg-[var(--solid-50)]",
        )}
      >
        {headlineSpecs(plan).map((spec) => (
          <div
            key={spec.label}
            className={cn("flex flex-col gap-0.5 px-4 py-3", featured ? "bg-background" : "bg-white")}
          >
            <dt className={cn(siteText.bodyXs, featured ? "text-[var(--alpha-200)]" : "text-[var(--solid-400)]")}>
              {spec.label}
            </dt>
            <dd
              className={cn(
                siteText.labelS,
                "m-0",
                featured ? "text-foreground" : "text-[var(--solid-900)]",
              )}
            >
              {spec.value}
            </dd>
          </div>
        ))}
      </dl>

      <CtaButton
        href={buildPlanEnquiry(CONTACT.telegram.official, track, plan)}
        variant={featured ? "hero" : "light-stroke"}
        className="w-full justify-center"
      >
        Rent {displayName}
      </CtaButton>

      <div className={cn("h-px w-full", featured ? "bg-[var(--alpha-700)]" : "bg-[var(--solid-50)]")} />

      {/* What's inside. The list needs a heading: seven label/value rows with no
          frame around them read as specifications the customer has to interpret,
          when they are the answer to the one question being asked at this point
          in the card. Naming it turns the same rows into an inventory. */}
      <div className="flex flex-col gap-3.5">
        <span
          className={cn(
            siteText.overline,
            featured ? "text-[var(--alpha-200)]" : "text-[var(--solid-400)]",
          )}
        >
          What you get
        </span>

        <ul className="m-0 flex list-none flex-col gap-3.5 p-0">
        {plan.specs.map((spec) => (
          <li key={spec.label} className="flex items-baseline gap-3">
            <CheckIcon featured={featured} />
            {/* Label left, value right on one line wherever the card is wide
                enough. Where it is not, the pair stacks DELIBERATELY rather than
                being left to wrap: letting it wrap put some rows on one line and
                others on two, which reads as broken, and across three columns it
                also knocked the lists out of alignment with each other.
                Two narrow cases: below sm (phone) and between lg and xl, where
                three columns leave each card around 340px. */}
            <span
              className={cn(
                "flex flex-1 flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5",
                "max-sm:flex-col max-sm:items-start max-sm:justify-start",
                "lg:max-xl:flex-col lg:max-xl:items-start lg:max-xl:justify-start",
              )}
            >
              <span
                className={cn(
                  siteText.bodyS,
                  featured ? "text-[var(--alpha-100)]" : "text-[var(--solid-400)]",
                )}
              >
                {spec.label}
              </span>
              <span
                className={cn(
                  siteText.labelS,
                  featured ? "text-foreground" : "text-[var(--solid-900)]",
                )}
              >
                {spec.value}
              </span>
            </span>
          </li>
        ))}
        </ul>
      </div>
    </article>
  )
}

function CheckIcon({ featured }: { featured: boolean }) {
  return (
    <span
      className={cn(
        "flex size-4 shrink-0 translate-y-0.5 items-center justify-center rounded-full",
        featured ? "bg-[var(--alpha-700)] text-foreground" : "bg-[var(--meta-tint)] text-[var(--meta-blue-deep)]",
      )}
    >
      <svg viewBox="0 0 20 20" width="11" height="11" aria-hidden="true">
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          d="M5.5 10.5 8.5 13.5l6-7"
        />
      </svg>
    </span>
  )
}
