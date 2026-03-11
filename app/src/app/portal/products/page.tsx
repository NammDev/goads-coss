'use client'

import Link from 'next/link'
import { PackageIcon } from 'lucide-react'

import { EmptyState } from '@/components/dashboard/empty-state'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockDeliveredItems } from '@/data/mock-delivered-items'
import { productTypeLabels } from '@/data/mock-products'
import type { ProductType } from '@/data/mock-products'
import type { DeliveredItemStatus } from '@/data/mock-delivered-items'

const CURRENT_CUSTOMER_ID = 'cust-001'

const STATUS_LABELS: Record<DeliveredItemStatus, { label: string; className: string }> = {
  active: { label: 'Active', className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' },
  inactive: { label: 'Inactive', className: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400' },
  suspended: { label: 'Suspended', className: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' },
  warranty_expired: { label: 'Warranty Expired', className: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' },
}

export default function PortalProductsPage() {
  const myItems = mockDeliveredItems.filter(d => d.customerId === CURRENT_CUSTOMER_ID)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Your Products</h1>
        <p className="text-muted-foreground mt-1 text-sm">{myItems.length} product{myItems.length !== 1 ? 's' : ''} received</p>
      </div>

      {myItems.length === 0 ? (
        <EmptyState
          icon={PackageIcon}
          title="No products yet"
          description="You have not received any products."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {myItems.map(item => {
            const statusConfig = STATUS_LABELS[item.status]
            const typeLabel = productTypeLabels[item.productType as ProductType] ?? item.productType

            return (
              <Card key={item.id} className="shadow-none">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium leading-tight">{item.productName}</p>
                    <Badge
                      variant="outline"
                      className={`border-transparent shrink-0 text-xs ${statusConfig.className}`}
                    >
                      {statusConfig.label}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs">{typeLabel}</Badge>
                    <span className="text-muted-foreground text-xs">#{item.orderId}</span>
                  </div>
                  <Link
                    href={`/portal/products/${item.id}`}
                    className="text-primary text-sm hover:underline"
                  >
                    View →
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
