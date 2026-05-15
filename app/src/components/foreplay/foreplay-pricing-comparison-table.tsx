// Foreplay pricing comparison table — .comparison-grid with collapsible categories
// .comparison-grid: border 1px solid-50, rounded-[16px]
// .comparison-th: grid 5col (1.75fr 1fr 1fr 1fr 1fr), sticky top-[72px], z-50, bg white, rounded-t-[16px]
// .comparison-tr: grid 5col, border-b solid-50, relative
// .comparison-tr-title: text-left, p-4, flex wrap, gap-x-3 gap-y-1
// .comparison-tr-cell: border-l solid-50, flex center, p-4
// .comparison-category-head: z-2, border-b solid-50, bg solid-25, text-solid-700, p-4, flex items-center, cursor-pointer
// .comparison-category-rows: overflow clip, mx-[-48px] px-[48px]
// .comparison-tr.is-product: bg solid-25

"use client"

import { useState } from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cn } from "@/lib/utils"
import { fpText } from "@/components/foreplay/foreplay-typography"
import { ForeplayCtaButton } from "@/components/foreplay/foreplay-cta-button"

// Grid column classes — default 5 cols (Foreplay pricing), overridable via prop
const GRID_5COL = "grid grid-cols-[1.75fr_1fr_1fr_1fr_1fr]"
const GRID_3COL = "grid grid-cols-[3.75fr_1fr_1fr]"

// Check icon (solid-700 on white bg)
function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
      <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6.25 10.75 8.5 13l5.25-6" stroke="currentColor" />
    </svg>
  )
}

// Chevron for accordion
function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <div className={cn(
      "ml-auto transition-transform duration-[600ms] [transition-timing-function:cubic-bezier(0.19,1,0.22,1)]",
      expanded && "rotate-180",
    )}>
      <svg viewBox="0 0 20 20" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <path fill="none" strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="currentColor"
          d="M13 8.5L10.5303 10.9697C10.2374 11.2626 9.76255 11.2626 9.46968 10.9697L7 8.5" />
      </svg>
    </div>
  )
}

// Info icon tooltip — .comparison-tr-icon > .comparison-tooltip
// .comparison-tooltip-body: bg solid-500 (#343642), rounded-[12px], p-3, flex col gap-1, color white
// .comparison-tooltip-button: rounded-[6px], p-[4px_4px_4px_12px], hover bg solid-500
function InfoTooltip({ text, href }: { text: string; href?: string }) {
  return (
    <div className="flex items-center justify-center">
      <TooltipPrimitive.Provider delayDuration={200}>
        <TooltipPrimitive.Root>
          <TooltipPrimitive.Trigger asChild>
            {/* a.comparison-tooltip-trigger > .p-1 > .icon-20 > svg */}
            <button type="button" className="flex cursor-pointer items-center justify-center border-none bg-transparent p-0 text-[var(--fp-solid-400)] outline-none transition-colors duration-200 hover:text-[var(--fp-solid-700)]">
              <div className="p-1">
                <div className="size-5">
                  <svg viewBox="0 0 20 20" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <path stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 9h.75v3.75m6.75-3a6.75 6.75 0 1 1-13.5 0 6.75 6.75 0 0 1 13.5 0Z" />
                  </svg>
                </div>
              </div>
            </button>
          </TooltipPrimitive.Trigger>
          <TooltipPrimitive.Portal>
            <TooltipPrimitive.Content
              side="top"
              sideOffset={8}
              className="z-[100] flex min-w-[200px] max-w-[260px] flex-col items-center gap-1 rounded-[12px] bg-[#343642] p-[12px] font-sans text-white antialiased [font-optical-sizing:none] [transform-origin:50%_100%] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95"
            >
              {/* .text-body-s: 0.875rem/1.25rem, 400, tracking -0.00643em, Inter */}
              <div className="m-0 font-sans text-[0.875rem] font-normal leading-5 tracking-[-0.00643em]">{text}</div>
              {/* .comparison-tooltip-button: rounded-[6px], p-[4px_4px_4px_12px], hover bg solid-500, transition 0.2s */}
              {href && (
                <a href={href} className="inline-flex items-center gap-1 rounded-[6px] py-1 pr-1 pl-3 text-white no-underline transition-all duration-200 hover:bg-[#4c505f]">
                  {/* .flex-gap-1 > .text-label-s + .icon-24 > chevron */}
                  <div className="m-0 font-sans text-[0.875rem] font-medium leading-5 tracking-[-0.00643em]">Learn more</div>
                  <div className="flex size-6 items-center justify-center">
                    <svg viewBox="0 0 20 20" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                      <g style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}>
                        <path fill="none" strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="currentColor"
                          d="M13 8.5L10.5303 10.9697C10.2374 11.2626 9.76255 11.2626 9.46968 10.9697L7 8.5" />
                      </g>
                    </svg>
                  </div>
                </a>
              )}
            </TooltipPrimitive.Content>
          </TooltipPrimitive.Portal>
        </TooltipPrimitive.Root>
      </TooltipPrimitive.Provider>
    </div>
  )
}

