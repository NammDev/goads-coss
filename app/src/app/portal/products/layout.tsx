import { requireRole } from '@/lib/auth/require-role'
import { getProductCountsByCustomerId } from '@/lib/db/queries'
import { ProductTypeTabs } from '@/components/dashboard/product-type-tabs'

export default async function PortalProductsLayout({ children }: { children: React.ReactNode }) {
  const session = await requireRole('customer')
  const productCounts = await getProductCountsByCustomerId(session.user.id)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Products</h1>
      <ProductTypeTabs productCounts={productCounts} basePath="/portal/products" />
      {children}
    </div>
  )
}
