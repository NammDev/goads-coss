// Foreplay pricing tab toggle — .pricing-tabs + .pricing-tabs-menu + .pricing-tab-pane
// SOURCE DOM: .pricing-tabs > .pricing-tabs-menu > a.pricing-tab-link[Monthly] + a.pricing-tab-link.w--current[Annually + Save badge INSIDE]
// .pricing-tabs: flex col, gap-9 (36px via grid-row-gap)
// .pricing-tabs-menu: flex row, gap-1, box-shadow 0 0 0 1px neutral-600, rounded-xl (12px),
//   justify-center, self-center, items-center, p-1 (4px)
// .pricing-tab-link: flex row, gap-3, text-center, bg transparent, rounded-[8px] (8px),
//   justify-center, items-center, py-2 px-3, transition 0.2s
//   :hover bg neutral-800, .w--current: bg neutral-700, color neutral-0
// .pricing-tabs-content: mt-[-8px] mx-[-8px] p-2
// .pricing-grid: grid 3col (1fr 1fr 1fr), gap-0, place-items-center
// CRITICAL: "Save 15% + Unlimited Spyder" is INSIDE the Annually <a>, NOT a sibling

"use client"

import { useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { fpText } from "@/components/foreplay/foreplay-typography"

interface ForeplayPricingTabsProps {
  monthlyContent: ReactNode
  annualContent: ReactNode
  className?: string
}

export function ForeplayPricingTabs({
  monthlyContent,
  annualContent,
  className,
}: ForeplayPricingTabsProps) {
  const [activeTab, setActiveTab] = useState<"monthly" | "annual">("annual")

  return (
    // .pricing-tabs
    <div className={cn("flex flex-col gap-9", className)}>
      {/* .pricing-tabs-menu: box-shadow neutral-600 (#ffffff29), rounded-xl, gap-1, p-1 */}
      <div className="flex flex-row items-center justify-center gap-1 self-center rounded-[12px] p-1 shadow-[0_0_0_1px_#ffffff29]">
        {/* a.pricing-tab-link — Monthly */}
        <button
          type="button"
          onClick={() => setActiveTab("monthly")}
          className={cn(
            // .pricing-tab-link: gap-3, text-center, bg transparent, rounded-[8px], py-2 px-3
            "flex flex-row items-center justify-center gap-3 rounded-[8px] px-3 py-2 text-center text-foreground transition-all duration-200",
            activeTab === "monthly"
              ? "bg-[var(--fp-alpha-700)]"  // .w--current: bg neutral-700
              : "bg-transparent hover:bg-[#ffffff0f]",  // :hover bg neutral-800
          )}
        >
          <div className={fpText.labelS}>Monthly</div>
        </button>

        {/* a.pricing-tab-link.w--current — Annually (Save badge INSIDE) */}
        <button
          type="button"
          onClick={() => setActiveTab("annual")}
          className={cn(
            "flex flex-row items-center justify-center gap-3 rounded-[8px] px-3 py-2 text-center text-foreground transition-all duration-200",
            activeTab === "annual"
              ? "bg-[var(--fp-alpha-700)]"  // .w--current: bg neutral-700
              : "bg-transparent hover:bg-[#ffffff0f]",  // :hover bg neutral-800
          )}
        >
          <div className={fpText.labelS}>Annually</div>
          {/* .text-alpha-100 > .text-label-s.mobile-xxs — inside Annually tab */}
          <div className="flex-1 text-[var(--fp-alpha-100)]">
            <div className={cn(fpText.labelS, "max-sm:text-[0.625rem] max-sm:leading-4")}>
              Save 15% + Unlimited Spyder
            </div>
          </div>
        </button>
      </div>

      {/* .pricing-tabs-content */}
      <div className="-mx-2 -mt-2 p-2">
        {/* .pricing-tab-pane — Monthly */}
        <div className={activeTab === "monthly" ? "block" : "hidden"}>
          {/* .pricing-grid */}
          <div className="grid grid-cols-3 place-items-center gap-0">
            {monthlyContent}
          </div>
        </div>

        {/* .pricing-tab-pane.w--tab-active — Annual (default) */}
        <div className={activeTab === "annual" ? "block" : "hidden"}>
          {/* .pricing-grid */}
          <div className="grid grid-cols-3 place-items-center gap-0">
            {annualContent}
          </div>
        </div>
      </div>
    </div>
  )
}
