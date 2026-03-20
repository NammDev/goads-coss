"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { createReply } from "@/lib/actions/community-actions"
import { toast } from "sonner"

interface CommunityReplyFormProps {
  postId: string
}

export function CommunityReplyForm({ postId }: CommunityReplyFormProps) {
  const [body, setBody] = useState("")
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!body.trim()) return

    startTransition(async () => {
      const result = await createReply({ postId, body: body.trim() })
      if (result.success) {
        setBody("")
        toast.success("Reply posted")
      } else {
        toast.error(result.error ?? "Failed to post reply")
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <h3 className="text-lg font-semibold">Your Reply</h3>
      <Textarea
        placeholder="Write your reply..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={4}
        required
        minLength={3}
      />
      <div className="flex justify-end">
        <Button type="submit" size="sm" disabled={isPending || !body.trim()}>
          {isPending ? "Posting..." : "Post Reply"}
        </Button>
      </div>
    </form>
  )
}
