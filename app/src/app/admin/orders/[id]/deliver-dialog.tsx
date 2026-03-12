"use client";

import { useState, useTransition } from "react";
import { PackageCheckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getColumnsForType } from "@/lib/validators/credential-schemas";
import type { ProductType } from "@/lib/validators/credential-schemas";
import { deliverOrderItem } from "@/lib/actions/delivery-actions";

interface Props {
  orderId: string;
  orderItemId: string;
  productType: ProductType;
  productName: string;
}

export function DeliverDialog({ orderId, orderItemId, productType, productName }: Props) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const columns = getColumnsForType(productType);
  const hasFields = columns.length > 0;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set("orderId", orderId);
    formData.set("orderItemId", orderItemId);
    formData.set("productType", productType);

    startTransition(async () => {
      const result = await deliverOrderItem(formData);
      if (!result.success) {
        setError(result.error);
        return;
      }
      setOpen(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <PackageCheckIcon className="mr-1 size-3.5" />
          Deliver
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Deliver: {productName}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* UID field always shown */}
          <div className="space-y-1.5">
            <Label htmlFor="uid">UID / Identifier</Label>
            <Input
              id="uid"
              name="uid"
              placeholder="e.g. account ID, BM ID..."
            />
          </div>

          {/* Dynamic credential fields from schema */}
          {hasFields ? (
            columns.map((col) => (
              <div key={col.key} className="space-y-1.5">
                <Label htmlFor={`cred_${col.key}`}>{col.label}</Label>
                <Input
                  id={`cred_${col.key}`}
                  name={`cred_${col.key}`}
                  placeholder={col.label}
                />
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              No credential fields for this product type.
            </p>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Delivering..." : "Confirm Delivery"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
