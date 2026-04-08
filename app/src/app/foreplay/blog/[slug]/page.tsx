import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { BlogDetailHeader } from "@/components/blog-detail-header"
import { BlogDetailContent } from "@/components/blog-detail-content"
import { BlogInlineCta } from "@/components/foreplay/blog/blog-inline-cta"
import { BlogRelatedCarousel } from "@/components/foreplay/blog/blog-related-carousel"
import { ForeplayHomeCta } from "@/components/foreplay/foreplay-home-cta"
import { blogPosts, getBlogPost } from "@/data/blog-posts"

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return { title: "Post Not Found — GoAds" }
  return {
    title: `${post.title} — GoAds Blog`,
    description: post.description,
  }
}

/** Render blog post sections as HTML (static data, no Markdoc/Keystatic) */
function BlogSectionsContent({ sections }: { sections: { id: string; title: string; content: string }[] }) {
  return (
    <>
      {sections.map((section) => (
        <div key={section.id}>
          <h2 id={section.id} className="scroll-mt-[120px]">
            {section.title}
          </h2>
          <div dangerouslySetInnerHTML={{ __html: section.content }} />
        </div>
      ))}
    </>
  )
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return notFound()

  const headings = post.sections.map((s: { id: string; title: string }) => ({ id: s.id, title: s.title }))

  return (
    <>
      <BlogDetailHeader post={post} />
      <BlogDetailContent headings={headings}>
        <BlogSectionsContent sections={post.sections} />
      </BlogDetailContent>
      <BlogInlineCta />
      <BlogRelatedCarousel posts={blogPosts} currentSlug={slug} />
      <ForeplayHomeCta />
    </>
  )
}
