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
  /** à la carte price of ONE base unit (for the savings comparison) */
  baseUnitRetail: number
  /** à la carte price of ONE upgraded unit (for the savings comparison) */
  upgradedUnitRetail: number
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

// The "Original profile" backup add-on was removed. Every BM5 we ship is a
// super aged BM, and on those the profile that originally created the BM has
// long since been disabled, so there is nothing to hand over. Selling it and
// then failing to deliver is worse than not offering it.

// No upgrade offers remain. BM3 was the only tier a setup could be swapped
// up from, and it is no longer sold — every setup ships BM5 Super Aged
// outright, so the configurator carries only the add-ons above.
