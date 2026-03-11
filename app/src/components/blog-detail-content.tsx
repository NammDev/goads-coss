"use client"

import { useState, useEffect } from "react"
import DOMPurify from "isomorphic-dompurify"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import type { BlogPost } from "@/data/blog-posts"

function TableOfContents({
  sections,
  activeId,
}: {
  sections: BlogPost["sections"]
  activeId: string
}) {
  return (
    <div className="sticky top-24 hidden h-fit lg:block">
      <span className="text-lg font-medium">Content</span>
      <nav className="mt-4">
        <ul className="space-y-1 border-l border-border">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={`-ml-px block border-l-2 py-1.5 pl-4 text-sm transition-all duration-200 ${
                  activeId === section.id
                    ? "border-foreground font-medium text-foreground"
                    : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                }`}
              >
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

function CtaSidebar() {
  return (
    <div className="sticky top-24 hidden h-fit rounded-lg border p-6 lg:block">
      <h5 className="text-xl font-semibold">Scale Your Ads with GoAds</h5>
      <ul className="my-6 space-y-2 text-sm text-muted-foreground">
        <li className="flex items-start gap-2">
          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
          7-day warranty on all accounts
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
          Under 2-hour support response
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
          500+ satisfied clients worldwide
        </li>
      </ul>
      <div className="flex flex-col gap-2">
        <Button asChild>
          <Link href="/pricing">Get started</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/about">Learn more</Link>
        </Button>
      </div>
    </div>
  )
}

export function BlogDetailContent({ post }: { post: BlogPost }) {
  const [activeId, setActiveId] = useState(post.sections[0]?.id ?? "")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px" }
    )

    for (const section of post.sections) {
      const el = document.getElementById(section.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [post.sections])

  return (
    <section className="py-8 sm:py-16 lg:py-24">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-4 lg:gap-20">
          {/* Table of contents sidebar */}
          <TableOfContents sections={post.sections} activeId={activeId} />

          {/* Main article content */}
          <div className="lg:col-span-2">
            {/* Lead section */}
            <div className="mb-10">
              <h2 className="text-3xl font-bold">{post.sections[0]?.title}</h2>
              <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted-foreground">
                {post.description}
              </p>
              <div className="my-8 aspect-video w-full rounded-md bg-muted" />
            </div>

            {/* Article sections */}
            {post.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="prose mb-10 max-w-none scroll-mt-24 overflow-x-auto dark:prose-invert prose-headings:font-semibold prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-blockquote:border-primary/40 prose-blockquote:text-muted-foreground prose-li:marker:text-muted-foreground prose-pre:overflow-x-auto"
              >
                <h2>{section.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(section.content) }} />
              </section>
            ))}
          </div>

          {/* CTA sidebar */}
          <CtaSidebar />
        </div>
      </div>
    </section>
  )
}
