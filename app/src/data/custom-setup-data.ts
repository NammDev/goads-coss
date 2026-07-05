// Custom setup builder — buildable catalogue + per-BM setup model + pricing/
// topology/validation logic.
//
// Model: a setup is a list of BM slots, each carrying its OWN assigned profiles
// and pages (so the customer controls exactly which asset goes into which BM),
// plus account-level extras. This lets the diagram render one detailed pod per BM.
//
// Prices MUST mirror src/data/product-catalog-table-data.ts (single source of
// truth). `catalogName` is the exact catalogue key — cart line name + drift check.
// Contact-only items (IG profile, Verified Page) are intentionally excluded: the
// builder only lists fixed-price products so the live total is exact.
//
// Volume discount is deferred: applyDiscount() is identity in v1.

import type { SetupTopology, PodAsset } from "@/components/pricing/setup-topology-diagram"

const BM_ICON = "/assets/BM.webp"
const PROFILE_ICON = "/assets/PROFILES.webp"
const PAGE_ICON = "/assets/PAGES.webp"
// Verification badges render the blue-tick SVG (verifiedBadge flag), but keep an
// iconSrc fallback so the BuildableItem shape stays uniform.
const VERIFY_ICON = "/assets/verified-services.webp"

export type CustomItemCategory = "bm" | "profile" | "adaccount" | "page" | "extra"

export interface BuildableItem {
  id: string
  category: CustomItemCategory
  /** Full label for stepper rows / add menus */
  label: string
  /** Short label for topology chips (e.g. "USA", "10K"). Falls back to label. */
  chipLabel?: string
  iconSrc: string
  unitPrice: number
  /** Exact catalogue name (cart line + price source of truth) */
  catalogName: string
  /** BM-only: how this BM renders as a topology hub node */
  node?: { name: string; sub: string }
  /** BM-only: whether this tier can act as the pixel bank (BM5 / BM10). */
  bankEligible?: boolean
  /** Hidden from the "+ Add" menus; only togglable via a dedicated control
   *  (e.g. the BM5/BM10 "original profile" add-on). */
  builderHidden?: boolean
  /** Render the blue verified-tick SVG instead of iconSrc (verification badges). */
  verifiedBadge?: boolean
}

/** The BM's creator profile — a BM5/BM10-only $50 add-on, toggled per BM. */
export const ORIGINAL_PROFILE_ID = "orig-profile"

/** Agency ad account — added to scaling BMs only. */
export const AD_ACCOUNT_ID = "ad-account"