// .comparison-tr-badge: absolute left, border solid-50, rounded-l-[10px], 40px wide, crown icon
function CrownBadge() {
  return (
    <div className="absolute inset-y-[-1px] right-full flex w-10 items-center justify-center rounded-l-[10px] border-y border-l border-[var(--fp-solid-50)]">
      <div className="size-[18px]">
        <svg viewBox="0 0 18 18" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="square" strokeLinejoin="round" fill="none" strokeWidth="1.5"
            d="M3.13 13.06 1.5 5.25 6 7.5 9 3l3 4.5 4.5-2.25-1.63 7.8a1.5 1.5 0 0 1-1.46 1.2H4.59a1.5 1.5 0 0 1-1.46-1.2Z"
            stroke="currentColor" />
        </svg>
      </div>
    </div>
  )
}

// Action values that render as ghost pill buttons
const ACTION_VALUES = new Set(["Add to Cart", "Contact"])

// Cell value renderer — check=solid-700, dash=solid-300, text=bodyM solid-700
// Action values (Add to Cart, Contact) render as ghost pill: invisible border → visible on hover
function CellValue({ value }: { value: string | boolean }) {
  if (value === true) return <div className="text-[var(--fp-solid-700)]"><CheckIcon /></div>
  if (value === false) return <div className="text-[var(--fp-solid-300)]">—</div>
  if (typeof value === "string" && ACTION_VALUES.has(value)) {
    return (
      <ForeplayCtaButton
        href="/book-demo"
        variant="light-primary"
        className="justify-center"
        showIcon={false}
      >
        {value === "Add to Cart" ? "Buy Now" : value}
      </ForeplayCtaButton>
    )
  }
  return <div className={cn(fpText.bodyM, "text-[var(--fp-solid-700)]")}>{value}</div>
}

// ── Types ──
export interface ComparisonFeature {
  name: string
  /** true = ✓, false = —, string = text value */
  basic: string | boolean
  workflow: string | boolean
  agency: string | boolean
  enterprise: string | boolean
  /** Product row (Lens/Spyder) has icon + different bg */
  isProduct?: boolean
  /** Crown badge — "Only with Foreplay" exclusive feature */
  hasCrown?: boolean
  /** Info tooltip text — shown on hover of ⓘ icon */
  tooltip?: string
  /** Info tooltip "Learn more" link href */
  tooltipHref?: string
  /** Product link href (e.g. /lens-creative-analytics) — renders as .pricing-prodcut-link */
  productHref?: string
  /** Product icon key — uses same sprite as pricing card */
  productIcon?: string
  /** Subtitle text below product link (e.g. "$50 per additional brand") */
  subtitle?: string
}

export interface ComparisonCategory {
  name: string
  features: ComparisonFeature[]
}

export interface ComparisonHeaderColumn {
  name: string
  cta: string
  href: string
  variant?: "light-primary"
}

