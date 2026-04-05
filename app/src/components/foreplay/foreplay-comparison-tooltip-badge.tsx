// Foreplay comparison tooltip badge — .comparison-tooltip
// SOURCE DOM: .comparison-tooltip > .comparison-tooltip-body-container + .comparison-tooltip-trigger
// .comparison-tooltip: z-100, color solid-400, self-center, relative
// .comparison-tooltip-trigger: cursor-pointer, flex center, hover color solid-700
// .comparison-badge: box-shadow solid-50, rounded-[8px], flex, items-center, select-none, hover yellow
// .comparison-badge-icon: border-r solid-50, 36x36, flex center
// .comparison-badge-label: flex-1, py-1.5 px-3
// Tooltip body: bg solid-500, rounded-[12px], min-w-[240px] max-w-[280px], p-3, color solid-0

"use client"

import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { fpText } from "@/components/foreplay/foreplay-typography"

// Crown SVG from sprite-crown
function CrownIcon() {
  return (
    <div className="size-[18px]">
      <svg viewBox="0 0 18 18" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="square" strokeLinejoin="round" fill="none" strokeWidth="1.5"
          d="M3.13 13.06 1.5 5.25 6 7.5 9 3l3 4.5 4.5-2.25-1.63 7.8a1.5 1.5 0 0 1-1.46 1.2H4.59a1.5 1.5 0 0 1-1.46-1.2Z"
          stroke="currentColor" />
      </svg>
    </div>
  )
}

export function ForeplayComparisonTooltipBadge() {
  return (
    // .comparison-tooltip
    <TooltipPrimitive.Provider delayDuration={200}>
      <TooltipPrimitive.Root>
        {/* .comparison-tooltip-trigger > .comparison-badge */}
        <TooltipPrimitive.Trigger asChild>
          <button
            type="button"
            className="group z-[100] m-0 flex cursor-pointer items-center justify-center self-center border-none bg-transparent p-0 text-[var(--fp-solid-400)] outline-none transition-colors duration-200"
          >
            {/* .comparison-badge */}
            <div className="flex select-none items-center rounded-[8px] shadow-[0_0_0_1px_var(--fp-solid-50)] transition-colors duration-200">
              {/* .comparison-badge-icon: border-r solid-50, 36x36, flex center */}
              <div className="flex size-9 items-center justify-center border-r border-[var(--fp-solid-50)] transition-colors duration-200 group-hover:text-[#EBBE7A]">
                <CrownIcon />
              </div>
              {/* .comparison-badge-label: flex-1, py-1.5 px-3 */}
              <div className="flex-1 px-3 py-1.5">
                <div className="text-[var(--fp-solid-600)]">
                  <div className={fpText.labelM}>Only with Foreplay</div>
                </div>
              </div>
            </div>
          </button>
        </TooltipPrimitive.Trigger>

        {/* .comparison-tooltip-body-container > .comparison-tooltip-body */}
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side="top"
            sideOffset={8}
            className="z-[100] flex min-w-[240px] max-w-[280px] flex-col items-center gap-1 rounded-[12px] bg-[#343642] p-3 font-sans text-center text-white antialiased [font-optical-sizing:none] [text-wrap:balance] [transform-origin:50%_100%] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95"
          >
            <div className={fpText.labelS}>
              Features Tagged with 👑 are only available with Foreplay
            </div>
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}
