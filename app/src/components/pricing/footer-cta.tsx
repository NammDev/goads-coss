// Foreplay pricing enterprise footer — .pricing-footer
// SOURCE DOM: .pricing-footer > .pricing-footer-enterprise | .pricing-footer-vertical_divider | .pricing-footer-extra
// .pricing-footer: border 1px neutral-600 (--alpha-600 = #ffffff29), rounded-[20px], w-full, flex row → ≤991px column
// .pricing-footer-enterprise: flex col, gap-5, min-w-[320px], max-w-[368px], p-[20px_24px_24px] → ≤991px max-w-none
// .pricing-footer-vertical_divider: bg neutral-600 (--alpha-600 = #ffffff29), w-px, h-full (self-stretch); collapses in column
// .pricing-footer-extra: flex col, gap-10, flex-1, justify-between, p-[32px_24px]
// .pricing-footer-head: flex col, gap-2, pt-2
// .pricing-footer-custom: flex col, gap-2
// .pricing-footer-extra-content: flex col, gap-3
// .pricing-footer-extra-list: flex col, gap-3, m-0, p-0
// .pricing-footer-extra-list-item: flex, gap-2, items-center
// .text-alpha-0: color neutral-0 (#fff)
// .text-white: color #fff, flex-1 (== --foreground in the site scope)
// .text-alpha-100: color neutral-100 (#ffffffad)
//
// CONTENT: this panel used to be an agency-partner pitch. It now carries the
// service notice instead, because the single most important thing a buyer on
// this page needs to know is that the setups changed: native ad accounts
// stopped holding up on Meta, so every setup ships with an agency ad account
// and works the day it is delivered. The warranty table sits in the right
// column, where the partner checklist used to be, so the promise is on the
// page rather than three clicks away in the policy.
//
// Warranty numbers come from GOADS_WARRANTY_TERMS, shared with the FAQ below.

import { cn } from "@/lib/utils"
import { siteText } from "@/components/atoms/typography"
import { CtaButton } from "@/components/atoms/cta-button"
import { CONTACT } from "@/data/contact-info"
import { GOADS_WARRANTY_TERMS } from "@/data/pricing-setups-data"

// Check icon SVG (same as sprite-check)
function CheckIcon() {
  return (
    <div className="size-5">
      <svg viewBox="0 0 20 20" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6.25 10.75 8.5 13l5.25-6" stroke="currentColor" />
      </svg>
    </div>
  )
}

interface PricingFooterProps {
  className?: string
}

export function PricingFooterCta({ className }: PricingFooterProps) {
  return (
    // .pricing-footer — ≤991px stacks vertically (flex-col)
    <div className={cn("flex w-full rounded-[20px] border border-[var(--alpha-600)] max-[991px]:flex-col", className)}>

      {/* .pricing-footer-enterprise — ≤991px max-width:none */}
      <div className="flex min-w-[320px] max-w-[368px] flex-col gap-5 px-6 pt-5 pb-6 max-[991px]:max-w-none">

        {/* .pricing-footer-head */}
        <div className="flex flex-col gap-2 pt-2">
          {/* .text-alpha-0 > .text-overline */}
          <div className="text-foreground">
            <div className={siteText.overline}>SERVICE UPDATE</div>
          </div>
          {/* .text-alpha-100 > .text-body-s */}
          <div className="flex-1 text-[var(--alpha-100)]">
            <div className={siteText.bodyS}>
              Native ad accounts are unstable on Meta right now.
            </div>
          </div>
        </div>

        {/* .horizontal_divider */}
        <div className="h-px w-full bg-[var(--alpha-600)]" />

        {/* .pricing-footer-custom */}
        <div className="flex flex-col gap-2">
          {/* .text-white > h4.text-display-h5 */}
          <div className="flex-1 text-foreground">
            <h4 className={siteText.displayH5}>Every setup now runs on agency ad accounts</h4>
          </div>
        </div>

        {/* .horizontal_divider */}
        <div className="h-px w-full bg-[var(--alpha-600)]" />

        {/* a.button-dark.button-secondary — talk to sales on Telegram */}
        <CtaButton href={CONTACT.telegram.sales} variant="secondary" className="justify-center">
          Talk to Sales
        </CtaButton>
      </div>

      {/* .pricing-footer-extra */}
      <div className="flex flex-1 flex-col justify-between gap-10 px-6 py-8">

        {/* .pricing-footer-extra-content */}
        <div className="flex flex-col gap-3">
          {/* .text-alpha-100 > .text-label-s */}
          <div className="flex-1 text-[var(--alpha-100)]">
            <div className={siteText.labelS}>
              Every setup on this page is rebuilt around agency ad accounts, so it arrives ready to
              spend. BM, profiles and ad accounts come linked, with full credentials on day one.
            </div>
          </div>
          {/* ul.pricing-footer-extra-list — one row per asset type */}
          <ul className="m-0 flex list-none flex-col gap-3 p-0">
            {GOADS_WARRANTY_TERMS.map(({ asset, term }) => (
              // li.pricing-footer-extra-list-item: flex, gap-2 (8px), items-center, justify-start
              <li key={asset} className="flex items-center justify-start gap-2">
                {/* .text-white > .icon-20: fixed 20px icon — must NOT grow (shrink-0), else it
                    eats 50% of the row and pushes text away from the check */}
                <div className="shrink-0 text-foreground">
                  <CheckIcon />
                </div>
                {/* Label:value pair on one baseline. Both steps are 14px/20px, so
                    the asset uses .text-label-s (500) and the term .text-body-s
                    (400): the hierarchy is the system's own weight step plus
                    white vs alpha-100, not an invented weight. */}
                <div className="flex-1">
                  <span className={cn(siteText.labelS, "text-foreground")}>{asset}:</span>{" "}
                  <span className={cn(siteText.bodyS, "text-[var(--alpha-100)]")}>{term}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* .div-block-332: closing note (logos removed per design) */}
        <div className="flex flex-col gap-4">
          {/* Source slot was .text-label-s, holding a trust claim. This is a
              disclaimer instead, so it drops to .text-body-xs — the step the
              configurator already uses for fine print — and stops competing
              with the lead paragraph, which is also label-s. */}
          <div className="flex-1 text-[var(--alpha-100)]">
            <div className={siteText.bodyXs}>
              Warranty terms may be updated. Confirm the exact terms with GOADS support before you order.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
