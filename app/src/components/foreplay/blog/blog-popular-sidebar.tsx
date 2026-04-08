// Blog popular sidebar — .blog-feed-wrapper
// CSS .blog-feed-wrapper: flex col, gap-5, border-top grey-stroke, mt-[25px] pt-[25px]
// Header: .text-alpha-100 > h2.text-overline — "Popular Blogs"
// Items: .blog-feed-content > .blog-feed-link (flex col, gap-1)
//   Title: h3.text-label-m
//   Subtitle: .blog-feed-subttext > .text-alpha-100 > .text-body-s.line-clamp-2
// Author: .blog-feed-author: gap-2, items-center, pt-3
//   Name: .text-body-s
//   Separator + read time

import Link from "next/link"

import { cn } from "@/lib/utils"
import { fpText } from "@/components/foreplay/foreplay-typography"
import type { BlogPost } from "@/data/blog-posts"

interface BlogPopularSidebarProps {
  posts: BlogPost[]
  className?: string
}

export function BlogPopularSidebar({ posts, className }: BlogPopularSidebarProps) {
  return (
    // .blog-feed-wrapper: flex col, gap-5, border-top, mt/pt-[25px]
    <div className={cn("flex flex-col gap-5", className)}>
      {/* .text-alpha-100 > h2.text-overline: "Popular Blogs" */}
      <div className="text-[var(--fp-alpha-100,#ffffffad)]">
        <h2 className={fpText.overline}>Popular Blogs</h2>
      </div>

      {/* collection list */}
      <div className="flex flex-col divide-y divide-[#ffffff1a]">
        {posts.map((post) => (
          <div key={post.slug} className="py-4 first:pt-0 last:pb-0">
            {/* .text-white > .blog-feed-content */}
            <div className="text-foreground">
              <div className="flex flex-col gap-1">
                {/* .blog-feed-link: flex col, gap-1, hover opacity 0.8 */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex flex-col gap-1 hover:opacity-80"
                >
                  {/* h3.text-label-m */}
                  <h3 className={fpText.labelM}>{post.title}</h3>
                  {/* .blog-feed-subttext > .text-alpha-100 > .text-body-s.line-clamp-2 */}
                  <div className="text-[var(--fp-alpha-100,#ffffffad)]">
                    <div className={cn(fpText.bodyS, "line-clamp-2")}>
                      {post.description}
                    </div>
                  </div>
                </Link>
              </div>

              {/* .blog-feed-author: gap-2, items-center, pt-3 */}
              <div className="flex items-center gap-2 pt-3">
                <span className={cn(fpText.bodyS, "text-foreground")}>
                  {post.author.name}
                </span>
                <span className="text-[var(--fp-alpha-100,#ffffffad)]">·</span>
                <span className={cn(fpText.bodyS, "text-[var(--fp-alpha-100,#ffffffad)]")}>
                  {post.readTime}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
