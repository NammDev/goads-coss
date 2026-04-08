// Blog category bar — .blog-categories > .blog-tag
// CSS .blog-categories: flex, gap-[15px], border-y neutral-700, py-9
// CSS .blog-tag: shadow ring neutral-700, rounded-[10px], py-1.5 px-3, color neutral-25, transition
// CSS .blog-tag:hover: bg neutral-800
// Active: bg foreground, text background (invert)

"use client"

import { cn } from "@/lib/utils"
import { fpText } from "@/components/foreplay/foreplay-typography"

interface BlogCategoryBarProps {
  categories: readonly string[]
  active: string
  onSelect: (category: string) => void
  className?: string
}

export function BlogCategoryBar({
  categories,
  active,
  onSelect,
  className,
}: BlogCategoryBarProps) {
  return (
    // .blog-categories: flex, gap-[15px], border-y, py-9
    <div
      className={cn(
        "flex flex-wrap gap-[15px] border-y border-[#ffffff1a] py-9",
        className,
      )}
    >
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => onSelect(cat)}
          className={cn(
            // .blog-tag: ring, rounded-[10px], px-3 py-1.5, transition
            fpText.labelS,
            "rounded-[10px] px-3 py-1.5 transition-all duration-200",
            active === cat
              ? "bg-foreground text-background shadow-none"
              : "text-[var(--fp-alpha-50,#ffffffeb)] shadow-[0_0_0_1px_#ffffff1a] hover:bg-[#ffffff0f]",
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
