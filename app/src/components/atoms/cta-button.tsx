// Foreplay CTA button — multiple variants from source CSS
// All share: .button-dark base (p-2, rounded-[10px], z-5, flex, .text-heading-m for hero/secondary/ghost)
// nav: .new-button.new-button-navbar — white bg, 0.9375rem navlink text, icon opacity 0.68
// hero: .button-dark.button-primary — white bg, 1rem heading-m text, icon opacity 1
// secondary: .button-dark.button-secondary — neutral-700 bg, white text, icon opacity 0.68
// ghost: .button-dark.button-ghost — transparent bg, white text, icon opacity 0.68

import type { ReactNode } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

type ButtonVariant = "nav" | "hero" | "secondary" | "ghost" | "light-primary" | "light-stroke"

interface CtaButtonProps {
  /** Navigation target. Omit when using `onClick` (action button). */
  href?: string
  /** Action handler — renders a <button> instead of a link. Used by cart CTA. */
  onClick?: () => void
  children: ReactNode
  variant?: ButtonVariant
  showIcon?: boolean
  /** Optional leading icon rendered before the text */
  leadingIcon?: ReactNode
  className?: string
  /** Render a same-origin file download (`<a href download>`) instead of a
   *  navigation. Used for serving the extension .zip from /public. */
  download?: boolean
  /** Extra attributes (e.g. data-cal-* for a Cal.com popup trigger) forwarded
   *  onto the rendered button/anchor. */
  data?: Record<string, string>
}

const isExternalUrl = (href: string) => /^https?:\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:")

const variantStyles: Record<ButtonVariant, string> = {
  nav: "bg-primary text-primary-foreground transition-all duration-[600ms] ease-[cubic-bezier(0.19,1,0.22,1)] hover:bg-primary/90",
  hero: "bg-primary text-primary-foreground transition-all duration-150 hover:bg-[var(--alpha-50)] active:bg-[var(--alpha-100)]",
  secondary: "bg-secondary text-foreground border-0 transition-all duration-150 hover:bg-border active:bg-[var(--alpha-100)]",
  // active was alpha-100 (#ffffffad, 68% white) → ugly white flash on click for
  // this dark-bg button. alpha-600 (16% white) = subtle press, no flash.
  ghost: "bg-background text-foreground transition-all duration-150 hover:bg-secondary active:bg-[var(--alpha-600)]",
  "light-primary": "bg-background text-foreground transition-all duration-150 hover:bg-[var(--solid-600)] active:bg-[var(--solid-400)] active:text-foreground",
  // .button-light.button-stroke — white bg, 1px solid-50 ring, solid-900 text
  "light-stroke": "bg-white text-[var(--solid-900)] shadow-[0_0_0_1px_var(--solid-50)] transition-all duration-150 hover:bg-[var(--solid-25)] hover:shadow-none active:bg-[var(--solid-50)]",
}

export function CtaButton({
  href,
  onClick,
  children,
  variant = "nav",
  showIcon = true,
  leadingIcon,
  className,
  download,
  data,
}: CtaButtonProps) {
  const isNav = variant === "nav"
  const iconOpacity = variant === "hero" ? 1 : 0.68
  const external = href ? isExternalUrl(href) : false

  const sharedClass = cn(
    // shared base — nav variant uses Foreplay's `.new-button-small` (6px padding / 8px radius)
    // so the navbar CTA reads at parity with surrounding text links instead of overpowering them.
    // Hero / secondary / ghost / light-primary keep the default `.new-button` rhythm.
    "relative z-[5] flex cursor-pointer items-center no-underline",
    isNav ? "rounded-[8px] p-1.5" : "rounded-[10px] p-2",
    // variant-specific colors + transitions
    variantStyles[variant],
    // focus-visible: dark buttons use bg+white ring, light buttons use white+solid-900 ring
    variant === "light-primary" || variant === "light-stroke"
      ? "focus-visible:shadow-[0_0_0_2px_white,0_0_0_3px_var(--solid-900)] focus-visible:outline-none"
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
      {showIcon && <ChevronIcon opacity={iconOpacity} />}
    </>
  )

  // Action mode (onClick, no href) → <button>. Otherwise: external links use
  // <a target="_blank">; internal use Next.js <Link>.
  if (!href) {
    return (
      <button type="button" onClick={onClick} className={sharedClass} {...data}>
        {body}
      </button>
    )
  }
  // File download → plain anchor with `download` (Next <Link> would client-nav
  // and ignore the attribute).
  if (download) {
    return (
      <a href={href} download className={sharedClass} {...data}>
        {body}
      </a>
    )
  }
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={sharedClass} {...data}>
      {body}
    </a>
  ) : (
    <Link href={href} className={sharedClass} {...data}>
      {body}
    </Link>
  )
}

// .button-icon-block.icon-right: -ml-1, flex center, z-[2]
function ChevronIcon({ opacity }: { opacity: number }) {
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
