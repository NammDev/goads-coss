"use client"

import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"

/** Search button that dispatches Cmd+K to open CommandMenu */
export function SearchTrigger() {
  return (
    <Button
      variant="outline"
      size="sm"
      aria-label="Search"
      className="relative h-9 w-9 px-0 sm:w-auto sm:px-3 sm:pr-12 hover:bg-primary/15 hover:text-foreground dark:hover:bg-primary/15"
      onClick={() => {
        document.dispatchEvent(
          new KeyboardEvent("keydown", { key: "k", metaKey: true }),
        )
      }}
    >
      <Search className="size-4 sm:mr-2" />
      <span className="hidden text-sm text-muted-foreground sm:inline-flex">
        Search...
      </span>
      <kbd className="pointer-events-none absolute right-1.5 hidden h-5 select-none items-center gap-0.5 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:flex">
        <span className="text-xs">⌘</span>K
      </kbd>
    </Button>
  )
}
