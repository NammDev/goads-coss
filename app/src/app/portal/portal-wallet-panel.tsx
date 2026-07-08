import Link from 'next/link'
import { format } from 'date-fns'

import { Card, CardContent } from '@/components/ui/card'
import { formatUSD } from '@/lib/format-currency'
import { cn } from '@/lib/utils'
import type { WalletTransaction } from '@/lib/db/queries/wallet-queries'

/** Balance + latest transactions on the dashboard — full ledger at /portal/wallet. */
export function PortalWalletPanel({
  balance,
  transactions,
}: {
  balance: string
  transactions: WalletTransaction[]
}) {
  const recent = transactions.slice(0, 5)

  return (
    <Card className="h-full rounded-2xl">
      <CardContent className="flex h-full flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
            Wallet
          </span>
          <Link
            href="/portal/wallet"
            className="text-muted-foreground hover:text-foreground text-xs font-medium"
          >
            View all
          </Link>
        </div>

        <div>
          <p className="text-2xl font-bold tracking-tight tabular-nums">{formatUSD(balance)}</p>
          <p className="text-muted-foreground text-xs">Available balance</p>
        </div>

        {recent.length === 0 ? (
          <p className="text-muted-foreground py-4 text-sm">No transactions yet.</p>
        ) : (
          <div className="flex flex-col gap-2.5 border-t pt-3">
            {recent.map((tx) => {
              const isTopup = tx.type === 'topup'
              return (
                <div key={tx.id} className="flex items-center justify-between gap-2 text-sm">
                  <span className="text-muted-foreground">
                    {format(new Date(tx.createdAt), 'MMM d · HH:mm')}
                  </span>
                  {/* Signed +/- with in/out colour already says top-up vs deduct. */}
                  <span
                    className={cn(
                      'font-semibold tabular-nums',
                      isTopup
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400',
                    )}
                  >
                    {isTopup ? '+' : '-'}
                    {formatUSD(tx.amount)}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
