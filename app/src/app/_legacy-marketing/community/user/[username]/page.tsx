import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { getUserByUsername, getUserStats } from "@/lib/db/queries/profile-queries"
import { getPostsByAuthor } from "@/lib/db/queries/community-queries"
import { CommunityUserProfile } from "@/components/community/community-user-profile"
import { CommunityPostCard } from "@/components/community/community-post-card"

interface PageProps {
  params: Promise<{ username: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { username } = await params
  const user = await getUserByUsername(username)
  if (!user) return { title: "User Not Found | GoAds" }

  return {
    title: `${user.name ?? username} | Community | GoAds`,
    description: `${user.name ?? username}'s community profile and contributions on GoAds.`,
    openGraph: {
      title: `${user.name ?? username} | Community | GoAds`,
      description: `View ${user.name ?? username}'s posts and contributions.`,
      type: "profile",
      url: `/community/user/${username}`,
    },
  }
}

export default async function UserProfilePage({ params }: PageProps) {
  const { username } = await params

  const user = await getUserByUsername(username)
  if (!user) notFound()

  const [stats, posts] = await Promise.all([
    getUserStats(user.id),
    getPostsByAuthor(user.id),
  ])

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        href="/community"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeftIcon className="size-4" /> Community
      </Link>

      <CommunityUserProfile user={user} stats={stats} />

      <Separator />

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">Posts ({posts.length})</h2>
        {posts.length === 0 ? (
          <p className="py-4 text-sm text-muted-foreground">No posts yet.</p>
        ) : (
          posts.map((post) => (
            <CommunityPostCard key={post.id} post={post} />
          ))
        )}
      </div>
    </div>
  )
}
