// Cross-link panel — points at the other way to get the same assets.
//
// /pricing sells them outright, /rental leases them as a setup. A customer who
// lands on one has no way of knowing the other exists, and reads the page they
// are on as the only option. Each page carries this panel pointing at the other.
//
// One component rather than two: the pair only works if they read as the same
// offer stated twice. If they drift in weight or wording, the page carrying the
// louder one starts to look like the real product and the other like an
// afterthought.
//
// Paint matches CustomSetupCta, which shares the /pricing stack: 20px radius,
// #ffffff29 hairline, overline + body left, CTA right, stacking below sm.

import { cn } from "@/lib/utils"
import { siteText } from "@/components/atoms/typography"
import { CtaButton } from "@/components/atoms/cta-button"

interface CrossLinkPanelProps {
  /** Short uppercase question, e.g. "PREFER TO RENT?" */
  overline: string
  body: string
  ctaLabel: string
  ctaHref: string
  /** One or two words, e.g. "New". Only worth setting on the side the customer
   *  would not otherwise know exists; on both panels it stops meaning anything. */
  badge?: string
}

export function CrossLinkPanel({ overline, body, ctaLabel, ctaHref, badge }: CrossLinkPanelProps) {
  return (
    <div className="flex w-full items-center justify-between gap-6 rounded-[20px] border border-[var(--alpha-600)] px-8 py-6 max-sm:flex-col max-sm:items-start max-sm:px-6">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2.5 text-foreground">
          <div className={siteText.overline}>{overline}</div>
          {badge && (
            // Same Meta gradient as the "Recommended" badge on the rental cards,
            // so a highlight reads the same wherever it appears on the site.
            <span
              className={cn(
                // `overline` is the scale step that owns uppercase. bodyXs plus
                // Tailwind's default `tracking-wide` is a different letter-spacing
                // from every other uppercase label on the site.
                siteText.overline,
                "rounded-full px-2 py-1 text-white",
                "bg-[linear-gradient(160deg,var(--meta-blue-light),var(--meta-blue-deep))]",
              )}
            >
              {badge}
            </span>
          )}
        </div>
        <div className="text-[var(--alpha-100)]">
          <div className={siteText.bodyM}>{body}</div>
        </div>
      </div>
      <CtaButton href={ctaHref} variant="secondary" className="shrink-0 justify-center max-sm:w-full">
        {ctaLabel}
      </CtaButton>
    </div>
  )
}
