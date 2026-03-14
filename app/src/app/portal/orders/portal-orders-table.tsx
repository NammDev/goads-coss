'use client'

import { AdminDataTable } from '@/components/dashboard/admin-data-table'
import {
  portalOrderColumns,
  PortalOrderExpandedRow,
  type SerializedOrder,
  type SerializedOrderItem,
} from '@/components/dashboard/columns/portal-order-columns'

interface PortalOrdersTableProps {
  orders: SerializedOrder[]
  orderItems: SerializedOrderItem[]
}

export function PortalOrdersTable({ orders, orderItems }: PortalOrdersTableProps) {
  return (
    <AdminDataTable
      data={orders}
      columns={portalOrderColumns}
      searchPlaceholder="Search by order ID..."
      filterColumns={['status']}
      renderExpandedRow={(order) => (
        <PortalOrderExpandedRow order={order} orderItems={orderItems} />
      )}
    />
  )
}