// ── Sample Data (1 category) ──
const sampleCategories: ComparisonCategory[] = [
  {
    name: "Creative Analytics",
    features: [
      { name: "Lens", basic: false, workflow: "1 Brand", agency: "10 Brands", enterprise: "Unlimited", isProduct: true, productHref: "/lens-creative-analytics", productIcon: "/foreplay/footer_4.webp", subtitle: "$50 per additional brand" },
      { name: "Monthly Ad Spend", basic: false, workflow: "Unlimited", agency: "Unlimited", enterprise: "Unlimited", tooltip: "Unlike other analytics tools there is no variable pricing based on your ad spend.", tooltipHref: "/pricing" },
      { name: "Data Look-back Limit", basic: false, workflow: "Unlimited", agency: "Unlimited", enterprise: "Unlimited" },
      { name: "Top Performing Reports", basic: false, workflow: "Unlimited", agency: "Unlimited", enterprise: "Unlimited" },
      { name: "Comparison Reports", basic: false, workflow: "Unlimited", agency: "Unlimited", enterprise: "Unlimited" },
      { name: "Foreplay Creative Scores", basic: false, workflow: true, agency: true, enterprise: true },
      { name: "White-Label Sharing", basic: false, workflow: true, agency: true, enterprise: true },
      { name: "Custom Metric Builder", basic: false, workflow: "Coming soon", agency: "Coming soon", enterprise: "Coming soon", hasCrown: true },
    ],
  },
]

interface ForeplayPricingComparisonTableProps {
  /** Override categories data (default: Foreplay pricing sample) */
  categories?: ComparisonCategory[]
  /** Override header columns (default: Basic/Workflow/Agency/Enterprise) */
  headerColumns?: ComparisonHeaderColumn[]
  /** Which category indexes to expand by default (default: [0]) */
  defaultExpanded?: number[]
  /** Footer title (default: "Need something custom?") */
  footerTitle?: string
  /** Footer CTA label (default: "Book a Demo") */
  footerCtaLabel?: string
  /** Footer CTA href (default: "/book-demo") */
  footerCtaHref?: string
  /** Number of columns: 3 or 5 (default 5) */
  columns?: 3 | 5
}

