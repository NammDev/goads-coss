// Highlight card: heading + paragraph + full-width dark CTA. Spec section E.

import { SW } from "@/components/support-widget/support-widget.tokens"
import { SW_CONFIG } from "@/components/support-widget/support-widget.config"

export function SupportWidgetHighlightCard() {
  const h = SW_CONFIG.highlight
  return (
    <div
      className="rounded-2xl bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.06)] ring-1"
      style={{ ["--tw-ring-color" as string]: SW.cardBorder }}
    >
      <h2 className="text-[15px] font-semibold leading-5" style={{ color: SW.textStrong }}>
        {h.heading}
      </h2>
      <p className="mt-1 text-[13px] leading-4" style={{ color: SW.textMuted }}>
        {h.body}
      </p>
      <a
        href={h.href}
        className="mt-3 flex h-11 cursor-pointer items-center justify-center rounded-[10px] text-[14px] font-semibold text-white no-underline transition-opacity hover:opacity-90"
        style={{ backgroundColor: SW.btnBg }}
      >
        {h.cta}
      </a>
    </div>
  )
}
