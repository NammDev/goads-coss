// Foreplay DEMO layout — chrome for the reference/demo routes that stay under
// /foreplay/* (industries, pages, swipe-file, tools, university). These are 100%
// Foreplay clones kept for reference, not part of the live GoAds site.
//
// CSS: bg background, color neutral-300, tracking-[-0.01125em], Inter 1rem/1.5rem/400.

import { fontInter } from "@/fonts"
import { ForeplayHeader, ForeplayFooter } from "@/components/foreplay"

export default function ForeplayDemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className={[
        "foreplay",
        fontInter.variable,
        "min-h-svh bg-background text-muted-foreground",
        "font-sans text-base font-normal leading-6 tracking-[-0.01125em]",
        "overflow-x-clip",
        "antialiased",
        "[font-optical-sizing:none]",
      ].join(" ")}
    >
      <ForeplayHeader />
      {children}
      <ForeplayFooter />
    </div>
  )
}
