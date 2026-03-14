'use server'

import { ilike, eq, and, or, sql, desc } from 'drizzle-orm'
import { db } from '@/lib/db'
import { orders, products, walletTransactions } from '@/lib/db/schema'

export type SearchResults = {
  orders: { id: string; orderNumber: number; total: string; status: string; href: string }[]
  products: { id: string; name: string; price: string; type: string; href: string }[]
  wallet: { id: string; type: string; amount: string; note: string | null; date: string; href: string }[]
}

/** Search portal data (orders, products, wallet) via ILIKE */
export async function searchPortal(userId: string, query: string): Promise<SearchResults> {
  const trimmed = query.trim()
  if (!trimmed) return { orders: [], products: [], wallet: [] }

  const pattern = `%${trimmed}%`

  const [orderRows, productRows, walletRows] = await Promise.all([
    // Orders: search by orderNumber (cast to text), notes
    db
      .select()
      .from(orders)
      .where(
        and(
          eq(orders.customerId, userId),
          or(
            sql`CAST(${orders.orderNumber} AS TEXT) ILIKE ${pattern}`,
            ilike(orders.notes, pattern),
          ),
        ),
      )
      .orderBy(desc(orders.createdAt))
      .limit(5),

    // Products: search active products by name/description
    db
      .select()
      .from(products)
      .where(
        and(
          eq(products.isActive, true),
          or(
            ilike(products.name, pattern),
            ilike(products.description, pattern),
          ),
        ),
      )
      .limit(5),

    // Wallet: search by note or type
    db
      .select()
      .from(walletTransactions)
      .where(
        and(
          eq(walletTransactions.customerId, userId),
          or(
            ilike(walletTransactions.note, pattern),
            ilike(walletTransactions.type, pattern),
          ),
        ),
      )
      .orderBy(desc(walletTransactions.createdAt))
      .limit(5),
  ])

  return {
    orders: orderRows.map((o) => ({
      id: o.id,
      orderNumber: o.orderNumber,
      total: `$${o.totalAmount}`,
      status: o.status,
      href: `/portal/orders/${o.id}`,
    })),
    products: productRows.map((p) => ({
      id: p.id,
      name: p.name,
      price: `$${p.price}`,
      type: p.type,
      href: `/portal?product=${p.id}`,
    })),
    wallet: walletRows.map((w) => ({
      id: w.id,
      type: w.type,
      amount: `${w.type === 'topup' ? '+' : '-'}$${w.amount}`,
      note: w.note,
      date: new Date(w.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      href: '/portal/wallet',
    })),
  }
}
