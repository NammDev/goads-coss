// Blog detail content — 3-col main wrapper
//
// Foreplay DOM (per live foreplay.co/post/api-launch):
// <.blog-main-wrapper>            grid [1fr minmax(752px,1fr) 1fr] gap-9 items-start
//   <.blog-toc-wrapper sticky top-120>           ← LEFT
//   <.blog-main flex col gap-10>                 ← CENTER
//     <.blog-head>                                 cover + author (combined)
//       <.blog-cover>                              aspect-1.71 rounded-20 + .blog-image-border
//         <img.blog-image>
//         <.blog-image-border>
//       <.blog-author>                             flex items-center gap-4 py-6
//         <.blog-author-avatar>  + .flex-1(name+title)  + .blog-author-links
//     <.blog-line>                                 h-px bg neutral-700
//     <.blog-body>
//       <.blog-rtb>                                Foreplay-exact rich text (see globals.css)
//   <.blog-cta sticky>                            ← RIGHT

"use client"

import { type ReactNode, useState, useEffect } from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { fpText } from "@/components/foreplay/foreplay-typography"
import { BlogDetailAuthor } from "@/components/foreplay/blog/blog-detail-author"
import { BlogDetailCtaSidebar } from "@/components/foreplay/blog/blog-detail-cta-sidebar"
import type { BlogAuthor } from "@/data/blog-posts"

interface BlogDetailContentProps {
  headings: { id: string; title: string }[]
  author: BlogAuthor
  coverImage?: string
  coverAlt?: string
  children: ReactNode
}

export function BlogDetailContent({
  headings,
  author,
  coverImage,
  coverAlt,
  children,
}: BlogDetailContentProps) {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? "")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        }
      },
      { rootMargin: "-20% 0px -60% 0px" },
    )

    for (const h of headings) {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [headings])

  return (
    <section>
      {/* .container: max-w-1440 + px-10 (40px) → content area 1360px (matches Foreplay) */}
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-8 lg:px-10">
        {/* .blog-main-wrapper (CTA removed): 2-col TOC + main, gap-9, items-start.
            Center spans 2 of 3 conceptual cols so main column stays 752px-ish (matches hero width).
            Right rail empty for symmetry — keeps main column visually centered. */}
        <div className="grid grid-cols-1 items-start gap-9 lg:grid-cols-[1fr_minmax(752px,1fr)_1fr]">
          {/* ── LEFT: .blog-toc-wrapper sticky ── */}
          <div className="sticky top-[120px] hidden lg:block">
            <aside className="flex flex-col gap-4">
              <div className="text-foreground">
                <div className={fpText.labelM}>Table of contents</div>
              </div>
              <nav>
                <ul className="flex flex-col border-l border-[#ffffff1f] pl-0">
                  {headings.map((h) => (
                    <li key={h.id} className="list-none">
                      <a
                        href={`#${h.id}`}
                        className={cn(
                          fpText.bodyS,
                          "block border-l p-3 transition-all duration-150",
                          activeId === h.id
                            ? "border-foreground text-foreground"
                            : "border-transparent text-[var(--fp-alpha-100,#ffffffad)] hover:text-foreground",
                        )}
                      >
                        {h.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          </div>

          {/* ── CENTER: .blog-main — flex col gap-10 ── */}
          <div className="flex flex-col gap-10 pb-10">
            {/* .blog-head — author block only (cover is hidden via w-condition-invisible in Foreplay) */}
            <div>
              <BlogDetailAuthor author={author} />
            </div>

            {/* .blog-line: h-px bg neutral-700 */}
            <div className="h-px bg-[#ffffff1a]" />

            {/* .blog-body — cover image + rich-text content */}
            <div className="flex flex-col gap-8">
              {/* Cover image (lives in body, NOT head per Foreplay screenshot reference) */}
              {coverImage && (
                <div className="relative aspect-[1.71] w-full overflow-hidden rounded-[20px]">
                  <Image
                    src={coverImage}
                    alt={coverAlt ?? ""}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1023px) 100vw, 752px"
                    priority
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-[20px] border border-[#ffffff29]" />
                </div>
              )}

              {/* .blog-rtb: Foreplay-exact rich-text styling (see globals.css) */}
              <div className="blog-rtb scroll-mt-24">{children}</div>
            </div>
          </div>

          {/* ── RIGHT: .blog-cta — sticky on GRID ITEM (same pattern as TOC) so it stays
              visible while user scrolls through the article body ── */}
          <div className="sticky top-[120px] hidden lg:block">
            <BlogDetailCtaSidebar
              title="Start your free trial"
              description="Save, organize, share and analyze your next winning ad."
              ctaHref="/pricing"
              ctaLabel="Start free trial"
              thumbnail={{
                src: "/foreplay/680c3ed43df5ea8859a6ac18_home-mockup-1.webp",
                alt: "GoAds product preview",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
