'use client'

import { WalletIcon } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { formatUSD } from '@/lib/format-currency'
import { TopupDialog } from './topup-dialog'

interface BalanceCardProps {
  customerId: string
  balance: string
}

export function BalanceCard({ customerId, balance }: BalanceCardProps) {
  return (
    <Card className="shadow-none">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <WalletIcon className="text-muted-foreground size-4" />
          <span className="text-lg font-semibold">Wallet Balance</span>
        </div>
        <TopupDialog customerId={customerId} currentBalance={balance} />
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold tracking-tight">{formatUSD(balance)}</p>
        <p className="text-muted-foreground mt-1 text-xs">Available balance</p>
      </CardContent>
    </Card>
  )
}
