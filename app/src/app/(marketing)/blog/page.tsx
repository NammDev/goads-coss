import type { Metadata } from "next"

import { BlogHero } from "@/components/blog-hero"
import { BlogListing } from "@/components/blog-listing"
import { ForeplayHomeCta } from "@/components/foreplay/foreplay-home-cta"
import { blogPosts, getFeaturedPost, getPopularPosts } from "@/data/blog-posts"

export const metadata: Metadata = {
  title: "Blog — GoAds",
  description:
    "Free insights and guides for scaling your ad accounts. Tips on Meta Ads, Google Ads, TikTok Ads, and more.",
}

export default function BlogPage() {
  const featuredPost = getFeaturedPost() ?? blogPosts[0]
  const popularPosts = getPopularPosts(4)

  return (
    <>
      <BlogHero featuredPost={featuredPost} popularPosts={popularPosts} />
      <BlogListing posts={blogPosts} />
      <ForeplayHomeCta />
    </>
  )
}
