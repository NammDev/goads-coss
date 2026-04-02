// Foreplay white block wrapper — .section-padding + .section-white-block (REUSABLE)
// DOM: .section-padding > .section-white-block > children
// .section-padding: p-2 (8px)
// .section-white-block: bg white (neutral-0), color solid-700 (#171920), rounded-[36px], z-2, relative, overflow-hidden

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ForeplaySectionWhiteBlockProps {
  children: ReactNode
  className?: string
}

export function ForeplaySectionWhiteBlock({
  children,
  className,
}: ForeplaySectionWhiteBlockProps) {
  return (
    <div className="p-2">
      <div
        className={cn(
          // .section-white-block
          "relative z-[2] overflow-hidden rounded-[36px]",
          "bg-white text-[var(--fp-solid-700)]",
          className,
        )}
      >
        {children}
      </div>
    </div>
  )
}