export const BUILDABLE_ITEMS: BuildableItem[] = [
  // Business Managers (BM1 excluded from the builder; only BM5/BM10 can be a pixel bank)
  { id: "bm3", category: "bm", label: "BM3 Verified", iconSrc: BM_ICON, unitPrice: 180, catalogName: "BM3 Verified", node: { name: "BM3", sub: "3 ad account slots" } },
  { id: "bm5", category: "bm", label: "BM5 Verified", iconSrc: BM_ICON, unitPrice: 340, catalogName: "BM5 Verified ($250 DSL)", node: { name: "BM5", sub: "$250 spend limit" }, bankEligible: true },
  { id: "bm10", category: "bm", label: "BM10 Verified", iconSrc: BM_ICON, unitPrice: 999, catalogName: "BM10 Verified (Unlimited DSL)", node: { name: "BM10", sub: "Unlimited DSL" }, bankEligible: true },
  // Profiles
  { id: "profile-asia", category: "profile", label: "Asia Reinstated Profile", chipLabel: "Asia", iconSrc: PROFILE_ICON, unitPrice: 40, catalogName: "Premium Asia Reinstated Profile" },
  { id: "profile-usa", category: "profile", label: "USA Reinstated Profile", chipLabel: "USA", iconSrc: PROFILE_ICON, unitPrice: 50, catalogName: "Premium USA Reinstated Profile" },
  { id: "profile-asia-aged", category: "profile", label: "Asia Super Aged (7+ yrs)", chipLabel: "Asia Aged", iconSrc: PROFILE_ICON, unitPrice: 95, catalogName: "Asia Super Aged Double Reinstated (7+ Years)" },
  { id: "profile-usa-aged", category: "profile", label: "USA Super Aged (7+ yrs)", chipLabel: "USA Aged", iconSrc: PROFILE_ICON, unitPrice: 110, catalogName: "USA Super Aged Double Reinstated (7+ Years)" },
  { id: ORIGINAL_PROFILE_ID, category: "profile", label: "Original Profile (BM creator)", chipLabel: "Original", iconSrc: PROFILE_ICON, unitPrice: 50, catalogName: "Original profile (the profile that created the BM)", builderHidden: true },
  // Agency ad account (scaling BMs only)
  { id: AD_ACCOUNT_ID, category: "adaccount", label: "Agency Ad Account", chipLabel: "Ad Account", iconSrc: "/assets/META.webp", unitPrice: 250, catalogName: "Ad Account (Unlimited DSL)" },
  // Pages
  { id: "page-aged", category: "page", label: "Aged Reinstated Page", chipLabel: "Aged", iconSrc: PAGE_ICON, unitPrice: 35, catalogName: "Aged Reinstated Facebook Page" },
  { id: "page-1k3k", category: "page", label: "1K–3K Follower Page", chipLabel: "1K–3K", iconSrc: PAGE_ICON, unitPrice: 45, catalogName: "1K–3K Follower Facebook Page" },
  { id: "page-5k", category: "page", label: "5K Follower Page", chipLabel: "5K", iconSrc: PAGE_ICON, unitPrice: 65, catalogName: "5K Follower Facebook Page" },
  { id: "page-10k", category: "page", label: "10K Follower Page", chipLabel: "10K", iconSrc: PAGE_ICON, unitPrice: 110, catalogName: "10K Follower Facebook Page" },
  { id: "page-livestream", category: "page", label: "Livestream Ads Ready Page", chipLabel: "Livestream", iconSrc: PAGE_ICON, unitPrice: 200, catalogName: "Livestream Ads Ready Page" },
  { id: "page-monetized", category: "page", label: "Monetized Page (10K)", chipLabel: "Monetized", iconSrc: PAGE_ICON, unitPrice: 300, catalogName: "Monetized Page (10K Followers)" },
  // Extras (account-level, not tied to a BM)
  { id: "verify-fb", category: "extra", label: "Verified Badge (FB Page)", chipLabel: "Verified FB", iconSrc: VERIFY_ICON, unitPrice: 600, catalogName: "Verification Badge (Facebook Page)", verifiedBadge: true },
  { id: "verify-ig", category: "extra", label: "Verified Badge (Instagram)", chipLabel: "Verified IG", iconSrc: VERIFY_ICON, unitPrice: 600, catalogName: "Verification Badge (Instagram)", verifiedBadge: true },
]

const ITEM_BY_ID: Record<string, BuildableItem> = Object.fromEntries(BUILDABLE_ITEMS.map((i) => [i.id, i]))

export function getItem(id: string): BuildableItem | undefined {
  return ITEM_BY_ID[id]
}

export function itemsByCategory(category: CustomItemCategory): BuildableItem[] {
  return BUILDABLE_ITEMS.filter((i) => i.category === category)
}

// ── Per-BM setup model ──

/** One Business Manager in the setup, with its own assigned profiles/pages. */
export interface BmSlot {
  /** Stable id for React keys (assigned by the builder UI) */
  uid: string
  /** Which BM tier: "bm1" | "bm3" | "bm5" | "bm10" */
  bmId: string
  /** Marks this BM as the shared pixel bank */
  isBank: boolean
  /** profileId / pageId -> quantity assigned to THIS BM */
  assets: Record<string, number>
}

export interface CustomSetup {
  bms: BmSlot[]
  /** account-level extras (verification badges): extraId -> qty */
  extras: Record<string, number>
}

export type TemplateId = "advanced" | "premium" | "elite" | "blank"

/** BM slot without a uid — the builder assigns uids when it seeds the template. */
export type TemplateSlot = Omit<BmSlot, "uid">

// Seeds mirror the existing preset setups (profiles as USA, matching preset
// à-la-carte pricing). Elite's extra 10K page seeds as aged pages (adjustable).
export const SETUP_TEMPLATES: Record<TemplateId, { label: string; bms: TemplateSlot[]; extras: Record<string, number> }> = {
  premium: {
    label: "Premium",
    bms: [
      { bmId: "bm5", isBank: true, assets: { "profile-usa": 2 } },
      { bmId: "bm3", isBank: false, assets: { "profile-usa": 2, "page-aged": 3 } },
    ],
    extras: {},
  },
  advanced: {
    label: "Advanced",
    bms: [{ bmId: "bm3", isBank: false, assets: { "profile-usa": 2, "page-aged": 1 } }],
    extras: {},
  },
  elite: {
    label: "Elite",
    bms: [
      { bmId: "bm5", isBank: true, assets: { "profile-usa": 3 } },
      { bmId: "bm5", isBank: false, assets: { "profile-usa": 3, "page-aged": 4 } },
    ],
    extras: {},
  },
  blank: { label: "Blank", bms: [], extras: {} },
}

