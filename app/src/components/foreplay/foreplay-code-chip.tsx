// Foreplay code chip — `.pricing-prodcut-link` pattern (mono pill).
// Used for: 2FA secrets, IDs, tokens, anything code-like inside a result card.
// Bg: white pill on solid-25 card. Ring: 1px inset solid-50. Text: labelS + font-mono.
// Spec: see docs/foreplay/tool-design-language.md → Composition primitives.

import { cn } from "@/lib/utils"
import { fpText } from "@/components/foreplay/foreplay-typography"

interface ForeplayCodeChipProps {
  text: string
  /** Max-width before truncation. Default 220px */
  maxWidth?: string
  className?: string
}

export function ForeplayCodeChip({ text, maxWidth = "220px", className }: ForeplayCodeChipProps) {
  return (
    <span
      style={{ maxWidth }}
      className={cn(
        fpText.labelS,
        "inline-block min-w-0 truncate rounded-[6px] bg-white px-2.5 py-1 font-mono tracking-[0.02em] text-[var(--fp-solid-500)]",
        "shadow-[inset_0_0_0_1px_var(--fp-solid-50)]",
        "transition-colors duration-200",
        "group-hover:text-[var(--fp-solid-700)]",
        className,
      )}
    >
      {text}
    </span>
  )
}
