import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeftIcon } from 'lucide-react'

import { StatusBadge } from '@/components/dashboard/status-badge'
import { Button } from '@/components/ui/button'
import { requireRole } from '@/lib/auth/require-role'
import { getOrderById, getWarrantyClaimsByOrderId } from '@/lib/db/queries'
import { OrderDetailDelivered } from '@/app/admin/orders/[id]/order-detail-delivered'
import { PortalOrderSummary } from './portal-order-summary'

export default async function PortalOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await requireRole('customer')
  const { id } = await params
  const [order, claims] = await Promise.all([
    getOrderById(id),
    getWarrantyClaimsByOrderId(id),
  ])

  if (!order || order.customerId !== session.user.id) {
    redirect('/portal/orders')
  }

  const deliveredItemIdSet = new Set(
    order.deliveredItems.map((d) => d.orderItemId).filter(Boolean) as string[]
  )
  const totalItems = order.items.length
  const deliveredCount = order.deliveredItems.length

  // Build claim status lookup map: deliveredItemId → claimStatus
  const claimStatusMap = new Map<string, string>(
    claims.map((c) => [c.deliveredItemId, c.status])
  )

  return (
    <div className="space-y-6">
      {/* Header — back, friendly order label, status */}
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/portal/orders">
            <ArrowLeftIcon className="mr-1 size-4" />Back
          </Link>
        </Button>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold tracking-tight">
              Order <span className="font-mono">#{order.id.slice(0, 8)}</span>
            </h1>
            <StatusBadge status={order.status} />
          </div>
        </div>
      </div>

      {/* 2-column: Order Summary + Billing (portal — no admin links/actions) */}
      <PortalOrderSummary
        order={order}
        deliveredItemIdSet={deliveredItemIdSet}
        deliveredCount={deliveredCount}
        totalItems={totalItems}
      />

      {/* Delivered items with product-type tabs */}
      {order.deliveredItems.length > 0 ? (
        <OrderDetailDelivered
          items={order.deliveredItems}
          claimStatusMap={claimStatusMap}
          showWarrantyActions
          toolbar={
            <Button size="sm" asChild>
              <Link href="/portal/products?type=bm">View all products</Link>
            </Button>
          }
        />
      ) : (
        <Button size="sm" asChild>
          <Link href="/portal/products?type=bm">View all products</Link>
        </Button>
      )}
    </div>
  )
}
