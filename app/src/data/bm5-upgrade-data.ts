// BM5 upgrade option data — shared by the setup configurator dialog.
// Setups that ship with "BM5 Verified: $250 spending limit" can be upgraded to
// "BM5 Verified Unlimited" (no spend cap) for a fixed upcharge PER BM5 unit.
//
// NOTE: comparison specs below are drafted from the current catalog wording.
// Confirm exact spend-limit terms with GOADS support before large orders.

/** Flat upcharge added per BM5 unit when upgrading $250 → Unlimited. */
export const BM5_UNIT_UPCHARGE = 60

export type Bm5ComparisonRow = {
  /** Row label (left column) */
  feature: string
  /** Value for the included BM5 Verified $250 */
  base: string
  /** Value for the upgraded BM5 Verified Unlimited */
  unlimited: string
  /** true → the Unlimited value is the stronger/highlighted one */
  unlimitedWins?: boolean
}

// Left→right: feature | BM5 Verified $250 | BM5 Verified Unlimited
export const bm5ComparisonRows: Bm5ComparisonRow[] = [
  { feature: "Verification", base: "Verified (blue)", unlimited: "Verified (blue)" },
  { feature: "Ad account slots", base: "5 slots", unlimited: "5 slots" },
  { feature: "Spending limit", base: "$250 initial cap", unlimited: "No spend cap", unlimitedWins: true },
  { feature: "Stability", base: "Standard stability", unlimited: "Stronger & more stable", unlimitedWins: true },
  { feature: "Scaling", base: "Raise limit gradually", unlimited: "Run large budgets right away", unlimitedWins: true },
  { feature: "Best for", base: "Getting started, testing", unlimited: "Agencies scaling hard", unlimitedWins: true },
]

// Two selectable options shown as radio cards at the top of the dialog.
export const bm5Options = {
  base: {
    key: "base" as const,
    name: "BM5 Verified $250",
    tagline: "$250 spending limit",
  },
  unlimited: {
    key: "unlimited" as const,
    name: "BM5 Verified Unlimited",
    tagline: "No spending limit",
  },
}

export type Bm5OptionKey = "base" | "unlimited"
