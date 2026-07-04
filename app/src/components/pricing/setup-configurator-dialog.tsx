// Setup configurator dialog — upgrade an included asset at checkout.
// Opens when buying a setup that ships with an UpgradeOffer (Advanced / Premium
// / Elite). Dark Foreplay style: `site` token scope, elevated near-black panel,
// hairline border, soft shadow, blurred backdrop. Two radio option cards + a
// base-vs-upgraded comparison + a live total; confirming adds the chosen variant
// (price already adjusted) to the cart.
//
// Composed from raw Radix (not ui/dialog) so we control the backdrop + panel:
// the page bg (#020308) is near-black, so a flat panel sinks into it. Fix =
// darker/blurred backdrop + border + soft shadow to lift the panel off the page.

"use client"

import { useState } from "react"
import { XIcon } from "lucide-react"
import { Dialog as DialogPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"
import { siteText } from "@/components/atoms/typography"
import { CtaButton } from "@/components/atoms/cta-button"
import { UpgradeComparisonTable } from "@/components/pricing/upgrade-comparison-table"
import { ORIGINAL_PROFILE_ADDON, type UpgradeOffer, type UpgradeOptionKey } from "@/data/bm5-upgrade-data"

export interface SetupConfiguratorResult {
  /** "base" | "upgraded" — which variant the customer picked */
  option: UpgradeOptionKey
  /** final price after the (optional) upgrade upcharge */
  totalPrice: number
  /** cart line name, e.g. "Advanced Setup (BM5 Unlimited)" */
  name: string
}

interface SetupConfiguratorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  planName: string
  basePrice: number
  /** how many upgradable units the setup includes */
  count: number
  /** the upgrade offer (base asset, upgraded asset, upcharge, comparison) */
  offer: UpgradeOffer
  onConfirm: (result: SetupConfiguratorResult) => void
}

// Radio-style option card (base vs upgraded).
function OptionCard({
  active, name, tagline, priceLabel, onSelect,
}: {
  active: boolean
  name: string
  tagline: string
  priceLabel: string
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onSelect}
      className={cn(
        "flex flex-1 items-center gap-3 rounded-[14px] border p-4 text-left transition-all duration-150",
        active
          ? "border-[var(--alpha-300)] bg-[var(--alpha-800)]"
          : "border-[#ffffff1a] hover:border-[var(--alpha-500)]",
      )}
    >
      {/* radio dot */}
      <span
        className={cn(
          "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors",
          active ? "border-foreground" : "border-[var(--alpha-400)]",
        )}
      >
        {active && <span className="size-2.5 rounded-full bg-foreground" />}
      </span>
      <span className="flex flex-1 flex-col gap-0.5">
        <span className={cn(siteText.labelS, "text-foreground")}>{name}</span>
        <span className={cn(siteText.bodyXs, "text-[var(--alpha-100)]")}>{tagline}</span>
      </span>
      {/* price pill — "Included" or "+$N" */}
      <span className={cn(siteText.labelS, active ? "text-foreground" : "text-[var(--alpha-50)]")}>
        {priceLabel}
      </span>
    </button>
  )
}

