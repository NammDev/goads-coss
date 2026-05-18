// Orchestrator: launcher + animated panel. Open via launcher, close via
// launcher / header X / Esc. Self-contained (no providers, own literals).

"use client"

import { useEffect, useState } from "react"

import { SupportWidgetLauncher } from "@/components/support-widget/support-widget-launcher"
import { SupportWidgetPanel } from "@/components/support-widget/support-widget-panel"

export function SupportWidget() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <>
      <SupportWidgetPanel open={open} onClose={() => setOpen(false)} />
      <SupportWidgetLauncher open={open} onToggle={() => setOpen((v) => !v)} />
    </>
  )
}
