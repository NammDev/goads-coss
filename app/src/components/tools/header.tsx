// Foreplay tool header — icon (size-12 bordered) + title (display-h4 + SITE_HERO_GRADIENT).
// Lives in DARK scope, above ToolBody (white block).
// Spec: see docs/foreplay/tool-design-language.md → Typography scale.

import type { ReactNode } from "react"

import { cn } from "@/lib/utils"
import { siteText, SITE_HERO_GRADIENT } from "@/components/atoms/typography"

interface ToolHeaderProps {
  icon: ReactNode      // 28x28 SVG, stroke currentColor (inherits text-foreground)
  title: string
  /** Disable the radial gradient on the title (default true = on) */
  plain?: boolean
  className?: string
}

export function ToolHeader({
  icon,
  title,
  plain = false,
  className,
}: ToolHeaderProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      {/* Icon container — 48x48 rounded-[12px], border #ffffff29 (foreplay neutral-600 ring) */}
      <div className="flex size-12 items-center justify-center rounded-[12px] border border-[#ffffff29] text-foreground">
        {icon}
      </div>

      <h1
        className={cn(
          siteText.displayH4,
          plain ? "text-foreground" : SITE_HERO_GRADIENT,
        )}
      >
        {title}
      </h1>
    </div>
  )
}
