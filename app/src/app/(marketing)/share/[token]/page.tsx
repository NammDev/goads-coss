import { notFound } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'
import { ShieldCheckIcon, PackageIcon, TagIcon, RefreshCwIcon, ArrowRightIcon, BellRingIcon, WrenchIcon, HeadphonesIcon } from 'lucide-react'
import { auth } from '@clerk/nextjs/server'

import { getOrderByShareToken } from '@/lib/db/queries'
import { PageHero } from '@/components/page-hero'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
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
import { decrypt } from '@/lib/db/encryption'

function decryptCredentials(raw: string | null): Record<string, string> {
  if (!raw) return {}
  try {
    return JSON.parse(decrypt(raw)) as Record<string, string>
  } catch {
    try { return JSON.parse(raw) as Record<string, string> } catch { return {} }
  }
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-600/10 text-yellow-600',
  paid: 'bg-blue-600/10 text-blue-600',
  processing: 'bg-purple-600/10 text-purple-600',
  delivered: 'bg-green-600/10 text-green-600',
  cancelled: 'bg-red-600/10 text-red-600',
}

export default async function PublicSharePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const order = await getOrderByShareToken(token)
  if (!order) notFound()

  const { userId } = await auth()
  const isOwner = userId && order.customerId === userId
  const isLoggedIn = !!userId
  const hasWarranty = order.deliveredItems.some((d) => d.warrantyUntil)

  return (
    <>
      {/* Hero section — anonymous visitors */}
      {!isLoggedIn && (
        <PageHero
          label="Your Order is Ready"
          heading="Welcome to GoAds"
          description="Your order details are below. Create a free account to manage all your orders, get exclusive pricing, and reorder in seconds."
        >
          <div className="flex justify-center gap-3">
            <Button asChild>
              <Link href="/sign-up">Create Free Account <ArrowRightIcon className="ml-1 size-4" /></Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </div>
        </PageHero>
      )}

      {/* Bento grid — "Get more from GoAds" for anonymous visitors */}
      {!isLoggedIn && (
        <section className="container py-10 lg:py-12">
          <div className="mx-auto max-w-4xl space-y-8">
            <h2 className="text-center text-xl font-semibold">Get more from GoAds</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* Large card — spans 2 cols */}
              <div className="bg-card space-y-3 rounded-xl border p-6 sm:col-span-2">
                <PackageIcon className="text-primary size-6" />
                <h3 className="text-base font-semibold">All Orders in One Place</h3>
                <p className="text-muted-foreground text-sm">
                  View full order history, track delivery &amp; warranty status, access credentials anytime. No more share links — everything lives in your dashboard.
                </p>
              </div>
              <div className="bg-card space-y-3 rounded-xl border p-6">
                <TagIcon className="text-primary size-6" />
                <h3 className="text-base font-semibold">Exclusive Pricing</h3>
                <p className="text-muted-foreground text-sm">
                  Registered customers unlock personalized rates on future purchases.
                </p>
              </div>
              <div className="bg-card space-y-3 rounded-xl border p-6">
                <RefreshCwIcon className="text-primary size-6" />
                <h3 className="text-base font-semibold">Reorder in Seconds</h3>
                <p className="text-muted-foreground text-sm">
                  Same product, same specs — 2 clicks. No back-and-forth needed.
                </p>
              </div>
              <div className="bg-card space-y-3 rounded-xl border p-6">
                <WrenchIcon className="text-primary size-6" />
                <h3 className="text-base font-semibold">Free Ad Tools</h3>
                <p className="text-muted-foreground text-sm">
                  Access handy tools for managing your ad accounts and business assets.
                </p>
              </div>
              <div className="bg-card space-y-3 rounded-xl border p-6">
                <HeadphonesIcon className="text-primary size-6" />
                <h3 className="text-base font-semibold">Priority Support</h3>
                <p className="text-muted-foreground text-sm">
                  Portal members get faster response times and dedicated assistance.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Order content */}
    <section className="container space-y-8 py-8 lg:py-12">
      <div className="space-y-6">
        {/* Auth-aware top bar */}
        {isOwner && (
          <div className="flex justify-end">
            <Button size="sm" asChild>
              <Link href={`/portal/orders/${order.id}`}>View in Portal <ArrowRightIcon className="ml-1 size-3.5" /></Link>
            </Button>
          </div>
        )}

        {/* Order header */}
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold">Order #{order.orderNumber}</h1>
            <Badge className={`text-xs ${statusColors[order.status] ?? ''}`}>{order.status}</Badge>
          </div>
          <p className="text-muted-foreground text-sm">
            {format(new Date(order.createdAt), 'MMMM d, yyyy')}
          </p>
        </div>

        {/* Order summary */}
        <Card className="shadow-none">
          <CardHeader><span className="text-lg font-semibold">Order Summary</span></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <Badge className={`text-xs ${statusColors[order.status] ?? ''}`}>{order.status}</Badge>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date</span>
              <span>{format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm')}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total</span>
              <span className="font-semibold">{formatUSD(order.totalAmount)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Products table */}
        <Card className="shadow-none">
          <CardHeader><span className="text-lg font-semibold">Products</span></CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Qty</TableHead>
                  <TableHead className="text-right">Unit Price</TableHead>
                  <TableHead className="text-right">Subtotal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.productName}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">{formatUSD(item.unitPrice)}</TableCell>
                    <TableCell className="text-right font-medium">
                      {formatUSD(parseFloat(item.unitPrice) * item.quantity)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3} className="text-right font-semibold">Total</TableCell>
                  <TableCell className="text-right font-bold">{formatUSD(order.totalAmount)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Delivered items */}
        {order.deliveredItems.length > 0 && (
          <Card className="shadow-none">
            <CardHeader><span className="text-lg font-semibold">Delivered Items</span></CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>UID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Credentials</TableHead>
                    <TableHead>Warranty</TableHead>
                    <TableHead>Delivered</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.deliveredItems.map((item) => {
                    const creds = decryptCredentials(item.credentials)
                    const credEntries = Object.entries(creds).filter(([, v]) => v)
                    return (
                      <TableRow key={item.id}>
                        <TableCell className="font-mono text-sm">
                          {item.uid ?? <span className="text-muted-foreground">—</span>}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">{item.productType}</Badge>
                        </TableCell>
                        <TableCell>
                          {credEntries.length > 0 ? (
                            <dl className="space-y-0.5 text-xs">
                              {credEntries.map(([key, val]) => (
                                <div key={key} className="flex gap-2">
                                  <dt className="text-muted-foreground min-w-20">{key}:</dt>
                                  <dd className="font-mono break-all">{val}</dd>
                                </div>
                              ))}
                            </dl>
                          ) : (
                            <span className="text-muted-foreground text-xs">No credentials</span>
                          )}
                        </TableCell>
                        <TableCell className="text-sm">
                          {item.warrantyUntil ? (
                            <span className="flex items-center gap-1">
                              <ShieldCheckIcon className="size-3.5 text-green-500" />
                              {format(new Date(item.warrantyUntil), 'dd/MM/yyyy')}
                            </span>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {format(new Date(item.deliveredAt), 'dd/MM/yyyy HH:mm')}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>

            {/* Warranty nudge — only for anonymous visitors with warranty items */}
            {hasWarranty && !isLoggedIn && (
              <div className="border-t px-6 py-4">
                <div className="flex items-start gap-3">
                  <BellRingIcon className="text-primary mt-0.5 size-4 shrink-0" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Never miss a warranty expiration</p>
                    <p className="text-muted-foreground text-xs">
                      Create a free account to track warranty status and request replacements directly.
                    </p>
                    <Button size="sm" variant="link" className="h-auto p-0 text-xs" asChild>
                      <Link href="/sign-up">Create Account <ArrowRightIcon className="ml-0.5 size-3" /></Link>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Card>
        )}

        {/* Notes */}
        {order.notes && (
          <Card className="shadow-none">
            <CardHeader><span className="text-lg font-semibold">Notes</span></CardHeader>
            <CardContent>
              <p className="text-sm">{order.notes}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
    </>
  )
}
