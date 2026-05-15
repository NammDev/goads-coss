// Foreplay pricing card — .pricing-card-container + .pricing-card
// Exact DOM from source: pricing-card > pricing-card-head | horizontal_divider | pricing-card-cta | horizontal_divider | pricing-card-details
// .pricing-card: flex col, gap-5 (20px), p-6 (24px)
// .pricing-card-head: flex col, gap-2, text-center, items-center
// .pricing-card-cta: flex col, gap-5
// .pricing-card-details: flex col, gap-4 (16px)
// .pricing-card-details-list: flex col, gap-3, m-0, p-0
// .pricing-card-details-item: flex, gap-2, items-center, color neutral-0
// .pricing-card-details-item.is-unavailable: opacity 0.44
// .pricing-card-details-item-text: flex-1, flex, gap-3, items-center
// .pricing-icon: 28x28 (desktop), 24x24 (mobile)
// .horizontal_divider: bg neutral-600, w-full, h-px
// .no-cc-required: display none
// .flex-col-gap-2: flex col, gap-2, items-center
// .flex-baseline: flex, gap-1, items-baseline
// .flex-gap-1: flex, gap-1, items-center
// .div-block-335: flex col, w-full
// .text-white: color #fff, flex-1
// .text-alpha-100: color neutral-100 (#ffffffad), flex-1

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { fpText } from "@/components/foreplay/foreplay-typography"
import { ForeplayCtaButton } from "@/components/foreplay/foreplay-cta-button"

// SVG icons extracted from source sprites
function CheckIcon() {
  return (
    <div className="flex size-6 items-center justify-center">
      <svg viewBox="0 0 20 20" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6.25 10.75 8.5 13l5.25-6" stroke="currentColor" />
      </svg>
    </div>
  )
}

