import { notFound } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { requireRole } from "@/lib/auth/require-role"
import { getUserByUsername, getUserStats } from "@/lib/db/queries/profile-queries"
import { getPostsByAuthor } from "@/lib/db/queries/community-queries"
import { CommunityUserProfile } from "@/components/community/community-user-profile"
import { CommunityPostCard } from "@/components/community/community-post-card"
import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"

interface PageProps {
  params: Promise<{ username: string }>
}

export default async function UserProfilePage({ params }: PageProps) {
  await requireRole("customer", "staff", "super_admin")
  const { username } = await params

  const user = await getUserByUsername(username)
  if (!user) notFound()

  const [stats, posts] = await Promise.all([
    getUserStats(user.id),
    getPostsByAuthor(user.id),
  ])

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Back link */}
      <Link href="/portal/community" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeftIcon className="size-4" /> Community
      </Link>

      <CommunityUserProfile user={user} stats={stats} />

      <Separator />

      {/* Post history */}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">Posts ({posts.length})</h2>
        {posts.length === 0 ? (
          <p className="py-4 text-sm text-muted-foreground">No posts yet.</p>
        ) : (
          posts.map((post) => <CommunityPostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  )
}
