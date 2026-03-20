"use client"

import { type ReactNode, useState, useEffect } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import type { TocHeading } from "@/lib/markdoc-renderer"

function TableOfContents({
  headings,
  activeId,
}: {
  headings: TocHeading[]
  activeId: string
}) {
  return (
    <div className="sticky top-24 hidden h-fit lg:block">
      <span className="text-lg font-medium">Content</span>
      <nav className="mt-4">
        <ul className="space-y-1 border-l border-border">
          {headings.map((h) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={`-ml-px block border-l-2 py-1.5 pl-4 text-sm transition-all duration-200 ${
                  activeId === h.id
                    ? "border-foreground font-medium text-foreground"
                    : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                }`}
              >
                {h.title}
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

type Props = {
  description: string
  headings: TocHeading[]
  children: ReactNode
}

export function BlogDetailContent({ description, headings, children }: Props) {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? "")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        }
      },
      { rootMargin: "-20% 0px -60% 0px" }
    )

    for (const h of headings) {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [headings])

  return (
    <section className="py-8 sm:py-16 lg:py-24">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-4 lg:gap-20">
          <TableOfContents headings={headings} activeId={activeId} />

          <div className="lg:col-span-2">
            <div className="mb-10">
              <h2 className="text-3xl font-bold">{headings[0]?.title}</h2>
              <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted-foreground">
                {description}
              </p>
              <div className="my-8 aspect-video w-full rounded-md bg-muted" />
            </div>

            <div className="prose max-w-none scroll-mt-24 overflow-x-auto dark:prose-invert prose-headings:font-semibold prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-blockquote:border-primary/40 prose-blockquote:text-muted-foreground prose-li:marker:text-muted-foreground prose-pre:overflow-x-auto">
              {children}
            </div>
          </div>

          <CtaSidebar />
        </div>
      </div>
    </section>
  )
}
