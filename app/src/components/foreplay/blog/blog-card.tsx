// Blog card — .blog-list-card > .blog-carousel-card-cover + .blog-carousel-card-content
// Used in: listing grid + related carousel
// CSS: bg background, shadow ring neutral-700, rounded-[20px], hover bg neutral-900 + ring neutral-500
// Card cover: aspect-[465/264], gradient placeholder
// Card content: flex col, gap-4, p-[32px_24px_24px] (desktop), p-[20px_20px_16px] (mobile)
// Author: 28px avatar + text-label-m name
// Title: text-label-l line-clamp-2
// Excerpt: text-body-m inside text-alpha-100 line-clamp-2

import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { fpText } from "@/components/foreplay/foreplay-typography"
import type { BlogPost } from "@/data/blog-posts"

interface BlogCardProps {
  post: BlogPost
  className?: string
}

export function BlogCard({ post, className }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        // .blog-list-card
        "group block overflow-hidden rounded-[20px] bg-background shadow-[0_0_0_1px_var(--fp-ring-color,#ffffff1a)]",
        "transition-all duration-200",
        "hover:bg-[#ffffff08] hover:shadow-[0_0_0_1px_#fff3]",
        className,
      )}
    >
      {/* .blog-carousel-card-cover */}
      <div className="aspect-[465/264] bg-gradient-to-b from-[#ffffff0a] to-[#ffffff14]">
        <Image
          src={post.coverImage}
          alt={post.title}
          width={720}
          height={410}
          className="size-full object-cover"
          // .blog-carousel-card-image: object-fit cover, w/h 100%
        />
      </div>

      {/* .blog-carousel-card-content: flex col, gap-4, padding */}
      <div className="flex flex-1 flex-col gap-4 px-6 pb-6 pt-8">
        {/* .blog-carousel-card-author: flex, gap-3, items-center */}
        <div className="flex items-center gap-3">
          {/* .blog-carousel-card-author-avatar: 28px circle */}
          <div className="size-7 shrink-0 overflow-hidden rounded-full">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={28}
              height={28}
              className="size-full object-cover"
            />
          </div>
          {/* .text-white > .text-label-m: author name */}
          <div className="flex-1 text-foreground">
            <div className={fpText.labelM}>{post.author.name}</div>
          </div>
        </div>

        {/* .blog-carousel-card-text: flex col, gap-2 */}
        <div className="flex flex-col gap-2">
          {/* .text-white > .text-label-l line-clamp-2: title */}
          <div className="text-foreground">
            <div className={cn(fpText.labelL, "line-clamp-2")}>
              {post.title}
            </div>
          </div>
          {/* .line-clamp-2 > .text-alpha-100 > .text-body-m: excerpt */}
          <div className="line-clamp-2">
            <div className="flex-1 text-[var(--fp-alpha-100,#ffffffad)]">
              <div className={fpText.bodyM}>{post.description}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
