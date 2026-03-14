import { requireRole } from '@/lib/auth/require-role'
import { getOrdersByCustomerId, getOrderItemsByCustomerId } from '@/lib/db/queries'
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
      <PortalOrdersTable orders={serializedOrders} orderItems={serializedItems} />
    </div>
  )
}