export function SetupConfiguratorDialog({
  open, onOpenChange, planName, basePrice, count, offer, onConfirm,
}: SetupConfiguratorDialogProps) {
  const [option, setOption] = useState<UpgradeOptionKey>("base")
  const [addOn, setAddOn] = useState(false)

  const upcharge = count * offer.unitUpcharge
  const isUpgrade = option === "upgraded"
  // Original-profile backup add-on: one per included BM unit.
  const addonTotal = count * ORIGINAL_PROFILE_ADDON.unitPrice
  const total = basePrice + (isUpgrade ? upcharge : 0) + (addOn ? addonTotal : 0)
  // Multi-unit setups (e.g. Elite, 2 BM5) upgrade ALL units together.
  const upchargeNote = count > 1 ? ` (${count}× ${offer.base.name}, $${offer.unitUpcharge} each)` : ""

  const reset = () => { setOption("base"); setAddOn(false) }

  const handleConfirm = () => {
    const tags = [isUpgrade ? offer.cartTag : null, addOn ? "Original profile" : null].filter(Boolean)
    onConfirm({
      option,
      totalPrice: total,
      name: tags.length ? `${planName} (${tags.join(", ")})` : planName,
    })
    onOpenChange(false)
    reset()
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(o) => { if (!o) reset(); onOpenChange(o) }}>
      <DialogPrimitive.Portal>
        {/* Backdrop — darker + blur so the near-black page recedes behind the panel. */}
        <DialogPrimitive.Overlay className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        {/* `site` re-scopes the Foreplay dark tokens (the portal renders outside
            .site). Panel keeps the near-black bg-background; separation comes from
            the darkened/blurred backdrop + border + soft shadow. */}
        <DialogPrimitive.Content
          className={cn(
            "site fixed top-1/2 left-1/2 z-[121] flex max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-[680px] -translate-x-1/2 -translate-y-1/2 flex-col gap-6 overflow-y-auto rounded-[20px]",
            "bg-background border border-white/12 p-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85)] ring-1 ring-white/[0.04] outline-none max-sm:p-5",
            "duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          )}
        >
          {/* Close (X) — top-right */}
          <DialogPrimitive.Close
            aria-label="Close"
            className="absolute top-5 right-5 flex size-8 items-center justify-center rounded-[10px] text-[var(--alpha-100)] transition-colors duration-150 hover:bg-white/10 hover:text-foreground"
          >
            <XIcon className="size-4" />
          </DialogPrimitive.Close>

          {/* Header */}
          <div className="flex flex-col gap-2 pr-8">
            <DialogPrimitive.Title className={cn(siteText.displayH5, "text-foreground")}>
              Configure your {planName}
            </DialogPrimitive.Title>
            <DialogPrimitive.Description className={cn(siteText.bodyS, "text-[var(--alpha-100)]")}>
              Upgrade your {offer.base.name} to {offer.upgraded.name} for a stronger, more scalable setup.
            </DialogPrimitive.Description>
          </div>

          {/* Option cards */}
          <div className="flex gap-3 max-sm:flex-col">
            <OptionCard
              active={option === "base"}
              name={offer.base.name}
              tagline={offer.base.tagline}
              priceLabel="Included"
              onSelect={() => setOption("base")}
            />
            <OptionCard
              active={option === "upgraded"}
              name={offer.upgraded.name}
              tagline={offer.upgraded.tagline}
              priceLabel={`+$${upcharge}`}
              onSelect={() => setOption("upgraded")}
            />
          </div>

          {/* Comparison */}
          <div className="flex flex-col gap-2">
            <div className={cn(siteText.overline, "text-[var(--alpha-100)]")}>
              What&rsquo;s the difference?
            </div>
            <UpgradeComparisonTable
              rows={offer.comparison}
              baseName={offer.base.name}
              upgradedName={offer.upgraded.name}
            />
            {count > 1 && (
              <p className={cn(siteText.bodyXs, "text-[var(--alpha-100)]")}>
                This setup includes {count} {offer.base.name}, upgrading applies to all of them{upchargeNote}.
              </p>
            )}
          </div>

          {/* Optional Original-profile backup add-on (checkbox card) */}
          <button
            type="button"
            onClick={() => setAddOn((v) => !v)}
            className={cn(
              "flex items-start gap-3 rounded-[14px] border p-4 text-left transition-all duration-150",
              addOn ? "border-[var(--alpha-300)] bg-[var(--alpha-800)]" : "border-[#ffffff1a] hover:border-[var(--alpha-500)]",
            )}
          >
            <span
              className={cn(
                "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-[6px] border transition-colors",
                addOn ? "border-foreground bg-foreground text-background" : "border-[var(--alpha-400)]",
              )}
            >
              {addOn && (
                <svg viewBox="0 0 20 20" className="size-3.5" fill="none" aria-hidden="true">
                  <path d="M6 10.5 8.5 13l5.5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
            <span className="flex flex-1 flex-col gap-1.5">
              <span className="flex items-baseline justify-between gap-2">
                <span className={cn(siteText.labelS, "text-foreground")}>{ORIGINAL_PROFILE_ADDON.label}</span>
                <span className={cn(siteText.labelS, "shrink-0 text-foreground")}>+${addonTotal}</span>
              </span>
              <span className={cn(siteText.bodyS, "text-[var(--alpha-100)]")}>
                {ORIGINAL_PROFILE_ADDON.benefit}{count > 1 ? ` Applies to all ${count} BMs.` : ""}
              </span>
            </span>
          </button>

          {/* Footer — live total + confirm */}
          <div className="flex items-center justify-between gap-4 border-t border-[#ffffff1a] pt-5 max-sm:flex-col max-sm:items-stretch">
            <div className="flex flex-col">
              <span className={cn(siteText.bodyXs, "text-[var(--alpha-100)]")}>Total</span>
              <span className={cn(siteText.displayH5, "text-foreground")}>
                ${total}
                {total > basePrice && (
                  <span className={cn(siteText.bodyS, "ml-2 text-[var(--alpha-50)] line-through")}>
                    ${basePrice}
                  </span>
                )}
              </span>
            </div>
            <CtaButton variant="hero" onClick={handleConfirm} className="justify-center max-sm:w-full">
              Add to cart, ${total}
            </CtaButton>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
