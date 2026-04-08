// Blog featured card — .featured-blog-wrapper > .featured-blog-link
// CSS .featured-blog-link: flex col, gap-6, color body
// CSS .featured-blog-cover: border 1px grey-stroke, rounded-[20px], overflow hidden, transition
// CSS .featured-blog-image: object-fit cover, w/h 100%
// CSS .featured-blog-content: flex col, gap-3, text-left, items-start
// Title: text-display-h3 (2.25rem/2.75rem, 600, Inter Display)
// Excerpt: text-alpha-100 > text-body-m
// Author: .blog-feed-author > avatar + text-body-s name + separator + read time

import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { fpText } from "@/components/foreplay/foreplay-typography"
import type { BlogPost } from "@/data/blog-posts"

interface BlogFeaturedCardProps {
  post: BlogPost
  className?: string
}

export function BlogFeaturedCard({ post, className }: BlogFeaturedCardProps) {
  return (
    <div className={cn("featured-blog-wrapper", className)}>
      {/* .featured-blog-link: flex col, gap-6 */}
      <Link
        href={`/blog/${post.slug}`}
        className="group flex flex-col gap-6 text-foreground hover:opacity-80"
      >
        {/* .featured-blog-cover: border grey-stroke, rounded-[20px], overflow-hidden */}
        <div className="overflow-hidden rounded-[20px] border border-[#7a7b7f40] transition-all duration-200">
          {/* .featured-blog-image: object-cover, w/h 100% */}
          <Image
            src={post.coverImage}
            alt={post.title}
            width={720}
            height={360}
            loading="eager"
            className="size-full object-cover"
          />
        </div>

        {/* .featured-blog-content: flex col, gap-3, text-left, items-start */}
        <div className="flex flex-col items-start gap-3 text-left">
          {/* h2.text-display-h3 */}
          <h2 className={cn(fpText.displayH3, "text-foreground")}>
            {post.title}
          </h2>
          {/* .text-alpha-100 > p.text-body-m */}
          <div className="text-[var(--fp-alpha-100,#ffffffad)]">
            <p className={fpText.bodyM}>{post.description}</p>
          </div>
        </div>
      </Link>

      {/* .blog-feed-author: gap-2, items-center, pt-3 */}
      <div className="flex items-center gap-2 pt-3">
        <div className="size-6 shrink-0 overflow-hidden rounded-full">
          <Image
            src={post.author.avatar}
            alt={post.author.name}
            width={24}
            height={24}
            className="size-full object-cover"
          />
        </div>
        <span className={cn(fpText.bodyS, "text-foreground")}>
          {post.author.name}
        </span>
        <span className="text-[var(--fp-alpha-100,#ffffffad)]">·</span>
        <span className={cn(fpText.bodyS, "text-[var(--fp-alpha-100,#ffffffad)]")}>
          {post.readTime}
        </span>
      </div>
    </div>
  )
}
