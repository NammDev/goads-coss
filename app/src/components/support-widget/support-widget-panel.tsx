// Panel shell: geometry/shadow/anim + header + scroll body + tab bar.
// Spec sections A (shell), C (body). Open/close animation = data-state.

"use client"

import { useState } from "react"

import { SW } from "@/components/support-widget/support-widget.tokens"
import { CloseIcon } from "@/components/support-widget/support-widget-icons"
import { SupportWidgetHeader } from "@/components/support-widget/support-widget-header"
import { SupportWidgetActionRow } from "@/components/support-widget/support-widget-action-row"
import { SupportWidgetHighlightCard } from "@/components/support-widget/support-widget-highlight-card"
import { SupportWidgetTabBar, type SwTab } from "@/components/support-widget/support-widget-tab-bar"
import { SW_CONFIG } from "@/components/support-widget/support-widget.config"

export function SupportWidgetPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [tab, setTab] = useState<SwTab>("home")

  return (
    <div
      role="dialog"
      aria-label="Support messenger"
      data-state={open ? "open" : "closed"}
      className="fixed right-5 bottom-[84px] flex origin-bottom-right flex-col overflow-hidden bg-white data-[state=closed]:pointer-events-none data-[state=closed]:scale-95 data-[state=closed]:opacity-0"
      style={{
        width: "min(400px, calc(100dvw - 20px))",
        height: "min(704px, calc(100% - 104px))",
        minHeight: 80,
        maxHeight: 704,
        borderRadius: SW.panelRadius,
        boxShadow: SW.panelShadow,
        transition: SW.transition,
        zIndex: 2147483002,
      }}
    >
      {/* [SRC] .intercom-1f58hwk close button: fixed top:32 right:20,
          z 2147483003, padding 10px, radius 10px, flex center, cursor pointer,
          transition background-color 150ms, white 16px icon. Pinned to the
          panel (does not scroll with the body). */}
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute top-8 right-5 z-[2147483003] flex cursor-pointer items-center justify-center rounded-[10px] p-2.5 text-white transition-[background-color] duration-150 hover:bg-white/15"
      >
        <CloseIcon size={16} />
      </button>

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
        <SupportWidgetHeader />
        {tab === "home" ? (
          // [SRC] .intercom-1j1p9aa: flex col, gap 10px, relative z-1, mt -34px
          <div className="relative z-[1] -mt-[34px] flex flex-col gap-[10px] px-5 pb-4">
            {SW_CONFIG.rows.map((r) => (
              <SupportWidgetActionRow key={r.title} row={r} />
            ))}
            <SupportWidgetHighlightCard />
          </div>
        ) : (
          <div
            className="flex flex-1 items-center justify-center px-5 py-10 text-[14px]"
            style={{ color: SW.textMuted }}
          >
            No messages yet
          </div>
        )}
      </div>
      <SupportWidgetTabBar active={tab} onSelect={setTab} />
    </div>
  )
}
