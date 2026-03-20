import { ShieldIcon, CalendarIcon, ArrowUpIcon, MessageSquareIcon, CheckCircle2Icon, FileTextIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { UserProfile, UserStats } from "@/lib/db/queries/profile-queries"

interface CommunityUserProfileProps {
  user: UserProfile
  stats: UserStats
}

export function CommunityUserProfile({ user, stats }: CommunityUserProfileProps) {
  const initials = user.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  const joinDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  })

  const isStaff = user.role === "staff" || user.role === "super_admin"

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Avatar className="size-16">
          <AvatarImage src={user.avatarUrl ?? undefined} alt={user.name} />
          <AvatarFallback className="text-lg">{initials}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold">{user.name}</h1>
            {isStaff && (
              <Badge variant="outline" className="gap-0.5 text-xs">
                <ShieldIcon className="size-3" /> Staff
              </Badge>
            )}
          </div>
          {user.username && (
            <p className="text-sm text-muted-foreground">@{user.username}</p>
          )}
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <CalendarIcon className="size-3.5" />
            Joined {joinDate}
          </div>
        </div>
      </div>

      {/* Bio */}
      {user.bio && (
        <p className="text-sm leading-relaxed text-muted-foreground">{user.bio}</p>
      )}

      <Separator />

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard icon={FileTextIcon} label="Posts" value={stats.postCount} />
        <StatCard icon={MessageSquareIcon} label="Replies" value={stats.replyCount} />
        <StatCard icon={CheckCircle2Icon} label="Solutions" value={stats.solutionCount} />
        <StatCard icon={ArrowUpIcon} label="Upvotes" value={stats.upvotesReceived} />
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: number }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-lg border p-3">
      <Icon className="size-4 text-muted-foreground" />
      <span className="text-xl font-semibold">{value}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  )
}
