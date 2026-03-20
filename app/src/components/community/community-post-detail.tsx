"use client"

import { useTransition } from "react"
import Link from "next/link"
import { BellIcon, BellOffIcon, PinIcon, CheckCircle2Icon, EyeIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { toggleSubscription } from "@/lib/actions/community-actions"
import { CommunityUpvoteButton } from "./community-upvote-button"
import { CommunityReportDialog } from "./community-report-dialog"
import { toast } from "sonner"
import { formatTimeAgo } from "./community-utils"

const statusColors: Record<string, string> = {
  open: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  solved: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  closed: "bg-muted text-muted-foreground",
  in_review: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
  planned: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  in_progress: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  completed: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  rejected: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
}

interface CommunityPostDetailProps {
  post: {
    id: string
    title: string
    body: string
    status: string
    isPinned: boolean
    upvotesCount: number
    repliesCount: number
    viewsCount: number
    createdAt: string
    authorName: string
    categoryName: string
    categorySlug: string
    hasUpvoted: boolean
    isSubscribed: boolean
  }
}

export function CommunityPostDetail({ post }: CommunityPostDetailProps) {
  const [isPending, startTransition] = useTransition()

  function handleSubscribe() {
    startTransition(async () => {
      const result = await toggleSubscription(post.id)
      if (result.success) {
        toast.success(post.isSubscribed ? "Unsubscribed" : "Subscribed to replies")
      } else {
        toast.error(result.error ?? "Failed")
      }
    })
  }


  return (
    <div className="flex flex-col gap-4">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/portal/community" className="hover:text-foreground">Community</Link>
        <span>/</span>
        <Link href={`/portal/community?category=${post.categorySlug}`} className="hover:text-foreground">
          {post.categoryName}
        </Link>
      </nav>

      {/* Title + badges */}
      <div className="flex flex-wrap items-center gap-2">
        <h1 className="text-2xl font-semibold">{post.title}</h1>
        <Badge variant="outline" className={`text-xs ${statusColors[post.status] ?? ""}`}>
          {post.status === "solved" && <CheckCircle2Icon className="mr-0.5 size-3" />}
          {post.status.replace("_", " ")}
        </Badge>
        {post.isPinned && (
          <Badge variant="outline" className="text-xs">
            <PinIcon className="mr-0.5 size-3" /> Pinned
          </Badge>
        )}
      </div>

      {/* Author + meta */}
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <span className="font-medium text-foreground">{post.authorName}</span>
        <span>{formatTimeAgo(post.createdAt)}</span>
        <span className="flex items-center gap-1">
          <EyeIcon className="size-3.5" /> {post.viewsCount} views
        </span>
      </div>

      <Separator />

      {/* Body */}
      <div className="whitespace-pre-wrap leading-relaxed">{post.body}</div>

      <Separator />

      {/* Action bar */}
      <div className="flex items-center gap-2">
        <CommunityUpvoteButton postId={post.id} count={post.upvotesCount} hasUpvoted={post.hasUpvoted} />
        <Button variant="ghost" size="sm" onClick={handleSubscribe} disabled={isPending} className="gap-1 text-muted-foreground">
          {post.isSubscribed ? <BellOffIcon className="size-4" /> : <BellIcon className="size-4" />}
          {post.isSubscribed ? "Unsubscribe" : "Subscribe"}
        </Button>
        <CommunityReportDialog postId={post.id} />
      </div>
    </div>
  )
}
