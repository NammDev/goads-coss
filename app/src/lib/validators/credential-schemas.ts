import { z } from "zod";

/** Profile (FB) credential fields */
export const profileCredentials = z.object({
  password: z.string(),
  twoFa: z.string().optional(),
  email: z.string().optional(),
  passEmail: z.string().optional(),
  recoverEmail: z.string().optional(),
  cookie: z.string().optional(),
  // Portal display fields (stored in credentials JSON — no dedicated DB column)
  checkLive: z.string().optional(),
  note: z.string().optional(),
});

/** BM (Business Manager) credential fields */
export const bmCredentials = z.object({
  bmId: z.string(),
  name: z.string().optional(),
  inviteLink1: z.string().optional(),
  inviteLink2: z.string().optional(),
  inviteLink3: z.string().optional(),
  inviteLink4: z.string().optional(),
  ogProfile: z.string().optional(),
  note: z.string().optional(),
});

/** Page credential fields */
export const pageCredentials = z.object({
  pageId: z.string(),
  link: z.string().optional(),
  name: z.string().optional(),
  holdingId: z.string().optional(),
  note: z.string().optional(),
});

/** Ad account credential fields */
export const adAccountCredentials = z.object({
  adAccountId: z.string(),
});

/** Meta agency ad account fields — account delivered under an agency BM */
export const agencyAccountCredentials = z.object({
  adAccountId: z.string(),
  bmId: z.string().optional(), // BM the ad account was received under
  note: z.string().optional(),
});

/** TikTok account credential fields */
export const tiktokCredentials = z.object({
  username: z.string().optional(),
  password: z.string().optional(),
  twoFa: z.string().optional(),
  email: z.string().optional(),
  passEmail: z.string().optional(),
  note: z.string().optional(),
});

/** Services (unban, blue_verification) — no credentials, status-only */
export const serviceCredentials = z.object({});

/** Flexible fallback for "other" product types */
export const otherCredentials = z.record(z.string(), z.string());

/** Registry: product_type enum → Zod credential schema */
export const credentialSchemaMap = {
  agency_account: agencyAccountCredentials,
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
