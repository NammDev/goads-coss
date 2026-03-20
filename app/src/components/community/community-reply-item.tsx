import { CheckCircle2Icon, ShieldIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { CommunityUpvoteButton } from "./community-upvote-button"
import type { ReplyWithAuthor } from "@/lib/db/queries/community-queries"
import { formatTimeAgo } from "./community-utils"

interface CommunityReplyItemProps {
  reply: ReplyWithAuthor
  /** Whether current user is the post author (can mark solution) */
  isPostAuthor: boolean
  postId: string
}

export function CommunityReplyItem({ reply, isPostAuthor, postId }: CommunityReplyItemProps) {
  return (
    <div
      className={`flex flex-col gap-2 rounded-lg border p-4 ${
        reply.isSolution ? "border-green-300 bg-green-50/50 dark:border-green-800 dark:bg-green-950/30" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-2 text-sm">
        <span className="font-medium">{reply.authorName}</span>
        {reply.isStaff && (
          <Badge variant="outline" className="gap-0.5 text-[10px] px-1.5 py-0">
            <ShieldIcon className="size-3" /> Staff
          </Badge>
        )}
        {reply.isSolution && (
          <Badge className="gap-0.5 bg-green-100 text-green-700 text-[10px] px-1.5 py-0 dark:bg-green-900/40 dark:text-green-300">
            <CheckCircle2Icon className="size-3" /> Solution
          </Badge>
        )}
        <span className="text-muted-foreground">{formatTimeAgo(reply.createdAt)}</span>
      </div>

      {/* Body */}
      <p className="whitespace-pre-wrap text-sm leading-relaxed">{reply.body}</p>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <CommunityUpvoteButton replyId={reply.id} count={reply.upvotesCount} hasUpvoted={false} />
        {isPostAuthor && !reply.isSolution && (
          <MarkSolutionButton postId={postId} replyId={reply.id} />
        )}
      </div>
    </div>
  )
}

/** Client button to mark a reply as solution */
import { MarkSolutionButton } from "./community-mark-solution-button"
