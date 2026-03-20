import { Suspense } from 'react'
import { getAllCustomers } from '@/lib/db/queries'
import { CustomersTable } from './customers-table'
import { CreateCustomerDialog } from './create-customer-dialog'
import { ExportCSVButton } from '@/components/dashboard/export-csv-button'

export default async function CustomersPage() {
  const customers = await getAllCustomers()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Customers</h1>
      <CustomersTable
        data={customers}
        toolbar={
          <div className="flex items-center gap-2">
            <Suspense>
              <ExportCSVButton endpoint="/api/admin/export/customers" />
            </Suspense>
            <CreateCustomerDialog />
          </div>
        }
      />
    </div>
  )
}
