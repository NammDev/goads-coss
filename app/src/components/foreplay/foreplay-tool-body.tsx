// Foreplay tool body — wraps tool content in ForeplaySectionWhiteBlock + standard padding.
// Standard inner: p-8 desktop / p-5 mobile, flex-col gap-6 (24px) between sub-sections.
// Spec: see docs/foreplay/tool-design-language.md → Spacing rhythm.

import type { ReactNode } from "react"

import { cn } from "@/lib/utils"
import { ForeplaySectionWhiteBlock } from "@/components/foreplay/foreplay-section-white-block"

interface ForeplayToolBodyProps {
  children: ReactNode
  /** Override the default inner gap (24px) */
  gap?: string
  className?: string
}

export function ForeplayToolBody({ children, gap, className }: ForeplayToolBodyProps) {
  return (
    <ForeplaySectionWhiteBlock>
      <div className={cn("flex flex-col p-8 max-md:p-5", gap ?? "gap-6", className)}>
        {children}
      </div>
    </ForeplaySectionWhiteBlock>
  )
}
