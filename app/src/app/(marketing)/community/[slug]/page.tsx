import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { auth } from "@clerk/nextjs/server"
import { getPostBySlug } from "@/lib/db/queries/community-queries"
import { recordView } from "@/lib/actions/community-actions"
import { CommunityPostDetail } from "@/components/community/community-post-detail"
import { CommunityReplyList } from "@/components/community/community-reply-list"
import { CommunityReplyForm } from "@/components/community/community-reply-form"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

interface PageProps {
  params: Promise<{ slug: string }>
}

const BASE_URL = "https://www.goads.shop"

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post || post.isHidden) return { title: "Post Not Found | GoAds" }

  const description =
    post.excerpt ?? post.body.slice(0, 160).replace(/\n/g, " ")

  return {
    title: `${post.title} | Community | GoAds`,
    description,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      url: `/community/${slug}`,
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: [post.authorName],
    },
    twitter: {
      card: "summary",
      title: post.title,
      description,
    },
  }
}

export default async function CommunityPostPage({ params }: PageProps) {
  const { slug } = await params
  const { userId } = await auth()

  const post = await getPostBySlug(slug, userId ?? undefined)
  if (!post || post.isHidden) notFound()

  /* Record view (fire-and-forget) */
  if (userId) {
    recordView(post.id).catch(() => {})
  }

  const isPostAuthor = userId ? post.authorId === userId : false

  const serializedPost = {
    id: post.id,
    title: post.title,
    body: post.body,
    status: post.status,
    isPinned: post.isPinned,
    upvotesCount: post.upvotesCount,
    repliesCount: post.repliesCount,
    viewsCount: post.viewsCount,
    createdAt: post.createdAt.toISOString(),
    authorName: post.authorName,
    categoryName: post.categoryName,
    categorySlug: post.categorySlug,
    hasUpvoted: post.hasUpvoted,
    isSubscribed: post.isSubscribed,
  }

  /* JSON-LD structured data for SEO */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DiscussionForumPosting",
    headline: post.title,
    description: post.excerpt ?? post.body.slice(0, 160),
    url: `${BASE_URL}/community/${slug}`,
    datePublished: post.createdAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: { "@type": "Person", name: post.authorName },
    interactionStatistic: [
      {
        "@type": "InteractionCounter",
        interactionType: "https://schema.org/LikeAction",
        userInteractionCount: post.upvotesCount,
      },
      {
        "@type": "InteractionCounter",
        interactionType: "https://schema.org/CommentAction",
        userInteractionCount: post.repliesCount,
      },
    ],
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CommunityPostDetail post={serializedPost} />

      <Separator />

      <CommunityReplyList
        replies={post.replies}
        isPostAuthor={isPostAuthor}
        postId={post.id}
      />

      <Separator />

      {/* Auth-gated reply form */}
      {userId ? (
        <CommunityReplyForm postId={post.id} />
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed py-8 text-center">
          <p className="text-sm text-muted-foreground">
            Sign in to join the discussion
          </p>
          <Button asChild size="sm">
            <Link href={`/sign-in?redirect_url=/community/${slug}`}>
              Sign In to Reply
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}