export function ForeplayPricingComparisonTable({
  categories,
  headerColumns,
  defaultExpanded = [0],
  footerTitle = "Need something custom?",
  footerCtaLabel = "Book a Demo",
  footerCtaHref = "/book-demo",
  columns = 5,
}: ForeplayPricingComparisonTableProps = {}) {
  const gridCols = columns === 3 ? GRID_3COL : GRID_5COL
  const cats = categories ?? sampleCategories
  const headers = headerColumns ?? [
    { name: "Basic", cta: "Start Trial", href: "/sign-up", variant: "light-primary" as const },
    { name: "Workflow", cta: "Start Trial", href: "/sign-up", variant: "light-primary" as const },
    { name: "Agency", cta: "Start Trial", href: "/sign-up", variant: "light-primary" as const },
    { name: "Enterprise", cta: "Book Demo", href: "/book-demo", variant: "light-primary" as const },
  ]
  const [expanded, setExpanded] = useState<Record<number, boolean>>(
    () => Object.fromEntries(defaultExpanded.map(i => [i, true]))
  )

  const toggle = (i: number) => setExpanded(prev => ({ ...prev, [i]: !prev[i] }))

  return (
    // .comparison-grid-scroll > .comparison-grid
    <div className="pl-6">
      <div className="rounded-[16px] border border-[var(--fp-solid-50)]">

        {/* ── .comparison-th: sticky header ── */}
        <div className={cn(
          gridCols,
          "sticky top-[72px] z-50 rounded-t-[16px] border-b border-[var(--fp-solid-50)] bg-white",
        )}>
          {/* Empty label column */}
          <div className="p-4" />
          {/* Plan columns */}
          {headers.map((plan, i) => (
            <div key={plan.name || i} className="flex flex-col items-center justify-center gap-3 border-l border-[var(--fp-solid-50)] p-4">
              {plan.name && <div className={cn(fpText.headingM, "text-[var(--fp-solid-700)]")}>{plan.name}</div>}
              {plan.cta && plan.href && (
                <ForeplayCtaButton href={plan.href} variant={plan.variant ?? "light-primary"} className="justify-center">
                  {plan.cta}
                </ForeplayCtaButton>
              )}
            </div>
          ))}
        </div>

        {/* ── Categories (collapsible) ── */}
        {cats.map((cat, i) => (
          <div key={cat.name}>
            {/* .comparison-category-head: clickable, bg solid-25, flex between */}
            <button
              type="button"
              onClick={() => toggle(i)}
              className="z-[2] flex w-full cursor-pointer items-center border-b border-[var(--fp-solid-50)] bg-[var(--fp-solid-25)] p-4 text-left text-[var(--fp-solid-700)] outline-none"
            >
              <div className={fpText.headingL}>{cat.name}</div>
              <ChevronIcon expanded={!!expanded[i]} />
            </button>

            {/* .comparison-category-rows: collapsible content */}
            <div className={cn(
              "-mx-12 overflow-clip px-12 transition-all duration-[600ms] [transition-timing-function:cubic-bezier(0.19,1,0.22,1)]",
              expanded[i] ? "h-auto" : "h-0",
            )}>
              {cat.features.map((feat) => (
                <div
                  key={feat.name}
                  className={cn(
                    gridCols,
                    "relative border-b border-[var(--fp-solid-50)]",
                    feat.isProduct && "bg-[var(--fp-solid-25)]",
                  )}
                >
                  {/* .comparison-tr-badge (crown, absolute left) */}
                  {feat.hasCrown && <CrownBadge />}
                  {/* .comparison-tr-title */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 p-4 text-left">
                    {/* Product link row (icon + label + subtitle) */}
                    {feat.productHref ? (
                      <>
                        {/* a.pricing-prodcut-link: bg solid-25, rounded-[6px], p-[5px_10px_5px_5px], gap-x-3, flex, items-center */}
                        <a href={feat.productHref} className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-[6px] bg-[var(--fp-solid-25)] py-[5px] pr-2.5 pl-[5px] text-[var(--fp-solid-900)] no-underline transition-all duration-200 hover:bg-[var(--fp-solid-50)]">
                          {/* .pricing-icon.sprite-image — 28x28, bg sprite */}
                          {feat.productIcon && (
                            <div className="size-7 bg-[position:0px_0px] bg-[size:auto_100%] bg-no-repeat" style={{ backgroundImage: `url(${feat.productIcon})` }} />
                          )}
                          <div className={fpText.labelS}>{feat.name}</div>
                        </a>
                        {/* .text-solid-500 > .text-body-s — subtitle */}
                        {feat.subtitle && (
                          <div className="text-[var(--fp-solid-500)]">
                            <div className={fpText.bodyS}>{feat.subtitle}</div>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <div className={cn(fpText.labelS, "text-[var(--fp-solid-700)]")}>{feat.name}</div>
                        {feat.tooltip && <InfoTooltip text={feat.tooltip} href={feat.tooltipHref} />}
                      </>
                    )}
                  </div>
                  {/* .comparison-tr-cell — border-l solid-50, flex center, p-4 */}
                  <div className="flex items-center justify-center border-l border-[var(--fp-solid-50)] p-4">
                    <CellValue value={feat.basic} />
                  </div>
                  <div className="flex items-center justify-center border-l border-[var(--fp-solid-50)] p-4">
                    <CellValue value={feat.workflow} />
                  </div>
                  {columns >= 5 && (
                    <>
                      <div className="flex items-center justify-center border-l border-[var(--fp-solid-50)] p-4">
                        <CellValue value={feat.agency} />
                      </div>
                      <div className="flex items-center justify-center border-l border-[var(--fp-solid-50)] p-4">
                        <CellValue value={feat.enterprise} />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* ── .comparison-grid-footer: flex col, gap-5 (20px), items-center, py-10 (40px) ── */}
        <div className="flex flex-col items-center gap-5 py-10">
          {/* .text-solid-900 > h3.text-display-h4 */}
          <div className="text-[var(--fp-solid-900)]">
            <h3 className={fpText.displayH4}>{footerTitle}</h3>
          </div>
          {/* .comparison-footer-button: w-[227px] */}
          <div className="w-[227px]">
            {/* .new-button.new-button-secondary: white bg, border inset, dark text */}
            <a
              href={footerCtaHref}
              className="flex w-full items-center justify-center rounded-[10px] bg-white p-2 text-[#13151a] no-underline shadow-[inset_0_0_0_1px_#ebebeb] transition-all duration-200 hover:bg-[#f2f2f2] hover:shadow-[inset_0_0_0_1px_transparent]"
            >
              <span className={cn("relative z-[2] px-1.5", fpText.headingM)}>{footerCtaLabel}</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
