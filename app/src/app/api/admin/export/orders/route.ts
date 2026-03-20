import { auth } from '@clerk/nextjs/server'
import { eq, desc } from 'drizzle-orm'
import { db } from '@/lib/db'
import { users, orders } from '@/lib/db/schema'
import { dateRangeWhere } from '@/lib/db/queries/date-range-utils'
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
  const statusFilter = params.status

  const dateFilter = dateRange ? dateRangeWhere(orders.createdAt, dateRange) : undefined

  const rows = await db
    .select({
      orderNumber: orders.orderNumber,
      customerName: users.name,
      customerEmail: users.email,
      status: orders.status,
      totalAmount: orders.totalAmount,
      currency: orders.currency,
      paymentMethod: orders.paymentMethod,
      createdAt: orders.createdAt,
    })
    .from(orders)
    .leftJoin(users, eq(orders.customerId, users.id))
    .where(dateFilter)
    .orderBy(desc(orders.createdAt))

  const filtered = statusFilter ? rows.filter((r) => r.status === statusFilter) : rows

  const headers = ['Order#', 'Customer', 'Email', 'Status', 'Amount', 'Currency', 'Payment Method', 'Created At']
  const data = filtered.map((r) => [
    r.orderNumber,
    r.customerName ?? '',
    r.customerEmail ?? '',
    r.status,
    r.totalAmount,
    r.currency,
    r.paymentMethod ?? '',
    r.createdAt.toISOString(),
  ])

  return csvResponse(generateCSV(headers, data), 'orders.csv')
}
