import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { BlogDetailContent } from "@/components/blog-detail-content"
import { BlogDetailHeader } from "@/components/blog-detail-header"
import { SectionDivider } from "@/components/section-divider"
import CTASection from "@/components/shadcn-studio/blocks/cta-section-05/cta-section-05"
import { blogPosts, getBlogPost } from "@/data/blog-posts"

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return { title: "Post Not Found | GoAds" }
  return {
    title: `${post.title} | GoAds Blog`,
    description: post.description,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="flex-1">
      <BlogDetailHeader post={post} />
      <SectionDivider />
      <BlogDetailContent post={post} />
      <SectionDivider />
      <CTASection />
    </main>
  )
}
