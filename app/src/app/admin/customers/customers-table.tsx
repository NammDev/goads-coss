'use client'

import type { ReactNode } from 'react'
import { AdminDataTable } from '@/components/dashboard/admin-data-table'
import { adminCustomerColumns, AdminCustomerExpandedRow } from '@/components/dashboard/columns/admin-customer-columns'
import type { CustomerWithStats } from '@/lib/db/queries/customer-queries'

interface CustomersTableProps {
  data: CustomerWithStats[]
  toolbar?: ReactNode
}

export function CustomersTable({ data, toolbar }: CustomersTableProps) {
  return (
    <AdminDataTable
      data={data}
      columns={adminCustomerColumns}
      searchPlaceholder="Search by name or email..."
      filterColumns={['role']}
      renderExpandedRow={(customer) => <AdminCustomerExpandedRow customer={customer} />}
      toolbar={toolbar}
    />
  )
}
