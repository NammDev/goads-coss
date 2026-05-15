// Foreplay-themed tools sidebar — clones structure from app/src/components/tools-sidebar.tsx
// but restyled with foreplay tokens (dark theme on .foreplay scope).
// Links point at /foreplay/tools/{slug}.
//
// Tokens:
//   active link:  bg-[var(--fp-alpha-700)] text-foreground (10% white pill + full white)
//   idle link:    text-[var(--fp-alpha-200)] (44% white)
//                 hover bg-[var(--fp-alpha-700)] hover:text-foreground
//   category:     fpText.overline + text-[var(--fp-alpha-300)] (36% white)

"use client"

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
import { fpText } from "@/components/foreplay/foreplay-typography"

function ToolLink({ tool, isActive }: { tool: ToolItem; isActive: boolean }) {
  const Icon = tool.icon
  return (
    <Link
      href={`/foreplay/tools/${tool.slug}`}
      className={cn(
        fpText.labelS,
        "flex items-center gap-2.5 rounded-[10px] px-3 py-2 transition-colors",
        isActive
          ? "bg-[var(--fp-alpha-700)] text-foreground"
          : "text-[var(--fp-alpha-200)] hover:bg-[var(--fp-alpha-700)] hover:text-foreground",
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
                fpText.overline,
                "flex w-full items-center justify-between rounded-[8px] px-3 py-2 text-[var(--fp-alpha-300)] transition-colors hover:text-foreground",
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
                  isActive={pathname === `/foreplay/tools/${tool.slug}`}
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
export function ForeplayToolsSidebar() {
  return (
    <aside className="hidden w-60 shrink-0 lg:block">
      <div className="sticky top-28 max-h-[calc(100svh-8rem)] overflow-y-auto pr-4">
        <SidebarNav />
      </div>
    </aside>
  )
}

// Mobile trigger + drawer
export function ForeplayToolsSidebarMobile() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          className={cn(
            fpText.labelS,
            "flex items-center gap-2 rounded-[10px] border border-[#ffffff29] px-3 py-2 text-foreground transition-colors hover:bg-[var(--fp-alpha-700)] lg:hidden",
          )}
        >
          <PanelLeft className="size-4" />
          <span>Tools</span>
        </button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-64 border-r border-[#ffffff29] bg-background p-4 pt-8 text-muted-foreground"
      >
        <SidebarNav />
      </SheetContent>
    </Sheet>
  )
}
