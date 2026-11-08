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
  /** Optional paid add-on shown as a toggle in the drawer (adds `price` to the cart) */
  addon?: { label: string; price: number; benefit: string }
  /** Selectable choices (e.g. which asset to unban) shown as chips; feeds the contact message */
  options?: { title: string; choices: string[] }
  /** Prominent note callout shown above the CTA (e.g. "attach a screenshot") */
  note?: string
}

const WARRANTY_PROFILE = "14-day unlimited replacement warranty"
// Super aged (7 to 15 year) profiles get an extended 30-day cover.
const WARRANTY_PROFILE_30 = "30-day unlimited replacement warranty"
// BM warranty covers the Business Manager only, not the native ad accounts inside it.
const WARRANTY_BM = "7 days (BM only, native ad accounts not covered)"

export const productDetails: Record<string, ProductDetail> = {
  // ── Facebook Profiles ──
  "Premium Profile (Farmed, Clean History)": {
    description:
      "A farm-raised Facebook profile grown in-house with GOADS' clean warm-up method — never bought off a bulk market. It is aged on mixed residential IPs from several countries, so it carries a natural history and stays flexible enough to run across different ad environments and regions.",
    specs: [
      { label: "Source", value: "GOADS farm (self-nurtured)" },
      { label: "IP profile", value: "Mixed residential, multi-country" },
      { label: "Age", value: "1 to 4 years" },
      { label: "Warm-up", value: "GOADS clean method" },
      { label: "Warranty", value: WARRANTY_PROFILE },
    ],
    highlights: [
      "Real history and activity, not a freshly created account",
      "Lower checkpoint and ban risk when paired with a matching proxy",
      "Clean history, ready to run right after login",
    ],
  },
  "Premium Super Aged Profile (Farmed, Clean History)": {
    description:
      "Our flagship profile: farm-raised in-house with 7 to 15 years of history behind it. Same clean warm-up method as the Premium Profile, but the extra years of real activity make it our highest-trust asset, built to hold up under aggressive scaling.",
    specs: [
      { label: "Source", value: "GOADS farm (self-nurtured)" },
      { label: "IP profile", value: "Mixed residential, multi-country" },
      { label: "Age", value: "7 to 15 years" },
      { label: "Trust", value: "Highest (flagship)" },
      { label: "Warranty", value: WARRANTY_PROFILE_30 },
    ],
    highlights: [
      "The strongest, most stable profile GOADS offers",
      "Handles higher spend and faster warm-up",
      "Ideal for advertisers who lose accounts too often",
    ],
  },
  "Instagram Profile (Farmed, Clean History)": {
    description:
      "A farm-raised Instagram profile nurtured with the same clean method as our Facebook profiles. Useful for social proof, linking to Business Managers, and running Instagram placements with a credible presence.",
    specs: [
      { label: "Source", value: "GOADS farm (self-nurtured)" },
      { label: "Status", value: "Aged, active" },
      { label: "Use", value: "IG ads, social proof" },
      { label: "Warranty", value: WARRANTY_PROFILE },
    ],
  },

  // ── Business Manager ──
  "BM5 Super Aged (Unlimited DSL)": {
    description:
      "A verified Business Manager with 5 ad account slots and no daily spend cap. It comes with real spending history, is very strong and stable for long-term use, and supports pixel sharing, built to run large budgets right away.",
    specs: [
      { label: "Ad account slots", value: "5" },
      { label: "Spend limit", value: "No cap (unlimited)" },
      { label: "Verification", value: "Verified" },
      { label: "Spending history", value: "Yes" },
      { label: "Stability", value: "Very strong, long-term" },
      { label: "Pixel sharing", value: "Supported" },
      { label: "Warranty", value: WARRANTY_BM },
    ],
    highlights: [
      "GOADS recommends this BM for long-term use",
      "Run large budgets from day one",
      "Best for agencies scaling hard",
    ],
  },
  "BM10 Verified (Unlimited DSL)": {
    description:
      "A top-tier verified Business Manager with 10 ad account slots and no daily spend limit. It carries a large spending history and is extremely strong, one of the rarest and most sought-after assets on the market.",
    specs: [
      { label: "Ad account slots", value: "10" },
      { label: "Spend limit", value: "No cap (unlimited)" },
      { label: "Verification", value: "Verified" },
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
      { label: "Warranty", value: "Covered until $1,000 spend" },
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
  "Unban Service": {
    description:
      "Got an asset restricted or disabled? Our recovery team attempts to reinstate it. Choose the asset you need unbanned, then message us with the details. Success rates and timelines are case-dependent.",
    specs: [
      { label: "Covers", value: "Profile, IG, Page, Ad account" },
      { label: "Pricing", value: "Case-dependent" },
      { label: "Turnaround", value: "Case-dependent" },
    ],
    options: {
      title: "What do you need unbanned?",
      choices: ["Facebook Profile", "Instagram", "Facebook Fanpage", "Ad Account"],
    },
    note: "When you message us, please attach a full-screen screenshot showing the current status of the asset you need unbanned.",
  },
  "Verification Badge (Facebook Page)": {
    description:
      "We secure the official verified blue badge for your Facebook Page, boosting credibility, reach, and trust with your audience. Please note Meta charges a recurring subscription fee of about $8 to $10 per month to keep the badge active, which you pay directly to Meta. If you do not have a Page yet, we include a free aged reinstated Page (a $35 value) with this service.",
    specs: [
      { label: "Platform", value: "Facebook Page" },
      { label: "Badge", value: "Verified (blue)" },
      { label: "Price", value: "$600" },
      { label: "Meta monthly fee", value: "$8 to $10 (paid to Meta)" },
      { label: "Turnaround", value: "Case-dependent" },
    ],
    highlights: [
      "No Page yet? We include a free aged reinstated Page ($35 value)",
    ],
  },
  "Verification Badge (Instagram)": {
    description:
      "We secure the official verified badge for your Instagram account, strengthening credibility and unlocking the trust that comes with a verified profile. Please note Meta charges a recurring subscription fee of about $8 to $10 per month to keep the badge active, which you pay directly to Meta.",
    specs: [
      { label: "Platform", value: "Instagram" },
      { label: "Badge", value: "Verified (blue)" },
      { label: "Price", value: "$600" },
      { label: "Meta monthly fee", value: "$8 to $10 (paid to Meta)" },
      { label: "Turnaround", value: "Case-dependent" },
    ],
  },
  // ── TikTok Assets ──
  "TikTok BC30 Verified (30 Warmed-Up Ad Accounts)": {
    description:
      "A verified TikTok Business Center holding around 30 ad accounts that are already warmed up for the USA market. No cold-start penalty and no waiting on approvals, you log in and launch straight away.",
    specs: [
      { label: "Type", value: "TikTok Business Center" },
      { label: "Ad accounts", value: "~30, warmed up" },
      { label: "Market", value: "USA" },
      { label: "Verification", value: "Verified" },
      { label: "Status", value: "Ready to use" },
    ],
    highlights: [
      "Skip the warm-up phase, the accounts are already seasoned for US traffic",
      "Run and rotate many accounts in parallel to isolate risk",
      "Ideal for media buyers scaling TikTok hard",
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
