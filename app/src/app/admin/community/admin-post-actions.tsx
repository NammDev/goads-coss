"use client"

import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { togglePin, updatePostStatus } from "@/lib/actions/community-admin-actions"
import { deletePost } from "@/lib/actions/community-actions"
import { toast } from "sonner"
import type { PostRow } from "@/components/dashboard/columns/admin-community-post-columns"

const POST_STATUSES = [
  "open", "solved", "closed", "in_review", "planned", "in_progress", "completed", "rejected",
] as const

interface AdminPostActionsProps {
  post: PostRow
}

export function AdminPostActions({ post }: AdminPostActionsProps) {
  const [isPending, startTransition] = useTransition()

  function handlePin() {
    startTransition(async () => {
      const result = await togglePin(post.id)
      if (result.success) toast.success(post.isPinned ? "Unpinned" : "Pinned")
      else toast.error(result.error ?? "Failed")
    })
  }

  function handleStatusChange(status: string) {
    startTransition(async () => {
      const result = await updatePostStatus(post.id, status as (typeof POST_STATUSES)[number])
      if (result.success) toast.success(`Status updated to ${status}`)
      else toast.error(result.error ?? "Failed")
    })
  }

  function handleHide() {
    startTransition(async () => {
      const result = await deletePost(post.id)
      if (result.success) toast.success("Post hidden")
      else toast.error(result.error ?? "Failed")
    })
  }

  return (
    <div className="flex flex-wrap items-center gap-3 p-4">
      {/* Status change */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Status:</span>
        <Select defaultValue={post.status} onValueChange={handleStatusChange} disabled={isPending}>
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {POST_STATUSES.map((s) => (
              <SelectItem key={s} value={s}>
                {s.replace("_", " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Pin toggle */}
      <Button size="sm" variant="outline" onClick={handlePin} disabled={isPending}>
        {post.isPinned ? "Unpin" : "Pin"}
      </Button>

      {/* Hide */}
      {!post.isHidden && (
        <Button size="sm" variant="destructive" onClick={handleHide} disabled={isPending}>
          Hide Post
        </Button>
      )}
    </div>
  )
}
