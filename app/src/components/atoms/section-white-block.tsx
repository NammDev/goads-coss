// Foreplay white block wrapper — .section-padding + .section-white-block (REUSABLE)
// DOM: .section-padding > .section-white-block > children
// .section-padding: p-2 (8px)
// .section-white-block: bg white (neutral-0), color solid-700 (#171920), rounded-[36px], z-2, relative, overflow-hidden

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionWhiteBlockProps {
  children: ReactNode
  className?: string
}

export function SectionWhiteBlock({
  children,
  className,
}: SectionWhiteBlockProps) {
  return (
    <div className="p-2">
      <div
        className={cn(
          // .section-white-block
          "relative z-[2] overflow-hidden rounded-[36px]",
          // Signature Foreplay white block — ALWAYS white, even on the dark
          // .goads scope (no dark: override; that broke ~13 marketing pages).
          "bg-white text-[var(--solid-700)]",
          className,
        )}
      >
        {children}
      </div>
    </div>
  )
}
