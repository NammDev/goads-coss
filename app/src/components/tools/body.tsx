// Foreplay tool body — wraps tool content in SectionWhiteBlock + standard padding.
// Standard inner: p-8 desktop / p-5 mobile, flex-col gap-6 (24px) between sub-sections.
// Spec: see docs/foreplay/tool-design-language.md → Spacing rhythm.

import type { ReactNode } from "react"

import { cn } from "@/lib/utils"
import { SectionWhiteBlock } from "@/components/atoms/section-white-block"

interface ToolBodyProps {
  children: ReactNode
  /** Override the default inner gap (24px) */
  gap?: string
  className?: string
}

export function ToolBody({ children, gap, className }: ToolBodyProps) {
  return (
    <SectionWhiteBlock>
      <div className={cn("flex flex-col p-8 max-md:p-5", gap ?? "gap-6", className)}>
        {children}
      </div>
    </SectionWhiteBlock>
  )
}
