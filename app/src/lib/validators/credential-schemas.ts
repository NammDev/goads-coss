import { z } from "zod";

/** Profile (FB) credential fields */
export const profileCredentials = z.object({
  password: z.string(),
  twoFa: z.string().optional(),
  email: z.string().optional(),
  passEmail: z.string().optional(),
  cookie: z.string().optional(),
});

/** BM (Business Manager) credential fields */
export const bmCredentials = z.object({
  bmId: z.string(),
  name: z.string().optional(),
  inviteLink: z.string().optional(),
  ogProfile: z.string().optional(),
});

/** Page credential fields */
export const pageCredentials = z.object({
  pageId: z.string(),
  link: z.string().optional(),
  name: z.string().optional(),
  holdingId: z.string().optional(),
});

/** Ad account credential fields */
export const adAccountCredentials = z.object({
  adAccountId: z.string(),
});

/** TikTok credential fields (placeholder — update when business confirms) */
export const tiktokCredentials = z.object({
  accountId: z.string(),
});

/** Services (unban, blue_verification) — no credentials, status-only */
export const serviceCredentials = z.object({});

/** Flexible fallback for "other" product types */
export const otherCredentials = z.record(z.string(), z.string());

/** Registry: product_type enum → Zod credential schema */
export const credentialSchemaMap = {
  agency_account: bmCredentials,
  bm: bmCredentials,
  profile: profileCredentials,
  page: pageCredentials,
  google_agency: adAccountCredentials,
  tiktok_agency: tiktokCredentials,
  tiktok_account: tiktokCredentials,
  blue_verification: serviceCredentials,
  unban: serviceCredentials,
  other: otherCredentials,
} as const;

export type ProductType = keyof typeof credentialSchemaMap;

/** Inferred TypeScript types per product type */
export type ProfileCredentials = z.infer<typeof profileCredentials>;
export type BmCredentials = z.infer<typeof bmCredentials>;
export type PageCredentials = z.infer<typeof pageCredentials>;

/** Get UI column definitions for a product type (key → label) */
export function getColumnsForType(type: ProductType) {
  const schema = credentialSchemaMap[type];
  if (!schema || !("shape" in schema)) return [];

  const shape = (schema as z.ZodObject<z.ZodRawShape>).shape;
  return Object.keys(shape).map((key) => ({
    key,
    label: key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (s) => s.toUpperCase())
      .trim(),
  }));
}
