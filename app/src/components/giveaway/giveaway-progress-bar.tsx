"use client"

// Giveaway progress bar — NOT in the Foreplay source. Deterministic auto-increment
// (no backend): count = min(cap, base + floor(elapsedHoursSinceStart * ratePerHour)).
// Sits in the dark steps section → track --alpha-700, fill foreground (tokens, no hex).
// Hydration-safe: first render uses `base` (stable on server+client), then recomputes
// on mount + every 60s so it always looks "alive".

import { useEffect, useState } from "react"
import { siteText } from "@/components/atoms/typography"
import { giveawayProgress } from "@/data/giveaway-page-data"

function computeCount() {
  const { base, startISO, ratePerHour, cap } = giveawayProgress
  const elapsedHours = (Date.now() - Date.parse(startISO)) / 3_600_000
  return Math.min(cap, base + Math.floor(Math.max(0, elapsedHours) * ratePerHour))
}

export function GiveawayProgressBar() {
  const { base, cap } = giveawayProgress
  const [count, setCount] = useState<number>(base)

  useEffect(() => {
    // Deferred (not a synchronous setState in the effect body) → first render keeps
    // the server-stable `base`, avoiding a hydration mismatch; then ticks live.
    const warm = setTimeout(() => setCount(computeCount()), 0)
    const id = setInterval(() => setCount(computeCount()), 60_000)
    return () => {
      clearTimeout(warm)
      clearInterval(id)
    }
  }, [])

  const percent = Math.min(100, (count / cap) * 100)

  return (
    <div className="mx-auto w-full max-w-[512px]">
      <div className="mb-2 flex items-center justify-between">
        <span className={`${siteText.labelM} text-foreground`}>
          Progress
        </span>
        <span className={`${siteText.labelM} text-foreground`}>
          {count} / {cap} claimed
        </span>
      </div>
      {/* track */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--alpha-700)]">
        {/* fill */}
        <div
          className="h-full rounded-full bg-foreground transition-[width] duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
