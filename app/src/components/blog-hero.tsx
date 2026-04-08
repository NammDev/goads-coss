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
}

export function BlogHero({ featuredPost, popularPosts }: BlogHeroProps = {}) {
  return (
    <section className="relative">
      {/* .fireside-hero: flex col, center, pt-20 pb-20 */}
      <div className="flex flex-col items-center justify-start pb-20 pt-20 text-center">
        <ForeplaySectionContainer>
          {/* .product-hero-content */}
          <div>
            {/* .hero-text: flex col, gap-4, items-center */}
            <div className="flex flex-col items-center gap-4">
              {/* h1.text-overline.text-white-68 — "Blog" */}
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
                  "max-w-[900px] text-balance",
                )}
              >
                Free insights and guides for better ad accounts
              </h2>
            </div>
          </div>

          {/* .section-content-main > .blog-header-grid */}
          {/* grid 6-col desktop, flex-col mobile; gap-[50px] */}
          {featuredPost && popularPosts && (
            <div className="mt-16">
              <div className="grid grid-cols-1 gap-[50px] lg:grid-cols-[3fr_2fr]">
                {/* Left: featured post (col 1-4) */}
                <BlogFeaturedCard post={featuredPost} />

                {/* Right: popular blogs (col 5-6) */}
                <BlogPopularSidebar
                  posts={popularPosts}
                  className="border-t border-[#7a7b7f40] pt-[25px] lg:border-t-0 lg:pt-0"
                />
              </div>
            </div>
          )}
        </ForeplaySectionContainer>
      </div>
    </section>
  )
}
