"use client"

import { Search, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DocsTopBar({
  onSearchOpen,
  onAiToggle,
}: {
  onSearchOpen: () => void
  onAiToggle: () => void
}) {
  return (
    <div className="border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="container flex h-12 items-center justify-between gap-4">
        {/* Search trigger */}
        <button
          type="button"
          onClick={onSearchOpen}
          className="flex h-8 w-full max-w-sm items-center gap-2 rounded-md border border-input bg-muted/40 px-3 text-sm text-muted-foreground transition-colors hover:bg-muted"
        >
          <Search className="size-4 shrink-0" />
          <span className="flex-1 text-left">Search docs...</span>
          <kbd className="pointer-events-none hidden select-none rounded border bg-background px-1.5 font-mono text-xs text-muted-foreground sm:inline-block">
            Cmd+K
          </kbd>
        </button>

        {/* Ask AI button */}
        <Button
          variant="outline"
          size="sm"
          onClick={onAiToggle}
          className="shrink-0 gap-1.5"
        >
          <Sparkles className="size-3.5" />
          <span className="hidden sm:inline">Ask AI</span>
        </Button>
      </div>
    </div>
  )
}
