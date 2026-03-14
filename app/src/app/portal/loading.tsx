import { Skeleton } from '@/components/ui/skeleton'
import { SkeletonStatsRow } from '@/components/dashboard/skeleton-stats-row'
import { Card, CardContent } from '@/components/ui/card'

export default function PortalLoading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-56" />
        <Skeleton className="mt-1 h-4 w-64" />
      </div>
      <SkeletonStatsRow count={3} />
      <div className="space-y-4">
        <Skeleton className="h-6 w-36" />
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="shadow-none">
            <CardContent className="space-y-2 p-4">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
