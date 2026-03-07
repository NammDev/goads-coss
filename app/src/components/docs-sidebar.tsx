"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ScrollArea } from "@/components/ui/scroll-area"
import { docsTabs, type DocsNavItem } from "@/data/docs-navigation"

function NavItem({
  item,
  basePath,
  pathname,
}: {
  item: DocsNavItem
  basePath: string
  pathname: string
}) {
  const fullPath = `${basePath}/${item.slug}`
  const isActive = pathname === fullPath
  const isParentActive = pathname.startsWith(fullPath + "/")

  if (item.items) {
    return (
      <Collapsible defaultOpen={isParentActive || isActive}>
        <CollapsibleTrigger className="group flex w-full items-center gap-1 rounded-md px-2 py-1.5 text-sm font-medium text-foreground hover:bg-muted/60">
          <ChevronRight className="size-3.5 shrink-0 transition-transform group-data-[state=open]:rotate-90" />
          {item.title}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="ml-3 border-l border-border pl-2">
            {item.items.map((child) => (
              <NavItem
                key={child.slug}
                item={child}
                basePath={fullPath}
                pathname={pathname}
              />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    )
  }

  return (
    <Link
      href={fullPath}
      className={`block rounded-md px-2 py-1.5 text-sm transition-colors ${
        isActive
          ? "bg-primary/10 font-medium text-primary"
          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
      }`}
    >
      {item.title}
    </Link>
  )
}

export function DocsSidebar() {
  const pathname = usePathname()
  const activeTab = docsTabs.find((t) =>
    pathname.startsWith(`/docs/${t.slug}`)
  ) ?? docsTabs[0]

  return (
    <aside className="hidden w-[260px] shrink-0 border-r border-border lg:block">
      <ScrollArea className="h-[calc(100svh-theme(spacing.16)-theme(spacing.12)-theme(spacing.11))]">
        <nav className="space-y-1 p-4" aria-label="Docs sidebar">
          {activeTab.items.map((item) => (
            <NavItem
              key={item.slug}
              item={item}
              basePath={`/docs/${activeTab.slug}`}
              pathname={pathname}
            />
          ))}
        </nav>
      </ScrollArea>
    </aside>
  )
}
