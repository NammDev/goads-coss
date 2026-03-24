import type { Metadata } from "next"
import { Suspense } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PlusIcon } from "lucide-react"
import { auth } from "@clerk/nextjs/server"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { getCategories, getPosts } from "@/lib/db/queries/community-queries"
import { CommunityPostList } from "@/components/community/community-post-list"
import { CommunitySortTabs } from "@/components/community/community-sort-tabs"

interface PageProps {
  params: Promise<{ category: string }>
  searchParams: Promise<{
    sort?: string
    page?: string
  }>
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const { category } = await params
  const categories = await getCategories()
  const cat = categories.find((c) => c.slug === category)
  if (!cat) return { title: "Category Not Found | GoAds" }

  return {
    title: `${cat.name} | Community | GoAds`,
    description:
      cat.description ?? `Browse ${cat.name} posts in the GoAds community.`,
    openGraph: {
      title: `${cat.name} | Community | GoAds`,
      description:
        cat.description ?? `Browse ${cat.name} posts in the GoAds community.`,
      type: "website",
      url: `/community/c/${category}`,
    },
  }
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { category } = await params
  const sp = await searchParams
  const { userId } = await auth()

  const sort = (sp.sort as "recent" | "top" | "trending") ?? "recent"
  const page = Math.max(1, Number(sp.page) || 1)
  const limit = 20

  /* Verify category exists */
  const categories = await getCategories()
  const cat = categories.find((c) => c.slug === category)
  if (!cat) notFound()

  const { posts, total } = await getPosts({
    categorySlug: category,
    sort,
    page,
    limit,
  })

  const baseParams = new URLSearchParams()
  if (sort !== "recent") baseParams.set("sort", sort)
  const baseUrl = `/community/c/${category}?${baseParams.toString()}`

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <nav className="mb-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/community" className="hover:text-foreground">
              Community
            </Link>
            <span>/</span>
            <span className="text-foreground">{cat.name}</span>
          </nav>
          <h1 className="text-2xl font-semibold">
            {cat.icon && <span className="mr-2">{cat.icon}</span>}
            {cat.name}
          </h1>
          {cat.description && (
            <p className="mt-1 text-sm text-muted-foreground">
              {cat.description}
            </p>
          )}
        </div>
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
