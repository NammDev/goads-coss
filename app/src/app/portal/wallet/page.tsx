import { WalletIcon } from 'lucide-react'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { requireRole } from '@/lib/auth/require-role'
import { getWalletTransactions, getCustomerBalance } from '@/lib/db/queries/wallet-queries'
import { formatUSD } from '@/lib/format-currency'
import { WalletTable } from './wallet-table'

export default async function PortalWalletPage() {
  const session = await requireRole('customer')
  const userId = session.user.id

  const [transactions, balance] = await Promise.all([
    getWalletTransactions(userId),
    getCustomerBalance(userId),
  ])

  const serializedTransactions = transactions.map((tx) => ({
    ...tx,
    createdAt: tx.createdAt.toISOString(),
  }))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Wallet</h1>
        <p className="text-muted-foreground mt-1 text-sm">Your balance and transaction history.</p>
      </div>

      {/* Balance card */}
      <Card className="shadow-none">
        <CardHeader className="flex flex-row items-center gap-2 pb-2">
          <WalletIcon className="text-muted-foreground size-4" />
          <span className="text-lg font-semibold">Current Balance</span>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold tracking-tight">
            {formatUSD(balance ?? '0')}
          </p>
          <p className="text-muted-foreground mt-1 text-xs">Available balance</p>
        </CardContent>
      </Card>

      {/* Transaction history */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Transaction History</h2>
        {serializedTransactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
            <p className="text-lg font-semibold">No transactions yet</p>
            <p className="text-muted-foreground text-sm">
              Transactions will appear here after your first top-up or order.
            </p>
          </div>
        ) : (
          <WalletTable transactions={serializedTransactions} />
        )}
      </div>
    </div>
  )
}
