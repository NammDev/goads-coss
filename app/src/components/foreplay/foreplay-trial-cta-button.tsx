"use client"

// Cart-aware trial CTA: empty cart → "Start free trial" (→ /sign-up);
// cart has items → "View cart" (opens the cart, no navigation).
// Reuses ForeplayCtaButton verbatim for identical styling (DRY).

import { useCart, openCart } from "@/lib/cart-context"
import { ForeplayCtaButton } from "@/components/foreplay/foreplay-cta-button"

type ButtonVariant = "nav" | "hero" | "secondary" | "ghost" | "light-primary"

interface ForeplayTrialCtaButtonProps {
  variant?: ButtonVariant
  showIcon?: boolean
  className?: string
  /** Override the trial label (default "Start free trial"). */
  trialLabel?: string
}

export function ForeplayTrialCtaButton({
  variant = "nav",
  showIcon = true,
  className,
  trialLabel = "Start free trial",
}: ForeplayTrialCtaButtonProps) {
  const { totalItems } = useCart()

  if (totalItems > 0) {
    return (
      <ForeplayCtaButton
        onClick={openCart}
        variant={variant}
        showIcon={showIcon}
        className={className}
      >
        View cart
      </ForeplayCtaButton>
    )
  }

  return (
    <ForeplayCtaButton
      href="/sign-up"
      variant={variant}
      showIcon={showIcon}
      className={className}
    >
      {trialLabel}
    </ForeplayCtaButton>
  )
}
