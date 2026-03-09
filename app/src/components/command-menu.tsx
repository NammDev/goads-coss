"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Circle } from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  SEARCH_INDEX,
  SEARCH_CATEGORIES,
  type SearchItem,
} from "@/data/search-index"

/** Top suggestions shown when dialog opens with no search input */
const SUGGESTIONS: SearchItem[] = SEARCH_INDEX.filter((i) =>
  ["p-home", "p-bm", "p-tools", "p-blog", "p-docs", "p-sales"].includes(i.id),
)

/** Only "pages" and "tools" categories keep their specific icons */
const ICON_CATEGORIES = new Set(["pages", "tools"])

export function CommandMenu() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const router = useRouter()

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

  // Group items by category (static — SEARCH_INDEX is a module constant)
  const grouped = useMemo(() => {
    const groups: Record<string, SearchItem[]> = {}
    for (const item of SEARCH_INDEX) {
      if (!groups[item.category]) groups[item.category] = []
      groups[item.category].push(item)
    }
    return groups
  }, [])

  const handleSelect = (href: string) => {
    setOpen(false)
    router.push(href)
  }

  const showSuggestions = !search.trim()

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder="Type a command or search..."
        value={search}
        onValueChange={setSearch}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {showSuggestions ? (
          <CommandGroup heading="Suggestions">
            {SUGGESTIONS.map((item) => (
              <CommandItem
                key={item.id}
                value={item.keywords}
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
                      value={item.keywords}
                      onSelect={() => handleSelect(item.href)}
                      className="cursor-pointer"
                    >
                      <Icon className="mr-2 size-4 shrink-0" />
                      <span>{item.title}</span>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            )
          })
        )}
      </CommandList>
    </CommandDialog>
  )
}
