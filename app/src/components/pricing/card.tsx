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

"use client"

import { type ReactNode, useState, useCallback } from "react"
import { cn } from "@/lib/utils"
import { siteText } from "@/components/atoms/typography"
import { CtaButton } from "@/components/atoms/cta-button"
import { useCart } from "@/lib/cart-context"
import { SetupConfiguratorDialog, type SetupConfiguratorResult } from "@/components/pricing/setup-configurator-dialog"
import type { UpgradeOffer } from "@/data/bm5-upgrade-data"

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

export interface PricingFeature {
  /** Brand icon. Only "api" is supported currently. */
  icon?: "api"
  /** Custom image source — overrides checkmark, shown as leading icon. */
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
  /** When set, the CTA opens the upgrade configurator instead of adding straight
   *  to cart. `count` = how many upgradable units this setup includes; `offer`
   *  describes the base→upgraded swap (labels, upcharge, comparison). */
  upgrade?: { offer: UpgradeOffer; count: number }
}

interface PricingCardProps {
  variant: "first" | "middle" | "last"
  data?: PricingCardData
  className?: string
}

// Desktop: first/last are half-rounded (outer edges) to join the middle into one bar.
// ≤991px (stacked): every card is fully rounded with its own border (Foreplay .is-first/.is-last
// border-radius:20px; .is-middle box-shadow dims neutral-100 → neutral-600 to match siblings).
const containerVariants = {
  first: "rounded-l-[20px] max-[991px]:rounded-[20px]",
  middle: "rounded-[20px] py-4 relative shadow-[0_0_0_1px_var(--alpha-100)] max-[991px]:shadow-[0_0_0_1px_var(--alpha-700)]",
  last: "rounded-r-[20px] max-[991px]:rounded-[20px]",
}

