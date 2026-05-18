// Bottom tab bar: Home / Messages. Spec section F ([SRC] item metrics).

"use client"

import { SW } from "@/components/support-widget/support-widget.tokens"
import { HomeIcon, MessagesIcon } from "@/components/support-widget/support-widget-icons"
import { SW_CONFIG } from "@/components/support-widget/support-widget.config"

export type SwTab = "home" | "messages"

const TABS = [
  { id: "home" as const, label: SW_CONFIG.tabs.home, Icon: HomeIcon },
  { id: "messages" as const, label: SW_CONFIG.tabs.messages, Icon: MessagesIcon },
]

export function SupportWidgetTabBar({
  active,
  onSelect,
}: {
  active: SwTab
  onSelect: (t: SwTab) => void
}) {
  return (
    <div
      className="flex border-t bg-white"
      role="tablist"
      style={{ borderColor: "#ECEDEF" }}
    >
      {TABS.map(({ id, label, Icon }) => {
        const on = id === active
        return (
          <button
            key={id}
            role="tab"
            aria-selected={on}
            onClick={() => onSelect(id)}
            className="flex flex-1 cursor-pointer flex-col items-center gap-1 py-[18px] transition-colors duration-150"
            style={{ color: on ? SW.tabActive : SW.textMuted }}
          >
            <Icon size={24} />
            <span className="text-[12px] font-medium leading-none">{label}</span>
          </button>
        )
      })}
    </div>
  )
}
