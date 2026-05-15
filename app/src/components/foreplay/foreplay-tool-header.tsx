// Foreplay tool header — icon (size-12 bordered) + title (display-h4 + FP_HERO_GRADIENT).
// Lives in DARK scope, above ForeplayToolBody (white block).
// Spec: see docs/foreplay/tool-design-language.md → Typography scale.

import type { ReactNode } from "react"

import { cn } from "@/lib/utils"
import { fpText, FP_HERO_GRADIENT } from "@/components/foreplay/foreplay-typography"

interface ForeplayToolHeaderProps {
  icon: ReactNode      // 28x28 SVG, stroke currentColor (inherits text-foreground)
  title: string
  /** Disable the radial gradient on the title (default true = on) */
  plain?: boolean
  className?: string
}

export function ForeplayToolHeader({
  icon,
  title,
  plain = false,
  className,
}: ForeplayToolHeaderProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      {/* Icon container — 48x48 rounded-[12px], border #ffffff29 (foreplay neutral-600 ring) */}
      <div className="flex size-12 items-center justify-center rounded-[12px] border border-[#ffffff29] text-foreground">
        {icon}
      </div>

      <h1
        className={cn(
          fpText.displayH4,
          plain ? "text-foreground" : FP_HERO_GRADIENT,
        )}
      >
        {title}
      </h1>
    </div>
  )
}
