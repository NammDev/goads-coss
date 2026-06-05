// Cal.com inline embed — .demo-embed
// Source: Cal inline embed with dark theme, column_view layout
// Cal link: nam-khanh-nguyen-dhpuv7/30min (Sales Consultation, 30m)

"use client"

import Cal, { getCalApi } from "@calcom/embed-react"
import { useEffect } from "react"
import { cn } from "@/lib/utils"

const CAL_LINK = "nam-khanh-nguyen-dhpuv7/30min"
const CAL_NAMESPACE = "goads-sales-consultation"

interface CalEmbedProps {
  className?: string
}

export function CalEmbed({ className }: CalEmbedProps) {
  useEffect(() => {
    ;(async function () {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE })
      cal("ui", {
        theme: "dark",
        hideEventTypeDetails: false,
        layout: "month_view",
      })
    })()
  }, [])

  return (
    // overflow-hidden (not auto) just clips to the rounded corners — the embed
    // must NOT live in a fixed-height scroll box.
    <div
      className={cn(
        "w-full overflow-hidden rounded-2xl",
        className,
      )}
    >
      {/* Let @calcom/embed-react own its height — it auto-resizes the iframe to
          the month_view content via postMessage. The previous height:100% +
          overflow:scroll trapped the calendar in a ~500px scroll box (parent has
          no fixed height), cramping it. Keep only width + a minHeight floor to
          avoid an initial 0-height flash; the embed grows past it as needed. */}
      <Cal
        namespace={CAL_NAMESPACE}
        calLink={CAL_LINK}
        config={{ layout: "month_view", theme: "dark" }}
        style={{ width: "100%", minHeight: "600px" }}
      />
    </div>
  )
}
