'use client'

import Link from 'next/link'
import { ShoppingCartIcon } from 'lucide-react'

import { StatusBadge } from '@/components/dashboard/status-badge'
import { OrderTimeline } from '@/components/dashboard/order-timeline'
import { EmptyState } from '@/components/dashboard/empty-state'
import { Card, CardContent } from '@/components/ui/card'
import { mockOrders } from '@/data/mock-orders'
import { format } from 'date-fns'

const CURRENT_CUSTOMER_ID = 'cust-001'

const formatVND = (amount: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)

export default function PortalOrdersPage() {
  const myOrders = mockOrders.filter(o => o.customerId === CURRENT_CUSTOMER_ID)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Your Orders</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          {myOrders.length} order{myOrders.length !== 1 ? 's' : ''}
        </p>
      </div>

      {myOrders.length === 0 ? (
        <EmptyState
          icon={ShoppingCartIcon}
          title="No orders yet"
          description="You have no orders."
        />
      ) : (
        <div className="grid gap-4">
          {myOrders.map(order => (
            <Card key={order.id} className="shadow-none">
              <CardContent className="p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="space-y-1">
                    <p className="font-medium">{order.id}</p>
                    <p className="text-muted-foreground text-sm">
                      {order.items.map(i => i.productName).join(', ')}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''} · {formatVND(order.totalAmount)}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm')}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <StatusBadge status={order.status} />
                    <Link
                      href={`/portal/orders/${order.id}`}
                      className="text-primary text-sm hover:underline"
                    >
                      View details →
                    </Link>
                  </div>
                </div>
                <div className="mt-3 overflow-x-auto">
                  <OrderTimeline status={order.status} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
