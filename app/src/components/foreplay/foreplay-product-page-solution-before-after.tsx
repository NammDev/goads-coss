// Foreplay product page solution — .product-page-solution (Before/After cards)
// DOM: section.section > .section-padding > .section-white-block > .container.section-container > .product-page-solution
// .product-page-solution: flex col, gap-9 (36px), text-center, max-w-[940px], mx-auto, py-20 (80px desktop)
// .product-page-solution-grid: grid 2col, gap-4
// .static-product-page-solution-card: gap-5, inset border, rounded-[20px], flex col, p-0, overflow-hidden
// .solution-after: bg-background, no shadow

import { ForeplaySectionHead } from "@/components/foreplay/foreplay-section-head"

interface SolutionCard {
  label: string
  description: string
  imageSrc: string
  imageAlt?: string
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
        {/* Before card — .static-product-page-solution-card */}
        <div className="flex flex-col gap-5 overflow-hidden rounded-[20px] p-0 shadow-[inset_0_0_0_1px_var(--fp-solid-50)]">
          {/* .static-product-page-solution-text */}
          <div className="px-5 pt-5">
            {/* .home-winning-card-text > .flex-col-gap-1.align-start */}
            <div className="flex flex-col items-start gap-1">
              <div className="text-[var(--fp-solid-900)]">
                <div className="font-sans text-[1.125rem] font-medium leading-6 tracking-[-0.0144em]">
                  {before.label}
                </div>
              </div>
              <div className="text-[var(--fp-solid-500)]">
                <div>{before.description}</div>
              </div>
            </div>
          </div>
          {/* .static-before-wrapper */}
          {before.imageSrc && (
            <div className="relative z-[-1]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={before.imageSrc}
                alt={before.imageAlt ?? ""}
                className="relative w-full"
                loading="lazy"
              />
            </div>
          )}
        </div>

        {/* After card — .static-product-page-solution-card.solution-after */}
        <div className="flex flex-col gap-5 overflow-hidden rounded-[20px] bg-background p-0 text-muted-foreground">
          {/* .static-product-page-solution-text */}
          <div className="px-5 pt-5">
            <div className="flex flex-col items-start gap-1">
              <div className="text-foreground">
                <div className="font-sans text-[1.125rem] font-medium leading-6 tracking-[-0.0144em]">
                  {after.label}
                </div>
              </div>
              <div className="text-[var(--fp-alpha-100)]">
                <div>{after.description}</div>
              </div>
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={after.imageSrc}
            alt={after.imageAlt ?? ""}
            className="relative w-full"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )
}
