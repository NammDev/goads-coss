// Blog pagination — .blog-pagination
// CSS: flex, gap-2.5, justify-center, items-center, py-5

"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { fpText } from "@/components/foreplay/foreplay-typography"

interface BlogPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

export function BlogPagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: BlogPaginationProps) {
  if (totalPages <= 1) return null

  return (
    // .blog-pagination: flex, gap-2.5, justify-center, items-center, py-5
    <div
      className={cn(
        "flex items-center justify-center gap-2.5 py-5",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="rounded-[10px] p-2 text-[var(--fp-alpha-100,#ffffffad)] transition-colors duration-200 hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
        aria-label="Previous page"
      >
        <ChevronLeft className="size-5" />
      </button>

      {/* .page-count */}
      <span className={cn(fpText.labelS, "text-[var(--fp-alpha-100,#ffffffad)]")}>
        {currentPage} / {totalPages}
      </span>

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="rounded-[10px] p-2 text-[var(--fp-alpha-100,#ffffffad)] transition-colors duration-200 hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
        aria-label="Next page"
      >
        <ChevronRight className="size-5" />
      </button>
    </div>
  )
}
