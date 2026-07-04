// Product detail copy for the /pricing catalog drawer.
// Keyed by the EXACT product name in product-catalog-table-data.ts.
// getProductDetail() returns a curated entry, or a sensible generic fallback so
// every product opens something meaningful. Copy avoids em-dashes (brand style).

export type ProductSpec = { label: string; value: string }

export type ProductDetail = {
  /** One-paragraph intro shown at the top of the drawer */
  description: string
  /** Key/value spec rows (region, age, status, warranty, ...) */
  specs: ProductSpec[]
  /** Optional bullet highlights */
  highlights?: string[]
}

const WARRANTY_PROFILE = "14-day unlimited replacement warranty"
// Super aged (7 to 15 year) profiles get an extended 30-day cover.
const WARRANTY_PROFILE_30 = "30-day unlimited replacement warranty"
// BM warranty covers the Business Manager only, not the native ad accounts inside it.
const WARRANTY_BM = "7 days (BM only, native ad accounts not covered)"

export const productDetails: Record<string, ProductDetail> = {
  // ── Facebook Profiles ──
  "Premium Asia Reinstated Profile": {
    description:
      "A cleanly nurtured Facebook profile grown with GOADS' proprietary warm-up method. Created and aged on Asia based residential IPs for a natural regional footprint, then reinstated after passing Meta review, so it arrives ready to advertise.",
    specs: [
      { label: "IP region", value: "Asia (residential)" },
      { label: "Age", value: "1 to 4 years" },
      { label: "Status", value: "Successfully reinstated" },
      { label: "Warm-up", value: "GOADS clean method" },
      { label: "Warranty", value: WARRANTY_PROFILE },
    ],
    highlights: [
      "Real history and activity, not a freshly created account",
      "Lower checkpoint and ban risk when paired with a matching proxy",
      "Great starter profile for Asia and global campaigns",
    ],
  },
  "Premium USA Reinstated Profile": {
    description:
      "A cleanly nurtured Facebook profile built and aged on USA based residential IPs with GOADS' special warm-up method. Reinstated after passing Meta review, giving it the local trust footprint that US ad accounts respond best to.",
    specs: [
      { label: "IP region", value: "USA (residential)" },
      { label: "Age", value: "1 to 4 years" },
      { label: "Status", value: "Successfully reinstated" },
      { label: "Warm-up", value: "GOADS clean method" },
      { label: "Warranty", value: WARRANTY_PROFILE },
    ],
    highlights: [
      "US footprint favored by US and Tier-1 ad accounts",
      "Clean history, ready to run right after login",
      "Best paired with a US residential or mobile proxy",
    ],
  },
  "Asia Super Aged Double Reinstated (7+ Years)": {
    description:
      "A premium, super aged Asia profile with 7 to 15 years of history that has survived two full Meta review cycles (double reinstated). This is one of our highest-trust assets, built to hold up under aggressive scaling.",
    specs: [
      { label: "IP region", value: "Asia (residential)" },
      { label: "Age", value: "7 to 15 years" },
      { label: "Status", value: "Successfully reinstated twice" },
      { label: "Trust", value: "Very high" },
      { label: "Warranty", value: WARRANTY_PROFILE_30 },
    ],
    highlights: [
      "Two survived review cycles = maximum resilience",
      "Handles higher spend and faster warm-up",
      "Ideal for advertisers who lose accounts too often",
    ],
  },
  "USA Super Aged Double Reinstated (7+ Years)": {
    description:
      "Our flagship profile: a USA super aged account with 7 to 15 years of history, double reinstated through two Meta review cycles. Maximum trust and stability for serious US advertising at scale.",
    specs: [
      { label: "IP region", value: "USA (residential)" },
      { label: "Age", value: "7 to 15 years" },
      { label: "Status", value: "Successfully reinstated twice" },
      { label: "Trust", value: "Highest (flagship)" },
      { label: "Warranty", value: WARRANTY_PROFILE_30 },
    ],
    highlights: [
      "The strongest, most stable profile GOADS offers",
      "Built for high-volume US campaigns",
      "Only with GOADS",
    ],
  },
  "Instagram Account (Real Followers)": {
    description:
      "An aged Instagram account with genuine, organically grown followers. Useful for social proof, linking to Business Managers, and running Instagram placements with a credible presence.",
    specs: [
      { label: "Followers", value: "Real, organic" },
      { label: "Status", value: "Aged, active" },
      { label: "Use", value: "IG ads, social proof" },
      { label: "Availability", value: "Contact for stock" },
    ],
  },

  // ── Business Manager ──
  "BM1 Verified": {
    description:
      "A verified Business Manager with a single ad account slot. It has no spending history and is the least stable BM tier, so GOADS does not recommend it for serious or long-term campaigns.",
    specs: [
      { label: "Ad account slots", value: "1" },
      { label: "Spending history", value: "None" },
      { label: "Stability", value: "Low" },
      { label: "Pixel sharing", value: "Not supported" },
      { label: "Warranty", value: WARRANTY_BM },
    ],
    highlights: ["GOADS does not recommend BM1 for serious advertising"],
  },
  "BM3 Verified": {
    description:
      "A verified Business Manager with 3 ad account slots. No spending history yet, but fairly stable for running a few accounts in parallel without jumping to a BM5.",
    specs: [
      { label: "Ad account slots", value: "3" },
      { label: "Spending history", value: "None" },
      { label: "Stability", value: "Fairly stable" },
      { label: "Pixel sharing", value: "Not supported" },
      { label: "Warranty", value: WARRANTY_BM },
    ],
  },
  "BM5 Verified ($250 DSL)": {
    description:
      "A verified Business Manager with 5 ad account slots and a $250 initial daily spend limit. It comes with real spending history, is very strong and stable for long-term use, and supports pixel sharing.",
    specs: [
      { label: "Ad account slots", value: "5" },
      { label: "Spend limit", value: "$250 initial cap" },
      { label: "Spending history", value: "Yes" },
      { label: "Stability", value: "Very strong, long-term" },
      { label: "Pixel sharing", value: "Supported" },
      { label: "Warranty", value: WARRANTY_BM },
    ],
    highlights: ["Upgradeable to Unlimited DSL for heavier spend"],
  },
  "BM5 Verified (Unlimited DSL)": {
    description:
      "A verified Business Manager with 5 ad account slots and no daily spend cap. It comes with real spending history, is very strong and stable for long-term use, and supports pixel sharing, built to run large budgets right away.",
    specs: [
      { label: "Ad account slots", value: "5" },
      { label: "Spend limit", value: "No cap (unlimited)" },
      { label: "Spending history", value: "Yes" },
      { label: "Stability", value: "Very strong, long-term" },
      { label: "Pixel sharing", value: "Supported" },
      { label: "Warranty", value: WARRANTY_BM },
    ],
    highlights: [
      "Run large budgets from day one",
      "Best for agencies scaling hard",
    ],
  },
  "BM WABA 250 limit (WhatsApp API)": {
    description:
      "A Business Manager provisioned for the WhatsApp Business API with a 250 messaging limit. For businesses starting conversational and click-to-WhatsApp campaigns.",
    specs: [
      { label: "Type", value: "WhatsApp Business API" },
      { label: "Messaging limit", value: "250 / 24h" },
      { label: "Verification", value: "Verified" },
      { label: "Warranty", value: WARRANTY_BM },
    ],
  },
  "BM WABA 2000 limit (WhatsApp API)": {
    description:
      "A WhatsApp Business API Business Manager with a higher 2,000 messaging limit, for teams scaling WhatsApp outreach and click-to-WhatsApp ads.",
    specs: [
      { label: "Type", value: "WhatsApp Business API" },
      { label: "Messaging limit", value: "2,000 / 24h" },
      { label: "Verification", value: "Verified" },
      { label: "Warranty", value: WARRANTY_BM },
    ],
  },

  "BM10 Verified (Unlimited DSL)": {
    description:
      "A top-tier verified Business Manager with 10 ad account slots and no daily spend limit. It carries a large spending history and is extremely strong, one of the rarest and most sought-after assets on the market.",
    specs: [
      { label: "Ad account slots", value: "10" },
      { label: "Spend limit", value: "No cap (unlimited)" },
      { label: "Spending history", value: "Large" },
      { label: "Stability", value: "Very strong" },
      { label: "Availability", value: "Extremely rare" },
      { label: "Warranty", value: WARRANTY_BM },
    ],
    highlights: [
      "10 ad accounts with unlimited spend limit",
      "Backed by a large real spending history",
      "One of the rarest BMs available anywhere",
    ],
  },

  // ── Agency Ad Account ──
  "Ad Account (Unlimited DSL)": {
    description:
      "An agency-provisioned ad account with no daily spend limit. Runs under a stable agency Business Manager with real headroom, so your ceiling is your data, not your account.",
    specs: [
      { label: "Spend limit", value: "No cap (unlimited)" },
      { label: "Managed by", value: "Agency BM" },
      { label: "Stability", value: "High, built to scale" },
      { label: "Warranty", value: "Covered until spend starts" },
    ],
    highlights: [
      "No sudden limits when you push budget",
      "Ideal for aggressive, high-volume scaling",
    ],
  },

  // ── Facebook Pages ──
  "Aged Reinstated Facebook Page": {
    description:
      "A super aged Facebook Page, 3 to 6 years old, successfully reinstated after Meta review. Its long history gives your campaigns a stable, trusted identity to run ads from.",
    specs: [
      { label: "Age", value: "3 to 6 years (super aged)" },
      { label: "Status", value: "Successfully reinstated" },
      { label: "Use", value: "Ad campaign stability" },
      { label: "Warranty", value: WARRANTY_PROFILE },
    ],
  },
  "1K–3K Follower Facebook Page": {
    description:
      "A super aged Facebook Page, 3 to 6 years old, carrying 1,000 to 3,000 followers for instant social proof alongside a trusted history.",
    specs: [
      { label: "Age", value: "3 to 6 years (super aged)" },
      { label: "Followers", value: "1K to 3K" },
      { label: "Status", value: "Aged, ready" },
      { label: "Warranty", value: WARRANTY_PROFILE },
    ],
  },
  "5K Follower Facebook Page": {
    description:
      "A super aged Facebook Page, 3 to 6 years old, with around 5,000 followers for stronger credibility from day one.",
    specs: [
      { label: "Age", value: "3 to 6 years (super aged)" },
      { label: "Followers", value: "~5K" },
      { label: "Status", value: "Aged, ready" },
      { label: "Warranty", value: WARRANTY_PROFILE },
    ],
  },
  "10K Follower Facebook Page": {
    description:
      "A super aged Facebook Page, 3 to 6 years old, with around 10,000 followers, a strong base for brand presence and ads.",
    specs: [
      { label: "Age", value: "3 to 6 years (super aged)" },
      { label: "Followers", value: "~10K" },
      { label: "Status", value: "Aged, ready" },
      { label: "Warranty", value: WARRANTY_PROFILE },
    ],
  },
  "Livestream Ads Ready Page": {
    description:
      "A super aged Page, 3 to 6 years old, pre-cleared for livestream advertising, so you can run live shopping and livestream ad formats without the usual setup friction.",
    specs: [
      { label: "Age", value: "3 to 6 years (super aged)" },
      { label: "Ready for", value: "Livestream ads" },
      { label: "Status", value: "Aged, enabled" },
      { label: "Warranty", value: WARRANTY_PROFILE },
    ],
  },
  "Monetized Page (10K Followers)": {
    description:
      "A super aged, monetization-enabled Page, 3 to 6 years old, with around 10,000 followers, ready for content payouts and ads.",
    specs: [
      { label: "Age", value: "3 to 6 years (super aged)" },
      { label: "Followers", value: "~10K" },
      { label: "Status", value: "Monetization enabled" },
      { label: "Warranty", value: WARRANTY_PROFILE },
    ],
  },
  "Verified Page (Blue Badge)": {
    description:
      "A super aged Facebook Page, 3 to 6 years old, carrying the verified blue badge for maximum credibility and reach. Availability and lead time vary, contact us to confirm current stock.",
    specs: [
      { label: "Age", value: "3 to 6 years (super aged)" },
      { label: "Badge", value: "Verified (blue)" },
      { label: "Trust", value: "Highest" },
      { label: "Availability", value: "Contact for stock" },
    ],
  },

  // ── Other Service ──
  "Verification Badge (Facebook Page)": {
    description:
      "We secure the official verified blue badge for your Facebook Page, boosting credibility, reach, and trust with your audience.",
    specs: [
      { label: "Platform", value: "Facebook Page" },
      { label: "Badge", value: "Verified (blue)" },
      { label: "Price", value: "$600" },
      { label: "Turnaround", value: "Case-dependent" },
    ],
  },
  "Verification Badge (Instagram)": {
    description:
      "We secure the official verified badge for your Instagram account, strengthening credibility and unlocking the trust that comes with a verified profile.",
    specs: [
      { label: "Platform", value: "Instagram" },
      { label: "Badge", value: "Verified (blue)" },
      { label: "Price", value: "$600" },
      { label: "Turnaround", value: "Case-dependent" },
    ],
  },
  "Verification Badge (TikTok)": {
    description:
      "We help secure the official verified badge for your TikTok account. Pricing depends on the account and case, contact us for a quick assessment.",
    specs: [
      { label: "Platform", value: "TikTok" },
      { label: "Badge", value: "Verified" },
      { label: "Price", value: "Contact for quote" },
      { label: "Turnaround", value: "Case-dependent" },
    ],
  },
  "BM Verification Service": {
    description:
      "We take your Business Manager through Meta's business verification, unlocking higher trust, higher limits, and features that require a verified BM. Fast turnaround with a high success rate.",
    specs: [
      { label: "Service", value: "BM business verification" },
      { label: "Price", value: "$100 per BM" },
      { label: "Turnaround", value: "Fast (case-dependent)" },
      { label: "Requirement", value: "Your existing BM" },
    ],
    highlights: [
      "Unlocks higher spending limits and trust",
      "Enables features that need a verified BM",
    ],
  },
}

/** Return the curated detail, or a sensible generic fallback built from the name. */
export function getProductDetail(name: string, categoryName?: string): ProductDetail {
  const found = productDetails[name]
  if (found) return found
  return {
    description: `${name} from GOADS. A cleanly sourced, quality-controlled asset ready for advertising. Message our team for the exact current specs, stock, and delivery time before ordering.`,
    specs: [
      ...(categoryName ? [{ label: "Category", value: categoryName }] : []),
      { label: "Quality", value: "Strict quality control" },
      { label: "Support", value: "24/7 GOADS team" },
    ],
  }
}
