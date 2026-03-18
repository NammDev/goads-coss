"use client"

import { Eye, MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { formatUSD } from "@/lib/format-currency"
import { formatDistanceToNow } from "@/lib/format-date"

export type TransactionItem = {
  id: string
  orderNumber: number
  customerName: string
  totalAmount: string
  status: string
  createdAt: Date
}

/** Renders recent transactions from real order data */
export function RecentTransactions({ transactions }: { transactions: TransactionItem[] }) {
  if (transactions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Latest customer transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">No transactions yet.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="cursor-pointer">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Latest customer transactions</CardDescription>
        </div>
        <Button variant="outline" size="sm" className="cursor-pointer">
          <Eye className="h-4 w-4 mr-2" />
          View All
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {transactions.map((tx) => (
          <div key={tx.id}>
            <div className="flex p-3 rounded-lg border gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{tx.customerName.split(" ").map(n => n[0]).join("").slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-1 items-center flex-wrap justify-between gap-1">
                <div className="flex items-center space-x-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{tx.customerName}</p>
                    <p className="text-xs text-muted-foreground truncate">Order #{tx.orderNumber}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge
                    variant={
                      tx.status === "completed" || tx.status === "delivered" ? "default" :
                      tx.status === "pending" ? "secondary" : "destructive"
                    }
                    className="cursor-pointer"
                  >
                    {tx.status}
                  </Badge>
                  <div className="text-right">
                    <p className="text-sm font-medium">{formatUSD(tx.totalAmount)}</p>
                    <p className="text-xs text-muted-foreground">{formatDistanceToNow(tx.createdAt)}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 cursor-pointer">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="cursor-pointer">View Details</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
