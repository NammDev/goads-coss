// Collapsed round launcher (bottom-right). Spec section G.

"use client"

import { SW } from "@/components/support-widget/support-widget.tokens"
import { ChatIcon, ChevronDownIcon } from "@/components/support-widget/support-widget-icons"

export function SupportWidgetLauncher({
  open,
  onToggle,
}: {
  open: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      aria-label={open ? "Close messenger" : "Open messenger"}
      onClick={onToggle}
      className="fixed right-5 bottom-5 flex size-14 cursor-pointer items-center justify-center rounded-full text-white transition-transform duration-200 hover:scale-105"
      style={{ backgroundColor: SW.btnBg, boxShadow: SW.panelShadow, zIndex: 2147483001 }}
    >
      {open ? <ChevronDownIcon size={22} /> : <ChatIcon size={24} />}
    </button>
  )
}
