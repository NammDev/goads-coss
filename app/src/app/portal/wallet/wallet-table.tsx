'use client'

import { AdminDataTable } from '@/components/dashboard/admin-data-table'
import {
  portalWalletColumns,
  type SerializedWalletTransaction,
} from '@/components/dashboard/columns/portal-wallet-columns'

interface WalletTableProps {
  transactions: SerializedWalletTransaction[]
}

export function WalletTable({ transactions }: WalletTableProps) {
  return (
    <AdminDataTable
      data={transactions}
      columns={portalWalletColumns}
      searchPlaceholder="Search transactions..."
    />
  )
}
