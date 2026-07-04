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

import { useEffect, useState } from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cn } from "@/lib/utils"
import { siteText } from "@/components/atoms/typography"
import { CtaButton } from "@/components/atoms/cta-button"
import { useCart } from "@/lib/cart-context"
import { CONTACT } from "@/data/contact-info"
import { ProductDetailDrawer } from "@/components/pricing/product-detail-drawer"

// Grid column classes — default 5 cols (Foreplay pricing), overridable via prop
const GRID_5COL = "grid grid-cols-[1.75fr_1fr_1fr_1fr_1fr]"
// ≤768px: name column flexes (minmax 0,1fr); Price + Action use FIXED widths (3.5rem / 7rem).
// Fixed — not auto — because every row is its own grid: `auto` would size each row's columns to
// that row's content ($80 vs $340 vs —), so the vertical borders would land at different x per
// row. Identical fixed tracks keep the dividers aligned across all rows + header, and the 7rem
// action track always fits the Buy/Contact button → no horizontal scroll.
const GRID_3COL = "grid grid-cols-[3.75fr_1fr_1fr] max-md:grid-cols-[minmax(0,1fr)_3.5rem_7rem]"

// Check icon (solid-700 on white bg)
function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
      <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6.25 10.75 8.5 13l5.25-6" stroke="currentColor" />
    </svg>
  )
}

// Small info glyph shown after a product name to signal "click for details".
function InfoGlyph() {
  return (
    <svg viewBox="0 0 20 20" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <path stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
        d="M9 9h.75v3.75m6.75-3a6.75 6.75 0 1 1-13.5 0 6.75 6.75 0 0 1 13.5 0Z" />
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
            <button type="button" className="flex cursor-pointer items-center justify-center border-none bg-transparent p-0 text-[var(--solid-400)] outline-none transition-colors duration-200 hover:text-[var(--solid-700)]">
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

// Crown glyph (shared) — "Only with GoAds" exclusive marker
function CrownGlyph() {
  return (
    <svg viewBox="0 0 18 18" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="square" strokeLinejoin="round" fill="none" strokeWidth="1.5"
        d="M3.13 13.06 1.5 5.25 6 7.5 9 3l3 4.5 4.5-2.25-1.63 7.8a1.5 1.5 0 0 1-1.46 1.2H4.59a1.5 1.5 0 0 1-1.46-1.2Z"
        stroke="currentColor" />
    </svg>
  )
}

// .comparison-tr-badge: absolute left "tab", border solid-50, rounded-l-[10px], 40px wide.
// Hidden ≤768px — it sticks out left of the row (right-full) and would overflow the viewport
// once horizontal scroll is removed; the inline crown (CrownInline) replaces it on mobile.
function CrownBadge() {
  return (
    <div className="absolute inset-y-[-1px] right-full flex w-10 items-center justify-center rounded-l-[10px] border-y border-l border-[var(--solid-50)] max-md:hidden">
      <div className="size-[18px]"><CrownGlyph /></div>
    </div>
  )
}

// Inline crown shown only ≤768px (next to the feature name) since the left "tab" badge is hidden.
function CrownInline() {
  return (
    <div className="hidden size-[18px] shrink-0 text-[var(--solid-700)] max-md:block" aria-label="Only with GOADS">
      <CrownGlyph />
    </div>
  )
}

// Action values that render as ghost pill buttons
const ACTION_VALUES = new Set(["Add to Cart", "Contact"])

// Category name → URL slug, e.g. "Other Service" → "other-service".
// Used as an anchor target so other pages can deep-link + auto-expand a category
// via /pricing#<slug> (e.g. /pricing#other-service).
const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")

// "$80" → 80 ; non-numeric / false → 'contact'
function parsePrice(v: string | boolean): number | "contact" {
  if (typeof v !== "string") return "contact"
  const m = v.replace(/,/g, "").match(/\d+(\.\d+)?/)
  return m ? Number(m[0]) : "contact"
}

// Reuses CtaButton's light-primary pill classes verbatim, but as a
// <button> (cart action, not navigation). Adds the product to the legacy cart;
// slides the non-modal cart drawer in (catalog stays usable) + toast confirms.
function CartBuyButton({ feature }: { feature: ComparisonFeature }) {
  const { addItem } = useCart()
  return (
    <button
      type="button"
      onClick={() =>
        addItem({ name: feature.name, price: parsePrice(feature.basic) })
      }
      className="relative z-[5] flex cursor-pointer items-center justify-center rounded-[10px] bg-background p-2 text-foreground no-underline transition-all duration-150 hover:bg-[var(--solid-600)] active:bg-[var(--solid-400)] active:text-foreground focus-visible:shadow-[0_0_0_2px_white,0_0_0_3px_var(--solid-900)] focus-visible:outline-none"
    >
      <span className="relative z-[2] px-1.5 font-sans text-base font-[550] leading-6 tracking-[-0.01125em]">
        Buy Now
      </span>
    </button>
  )
}

// Cell value renderer — check=solid-700, dash=solid-300, text=bodyM solid-700
// Action values: "Add to Cart" → cart button (needs row), "Contact" → link.
function CellValue({ value, feature }: { value: string | boolean; feature?: ComparisonFeature }) {
  if (value === true) return <div className="text-[var(--solid-700)]"><CheckIcon /></div>
  if (value === false) return <div className="text-[var(--solid-300)]">—</div>
  if (typeof value === "string" && ACTION_VALUES.has(value)) {
    if (value === "Add to Cart" && feature) {
      return <CartBuyButton feature={feature} />
    }
    // "Contact" → GOADS Telegram support with a friendly pre-filled message
    // (per product). Opens in new tab; CtaButton detects the external URL.
    const intro = feature?.name
      ? `Hi GOADS 👋 I'm interested in your ${feature.name}. Could you let me know the price, availability and how long delivery takes? Thank you!`
      : "Hi GOADS 👋 I'm interested in your services. Could you share the details? Thank you!"
    const contactHref = `${CONTACT.telegram.official}?text=${encodeURIComponent(intro)}`
    return (
      <CtaButton
        href={contactHref}
        variant="light-primary"
        className="justify-center"
        showIcon={false}
      >
        {value === "Add to Cart" ? "Buy Now" : value}
      </CtaButton>
    )
  }
  return <div className={cn(siteText.bodyM, "text-[var(--solid-700)]")}>{value}</div>
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
  /** Crown badge — "Only with GoAds" exclusive feature */
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
  /** Leading product icon shown next to each row name (e.g. /assets/BM.webp) */
  icon?: string
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
      { name: "Monthly Ad Spend", basic: false, workflow: "Unlimited", agency: "Unlimited", enterprise: "Unlimited", tooltip: "Unlike other analytics tools there is no variable pricing based on your ad spend.", tooltipHref: "/pricing" },
      { name: "Data Look-back Limit", basic: false, workflow: "Unlimited", agency: "Unlimited", enterprise: "Unlimited" },
      { name: "Top Performing Reports", basic: false, workflow: "Unlimited", agency: "Unlimited", enterprise: "Unlimited" },
      { name: "Comparison Reports", basic: false, workflow: "Unlimited", agency: "Unlimited", enterprise: "Unlimited" },
      { name: "GOADS Creative Scores", basic: false, workflow: true, agency: true, enterprise: true },
      { name: "White-Label Sharing", basic: false, workflow: true, agency: true, enterprise: true },
      { name: "Custom Metric Builder", basic: false, workflow: "Coming soon", agency: "Coming soon", enterprise: "Coming soon", hasCrown: true },
    ],
  },
]

