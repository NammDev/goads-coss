import Link from 'next/link'
import { format } from 'date-fns'
import { ArrowRightIcon } from 'lucide-react'

import { StatusBadge } from '@/components/dashboard/status-badge'
import { Card, CardContent } from '@/components/ui/card'
import { formatUSD } from '@/lib/format-currency'
import type { PortalOrderRow } from '@/lib/db/queries/order-queries'

/** Latest orders at a glance on the dashboard — full list lives at /portal/orders. */
export function PortalRecentOrders({ orders }: { orders: PortalOrderRow[] }) {
  const recent = orders.slice(0, 5)

  return (
    <Card className="h-full rounded-2xl">
      <CardContent className="flex h-full flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
            Recent orders
          </span>
          <Link
            href="/portal/orders"
            className="text-muted-foreground hover:text-foreground text-xs font-medium"
          >
            View all
          </Link>
        </div>

        {recent.length === 0 ? (
          <p className="text-muted-foreground flex flex-1 items-center justify-center py-6 text-sm">
            No orders yet.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {recent.map((o) => {
              const itemCount = o.items.reduce((n, i) => n + i.quantity, 0)
              return (
                <Link
                  key={o.id}
                  href={`/portal/orders/${o.id}`}
                  className="group hover:border-primary/40 hover:bg-accent/40 flex items-center gap-3 rounded-xl border p-3 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-medium">#{o.id.slice(0, 8)}</span>
                      <StatusBadge status={o.status} />
                    </div>
                    <p className="text-muted-foreground mt-0.5 text-xs">
                      {itemCount} item{itemCount > 1 ? 's' : ''} ·{' '}
                      {format(new Date(o.createdAt), 'MMM d, yyyy')}
                    </p>
                  </div>
                  <span className="text-sm font-semibold tabular-nums">
                    {formatUSD(o.totalAmount)}
                  </span>
                  <ArrowRightIcon className="text-muted-foreground group-hover:text-foreground size-4 shrink-0 transition-colors" />
                </Link>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
