import Link from 'next/link'
import { PlusIcon } from 'lucide-react'
import { Suspense } from 'react'

import { getAllOrders } from '@/lib/db/queries'
import { Button } from '@/components/ui/button'
import { ExportCSVButton } from '@/components/dashboard/export-csv-button'
import { OrdersTable } from './orders-table'

export default async function OrdersPage() {
  const orders = await getAllOrders()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Orders</h1>
      <OrdersTable
        data={orders}
        toolbar={
          <div className="flex items-center gap-2">
            <Suspense>
              <ExportCSVButton endpoint="/api/admin/export/orders" />
            </Suspense>
            <Button asChild size="sm">
              <Link href="/admin/orders/new">
                <PlusIcon className="mr-1 size-4" />
                Create Order
              </Link>
            </Button>
          </div>
        }
      />
    </div>
  )
}
