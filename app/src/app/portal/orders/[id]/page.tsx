import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeftIcon } from 'lucide-react'

import { StatusBadge } from '@/components/dashboard/status-badge'
import { Button } from '@/components/ui/button'
import { requireRole } from '@/lib/auth/require-role'
import { getOrderById } from '@/lib/db/queries'
import { OrderDetailSummary } from '@/app/admin/orders/[id]/order-detail-summary'
import { OrderDetailDelivered } from '@/app/admin/orders/[id]/order-detail-delivered'

export default async function PortalOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await requireRole('customer')
  const { id } = await params
  const order = await getOrderById(id)

  if (!order || order.customerId !== session.user.id) {
    redirect('/portal/orders')
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
          <Link href="/portal/orders">
            <ArrowLeftIcon className="mr-1 size-4" />Back
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold">{order.id}</h1>
        <StatusBadge status={order.status} />
      </div>

      {/* 2-column: Order Summary + Billing (reuse admin component, no deliver buttons) */}
      <OrderDetailSummary
        order={order}
        deliveredItemIdSet={deliveredItemIdSet}
        deliveredCount={deliveredCount}
        totalItems={totalItems}
      />

      {/* Delivered items with product-type tabs */}
      {order.deliveredItems.length > 0 ? (
        <OrderDetailDelivered
          items={order.deliveredItems}
          toolbar={
            <Button size="sm" asChild>
              <Link href="/portal/products">View all products</Link>
            </Button>
          }
        />
      ) : (
        <Button size="sm" asChild>
          <Link href="/portal/products">View all products</Link>
        </Button>
      )}
    </div>
  )
}
