// Product detail drawer for the /pricing catalog — slides in from the LEFT.
// Same dark Foreplay language as the BM5 configurator dialog: `site` token scope,
// elevated near-black panel, hairline border, soft shadow, blurred backdrop.
// Opens when a product name in the comparison table is clicked; shows the
// description + spec rows + highlights + a Buy / Contact CTA.

"use client"

import { XIcon } from "lucide-react"
import { Dialog as DialogPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"
import { siteText } from "@/components/atoms/typography"
import { CtaButton } from "@/components/atoms/cta-button"
import { useCart } from "@/lib/cart-context"
import { CONTACT } from "@/data/contact-info"
import { getProductDetail } from "@/data/product-details-data"
import type { ComparisonFeature } from "@/components/pricing/comparison-table"

interface ProductDetailDrawerProps {
  feature: ComparisonFeature | null
  categoryName?: string
  onClose: () => void
}

// "$40" → 40 ; anything non-numeric (false / "Contact") → null (Contact CTA)
function parsePrice(v: string | boolean): number | null {
  if (typeof v !== "string") return null
  const m = v.replace(/,/g, "").match(/\d+(\.\d+)?/)
  return m ? Number(m[0]) : null
}

function CheckDot() {
  return (
    <svg viewBox="0 0 20 20" className="mt-0.5 size-4 shrink-0 text-[var(--alpha-50)]" fill="none" aria-hidden="true">
      <path d="M6.25 10.75 8.5 13l5.25-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ProductDetailDrawer({ feature, categoryName, onClose }: ProductDetailDrawerProps) {
  const { addItem } = useCart()
  const open = feature !== null

  // Keep the last feature rendered during the close animation (feature goes null
  // on close, but the panel is still sliding out).
  const detail = feature ? getProductDetail(feature.name, categoryName) : null
  const price = feature ? parsePrice(feature.basic) : null

  const handleBuy = () => {
    if (!feature || price === null) return
    addItem({ name: feature.name, price })
    onClose()
  }

  const contactHref = feature
    ? `${CONTACT.telegram.official}?text=${encodeURIComponent(
        `Hi GOADS 👋 I'd like more details on your ${feature.name}. Could you share price, stock and delivery time? Thank you!`,
      )}`
    : CONTACT.telegram.official

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogPrimitive.Portal>
        {/* Blurred, darkened backdrop so the page recedes behind the panel. */}
        <DialogPrimitive.Overlay className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        {/* Left-anchored full-height drawer. `site` re-scopes Foreplay dark tokens
            (the portal renders outside .site). Slides in from the left. */}
        <DialogPrimitive.Content
          className={cn(
            "site fixed inset-y-0 left-0 z-[121] flex w-[min(420px,calc(100vw-2rem))] flex-col overflow-y-auto rounded-r-[20px]",
            "border-y-0 border-r border-l-0 border-white/12 bg-background shadow-[24px_0_70px_-20px_rgba(0,0,0,0.85)] outline-none",
            "duration-300 data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:animate-in data-[state=open]:slide-in-from-left",
          )}
        >
          {detail && feature && (
            <div className="flex min-h-full flex-col gap-6 p-6 max-sm:p-5">
              {/* Close */}
              <DialogPrimitive.Close
                aria-label="Close"
                className="absolute top-5 right-5 flex size-8 items-center justify-center rounded-[10px] text-[var(--alpha-100)] transition-colors duration-150 hover:bg-white/10 hover:text-foreground"
              >
                <XIcon className="size-4" />
              </DialogPrimitive.Close>

              {/* Header: category + name + price */}
              <div className="flex flex-col gap-2 pr-8">
                {categoryName && (
                  <div className={cn(siteText.overline, "text-[var(--alpha-100)]")}>{categoryName}</div>
                )}
                <DialogPrimitive.Title className={cn(siteText.displayH5, "text-foreground")}>
                  {feature.name}
                </DialogPrimitive.Title>
                <div className="flex items-baseline gap-2">
                  <span className={cn(siteText.labelL, "text-foreground")}>
                    {price !== null ? `$${price}` : "Contact for price"}
                  </span>
                  {price !== null && (
                    <span className={cn(siteText.bodyS, "text-[var(--alpha-100)]")}>one-time</span>
                  )}
                </div>
              </div>

              {/* Description */}
              <DialogPrimitive.Description className={cn(siteText.bodyM, "text-[var(--alpha-50)]")}>
                {detail.description}
              </DialogPrimitive.Description>

              {/* Specs */}
              <div className="overflow-hidden rounded-[14px] border border-[#ffffff1a]">
                {detail.specs.map((s, i) => (
                  <div
                    key={s.label}
                    className={cn(
                      "flex items-center justify-between gap-4 px-4 py-3",
                      i < detail.specs.length - 1 && "border-b border-[#ffffff0f]",
                    )}
                  >
                    <span className={cn(siteText.bodyS, "text-[var(--alpha-100)]")}>{s.label}</span>
                    <span className={cn(siteText.labelS, "text-right text-foreground")}>{s.value}</span>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              {detail.highlights && detail.highlights.length > 0 && (
                <div className="flex flex-col gap-2.5">
                  {detail.highlights.map((h) => (
                    <div key={h} className="flex items-start gap-2.5">
                      <CheckDot />
                      <span className={cn(siteText.bodyS, "text-[var(--alpha-50)]")}>{h}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* CTA pinned to the bottom */}
              <div className="mt-auto flex flex-col gap-3 border-t border-[#ffffff1a] pt-5">
                {price !== null ? (
                  <CtaButton variant="hero" onClick={handleBuy} className="justify-center">
                    Add to cart, ${price}
                  </CtaButton>
                ) : (
                  <CtaButton variant="hero" href={contactHref} className="justify-center">
                    Contact on Telegram
                  </CtaButton>
                )}
                <a
                  href={contactHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(siteText.bodyS, "text-center text-[var(--alpha-100)] no-underline transition-colors hover:text-foreground")}
                >
                  Ask a question about this product
                </a>
              </div>
            </div>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
