import { Skeleton } from '@/components/ui/skeleton'
import { SkeletonTable } from '@/components/dashboard/skeleton-table'

export default function AdminCustomersLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-36" />
      <SkeletonTable rows={10} cols={5} />
    </div>
  )
}
