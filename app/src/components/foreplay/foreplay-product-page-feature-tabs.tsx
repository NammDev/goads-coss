// Foreplay product page tabs — .product-page-tabs (horizontal tabs + full-width image)
// DOM: .section > .product-page-padding-y > .container.section-container > .section-head + .section-content-main > .product-page-tabs
// .product-page-tabs: flex col, center, mt-0
// .product-page-tabs-menu: grid 3col, gap-4, p-1, w-full, overflow-hidden
// .product-page-tab: gap-2, opacity-0.44, transparent bg, rounded-lg, flex row, center, px-5 py-2.5, transition 0.2s
// .product-page-tab.w--current: opacity-1
// .product-page-tabs-image: rounded-[32px] (desktop), rounded-2xl (mobile), w-full
// .tabs-video-wrapper: flex col, gap-5, py-5

"use client"

import { useState, type ReactNode } from "react"
import { fpText } from "@/components/foreplay/foreplay-typography"
import { cn } from "@/lib/utils"

interface TabItem {
  icon: ReactNode
  label: string
  imageSrc: string
  imageAlt?: string
}

interface ForeplayProductPageFeatureTabsProps {
  tabs: TabItem[]
}

export function ForeplayProductPageFeatureTabs({
  tabs,
}: ForeplayProductPageFeatureTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="mt-0 flex flex-col items-center">
      {/* .product-page-tabs-menu */}
      <div className="grid w-full auto-cols-fr grid-cols-3 gap-4 overflow-hidden p-1 max-md:grid-cols-1">
        {tabs.map((tab, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveIndex(i)}
            className={cn(
              // .product-page-tab
              "flex cursor-pointer flex-row items-center justify-center gap-2 rounded-lg bg-transparent px-5 py-2.5 text-[var(--fp-alpha-0)] transition-all duration-200 max-md:flex-col max-md:px-3 max-md:py-2",
              i === activeIndex
                ? "opacity-100"
                : "opacity-[0.44] hover:opacity-75",
            )}
          >
            {/* .product-page-tab-svg */}
            <div className="size-6">{tab.icon}</div>
            <div className={fpText.labelM}>{tab.label}</div>
          </button>
        ))}
      </div>

      {/* .product-page-tabs-content > .w-tab-pane > .tabs-video-wrapper */}
      <div className="w-full">
        <div className="flex flex-col gap-5 py-5">
          {/* .product-page-tabs-image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={tabs[activeIndex].imageSrc}
            alt={tabs[activeIndex].imageAlt ?? tabs[activeIndex].label}
            className="w-full rounded-[32px] max-md:rounded-2xl"
            loading="eager"
          />
        </div>
      </div>
    </div>
  )
}
