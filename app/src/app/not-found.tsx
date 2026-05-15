// Global 404 — Foreplay-styled, WITH the marketing header + footer.
// app/not-found.tsx is rendered only by the root layout (no (marketing) group
// layout), so the Foreplay chrome is rendered here explicitly and the whole
// page is wrapped in the same `.foreplay` shell as (marketing)/layout.tsx.
//
// Source 404 DOM: h1.heading-11 "404" (gradient #fff→#000 clip, 20vw / 250px xl)
//   + .section-head (h2.text-display-h2 + p.text-body-l) + Return Home button.

import { fontInter } from "@/fonts"
import { ForeplayHeader, ForeplayFooter } from "@/components/foreplay"
import { ForeplaySectionHead } from "@/components/foreplay/foreplay-section-head"
import { ForeplayCtaButton } from "@/components/foreplay/foreplay-cta-button"

export default function NotFound() {
  return (
    <div
      className={[
        "foreplay",
        fontInter.variable,
        "min-h-svh bg-background text-muted-foreground",
        "font-sans text-base font-normal leading-6 tracking-[-0.01125em]",
        "overflow-x-clip antialiased [font-optical-sizing:none]",
      ].join(" ")}
    >
      <ForeplayHeader />

      {/* 404 content — centered between header and footer */}
      <main className="flex min-h-[70svh] items-center justify-center px-6 py-24">
        <div className="flex flex-col items-center gap-8 text-center">
          {/* .heading-11 — gradient text fill, 20vw (250px on xl), line-height 100% */}
          <h1 className="bg-gradient-to-b from-white to-black bg-clip-text text-[20vw] leading-none font-semibold text-transparent xl:text-[250px]">
            404
          </h1>

          {/* .section-head — reuse atom (title h2 + paragraph) */}
          <ForeplaySectionHead
            title="Page not found"
            titleTag="h2"
            titleSize="h2"
            description="Oops! Looks like you've wandered off the beaten path. Don't worry, even the best explorers get lost sometimes."
            descSize="l"
            variant="light"
          />

          {/* ._404-button-wrapper — Return Home (button-dark.button-primary = hero) */}
          <div>
            <ForeplayCtaButton href="/" variant="hero">
              Return Home
            </ForeplayCtaButton>
          </div>
        </div>
      </main>

      <ForeplayFooter />
    </div>
  )
}
