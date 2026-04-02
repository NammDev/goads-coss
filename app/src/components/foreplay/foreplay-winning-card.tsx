// Foreplay winning card — .home-winning-card
// DOM: .home-winning-card > .home-winning-card-text + (image/video placeholder)
// .home-winning-card: flex col, gap-6 (24px via grid-row-gap), rounded-3xl (24px), p-6, relative, overflow-hidden
//   box-shadow: 0 0 0 1px solid-50 (#e9eaef) — 1px border ring
//   .is-dark: bg background (#020308)
// .home-winning-card-text: z-10, pointer-events-none, text-left, relative
// .flex-col-gap-1: flex col, gap-1 (4px via grid-row-gap), items-start
// .text-label-l: Inter, 1.125rem, font-medium (500), tracking-[-0.0144em]

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { fpText } from "@/components/foreplay/foreplay-typography"

interface ForeplayWinningCardProps {
  label: string
  description: string
  isDark?: boolean
  children?: ReactNode // image/video placeholder slot
  className?: string
}

export function ForeplayWinningCard({
  label,
  description,
  isDark = false,
  children,
  className,
}: ForeplayWinningCardProps) {
  return (
    <div
      className={cn(
        // .home-winning-card
        "relative flex flex-col gap-6 overflow-hidden rounded-3xl p-6",
        // border ring: box-shadow 0 0 0 1px solid-50
        isDark
          ? "bg-background"
          : "shadow-[0_0_0_1px_var(--fp-solid-50)]",
        className,
      )}
    >
      {/* .home-winning-card-text */}
      <div className="pointer-events-none relative z-10 text-left">
        {/* .flex-col-gap-1.align-start */}
        <div className="flex flex-col items-start gap-1">
          {/* label: .text-label-l */}
          <div className={isDark ? "text-foreground" : "text-[var(--fp-solid-900)]"}>
            <div className={fpText.labelL}>
              {label}
            </div>
          </div>
          {/* description */}
          <div className={isDark ? "text-[var(--fp-alpha-100)]" : "text-[var(--fp-solid-500)]"}>
            <div className="[text-wrap:pretty]">{description}</div>
          </div>
        </div>
      </div>

      {/* Image/video slot — user provides content */}
      {children}
    </div>
  )
}
