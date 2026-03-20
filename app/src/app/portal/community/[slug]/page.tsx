import { notFound } from "next/navigation"
import { requireRole } from "@/lib/auth/require-role"
import { getPostBySlug } from "@/lib/db/queries/community-queries"
import { recordView } from "@/lib/actions/community-actions"
import { CommunityPostDetail } from "@/components/community/community-post-detail"
import { CommunityReplyList } from "@/components/community/community-reply-list"
import { CommunityReplyForm } from "@/components/community/community-reply-form"
import { Separator } from "@/components/ui/separator"

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function CommunityPostPage({ params }: PageProps) {
  const session = await requireRole("customer", "staff", "super_admin")
  const { slug } = await params
  const userId = session.user.id

  const post = await getPostBySlug(slug, userId)
  if (!post) notFound()

  // Record view (fire-and-forget, won't block render)
  recordView(post.id).catch(() => {})

  const isPostAuthor = post.authorId === userId

  // Serialize dates for client component
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

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <CommunityPostDetail post={serializedPost} />

      <Separator />

      <CommunityReplyList replies={post.replies} isPostAuthor={isPostAuthor} postId={post.id} />

      <Separator />

      <CommunityReplyForm postId={post.id} />
    </div>
  )
}
