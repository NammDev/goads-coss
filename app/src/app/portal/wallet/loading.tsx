import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { SkeletonTable } from '@/components/dashboard/skeleton-table'

export default function PortalWalletLoading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-24" />
        <Skeleton className="mt-1 h-4 w-56" />
      </div>
      <Card className="shadow-none">
        <CardHeader className="pb-2">
          <Skeleton className="h-5 w-36" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-9 w-32" />
          <Skeleton className="mt-1 h-3 w-28" />
        </CardContent>
      </Card>
      <div className="space-y-4">
        <Skeleton className="h-6 w-44" />
        <SkeletonTable rows={6} cols={4} />
      </div>
    </div>
  )
}
