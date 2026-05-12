// Blog pagination — .w-pagination-wrapper.blog-pagination
//
// Foreplay DOM:
// <div role="navigation" aria-label="List" class="w-pagination-wrapper blog-pagination">
//   <div class="div-block-344">                    flex items-center
//     <div class="text-label-m">
//       <div class="text-white">
//         <div class="w-page-count page-count">1 / 8</div>   text-center, w-full
//       </div>
//     </div>
//   </div>
//   <a class="w-pagination-next button-dark button-secondary">  Next button (page < total)
//     <div>Next</div>
//     <svg class="w-pagination-next-icon" /> chevron right 12×12
//   </a>
// </div>
//
// CSS:
// .w-pagination-wrapper: display:flex, flex-wrap:wrap, justify-center  (base — gets overridden)
// .blog-pagination:      flex-flow:row → flex-direction:row + flex-wrap:NOWRAP, gap-2.5 (10px),
//                        justify-center, items-center, py-5 (20px)
// .button-dark.button-secondary: bg-secondary, text-foreground, rounded-[10px], p-2, flex, cursor-pointer
// .w-pagination-next-icon: ml-1 (4px), 12×12
// .w-pagination-previous-icon: mr-1 (4px), 12×12

"use client"

import { cn } from "@/lib/utils"
import { fpText } from "@/components/foreplay/foreplay-typography"

interface BlogPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

// .w-pagination-next-icon: 12×12 chevron, ml-1
function PaginationChevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 12 12"
      width={12}
      height={12}
      className={direction === "right" ? "ml-1" : "mr-1"}
      aria-hidden="true"
    >
      <path
        fill="none"
        stroke="currentColor"
        fillRule="evenodd"
        d={direction === "right" ? "M4 2l4 4-4 4" : "M8 2l-4 4 4 4"}
      />
    </svg>
  )
}

export function BlogPagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: BlogPaginationProps) {
  if (totalPages <= 1) return null

  // .button-dark base: padding:8px (p-2), rounded-[10px], flex items-center, cursor-pointer
  // Inner text gets px-1.5 (matches .button-text-block pattern in ForeplayCtaButton)
  const buttonClass = cn(
    "relative z-[5] flex cursor-pointer items-center rounded-[10px] p-2 no-underline",
    // .button-secondary: bg-secondary, text-foreground, transition .15s
    "bg-secondary text-foreground transition-all duration-150",
    "hover:bg-border active:bg-[var(--fp-alpha-100)]",
    "focus-visible:shadow-[0_0_0_2px_var(--background),0_0_0_3px_white] focus-visible:outline-none",
  )

  const textClass = cn(
    // .button-text-block: px-1.5, z-[2], font-sans font-[550]
    "relative z-[2] px-1.5 font-sans text-base font-[550] leading-6 tracking-[-0.01125em]",
  )

  return (
    // .w-pagination-wrapper.blog-pagination: flex (nowrap per flex-flow:row),
    // justify-center, items-center, gap-2.5 (10px), py-5 (20px)
    // VISUAL ORDER: [Previous]  [page-count]  [Next]
    <nav
      role="navigation"
      aria-label="Pagination"
      className={cn(
        "flex flex-nowrap items-center justify-center gap-2.5 py-5",
        className,
      )}
    >
      {/* .w-pagination-previous.button-dark.button-secondary — only when currentPage > 1 */}
      {currentPage > 1 && (
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous Page"
          className={buttonClass}
        >
          <PaginationChevron direction="left" />
          <span className={textClass}>Previous</span>
        </button>
      )}

      {/* .div-block-344 > .text-label-m > .text-white > .page-count — always centered */}
      <div className="flex items-center">
        <div
          aria-label={`Page ${currentPage} of ${totalPages}`}
          role="heading"
          aria-level={2}
          className={cn(fpText.labelM, "w-full text-center text-foreground")}
        >
          {currentPage} / {totalPages}
        </div>
      </div>

      {/* .w-pagination-next.button-dark.button-secondary — only when currentPage < totalPages */}
      {currentPage < totalPages && (
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next Page"
          className={buttonClass}
        >
          <span className={textClass}>Next</span>
          <PaginationChevron direction="right" />
        </button>
      )}
    </nav>
  )
}
