// Foreplay code chip — `.pricing-prodcut-link` pattern (mono pill).
// Used for: 2FA secrets, IDs, tokens, anything code-like inside a result card.
// Bg: white pill on solid-25 card. Ring: 1px inset solid-50. Text: labelS + font-mono.
// Spec: see docs/foreplay/tool-design-language.md → Composition primitives.

import { cn } from "@/lib/utils"
import { siteText } from "@/components/atoms/typography"

interface CodeChipProps {
  text: string
  /** Max-width before truncation. Default 220px */
  maxWidth?: string
  className?: string
}

export function CodeChip({ text, maxWidth = "220px", className }: CodeChipProps) {
  return (
    <span
      style={{ maxWidth }}
      className={cn(
        siteText.labelS,
        "inline-block min-w-0 truncate rounded-[6px] bg-white px-2.5 py-1 font-mono tracking-[0.02em] text-[var(--solid-500)]",
        "shadow-[inset_0_0_0_1px_var(--solid-50)]",
        "transition-colors duration-200",
        "group-hover:text-[var(--solid-700)]",
        className,
      )}
    >
      {text}
    </span>
  )
}
