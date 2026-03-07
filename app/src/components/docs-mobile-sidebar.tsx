"use client"

import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { docsTabs, type DocsNavItem } from "@/data/docs-navigation"
import { useState } from "react"

function MobileNavItem({
  item,
  basePath,
  pathname,
  onNavigate,
}: {
  item: DocsNavItem
  basePath: string
  pathname: string
  onNavigate: () => void
}) {
  const fullPath = `${basePath}/${item.slug}`
  const isActive = pathname === fullPath
  const isParentActive = pathname.startsWith(fullPath + "/")

  if (item.items) {
    return (
      <Collapsible defaultOpen={isParentActive || isActive}>
        <CollapsibleTrigger className="group flex w-full items-center gap-1 rounded-md px-2 py-1.5 text-sm font-medium text-foreground">
          <ChevronRight className="size-3.5 shrink-0 transition-transform group-data-[state=open]:rotate-90" />
          {item.title}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="ml-3 border-l border-border pl-2">
            {item.items.map((child) => (
              <MobileNavItem
                key={child.slug}
                item={child}
                basePath={fullPath}
                pathname={pathname}
                onNavigate={onNavigate}
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
      onClick={onNavigate}
      className={`block rounded-md px-2 py-1.5 text-sm transition-colors ${
        isActive
          ? "bg-primary/10 font-medium text-primary"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {item.title}
    </Link>
  )
}

export function DocsMobileSidebar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const activeTab = docsTabs.find((t) =>
    pathname.startsWith(`/docs/${t.slug}`)
  ) ?? docsTabs[0]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="size-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] p-0">
        <SheetHeader className="border-b px-4 py-3">
          <SheetTitle className="text-sm">Documentation</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100svh-theme(spacing.14))]">
          <nav className="space-y-1 p-4">
            {activeTab.items.map((item) => (
              <MobileNavItem
                key={item.slug}
                item={item}
                basePath={`/docs/${activeTab.slug}`}
                pathname={pathname}
                onNavigate={() => setOpen(false)}
              />
            ))}
          </nav>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
