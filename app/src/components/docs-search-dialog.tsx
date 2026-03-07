"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { FileText } from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { docsTabs, getFlatDocs } from "@/data/docs-navigation"

const flatDocs = getFlatDocs()

export function DocsSearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const router = useRouter()

  // Cmd+K shortcut
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(!open)
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [open, onOpenChange])

  function handleSelect(slug: string) {
    router.push(`/docs/${slug}`)
    onOpenChange(false)
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search documentation..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {docsTabs.map((tab) => {
          const tabDocs = flatDocs.filter((d) => d.tabSlug === tab.slug)
          if (tabDocs.length === 0) return null
          return (
            <CommandGroup key={tab.slug} heading={tab.title}>
              {tabDocs.map((doc) => (
                <CommandItem
                  key={doc.slug}
                  value={`${doc.title} ${doc.tabTitle}`}
                  onSelect={() => handleSelect(doc.slug)}
                  className="cursor-pointer"
                >
                  <FileText className="mr-2 size-4 shrink-0 text-muted-foreground" />
                  {doc.title}
                </CommandItem>
              ))}
            </CommandGroup>
          )
        })}
      </CommandList>
    </CommandDialog>
  )
}
