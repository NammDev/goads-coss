// Foreplay University left-right feature section — .left-right-section
// .left-right-section-wrapper: flex col, gap-80px
// .left-right-section: flex, gap-24px, items-center (grid 12-col in source but flex works)
// .left-right-section-content: flex col, gap-32px, items-start, justify-center
// .left-right-section-image-wrapper: flex-1, w-full, px-16px
// .left-right-section-image: rounded-20px
// .left-right-section-icon: max-h-50px
// .left-right-product-icon-wrapper: h-50px, mb-10px

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
    <div className="flex flex-1 flex-col items-start justify-center gap-8">
      {/* .section-head.is-align-left */}
      <div className="flex w-full flex-col items-start gap-3 text-left">
        {/* Icon */}
        {icon && (
          <div className="mb-2.5 block h-[50px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={icon} alt={iconAlt || ""} className="max-h-[50px]" loading="lazy" />
          </div>
        )}

        {/* Title */}
        <div className="text-foreground [text-wrap:balance]">
          <h2 className={fpText.displayH3}>{title}</h2>
        </div>

        {/* Description */}
        <div className="text-[var(--fp-alpha-100)]">
          <p className={cn(fpText.bodyL, "whitespace-pre-line")}>{description}</p>
        </div>
      </div>

      {/* CTA button (row 2 has "Apply Now") */}
      {ctaLabel && ctaHref && (
        <ForeplayCtaButton href={ctaHref} variant="secondary">
          {ctaLabel}
        </ForeplayCtaButton>
      )}
    </div>
  )

  const imageBlock = (
    <div className="flex-1 px-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={imageAlt}
        width={560}
        className="w-full rounded-[20px]"
        loading="lazy"
      />
    </div>
  )

  return (
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
