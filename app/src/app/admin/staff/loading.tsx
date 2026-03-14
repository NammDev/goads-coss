import { Skeleton } from '@/components/ui/skeleton'
import { SkeletonTable } from '@/components/dashboard/skeleton-table'

export default function AdminStaffLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-24" />
      <SkeletonTable rows={5} cols={4} />
    </div>
  )
}
