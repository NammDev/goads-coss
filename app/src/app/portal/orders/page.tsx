import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'

import { getOrdersWithItemsByCustomerId } from '@/lib/db/queries'
import { PortalOrdersEmptyState } from './portal-orders-empty'
import { PortalOrdersTable } from './portal-orders-table'

export default async function PortalOrdersPage() {
  // Role guarded by portal/layout.tsx — use auth() (no Clerk API call).
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')
  const orders = await getOrdersWithItemsByCustomerId(userId)

  // Serialize dates for client component (items are plain — pass through)
  const serializedOrders = orders.map((o) => ({
    ...o,
    paymentDate: o.paymentDate?.toISOString() ?? null,
    deliveredAt: o.deliveredAt?.toISOString() ?? null,
    createdAt: o.createdAt.toISOString(),
    updatedAt: o.updatedAt.toISOString(),
  }))

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Your Orders</h1>
      {orders.length === 0 ? (
        <PortalOrdersEmptyState />
      ) : (
        <PortalOrdersTable orders={serializedOrders} />
      )}
    </div>
  )
}
