import { Skeleton } from '@/components/ui/skeleton'
import { SkeletonTable } from '@/components/dashboard/skeleton-table'

export default function PortalOrdersLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-36" />
      <SkeletonTable rows={8} cols={5} />
    </div>
  )
}
