import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default function OrderDetailLoading() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>

      {/* 2-col: Order Summaries + Billing */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <Card className="lg:col-span-8">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <Skeleton className="h-6 w-40" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg border p-3">
                <Skeleton className="size-8 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-6 w-20" />
              </div>
            ))}
            <div className="flex justify-end pt-1">
              <Skeleton className="h-7 w-24" />
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-4">
          <CardHeader>
            <Skeleton className="h-6 w-16" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg border p-3">
                <Skeleton className="size-8 rounded-full" />
                <div className="space-y-1.5">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Delivered Items */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-9 w-48 rounded-md" />
        <div className="space-y-3 pt-2">
          <div className="flex gap-3">
            <Skeleton className="h-9 w-64" />
            <Skeleton className="h-9 w-36 ml-auto" />
          </div>
          <div className="overflow-hidden rounded-lg border">
            <Skeleton className="h-12 w-full" />
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-14 w-full border-t" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
