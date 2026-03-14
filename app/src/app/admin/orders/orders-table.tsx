'use client'

import { AdminDataTable } from '@/components/dashboard/admin-data-table'
import { adminOrderColumns, AdminOrderExpandedRow } from '@/components/dashboard/columns/admin-order-columns'
import type { OrderWithCustomer } from '@/lib/db/queries/order-queries'

export function OrdersTable({ data }: { data: OrderWithCustomer[] }) {
  return (
    <AdminDataTable
      data={data}
      columns={adminOrderColumns}
      searchPlaceholder="Search by order ID or customer..."
      filterColumns={['status']}
      renderExpandedRow={(order) => <AdminOrderExpandedRow order={order} />}
    />
  )
}
