import { requireRole } from '@/lib/auth/require-role'
import { getPortalStats } from '@/lib/db/queries'
import { getAllProductsWithCustomerPrices } from '@/lib/db/queries/product-queries'
import { PortalStats } from './portal-stats'
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

  const [stats, dbProducts] = await Promise.all([
    getPortalStats(userId),
    getAllProductsWithCustomerPrices(userId),
  ])

  // Map DB products → ProductCard shape
  const products = dbProducts.map((p) => ({
    name: p.name,
    description: p.description ?? undefined,
    price: Number(p.customPrice?.price ?? p.price) as number | 'contact',
    badge: p.type,
    _type: p.type,
  }))

  // Unique product types, sorted by typeOrder
  const productTypes = [...new Set(dbProducts.map((p) => p.type))]
    .sort((a, b) => typeOrder.indexOf(a) - typeOrder.indexOf(b))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">
          Welcome back, {session.user.name ?? 'Customer'}
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Browse products and add to cart.
        </p>
      </div>

      <PortalStats
        totalOrders={stats.totalOrders}
        pendingOrders={stats.pendingOrders}
        activeItems={stats.activeItems}
      />

      <ShopCatalog products={products} productTypes={productTypes} />
    </div>
  )
}
