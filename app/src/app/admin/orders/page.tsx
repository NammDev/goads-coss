import Link from 'next/link'
import { PlusIcon } from 'lucide-react'

import { getAllOrders } from '@/lib/db/queries'
import { Button } from '@/components/ui/button'
import { OrdersTable } from './orders-table'

export default async function OrdersPage() {
  const orders = await getAllOrders()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Orders</h1>
        <Button asChild size="sm">
          <Link href="/admin/orders/new">
            <PlusIcon className="mr-1 size-4" />
            Create Order
          </Link>
        </Button>
      </div>
      <OrdersTable data={orders} />
    </div>
  )
}
