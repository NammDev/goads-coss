import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'

import { getAllDeliveredItemsDetailedByCustomerId } from '@/lib/db/queries'
import type { SerializedDeliveredRow } from '@/components/dashboard/columns/portal-product-columns'
import { ProductTabsView } from './product-tabs-view'

/**
 * Products page — fetches ALL delivered items once, then BM/Profile/Page switch
 * instantly client-side (see ProductTabsView). This component intentionally does
 * NOT read searchParams, so changing `?type=` never re-runs the server / refetches.
 */
export default async function PortalProductsPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const dbItems = await getAllDeliveredItemsDetailedByCustomerId(userId)

  const items: SerializedDeliveredRow[] = dbItems.map((item) => ({
    id: item.id,
    orderId: item.orderId,
    orderItemId: item.orderItemId,
    productType: item.productType,
    productName: item.productName,
    uid: item.uid,
    credentials: item.credentials,
    note: item.note,
    customerNote: item.customerNote,
    checkLive: item.checkLive,
    status: item.status,
    warrantyUntil: item.warrantyUntil ? item.warrantyUntil.toISOString() : null,
    deliveredAt: item.deliveredAt.toISOString(),
  }))

  return <ProductTabsView items={items} />
}
