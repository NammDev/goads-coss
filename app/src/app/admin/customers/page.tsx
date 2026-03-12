'use client'

import { AdminDataTable } from '@/components/dashboard/admin-data-table'
import { customerColumns, CustomerExpandedRow } from '@/components/dashboard/columns/customer-columns'
import { mockCustomers } from '@/data/mock-customers'

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Customers</h1>
      <AdminDataTable
        data={mockCustomers}
        columns={customerColumns}
        searchPlaceholder="Search by name or email..."
        renderExpandedRow={(customer) => <CustomerExpandedRow customer={customer} />}
      />
    </div>
  )
}
