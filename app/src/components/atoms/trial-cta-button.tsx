// Trial CTA — always renders the trial-style button (no cart-aware switch).
// Reuses CtaButton verbatim for identical styling.

import { CtaButton } from "@/components/atoms/cta-button"

type ButtonVariant = "nav" | "hero" | "secondary" | "ghost" | "light-primary"

interface TrialCtaButtonProps {
  variant?: ButtonVariant
  showIcon?: boolean
  className?: string
  /** Override the trial label (default "Start free trial"). */
  trialLabel?: string
}

export function TrialCtaButton({
  variant = "nav",
  showIcon = true,
  className,
  trialLabel = "Start free trial",
}: TrialCtaButtonProps) {
  return (
    <CtaButton
      href="/sign-up"
      variant={variant}
      showIcon={showIcon}
      className={className}
    >
      {trialLabel}
    </CtaButton>
  )
}
