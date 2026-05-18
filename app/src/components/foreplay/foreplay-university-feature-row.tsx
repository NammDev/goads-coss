// Foreplay University left-right feature section — .left-right-section
// Source DOM (exact from foreplay.co/university/classes):
// div.left-right-section-wrapper
//   div.left-right-section
//     div.left-right-section-content
//       div.section-head.is-align-left
//         div.left-right-product-icon-wrapper (row 1 only)
//           img.left-right-section-icon
//         div.text-alpha-300                    ← empty overline placeholder
//         div.section-head_title
//           div.text-white
//             h2.text-display-h3
//         div.section-head_paragraph
//           div.text-alpha-100
//             p.text-body-l
//       div (CTA wrapper — row 2 only)
//         a.button-dark.button-secondary
//     div.left-right-section-image-wrapper
//       img.left-right-section-image

import { cn } from "@/lib/utils"
import { fpText } from "@/components/foreplay/foreplay-typography"
import { ForeplayCtaButton } from "./foreplay-cta-button"
import type { FeatureRowData } from "@/data/foreplay-university-classes-page-data"

export function ForeplayUniversityFeatureRow({
  icon,
  iconAlt,
  title,
  description,
  image,
  imageAlt,
  reversed = false,
  ctaLabel,
  ctaHref,
}: FeatureRowData) {
  const textBlock = (
    // .left-right-section-content: flex col, gap-32px, items-start, justify-center (NO flex:1 in source)
    <div className="flex flex-col items-start justify-center gap-8">
      {/* .section-head.is-align-left: flex col, gap-12px, items-start, text-left, max-w-720px */}
      <div className="flex w-full max-w-[720px] flex-col items-start gap-3 text-left">
        {/* .left-right-product-icon-wrapper (row 1 only): block, h-50px, mb-10px */}
        {icon && (
          <div className="mb-2.5 block h-[50px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={icon}
              alt={iconAlt || ""}
              className="max-h-[50px]"
              loading="lazy"
            />
          </div>
        )}

        {/* .text-alpha-300 — empty overline placeholder */}
        <div />

        {/* .section-head_title: color foreground, text-wrap:balance */}
        <div className="text-foreground [text-wrap:balance]">
          {/* .text-white: color #fff, flex:1 (hidden Webflow prop) */}
          <div className="flex-1 text-foreground">
            <h2 className={fpText.displayH3}>{title}</h2>
          </div>
        </div>

        {/* .section-head_paragraph: text-wrap:pretty, max-w-512px */}
        <div className="max-w-[512px] [text-wrap:pretty]">
          {/* .text-alpha-100: color var(--fp-alpha-100), flex:1 (hidden Webflow prop) */}
          <div className="flex-1 text-[var(--fp-alpha-100)]">
            <p className={cn(fpText.bodyL, "whitespace-pre-line")}>{description}</p>
          </div>
        </div>
      </div>

      {/* CTA wrapper div (row 2 only) */}
      {ctaLabel && ctaHref && (
        <div>
          <ForeplayCtaButton href={ctaHref} variant="secondary">
            {ctaLabel}
          </ForeplayCtaButton>
        </div>
      )}
    </div>
  )

  const imageBlock = (
    // .left-right-section-image-wrapper: flex:1, w-full, px-16px
    <div className="w-full flex-1 px-4">
      {/* .left-right-section-image: border-radius 20px
          img: width="560" attr + webflow img { max-width:100% } → min(560px, 100%) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={imageAlt}
        width={560}
        className="w-full max-w-[560px] rounded-[20px]"
        loading="lazy"
      />
    </div>
  )

  return (
    // .left-right-section
    <div className="flex items-center gap-6">
      {reversed ? (
        <>
          {imageBlock}
          {textBlock}
        </>
      ) : (
        <>
          {textBlock}
          {imageBlock}
        </>
      )}
    </div>
  )
}
