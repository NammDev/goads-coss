// Foreplay reusable container — .container.section-container
// .container: w-full, max-w-site, mx-auto, px-10 (40px)
// .container.section-container: max-w-[1216px] (override)
// .container.footer-container: same max-w-[1216px]
// Variant "navbar": .container.navbar-container → max-w-site, px-2 (8px), z-5
// Usage: wraps every <section> and <footer> on the page

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionContainerProps {
  children: ReactNode
  /** "section" = .container.section-container (1216px), "wide" = .container (1440px), "navbar" = navbar (1440px px-2) */
  variant?: "section" | "wide" | "footer" | "navbar"
  as?: "div" | "section" | "footer"
  className?: string
}

// Horizontal padding mirrors Foreplay's responsive .container cascade
// (40px desktop ≥992 → 32px tablet ≤991 → 24px mobile ≤767). goads previously
// used a fixed px-10 (40px) at all widths → over-padded / narrower content on
// mobile vs Foreplay. Mobile-first: px-6 (24) → md:px-8 (32) → fp-lg:px-10 (40).
const RESPONSIVE_PX = "px-6 md:px-8 fp-lg:px-10"
const variantClasses: Record<string, string> = {
  navbar: "max-w-site px-2 relative z-[5]",       // .container.navbar-container (8px, unchanged)
  wide: `max-w-site ${RESPONSIVE_PX}`,            // .container
  section: `max-w-[1216px] ${RESPONSIVE_PX}`,          // .container.section-container
  footer: `max-w-[1216px] ${RESPONSIVE_PX}`,           // .container.footer-container
}

export function SectionContainer({
  children,
  variant = "section",
  as: Tag = "div",
  className,
}: SectionContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </Tag>
  )
}
