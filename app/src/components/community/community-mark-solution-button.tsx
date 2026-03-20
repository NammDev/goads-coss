"use client"

import { useTransition } from "react"
import { CheckCircle2Icon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { markSolution } from "@/lib/actions/community-actions"
import { toast } from "sonner"

interface MarkSolutionButtonProps {
  postId: string
  replyId: string
}

export function MarkSolutionButton({ postId, replyId }: MarkSolutionButtonProps) {
  const [isPending, startTransition] = useTransition()

  function handleClick() {
    startTransition(async () => {
      const result = await markSolution(postId, replyId)
      if (result.success) {
        toast.success("Marked as solution")
      } else {
        toast.error(result.error ?? "Failed to mark solution")
      }
    })
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleClick} disabled={isPending} className="gap-1 text-xs text-muted-foreground">
      <CheckCircle2Icon className="size-3.5" />
      Mark as solution
    </Button>
  )
}
