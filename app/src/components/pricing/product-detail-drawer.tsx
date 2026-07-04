// Product detail drawer for the /pricing catalog — slides in from the LEFT.
// Same dark Foreplay language as the BM5 configurator dialog: `site` token scope,
// elevated near-black panel, hairline border, soft shadow, blurred backdrop.
// Opens when a product name in the comparison table is clicked; shows the
// description + spec rows + highlights + a Buy / Contact CTA.

"use client"

import { useState } from "react"
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
  const [addOn, setAddOn] = useState(false)
  const [choice, setChoice] = useState<string | null>(null)
  const open = feature !== null

  // Keep the last feature rendered during the close animation (feature goes null
  // on close, but the panel is still sliding out).
  const detail = feature ? getProductDetail(feature.name, categoryName) : null
  const price = feature ? parsePrice(feature.basic) : null
  // Optional paid add-on (e.g. BM5 "Original profile" backup). Total reflects it.
  const addonPrice = detail?.addon?.price ?? 0
  const total = price !== null ? price + (addOn ? addonPrice : 0) : null

  const close = () => {
    setAddOn(false) // reset so the next product opens with the add-on unchecked
    setChoice(null)
    onClose()
  }

  const handleBuy = () => {
    if (!feature || total === null) return
    addItem({ name: addOn ? `${feature.name} + Original profile` : feature.name, price: total })
    close()
  }

  // Contact message: for choice-based services (e.g. Unban) include the picked
  // asset + a screenshot reminder; otherwise a generic product enquiry.
  const contactText = !feature
    ? "Hi GOADS 👋"
    : detail?.options
      ? `Hi GOADS 👋 I need your Unban Service for my ${choice ?? "asset"}. I'm attaching a full-screen screenshot of its current status. Could you help me?`
      : `Hi GOADS 👋 I'd like more details on your ${feature.name}. Could you share price, stock and delivery time? Thank you!`
  const contactHref = `${CONTACT.telegram.official}?text=${encodeURIComponent(contactText)}`

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(o) => !o && close()}>
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

              {/* Selectable choices (e.g. which asset to unban) — feeds the contact message */}
              {detail.options && (
                <div className="flex flex-col gap-2.5">
                  <div className={cn(siteText.overline, "text-[var(--alpha-100)]")}>{detail.options.title}</div>
                  <div className="flex flex-wrap gap-2">
                    {detail.options.choices.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setChoice(c)}
                        className={cn(
                          "rounded-full border px-3.5 py-2 transition-all duration-150",
                          siteText.labelS,
                          choice === c
                            ? "border-[var(--alpha-300)] bg-[var(--alpha-800)] text-foreground"
                            : "border-[#ffffff1a] text-[var(--alpha-50)] hover:border-[var(--alpha-500)]",
                        )}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

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

              {/* Prominent note callout (e.g. screenshot reminder for unban) */}
              {detail.note && (
                <div className="flex items-start gap-2.5 rounded-[12px] border border-[var(--alpha-600)] bg-[var(--alpha-900)] p-3.5">
                  <svg viewBox="0 0 20 20" className="mt-0.5 size-4 shrink-0 text-[var(--alpha-50)]" fill="none" aria-hidden="true">
                    <path d="M10 13.5v-4m0-3h.01M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className={cn(siteText.bodyS, "text-[var(--alpha-100)]")}>{detail.note}</span>
                </div>
              )}

              {/* Optional paid add-on (checkbox card) — only for purchasable items */}
              {detail.addon && price !== null && (
                <button
                  type="button"
                  onClick={() => setAddOn((v) => !v)}
                  className={cn(
                    "mt-auto flex items-start gap-3 rounded-[14px] border p-4 text-left transition-all duration-150",
                    addOn ? "border-[var(--alpha-300)] bg-[var(--alpha-800)]" : "border-[#ffffff1a] hover:border-[var(--alpha-500)]",
                  )}
                >
                  {/* checkbox */}
                  <span
                    className={cn(
                      "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-[6px] border transition-colors",
                      addOn ? "border-foreground bg-foreground text-background" : "border-[var(--alpha-400)]",
                    )}
                  >
                    {addOn && (
                      <svg viewBox="0 0 20 20" className="size-3.5" fill="none" aria-hidden="true">
                        <path d="M6 10.5 8.5 13l5.5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <span className="flex flex-1 flex-col gap-1.5">
                    <span className="flex items-baseline justify-between gap-2">
                      {/* .text-label-s (14px/20, 500, Inter) — matches drawer spec values + configurator option names */}
                      <span className={cn(siteText.labelS, "text-foreground")}>{detail.addon.label}</span>
                      <span className={cn(siteText.labelS, "shrink-0 text-foreground")}>+${detail.addon.price}</span>
                    </span>
                    {/* .text-body-s (14px/20, 400, Inter) — same size as specs + highlights, not fine-print */}
                    <span className={cn(siteText.bodyS, "text-[var(--alpha-100)]")}>{detail.addon.benefit}</span>
                  </span>
                </button>
              )}

              {/* CTA pinned to the bottom */}
              <div className={cn("flex flex-col gap-3 border-t border-[#ffffff1a] pt-5", !detail.addon && "mt-auto")}>
                {price !== null ? (
                  <CtaButton variant="hero" onClick={handleBuy} className="justify-center">
                    Add to cart, ${total}
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
