// Foreplay home sharing — .home-sharing (tabs section inside collab)
// DOM: .home-sharing > .home-sharing-content + .home-sharing-tab-panes-2
// .home-sharing: grid 2 cols, gap-10 (40px), pt-24 (96px)
// .home-sharing-content: flex col, gap-10
// Contains: section-head (left-aligned) + line + tabs with 3 items
// .home-sharing-tab-panes-2: right side image/video pane

"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { fpText } from "@/components/foreplay/foreplay-typography"
import { ForeplayCtaButton } from "@/components/foreplay/foreplay-cta-button"

const tabs = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 4.2v11.6m5.8-4.4H10m0-2.8H4.2m1.6 7.2h8.4c.88 0 1.6-.72 1.6-1.6V5.8c0-.88-.72-1.6-1.6-1.6H5.8c-.88 0-1.6.72-1.6 1.6v8.4c0 .88.72 1.6 1.6 1.6Z" />
      </svg>
    ),
    label: "Inspiration & Moodboards",
    title: "Curate & collaborate on creative genius",
    body: "Like Pinterest for ad inspiration, Foreplay lets you create mood boards to communicate internally or show off externally.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M16.25 14.75v-9.5c0-.83-.67-1.5-1.5-1.5h-9.5c-.83 0-1.5.67-1.5 1.5v9.5c0 .83.67 1.5 1.5 1.5h9.5c.83 0 1.5-.67 1.5-1.5ZM7 13v-2.25M10 13V7m3 6V9.25" />
      </svg>
    ),
    label: "Performance Reports",
    title: "Highlight trends. Back it with proof.",
    body: "Turn creative data into deck-worthy insights. Share visual reports that break down what's driving performance — and what's just taking up space.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.83h1.33c.74 0 1.34.6 1.34 1.34v8.5c0 .73-.6 1.33-1.34 1.33H6.67c-.74 0-1.34-.6-1.34-1.33v-8.5c0-.74.6-1.34 1.34-1.34H8m4 0v1.34H8V4.83m4 0c0-.73-.6-1.33-1.33-1.33H9.33C8.6 3.5 8 4.1 8 4.83" />
      </svg>
    ),
    label: "Briefs & Asset Collection",
    title: "Brief once. Collect everything.",
    body: "Send one brief to multiple creators and gather all their work in one clean, organized place. No more chasing links, files, or context across multiple platforms.",
  },
]

export function ForeplayHomeSharing() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="grid grid-cols-[1fr_1fr] items-stretch gap-10 pt-24">
      {/* .home-sharing-content (left side) */}
      <div className="flex flex-col gap-10">
        {/* .section-head.is-align-left */}
        <div className="flex w-full flex-col items-start gap-3 text-left">
          <div className="text-[var(--fp-solid-500)]">
            <div className={fpText.overline}>
              Sharing &amp; Presenting
            </div>
          </div>
          <div className="[text-wrap:balance]">
            <h2 className={cn(fpText.displayH3, "text-[var(--fp-solid-700)]")}>
              Beautifully present wins and opportunities
            </h2>
          </div>
          <div className="[text-wrap:balance]">
            <div className="text-[var(--fp-solid-600)]">
              <p className={fpText.bodyL}>
                Impress your clients or wow your co-workers. Foreplay makes it seamless to share inspiration, performance reports and briefs with anyone, anywhere.
              </p>
            </div>
          </div>
        </div>

        {/* .line separator */}
        <div className="h-px w-full bg-[var(--fp-solid-50)]" />

        {/* .home-sharing-tabs */}
        <div className="flex gap-3">
          {/* .home-sharing-tabs-links */}
          <div className="flex flex-1 flex-col gap-1.5">
            {tabs.map((tab, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveTab(i)}
                className={cn(
                  // .home-sharing-tab-link
                  "flex items-center gap-1.5 rounded-[10px] px-5 py-1.5 pl-1.5 text-left",
                  "transition-all duration-[400ms] ease-[cubic-bezier(0.19,1,0.22,1)]",
                  activeTab === i
                    ? "bg-[var(--fp-solid-25)]"
                    : "bg-transparent hover:bg-[var(--fp-solid-25)]",
                )}
              >
                <div className="flex size-5 items-center justify-center text-[var(--fp-solid-400)]">
                  {tab.icon}
                </div>
                <div className={cn(fpText.labelS, "text-[var(--fp-solid-700)]")}>
                  {tab.label}
                </div>
              </button>
            ))}
          </div>

          {/* .home-sharing-tabs-panes: CTA card for active tab */}
          <div className="flex-1">
            {/* .home-sharing-tab-cta: bg solid-25, rounded-[18px], p-2, flex col, gap-3 */}
            <div className="flex w-full flex-col gap-3 rounded-[18px] bg-[var(--fp-solid-25)] p-2">
              {/* .home-sharing-tab-cta-content: flex col, gap-3, p-2 */}
              <div className="flex flex-col gap-3 p-2">
                {/* .text-label-s */}
                <div className={cn(fpText.labelS, "text-[var(--fp-solid-700)]")}>
                  {tabs[activeTab].title}
                </div>
                {/* .text-body-s */}
                <div className={cn(fpText.bodyS, "text-[var(--fp-solid-500)]")}>
                  {tabs[activeTab].body}
                </div>
              </div>
              {/* button-light.button-primary: full width, center content */}
              <ForeplayCtaButton href="/sign-up" variant="light-primary" className="w-full justify-center">
                Start For Free
              </ForeplayCtaButton>
            </div>
          </div>
        </div>
      </div>

      {/* .home-sharing-tab-panes-2: right side image, bleeds right */}
      <div className="-mr-[999px] mt-[-80px] w-[60vw] max-w-[720px] [aspect-ratio:720/680]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/foreplay/680c3ed43df5ea8859a6ac18_home-mockup-1.webp"
          alt="Foreplay sharing dashboard on tablet"
          className="size-full object-contain object-left-top"
          loading="lazy"
        />
      </div>
    </div>
  )
}
