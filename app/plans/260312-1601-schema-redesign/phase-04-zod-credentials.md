# Phase 4: Zod Credential Schemas

## Overview
- **Priority:** High
- **Status:** TODO
- **Description:** Define Zod schemas per product_type for validating JSONB credentials + driving dynamic UI columns

## Schemas

```ts
// src/lib/validators/credential-schemas.ts

const profileCredentials = z.object({
  password: z.string(),
  twoFa: z.string().optional(),
  email: z.string().optional(),
  passEmail: z.string().optional(),
  cookie: z.string().optional(),
});

const bmCredentials = z.object({
  bmId: z.string(),
  name: z.string().optional(),
  inviteLink: z.string().optional(),
  ogProfile: z.string().optional(),
});

const pageCredentials = z.object({
  pageId: z.string(),
  link: z.string().optional(),
  name: z.string().optional(),
  holdingId: z.string().optional(),
});

const adAccountCredentials = z.object({
  adAccountId: z.string(),
});

// TikTok types — TBD, placeholder
const tiktokCredentials = z.object({
  accountId: z.string(),
});

// Registry: product_type → schema
const credentialSchemaMap = {
  profile: profileCredentials,
  bm: bmCredentials,
  page: pageCredentials,
  agency_account: bmCredentials,  // same as BM
  google_agency: adAccountCredentials,
  tiktok_agency: tiktokCredentials,
  tiktok_account: tiktokCredentials,
  blue_verification: z.object({}),
  unban: z.object({}),
  other: z.record(z.string()),
} as const;
```

## UI Column Mapping
Schema keys become table column headers:
- `password` → "Password"
- `twoFa` → "2FA"
- `passEmail` → "Pass Email"

Helper function: `getColumnsForType(type)` → returns array of `{ key, label }` from Zod schema shape.

## Related Files
- Create: `src/lib/validators/credential-schemas.ts`
- Used by: deliver flow (validate before encrypt+save), portal UI (column rendering)

## Implementation Steps
1. Create `src/lib/validators/credential-schemas.ts`
2. Export `credentialSchemaMap` and `getColumnsForType` helper
3. Export TypeScript types inferred from Zod schemas

## Todo
- [ ] Create credential-schemas.ts
- [ ] Define schemas per product_type
- [ ] Create getColumnsForType helper
- [ ] Export inferred types

## Risk
- Low — pure application layer, no DB impact
- TikTok schemas are placeholder until business confirms fields
