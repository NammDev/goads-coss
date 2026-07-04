// Base vs Upgraded comparison table for the setup configurator dialog.
// Dark Foreplay style: hairline border, --alpha-* text ramp, siteText typography.
// The upgraded column is subtly emphasized (brighter text + faint tint) so the
// upsell reads clearly. Data-driven via props so it works for any UpgradeOffer.

import { cn } from "@/lib/utils"
import { siteText } from "@/components/atoms/typography"
import type { UpgradeComparisonRow } from "@/data/bm5-upgrade-data"

const GRID = "grid grid-cols-[1.15fr_1fr_1fr]"

function CheckDot() {
  return (
    <svg viewBox="0 0 20 20" className="size-4 shrink-0" fill="none" aria-hidden="true">
      <path d="M6.25 10.75 8.5 13l5.25-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

interface UpgradeComparisonTableProps {
  rows: UpgradeComparisonRow[]
  baseName: string
  upgradedName: string
}

export function UpgradeComparisonTable({ rows, baseName, upgradedName }: UpgradeComparisonTableProps) {
  return (
    <div className="overflow-hidden rounded-[16px] border border-[#ffffff1a]">
      {/* Header row */}
      <div className={cn(GRID, "border-b border-[#ffffff1a]")}>
        <div className="px-4 py-3" />
        <div className="px-4 py-3">
          <div className={cn(siteText.labelS, "text-[var(--alpha-50)]")}>{baseName}</div>
        </div>
        {/* Upgraded column — emphasized header (faint tint + full-white label) */}
        <div className="bg-[var(--alpha-800)] px-4 py-3">
          <div className={cn(siteText.labelS, "text-foreground")}>{upgradedName}</div>
        </div>
      </div>

      {/* Feature rows */}
      {rows.map((row, i) => (
        <div key={row.feature} className={cn(GRID, i < rows.length - 1 && "border-b border-[#ffffff0f]")}>
          <div className="px-4 py-3">
            <div className={cn(siteText.bodyS, "text-[var(--alpha-100)]")}>{row.feature}</div>
          </div>
          <div className="px-4 py-3">
            <div className={cn(siteText.bodyS, "text-[var(--alpha-50)]")}>{row.base}</div>
          </div>
          {/* Upgraded value — brighter, faint tint; check dot when it's the winning spec */}
          <div className="flex items-center gap-1.5 bg-[var(--alpha-800)] px-4 py-3 text-foreground">
            {row.upgradedWins && <CheckDot />}
            <div className={cn(siteText.bodyS, row.upgradedWins ? "font-medium text-foreground" : "text-[var(--alpha-50)]")}>
              {row.upgraded}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
