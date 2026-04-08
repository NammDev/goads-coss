// Blog detail header — section > .container.section-container
// .blog-breadcrumb: flex, gap-1, items-center, py-10
// .blog-head: flex col, gap-2, text-balance
// .blog-author: flex, gap-4, items-center, py-10
//   avatar 48px + name + title + social links
// .blog-cover: aspect-[1.71], rounded-[20px], relative, overflow-hidden
//   .blog-image: object-cover, aspect-[1.71], w-full
//   .blog-image-border: border 1px neutral-600, rounded-[20px], absolute inset-0

import Image from "next/image"
import Link from "next/link"
import { Linkedin, Twitter } from "lucide-react"

import { cn } from "@/lib/utils"
import { ForeplaySectionContainer } from "@/components/foreplay/foreplay-section-container"
import { fpText } from "@/components/foreplay/foreplay-typography"
import type { BlogPost } from "@/data/blog-posts"

type BlogDetailPost = BlogPost | {
  slug: string
  title: string
  category: string
  categorySlug?: string
  description: string
  author: string
  authorAvatar: string
  date: string
  readTime: string
}

/** Normalize author from either string or object format */
function normalizeAuthor(post: BlogDetailPost) {
  if (typeof post.author === "object") return post.author
  return {
    name: post.author,
    avatar: (post as { authorAvatar?: string }).authorAvatar ?? "/avatars/goads-team.webp",
  }
}

interface BlogDetailHeaderProps {
  post: BlogDetailPost
}

export function BlogDetailHeader({ post }: BlogDetailHeaderProps) {
  const author = normalizeAuthor(post)
  const catSlug = "categorySlug" in post && post.categorySlug ? post.categorySlug : post.category.toLowerCase().replace(/\s+/g, "-")

  return (
    <section className="relative">
      <ForeplaySectionContainer>
        {/* .blog-breadcrumb: flex, gap-1, items-center, py-10, -mx-2 */}
        <nav className="-mx-2 flex items-center gap-1 pb-10 pt-10">
          <Link
            href="/blog"
            className="flex shrink-0 items-center gap-[5px] px-2 py-2 text-[var(--fp-alpha-100,#ffffffad)] hover:text-foreground"
          >
            <span className={fpText.bodyS}>Blog</span>
          </Link>
          {/* .blog-breadcrumb-separator */}
          <span className="text-[var(--fp-alpha-100,#ffffffad)]">/</span>
          <Link
            href={`/blog?category=${catSlug}`}
            className="flex shrink-0 items-center px-2 py-2 text-[var(--fp-alpha-100,#ffffffad)] hover:text-foreground"
          >
            <span className={fpText.bodyS}>{post.category}</span>
          </Link>
          <span className="text-[var(--fp-alpha-100,#ffffffad)]">/</span>
          <span className="truncate px-2 py-2 text-[var(--fp-alpha-100,#ffffffad)]">
            <span className={fpText.bodyS}>{post.title}</span>
          </span>
        </nav>

        {/* .blog-head: flex col, gap-2, text-balance */}
        <div className="flex w-full flex-col gap-2 text-balance">
          <h1 className={cn(fpText.displayH1, "text-foreground")}>
            {post.title}
          </h1>

          {/* .blog-author: flex, gap-4, items-center, py-10 */}
          <div className="flex items-center gap-4 py-10">
            {/* .blog-author-avatar: rounded-full, relative, overflow-hidden */}
            <div className="relative shrink-0 overflow-hidden rounded-full">
              {/* .blog-author-avatar-image: 48px circle */}
              <Image
                src={author.avatar}
                alt={author.name}
                width={48}
                height={48}
                className="size-12 rounded-full"
              />
              {/* .blog-author-avatar-border: border 1px neutral-600, absolute inset-0 */}
              <div className="pointer-events-none absolute inset-0 rounded-full border border-[#ffffff29]" />
            </div>
            <div>
              {/* .text-label-m: author name */}
              <div className={cn(fpText.labelM, "text-foreground")}>
                {author.name}
              </div>
              {/* .text-body-s: author title */}
              {author.title && (
                <div className={cn(fpText.bodyS, "text-[var(--fp-alpha-100,#ffffffad)]")}>
                  {author.title}
                </div>
              )}
            </div>
            {/* .blog-author-links: flex, gap-1, items-center */}
            {author.socials && (
              <div className="flex items-center gap-1">
                {author.socials.linkedin && (
                  <a
                    href={author.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 text-foreground hover:text-[#fffc]"
                  >
                    <Linkedin className="size-4" />
                  </a>
                )}
                {author.socials.twitter && (
                  <a
                    href={author.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 text-foreground hover:text-[#fffc]"
                  >
                    <Twitter className="size-4" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* .blog-cover: aspect-[1.71], rounded-[20px], relative, overflow-hidden */}
        {"coverImage" in post && post.coverImage && (
          <div className="relative aspect-[1.71] w-full overflow-hidden rounded-[20px]">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
            />
            {/* .blog-image-border: border neutral-600, absolute inset-0 */}
            <div className="pointer-events-none absolute inset-0 rounded-[20px] border border-[#ffffff29]" />
          </div>
        )}
      </ForeplaySectionContainer>
    </section>
  )
}
