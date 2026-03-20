import type { Metadata } from "next"
import { BlogHero } from "@/components/blog-hero"
import { BlogListing } from "@/components/blog-listing"
import { SectionDivider } from "@/components/section-divider"
import { reader } from "@/lib/keystatic-reader"

export const metadata: Metadata = {
  title: "Blog | GoAds Advertising Tips & Insights",
  description:
    "Read GoAds blog for Facebook & TikTok advertising tips, account management guides, and industry insights.",
}

export default async function BlogPage() {
  const slugs = await reader.collections.blog.list()
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const post = await reader.collections.blog.read(slug)
      return {
        slug,
        category: post?.category ?? "",
        title: post?.title ?? "",
        description: post?.description ?? "",
        author: post?.author ?? "GoAds Team",
        date: post?.date ?? "",
      }
    })
  )

  return (
    <main className="flex-1">
      <BlogHero />
      <SectionDivider />
      <BlogListing posts={posts} />
    </main>
  )
}
