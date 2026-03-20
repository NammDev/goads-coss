"use client"

import { useOptimistic, useTransition } from "react"
import { ArrowUpIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toggleUpvote } from "@/lib/actions/community-actions"
import { toast } from "sonner"

interface CommunityUpvoteButtonProps {
  postId?: string
  replyId?: string
  count: number
  hasUpvoted: boolean
}

export function CommunityUpvoteButton({ postId, replyId, count, hasUpvoted }: CommunityUpvoteButtonProps) {
  const [isPending, startTransition] = useTransition()
  const [optimistic, setOptimistic] = useOptimistic(
    { count, hasUpvoted },
    (state) => ({
      count: state.hasUpvoted ? state.count - 1 : state.count + 1,
      hasUpvoted: !state.hasUpvoted,
    }),
  )

  function handleClick() {
    startTransition(async () => {
      setOptimistic({ count: optimistic.count, hasUpvoted: optimistic.hasUpvoted })
      const result = await toggleUpvote({ postId, replyId })
      if (!result.success) {
        toast.error(result.error ?? "Failed to upvote")
      }
    })
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleClick}
      disabled={isPending}
      className={`gap-1 ${optimistic.hasUpvoted ? "text-primary" : "text-muted-foreground"}`}
    >
      <ArrowUpIcon className={`size-4 ${optimistic.hasUpvoted ? "fill-primary" : ""}`} />
      {optimistic.count}
    </Button>
  )
}
