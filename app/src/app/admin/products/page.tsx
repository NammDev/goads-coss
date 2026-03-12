'use client'

import Link from 'next/link'
import { PlusIcon } from 'lucide-react'

import { AdminDataTable } from '@/components/dashboard/admin-data-table'
import { productColumns, ProductExpandedRow } from '@/components/dashboard/columns/product-columns'
import { mockProducts } from '@/data/mock-products'
import { Button } from '@/components/ui/button'

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Products</h1>
        <Button asChild>
          <Link href="/admin/products/new">
            <PlusIcon className="mr-1 size-4" />
            New Product
          </Link>
        </Button>
      </div>
      <AdminDataTable
        data={mockProducts}
        columns={productColumns}
        searchPlaceholder="Search products..."
        renderExpandedRow={(product) => <ProductExpandedRow product={product} />}
      />
    </div>
  )
}
