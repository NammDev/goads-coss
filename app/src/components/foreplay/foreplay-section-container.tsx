// Foreplay reusable container — .container.section-container
// .container: w-full, max-w-[1440px], mx-auto, px-10 (40px)
// .container.section-container: max-w-[1216px] (override)
// .container.footer-container: same max-w-[1216px]
// Variant "navbar": .container.navbar-container → max-w-[1440px], px-2 (8px), z-5
// Usage: wraps every <section> and <footer> on the page

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ForeplaySectionContainerProps {
  children: ReactNode
  /** "section" = .container.section-container (1216px), "wide" = .container (1440px), "navbar" = navbar (1440px px-2) */
  variant?: "section" | "wide" | "footer" | "navbar"
  as?: "div" | "section" | "footer"
  className?: string
}

const variantClasses: Record<string, string> = {
  navbar: "max-w-[1440px] px-2 relative z-[5]",    // .container.navbar-container
  wide: "max-w-[1440px] px-10",                     // .container (base, no section-container override)
  section: "max-w-[1216px] px-10",                   // .container.section-container
  footer: "max-w-[1216px] px-10",                    // .container.footer-container
}

export function ForeplaySectionContainer({
  children,
  variant = "section",
  as: Tag = "div",
  className,
}: ForeplaySectionContainerProps) {
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
