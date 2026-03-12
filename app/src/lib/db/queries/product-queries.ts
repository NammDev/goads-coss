import { eq, and, asc } from "drizzle-orm";
import { db } from "@/lib/db";
import { products, customerPrices } from "@/lib/db/schema";
import type { InferSelectModel } from "drizzle-orm";

export type Product = InferSelectModel<typeof products>;
export type CustomerPrice = InferSelectModel<typeof customerPrices>;

export type ProductType =
  | "agency_account"
  | "bm"
  | "profile"
  | "google_agency"
  | "tiktok_agency"
  | "tiktok_account"
  | "blue_verification"
  | "unban"
  | "other";

export type ProductWithCustomerPrice = Product & {
  customPrice: CustomerPrice | null;
};

/** Get all products ordered by type then name */
export async function getAllProducts(): Promise<Product[]> {
  return db
    .select()
    .from(products)
    .orderBy(asc(products.type), asc(products.name));
}

/** Get products filtered by type */
export async function getProductsByType(type: ProductType): Promise<Product[]> {
  return db
    .select()
    .from(products)
    .where(eq(products.type, type))
    .orderBy(asc(products.name));
}

/** Get a single product by ID */
export async function getProductById(id: string): Promise<Product | null> {
  const rows = await db.select().from(products).where(eq(products.id, id));
  return rows[0] ?? null;
}

/** Get a product with optional customer-specific price */
export async function getProductWithCustomerPrice(
  productId: string,
  customerId: string,
): Promise<ProductWithCustomerPrice | null> {
  const rows = await db
    .select({
      product: products,
      customPrice: customerPrices,
    })
    .from(products)
    .leftJoin(
      customerPrices,
      and(
        eq(customerPrices.productId, productId),
        eq(customerPrices.customerId, customerId),
      ),
    )
    .where(eq(products.id, productId));

  if (!rows[0]) return null;

  return {
    ...rows[0].product,
    customPrice: rows[0].customPrice ?? null,
  };
}