export const DEFAULT_TEMPLATE: TemplateId = "premium"

// ── Pricing + cart ──

export interface CartLine {
  itemId: string
  catalogName: string
  unitPrice: number
  qty: number
}

/** Aggregate every BM (the BM itself + its assets) and extras into merged lines. */
export function flattenToCartLines(setup: CustomSetup): CartLine[] {
  const map = new Map<string, CartLine>()
  const add = (id: string, qty: number) => {
    if (qty <= 0) return
    const item = getItem(id)
    if (!item) return
    const existing = map.get(id)
    if (existing) existing.qty += qty
    else map.set(id, { itemId: id, catalogName: item.catalogName, unitPrice: item.unitPrice, qty })
  }
  for (const bm of setup.bms) {
    add(bm.bmId, 1)
    for (const [assetId, qty] of Object.entries(bm.assets)) add(assetId, qty)
  }
  for (const [extraId, qty] of Object.entries(setup.extras)) add(extraId, qty)
  return [...map.values()]
}

export function computeTotal(setup: CustomSetup): number {
  return flattenToCartLines(setup).reduce((sum, line) => sum + line.unitPrice * line.qty, 0)
}

/** v1: identity. Hook for the later volume-discount phase. */
export function applyDiscount(total: number): number {
  return total
}

// ── Counts + validation ──

function assetCount(assets: Record<string, number>, category: CustomItemCategory): number {
  let n = 0
  for (const [id, qty] of Object.entries(assets)) {
    if (getItem(id)?.category === category) n += qty
  }
  return n
}

export interface ValidationResult {
  warnings: string[]
  /** Add-to-cart requires at least one BM. */
  canCheckout: boolean
}

export function validate(setup: CustomSetup): ValidationResult {
  const warnings: string[] = []
  const bmCount = setup.bms.length

  // Every BM needs at least one operator profile.
  const bmsWithoutProfile = setup.bms.filter((b) => assetCount(b.assets, "profile") === 0).length
  if (bmsWithoutProfile > 0) {
    warnings.push(
      bmsWithoutProfile === 1
        ? "One Business Manager has no profile — add at least 1 to operate it."
        : `${bmsWithoutProfile} Business Managers have no profile — add at least 1 to each.`,
    )
  }

  // A bank should carry a couple of profiles to warm the pixel safely.
  const bank = setup.bms.find((b) => b.isBank)
  if (bank && assetCount(bank.assets, "profile") < 2) {
    warnings.push("Tip: give the pixel-bank BM 2+ profiles to warm the pixel safely.")
  }

  const totalPages = setup.bms.reduce((n, b) => n + assetCount(b.assets, "page"), 0)
  if (bmCount > 0 && totalPages === 0) {
    warnings.push("Add at least 1 page so your BMs can run stable campaigns.")
  }

  return { warnings, canCheckout: bmCount >= 1 }
}

// ── Topology generation ──

function slotAssets(assets: Record<string, number>, category: CustomItemCategory): PodAsset[] {
  const out: PodAsset[] = []
  for (const item of BUILDABLE_ITEMS) {
    if (item.category !== category) continue
    const qty = assets[item.id] ?? 0
    if (qty > 0) out.push({ iconSrc: item.iconSrc, label: item.chipLabel ?? item.label, count: qty })
  }
  return out
}

// One pod per BM, each showing its exact assigned profiles/pages. The bank pod is
// flagged so the diagram highlights it and draws pixel-sharing to the rest.
export function buildTopology(setup: CustomSetup): SetupTopology {
  const pods = setup.bms.map((slot, i) => {
    const bm = getItem(slot.bmId)
    const node = bm?.node ?? { name: bm?.label ?? "BM", sub: "" }
    // Only BM5/BM10 can be a pixel bank — guard so a re-tiered BM never shows as one.
    const isBank = !!slot.isBank && !!bm?.bankEligible
    return {
      index: i + 1,
      label: isBank ? "Pixel Bank" : "Scaling",
      isBank,
      bm: { iconSrc: bm?.iconSrc ?? BM_ICON, name: node.name, sub: node.sub },
      assets: [...slotAssets(slot.assets, "profile"), ...slotAssets(slot.assets, "adaccount"), ...slotAssets(slot.assets, "page")],
      caption: isBank ? "Creates & warms your pixel" : "Runs & scales your ads",
    }
  })

  const hasBank = pods.some((p) => p.isBank)
  const hasScaling = pods.some((p) => !p.isBank)
  return {
    pods,
    bridgeLabel: hasBank && hasScaling ? "pixel sharing" : undefined,
  }
}
