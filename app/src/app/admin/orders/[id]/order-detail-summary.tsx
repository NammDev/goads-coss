import Link from 'next/link'
import { format, addDays, differenceInDays } from 'date-fns'
import { CalendarIcon, UserIcon, ShieldCheckIcon } from 'lucide-react'

import { StatusBadge } from '@/components/dashboard/status-badge'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
  // Warranty: 7 days from latest delivery
  const latestDelivery = order.deliveredItems.length > 0
    ? new Date(Math.max(...order.deliveredItems.map((d) => d.deliveredAt.getTime())))
    : null
  const warrantyEnd = latestDelivery ? addDays(latestDelivery, 7) : null
  const warrantyDaysLeft = warrantyEnd ? differenceInDays(warrantyEnd, new Date()) : null

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      {/* Left: Order Summaries — Top Products list style */}
      <Card className="lg:col-span-8">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle>Order Summaries</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={order.status} />
            <Badge variant="outline" className="text-xs">
              {deliveredCount}/{totalItems} delivered
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {order.items.map((item, index) => {
            const isDelivered = deliveredItemIdSet.has(item.id)
            const subtotal = parseFloat(item.unitPrice) * item.quantity
            return (
              <div key={item.id} className="flex items-center gap-3 rounded-lg border p-3">
                {/* Rank circle */}
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">
                  #{index + 1}
                </div>
                {/* Left: product info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium truncate">{item.productName}</span>
                    <Badge variant="outline" className="text-xs">{item.productType}</Badge>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <span>Qty: {item.quantity}</span>
                    <span>·</span>
                    <span>{formatUSD(item.unitPrice)} each</span>
                  </div>
                </div>
                {/* Right: price + action */}
                <div className="flex items-center gap-3">
                  {isDelivered ? (
                    <Badge variant="default" className="text-xs">Delivered</Badge>
                  ) : (
                    <DeliverDialog
                      orderId={order.id}
                      orderItemId={item.id}
                      productType={item.productType as ProductType}
                      productName={item.productName}
                    />
                  )}
                  <span className="text-sm font-semibold">{formatUSD(subtotal)}</span>
                </div>
              </div>
            )
          })}
          {/* Total row */}
          <div className="flex items-center justify-end gap-4 pt-1">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="text-lg font-bold">{formatUSD(order.totalAmount)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Right: Billing — compact card info */}
      <Card className="lg:col-span-4">
        <CardHeader>
          <CardTitle>Billing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Customer */}
          <div className="flex items-center gap-3 rounded-lg border p-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <UserIcon className="size-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Customer</p>
              <Link
                href={`/admin/customers/${order.customerId}`}
                className="text-sm font-medium hover:text-primary hover:underline"
              >
                {order.customerName}
              </Link>
            </div>
          </div>

          {/* Created */}
          <div className="flex items-center gap-3 rounded-lg border p-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CalendarIcon className="size-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Created</p>
              <p className="text-sm font-medium">{format(new Date(order.createdAt), 'MMM d, yyyy HH:mm')}</p>
            </div>
          </div>

          {/* Warranty */}
          <div className="flex items-center gap-3 rounded-lg border p-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <ShieldCheckIcon className="size-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Warranty</p>
              {warrantyEnd ? (
                <p className="text-sm font-medium">
                  {warrantyDaysLeft !== null && warrantyDaysLeft > 0
                    ? `${warrantyDaysLeft} days left`
                    : warrantyDaysLeft === 0
                      ? 'Expires today'
                      : 'Expired'}
                  <span className="ml-2 text-xs text-muted-foreground">
                    ({format(warrantyEnd, 'MMM d, yyyy')})
                  </span>
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">Not started</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