export function PricingCard({
  variant,
  data,
  className,
}: PricingCardProps) {
  const { addItem } = useCart()
  const [cartState, setCartState] = useState<"idle" | "loading" | "done">("idle")
  const [configOpen, setConfigOpen] = useState(false)

  // Setup tiers are one-time bundles — parse "$250" → 250 so they add to cart
  // like a normal product. Non-numeric prices (e.g. "Contact") fall back to the link.
  const priceNum = data ? Number(String(data.price).replace(/[^0-9.]/g, "")) : NaN
  const canBuy = Number.isFinite(priceNum) && priceNum > 0
  // Setups with a BM5 upgrade open the configurator first (pick $250 vs Unlimited).
  const hasUpgrade = canBuy && !!data?.upgrade

  const handleAddToCart = useCallback(() => {
    if (!data || !canBuy || cartState !== "idle") return
    setCartState("loading")
    setTimeout(() => {
      // addItem dispatches `cart:item-added`, which slides the cart drawer open.
      addItem({ name: data.planName, description: data.description, price: priceNum, unit: "setup" })
      setCartState("done")
      setTimeout(() => setCartState("idle"), 1200)
    }, 400)
  }, [data, canBuy, priceNum, cartState, addItem])

  // Configurator confirmed → add the chosen variant (price already adjusted).
  const handleUpgradeConfirm = useCallback((result: SetupConfiguratorResult) => {
    if (!data) return
    addItem({ name: result.name, description: data.description, price: result.totalPrice, unit: "setup" })
    setCartState("done")
    setTimeout(() => setCartState("idle"), 1200)
  }, [data, addItem])

  const ctaText =
    cartState === "loading" ? "Adding..." : cartState === "done" ? "Added to cart" : (data?.ctaLabel ?? "Add to cart")

  return (
    <div
      className={cn(
        // .pricing-card-container — fills column width when stacked (≤991px width:100%)
        "bg-background max-[991px]:w-full",
        variant === "middle"
          ? containerVariants.middle
          : cn("shadow-[0_0_0_1px_var(--alpha-700)]", containerVariants[variant]),
        className,
      )}
    >
      {/* .pricing-card */}
      <div className="flex flex-col gap-5 p-6">

        {/* .pricing-card-head */}
        <div className="flex flex-col items-center gap-2 text-center">
          {/* .text-white > h3.text-overline */}
          <div className="flex-1 text-white">
            <h3 className={siteText.overline}>{data?.planName ?? "Plan"}</h3>
          </div>
          {/* .text-balance > .text-alpha-100 > p.text-body-s */}
          <div className="[text-wrap:balance]">
            <div className="flex-1 text-[var(--alpha-100)]">
              <p className={siteText.bodyS}>{data?.description ?? ""}</p>
            </div>
          </div>
        </div>

        {/* .horizontal_divider */}
        <div className="h-px w-full bg-[var(--alpha-700)]" />

        {/* .pricing-card-cta */}
        <div className="flex flex-col gap-5">
          {/* .flex-col-gap-2 — price row */}
          <div className="flex flex-col items-center gap-2">
            {/* .flex-baseline — price + period */}
            <div className="flex items-baseline gap-1">
              <div className="flex-1 text-white">
                <div className={siteText.displayH5}>{data?.price ?? "$0"}</div>
              </div>
              {data?.period && (
                <div className="flex-1 text-[var(--alpha-100)]">
                  <div className={siteText.bodyS}>{data.period}</div>
                </div>
              )}
            </div>
            {/* .flex-gap-1 — savings badge (optional) */}
            {data?.savingsText && (
              <div className="flex items-center gap-1">
                <SavingsIcon />
                <div className="flex-1 text-white">
                  <div className={siteText.labelS}>{data.savingsText}</div>
                </div>
              </div>
            )}
          </div>
          {/* .flex-col-gap-2 — CTA button */}
          <div className="flex flex-col items-center gap-2">
            {/* .div-block-335 — full width wrapper */}
            <div className="flex w-full flex-col">
              {/* Reuse CtaButton — exact DOM: .button-dark.button-primary|secondary */}
              {/* Purchasable setup → add-to-cart action button (opens cart drawer). */}
              {/* Otherwise → plain link (e.g. "Contact"/custom href). */}
              <CtaButton
                {...(canBuy
                  ? { onClick: hasUpgrade ? () => setConfigOpen(true) : handleAddToCart }
                  : { href: data?.ctaHref ?? "#" })}
                variant={data?.ctaVariant === "primary" ? "hero" : "secondary"}
                className="w-full justify-center"
                showIcon={!canBuy || cartState === "idle"}
              >
                {canBuy ? ctaText : (data?.ctaLabel ?? "Start Free Trial")}
              </CtaButton>
            </div>
            {/* .no-cc-required — display:none in source */}
            <div className="hidden">
              <div className="flex items-center gap-2">
                <NoCcIcon />
                <div className="flex-1 text-[var(--alpha-100)]">
                  <div className={siteText.labelS}>No credit card required</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* .horizontal_divider */}
        <div className="h-px w-full bg-[var(--alpha-700)]" />

        {/* .pricing-card-details */}
        <div className="flex flex-col gap-4">
          {/* .pricing-card-details-title — hidden when no subscription user info */}
          {(data?.usersIncluded || data?.additionalUserCost) && (
            <div>
              {data?.usersIncluded && (
                <div className="flex-1 text-white">
                  <div className={siteText.labelS}>{data.usersIncluded}</div>
                </div>
              )}
              {data?.additionalUserCost && (
                <div className="flex-1 text-[var(--alpha-100)]">
                  <div className={siteText.bodyS}>{data.additionalUserCost}</div>
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
                    {feature.icon === "api" && (
                      <div className="size-7">
                        <img src="/assets/api_settings.png" alt="API" className="size-7" />
                      </div>
                    )}
                    <div className={cn(siteText.bodyS, "leading-[1.45]")}>{feature.label}</div>
                  </div>
                  {/* trailing check/cross/value — only when icon present (preserves original right-aligned indicator) */}
                  {feature.icon && (
                    feature.value ? (
                      <div className="flex-1 text-[var(--alpha-100)]">
                        <div className={siteText.bodyS}>{feature.value}</div>
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

      {/* BM5 upgrade configurator — mounted only for setups that include BM5 ($250). */}
      {hasUpgrade && data && (
        <SetupConfiguratorDialog
          open={configOpen}
          onOpenChange={setConfigOpen}
          planName={data.planName}
          basePrice={priceNum}
          count={data.upgrade!.count}
          offer={data.upgrade!.offer}
          onConfirm={handleUpgradeConfirm}
        />
      )}
    </div>
  )
}
