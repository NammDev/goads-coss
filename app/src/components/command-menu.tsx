"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Circle } from "lucide-react"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  SEARCH_INDEX,
  SEARCH_CATEGORIES,
  type SearchItem,
} from "@/data/search-index"
import { search as flexSearch } from "@/lib/flexsearch-engine"

/** Top suggestions shown when dialog opens with no search input */
const SUGGESTIONS: SearchItem[] = SEARCH_INDEX.filter((i) =>
  ["p-home", "p-bm", "p-tools", "p-blog", "p-docs", "p-sales"].includes(i.id),
)

/** Only "pages" and "tools" categories keep their specific icons */
const ICON_CATEGORIES = new Set(["pages", "tools"])

export function CommandMenu() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchItem[]>([])
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const router = useRouter()

  // Cmd+K shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  // Reset state when dialog closes
  useEffect(() => {
    if (!open) {
      setQuery("")
      setResults([])
    }
  }, [open])

  // Debounced flexsearch
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (!query.trim()) {
      setResults([])
      return
    }
    debounceRef.current = setTimeout(() => {
      setResults(flexSearch(query, 30))
    }, 150)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query])

  const handleSelect = (href: string) => {
    setOpen(false)
    router.push(href)
  }

  const showSuggestions = !query.trim()

  // Group flexsearch results by category
  const grouped = results.reduce<Record<string, SearchItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {})

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogHeader className="sr-only">
        <DialogTitle>Command Palette</DialogTitle>
        <DialogDescription>Search for a command to run...</DialogDescription>
      </DialogHeader>
      <DialogContent className="overflow-hidden p-0" showCloseButton={false}>
        <Command
          shouldFilter={false}
          className="**:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5"
        >
          <CommandInput
            placeholder="Type a command or search..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            {showSuggestions ? (
              <CommandGroup heading="Suggestions">
                {SUGGESTIONS.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.id}
                    onSelect={() => handleSelect(item.href)}
                    className="cursor-pointer"
                  >
                    <item.icon className="mr-2 size-4 shrink-0" />
                    <span>{item.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : (
              Object.entries(SEARCH_CATEGORIES).map(([key, { label }]) => {
                const items = grouped[key]
                if (!items?.length) return null
                return (
                  <CommandGroup key={key} heading={label}>
                    {items.map((item) => {
                      const Icon = ICON_CATEGORIES.has(item.category)
                        ? item.icon
                        : Circle
                      return (
                        <CommandItem
                          key={item.id}
                          value={item.id}
                          onSelect={() => handleSelect(item.href)}
                          className="cursor-pointer flex-col items-start gap-0.5"
                        >
                          <div className="flex w-full items-center gap-2">
                            <Icon className="size-4 shrink-0" />
                            <span>{item.title}</span>
                          </div>
                          {item.description && (
                            <p className="ml-6 line-clamp-1 text-xs text-muted-foreground">
                              {item.description}
                            </p>
                          )}
                        </CommandItem>
                      )
                    })}
                  </CommandGroup>
                )
              })
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  )
}
