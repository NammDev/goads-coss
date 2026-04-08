// Blog detail content — section > .container.section-container
// .blog-main-wrapper: grid 3-col [1fr minmax(752px,1fr) 1fr], gap-9, items-start
// .blog-toc-wrapper: sticky top-[120px] (LEFT)
//   .blog-toc-list: border-left 1px #ffffff1f, flex col
//   .blog-toc-h2: color neutral-100, border-left 1px transparent, p-3, transition
//   .blog-toc-h2.is-active: color neutral-0, border-left 1px #fff
// .blog-body: pb-10 (RIGHT)
//   .blog-rtb: rich text
// .blog-line: bg neutral-700, h-px

"use client"

import { type ReactNode, useState, useEffect } from "react"

import { cn } from "@/lib/utils"
import { ForeplaySectionContainer } from "@/components/foreplay/foreplay-section-container"
import { fpText } from "@/components/foreplay/foreplay-typography"
interface BlogDetailContentProps {
  headings: { id: string; title: string }[]
  description?: string
  children: ReactNode
}

export function BlogDetailContent({ headings, children }: BlogDetailContentProps) {
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
      <ForeplaySectionContainer>
        {/* .blog-main-wrapper: grid 3-col, gap-9, items-start */}
        <div className="grid grid-cols-1 items-start gap-9 lg:grid-cols-[200px_minmax(0,1fr)_200px]">
          {/* .blog-toc-wrapper: sticky top-[120px] — LEFT */}
          <div className="sticky top-[120px] hidden lg:block">
            {/* .blog-toc > .blog-toc-list: border-left, flex col */}
            <nav>
              <ul className="flex flex-col border-l border-[#ffffff1f] pl-0">
                {headings.map((h) => (
                  <li key={h.id} className="list-none">
                    <a
                      href={`#${h.id}`}
                      className={cn(
                        // .blog-toc-h2: p-3, border-left 1px transparent, transition
                        fpText.bodyS,
                        "block border-l p-3 transition-all duration-150",
                        activeId === h.id
                          ? // .blog-toc-h2.is-active: color neutral-0, border white
                            "border-foreground text-foreground"
                          : // default: color neutral-100, border transparent
                            "border-transparent text-[var(--fp-alpha-100,#ffffffad)] hover:text-foreground",
                      )}
                    >
                      {h.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* .blog-body: pb-10 — CENTER */}
          <div className="pb-10">
            {/* .blog-rtb: rich text */}
            <div className="prose max-w-none scroll-mt-24 dark:prose-invert prose-headings:font-semibold prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-[3px] prose-blockquote:border-foreground prose-blockquote:text-[var(--fp-alpha-100,#ffffffad)] prose-li:marker:text-muted-foreground">
              {children}
            </div>
            {/* .blog-line: bg neutral-700, h-px */}
            <div className="mt-10 h-px bg-[#ffffff1a]" />
          </div>

          {/* RIGHT spacer for symmetry (empty on desktop) */}
          <div className="hidden lg:block" />
        </div>
      </ForeplaySectionContainer>
    </section>
  )
}
