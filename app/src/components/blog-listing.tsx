"use client"

import { useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export type BlogListingPost = {
  slug: string
  category: string
  title: string
  description: string
  author: string
  date: string
}

const categories = [
  "All Articles",
  "Facebook Ads",
  "Google Ads",
  "TikTok Ads",
  "Agency Accounts",
] as const

type Category = (typeof categories)[number]

export function BlogListing({ posts }: { posts: BlogListingPost[] }) {
  const [active, setActive] = useState<Category>("All Articles")

  const filtered =
    active === "All Articles"
      ? posts
      : posts.filter((p) => p.category === active)

  return (
    <section className="py-8 sm:py-16 lg:py-24">
      <div className="container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-20">
          {/* Sidebar — sticky on desktop */}
          <nav
            className="sticky top-24 hidden h-fit flex-col gap-1 lg:flex"
            aria-label="Blog categories"
          >
            {categories.map((cat) => (
              <Button
                key={cat}
                variant="ghost"
                size="default"
                onClick={() => setActive(cat)}
                className={`justify-start text-left transition-colors duration-200 ${
                  active === cat
                    ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    : ""
                }`}
              >
                {cat}
              </Button>
            ))}
          </nav>

          {/* Mobile category selector */}
          <div className="flex flex-wrap gap-2 lg:hidden">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={active === cat ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setActive(cat)}
                className="transition-colors duration-200"
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Post list */}
          <div className="lg:col-span-3">
            {filtered.map((post, i) => (
              <div key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group -mx-4 flex cursor-pointer flex-col gap-3 rounded-lg px-4 py-5 transition-colors duration-200 hover:bg-muted/50"
                >
                  <p className="text-sm font-semibold text-muted-foreground">
                    {post.category}
                  </p>
                  <h3 className="text-2xl font-semibold text-balance text-foreground transition-colors duration-200 group-hover:text-primary lg:text-3xl">
                    {post.title}
                  </h3>
                  <p className="max-w-prose text-muted-foreground">
                    {post.description}
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-sm">
                    <span className="font-medium">{post.author}</span>
                    <span className="text-muted-foreground">
                      on {post.date}
                    </span>
                  </div>
                </Link>
                {i < filtered.length - 1 && <Separator className="my-4" />}
              </div>
            ))}

            {filtered.length === 0 && (
              <p className="py-12 text-center text-muted-foreground">
                No articles found in this category yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
