import Link from "next/link"
import { ArrowUpIcon, MessageSquareIcon, EyeIcon, PinIcon, CheckCircle2Icon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { PostWithAuthor } from "@/lib/db/queries/community-queries"
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

interface CommunityPostCardProps {
  post: PostWithAuthor
}

export function CommunityPostCard({ post }: CommunityPostCardProps) {
  return (
    <Link
      href={`/portal/community/${post.slug}`}
      className="group -mx-2 flex flex-col gap-2 rounded-lg px-4 py-4 transition-colors duration-200 hover:bg-muted/50"
    >
      {/* Top row: category + status + pinned */}
      <div className="flex items-center gap-2 text-xs">
        <span className="font-medium text-muted-foreground">{post.categoryName}</span>
        <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${statusColors[post.status] ?? ""}`}>
          {post.status === "solved" && <CheckCircle2Icon className="mr-0.5 size-3" />}
          {post.status.replace("_", " ")}
        </Badge>
        {post.isPinned && (
          <Badge variant="outline" className="text-[10px] px-1.5 py-0">
            <PinIcon className="mr-0.5 size-3" /> Pinned
          </Badge>
        )}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
        {post.title}
      </h3>

      {/* Excerpt */}
      {post.excerpt && (
        <p className="line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
      )}

      {/* Bottom row: author + stats */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        {post.authorUsername ? (
          <span
            className="font-medium hover:text-primary hover:underline"
            onClick={(e) => {
              e.preventDefault()
              window.location.href = `/portal/community/user/${post.authorUsername}`
            }}
          >
            {post.authorName}
          </span>
        ) : (
          <span className="font-medium">{post.authorName}</span>
        )}
        <span>{formatTimeAgo(post.createdAt)}</span>
        <span className="flex items-center gap-1">
          <ArrowUpIcon className="size-3" /> {post.upvotesCount}
        </span>
        <span className="flex items-center gap-1">
          <MessageSquareIcon className="size-3" /> {post.repliesCount}
        </span>
        <span className="flex items-center gap-1">
          <EyeIcon className="size-3" /> {post.viewsCount}
        </span>
      </div>
    </Link>
  )
}
