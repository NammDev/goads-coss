// Docs shell — full-height layout in the Foreplay help-center pattern:
// sticky left sidebar (logo + search + flat nav + feedback) and a scrollable
// main content column. No horizontal top tabs; the sidebar owns navigation.

"use client"

import { useState } from "react"
import { DocsSidebar } from "@/components/docs-sidebar"
import { DocsMobileSidebar } from "@/components/docs-mobile-sidebar"
import { DocsAiPanel } from "@/components/docs-ai-panel"

export function DocsShell({ children }: { children: React.ReactNode }) {
  const [aiOpen, setAiOpen] = useState(false)

  return (
    <div className="relative flex min-h-svh w-full">
      <DocsSidebar />
      {/* No horizontal padding here — each page's outer wrapper provides
          `px-4 sm:px-12 py-10 lg:py-16` to match Foreplay's exact spec. */}
      <main className="min-w-0 flex-1">{children}</main>

      {/* Mobile sidebar trigger — fixed bottom-left on small viewports */}
      <div
        className="fixed bottom-4 left-4 z-40 lg:hidden"
        aria-label="Open docs navigation"
      >
        <DocsMobileSidebar />
      </div>

      {/* AI panel kept available for future entry points (sidebar/article CTA) */}
      <DocsAiPanel open={aiOpen} onClose={() => setAiOpen(false)} />
    </div>
  )
}
