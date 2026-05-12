import type { Metadata } from "next"
import { BlogHero } from "@/components/blog-hero"
import { BlogListing } from "@/components/blog-listing"
import { SectionDivider } from "@/components/section-divider"
import { reader } from "@/lib/keystatic-reader"
import type { BlogPost } from "@/data/blog-posts"

export const metadata: Metadata = {
  title: "Blog | GoAds Advertising Tips & Insights",
  description:
    "Read GoAds blog for Facebook & TikTok advertising tips, account management guides, and industry insights.",
}

export default async function BlogPage() {
  const slugs = await reader.collections.blog.list()
  const posts: BlogPost[] = await Promise.all(
    slugs.map(async (slug) => {
      const post = await reader.collections.blog.read(slug)
      return {
        slug,
        category: post?.category ?? "",
        categorySlug: (post?.category ?? "").toLowerCase().replace(/\s+/g, "-"),
        title: post?.title ?? "",
        description: post?.description ?? "",
        author: {
          name: post?.author ?? "GoAds Team",
          avatar: "/avatars/goads-team.png",
        },
        date: post?.date ?? "",
        readTime: "5 min read",
        coverImage: "",
        sections: [],
      }
    })
  )

  return (
    <main className="flex-1">
      <BlogHero basePath="/blog" />
      <SectionDivider />
      <BlogListing posts={posts} basePath="/blog" />
    </main>
  )
}
