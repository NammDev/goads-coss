// Help mobile sidebar — clone of docs-mobile-sidebar.tsx adapted to helpTabs/base path.

"use client"

import { usePathname } from "next/navigation"
import { FileText, Menu, type LucideIcon } from "lucide-react"
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
import { helpTabs, flattenLeafItems } from "@/data/help-navigation"
import { useState } from "react"

/** Mobile article row — same 1-level flat pattern as the desktop sidebar. */
function MobileArticleLink({
  href,
  title,
  icon: Icon = FileText,
  isActive,
  onNavigate,
}: {
  href: string
  title: string
  icon?: LucideIcon
  isActive: boolean
  onNavigate: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`flex h-8 items-center rounded-lg px-2 py-1.5 transition-colors ${
        isActive ? "bg-accent/10 hover:bg-accent/[15%]" : "hover:bg-secondary/60"
      }`}
    >
      <div
        className={`grid size-full grid-cols-[20px_1fr] items-center gap-x-1.5 truncate text-[13px] font-medium ${
          isActive ? "text-accent-foreground" : "text-foreground/80"
        }`}
      >
        <div className="grid size-full place-items-center opacity-60">
          <Icon className="size-4 shrink-0" />
        </div>
        <span className="truncate">{title}</span>
      </div>
    </Link>
  )
}

export function HelpMobileSidebar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const activeTab =
    helpTabs.find((t) => pathname.startsWith(`/help/${t.slug}`)) ??
    helpTabs[0]
  const articles = flattenLeafItems(
    activeTab.items,
    `/help/${activeTab.slug}`,
  )

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
          <SheetTitle className="text-sm">{activeTab.title}</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100svh-theme(spacing.14))]">
          <nav className="space-y-1 p-4">
            {articles.map((leaf) => (
              <MobileArticleLink
                key={leaf.href}
                href={leaf.href}
                title={leaf.title}
                icon={leaf.icon}
                isActive={pathname === leaf.href}
                onNavigate={() => setOpen(false)}
              />
            ))}
          </nav>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
