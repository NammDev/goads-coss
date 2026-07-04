// Setup configurator dialog — BM5 $250 → Unlimited upgrade picker.
// Opens when buying a setup that includes BM5 Verified $250 (Premium / Elite).
// Dark Foreplay style: bg-background, #ffffff1a hairlines, --alpha-* text ramp,
// siteText typography, CtaButton. Two radio option cards + comparison table +
// a live total; confirming adds the chosen variant (price already adjusted) to
// the cart.
//
// Composed from raw Radix (not ui/dialog) so we control the backdrop + panel:
// the page bg (#020308) is near-black, so a flat #020308 panel sinks into it.
// Fix = darker/blurred backdrop (page recedes) + an ELEVATED panel surface
// (gradient a touch lighter than the page) + brighter border + soft shadow.

"use client"

import { useState } from "react"
import { XIcon } from "lucide-react"
import { Dialog as DialogPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"
import { siteText } from "@/components/atoms/typography"
import { CtaButton } from "@/components/atoms/cta-button"
import { Bm5ComparisonTable } from "@/components/pricing/bm5-comparison-table"
import { BM5_UNIT_UPCHARGE, bm5Options, type Bm5OptionKey } from "@/data/bm5-upgrade-data"

export interface SetupConfiguratorResult {
  /** "base" | "unlimited" — which BM5 variant the customer picked */
  option: Bm5OptionKey
  /** final price after the (optional) upgrade upcharge */
  totalPrice: number
  /** cart line name, e.g. "Premium Setup (BM5 Unlimited)" */
  name: string
}

interface SetupConfiguratorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  planName: string
  basePrice: number
  /** how many BM5 Verified $250 units the setup includes */
  bm5Count: number
  onConfirm: (result: SetupConfiguratorResult) => void
}

// Radio-style option card (BM5 $250 vs Unlimited).
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
      {/* price pill — "Included" or "+$60" */}
      <span className={cn(siteText.labelS, active ? "text-foreground" : "text-[var(--alpha-50)]")}>
        {priceLabel}
      </span>
    </button>
  )
}

export function SetupConfiguratorDialog({
  open, onOpenChange, planName, basePrice, bm5Count, onConfirm,
}: SetupConfiguratorDialogProps) {
  const [option, setOption] = useState<Bm5OptionKey>("base")

  const upcharge = bm5Count * BM5_UNIT_UPCHARGE
  const isUpgrade = option === "unlimited"
  const total = isUpgrade ? basePrice + upcharge : basePrice
  // Multi-BM5 setups (Elite) upgrade ALL units together — note the math.
  const upchargeNote = bm5Count > 1 ? ` (${bm5Count}× BM5, $${BM5_UNIT_UPCHARGE} each)` : ""

  const handleConfirm = () => {
    onConfirm({
      option,
      totalPrice: total,
      name: isUpgrade ? `${planName} (BM5 Unlimited)` : planName,
    })
    onOpenChange(false)
    setOption("base") // reset for next open
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        {/* Backdrop — darker (70%) + blur so the near-black page recedes behind
            the panel instead of blending into it. */}
        <DialogPrimitive.Overlay className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        {/* `site` re-scopes the Foreplay dark tokens (--primary, --alpha-*, …):
            the dialog portals to <body>, outside the .site wrapper, so without
            this the hero button loses its dark text and vanishes on hover.
            Panel keeps the original near-black bg-background; separation from the
            page comes from the darkened/blurred backdrop + border + soft shadow. */}
        <DialogPrimitive.Content
          className={cn(
            "site fixed top-1/2 left-1/2 z-[121] flex max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-[680px] -translate-x-1/2 -translate-y-1/2 flex-col gap-6 overflow-y-auto rounded-[20px]",
            // original black surface (#020308); lifted only by border + shadow
            "bg-background",
            "border border-white/12 p-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85)] ring-1 ring-white/[0.04] outline-none max-sm:p-5",
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
              Choose your BM5 type. Upgrade to Unlimited to remove the $250 spend cap and scale without limits.
            </DialogPrimitive.Description>
          </div>

        {/* Option cards */}
        <div className="flex gap-3 max-sm:flex-col">
          <OptionCard
            active={option === "base"}
            name={bm5Options.base.name}
            tagline={bm5Options.base.tagline}
            priceLabel="Included"
            onSelect={() => setOption("base")}
          />
          <OptionCard
            active={option === "unlimited"}
            name={bm5Options.unlimited.name}
            tagline={bm5Options.unlimited.tagline}
            priceLabel={`+$${upcharge}`}
            onSelect={() => setOption("unlimited")}
          />
        </div>

        {/* Comparison */}
        <div className="flex flex-col gap-2">
          <div className={cn(siteText.overline, "text-[var(--alpha-100)]")}>
            What&rsquo;s the difference?
          </div>
          <Bm5ComparisonTable />
          {bm5Count > 1 && (
            <p className={cn(siteText.bodyXs, "text-[var(--alpha-100)]")}>
              This setup includes {bm5Count} BM5, upgrading applies to all of them{upchargeNote}.
            </p>
          )}
        </div>

        {/* Footer — live total + confirm */}
        <div className="flex items-center justify-between gap-4 border-t border-[#ffffff1a] pt-5 max-sm:flex-col max-sm:items-stretch">
          <div className="flex flex-col">
            <span className={cn(siteText.bodyXs, "text-[var(--alpha-100)]")}>Total</span>
            <span className={cn(siteText.displayH5, "text-foreground")}>
              ${total}
              {isUpgrade && (
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
