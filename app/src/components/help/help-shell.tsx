// Help shell — same layout as docs-shell, driven by helpTabs. Nav is shared
// with /docs via the generic documentation module (DRY). No DocsAiPanel.

"use client"

import {
  DocumentationSidebar,
  DocumentationMobileNav,
} from "@/components/documentation/documentation-nav"
import { helpTabs, flattenLeafItems } from "@/data/help-navigation"

export function HelpShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-svh w-full">
      <DocumentationSidebar tabs={helpTabs} basePath="/help" flatten={flattenLeafItems} />

      <div className="flex min-w-0 flex-1 flex-col">
        <DocumentationMobileNav tabs={helpTabs} basePath="/help" flatten={flattenLeafItems} />
        {/* No horizontal padding here — each page's outer wrapper provides
            `px-4 sm:px-12 py-10 lg:py-16` to match Foreplay's exact spec. */}
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  )
}
