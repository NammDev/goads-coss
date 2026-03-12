import { getAllCustomers } from '@/lib/db/queries'
import { CustomersTable } from './customers-table'
import { CreateCustomerDialog } from './create-customer-dialog'

export default async function CustomersPage() {
  const customers = await getAllCustomers()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Customers</h1>
      <CustomersTable data={customers} toolbar={<CreateCustomerDialog />} />
    </div>
  )
}
