import { Skeleton } from '@/components/ui/skeleton'
import { SkeletonTable } from '@/components/dashboard/skeleton-table'

export default function PortalProductsLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-40" />
      <SkeletonTable rows={8} cols={7} />
    </div>
  )
}
