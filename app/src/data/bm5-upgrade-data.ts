// Upgrade offers for setup cards. A setup can offer to swap an included asset
// for a stronger one at checkout, shown in the configurator dialog with a
// base-vs-upgraded comparison and a per-unit upcharge.
//
// NOTE: comparison specs are drafted from the current catalog wording.
// Confirm exact terms with GOADS support before large orders.

export type UpgradeComparisonRow = {
  feature: string
  /** value for the included (base) asset */
  base: string
  /** value for the upgraded asset */
  upgraded: string
  /** true → the upgraded value is the stronger/highlighted one */
  upgradedWins?: boolean
}

export type UpgradeOffer = {
  /** flat upcharge added PER included unit when upgrading */
  unitUpcharge: number
  /** the included (base) asset */
  base: { name: string; tagline: string }
  /** the upgraded asset */
  upgraded: { name: string; tagline: string }
  /** base vs upgraded comparison rows */
  comparison: UpgradeComparisonRow[]
  /** suffix appended to the cart line name when upgraded, e.g. "BM5 Unlimited" */
  cartTag: string
}

export type UpgradeOptionKey = "base" | "upgraded"

// Optional "Original profile" backup add-on, one per included BM unit.
// The profile that created the BM: if Meta rolls the BM back and kicks every
// admin, the original profile's admin remains, so control is retained.
export const ORIGINAL_PROFILE_ADDON = {
  label: "Original profile (the profile that created the BM)",
  unitPrice: 50,
  benefit:
    "A safety backup. If Meta's algorithm rolls back the BM and kicks every admin, the original profile's admin still remains, so you keep control of the BM.",
}

// BM5 Verified $250 → BM5 Verified Unlimited (+$60 per BM5). Premium & Elite.
export const bm5UnlimitedOffer: UpgradeOffer = {
  unitUpcharge: 60,
  base: { name: "BM5 Verified $250", tagline: "$250 spending limit" },
  upgraded: { name: "BM5 Verified Unlimited", tagline: "No spending limit" },
  cartTag: "BM5 Unlimited",
  comparison: [
    { feature: "Verification", base: "Verified (blue)", upgraded: "Verified (blue)" },
    { feature: "Ad account slots", base: "5 slots", upgraded: "5 slots" },
    { feature: "Spending limit", base: "$250 initial cap", upgraded: "No spend cap", upgradedWins: true },
    { feature: "Stability", base: "Standard stability", upgraded: "Stronger & more stable", upgradedWins: true },
    { feature: "Scaling", base: "Raise limit gradually", upgraded: "Run large budgets right away", upgradedWins: true },
    { feature: "Best for", base: "Getting started, testing", upgraded: "Agencies scaling hard", upgradedWins: true },
  ],
}

// BM3 Verified → BM5 Verified Unlimited (+$200). Advanced Setup.
export const bm3ToBm5UnlimitedOffer: UpgradeOffer = {
  unitUpcharge: 200,
  base: { name: "BM3 Verified", tagline: "3 ad accounts, no spend history" },
  upgraded: { name: "BM5 Verified Unlimited", tagline: "5 ad accounts, unlimited spend" },
  cartTag: "BM5 Unlimited",
  comparison: [
    { feature: "Ad account slots", base: "3 slots", upgraded: "5 slots", upgradedWins: true },
    { feature: "Spending limit", base: "Standard", upgraded: "No spend cap", upgradedWins: true },
    { feature: "Spending history", base: "None", upgraded: "Yes", upgradedWins: true },
    { feature: "Stability", base: "Fairly stable", upgraded: "Very strong, long-term", upgradedWins: true },
    { feature: "Pixel sharing", base: "Not supported", upgraded: "Supported", upgradedWins: true },
  ],
}
