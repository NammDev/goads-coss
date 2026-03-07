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

  return (
    <nav className="mt-12 grid grid-cols-2 gap-4 border-t border-border pt-6">
      {prev ? (
        <Link
          href={`/docs/${prev.slug}`}
          className="group flex items-center gap-2 rounded-lg border p-4 transition-colors hover:bg-muted/50"
        >
          <ChevronLeft className="size-4 shrink-0 text-muted-foreground" />
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Previous</p>
            <p className="text-sm font-medium group-hover:text-primary">
              {prev.title}
            </p>
          </div>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/docs/${next.slug}`}
          className="group flex items-center justify-end gap-2 rounded-lg border p-4 transition-colors hover:bg-muted/50"
        >
          <div className="text-left">
            <p className="text-xs text-muted-foreground">Next</p>
            <p className="text-sm font-medium group-hover:text-primary">
              {next.title}
            </p>
          </div>
          <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
        </Link>
      ) : (
        <div />
      )}
    </nav>
  )
}
