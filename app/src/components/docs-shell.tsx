"use client"

import { useState } from "react"
import { DocsTabs } from "@/components/docs-tabs"
import { DocsSidebar } from "@/components/docs-sidebar"
import { DocsMobileSidebar } from "@/components/docs-mobile-sidebar"
import { DocsAiPanel } from "@/components/docs-ai-panel"

export function DocsShell({ children }: { children: React.ReactNode }) {
  const [aiOpen, setAiOpen] = useState(false)

  return (
    <>
      <DocsTabs onAiToggle={() => setAiOpen((v) => !v)} />
      <div className="container flex flex-1">
        <div className="fixed bottom-4 left-4 z-40 lg:hidden" aria-label="Open docs navigation">
          <DocsMobileSidebar />
        </div>
        <DocsSidebar />
        <main className="min-w-0 flex-1 px-4 sm:px-6 lg:px-10">{children}</main>
        <DocsAiPanel open={aiOpen} onClose={() => setAiOpen(false)} />
      </div>
    </>
  )
}
