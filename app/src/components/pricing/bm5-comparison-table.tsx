// BM5 $250 vs Unlimited comparison table — dark Foreplay style.
// 3-column grid: feature | BM5 Verified $250 | BM5 Verified Unlimited.
// Tokens reused from the pricing card: border #ffffff1a, --alpha-* text ramp,
// siteText typography. The Unlimited column is subtly emphasized (brighter text
// + faint tint) so the upsell reads clearly.

import { cn } from "@/lib/utils"
import { siteText } from "@/components/atoms/typography"
import { bm5ComparisonRows, bm5Options } from "@/data/bm5-upgrade-data"

// Shared 3-col template so header + rows align exactly.
const GRID = "grid grid-cols-[1.15fr_1fr_1fr]"

function CheckDot() {
  return (
    <svg viewBox="0 0 20 20" className="size-4 shrink-0" fill="none" aria-hidden="true">
      <path d="M6.25 10.75 8.5 13l5.25-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Bm5ComparisonTable() {
  return (
    // .bm5-comparison — rounded card, hairline border, clipped so the highlighted
    // column tint follows the rounded corners.
    <div className="overflow-hidden rounded-[16px] border border-[#ffffff1a]">
      {/* Header row */}
      <div className={cn(GRID, "border-b border-[#ffffff1a]")}>
        <div className="px-4 py-3" />
        <div className="px-4 py-3">
          <div className={cn(siteText.labelS, "text-[var(--alpha-50)]")}>{bm5Options.base.name}</div>
        </div>
        {/* Unlimited column — emphasized header (faint tint + full-white label) */}
        <div className="bg-[var(--alpha-800)] px-4 py-3">
          <div className={cn(siteText.labelS, "text-foreground")}>{bm5Options.unlimited.name}</div>
        </div>
      </div>

      {/* Feature rows */}
      {bm5ComparisonRows.map((row, i) => (
        <div
          key={row.feature}
          className={cn(GRID, i < bm5ComparisonRows.length - 1 && "border-b border-[#ffffff0f]")}
        >
          <div className="px-4 py-3">
            <div className={cn(siteText.bodyS, "text-[var(--alpha-100)]")}>{row.feature}</div>
          </div>
          <div className="px-4 py-3">
            <div className={cn(siteText.bodyS, "text-[var(--alpha-50)]")}>{row.base}</div>
          </div>
          {/* Unlimited value — brighter, faint tint; check dot when it's the winning spec */}
          <div className="flex items-center gap-1.5 bg-[var(--alpha-800)] px-4 py-3 text-foreground">
            {row.unlimitedWins && <CheckDot />}
            <div className={cn(siteText.bodyS, row.unlimitedWins ? "font-medium text-foreground" : "text-[var(--alpha-50)]")}>
              {row.unlimited}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
