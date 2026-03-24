import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { CommunityPostCard } from "./community-post-card"
import type { PostWithAuthor } from "@/lib/db/queries/community-queries"

interface CommunityPostListProps {
  posts: PostWithAuthor[]
  total: number
  page: number
  limit: number
  baseUrl: string
}

export function CommunityPostList({ posts, total, page, limit, baseUrl }: CommunityPostListProps) {
  const totalPages = Math.ceil(total / limit)

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center">
        <p className="text-muted-foreground">No posts found.</p>
        <Button asChild size="sm">
          <Link href="/community/create">Create the first post</Link>
        </Button>
      </div>
    )
  }

  /** Build pagination href preserving existing search params */
  function pageHref(p: number) {
    const url = new URL(baseUrl, "http://localhost")
    url.searchParams.set("page", String(p))
    return `/community?${url.searchParams.toString()}`
  }

  return (
    <div className="flex flex-col">
      {posts.map((post, i) => (
        <div key={post.id}>
          <CommunityPostCard post={post} />
          {i < posts.length - 1 && <Separator className="my-1" />}
        </div>
      ))}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <Button variant="outline" size="sm" asChild disabled={page <= 1}>
            <Link href={pageHref(page - 1)} aria-disabled={page <= 1}>
              <ChevronLeftIcon className="size-4" />
            </Link>
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <Button variant="outline" size="sm" asChild disabled={page >= totalPages}>
            <Link href={pageHref(page + 1)} aria-disabled={page >= totalPages}>
              <ChevronRightIcon className="size-4" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}
