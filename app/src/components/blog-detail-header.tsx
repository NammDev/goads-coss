// Blog detail header — breadcrumb + narrow hero
//
// Foreplay DOM:
// <section><.container.blog-container max-w-[832px]>
//   .blog-breadcrumb (flex gap-1 items-center -mx-2 py-10)
// <section><.container.blog-container max-w-[832px]>
//   .blog-top (flex col gap-6 pb-10)
//     .blog-head (flex col gap-2 text-balance)
//       .text-white > h1.text-display-h4
//     .blog-body (pb-10)
//       .text-alpha-100 > p.text-body-m
//     .blog-line (h-px bg-neutral-700)
//
// CSS:
// .blog-container:    max-w-[832px]  (NARROW — not full section container)
// .blog-head:         flex col gap-2 text-balance
// .blog-top:          flex col gap-6 pb-10
// .blog-breadcrumb:   flex items-center gap-1 -mx-2 py-10
// .blog-line:         h-px bg-[#ffffff1a]

import Link from "next/link"

import { cn } from "@/lib/utils"
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

interface BlogDetailHeaderProps {
  post: BlogDetailPost
}

export function BlogDetailHeader({ post }: BlogDetailHeaderProps) {
  const catSlug =
    "categorySlug" in post && post.categorySlug
      ? post.categorySlug
      : post.category.toLowerCase().replace(/\s+/g, "-")

  return (
    <>
      {/* .blog-container: max-w-[832px], px from section-container */}
      <section className="relative">
        <div className="mx-auto w-full max-w-[832px] px-6 md:px-8 lg:px-10">
          {/* .blog-breadcrumb: flex gap-1 items-center -mx-2 py-10 */}
          <nav className="-mx-2 flex items-center gap-1 py-10">
            <Link
              href="/blog"
              className={cn(
                fpText.bodyS,
                "shrink-0 px-2 py-2 text-[var(--fp-alpha-100,#ffffffad)] hover:text-foreground",
              )}
            >
              Blog
            </Link>
            <span className={cn(fpText.bodyS, "text-[var(--fp-alpha-100,#ffffffad)]")}>
              /
            </span>
            <Link
              href={`/blog?category=${catSlug}`}
              className={cn(
                fpText.bodyS,
                "shrink-0 px-2 py-2 text-[var(--fp-alpha-100,#ffffffad)] hover:text-foreground",
              )}
            >
              {post.category}
            </Link>
            <span className={cn(fpText.bodyS, "text-[var(--fp-alpha-100,#ffffffad)]")}>
              /
            </span>
            <span
              className={cn(
                fpText.bodyS,
                "truncate px-2 py-2 text-[var(--fp-alpha-100,#ffffffad)]",
              )}
            >
              {post.title}
            </span>
          </nav>
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto w-full max-w-[832px] px-6 md:px-8 lg:px-10">
          {/* .blog-top: flex col gap-6 pb-10 */}
          <div className="flex flex-col gap-6 pb-10">
            {/* .blog-head: flex col gap-2 text-balance */}
            <div className="flex w-full flex-col gap-2 text-balance">
              {/* .text-white > h1.text-display-h4 */}
              <div className="text-foreground">
                <h1 className={fpText.displayH4}>{post.title}</h1>
              </div>
            </div>
            {/* .blog-body > .text-alpha-100 > p.text-body-m */}
            <div className="pb-10">
              <div className="text-[var(--fp-alpha-100,#ffffffad)]">
                <p className={fpText.bodyM}>{post.description}</p>
              </div>
            </div>
            {/* .blog-line: h-px bg-neutral-700 */}
            <div className="h-px bg-[#ffffff1a]" />
          </div>
        </div>
      </section>
    </>
  )
}
