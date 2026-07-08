import { redirect } from 'next/navigation'
import { WalletIcon, ArrowDownToLineIcon, ArrowUpFromLineIcon } from 'lucide-react'
import { auth } from '@clerk/nextjs/server'

import { getWalletTransactions, getCustomerBalance } from '@/lib/db/queries/wallet-queries'
import { formatUSD } from '@/lib/format-currency'
import { WalletTable } from './wallet-table'

/** One wallet KPI tile (icon + label · big value · caption). */
function WalletMetric({
  icon,
  label,
  value,
  caption,
}: {
  icon: React.ReactNode
  label: string
  value: string
  caption: string
}) {
  return (
    <div className="bg-card rounded-2xl border p-5">
      <div className="text-muted-foreground flex items-center gap-2">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
      <p className="mt-2 text-2xl font-bold tracking-tight tabular-nums">{value}</p>
      <p className="text-muted-foreground mt-1 text-xs">{caption}</p>
    </div>
  )
}

export default async function PortalWalletPage() {
  // Role guarded by portal/layout.tsx — use auth() (no Clerk API call).
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const [transactions, balance] = await Promise.all([
    getWalletTransactions(userId),
    getCustomerBalance(userId),
  ])

  const serializedTransactions = transactions.map((tx) => ({
    ...tx,
    createdAt: tx.createdAt.toISOString(),
  }))

  // Lifetime totals from the ledger (topup = money in, deduct = money out).
  let totalDeposited = 0
  let totalSpent = 0
  for (const tx of transactions) {
    const amt = Number(tx.amount)
    if (tx.type === 'topup') totalDeposited += amt
    else totalSpent += amt
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Wallet</h1>
        <p className="text-muted-foreground mt-1 text-sm">Your balance and transaction history.</p>
      </div>

      {/* Wallet KPIs — balance · lifetime deposited · lifetime spent */}
      <div className="grid gap-3 sm:grid-cols-3">
        <WalletMetric
          icon={<WalletIcon className="size-4" />}
          label="Current balance"
          value={formatUSD(balance ?? '0')}
          caption="Available to spend on orders"
        />
        <WalletMetric
          icon={<ArrowDownToLineIcon className="size-4" />}
          label="Total deposited"
          value={formatUSD(totalDeposited)}
          caption="All-time top-ups"
        />
        <WalletMetric
          icon={<ArrowUpFromLineIcon className="size-4" />}
          label="Total spent"
          value={formatUSD(totalSpent)}
          caption="All-time deductions"
        />
      </div>

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
