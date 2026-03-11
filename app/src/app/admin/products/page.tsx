'use client'

import Link from 'next/link'
import { PlusIcon } from 'lucide-react'

import { mockProducts, productTypeLabels } from '@/data/mock-products'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const formatVND = (amount: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Products</h1>
        <Button asChild>
          <Link href="/admin/products/new">
            <PlusIcon className="mr-1 size-4" />
            New Product
          </Link>
        </Button>
      </div>

      <Card className="shadow-none">
        <CardHeader>
          <span className="text-lg font-semibold">All Products ({mockProducts.length})</span>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Stock</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{productTypeLabels[product.type]}</Badge>
                  </TableCell>
                  <TableCell className="text-right">{formatVND(product.price)}</TableCell>
                  <TableCell className="text-right">
                    {product.stock === -1 ? (
                      <span className="text-muted-foreground">Unlimited</span>
                    ) : (
                      <span className={product.stock <= 5 ? 'font-medium text-red-600 dark:text-red-400' : ''}>
                        {product.stock}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
