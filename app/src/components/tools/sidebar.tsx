// Foreplay-themed tools sidebar — clones structure from app/src/components/tools-sidebar.tsx
// but restyled with foreplay tokens (dark theme on .goads scope).
// Links point at /tools/{slug}.
//
// Tokens:
//   active link:  bg-[var(--alpha-700)] text-foreground (10% white pill + full white)
//   idle link:    text-[var(--alpha-200)] (44% white)
//                 hover bg-[var(--alpha-700)] hover:text-foreground
//   category:     siteText.overline + text-[var(--alpha-300)] (36% white)

"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, PanelLeft } from "lucide-react"

import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  TOOL_CATEGORIES,
  getToolsByCategory,
  type ToolItem,
} from "@/data/tools-registry"
import { siteText } from "@/components/atoms/typography"

function ToolLink({ tool, isActive }: { tool: ToolItem; isActive: boolean }) {
  const Icon = tool.icon
  return (
    <Link
      href={tool.href ?? `/tools/${tool.slug}`}
      className={cn(
        siteText.labelS,
        "flex items-center gap-2.5 rounded-[10px] px-3 py-2 transition-colors",
        isActive
          ? "bg-[var(--alpha-700)] text-foreground"
          : "text-[var(--alpha-200)] hover:bg-[var(--alpha-700)] hover:text-foreground",
      )}
    >
      <Icon className="size-4 shrink-0" />
      <span className="truncate">{tool.title}</span>
    </Link>
  )
}

function SidebarNav() {
  const pathname = usePathname()
  return (
    <nav className="space-y-1">
      {TOOL_CATEGORIES.map((category) => {
        const tools = getToolsByCategory(category.id)
        return (
          <Collapsible key={category.id} defaultOpen>
            <CollapsibleTrigger
              className={cn(
                siteText.overline,
                "flex w-full items-center justify-between rounded-[8px] px-3 py-2 text-[var(--alpha-300)] transition-colors hover:text-foreground",
              )}
            >
              <span>{category.label}</span>
              <ChevronDown className="size-3.5 transition-transform [[data-state=closed]_&]:rotate-[-90deg]" />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-0.5 pt-1 pb-3 pl-1">
              {tools.map((tool) => (
                <ToolLink
                  key={tool.slug}
                  tool={tool}
                  isActive={pathname === `/tools/${tool.slug}`}
                />
              ))}
            </CollapsibleContent>
          </Collapsible>
        )
      })}
    </nav>
  )
}

// Desktop sidebar — sticky under foreplay header (header height ~88px, +24px gap → top-28)
export function ToolsSidebar() {
  return (
    <aside className="hidden w-60 shrink-0 lg:block">
      <div className="sticky top-28 max-h-[calc(100svh-8rem)] overflow-y-auto pr-4">
        <SidebarNav />
      </div>
    </aside>
  )
}

// Mobile trigger + drawer.
// Controlled open state so the drawer auto-closes on navigation — clicking a
// tool Link changes the route client-side without unmounting the Sheet, so an
// uncontrolled Sheet would stay open. Close on every pathname change.
export function ToolsSidebarMobile() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className={cn(
            siteText.labelS,
            "flex items-center gap-2 rounded-[10px] border border-[#ffffff29] px-3 py-2 text-foreground transition-colors hover:bg-[var(--alpha-700)] lg:hidden",
          )}
        >
          <PanelLeft className="size-4" />
          <span>Tools</span>
        </button>
      </SheetTrigger>
      {/* `site` class re-applies Foreplay dark-theme tokens INSIDE the Radix
          portal. SheetContent renders to document.body — outside the .site
          wrapper — so without this, --background/--alpha-* fall back to :root
          (white in light-mode OS, black in dark-mode OS), making the drawer
          render white on light-mode phones. Scoping `site` here pins it dark. */}
      {/* pt-20 (80px) clears the sticky header (h-[72px], z-100) which renders
          ABOVE this drawer (z-50) and would otherwise swallow the first category
          label + items. overflow-y-auto so the full list stays reachable. The
          default top-right X sits under the header (hidden) and is redundant —
          tap the overlay / Esc / pick a tool to close — so it's turned off. */}
      <SheetContent
        side="left"
        showCloseButton={false}
        className="site w-64 overflow-y-auto border-r border-[#ffffff29] bg-background p-4 pt-20 text-muted-foreground"
      >
        <SidebarNav />
      </SheetContent>
    </Sheet>
  )
}
