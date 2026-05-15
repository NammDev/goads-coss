import type { Metadata } from "next"
import { Suspense } from "react"
import Link from "next/link"
import { PlusIcon } from "lucide-react"
import { auth } from "@clerk/nextjs/server"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { getPosts, searchPosts } from "@/lib/db/queries/community-queries"
import { CommunityPostList } from "@/components/community/community-post-list"
import { CommunitySortTabs } from "@/components/community/community-sort-tabs"
import { CommunitySearchBar } from "@/components/community/community-search-bar"

interface PageProps {
  searchParams: Promise<{
    category?: string
    sort?: string
    page?: string
    q?: string
  }>
}

export const metadata: Metadata = {
  title: "Community | GoAds",
  description:
    "Join the GoAds community. Discuss Meta ads, Google Ads, TikTok strategies, and share your experience with fellow advertisers.",
  openGraph: {
    title: "Community | GoAds",
    description:
      "Join the GoAds community. Discuss Meta ads, Google Ads, TikTok strategies.",
    type: "website",
    url: "/community",
  },
}

export default async function CommunityPage({ searchParams }: PageProps) {
  const params = await searchParams
  const { userId } = await auth()

  const categorySlug = params.category
  const sort = (params.sort as "recent" | "top" | "trending") ?? "recent"
  const page = Math.max(1, Number(params.page) || 1)
  const query = params.q?.trim()
  const limit = 20

  const { posts, total } = query
    ? { posts: await searchPosts(query, limit), total: 0 }
    : await getPosts({ categorySlug, sort, page, limit })

  const baseParams = new URLSearchParams()
  if (categorySlug) baseParams.set("category", categorySlug)
  if (sort !== "recent") baseParams.set("sort", sort)
  const baseUrl = `/community?${baseParams.toString()}`

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold">Community</h1>
        <div className="flex items-center gap-3">
          <Suspense fallback={<Skeleton className="h-9 w-48" />}>
            <CommunitySearchBar />
          </Suspense>
          {userId ? (
            <Button asChild size="sm">
              <Link href="/community/create">
                <PlusIcon className="mr-1 size-4" /> New Post
              </Link>
            </Button>
          ) : (
            <Button asChild size="sm">
              <Link href="/sign-in?redirect_url=/community/create">
                <PlusIcon className="mr-1 size-4" /> New Post
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Sort tabs */}
      <Suspense fallback={<Skeleton className="h-8 w-48" />}>
        <CommunitySortTabs />
      </Suspense>

      {/* Post list */}
      <CommunityPostList
        posts={posts}
        total={total}
        page={page}
        limit={limit}
        baseUrl={baseUrl}
      />
    </div>
  )
}
