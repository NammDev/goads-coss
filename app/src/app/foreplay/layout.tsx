// Foreplay layout — .body wrapper
// CSS: bg background, color neutral-300, tracking-[-0.01125em], Inter 1rem/1.5rem/400, overflow-x clip
// Structure: .body > header | section | section ... | footer

import { fontInter } from "@/fonts"
import { ForeplayHeader, ForeplayFooter } from "@/components/foreplay"

export default function ForeplayLayout({
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
