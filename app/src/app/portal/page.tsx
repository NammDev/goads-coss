import { requireRole } from '@/lib/auth/require-role'
import { getAllProductsWithCustomerPrices } from '@/lib/db/queries/product-queries'
import { ShopCatalog } from './shop-catalog'

/** Ordered product types for consistent display */
const typeOrder = [
  'agency_account', 'bm', 'profile', 'page',
  'google_agency', 'tiktok_agency', 'tiktok_account',
  'blue_verification', 'unban', 'other',
]

export default async function PortalShopPage() {
  const session = await requireRole('customer')
  const userId = session.user.id

  const dbProducts = await getAllProductsWithCustomerPrices(userId)

  // Map DB products → card shape
  const products = dbProducts.map((p) => ({
    name: p.name,
    description: p.description ?? undefined,
    price: Number(p.customPrice?.price ?? p.price) as number | 'contact',
    badge: p.type,
    _type: p.type,
  }))

  // Unique product types, sorted
  const productTypes = [...new Set(dbProducts.map((p) => p.type))]
    .sort((a, b) => typeOrder.indexOf(a) - typeOrder.indexOf(b))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Shop</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Browse products and contact us to order.
        </p>
      </div>

      <ShopCatalog products={products} productTypes={productTypes} />
    </div>
  )
}
