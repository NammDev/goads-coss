// Blog related carousel — .blog-related
// CSS .blog-related: flex col, gap-9, py-[120px]
// CSS .blog-related-head: flex col, gap-2
// CSS .blog-related-list: flex row, gap-4, scroll-snap-type x proximity, transition
// CSS .blog-carousel-card: ring neutral-700, rounded-[20px], w-[40vw] max-w-[480px], overflow-hidden
// Related collection item: w-[calc(100vw-48px)] on mobile

"use client"

import { useRef } from "react"

import { cn } from "@/lib/utils"
import { ForeplaySectionContainer } from "@/components/foreplay/foreplay-section-container"
import { ForeplayCarouselArrows } from "@/components/foreplay/foreplay-carousel-arrows"
import { fpText } from "@/components/foreplay/foreplay-typography"
import { BlogCard } from "@/components/foreplay/blog/blog-card"
import type { BlogPost } from "@/data/blog-posts"

interface BlogRelatedCarouselProps {
  posts: BlogPost[]
  currentSlug: string
}

export function BlogRelatedCarousel({ posts, currentSlug }: BlogRelatedCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const related = posts.filter((p) => p.slug !== currentSlug).slice(0, 6)

  if (related.length === 0) return null

  function scroll(direction: "prev" | "next") {
    if (!scrollRef.current) return
    const amount = scrollRef.current.clientWidth * 0.6
    scrollRef.current.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    })
  }

  return (
    // .blog-related: flex col, gap-9, py-[120px]
    <section className="py-[120px]">
      <ForeplaySectionContainer>
        {/* .blog-related-head + arrows */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h3 className={cn(fpText.displayH4, "text-foreground")}>
              Related Articles
            </h3>
          </div>
          <ForeplayCarouselArrows
            onPrev={() => scroll("prev")}
            onNext={() => scroll("next")}
            canPrev
            canNext
          />
        </div>

        {/* .blog-related-list: flex row, gap-4, scroll-snap, overflow-x */}
        <div
          ref={scrollRef}
          className="mt-9 flex snap-x snap-proximity gap-4 overflow-x-auto pb-2 scrollbar-none"
          style={{
            transitionProperty: "transform",
            transitionDuration: "0.6s",
            transitionTimingFunction: "cubic-bezier(0.19, 1, 0.22, 1)",
          }}
        >
          {related.map((post) => (
            <div
              key={post.slug}
              className="w-[40vw] max-w-[480px] shrink-0 snap-start"
            >
              <BlogCard post={post} />
            </div>
          ))}
        </div>
      </ForeplaySectionContainer>
    </section>
  )
}
