// Foreplay pricing enterprise footer — .pricing-footer
// SOURCE DOM: .pricing-footer > .pricing-footer-enterprise | .pricing-footer-vertical_divider | .pricing-footer-extra
// .pricing-footer: border 1px neutral-600 (#ffffff29), rounded-[20px], w-full, flex row → ≤991px column
// .pricing-footer-enterprise: flex col, gap-5, min-w-[320px], max-w-[368px], p-[20px_24px_24px] → ≤991px max-w-none
// .pricing-footer-vertical_divider: bg neutral-600 (#ffffff29), w-px, h-full (self-stretch); collapses in column
// .pricing-footer-extra: flex col, gap-10, flex-1, justify-between, p-[32px_24px]
// .pricing-footer-head: flex col, gap-2, pt-2
// .pricing-footer-custom: flex col, gap-2
// .pricing-footer-extra-content: flex col, gap-3
// .pricing-footer-extra-list: flex col, gap-3, m-0, p-0
// .pricing-footer-extra-list-item: flex, gap-2, items-center
// .pricing-enterprise-logo-wrapper: flex wrap, gap-[15px], justify-between, items-center
// .pricing-grid-logo-wrapper: flex col, items-center, p-2.5, color neutral-50, hover neutral-100, transition 0.2s
// .text-alpha-0: color neutral-0 (#fff)
// .text-white: color #fff, flex-1
// .text-alpha-100: color neutral-100 (#ffffffad), flex-1

import { cn } from "@/lib/utils"
import { siteText } from "@/components/atoms/typography"
import { CtaButton } from "@/components/atoms/cta-button"
import { CONTACT } from "@/data/contact-info"

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
    <div className={cn("flex w-full rounded-[20px] border border-[#ffffff29] max-[991px]:flex-col", className)}>

      {/* .pricing-footer-enterprise — ≤991px max-width:none */}
      <div className="flex min-w-[320px] max-w-[368px] flex-col gap-5 px-6 pt-5 pb-6 max-[991px]:max-w-none">

        {/* .pricing-footer-head */}
        <div className="flex flex-col gap-2 pt-2">
          {/* .text-alpha-0 > .text-overline */}
          <div className="text-foreground">
            <div className={siteText.overline}>FOR AGENCIES</div>
          </div>
          {/* .text-alpha-100 > .text-body-s */}
          <div className="flex-1 text-[var(--alpha-100)]">
            <div className={siteText.bodyS}>Your behind-the-scenes Meta asset partner. You rent out ad accounts and serve clients, GOADS handles the rest.</div>
          </div>
        </div>

        {/* .horizontal_divider */}
        <div className="h-px w-full bg-[#ffffff29]" />

        {/* .pricing-footer-custom */}
        <div className="flex flex-col gap-2">
          {/* .text-white > h4.text-display-h5 */}
          <div className="flex-1 text-white">
            <h4 className={siteText.displayH5}>We handle the setup</h4>
          </div>
        </div>

        {/* .horizontal_divider */}
        <div className="h-px w-full bg-[#ffffff29]" />

        {/* a.button-dark.button-secondary — talk to sales on Telegram */}
        <CtaButton href={CONTACT.telegram.sales} variant="secondary" className="justify-center">
          Become a Partner
        </CtaButton>
      </div>

      {/* .pricing-footer-extra */}
      <div className="flex flex-1 flex-col justify-between gap-10 px-6 py-8">

        {/* .pricing-footer-extra-content */}
        <div className="flex flex-col gap-3">
          {/* .text-alpha-100 > .text-label-s */}
          <div className="flex-1 text-[var(--alpha-100)]">
            <div className={siteText.labelS}>A done-for-you supply partner built for agencies at scale. You focus on renting ad accounts, we handle the infrastructure.</div>
          </div>
          {/* ul.pricing-footer-extra-list */}
          <ul className="m-0 flex list-none flex-col gap-3 p-0">
            {[
              "End-to-end setup: BMs, profiles & pages, configured and ready to run",
              "A dedicated account manager who guides your setup and supports you 24/7",
              "Volume pricing that scales as your operation grows",
              "Fast replacements and flexible warranty, so your clients never feel downtime",
            ].map((text) => (
              // li.pricing-footer-extra-list-item: flex, gap-2 (8px), items-center, justify-start
              <li key={text} className="flex items-center justify-start gap-2">
                {/* .text-white > .icon-20: fixed 20px icon — must NOT grow (shrink-0), else it
                    eats 50% of the row and pushes text away from the check */}
                <div className="shrink-0 text-white">
                  <CheckIcon />
                </div>
                {/* .text-white > .text-body-s: fills remaining width */}
                <div className="flex-1 text-white">
                  <div className={siteText.bodyS}>{text}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* .div-block-332: trust line (logos removed per design) */}
        <div className="flex flex-col gap-4">
          {/* .text-alpha-100 > .text-label-s */}
          <div className="flex-1 text-[var(--alpha-100)]">
            <div className={siteText.labelS}>Trusted by thousands of agencies and media buyers worldwide</div>
          </div>
        </div>
      </div>
    </div>
  )
}
