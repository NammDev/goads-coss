// Help shell — clone of docs-shell.tsx using HelpSidebar + HelpMobileSidebar.
// DocsAiPanel omitted (docs-specific coupling). All other structure/classNames identical.

"use client"

import { HelpSidebar } from "@/components/help/help-sidebar"
import { HelpMobileSidebar } from "@/components/help/help-mobile-sidebar"

export function HelpShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-svh w-full">
      <HelpSidebar />
      {/* No horizontal padding here — each page's outer wrapper provides
          `px-4 sm:px-12 py-10 lg:py-16` to match Foreplay's exact spec. */}
      <main className="min-w-0 flex-1">{children}</main>

      {/* Mobile sidebar trigger — fixed bottom-left on small viewports */}
      <div
        className="fixed bottom-4 left-4 z-40 lg:hidden"
        aria-label="Open help navigation"
      >
        <HelpMobileSidebar />
      </div>
    </div>
  )
}
