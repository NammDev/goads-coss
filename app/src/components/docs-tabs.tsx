"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { docsTabs } from "@/data/docs-navigation"

export function DocsTabs({ onAiToggle }: { onAiToggle?: () => void }) {
  const pathname = usePathname()
  const activeTab = docsTabs.find((t) =>
    pathname.startsWith(`/docs/${t.slug}`)
  )

  return (
    <div className="border-b border-border">
      <div className="container flex items-center justify-between">
        <nav className="flex gap-0 overflow-x-auto" aria-label="Docs tabs">
          {docsTabs.map((tab) => {
            const isActive = activeTab?.slug === tab.slug ||
              (!activeTab && pathname === "/docs" && tab.slug === "getting-started")
            const Icon = tab.icon
            return (
              <Link
                key={tab.slug}
                href={`/docs/${tab.slug}`}
                className={`inline-flex items-center gap-1.5 whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                }`}
              >
                <Icon className="size-4" />
                {tab.title}
              </Link>
            )
          })}
        </nav>
        {onAiToggle && (
          <Button
            variant="outline"
            size="sm"
            onClick={onAiToggle}
            className="hidden shrink-0 gap-1.5 lg:inline-flex"
          >
            <Sparkles className="size-3.5" />
            Ask AI
          </Button>
        )}
      </div>
    </div>
  )
}
