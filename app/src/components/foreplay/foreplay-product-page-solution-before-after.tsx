// Foreplay product page solution — .product-page-solution (Before/After cards)
// DOM: section.section > .section-padding > .section-white-block > .container.section-container > .product-page-solution
// .product-page-solution: flex col, gap-9 (36px), text-center, max-w-[940px], mx-auto, py-20 (80px desktop)
// .product-page-solution-grid: grid 2col, gap-4
// .static-product-page-solution-card: gap-5, inset border, rounded-[20px], flex col, p-0, overflow-hidden
// .solution-after: bg-background, no shadow

import type { ReactNode } from "react"
import { ForeplaySectionHead } from "@/components/foreplay/foreplay-section-head"
import { fpText } from "@/components/foreplay/foreplay-typography"

interface SolutionCard {
  label: string
  /** Optional — omit (or pass empty string) to render label only. */
  description?: string
  imageSrc?: string
  imageAlt?: string
  /** Override the trailing image with custom JSX (e.g. inline mockup widget). */
  visual?: ReactNode
}

interface ForeplayProductPageSolutionProps {
  title: string
  description: string
  before: SolutionCard
  after: SolutionCard
}

export function ForeplayProductPageSolution({
  title,
  description,
  before,
  after,
}: ForeplayProductPageSolutionProps) {
  return (
    <div className="mx-auto flex max-w-[940px] flex-col items-stretch gap-9 py-20 text-center max-md:max-w-[480px] max-md:gap-8 max-md:py-12">
      {/* .section-head */}
      <ForeplaySectionHead
        title={title}
        description={description}
        variant="dark"
      />

      {/* .product-page-solution-grid */}
      <div className="grid auto-cols-fr grid-cols-2 gap-4 self-stretch max-md:grid-cols-1">
        {/* Before card — fixed 462×466 to match the Foreplay reference design */}
        <div className="flex h-[466px] w-[462px] flex-col gap-5 overflow-hidden rounded-[20px] p-0 shadow-[inset_0_0_0_1px_var(--fp-solid-50)] max-md:h-auto max-md:w-full">
          {/* .static-product-page-solution-text */}
          <div className="px-5 pt-5">
            {/* .home-winning-card-text > .flex-col-gap-1.align-start */}
            <div className="flex flex-col items-start gap-1">
              <div className="text-[var(--fp-solid-900)]">
                <div className={fpText.labelL}>
                  {before.label}
                </div>
              </div>
              {before.description && (
                <div className="text-[var(--fp-solid-500)]">
                  <div>{before.description}</div>
                </div>
              )}
            </div>
          </div>
          {/* .static-before-wrapper — visual node wins over imageSrc when both present */}
          {before.visual ? (
            <div className="relative flex flex-1 items-center">{before.visual}</div>
          ) : before.imageSrc ? (
            <div className="relative z-[-1]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={before.imageSrc}
                alt={before.imageAlt ?? ""}
                className="relative w-full"
                loading="lazy"
              />
            </div>
          ) : null}
        </div>

        {/* After card — fixed 462×466 to match the Foreplay reference design */}
        <div className="flex h-[466px] w-[462px] flex-col gap-5 overflow-hidden rounded-[20px] bg-background p-0 text-muted-foreground max-md:h-auto max-md:w-full">
          {/* .static-product-page-solution-text */}
          <div className="px-5 pt-5">
            <div className="flex flex-col items-start gap-1">
              <div className="text-foreground">
                <div className={fpText.labelL}>
                  {after.label}
                </div>
              </div>
              {after.description && (
                <div className="text-[var(--fp-alpha-100)]">
                  <div>{after.description}</div>
                </div>
              )}
            </div>
          </div>
          {after.visual ? (
            <div className="relative flex flex-1 items-center">{after.visual}</div>
          ) : after.imageSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={after.imageSrc}
              alt={after.imageAlt ?? ""}
              className="relative w-full"
              loading="lazy"
            />
          ) : null}
        </div>
      </div>
    </div>
  )
}
