'use client'

import { useRouter } from 'next/navigation'

import { AdminDataTable } from '@/components/dashboard/admin-data-table'
import {
  portalOrderColumns,
  type SerializedOrder,
} from '@/components/dashboard/columns/portal-order-columns'

interface PortalOrdersTableProps {
  orders: SerializedOrder[]
}

export function PortalOrdersTable({ orders }: PortalOrdersTableProps) {
  const router = useRouter()
  return (
    <AdminDataTable
      dense
      data={orders}
      columns={portalOrderColumns}
      searchPlaceholder="Search orders..."
      filterColumns={['status']}
      onRowClick={(order) => router.push(`/portal/orders/${order.id}`)}
    />
  )
}
