import { Skeleton } from '@/components/ui/skeleton'
import { SkeletonTable } from '@/components/dashboard/skeleton-table'

export default function AdminOrdersLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-9 w-32 rounded-lg" />
      </div>
      <SkeletonTable rows={10} cols={5} />
    </div>
  )
}