function CrossIcon() {
  return (
    <div className="flex size-6 items-center justify-center">
      <svg viewBox="0 0 20 20" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.33325 7L13.3333 13M13.3333 7L7.33325 13" strokeWidth="1.5" strokeLinecap="round" stroke="currentColor" />
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

// No CC icon
function NoCcIcon() {
  return (
    <div className="size-5">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeOpacity=".68" strokeWidth="1.5"
          d="M2.3 8.13v6.24c0 .92.74 1.67 1.66 1.67h7.29M2.29 8.13v-2.5c0-.92.75-1.67 1.67-1.67h12.08c.92 0 1.66.74 1.66 1.66v2.5m-15.4 0h15.4m0 0v1.25M17.8 12.6l-1.76 1.77m0 0-1.77 1.77m1.77-1.77-1.77-1.77m1.77 1.77 1.76 1.77" />
      </svg>
    </div>
  )
}

// Product icon images — local files from public/foreplay/
// Desktop CSS: background-position: 0px 0px; background-size: auto 100%; background-repeat: no-repeat
// .pricing-icon: 28x28
const productIcons: Record<string, string> = {
  "swipe-file": "bg-[url(/foreplay/footer_2.webp)]",
  discovery: "bg-[url(/foreplay/footer_1.webp)]",
  briefs: "bg-[url(/foreplay/footer_5.webp)]",
  spyder: "bg-[url(/foreplay/footer_3.webp)]",
  lens: "bg-[url(/foreplay/footer_4.webp)]",
}

export interface PricingFeature {
  /** Brand icon (Swipe File/Discovery/etc). Omit for icon-less feature rows. */
  icon?: "swipe-file" | "discovery" | "briefs" | "spyder" | "lens" | "api"
  /** Custom image source (e.g. /foreplay/BM.svg) — overrides checkmark, shown as leading icon. */
  iconSrc?: string
  label: string
  available: boolean
  /** e.g. "15 Brands", "Unlimited", "10,000 Credits" — shown instead of check/cross */
  value?: string
}

export interface PricingCardData {
  planName: string
  description: string
  price: string
  /** e.g. "/month" — omit/empty for one-time pricing */
  period?: string
  /** e.g. "Save $120 annually" — only shown when provided */
  savingsText?: string
  ctaLabel: string
  ctaHref: string
  /** "primary" for highlighted plan, "secondary" for others */
  ctaVariant: "primary" | "secondary"
  /** Subscription user info — omit/empty for one-time products */
  usersIncluded?: string
  additionalUserCost?: string
  features: PricingFeature[]
}

interface ForeplayPricingCardProps {
  variant: "first" | "middle" | "last"
  data?: PricingCardData
  className?: string
}

const containerVariants = {
  first: "rounded-l-[20px]",
  middle: "rounded-[20px] py-4 relative shadow-[0_0_0_1px_var(--fp-alpha-100)]",
  last: "rounded-r-[20px]",
}

export function ForeplayPricingCard({
  variant,
  data,
  className,
}: ForeplayPricingCardProps) {
  return (
    <div
      className={cn(
        // .pricing-card-container
        "bg-background",
        variant === "middle"
          ? containerVariants.middle
          : cn("shadow-[0_0_0_1px_var(--fp-alpha-700)]", containerVariants[variant]),
        className,
      )}
    >
      {/* .pricing-card */}
      <div className="flex flex-col gap-5 p-6">

        {/* .pricing-card-head */}
        <div className="flex flex-col items-center gap-2 text-center">
          {/* .text-white > h3.text-overline */}
          <div className="flex-1 text-white">
            <h3 className={fpText.overline}>{data?.planName ?? "Plan"}</h3>
          </div>
          {/* .text-balance > .text-alpha-100 > p.text-body-s */}
          <div className="[text-wrap:balance]">
            <div className="flex-1 text-[var(--fp-alpha-100)]">
              <p className={fpText.bodyS}>{data?.description ?? ""}</p>
            </div>
          </div>
        </div>

        {/* .horizontal_divider */}
        <div className="h-px w-full bg-[var(--fp-alpha-700)]" />

        {/* .pricing-card-cta */}
        <div className="flex flex-col gap-5">
          {/* .flex-col-gap-2 — price row */}
          <div className="flex flex-col items-center gap-2">
            {/* .flex-baseline — price + period */}
            <div className="flex items-baseline gap-1">
              <div className="flex-1 text-white">
                <div className={fpText.displayH5}>{data?.price ?? "$0"}</div>
              </div>
              {data?.period && (
                <div className="flex-1 text-[var(--fp-alpha-100)]">
                  <div className={fpText.bodyS}>{data.period}</div>
                </div>
              )}
            </div>
            {/* .flex-gap-1 — savings badge (optional) */}
            {data?.savingsText && (
              <div className="flex items-center gap-1">
                <SavingsIcon />
                <div className="flex-1 text-white">
                  <div className={fpText.labelS}>{data.savingsText}</div>
                </div>
              </div>
            )}
          </div>
          {/* .flex-col-gap-2 — CTA button */}
          <div className="flex flex-col items-center gap-2">
            {/* .div-block-335 — full width wrapper */}
            <div className="flex w-full flex-col">
              {/* Reuse ForeplayCtaButton — exact DOM: .button-dark.button-primary|secondary */}
              <ForeplayCtaButton
                href={data?.ctaHref ?? "#"}
                variant={data?.ctaVariant === "primary" ? "hero" : "secondary"}
                className="w-full justify-center"
              >
                {data?.ctaLabel ?? "Start Free Trial"}
              </ForeplayCtaButton>
            </div>
            {/* .no-cc-required — display:none in source */}
            <div className="hidden">
              <div className="flex items-center gap-2">
                <NoCcIcon />
                <div className="flex-1 text-[var(--fp-alpha-100)]">
                  <div className={fpText.labelS}>No credit card required</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* .horizontal_divider */}
        <div className="h-px w-full bg-[var(--fp-alpha-700)]" />

        {/* .pricing-card-details */}
        <div className="flex flex-col gap-4">
          {/* .pricing-card-details-title — hidden when no subscription user info */}
          {(data?.usersIncluded || data?.additionalUserCost) && (
            <div>
              {data?.usersIncluded && (
                <div className="flex-1 text-white">
                  <div className={fpText.labelS}>{data.usersIncluded}</div>
                </div>
              )}
              {data?.additionalUserCost && (
                <div className="flex-1 text-[var(--fp-alpha-100)]">
                  <div className={fpText.bodyS}>{data.additionalUserCost}</div>
                </div>
              )}
            </div>
          )}
          {/* .pricing-card-details-list — gap-4 (was gap-3) for cleaner Foreplay-style breathing room */}
          <ul className="m-0 flex list-none flex-col gap-4 p-0">
            {(data?.features ?? []).map((feature, i) => (
              <li key={i}>
                <div className={cn(
                  // .pricing-card-details-item
                  "flex items-start gap-3 text-foreground",
                  !feature.available && "opacity-[0.44]",
                )}>
                  {/* Leading icon: custom image > checkmark > nothing (brand sprite handled separately below) */}
                  {feature.iconSrc ? (
                    <div className="size-7 shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={feature.iconSrc} alt="" className="size-7 object-contain" loading="lazy" />
                    </div>
                  ) : !feature.icon ? (
                    <div className="mt-0.5 shrink-0">
                      {feature.available ? <CheckIcon /> : <CrossIcon />}
                    </div>
                  ) : null}
                  {/* .pricing-card-details-item-text */}
                  <div className="flex flex-1 items-center gap-3">
                    {/* .pricing-icon: only when icon provided (Foreplay product brands) */}
                    {feature.icon === "api" ? (
                      <div className="size-7">
                        <img src="/foreplay/api_settings.png" alt="API" className="size-7" />
                      </div>
                    ) : feature.icon ? (
                      <div className={cn(
                        "size-7 bg-[position:0px_0px] bg-[size:auto_100%] bg-no-repeat",
                        productIcons[feature.icon],
                        !feature.available && "pointer-events-none grayscale",
                      )} />
                    ) : null}
                    <div className={cn(fpText.bodyS, "leading-[1.45]")}>{feature.label}</div>
                  </div>
                  {/* trailing check/cross/value — only when icon present (preserves original right-aligned indicator) */}
                  {feature.icon && (
                    feature.value ? (
                      <div className="flex-1 text-[var(--fp-alpha-100)]">
                        <div className={fpText.bodyS}>{feature.value}</div>
                      </div>
                    ) : feature.available ? (
                      <CheckIcon />
                    ) : (
                      <CrossIcon />
                    )
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  )
}
