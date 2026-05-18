// DEMO route (non-prod) — preview the support-widget in isolation.
// Plan 260518-0013 phase 5. Launcher bottom-right; click to open panel.

import type { Metadata } from "next"
import { SupportWidget } from "@/components/support-widget/support-widget"

export const metadata: Metadata = { title: "Support Widget — demo", robots: { index: false } }

export default function SupportWidgetDemoPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-neutral-100 p-8">
      <p className="text-sm text-neutral-500">
        Support widget demo — use the launcher at the bottom-right.
      </p>
      <SupportWidget />
    </main>
  )
}
