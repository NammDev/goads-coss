'use client'

import { AdminDataTable } from '@/components/dashboard/admin-data-table'
import { portalOrderColumns, PortalOrderExpandedRow } from '@/components/dashboard/columns/portal-order-columns'
import { mockOrders } from '@/data/mock-orders'

const CURRENT_CUSTOMER_ID = 'cust-001'

export default function PortalOrdersPage() {
  const myOrders = mockOrders.filter((o) => o.customerId === CURRENT_CUSTOMER_ID)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Your Orders</h1>
      <AdminDataTable
        data={myOrders}
        columns={portalOrderColumns}
        searchPlaceholder="Search by order ID..."
        renderExpandedRow={(order) => <PortalOrderExpandedRow order={order} />}
      />
    </div>
  )
}
