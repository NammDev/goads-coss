// Cal.com inline embed — .demo-embed
// Source: Cal inline embed with dark theme, column_view layout
// Cal link: nam-khanh-nguyen-dhpuv7/30min (Sales Consultation, 30m)

"use client"

import Cal, { getCalApi } from "@calcom/embed-react"
import { useEffect } from "react"
import { cn } from "@/lib/utils"

const CAL_LINK = "nam-khanh-nguyen-dhpuv7/30min"
const CAL_NAMESPACE = "goads-sales-consultation"

interface ForeplayCalEmbedProps {
  className?: string
}

export function ForeplayCalEmbed({ className }: ForeplayCalEmbedProps) {
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
    <div
      className={cn(
        "w-full overflow-auto rounded-2xl",
        className,
      )}
    >
      <Cal
        namespace={CAL_NAMESPACE}
        calLink={CAL_LINK}
        config={{ layout: "month_view", theme: "dark" }}
        style={{ width: "100%", height: "100%", overflow: "scroll", minHeight: "500px" }}
      />
    </div>
  )
}
