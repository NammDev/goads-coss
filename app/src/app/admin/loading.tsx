import { Skeleton } from '@/components/ui/skeleton'
import { SkeletonStatsRow } from '@/components/dashboard/skeleton-stats-row'
import { SkeletonTable } from '@/components/dashboard/skeleton-table'

export default function AdminLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-40" />
      <SkeletonStatsRow count={4} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Skeleton className="h-64 rounded-xl" />
        <Skeleton className="h-64 rounded-xl" />
      </div>
      <SkeletonTable rows={5} cols={5} />
    </div>
  )
}
