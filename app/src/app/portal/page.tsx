'use client'

import Link from 'next/link'
import { ShoppingCartIcon, PackageIcon, ZapIcon } from 'lucide-react'

import { StatsCard } from '@/components/dashboard/stats-card'
import { StatusBadge } from '@/components/dashboard/status-badge'
import { OrderTimeline } from '@/components/dashboard/order-timeline'
import { EmptyState } from '@/components/dashboard/empty-state'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { mockOrders } from '@/data/mock-orders'
import { mockDeliveredItems } from '@/data/mock-delivered-items'
import { format } from 'date-fns'

const CURRENT_CUSTOMER_ID = 'cust-001'

const myOrders = mockOrders.filter(o => o.customerId === CURRENT_CUSTOMER_ID)
const myDeliveredItems = mockDeliveredItems.filter(d => d.customerId === CURRENT_CUSTOMER_ID)
const activeOrdersCount = myOrders.filter(o => o.status !== 'completed' && o.status !== 'cancelled' && o.status !== 'refunded').length

const formatVND = (amount: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)

export default function PortalDashboardPage() {
  const recentOrders = myOrders.slice(0, 5)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Welcome back, Nguyen Van A</h1>
        <p className="text-muted-foreground mt-1 text-sm">Here&apos;s an overview of your account.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatsCard title="Total Orders" value={myOrders.length} icon={ShoppingCartIcon} />
        <StatsCard title="Active" value={activeOrdersCount} icon={ZapIcon} />
        <StatsCard title="Products Received" value={myDeliveredItems.length} icon={PackageIcon} />
      </div>

      {/* Recent Orders */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Orders</h2>
          <Link href="/portal/orders" className="text-primary text-sm hover:underline">
            View all →
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <EmptyState
            icon={ShoppingCartIcon}
            title="No orders yet"
            description="You have no orders."
          />
        ) : (
          <div className="grid gap-4">
            {recentOrders.map(order => (
              <Card key={order.id} className="shadow-none">
                <CardContent className="p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="space-y-1">
                      <p className="font-medium">{order.id}</p>
                      <p className="text-muted-foreground text-sm">
                        {order.items.length} item{order.items.length !== 1 ? 's' : ''} · {formatVND(order.totalAmount)}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {format(new Date(order.createdAt), 'dd/MM/yyyy')}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <StatusBadge status={order.status} />
                      <Link
                        href={`/portal/orders/${order.id}`}
                        className="text-primary text-xs hover:underline"
                      >
                        View details →
                      </Link>
                    </div>
                  </div>
                  <div className="mt-3">
                    <OrderTimeline status={order.status} compact />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
