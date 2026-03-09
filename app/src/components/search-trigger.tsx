"use client"

import { Search } from "lucide-react"

/** Search button that dispatches Cmd+K to open CommandMenu */
export function SearchTrigger() {
  return (
    <button
      type="button"
      aria-label="Search"
      className="inline-flex h-9 w-9 items-center justify-center gap-2 rounded-lg border border-border bg-background text-muted-foreground shadow-xs transition-colors hover:bg-primary/15 hover:text-foreground focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none cursor-pointer sm:w-40 sm:justify-start sm:px-3 dark:border-input dark:bg-input/30 dark:hover:bg-primary/15"
      onClick={() => {
        document.dispatchEvent(
          new KeyboardEvent("keydown", { key: "k", metaKey: true }),
        )
      }}
    >
      <Search className="size-4 shrink-0" />
      <span className="hidden flex-1 text-left text-sm sm:block">Search...</span>
      <kbd className="pointer-events-none hidden h-5 select-none items-center gap-0.5 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:flex">
        <span className="text-xs">⌘</span>K
      </kbd>
    </button>
  )
}
