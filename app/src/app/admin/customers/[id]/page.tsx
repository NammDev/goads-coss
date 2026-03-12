import { notFound } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'
import { ArrowLeftIcon } from 'lucide-react'

import { StatusBadge } from '@/components/dashboard/status-badge'
import { getCustomerById, getWalletTransactions } from '@/lib/db/queries'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatUSD } from '@/lib/format-currency'
import { BalanceCard } from './balance-card'

export default async function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const customer = await getCustomerById(id)

  if (!customer) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/customers"><ArrowLeftIcon className="mr-1 size-4" />Back</Link>
        </Button>
        <p className="text-muted-foreground">Customer not found.</p>
      </div>
    )
  }

  const [customerOrders, walletTxns] = await Promise.all([
    Promise.resolve(customer.orders),
    getWalletTransactions(id),
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/customers"><ArrowLeftIcon className="mr-1 size-4" />Back</Link>
        </Button>
        <h1 className="text-2xl font-semibold">{customer.name}</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Profile card */}
        <Card className="shadow-none">
          <CardHeader className="flex items-center gap-4">
            <Avatar className="size-12 rounded-lg">
              <AvatarFallback className="rounded-lg text-sm font-medium">
                {customer.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{customer.name}</p>
              <p className="text-muted-foreground text-sm">
                Joined {format(new Date(customer.createdAt), 'dd/MM/yyyy')}
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email</span>
              <span>{customer.email}</span>
            </div>
            {customer.telegramId && (
              <>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Telegram</span>
                  <span>{customer.telegramId}</span>
                </div>
              </>
            )}
            {customer.notes && (
              <>
                <Separator />
                <div>
                  <span className="text-muted-foreground">Notes</span>
                  <p className="mt-1">{customer.notes}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Balance card */}
        <BalanceCard customerId={id} balance={customer.balance} />

        {/* Stats card */}
        <Card className="shadow-none">
          <CardHeader><span className="text-lg font-semibold">Stats</span></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Orders</span>
              <span className="font-semibold">{customerOrders.length}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Role</span>
              <span className="font-semibold capitalize">{customer.role}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Wallet transactions */}
      <Card className="shadow-none">
        <CardHeader>
          <span className="text-lg font-semibold">Wallet Transactions ({walletTxns.length})</span>
        </CardHeader>
        <CardContent className="p-0">
          {walletTxns.length === 0 ? (
            <p className="text-muted-foreground px-6 py-8 text-center text-sm">No transactions yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Balance After</TableHead>
                  <TableHead>Note</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {walletTxns.map((txn) => (
                  <TableRow key={txn.id}>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                        txn.type === 'topup'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {txn.type === 'topup' ? '+' : '-'} {txn.type}
                      </span>
                    </TableCell>
                    <TableCell className="font-semibold">{formatUSD(txn.amount)}</TableCell>
                    <TableCell>{formatUSD(txn.balanceAfter)}</TableCell>
                    <TableCell className="text-muted-foreground max-w-48 truncate text-sm">
                      {txn.note ?? '—'}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {format(new Date(txn.createdAt), 'dd/MM/yyyy HH:mm')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Order history */}
      <Card className="shadow-none">
        <CardHeader>
          <span className="text-lg font-semibold">Order History ({customerOrders.length})</span>
        </CardHeader>
        <CardContent className="p-0">
          {customerOrders.length === 0 ? (
            <p className="text-muted-foreground px-6 py-8 text-center text-sm">No orders yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customerOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono text-sm font-medium">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="hover:text-primary hover:underline"
                      >
                        {order.id}
                      </Link>
                    </TableCell>
                    <TableCell>{formatUSD(order.totalAmount)}</TableCell>
                    <TableCell><StatusBadge status={order.status} /></TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {format(new Date(order.createdAt), 'dd/MM/yyyy')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
