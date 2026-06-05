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
        // Responsive min-height floor so the booking UI renders FULLY even when
        // Cal's JS auto-resize (postMessage) doesn't fire — which is exactly the
        // localhost-OK / prod-cramped discrepancy. Cal grows the iframe PAST this
        // when resize works; this guarantees a deterministic baseline either way.
        "w-full overflow-hidden rounded-2xl min-h-[640px] max-md:min-h-[720px] max-sm:min-h-[860px]",
        className,
      )}
    >
      <Cal
        namespace={CAL_NAMESPACE}
        calLink={CAL_LINK}
        config={{ layout: "month_view", theme: "dark" }}
        // height:100% + minHeight:inherit makes the embed fill the wrapper's
        // responsive min-height; auto-resize still grows it taller when it works.
        style={{ width: "100%", height: "100%", minHeight: "inherit" }}
      />
    </div>
  )
}
