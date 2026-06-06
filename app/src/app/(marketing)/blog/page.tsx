import type { Metadata } from "next"

import { BlogHero } from "@/components/blog-hero"
import { BlogListing } from "@/components/blog-listing"
import { HomeCta } from "@/components/home/cta"
import { blogPosts, getFeaturedPost, getPopularPosts } from "@/data/blog-posts"

export const metadata: Metadata = {
  title: "Blog, GOADS",
  description:
    "Free insights and guides for scaling your ad accounts. Tips on Meta Ads, Google Ads, TikTok Ads, and more.",
}

export default function BlogPage() {
  const featuredPost = getFeaturedPost() ?? blogPosts[0]
  // Exclude the hero post from the popular rail so a featured + popular post
  // doesn't appear twice in a row. Fetch one extra, then trim back to 4.
  const popularPosts = getPopularPosts(5)
    .filter((p) => p.slug !== featuredPost.slug)
    .slice(0, 4)

  return (
    <>
      <BlogHero featuredPost={featuredPost} popularPosts={popularPosts} />
      <BlogListing posts={blogPosts} />
      <HomeCta />
    </>
  )
}