interface PricingComparisonTableProps {
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

export function PricingComparisonTable({
  categories,
  headerColumns,
  defaultExpanded = [0],
  footerTitle = "Need something custom?",
  footerCtaLabel = "Book a Demo",
  footerCtaHref = "/book-demo",
  columns = 5,
}: PricingComparisonTableProps = {}) {
  const gridCols = columns === 3 ? GRID_3COL : GRID_5COL
  // Only the wide (5-col / 4-plan) table can't fit a phone → keeps the horizontal-scroll
  // fallback. The 3-col catalog table (all product routes) fits natively, no scroll.
  const isWide = columns >= 5
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
  // Product whose detail drawer is open (feature + its category name), or null.
  const [detail, setDetail] = useState<{ feature: ComparisonFeature; category: string } | null>(null)

  const toggle = (i: number) => setExpanded(prev => ({ ...prev, [i]: !prev[i] }))

  // Deep-link support: /pricing#<category-slug> auto-expands that category and
  // scrolls it into view (e.g. /unban & /blue-verification CTAs → #other-service).
  useEffect(() => {
    function openFromHash() {
      const slug = decodeURIComponent(window.location.hash.replace(/^#/, ""))
      if (!slug) return
      const idx = cats.findIndex(c => slugify(c.name) === slug)
      if (idx === -1) return
      setExpanded(prev => ({ ...prev, [idx]: true }))
      // rAF so the row expansion has started before we scroll the head into view
      requestAnimationFrame(() => {
        document.getElementById(`cat-${slug}`)?.scrollIntoView({ behavior: "smooth", block: "start" })
      })
    }
    openFromHash()
    window.addEventListener("hashchange", openFromHash)
    return () => window.removeEventListener("hashchange", openFromHash)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    // .comparison-grid-scroll > .comparison-grid
    // Wide (5-col): ≤991px the fr-columns squish to ~55px → keep Foreplay's fixed-width
    //   grid (600/480px) inside overflow:auto → horizontal scroll.
    // 3-col catalog: fits natively (name flexes, Price+Action auto) → no scroll, no min-width.
    <div className={cn("pl-6 max-fp-lg:pl-0", isWide && "max-fp-lg:overflow-x-auto")}>
      <div className={cn(
        "rounded-[16px] border border-[var(--solid-50)]",
        isWide && "max-fp-lg:min-w-[600px] max-md:min-w-[480px]",
      )}>

        {/* ── .comparison-th: sticky header ── */}
        <div className={cn(
          gridCols,
          "sticky top-[72px] z-50 rounded-t-[16px] border-b border-[var(--solid-50)] bg-white",
          // in the mobile horizontal-scroll container, sticky-top fights the
          // scroll box → keep header static ≤991 (it scrolls with the table).
          "max-fp-lg:static",
        )}>
          {/* Empty label column */}
          <div className="p-4" />
          {/* Plan columns */}
          {headers.map((plan, i) => (
            <div key={plan.name || i} className="flex flex-col items-center justify-center gap-3 border-l border-[var(--solid-50)] p-4 max-md:px-2">
              {plan.name && <div className={cn(siteText.headingM, "text-[var(--solid-700)]")}>{plan.name}</div>}
              {plan.cta && plan.href && (
                <CtaButton href={plan.href} variant={plan.variant ?? "light-primary"} className="justify-center">
                  {plan.cta}
                </CtaButton>
              )}
            </div>
          ))}
        </div>

        {/* ── Categories (collapsible) ── */}
        {cats.map((cat, i) => (
          <div key={cat.name} id={`cat-${slugify(cat.name)}`} className="scroll-mt-[150px]">
            {/* .comparison-category-head: clickable, bg solid-25, flex between */}
            <button
              type="button"
              onClick={() => toggle(i)}
              className="z-[2] flex w-full cursor-pointer items-center gap-3 border-b border-[var(--solid-50)] bg-[var(--solid-25)] p-4 text-left text-[var(--solid-700)] outline-none"
            >
              {/* Section product logo (e.g. Profiles / BM / Pages) — one per section */}
              {cat.icon && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={cat.icon} alt="" className="size-[34px] shrink-0 rounded-[8px] object-contain" loading="lazy" />
              )}
              <div className={siteText.headingL}>{cat.name}</div>
              <ChevronIcon expanded={!!expanded[i]} />
            </button>

            {/* .comparison-category-rows: collapsible content */}
            {/* -mx-12/px-12 reserves left room for the crown "tab" badge on desktop; zeroed
                ≤768px (badge hidden there) so rows don't overflow the viewport left edge */}
            <div className={cn(
              "-mx-12 overflow-clip px-12 transition-all duration-[600ms] [transition-timing-function:cubic-bezier(0.19,1,0.22,1)]",
              "max-md:mx-0 max-md:px-0",
              expanded[i] ? "h-auto" : "h-0",
            )}>
              {cat.features.map((feat) => (
                <div
                  key={feat.name}
                  className={cn(
                    gridCols,
                    "relative border-b border-[var(--solid-50)]",
                    feat.isProduct && "bg-[var(--solid-25)]",
                  )}
                >
                  {/* .comparison-tr-badge (crown "tab", absolute left — desktop only) */}
                  {feat.hasCrown && !feat.isProduct && <CrownBadge />}
                  {/* .comparison-tr-title — product-intro rows span the full width (no Price/Action
                      columns: it's a descriptive header for the product line, not a comparable item).
                      px tightened ≤768px so feature names keep room beside Price/Action. */}
                  <div className={cn(
                    "flex flex-wrap items-center gap-x-3 gap-y-1 p-4 text-left max-md:px-3",
                    feat.isProduct && "col-span-full",
                  )}>
                    {/* Inline crown replaces the hidden left badge on mobile */}
                    {feat.hasCrown && <CrownInline />}
                    {/* Product link row (icon + label + subtitle) */}
                    {feat.productHref ? (
                      <>
                        {/* a.pricing-prodcut-link: bg solid-25, rounded-[6px], p-[5px_10px_5px_5px], gap-x-3, flex, items-center */}
                        <a href={feat.productHref} className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-[6px] bg-[var(--solid-25)] py-[5px] pr-2.5 pl-[5px] text-[var(--solid-900)] no-underline transition-all duration-200 hover:bg-[var(--solid-50)]">
                          {/* .pricing-icon.sprite-image — 28x28, bg sprite */}
                          {feat.productIcon && (
                            <div className="size-7 bg-[position:0px_0px] bg-[size:auto_100%] bg-no-repeat" style={{ backgroundImage: `url(${feat.productIcon})` }} />
                          )}
                          <div className={siteText.labelS}>{feat.name}</div>
                        </a>
                        {/* .text-solid-500 > .text-body-s — subtitle */}
                        {feat.subtitle && (
                          <div className="text-[var(--solid-500)]">
                            <div className={siteText.bodyS}>{feat.subtitle}</div>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        {/* Product name → opens the left detail drawer. Dotted underline
                            + info glyph on hover signal that it's clickable. */}
                        <button
                          type="button"
                          onClick={() => setDetail({ feature: feat, category: cat.name })}
                          className="group flex cursor-pointer items-center gap-1.5 border-0 bg-transparent p-0 text-left outline-none"
                        >
                          <span className={cn(siteText.labelS, "text-[var(--solid-700)] underline decoration-dotted decoration-transparent underline-offset-4 transition-colors group-hover:decoration-[var(--solid-400)]")}>
                            {feat.name}
                          </span>
                          <span className="size-4 shrink-0 text-[var(--solid-300)] transition-colors group-hover:text-[var(--solid-700)]">
                            <InfoGlyph />
                          </span>
                        </button>
                        {feat.tooltip && <InfoTooltip text={feat.tooltip} href={feat.tooltipHref} />}
                      </>
                    )}
                  </div>
                  {/* Value cells — skipped entirely for product-intro rows (title spans full width) */}
                  {!feat.isProduct && (
                    <>
                      {/* .comparison-tr-cell — border-l solid-50, flex center, p-4 */}
                      <div className="flex items-center justify-center border-l border-[var(--solid-50)] p-4 max-md:px-2">
                        <CellValue value={feat.basic} />
                      </div>
                      <div className="flex items-center justify-center border-l border-[var(--solid-50)] p-4 max-md:px-2">
                        <CellValue value={feat.workflow} feature={feat} />
                      </div>
                      {columns >= 5 && (
                        <>
                          <div className="flex items-center justify-center border-l border-[var(--solid-50)] p-4 max-md:px-2">
                            <CellValue value={feat.agency} feature={feat} />
                          </div>
                          <div className="flex items-center justify-center border-l border-[var(--solid-50)] p-4 max-md:px-2">
                            <CellValue value={feat.enterprise} feature={feat} />
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* ── .comparison-grid-footer — hidden ≤991 ONLY for the wide scroll grid (would be
             clipped). The 3-col catalog table fits, so its footer CTA shows on mobile. ── */}
        <div className={cn("flex flex-col items-center gap-5 py-10", isWide && "max-fp-lg:hidden")}>
          {/* .text-solid-900 > h3.text-display-h4 */}
          <div className="text-[var(--solid-900)]">
            <h3 className={siteText.displayH4}>{footerTitle}</h3>
          </div>
          {/* .comparison-footer-button: w-[227px] */}
          <div className="w-[227px]">
            {/* .new-button.new-button-secondary: white bg, border inset, dark text */}
            <a
              href={footerCtaHref}
              target={footerCtaHref.startsWith("http") ? "_blank" : undefined}
              rel={footerCtaHref.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex w-full items-center justify-center rounded-[10px] bg-white p-2 text-[#13151a] no-underline shadow-[inset_0_0_0_1px_#ebebeb] transition-all duration-200 hover:bg-[#f2f2f2] hover:shadow-[inset_0_0_0_1px_transparent]"
            >
              <span className={cn("relative z-[2] px-1.5", siteText.headingM)}>{footerCtaLabel}</span>
            </a>
          </div>
        </div>

      </div>

      {/* Left-anchored product detail drawer (opens on product-name click). */}
      <ProductDetailDrawer
        feature={detail?.feature ?? null}
        categoryName={detail?.category}
        onClose={() => setDetail(null)}
      />
    </div>
  )
}
