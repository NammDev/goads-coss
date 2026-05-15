"use client"

import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getFlatDocs } from "@/data/docs-navigation"

const flatDocs = getFlatDocs()

export function DocsArticleNav({ currentSlug }: { currentSlug: string }) {
  const idx = flatDocs.findIndex((d) => d.slug === currentSlug)
  if (idx === -1) return null

  const prev = idx > 0 ? flatDocs[idx - 1] : null
  const next = idx < flatDocs.length - 1 ? flatDocs[idx + 1] : null

  // Foreplay docs nav pattern (verified from user screenshot):
  //   ┌──────────────────────────┐   ┌──────────────────────────┐
  //   │ [<] Previous             │   │             Next [>]     │
  //   │ Getting started          │   │             Filtering    │
  //   └──────────────────────────┘   └──────────────────────────┘
  //
  // Key:
  // - Card is `flex flex-col` with `items-start` (Previous) or `items-end` (Next)
  //   — Foreplay's `align-items: flex-end` on Next pushes both rows to right edge.
  // - Chevron sits INLINE with the label row (same line as "Previous" / "Next"),
  //   NOT at the outer corner of the card. Title is on the row below.
  // - `h-full` keeps card heights matched even when one title wraps.
  const linkBase =
    "group flex h-full flex-col gap-1 rounded-lg border border-border bg-card/30 p-4 transition-colors hover:bg-muted/50"
  const labelRowClass = "flex items-center gap-1 text-xs text-muted-foreground"
  const titleClass = "text-sm font-medium text-foreground group-hover:text-primary"
  const chevronClass = "size-3.5 shrink-0"

  return (
    <nav className="mt-12 grid grid-cols-2 gap-4 border-t border-border pt-6">
      {prev ? (
        <Link href={`/docs/${prev.slug}`} className={`${linkBase} items-start text-left`}>
          <div className={labelRowClass}>
            <ChevronLeft className={chevronClass} />
            <span>Previous</span>
          </div>
          <p className={titleClass}>{prev.title}</p>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link href={`/docs/${next.slug}`} className={`${linkBase} items-end text-right`}>
          <div className={labelRowClass}>
            <span>Next</span>
            <ChevronRight className={chevronClass} />
          </div>
          <p className={titleClass}>{next.title}</p>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  )
}
