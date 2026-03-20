import type { ReplyWithAuthor } from "@/lib/db/queries/community-queries"
import { CommunityReplyItem } from "./community-reply-item"

interface CommunityReplyListProps {
  replies: ReplyWithAuthor[]
  isPostAuthor: boolean
  postId: string
}

export function CommunityReplyList({ replies, isPostAuthor, postId }: CommunityReplyListProps) {
  // Pin solution reply to top
  const sorted = [...replies].sort((a, b) => {
    if (a.isSolution) return -1
    if (b.isSolution) return 1
    return 0
  })

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-semibold">
        {replies.length} {replies.length === 1 ? "Reply" : "Replies"}
      </h3>
      {sorted.length === 0 ? (
        <p className="py-4 text-sm text-muted-foreground">No replies yet. Be the first to respond!</p>
      ) : (
        sorted.map((reply) => (
          <CommunityReplyItem key={reply.id} reply={reply} isPostAuthor={isPostAuthor} postId={postId} />
        ))
      )}
    </div>
  )
}
