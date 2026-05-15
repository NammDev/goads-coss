// Foreplay pricing comparison table skeleton — .comparison
// Inside .section-white-block (white bg, light theme) > section > .container
// .comparison: flex col, gap-10 (40px), text-center, items-stretch, pt-16 (64px) pb-16 (64px)
// .comparison-head: flex col, gap-10 (40px), items-center, pb-4 (16px)
// .comparison-tooltip: z-100, color solid-400, self-center, relative
// .comparison-grid-scroll: pl-6 (24px)
// .comparison-grid: border 1px solid-50, rounded-2xl (16px)
// .comparison-th: grid 5col (1.75fr 1fr 1fr 1fr 1fr), sticky top-[72px], z-50,
//   border-b solid-50, bg white, rounded-t-2xl
// .comparison-tr: grid 5col, border-b solid-50, relative
// .comparison-tr-title: flex wrap, text-left, p-4, gap-x-3 gap-y-1
// .comparison-tr-cell: flex center, p-4, border-l solid-50
// .comparison-category-head: z-2, border-b solid-50, bg solid-25, text-solid-700, text-left, p-4, flex items-center
// .comparison-category-rows: overflow-clip, mx-[-48px] px-[48px]
// .comparison-grid-footer: flex col, items-center, py-10, gap-5
// NOTE: Uses --fp-solid-* tokens (light theme)

import { cn } from "@/lib/utils"
import { fpText } from "@/components/foreplay/foreplay-typography"
import { ForeplayComparisonTooltipBadge } from "@/components/foreplay/foreplay-comparison-tooltip-badge"
import { ForeplayPricingComparisonTable } from "@/components/foreplay/foreplay-pricing-comparison-table"
import type { ComparisonCategory, ComparisonHeaderColumn } from "@/components/foreplay/foreplay-pricing-comparison-table"

interface ForeplayPricingComparisonProps {
  className?: string
  /** Override heading */
  title?: string
  /** Override description */
  description?: string
  /** Hide tooltip badge */
  hideTooltipBadge?: boolean
  /** Pass-through to table */
  categories?: ComparisonCategory[]
  headerColumns?: ComparisonHeaderColumn[]
  defaultExpanded?: number[]
  footerTitle?: string
  footerCtaLabel?: string
  footerCtaHref?: string
  columns?: 3 | 5
}

export function ForeplayPricingComparison({
  className,
  title = "Compare Plans",
  description = "Enjoy the most feature-rich ad creative workflow platform under one roof.",
  hideTooltipBadge = false,
  categories,
  headerColumns,
  defaultExpanded,
  footerTitle,
  footerCtaLabel,
  footerCtaHref,
  columns,
}: ForeplayPricingComparisonProps) {
  return (
    // .comparison: flex col, gap-10, text-center, items-stretch, pt-16 pb-16
    <div className={cn(
      "flex flex-col items-stretch gap-10 pt-16 pb-16 text-center",
      className,
    )}>

      {/* .comparison-head: only rendered when title/description provided */}
      {(title || description) && (
        <div className="flex flex-col items-center gap-10 pb-4">
          <div className="max-w-[640px]">
            <div className="flex flex-col items-center gap-2">
              {title && (
                <div className="text-[var(--fp-solid-900)]">
                  <h2 className={fpText.displayH3}>{title}</h2>
                </div>
              )}
              {description && (
                <div className="text-[var(--fp-solid-500)] [text-wrap:pretty]">
                  <p className={fpText.bodyM}>{description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* .comparison-tooltip */}
      {!hideTooltipBadge && <ForeplayComparisonTooltipBadge />}

      {/* .comparison-grid-scroll > .comparison-grid — full table with accordion */}
      <ForeplayPricingComparisonTable
        categories={categories}
        headerColumns={headerColumns}
        defaultExpanded={defaultExpanded}
        footerTitle={footerTitle}
        footerCtaLabel={footerCtaLabel}
        footerCtaHref={footerCtaHref}
        columns={columns}
      />
    </div>
  )
}
