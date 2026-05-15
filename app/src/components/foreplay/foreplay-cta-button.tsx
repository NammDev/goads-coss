// Foreplay CTA button — multiple variants from source CSS
// All share: .button-dark base (p-2, rounded-[10px], z-5, flex, .text-heading-m for hero/secondary/ghost)
// nav: .new-button.new-button-navbar — white bg, 0.9375rem navlink text, icon opacity 0.68
// hero: .button-dark.button-primary — white bg, 1rem heading-m text, icon opacity 1
// secondary: .button-dark.button-secondary — neutral-700 bg, white text, icon opacity 0.68
// ghost: .button-dark.button-ghost — transparent bg, white text, icon opacity 0.68

import type { ReactNode } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

type ButtonVariant = "nav" | "hero" | "secondary" | "ghost" | "light-primary"

interface ForeplayCtaButtonProps {
  href: string
  children: ReactNode
  variant?: ButtonVariant
  showIcon?: boolean
  /** Optional leading icon rendered before the text */
  leadingIcon?: ReactNode
  className?: string
}

const isExternalUrl = (href: string) => /^https?:\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:")

const variantStyles: Record<ButtonVariant, string> = {
  nav: "bg-primary text-primary-foreground transition-all duration-[600ms] ease-[cubic-bezier(0.19,1,0.22,1)] hover:bg-primary/90",
  hero: "bg-primary text-primary-foreground transition-all duration-150 hover:bg-[var(--fp-alpha-50)] active:bg-[var(--fp-alpha-100)]",
  secondary: "bg-secondary text-foreground border-0 transition-all duration-150 hover:bg-border active:bg-[var(--fp-alpha-100)]",
  ghost: "bg-background text-foreground transition-all duration-150 hover:bg-secondary active:bg-[var(--fp-alpha-100)]",
  "light-primary": "bg-background text-foreground transition-all duration-150 hover:bg-[var(--fp-solid-600)] active:bg-[var(--fp-solid-400)] active:text-foreground",
}

export function ForeplayCtaButton({
  href,
  children,
  variant = "nav",
  showIcon = true,
  leadingIcon,
  className,
}: ForeplayCtaButtonProps) {
  const isNav = variant === "nav"
  const iconOpacity = variant === "hero" ? 1 : 0.68
  const external = isExternalUrl(href)

  const sharedClass = cn(
    // shared base — nav variant uses Foreplay's `.new-button-small` (6px padding / 8px radius)
    // so the navbar CTA reads at parity with surrounding text links instead of overpowering them.
    // Hero / secondary / ghost / light-primary keep the default `.new-button` rhythm.
    "relative z-[5] flex items-center no-underline",
    isNav ? "rounded-[8px] p-1.5" : "rounded-[10px] p-2",
    // variant-specific colors + transitions
    variantStyles[variant],
    // focus-visible: dark buttons use bg+white ring, light buttons use white+solid-900 ring
    variant === "light-primary"
      ? "focus-visible:shadow-[0_0_0_2px_white,0_0_0_3px_var(--fp-solid-900)] focus-visible:outline-none"
      : "focus-visible:shadow-[0_0_0_2px_var(--background),0_0_0_3px_white] focus-visible:outline-none",
    className,
  )

  const body = (
    <>
      {leadingIcon && (
        // .button-icon-block: -mr-1, flex center, z-[2]
        <span className="relative z-[2] -mr-1 flex items-center justify-center">
          <span className="flex size-6 items-center justify-center">{leadingIcon}</span>
        </span>
      )}
      {/* .button-text-block: px-1.5, z-[2] */}
      <span
        className={cn(
          "relative z-[2] px-1.5 font-sans font-[550]",
          isNav
            ? "text-[0.9375rem] leading-5"
            : "text-base leading-6 tracking-[-0.01125em]",
        )}
      >
        {children}
      </span>
      {showIcon && <ForeplayChevronIcon opacity={iconOpacity} />}
    </>
  )

  // External links use <a target="_blank">; internal use Next.js <Link>
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={sharedClass}>
      {body}
    </a>
  ) : (
    <Link href={href} className={sharedClass}>
      {body}
    </Link>
  )
}

// .button-icon-block.icon-right: -ml-1, flex center, z-[2]
function ForeplayChevronIcon({ opacity }: { opacity: number }) {
  return (
    <span
      className="relative z-[2] -ml-1 flex items-center justify-center"
      style={{ opacity }}
    >
      <span className="flex size-6 items-center justify-center">
        <svg viewBox="0 0 20 20" width="20" height="20" fill="none">
          <path
            d="M8 6.5l3.5 3.5L8 13.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </span>
  )
}
