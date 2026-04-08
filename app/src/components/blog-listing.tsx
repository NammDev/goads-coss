// Blog listing — section > .container.section-container
// .blog-categories: category filter bar
// .blog-list: grid 3-col (desktop) → 2-col → 1-col, gap-6
// .blog-pagination: page count + next/prev

"use client"

import { useState, useMemo } from "react"

import { ForeplaySectionContainer } from "@/components/foreplay/foreplay-section-container"
import { BlogCard } from "@/components/foreplay/blog/blog-card"
import { BlogCategoryBar } from "@/components/foreplay/blog/blog-category-bar"
import { BlogPagination } from "@/components/foreplay/blog/blog-pagination"
import { blogCategories, type BlogPost } from "@/data/blog-posts"

const POSTS_PER_PAGE = 6

interface BlogListingProps {
  posts: BlogPost[]
}

export function BlogListing({ posts }: BlogListingProps) {
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
        {/* .blog-categories */}
        <BlogCategoryBar
          categories={blogCategories}
          active={activeCategory}
          onSelect={handleCategoryChange}
        />

        {/* .blog-list: grid, gap-6 */}
        {/* 3-col desktop (source), 2-col tablet, 1-col mobile */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {paged.map((post) => (
            <BlogCard key={post.slug} post={post} />
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
          className="mt-4"
        />
      </ForeplaySectionContainer>
    </section>
  )
}
