// GoAds product catalog table — Foreplay pricing comparison layout adapted for product catalog
// 5 columns: Product | Badge | Price | Purchased | Action
// Accordion categories: BM, Profiles, Pages, TikTok (route-aware default expanded)
// Reuses Foreplay comparison table CSS patterns (white bg, sticky header, accordion rows)

"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { fpText } from "@/components/foreplay/foreplay-typography"
import { ForeplayCtaButton } from "@/components/foreplay/foreplay-cta-button"
import type { ProductCategory } from "@/components/product-catalog"
import { bmCategories } from "@/data/bm-page-data"
import { profileCategories } from "@/data/profiles-page-data"
import { pageCategories } from "@/data/pages-page-data"
import { tiktokCategories } from "@/data/tiktok-page-data"

// Flatten all product categories into one list
const allCategories: { group: string; categories: ProductCategory[] }[] = [
  { group: "Business Manager", categories: bmCategories },
  { group: "Facebook Profiles", categories: profileCategories },
  { group: "Facebook Pages", categories: pageCategories },
  { group: "TikTok Assets", categories: tiktokCategories },
]

interface GoAdsProductCatalogTableProps {
  /** Which category group to expand by default (matches route) */
  defaultExpanded?: string
  className?: string
}

export function GoAdsProductCatalogTable({
  defaultExpanded = "Facebook Profiles",
  className,
}: GoAdsProductCatalogTableProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(() => {
    const initial = new Set<string>()
    if (defaultExpanded) initial.add(defaultExpanded)
    return initial
  })

  const toggleGroup = (group: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev)
      if (next.has(group)) next.delete(group)
      else next.add(group)
      return next
    })
  }

  return (
    <div className={cn("flex flex-col items-stretch gap-10 pt-16 pb-16 text-center", className)}>
      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-[var(--fp-solid-50)]">
        {/* Sticky header row — 5 columns, matches Foreplay .comparison-th */}
        <div className="sticky top-[72px] z-50 grid grid-cols-[2fr_1fr_1fr_1fr_1fr] border-b border-[var(--fp-solid-50)] bg-white rounded-t-2xl">
          <div className="p-4 text-left">
            <span className="text-sm font-semibold text-[var(--fp-solid-700)]">Product</span>
          </div>
          {["Badge", "Price", "Sold", "Action"].map((label) => (
            <div key={label} className="flex items-center justify-center border-l border-[var(--fp-solid-50)] p-4">
              <span className="text-sm font-semibold text-[var(--fp-solid-700)]">{label}</span>
            </div>
          ))}
        </div>

        {/* Category accordion rows */}
        {allCategories.map(({ group, categories }) => {
          const isExpanded = expandedGroups.has(group)
          // Flatten all products in this group
          const products = categories.flatMap((cat) => cat.products)

          return (
            <div key={group}>
              {/* Category header — accordion trigger */}
              <button
                type="button"
                onClick={() => toggleGroup(group)}
                className={cn(
                  "flex w-full cursor-pointer items-center justify-between border-b border-[var(--fp-solid-50)] bg-[var(--fp-solid-25)] p-4 text-left",
                  "transition-colors hover:bg-[var(--fp-solid-50)]",
                )}
              >
                <span className="text-sm font-semibold text-[var(--fp-solid-700)]">
                  {group}
                  <span className="ml-2 font-normal text-[var(--fp-solid-400)]">({products.length})</span>
                </span>
                <svg
                  viewBox="0 0 20 20"
                  width="20"
                  height="20"
                  className={cn(
                    "text-[var(--fp-solid-400)] transition-transform duration-300",
                    isExpanded && "rotate-180",
                  )}
                >
                  <path
                    fill="none"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    d="M13 8.5L10.5303 10.9697C10.2374 11.2626 9.76255 11.2626 9.46968 10.9697L7 8.5"
                  />
                </svg>
              </button>

              {/* Product rows — collapsed/expanded */}
              <div
                className={cn(
                  "overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]",
                  isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0",
                )}
              >
                {products.map((product, i) => (
                  <div
                    key={i}
                    className={cn(
                      "grid grid-cols-[2fr_1fr_1fr_1fr_1fr] border-b border-[var(--fp-solid-50)]",
                      "transition-colors hover:bg-[var(--fp-solid-25)]",
                    )}
                  >
                    {/* Product name + description */}
                    <div className="flex flex-col gap-0.5 p-4 text-left">
                      <span className={cn(fpText.labelS, "text-[var(--fp-solid-700)]")}>
                        {product.name}
                      </span>
                      {product.description && (
                        <span className={cn(fpText.bodyS, "text-[var(--fp-solid-400)]")}>
                          {product.description}
                        </span>
                      )}
                    </div>
                    {/* Badge */}
                    <div className="flex items-center justify-center border-l border-[var(--fp-solid-50)] p-4">
                      {product.badge && (
                        <span className="rounded-md bg-[var(--fp-solid-25)] px-2 py-0.5 text-xs font-medium text-[var(--fp-solid-600)]">
                          {product.badge}
                        </span>
                      )}
                    </div>
                    {/* Price */}
                    <div className="flex items-center justify-center border-l border-[var(--fp-solid-50)] p-4">
                      <span className={cn(fpText.labelM, "text-[var(--fp-solid-700)]")}>
                        {product.price === "contact" ? "Contact" : `$${product.price}`}
                      </span>
                    </div>
                    {/* Purchased count */}
                    <div className="flex items-center justify-center border-l border-[var(--fp-solid-50)] p-4">
                      <span className={cn(fpText.bodyS, "text-[var(--fp-solid-400)]")}>
                        {product.purchased?.toLocaleString() ?? "—"}
                      </span>
                    </div>
                    {/* Action */}
                    <div className="flex items-center justify-center border-l border-[var(--fp-solid-50)] p-4">
                      <ForeplayCtaButton
                        href={product.price === "contact" ? "/talk-to-sales" : "/talk-to-sales"}
                        variant="light-primary"
                        className="text-xs"
                      >
                        {product.price === "contact" ? "Contact" : "Order"}
                      </ForeplayCtaButton>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        {/* Footer */}
        <div className="flex flex-col items-center gap-5 py-10">
          <h3 className={cn(fpText.displayH4, "text-[var(--fp-solid-700)]")}>
            Need something custom?
          </h3>
          <ForeplayCtaButton href="/talk-to-sales" variant="light-primary">
            Talk to Sales
          </ForeplayCtaButton>
        </div>
      </div>
    </div>
  )
}
