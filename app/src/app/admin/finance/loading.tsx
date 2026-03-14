import { Skeleton } from '@/components/ui/skeleton'
import { SkeletonStatsRow } from '@/components/dashboard/skeleton-stats-row'
import { SkeletonTable } from '@/components/dashboard/skeleton-table'

export default function AdminFinanceLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-32" />
      <SkeletonStatsRow count={4} />
      <SkeletonTable rows={8} cols={4} />
    </div>
  )
}
