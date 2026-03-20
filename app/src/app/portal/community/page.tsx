import { Suspense } from "react"
import Link from "next/link"
import { PlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { requireRole } from "@/lib/auth/require-role"
import { getCategories, getPosts, getMostHelpful, searchPosts } from "@/lib/db/queries/community-queries"
import { CommunitySidebar } from "@/components/community/community-sidebar"
import { CommunityPostList } from "@/components/community/community-post-list"
import { CommunitySortTabs } from "@/components/community/community-sort-tabs"
import { CommunitySearchBar } from "@/components/community/community-search-bar"
import { CommunityMobileCategories } from "@/components/community/community-mobile-categories"

interface PageProps {
  searchParams: Promise<{
    category?: string
    sort?: string
    page?: string
    q?: string
  }>
}

export default async function CommunityPage({ searchParams }: PageProps) {
  await requireRole("customer", "staff", "super_admin")
  const params = await searchParams

  const categorySlug = params.category
  const sort = (params.sort as "recent" | "top" | "trending") ?? "recent"
  const page = Math.max(1, Number(params.page) || 1)
  const query = params.q?.trim()
  const limit = 20

  const [categories, leaderboard] = await Promise.all([
    getCategories(),
    getMostHelpful(5),
  ])

  // Use search or paginated listing
  const { posts, total } = query
    ? { posts: await searchPosts(query, limit), total: 0 }
    : await getPosts({ categorySlug, sort, page, limit })

  // Build base URL for pagination links
  const baseParams = new URLSearchParams()
  if (categorySlug) baseParams.set("category", categorySlug)
  if (sort !== "recent") baseParams.set("sort", sort)
  const baseUrl = `/portal/community?${baseParams.toString()}`

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold">Community</h1>
        <div className="flex items-center gap-3">
          <Suspense fallback={<Skeleton className="h-9 w-48" />}>
            <CommunitySearchBar />
          </Suspense>
          <Button asChild size="sm">
            <Link href="/portal/community/create">
              <PlusIcon className="mr-1 size-4" /> New Post
            </Link>
          </Button>
        </div>
      </div>

      {/* Mobile category chips */}
      <Suspense fallback={null}>
        <CommunityMobileCategories categories={categories} />
      </Suspense>

      {/* Main content */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-12">
        <CommunitySidebar categories={categories} leaderboard={leaderboard} activeCategory={categorySlug} />

        <div className="lg:col-span-3">
          <div className="mb-4">
            <Suspense fallback={<Skeleton className="h-8 w-48" />}>
              <CommunitySortTabs />
            </Suspense>
          </div>

          <CommunityPostList posts={posts} total={total} page={page} limit={limit} baseUrl={baseUrl} />
        </div>
      </div>
    </div>
  )
}
