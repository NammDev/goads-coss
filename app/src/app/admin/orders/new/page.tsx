import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getAllCustomers } from "@/lib/db/queries/customer-queries";
import { getAllProducts } from "@/lib/db/queries/product-queries";
import { CreateOrderForm } from "./create-order-form";

export default async function NewOrderPage() {
  const [customers, products] = await Promise.all([
    getAllCustomers(),
    getAllProducts(),
  ]);

  // Serialize only the fields the client form needs
  const customerOptions = customers.map((c) => ({
    id: c.id,
    name: c.name,
    email: c.email,
    balance: c.balance ?? "0",
  }));

  const productOptions = products
    .filter((p) => p.isActive)
    .map((p) => ({
      id: p.id,
      name: p.name,
      type: p.type,
      price: p.price,
    }));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/orders">
            <ArrowLeftIcon className="mr-1 size-4" />
            Back
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold">Create Order</h1>
      </div>

      <CreateOrderForm customers={customerOptions} products={productOptions} />
    </div>
  );
}
