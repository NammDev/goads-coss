// Blog related head — .blog-related-head
//
// Foreplay DOM:
// <div class="blog-related-head">                    flex col gap-2 (8px)
//   <div class="text-white">                         color:#fff; flex:1
//     <h2 class="text-heading-l">Explore More Blogs</h2>
//   </div>
//   <div class="text-alpha-100">                     color:#ffffffad
//     <div class="text-body-m">Learn more...</div>
//   </div>
// </div>
//
// CSS:
// .blog-related-head: gap-2, flex col
// .text-heading-l:    Inter 1.125rem/1.5rem 550, tracking -0.0144em
// .text-body-m:       Inter 1rem/1.5rem 400, tracking -0.01125em

import { cn } from "@/lib/utils"
import { fpText } from "@/components/foreplay/foreplay-typography"

interface BlogRelatedHeadProps {
  title: string
  description?: string
  className?: string
}

export function BlogRelatedHead({
  title,
  description,
  className,
}: BlogRelatedHeadProps) {
  return (
    // .blog-related-head: flex col gap-2
    <div className={cn("flex flex-col gap-2", className)}>
      {/* .text-white wrapper */}
      <div className="text-foreground">
        <h2 className={fpText.headingL}>{title}</h2>
      </div>
      {description && (
        // .text-alpha-100 wrapper
        <div className="text-[var(--fp-alpha-100,#ffffffad)]">
          <p className={fpText.bodyM}>{description}</p>
        </div>
      )}
    </div>
  )
}
