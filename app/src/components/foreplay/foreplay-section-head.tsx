// Foreplay section header — .section-head (REUSABLE across all sections)
// DOM: .section-head > .section-head_subtitle + .section-head_title + .section-head_paragraph
// .section-head: flex col, gap-3 (12px), text-center, items-center, max-w-[720px], mx-auto
// .section-head.is-large: z-2, max-w-[960px], relative
// .section-head_title: text-wrap balance
// .section-head_paragraph: text-wrap pretty, max-w-[512px]
// .section-head_paragraph.is-large: text-wrap balance, max-w-[640px], color neutral-300
// NOTE: .section-head-wrapper exists in some pages but is redundant (same CSS as parent)
// IMPORTANT: Visual size (text-display-h1/h2/h3) is INDEPENDENT of HTML tag (h1/h2/h3)

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { fpText } from "@/components/foreplay/foreplay-typography"

// Visual heading size — maps to fpText.displayH* constants
// DECOUPLED from HTML tag — Foreplay uses <h2 class="text-display-h3"> etc.
const displaySizes = {
  h1: fpText.displayH1,
  h2: fpText.displayH2,
  h3: fpText.displayH3,
}

// Description text sizes
const descSizes = {
  m: fpText.bodyM,
  l: fpText.bodyL,
}

interface ForeplaySectionHeadProps {
  subtitle?: string       // .section-head_subtitle — overline text
  title: ReactNode
  titleTag?: "h1" | "h2" | "h3"  // HTML semantic tag
  titleSize?: "h1" | "h2" | "h3" // Visual size (text-display-h1/h2/h3) — independent of tag!
  description?: ReactNode
  descSize?: "m" | "l"    // text-body-m (default) or text-body-l
  variant?: "dark" | "light" // dark = white bg (dark text), light = dark bg (white text)
  size?: "default" | "large" // large: .is-large max-w-[960px], paragraph max-w-[640px]
  className?: string
}

export function ForeplaySectionHead({
  subtitle,
  title,
  titleTag: Tag = "h2",
  titleSize = "h3",
  description,
  descSize = "m",
  variant = "light",
  size = "default",
  className,
}: ForeplaySectionHeadProps) {
  return (
    <div
      className={cn(
        // .section-head: flex col, gap-3, text-center, items-center
        "mx-auto flex w-full flex-col items-center gap-3 text-center",
        size === "large" ? "relative z-[2] max-w-[960px]" : "max-w-[720px]",
        className,
      )}
    >
      {/* .section-head_subtitle (optional overline) */}
      {subtitle && (
        <div className={variant === "dark" ? "text-[var(--fp-solid-400)]" : "text-[var(--fp-alpha-300)]"}>
          <div className={fpText.overline}>
            {subtitle}
          </div>
        </div>
      )}

      {/* .section-head_title */}
      <div
        className={cn(
          "[text-wrap:balance]",
          variant === "dark" ? "text-[var(--fp-solid-700)]" : "text-foreground",
        )}
      >
        <Tag className={displaySizes[titleSize]}>
          {title}
        </Tag>
      </div>

      {/* .section-head_paragraph — .is-large overrides text-wrap + color + max-width */}
      {description && (
        <div
          className={cn(
            size === "large"
              ? "[text-wrap:balance] max-w-[640px]"   // .section-head_paragraph.is-large
              : "[text-wrap:pretty] max-w-[512px]",   // .section-head_paragraph
          )}
        >
          {/* .text-alpha-100 on INNER div overrides parent .is-large color */}
          <div className={variant === "dark" ? "text-[var(--fp-solid-600)]" : "text-[var(--fp-alpha-100)]"}>
            <p className={descSizes[descSize]}>
              {description}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
