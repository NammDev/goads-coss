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
        // No TALL min-height: on prod the Cal page renders with a light/white bg
        // and (when not in inline mode) centers the booker — so any iframe height
        // BEYOND the booker's own ~500px shows as a white band. Keep just a modest
        // floor (~booker height) and let Cal's auto-resize grow it when it fires.
        "w-full overflow-hidden rounded-2xl",
        className,
      )}
    >
      <Cal
        namespace={CAL_NAMESPACE}
        calLink={CAL_LINK}
        config={{ layout: "month_view", theme: "dark" }}
        style={{ width: "100%", minHeight: "500px" }}
      />
    </div>
  )
}
