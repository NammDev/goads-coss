// White rounded action card: title (+ sub) + trailing icon. <a> if href.
// Spec section D.

import { SW } from "@/components/support-widget/support-widget.tokens"
import { SendIcon, ExternalIcon } from "@/components/support-widget/support-widget-icons"
import type { SwActionRow } from "@/components/support-widget/support-widget.config"

const ICONS = { send: SendIcon, external: ExternalIcon } as const

export function SupportWidgetActionRow({ row }: { row: SwActionRow }) {
  const Icon = ICONS[row.icon]
  const inner = (
    <div className="flex items-center justify-between gap-3">
      <div className="min-w-0">
        <div className="text-[15px] font-semibold leading-5" style={{ color: SW.textStrong }}>
          {row.title}
        </div>
        {row.sub && (
          <div className="mt-0.5 text-[13px] leading-4" style={{ color: SW.textMuted }}>
            {row.sub}
          </div>
        )}
      </div>
      <Icon size={16} className="shrink-0" />
    </div>
  )

  const cls =
    "block rounded-2xl bg-white px-[18px] py-4 no-underline shadow-[0_1px_2px_rgba(0,0,0,0.06)] ring-1 transition-shadow hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
  const style = { color: SW.textStrong, ["--tw-ring-color" as string]: SW.cardBorder }

  return row.href ? (
    <a
      href={row.href}
      {...(row.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cls}
      style={style}
    >
      {inner}
    </a>
  ) : (
    <button type="button" className={cls + " w-full cursor-pointer text-left"} style={style}>
      {inner}
    </button>
  )
}
