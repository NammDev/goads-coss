import { getAllProductCounts } from '@/lib/db/queries'
import { ProductTypeTabs } from '@/components/dashboard/product-type-tabs'

export default async function AdminProductsLayout({ children }: { children: React.ReactNode }) {
  const productCounts = await getAllProductCounts()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Products</h1>
      <ProductTypeTabs productCounts={productCounts} basePath="/admin/products" />
      {children}
    </div>
  )
}
