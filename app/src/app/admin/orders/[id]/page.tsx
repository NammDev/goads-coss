import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeftIcon } from 'lucide-react'

import { StatusBadge } from '@/components/dashboard/status-badge'
import { getOrderById } from '@/lib/db/queries'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ShareLinkSection } from '@/components/dashboard/share-link-section'
import { OrderDetailSummary } from './order-detail-summary'
import { OrderDetailDelivered } from './order-detail-delivered'
import { WarrantyClaimsSection } from './warranty-claims-section'

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const order = await getOrderById(id)

  if (!order) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/orders"><ArrowLeftIcon className="mr-1 size-4" />Back</Link>
        </Button>
        <p className="text-muted-foreground">Order not found.</p>
      </div>
    )
  }

  const deliveredItemIdSet = new Set(
    order.deliveredItems.map((d) => d.orderItemId).filter(Boolean) as string[]
  )
  const totalItems = order.items.length
  const deliveredCount = order.deliveredItems.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/orders"><ArrowLeftIcon className="mr-1 size-4" />Back</Link>
        </Button>
        <h1 className="text-2xl font-semibold">{order.id}</h1>
        <StatusBadge status={order.status} />
      </div>

      {/* 2-column: Order Summary + Line Items */}
      <OrderDetailSummary
        order={order}
        deliveredItemIdSet={deliveredItemIdSet}
        deliveredCount={deliveredCount}
        totalItems={totalItems}
      />

      {/* Delivered items grouped by product type */}
      {order.deliveredItems.length > 0 ? (
        <OrderDetailDelivered
          items={order.deliveredItems}
          toolbar={<ShareLinkSection orderId={order.id} shareToken={order.shareToken} />}
        />
      ) : (
        <ShareLinkSection orderId={order.id} shareToken={order.shareToken} />
      )}

      {/* Warranty claims for this order */}
      <WarrantyClaimsSection orderId={order.id} />

      {/* Notes */}
      {order.notes && (
        <Card className="shadow-none">
          <CardHeader><span className="text-lg font-semibold">Notes</span></CardHeader>
          <CardContent>
            <p className="text-sm">{order.notes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
