// Blog detail author — .blog-author (inside .blog-head)
//
// Foreplay DOM (per live foreplay.co/post/api-launch):
// <div class="blog-author">                          flex items-center gap-4, py-6/py-10
//   <div class="blog-author-avatar">                  48px round, relative, overflow-hidden
//     <img class="blog-author-avatar-image" />
//     <div class="blog-author-avatar-border" />      1px ring inset-0
//   </div>
//   <div class="flex-1">                              grow
//     <div class="flex-col-gap-1 align-start">        flex col gap-1 items-start
//       <div class="text-alpha-25">                   #ffffffeb (alpha-25)
//         <div class="text-label-m">{name}</div>
//       </div>
//       <div class="text-alpha-200">                  #ffffff70 (alpha-200)
//         <div class="text-body-s">{title}</div>
//       </div>
//     </div>
//   </div>
//   <div class="blog-author-links">                   flex wrap gap-1 items-center
//     <a class="blog-author-social-link" />           each: padding 4px, color #fff
//       <div class="icon-24"><svg 24×24 /></div>
//     <a class="button-dark button-ghost">More Articles</a>
//   </div>
// </div>

import Link from "next/link"

import { cn } from "@/lib/utils"
import { fpText } from "@/components/foreplay/foreplay-typography"
import { ForeplayCtaButton } from "@/components/foreplay/foreplay-cta-button"
import { BlogAuthorSocialIcon } from "@/components/foreplay/blog/blog-author-social-icon"
import type { BlogAuthor } from "@/data/blog-posts"

interface BlogDetailAuthorProps {
  author: BlogAuthor
  moreArticlesHref?: string
  className?: string
}

export function BlogDetailAuthor({
  author,
  moreArticlesHref = "/blog",
  className,
}: BlogDetailAuthorProps) {
  const socials = author.socials ?? {}
  const entries: { key: string; href: string; label: string }[] = []
  if (socials.website) entries.push({ key: "website", href: socials.website, label: "Author Website Link" })
  if (socials.linkedin) entries.push({ key: "linkedin", href: socials.linkedin, label: "Author LinkedIn Link" })
  if (socials.twitter) entries.push({ key: "twitter", href: socials.twitter, label: "Author Twitter Link" })
  if (socials.instagram) entries.push({ key: "instagram", href: socials.instagram, label: "Author Instagram Link" })
  if (socials.youtube) entries.push({ key: "youtube", href: socials.youtube, label: "Author Youtube Link" })
  if (socials.facebook) entries.push({ key: "facebook", href: socials.facebook, label: "Author Facebook Link" })
  if (socials.tiktok) entries.push({ key: "tiktok", href: socials.tiktok, label: "Author Tiktok Link" })

  return (
    // .blog-author: flex items-center gap-4 py-6
    <div className={cn("flex flex-wrap items-center gap-4 py-6", className)}>
      {/* .blog-author-avatar: 48px round + 1px white-29 border ring */}
      <div className="relative size-12 shrink-0 overflow-hidden rounded-full">
        <img
          src={author.avatar}
          alt={author.name}
          className="size-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 rounded-full border border-[#ffffff29]" />
      </div>

      {/* .flex-1 — grow, contains name + title */}
      <div className="flex-1">
        {/* .flex-col-gap-1.align-start */}
        <div className="flex flex-col items-start gap-1">
          {/* .text-alpha-25 > .text-label-m */}
          <div className="text-[var(--fp-alpha-25,#ffffffeb)]">
            <div className={fpText.labelM}>{author.name}</div>
          </div>
          {author.title && (
            // .text-alpha-200 > .text-body-s
            <div className="text-[var(--fp-alpha-200,#ffffff70)]">
              <div className={fpText.bodyS}>{author.title}</div>
            </div>
          )}
        </div>
      </div>

      {/* .blog-author-links: flex wrap gap-1 items-center */}
      <div className="flex flex-wrap items-center gap-1">
        {entries.map((s) => (
          <Link
            key={s.key}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            // .blog-author-social-link: color #fff, padding 4px, cursor-pointer
            className="flex cursor-pointer items-center justify-center p-1 text-foreground transition-opacity hover:opacity-[0.68]"
          >
            {/* .icon-24 */}
            <span className="flex size-6 items-center justify-center">
              <BlogAuthorSocialIcon name={s.key} />
            </span>
          </Link>
        ))}
        {/* More Articles ghost button — chevron right */}
        <ForeplayCtaButton
          href={moreArticlesHref}
          variant="ghost"
          showIcon
          className="ml-1"
        >
          More Articles
        </ForeplayCtaButton>
      </div>
    </div>
  )
}
