import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import type { CommunityCategory, LeaderboardEntry } from "@/lib/db/queries/community-queries"

interface CommunitySidebarProps {
  categories: CommunityCategory[]
  leaderboard: LeaderboardEntry[]
  activeCategory?: string
}

export function CommunitySidebar({ categories, leaderboard, activeCategory }: CommunitySidebarProps) {
  return (
    <nav className="sticky top-24 hidden h-fit flex-col gap-6 lg:flex" aria-label="Community categories">
      {/* Category filters */}
      <div className="flex flex-col gap-1">
        <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Categories
        </h4>
        <Button
          variant="ghost"
          size="sm"
          asChild
          className={`justify-start ${!activeCategory ? "bg-secondary text-secondary-foreground" : ""}`}
        >
          <Link href="/community">All Posts</Link>
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat.id}
            variant="ghost"
            size="sm"
            asChild
            className={`justify-start ${activeCategory === cat.slug ? "bg-secondary text-secondary-foreground" : ""}`}
          >
            <Link href={`/community?category=${cat.slug}`}>
              {cat.icon && <span className="mr-1">{cat.icon}</span>}
              {cat.name}
            </Link>
          </Button>
        ))}
      </div>

      <Separator />

      {/* Leaderboard widget */}
      {leaderboard.length > 0 && (
        <div className="flex flex-col gap-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Top Contributors
          </h4>
          <div className="flex flex-col gap-1.5">
            {leaderboard.slice(0, 5).map((entry, i) => (
              <div key={entry.userId} className="flex items-center justify-between text-sm">
                <span className="truncate">
                  <span className="mr-1.5 text-muted-foreground">{i + 1}.</span>
                  {entry.userName}
                </span>
                <span className="text-xs text-muted-foreground">{entry.postCount} posts</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
