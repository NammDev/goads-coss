import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { getCategories, getMostHelpful } from "@/lib/db/queries/community-queries"
import { CommunitySidebar } from "@/components/community/community-sidebar"

export default async function CommunityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [categories, leaderboard] = await Promise.all([
    getCategories(),
    getMostHelpful(5),
  ])

  return (
    <section className="container py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-12">
        <CommunitySidebar
          categories={categories}
          leaderboard={leaderboard}
        />
        <div className="lg:col-span-3">{children}</div>
      </div>
    </section>
  )
}
