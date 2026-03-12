import Link from 'next/link'
import { format } from 'date-fns'

import { StatusBadge } from '@/components/dashboard/status-badge'
import { OrderTimeline } from '@/components/dashboard/order-timeline'
import { Card, CardContent } from '@/components/ui/card'
import { requireRole } from '@/lib/auth/require-role'
import { getPortalStats, getOrdersByCustomerId } from '@/lib/db/queries'
import { formatUSD } from '@/lib/format-currency'
import { PortalStats } from './portal-stats'

export default async function PortalDashboardPage() {
  const session = await requireRole('customer')
  const userId = session.user.id

  const [stats, orders] = await Promise.all([
    getPortalStats(userId),
    getOrdersByCustomerId(userId),
  ])

  const recentOrders = orders.slice(0, 5)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">
          Welcome back, {session.user.name ?? 'Customer'}
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">Here&apos;s an overview of your account.</p>
      </div>

      {/* Stats */}
      <PortalStats
        totalOrders={stats.totalOrders}
        pendingOrders={stats.pendingOrders}
        activeItems={stats.activeItems}
      />

      {/* Recent Orders */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Orders</h2>
          <Link href="/portal/orders" className="text-primary text-sm hover:underline">
            View all →
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
            <p className="text-lg font-semibold">No orders yet</p>
            <p className="text-muted-foreground text-sm">You have no orders.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {recentOrders.map(order => (
              <Card key={order.id} className="shadow-none">
                <CardContent className="p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="space-y-1">
                      <p className="font-medium">{order.id}</p>
                      <p className="text-muted-foreground text-sm">
                        {formatUSD(order.totalAmount)}
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
