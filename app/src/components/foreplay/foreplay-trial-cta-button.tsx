// Trial CTA — always renders the trial-style button (no cart-aware switch).
// Reuses ForeplayCtaButton verbatim for identical styling.

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
