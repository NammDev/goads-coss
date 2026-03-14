import { ShoppingBagIcon } from 'lucide-react'

import { requireRole } from '@/lib/auth/require-role'
import { getOrdersByCustomerId, getOrderItemsByCustomerId } from '@/lib/db/queries'
import { EmptyState } from '@/components/dashboard/empty-state'
import { PortalOrdersTable } from './portal-orders-table'

export default async function PortalOrdersPage() {
  const session = await requireRole('customer')
  const [orders, orderItems] = await Promise.all([
    getOrdersByCustomerId(session.user.id),
    getOrderItemsByCustomerId(session.user.id),
  ])

  // Serialize dates for client component
  const serializedOrders = orders.map((o) => ({
    ...o,
    paymentDate: o.paymentDate?.toISOString() ?? null,
    deliveredAt: o.deliveredAt?.toISOString() ?? null,
    createdAt: o.createdAt.toISOString(),
    updatedAt: o.updatedAt.toISOString(),
  }))

  const serializedItems = orderItems.map((item) => ({
    ...item,
    createdAt: item.createdAt.toISOString(),
  }))

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Your Orders</h1>
      {orders.length === 0 ? (
        <EmptyState
          icon={ShoppingBagIcon}
          title="No orders yet"
          description="Your orders will appear here once your account manager creates one for you."
        />
      ) : (
        <PortalOrdersTable orders={serializedOrders} orderItems={serializedItems} />
      )}
    </div>
  )
}
