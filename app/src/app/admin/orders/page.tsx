'use client'

import { AdminDataTable } from '@/components/dashboard/admin-data-table'
import { orderColumns, OrderExpandedRow } from '@/components/dashboard/columns/order-columns'
import { mockOrders } from '@/data/mock-orders'

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Orders</h1>
      <AdminDataTable
        data={mockOrders}
        columns={orderColumns}
        searchPlaceholder="Search by order ID or customer..."
        renderExpandedRow={(order) => <OrderExpandedRow order={order} />}
      />
    </div>
  )
}
