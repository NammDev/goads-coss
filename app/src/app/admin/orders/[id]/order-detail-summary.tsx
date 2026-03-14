import Link from 'next/link'
import { format } from 'date-fns'

import { StatusBadge } from '@/components/dashboard/status-badge'
import { Separator } from '@/components/ui/separator'
import { formatUSD } from '@/lib/format-currency'
import { DeliverDialog } from './deliver-dialog'
import type { OrderDetail } from '@/lib/db/queries/order-queries'
import type { ProductType } from '@/lib/validators/credential-schemas'

interface Props {
  order: OrderDetail
  deliveredItemIdSet: Set<string>
  deliveredCount: number
  totalItems: number
}

export function OrderDetailSummary({ order, deliveredItemIdSet, deliveredCount, totalItems }: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      {/* Left: Order Summaries (wider) */}
      <div className="lg:col-span-8">
        <h2 className="mb-4 text-lg font-semibold">Order Summaries</h2>
        <div className="overflow-hidden rounded-lg border">
          {/* Top row: Created + Order ID */}
          <div className="grid grid-cols-2 divide-x">
            <div className="p-4">
              <p className="text-xs text-muted-foreground">Created</p>
              <p className="mt-1 font-medium">{format(new Date(order.createdAt), 'MMM d, yyyy')}</p>
            </div>
            <div className="p-4">
              <p className="text-xs text-muted-foreground">Order ID</p>
              <p className="mt-1 font-mono font-medium">{order.id.slice(0, 8)}</p>
            </div>
          </div>

          {/* Line items */}
          {order.items.map((item) => {
            const isDelivered = deliveredItemIdSet.has(item.id)
            const subtotal = parseFloat(item.unitPrice) * item.quantity
            return (
              <div key={item.id} className="flex items-center justify-between border-t px-4 py-3">
                <div>
                  <p className="font-medium">{item.productName}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.quantity} × {formatUSD(item.unitPrice)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {!isDelivered && (
                    <DeliverDialog
                      orderId={order.id}
                      orderItemId={item.id}
                      productType={item.productType as ProductType}
                      productName={item.productName}
                    />
                  )}
                  <span className="font-medium">{formatUSD(subtotal)}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Right: Billing (narrower) */}
      <div className="lg:col-span-4">
        <h2 className="mb-4 text-lg font-semibold">Billing</h2>
        <div className="space-y-4">
          <div>
            <p className="text-xs text-muted-foreground">Name</p>
            <Link
              href={`/admin/customers/${order.customerId}`}
              className="font-medium hover:text-primary hover:underline"
            >
              {order.customerName}
            </Link>
          </div>
          <Separator />
          <div>
            <p className="text-xs text-muted-foreground">Status</p>
            <div className="mt-1">
              <StatusBadge status={order.status} />
            </div>
          </div>
          <Separator />
          <div>
            <p className="text-xs text-muted-foreground">Delivery</p>
            <p className="font-medium">{deliveredCount}/{totalItems} items</p>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="font-semibold">Total</span>
            <span className="text-lg font-bold">{formatUSD(order.totalAmount)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
