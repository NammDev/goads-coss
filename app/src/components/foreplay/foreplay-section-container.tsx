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
  variant?: "section" | "footer" | "navbar"
  as?: "div" | "section" | "footer"
  className?: string
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
        // .container base
        "mx-auto w-full",
        variant === "navbar"
          ? "max-w-[1440px] px-2 relative z-[5]"   // .container.navbar-container
          : "max-w-[1216px] px-10",                  // .container.section-container / .container.footer-container
        className,
      )}
    >
      {children}
    </Tag>
  )
}
