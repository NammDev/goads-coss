// Blog related carousel — pixel-exact clone of Foreplay's `.blog-related-list`
//
// Foreplay DOM:
// <div class="blog-related-list" style="transform: translateX(0px);">
//   <div class="blog-related-collection-item">
//     <a class="blog-carousel-card">
//       <div class="blog-carousel-card-cover">
//         <img class="blog-carousel-card-image">
//       <div class="blog-carousel-card-content">
//         <div class="blog-carousel-card-author">
//           <div class="blog-carousel-card-author-avatar"><img></div>
//           <div class="text-white"><div class="text-label-s">{name}</div></div>
//         <div class="blog-carousel-card-text">
//           <div class="text-white"><div class="text-label-l">{title}</div></div>
//           <div class="line-clamp-2"><div class="text-alpha-100"><div class="text-body-m">{desc}</div></div></div>
//
// CSS (per foreplay-source.css):
// .blog-carousel-card:      ring 1px neutral-700 (#ffffff1a), rounded-[20px], flex-none,
//                           w-[40vw] max-w-[480px], h-full, overflow-hidden
//   responsive: w-[50vw] mid, w-[calc(100vw-48px)] mobile
// .blog-carousel-card-cover: aspect-[465/264], bg gradient #ffffff0a → #ffffff14
// .blog-carousel-card-content: flex col gap-4 (16px), p-[32px_24px_24px] desktop / p-[20px_20px_16px] mobile, flex-1
// .blog-carousel-card-author: flex items-center gap-3 (12px)
// .blog-carousel-card-author-avatar: 28×28 round, flex:none, overflow-hidden
// .blog-carousel-card-text: flex col gap-2 (8px), items-start
//
// .blog-related-list:       flex row gap-4 (16px), pb-2 (8px), scroll-snap-type x proximity,
//                           translateX transition 600ms cubic-bezier(.19,1,.22,1)

"use client"

import { useCallback, useState } from "react"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { fpText } from "@/components/foreplay/foreplay-typography"
import { ForeplayCarouselArrows } from "@/components/foreplay/foreplay-carousel-arrows"
import type { BlogPost } from "@/data/blog-posts"

interface BlogRelatedCarouselProps {
  posts: BlogPost[]
  currentSlug: string
}

// Card max width 480px + 16px gap → 496px slide step at desktop
const CARD_MAX_WIDTH = 480
const CARD_GAP = 16

export function BlogRelatedCarousel({ posts, currentSlug }: BlogRelatedCarouselProps) {
  const related = posts.filter((p) => p.slug !== currentSlug).slice(0, 6)
  const [index, setIndex] = useState(0)

  const canPrev = index > 0
  const canNext = index < related.length - 1

  const goTo = useCallback(
    (dir: "left" | "right") => {
      setIndex((prev) =>
        dir === "left"
          ? Math.max(0, prev - 1)
          : Math.min(related.length - 1, prev + 1),
      )
    },
    [related.length],
  )

  if (related.length === 0) return null

  return (
    <div className="section">
      <div className="flex flex-col overflow-hidden py-[108px] max-md:py-24 max-sm:py-20">
        <div className="block pt-12 max-md:pt-10">
          {/* .blog-related-head: .container.blog-container (max-w-832 + px-10), left-aligned */}
          <div className="mx-auto w-full max-w-[832px] px-6 md:px-8 lg:px-10">
            <div className="flex flex-col gap-2">
              <div className="text-foreground">
                <h2 className={fpText.headingL}>Related Articles</h2>
              </div>
              <div className="text-[var(--fp-alpha-100,#ffffffad)]">
                <p className={fpText.bodyM}>
                  You might also like these reads on similar themes.
                </p>
              </div>
            </div>
          </div>

          {/* .product-carousel — relative wrapper; viewport in same blog-container 832 — cards overflow to right */}
          <div className="relative">
            <div className="mx-auto w-full max-w-[832px] px-6 md:px-8 lg:px-10">
              {/* .product-carousel-viewport: flex col gap-12 pt-16 */}
              <div className="flex flex-col gap-12 pt-16">
                {/* .blog-related-list: flex row gap-4 pb-2, translateX transition */}
                <div
                  className="flex items-stretch gap-4 pb-2 transition-transform duration-[600ms] [transition-timing-function:cubic-bezier(0.19,1,0.22,1)]"
                  style={{
                    transform: `translateX(-${index * (CARD_MAX_WIDTH + CARD_GAP)}px)`,
                  }}
                >
                  {related.map((post) => (
                    // .blog-related-collection-item
                    <div key={post.slug} className="flex-none">
                      {/* .blog-carousel-card: ring 1px neutral-700, rounded-20, w-[40vw] max-w-[480px], flex-none, overflow-hidden */}
                      <Link
                        href={`/blog/${post.slug}`}
                        className={cn(
                          "group flex h-full w-[40vw] max-w-[480px] flex-none cursor-pointer flex-col overflow-hidden rounded-[20px]",
                          "shadow-[0_0_0_1px_#ffffff1a] transition-shadow duration-200",
                          "hover:shadow-[0_0_0_1px_#ffffff29]",
                          "max-md:w-[50vw] max-sm:w-[calc(100vw-48px)]",
                        )}
                      >
                        {/* .blog-carousel-card-cover: aspect 465/264, bg gradient */}
                        <div className="aspect-[465/264] w-full overflow-hidden bg-gradient-to-b from-[#ffffff0a] to-[#ffffff14]">
                          {/* .blog-carousel-card-image: object-fit cover, w/h 100% */}
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            width={720}
                            height={410}
                            className="size-full object-cover"
                            sizes="(max-width: 767px) 100vw, (max-width: 1439px) 50vw, 480px"
                          />
                        </div>

                        {/* .blog-carousel-card-content: flex col gap-4, p-[32_24_24] / p-[20_20_16] mobile, flex-1 */}
                        <div className="flex flex-1 flex-col gap-4 px-6 pb-6 pt-8 max-sm:px-5 max-sm:pb-4 max-sm:pt-5">
                          {/* .blog-carousel-card-author: flex items-center gap-3 */}
                          <div className="flex items-center gap-3">
                            {/* .blog-carousel-card-author-avatar: 28×28 round */}
                            <div className="size-7 shrink-0 overflow-hidden rounded-full">
                              <Image
                                src={post.author.avatar}
                                alt={post.author.name}
                                width={28}
                                height={28}
                                className="size-full object-cover"
                              />
                            </div>
                            {/* .text-white > .text-label-s */}
                            <div className="text-foreground">
                              <div className={fpText.labelS}>{post.author.name}</div>
                            </div>
                          </div>

                          {/* .blog-carousel-card-text: flex col gap-2 items-start */}
                          <div className="flex flex-col items-start gap-2">
                            {/* .text-white > .text-label-l (NO line-clamp on the inner — title can be 1-2 lines naturally) */}
                            <div className="text-foreground">
                              <div className={fpText.labelL}>{post.title}</div>
                            </div>
                            {/* .line-clamp-2 > .text-alpha-100 > .text-body-m */}
                            <div className="line-clamp-2">
                              <div className="text-[var(--fp-alpha-100,#ffffffad)]">
                                <div className={fpText.bodyM}>{post.description}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>

                {/* .slide-arrows */}
                <ForeplayCarouselArrows
                  onPrev={() => goTo("left")}
                  onNext={() => goTo("right")}
                  canPrev={canPrev}
                  canNext={canNext}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
