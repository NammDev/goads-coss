// Blog listing — section > .container.section-container > .blog-feed
//
// Foreplay DOM:
// <section><.container.section-container>
//   <div class="blog-feed">                       flex col gap-9 (36px) pb-[120px]
//     <div class="blog-related-head">             Explore More Blogs heading + description
//     <div class="blog-categories">               border-y, py-9, title + tags
//     <div class="blog-list">                     3-col grid
//     <div class="blog-pagination">
//   </div>
//
// CSS .blog-feed: gap-9 (36px), flex col, padding-top:0, padding-bottom:120px

"use client"

import { useState, useMemo } from "react"

import { ForeplaySectionContainer } from "@/components/foreplay/foreplay-section-container"
import { BlogCard } from "@/components/foreplay/blog/blog-card"
import { BlogCategoryBar } from "@/components/foreplay/blog/blog-category-bar"
import { BlogPagination } from "@/components/foreplay/blog/blog-pagination"
import { BlogRelatedHead } from "@/components/foreplay/blog/blog-related-head"
import { blogCategories, type BlogPost } from "@/data/blog-posts"

const POSTS_PER_PAGE = 6

interface BlogListingProps {
  posts: BlogPost[]
  /** Base path for post links — defaults to "/foreplay/blog" */
  basePath?: string
}

export function BlogListing({ posts, basePath = "/foreplay/blog" }: BlogListingProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All")
  const [currentPage, setCurrentPage] = useState(1)

  const filtered = useMemo((): BlogPost[] => {
    if (activeCategory === "All") return posts
    return posts.filter((p) => p.category === activeCategory)
  }, [posts, activeCategory])

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE)
  const paged = filtered.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  )

  function handleCategoryChange(cat: string) {
    setActiveCategory(cat)
    setCurrentPage(1)
  }

  return (
    <section>
      <ForeplaySectionContainer>
        {/* .blog-feed: flex col, gap-9 (36px), pb-[120px] */}
        <div className="flex flex-col gap-9 pb-[120px]">
          {/* .blog-related-head: Explore More Blogs + subtitle */}
          <BlogRelatedHead
            title="Explore More Blogs"
            description="Learn more about how to get the most from your advertising."
          />

          {/* .blog-categories: title + tag pills, border-y, py-9 */}
          <BlogCategoryBar
            categories={blogCategories}
            active={activeCategory}
            onSelect={handleCategoryChange}
          />

          {/* .blog-list: grid 3-col desktop → 2-col tablet → 1-col mobile, gap-6 */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {paged.map((post) => (
              <BlogCard key={post.slug} post={post} basePath={basePath} />
            ))}
          </div>

          {paged.length === 0 && (
            <p className="py-16 text-center text-[var(--fp-alpha-100,#ffffffad)]">
              No articles found in this category yet.
            </p>
          )}

          {/* .blog-pagination */}
          <BlogPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </ForeplaySectionContainer>
    </section>
  )
}
