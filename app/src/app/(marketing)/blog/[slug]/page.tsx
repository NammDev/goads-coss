import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { BlogDetailContent } from "@/components/blog-detail-content"
import { BlogDetailHeader } from "@/components/blog-detail-header"
import { BlogMarkdocContent } from "@/components/blog-markdoc-content"
import { SectionDivider } from "@/components/section-divider"
import { reader } from "@/lib/keystatic-reader"
import { transformMarkdoc, extractHeadingsFromNode } from "@/lib/markdoc-renderer"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await reader.collections.blog.list()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await reader.collections.blog.read(slug)
  if (!post) return { title: "Post Not Found | GoAds" }
  return {
    title: `${post.title} | GoAds Blog`,
    description: post.description,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await reader.collections.blog.read(slug)

  if (!post) notFound()

  const { node } = await post.content()
  const contentTree = transformMarkdoc(node)
  const headings = extractHeadingsFromNode(node)

  const headerPost = {
    slug,
    title: post.title,
    category: post.category,
    description: post.description,
    author: post.author,
    authorAvatar: post.authorAvatar,
    date: post.date,
    readTime: post.readTime,
  }

  return (
    <main className="flex-1">
      <BlogDetailHeader post={headerPost} />
      <SectionDivider />
      <BlogDetailContent
        description={post.description}
        headings={headings}
      >
        <BlogMarkdocContent content={contentTree} />
      </BlogDetailContent>
    </main>
  )
}
