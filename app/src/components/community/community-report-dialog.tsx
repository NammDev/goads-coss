"use client"

import { useState, useTransition } from "react"
import { FlagIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { reportContent } from "@/lib/actions/community-actions"
import { toast } from "sonner"

const REASONS = [
  { value: "spam", label: "Spam" },
  { value: "inappropriate", label: "Inappropriate content" },
  { value: "offtopic", label: "Off-topic" },
  { value: "other", label: "Other" },
] as const

interface CommunityReportDialogProps {
  postId?: string
  replyId?: string
}

export function CommunityReportDialog({ postId, replyId }: CommunityReportDialogProps) {
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState<string>("")
  const [details, setDetails] = useState("")
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!reason) return

    startTransition(async () => {
      const result = await reportContent({
        postId,
        replyId,
        reason: reason as "spam" | "inappropriate" | "offtopic" | "other",
        details: details.trim() || undefined,
      })
      if (result.success) {
        toast.success("Report submitted — staff will review")
        setOpen(false)
        setReason("")
        setDetails("")
      } else {
        toast.error(result.error ?? "Failed to report")
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground">
          <FlagIcon className="size-4" /> Report
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Report Content</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="reason">Reason</Label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger id="reason">
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                {REASONS.map((r) => (
                  <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="details">Details (optional)</Label>
            <Textarea
              id="details"
              placeholder="Any additional context..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={3}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm" disabled={isPending || !reason}>
              {isPending ? "Submitting..." : "Submit Report"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
