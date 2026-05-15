// Blog hero — section#product-hero-section > .fireside-hero > .container.section-container
// CSS .fireside-hero: flex col, center, pt-20 pb-20 (desktop), pt-10 pb-10 (mobile), relative
// Hero text: .text-overline "Blog" + .text-display-h1.hero-title subtitle
// Grid: .blog-header-grid — 6-col grid (desktop), flex-col (mobile)
// Left: .featured-blog-wrapper (col 1-4)
// Right: .blog-feed-wrapper (col 5-6) — popular blogs

import { cn } from "@/lib/utils"
import { ForeplaySectionContainer } from "@/components/foreplay/foreplay-section-container"
import { fpText, FP_HERO_GRADIENT } from "@/components/foreplay/foreplay-typography"
import { BlogFeaturedCard } from "@/components/foreplay/blog/blog-featured-card"
import { BlogPopularSidebar } from "@/components/foreplay/blog/blog-popular-sidebar"
import type { BlogPost } from "@/data/blog-posts"

interface BlogHeroProps {
  featuredPost?: BlogPost
  popularPosts?: BlogPost[]
  /** Base path for post links — defaults to "/blog" */
  basePath?: string
}

export function BlogHero({ featuredPost, popularPosts, basePath = "/blog" }: BlogHeroProps = {}) {
  return (
    <section className="relative">
      {/* .fireside-hero: flex col, center, pt-20 pb-20 (desktop) */}
      <div className="flex flex-col items-center justify-start pb-20 pt-20 text-center">
        <ForeplaySectionContainer>
          {/* .product-hero-content: flex col, gap-7 (28px) */}
          <div className="flex flex-col items-center gap-7">
            {/* .hero-text: flex col, gap-4, items-center, max-w-[900px] */}
            <div className="flex max-w-[900px] flex-col items-center gap-4">
              {/* h1.text-overline.text-white-68 — Foreplay's .text-overline has NO color.
                  .text-white-68 class doesn't exist in CSS — vestigial. Inherits body color
                  var(--_lens---neutral-300) = #ffffff5c (36% white) */}
              <div>
                <h1 className={cn(fpText.overline, "text-[var(--fp-alpha-300,#ffffff5c)]")}>
                  Blog
                </h1>
              </div>
              {/* h2.text-display-h1.hero-title — gradient text */}
              <h2
                className={cn(
                  fpText.displayH1,
                  FP_HERO_GRADIENT,
                  "text-balance",
                )}
              >
                Free insights and guides for better ad accounts
              </h2>
            </div>
          </div>

          {/* .section-content-main: padding-top:48px desktop, 40px mobile */}
          {/* .w-layout-grid.blog-header-grid:
              desktop ≥992px → grid 6×1fr, col-gap 50px, row-gap 0
              mobile <992px  → flex-col (gap inherited from .w-layout-grid row-gap 16px, but sidebar handles its own mt/border) */}
          {featuredPost && popularPosts && (
            <div className="pt-10 lg:pt-12">
              <div className="flex flex-col lg:grid lg:grid-cols-6 lg:gap-x-[50px]">
                {/* .featured-blog-wrapper: grid-area span 1/span 4 → col-span-4 desktop */}
                <BlogFeaturedCard post={featuredPost} basePath={basePath} className="lg:col-span-4" />

                {/* .blog-feed-wrapper: grid-area span 1/span 2 → col-span-2 desktop
                    Mobile: mt-25 + border-top + pt-25 (per responsive override) */}
                <BlogPopularSidebar
                  posts={popularPosts}
                  basePath={basePath}
                  className="mt-[25px] border-t border-[#7a7b7f40] pt-[25px] lg:col-span-2 lg:mt-0 lg:border-t-0 lg:pt-0"
                />
              </div>
            </div>
          )}
        </ForeplaySectionContainer>
      </div>
    </section>
  )
}
