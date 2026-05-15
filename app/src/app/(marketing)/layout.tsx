// Foreplay marketing layout — .body wrapper (header + footer chrome).
// Lives in a (marketing) route group so the URL stays /foreplay/* while the
// sibling /help subtree stays independent (its own docs-style layout,
// no marketing header/footer). Route groups do not affect the URL.
//
// CSS: bg background, color neutral-300, tracking-[-0.01125em], Inter 1rem/1.5rem/400, overflow-x clip
// Structure: .body > header | section | section ... | footer

import { fontInter } from "@/fonts"
import { ForeplayHeader, ForeplayFooter } from "@/components/foreplay"

export default function ForeplayMarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className={[
        "foreplay",
        fontInter.variable,
        // .body exact CSS
        "min-h-svh bg-background text-muted-foreground",
        "font-sans text-base font-normal leading-6 tracking-[-0.01125em]",
        "overflow-x-clip",
        // font smoothing
        "antialiased",
        // Disable optical sizing globally — only display headings enable it
        "[font-optical-sizing:none]",
      ].join(" ")}
    >
      <ForeplayHeader />
      {children}
      <ForeplayFooter />
    </div>
  )
}
