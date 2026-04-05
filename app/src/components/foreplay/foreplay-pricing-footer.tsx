// Foreplay pricing enterprise footer — .pricing-footer
// SOURCE DOM: .pricing-footer > .pricing-footer-enterprise | .pricing-footer-vertical_divider | .pricing-footer-extra
// .pricing-footer: border 1px neutral-600 (#ffffff29), rounded-[20px], w-full, flex row
// .pricing-footer-enterprise: flex col, gap-5, min-w-[320px], max-w-[368px], p-[20px_24px_24px]
// .pricing-footer-vertical_divider: bg neutral-600 (#ffffff29), w-px, h-full (self-stretch)
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
import { fpText } from "@/components/foreplay/foreplay-typography"
import { ForeplayCtaButton } from "@/components/foreplay/foreplay-cta-button"
import { HeroLogo } from "@/data/foreplay-hero-logos"

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

// Savings coin icon (gold stroke)
function SavingsIcon() {
  return (
    <div className="size-5">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none">
        <path stroke="#EBBE7A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
          d="M9.75 6.625v-.75m0 7.5v.75m1.624-6.375C11.05 7.302 10.444 7 9.75 7h-.208c-.92 0-1.667.597-1.667 1.333v.058c0 .526.372 1.008.96 1.243l1.83.732c.588.235.96.717.96 1.243 0 .768-.778 1.391-1.738 1.391H9.75c-.694 0-1.3-.302-1.624-.75M16.5 10A6.75 6.75 0 1 1 3 10a6.75 6.75 0 0 1 13.5 0Z" />
      </svg>
    </div>
  )
}

interface ForeplayPricingFooterProps {
  className?: string
}

export function ForeplayPricingFooter({ className }: ForeplayPricingFooterProps) {
  return (
    // .pricing-footer
    <div className={cn("flex w-full rounded-[20px] border border-[#ffffff29]", className)}>

      {/* .pricing-footer-enterprise */}
      <div className="flex min-w-[320px] max-w-[368px] flex-col gap-5 px-6 pt-5 pb-6">

        {/* .pricing-footer-head */}
        <div className="flex flex-col gap-2 pt-2">
          {/* .text-alpha-0 > .text-overline */}
          <div className="text-foreground">
            <div className={fpText.overline}>ENTERPRISE</div>
          </div>
          {/* .text-alpha-100 > .text-body-s */}
          <div className="flex-1 text-[var(--fp-alpha-100)]">
            <div className={fpText.bodyS}>For large agencies and scaling brand organizations.</div>
          </div>
        </div>

        {/* .horizontal_divider */}
        <div className="h-px w-full bg-[#ffffff29]" />

        {/* .pricing-footer-custom */}
        <div className="flex flex-col gap-2">
          {/* .text-white > h4.text-display-h5 */}
          <div className="flex-1 text-white">
            <h4 className={fpText.displayH5}>Custom Pricing</h4>
          </div>
          {/* .flex-gap-1 > icon + label */}
          <div className="flex items-center gap-1">
            <SavingsIcon />
            <div className="flex-1 text-white">
              <div className={fpText.labelS}>Save up-to 80%</div>
            </div>
          </div>
        </div>

        {/* .horizontal_divider */}
        <div className="h-px w-full bg-[#ffffff29]" />

        {/* a.button-dark.button-secondary — Talk with an Expert */}
        <ForeplayCtaButton href="/book-demo" variant="secondary" className="justify-center">
          Talk with an Expert
        </ForeplayCtaButton>
      </div>

      {/* .pricing-footer-vertical_divider */}
      <div className="self-stretch bg-[#ffffff29]" style={{ width: "1px" }} />

      {/* .pricing-footer-extra */}
      <div className="flex flex-1 flex-col justify-between gap-10 px-6 py-8">

        {/* .pricing-footer-extra-content */}
        <div className="flex flex-col gap-3">
          {/* .text-alpha-100 > .text-label-s */}
          <div className="flex-1 text-[var(--fp-alpha-100)]">
            <div className={fpText.labelS}>Let&apos;s discuss a tailored solution that covers unique needs.</div>
          </div>
          {/* ul.pricing-footer-extra-list */}
          <ul className="m-0 flex list-none flex-col gap-3 p-0">
            {[
              "Unlimited users & product usage",
              "Priority in-app or Slack support",
              "Early access to new features and integrations",
            ].map((text) => (
              // li.pricing-footer-extra-list-item
              <li key={text} className="flex items-center gap-2">
                {/* .text-white > .icon-20 > svg check */}
                <div className="flex-1 text-white">
                  <CheckIcon />
                </div>
                {/* .text-white > .text-body-s */}
                <div className="flex-1 text-white">
                  <div className={fpText.bodyS}>{text}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* .div-block-332: flex col, gap-4 (16px) */}
        <div className="flex flex-col gap-4">
          {/* .text-alpha-100 > .text-label-s */}
          <div className="flex-1 text-[var(--fp-alpha-100)]">
            <div className={fpText.labelS}>Trusted by over 10,000 growth teams and agencies</div>
          </div>
          {/* .pricing-enterprise-logo-wrapper: flex wrap, gap-[15px], justify-between, items-center */}
          <div className="flex flex-wrap items-center justify-between gap-[15px]">
            {/* .pricing-grid-logo-wrapper > .home-hero-logo-image */}
            {[0, 3, 4, 9, 1].map((i) => (
              <div key={i} className="flex flex-col items-center justify-center p-2.5 text-[var(--fp-alpha-50)] transition-all duration-200 hover:text-[var(--fp-alpha-100)]">
                {/* .home-hero-logo-image: h-7 (28px), flex center */}
                <div className="flex h-7 items-center justify-center">
                  <HeroLogo index={i} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
