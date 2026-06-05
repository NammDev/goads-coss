// Docs shell — Foreplay help-center layout: sticky desktop sidebar + scrollable
// main. On mobile a sticky topbar (brand + hamburger) opens a full-screen nav
// drawer. Nav is shared with /help via the generic documentation module (DRY).

"use client"

import { useState } from "react"
import {
  DocumentationSidebar,
  DocumentationMobileNav,
} from "@/components/documentation/documentation-nav"
import { DocsAiPanel } from "@/components/docs-ai-panel"
import { docsTabs, flattenLeafItems } from "@/data/docs-navigation"

export function DocsShell({ children }: { children: React.ReactNode }) {
  const [aiOpen, setAiOpen] = useState(false)

  return (
    <div className="relative flex min-h-svh w-full">
      <DocumentationSidebar tabs={docsTabs} basePath="/docs" flatten={flattenLeafItems} />

      <div className="flex min-w-0 flex-1 flex-col">
        <DocumentationMobileNav tabs={docsTabs} basePath="/docs" flatten={flattenLeafItems} />
        {/* No horizontal padding here — each page's outer wrapper provides
            `px-4 sm:px-12 py-10 lg:py-16` to match Foreplay's exact spec. */}
        <main className="min-w-0 flex-1">{children}</main>
      </div>

      {/* AI panel kept available for future entry points (sidebar/article CTA) */}
      <DocsAiPanel open={aiOpen} onClose={() => setAiOpen(false)} />
    </div>
  )
}
