// Cal.com inline embed — .demo-embed
// Source: Cal inline embed with dark theme, column_view layout
// Cal link: nam-khanh-nguyen-dhpuv7/30min (Sales Consultation, 30m)

"use client"

import Cal, { getCalApi } from "@calcom/embed-react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

// Matches the official Cal "dark theme" embed snippet (event Appearance set to
// Dark on cal.com): namespace "30min", theme dark in BOTH config and ui.
const CAL_LINK = "nam-khanh-nguyen-dhpuv7/30min"
const CAL_NAMESPACE = "30min"

interface CalEmbedProps {
  className?: string
}

export function CalEmbed({ className }: CalEmbedProps) {
  // The cal.com iframe loads with a LIGHT/white background and only switches to
  // the dark theme via JS after its API boots — on our all-dark page that shows
  // as a jarring white flash before the booker appears. We mask the whole load
  // with a dark skeleton overlay until Cal fires `linkReady`, then fade the
  // (already-dark) iframe in. Purely visual; the embed itself is unchanged.
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let active = true
    const reveal = () => { if (active) setReady(true) }
    ;(async function () {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE })
      cal("ui", {
        theme: "dark",
        hideEventTypeDetails: false,
        layout: "month_view",
      })
      cal("on", { action: "linkReady", callback: reveal })
      cal("on", { action: "linkFailed", callback: reveal })
    })()
    // Safety net: never leave the skeleton stuck if the event doesn't fire.
    const t = setTimeout(reveal, 6000)
    return () => { active = false; clearTimeout(t) }
  }, [])

  return (
    // overflow-hidden (not auto) just clips to the rounded corners — the embed
    // must NOT live in a fixed-height scroll box. bg-background keeps any gap
    // dark (never white) behind/around the iframe.
    <div
      className={cn(
        // No TALL min-height: on prod the Cal page renders with a light/white bg
        // and (when not in inline mode) centers the booker — so any iframe height
        // BEYOND the booker's own ~500px shows as a white band. Keep just a modest
        // floor (~booker height) and let Cal's auto-resize grow it when it fires.
        "relative w-full overflow-hidden rounded-2xl bg-[var(--background)]",
        className,
      )}
    >
      {/* Dark loading skeleton — masks the cal.com light→dark flash until ready. */}
      {!ready && (
        <div
          className="absolute inset-0 z-10 flex items-start justify-center bg-[var(--background)]"
          aria-hidden
        >
          <div className="flex w-full max-w-3xl animate-pulse gap-6 p-6 max-sm:gap-4 max-sm:p-4">
            {/* left: month grid */}
            <div className="flex-1 space-y-3">
              <div className="h-5 w-40 rounded bg-white/10" />
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 35 }).map((_, i) => (
                  <div key={i} className="aspect-square rounded bg-white/[0.06]" />
                ))}
              </div>
            </div>
            {/* right: time slots */}
            <div className="hidden w-40 space-y-2 sm:block">
              <div className="h-5 w-24 rounded bg-white/10" />
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="h-9 rounded bg-white/[0.06]" />
              ))}
            </div>
          </div>
        </div>
      )}

      <Cal
        namespace={CAL_NAMESPACE}
        calLink={CAL_LINK}
        config={{ layout: "month_view", useSlotsViewOnSmallScreen: true, theme: "dark" }}
        style={{ width: "100%", minHeight: "500px" }}
        className={cn("transition-opacity duration-300", ready ? "opacity-100" : "opacity-0")}
      />
    </div>
  )
}
