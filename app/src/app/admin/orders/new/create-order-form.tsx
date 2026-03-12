"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { PlusIcon, TrashIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatUSD } from "@/lib/format-currency";
import { createOrder } from "@/lib/actions/order-actions";

type CustomerOption = { id: string; name: string; email: string; balance: string };
type ProductOption = { id: string; name: string; type: string; price: string };
type LineItem = { productId: string; quantity: number };

interface Props {
  customers: CustomerOption[];
  products: ProductOption[];
}

export function CreateOrderForm({ customers, products }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [customerId, setCustomerId] = useState("");
  const [items, setItems] = useState<LineItem[]>([{ productId: "", quantity: 1 }]);
  const [notes, setNotes] = useState("");

  const selectedCustomer = customers.find((c) => c.id === customerId);

  const getProduct = (id: string) => products.find((p) => p.id === id);

  const total = items.reduce((sum, item) => {
    const p = getProduct(item.productId);
    if (!p) return sum;
    return sum + parseFloat(p.price) * item.quantity;
  }, 0);

  const addItem = () => setItems((prev) => [...prev, { productId: "", quantity: 1 }]);

  const removeItem = (index: number) =>
    setItems((prev) => prev.filter((_, i) => i !== index));

  const updateItem = (index: number, field: keyof LineItem, value: string | number) =>
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!customerId) return setError("Select a customer");
    if (items.some((i) => !i.productId)) return setError("Select a product for each row");

    const formData = new FormData();
    formData.set("customerId", customerId);
    formData.set("items", JSON.stringify(items));
    if (notes) formData.set("notes", notes);

    startTransition(async () => {
      const result = await createOrder(formData);
      if (!result.success) {
        setError(result.error);
        return;
      }
      router.push(`/admin/orders/${result.orderId}`);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer selector */}
      <Card className="shadow-none">
        <CardHeader><span className="text-lg font-semibold">Customer</span></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customer">Select Customer</Label>
            <Select value={customerId} onValueChange={setCustomerId}>
              <SelectTrigger id="customer" className="w-full max-w-sm">
                <SelectValue placeholder="Choose customer..." />
              </SelectTrigger>
              <SelectContent>
                {customers.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name} — {c.email}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedCustomer && (
            <p className="text-sm text-muted-foreground">
              Balance:{" "}
              <span className="font-semibold text-foreground">
                {formatUSD(selectedCustomer.balance)}
              </span>
            </p>
          )}
        </CardContent>
      </Card>

      {/* Line items */}
      <Card className="shadow-none">
        <CardHeader><span className="text-lg font-semibold">Products</span></CardHeader>
        <CardContent className="space-y-4">
          {items.map((item, index) => {
            const product = getProduct(item.productId);
            const subtotal = product ? parseFloat(product.price) * item.quantity : 0;

            return (
              <div key={index} className="flex items-end gap-3">
                <div className="flex-1 space-y-1.5">
                  <Label>Product</Label>
                  <Select
                    value={item.productId}
                    onValueChange={(v) => updateItem(index, "productId", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select product..." />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.name} — {formatUSD(p.price)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="w-24 space-y-1.5">
                  <Label>Qty</Label>
                  <Input
                    type="number"
                    min={1}
                    max={100}
                    value={item.quantity}
                    onChange={(e) =>
                      updateItem(index, "quantity", parseInt(e.target.value) || 1)
                    }
                  />
                </div>

                <div className="w-28 space-y-1.5">
                  <Label>Subtotal</Label>
                  <p className="py-2 text-sm font-medium">{subtotal > 0 ? formatUSD(subtotal) : "—"}</p>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(index)}
                  disabled={items.length === 1}
                  className="text-muted-foreground hover:text-destructive mb-0.5"
                >
                  <TrashIcon className="size-4" />
                </Button>
              </div>
            );
          })}

          <Button type="button" variant="outline" size="sm" onClick={addItem}>
            <PlusIcon className="mr-1 size-4" />
            Add Product
          </Button>

          <Separator />

          <div className="flex justify-end">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Order Total</p>
              <p className="text-2xl font-bold">{formatUSD(total)}</p>
              {selectedCustomer && total > parseFloat(selectedCustomer.balance) && (
                <p className="text-sm text-destructive mt-1">
                  Insufficient balance (available: {formatUSD(selectedCustomer.balance)})
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      <Card className="shadow-none">
        <CardHeader><span className="text-lg font-semibold">Notes (optional)</span></CardHeader>
        <CardContent>
          <textarea
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            placeholder="Internal notes about this order..."
            value={notes}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value)}
            rows={3}
          />
        </CardContent>
      </Card>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create Order"}
        </Button>
      </div>
    </form>
  );
}
