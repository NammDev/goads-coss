// Blog featured card — .featured-blog-wrapper > .featured-blog-link
// CSS .featured-blog-link:    flex col, gap-6 (24px), color body
// CSS .featured-blog-cover:   border 1px grey-stroke, rounded-[20px], overflow hidden, transition
// CSS .featured-blog-image:   object-fit cover, w/h 100%
// CSS .featured-blog-content: flex col, gap-3 (12px), text-left, items-start
// CSS .blog-feed-author:      flex items-center, pt-3 (12px) — NO parent gap, uses inline 7px margins
// CSS .thumbnail-author-avatar: 25×25, rounded-full, mr-[7px]
// CSS .text-seperator:        1px × 20px, mx-[7px], bg grey-stroke
// Title: text-display-h3 (Inter Display 2.25rem/2.75rem 600)
// Excerpt: text-alpha-100 > text-body-m

import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { fpText } from "@/components/foreplay/foreplay-typography"
import type { BlogPost } from "@/data/blog-posts"

interface BlogFeaturedCardProps {
  post: BlogPost
  /** Base path for post links — defaults to "/foreplay/blog" */
  basePath?: string
  className?: string
}

export function BlogFeaturedCard({ post, basePath = "/foreplay/blog", className }: BlogFeaturedCardProps) {
  return (
    <div className={cn("featured-blog-wrapper", className)}>
      {/* .featured-blog-link: flex col, gap-6 */}
      <Link
        href={`${basePath}/${post.slug}`}
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
          {/* h2.text-display-h3.mobile-landscape-text-display-h4 — 2.25rem desktop, 1.75rem mobile */}
          <h2
            className={cn(
              fpText.displayH3,
              "max-md:text-[1.75rem] max-md:leading-9",
              "text-foreground",
            )}
          >
            {post.title}
          </h2>
          {/* .text-alpha-100 > p.text-body-m */}
          <div className="text-[var(--fp-alpha-100,#ffffffad)]">
            <p className={fpText.bodyM}>{post.description}</p>
          </div>
        </div>
      </Link>

      {/* .blog-feed-author: flex items-center, pt-3 (12px) — uses inline 7px margins, not gap */}
      <div className="flex items-center pt-3">
        {/* .blog-thumbnail-author-link: avatar + name flex items-center */}
        <div className="flex items-center">
          {/* .thumbnail-author-avatar: 25×25, rounded-full, mr-[7px] */}
          <div className="mr-[7px] size-[25px] shrink-0 overflow-hidden rounded-full">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={25}
              height={25}
              className="size-full object-cover"
            />
          </div>
          <span className={cn(fpText.bodyS, "text-foreground")}>
            {post.author.name}
          </span>
        </div>
        {/* .text-seperator: 1px × 20px, mx-[7px] */}
        <span
          aria-hidden
          className="mx-[7px] block h-5 w-px shrink-0 bg-[#7a7b7f40]"
        />
        <span className={cn(fpText.bodyS, "text-[var(--fp-alpha-100,#ffffffad)]")}>
          {post.readTime}
        </span>
      </div>
    </div>
  )
}
