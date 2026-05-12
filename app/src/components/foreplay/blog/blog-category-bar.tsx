// Blog category bar — .blog-categories
//
// Foreplay DOM:
// <div class="blog-categories">                  flex items-start gap-[15px], border-y, py-9 desktop / flex-col mobile
//   <div class="categories-title">               flex:none
//     <div class="text-alpha-100">
//       <div class="text-body-m">Topics & Categories:</div>
//     </div>
//   </div>
//   <div class="w-dyn-list">
//     <div class="collection-list-6 w-dyn-items"> flex-wrap gap-2 (0.5em = 8px)
//       <a class="blog-tag">...</a>
//     </div>
//   </div>
// </div>
//
// CSS:
// .blog-categories:    desktop flex-row items-start gap-[15px] border-y py-9, mobile flex-col
// .categories-title:   flex:none (no shrink)
// .collection-list-6:  flex-wrap gap-2 (8px)
// .blog-tag:           shadow ring neutral-700, rounded-[10px], py-1.5 px-3, color neutral-25, transition

"use client"

import { cn } from "@/lib/utils"
import { fpText } from "@/components/foreplay/foreplay-typography"

interface BlogCategoryBarProps {
  categories: readonly string[]
  active: string
  onSelect: (category: string) => void
  titleLabel?: string
  className?: string
}

export function BlogCategoryBar({
  categories,
  active,
  onSelect,
  titleLabel = "Topics & Categories:",
  className,
}: BlogCategoryBarProps) {
  return (
    // .blog-categories: desktop flex-row items-start gap-[15px] border-y py-9, mobile flex-col
    <div
      className={cn(
        "flex flex-col items-start gap-[15px] border-y border-[#ffffff1a] py-9 md:flex-row",
        className,
      )}
    >
      {/* .categories-title: flex:none → no shrink */}
      <div className="shrink-0 grow-0 basis-auto">
        {/* .text-alpha-100 > .text-body-m */}
        <div className={cn(fpText.bodyM, "text-[var(--fp-alpha-100,#ffffffad)]")}>
          {titleLabel}
        </div>
      </div>

      {/* .collection-list-6: flex-wrap gap-2 (0.5em = 8px) */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => onSelect(cat)}
            className={cn(
              // .blog-tag: ring, rounded-[10px], px-3 py-1.5, transition, cursor-pointer
              fpText.labelS,
              "cursor-pointer rounded-[10px] px-3 py-1.5 transition-all duration-200",
              active === cat
                ? "bg-foreground text-background shadow-none"
                : "text-[var(--fp-alpha-50,#ffffffeb)] shadow-[0_0_0_1px_#ffffff1a] hover:bg-[#ffffff0f]",
            )}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  )
}
