import { auth } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { getAllDeliveredItems } from '@/lib/db/queries/delivered-item-queries'
import { resolveDateRange } from '@/lib/date-range-presets'
import { generateCSV, csvResponse } from '@/lib/csv-utils'

const ADMIN_ROLES = ['super_admin', 'staff']

export async function GET(request: Request) {
  const { userId } = await auth()
  if (!userId) return new Response('Unauthorized', { status: 401 })

  const [user] = await db.select({ role: users.role }).from(users).where(eq(users.id, userId)).limit(1)
  if (!user || !ADMIN_ROLES.includes(user.role)) {
    return new Response('Forbidden', { status: 403 })
  }

  const url = new URL(request.url)
  const params = Object.fromEntries(url.searchParams)
  const dateRange = resolveDateRange(params)

  const items = await getAllDeliveredItems(dateRange)

  const headers = ['Order ID', 'Product Type', 'UID', 'Status', 'Warranty Until', 'Delivered At']
  const rows = items.map((item) => [
    item.orderId,
    item.productType,
    item.uid ?? '',
    item.status,
    item.warrantyUntil ? item.warrantyUntil.toISOString() : '',
    item.deliveredAt.toISOString(),
  ])

  return csvResponse(generateCSV(headers, rows), 'delivered-items.csv')
}
