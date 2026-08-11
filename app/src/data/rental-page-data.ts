// Meta Asset Rental — plan catalogue for /rental.
//
// Model: two rental TRACKS, split by what the customer advertises, each with
// three tiers. A plan is an all-in monthly bundle — ad accounts, BM, profiles and
// pages are already inside it, and every asset carries unlimited same-day
// replacement for as long as the rental runs. Nothing here is configurable; the
// customer picks a tier and talks to sales.
//
// The tracks are internally "whitehat" and "BH + GH", but the public labels are
// Standard and High-risk verticals — the segmentation is real, the slang is not
// something the marketing site should say out loud.
//
// IMPORTANT: replacement is IDENTICAL across both tracks — unlimited, same-day,
// every asset. The spend fee is the only thing the risk profile changes (1% flat
// on Standard vs 6/5/4% on High-risk). Copy anywhere on this page must not imply
// that the cheaper track buys a weaker replacement promise.
//
// Numbers are transcribed verbatim from the client's two spec tables
// (2026-08-10). Do not "tidy" them.
//
// BM TIERS ARE DELIBERATELY NOT NAMED on the page. The client does not want
// BM3 / BM5 / NLM exposed to customers, so the Business Manager row describes
// the CAPABILITY instead ("Verified, unlimited daily spend"). The actual tier
// each plan ships is kept in a code comment on the row so sales and delivery
// still have it — dropping it entirely would lose the only record of what a
// plan owes the customer.

export type RentalTrackId = "standard" | "high-risk"

export interface RentalPlanSpec {
  label: string
  value: string
}

export interface RentalPlan {
  id: string
  name: string
  /** One line on who the tier is for — shown under the plan name on the card. */
  description: string
  /** Monthly fee in whole dollars; formatted at render. */
  monthlyFee: number
  /** Percentage of ad spend charged on top of the monthly fee. */
  spendFeePct: number
  /** Monthly spend ceiling, or null for uncapped. */
  spendCap: number | null
  /** Ordered spec rows — drive both the card list and the comparison table, so
   *  the two can never disagree. */
  specs: RentalPlanSpec[]
  /** The tier we want customers to land on. Rendered as the dark card in the
   *  CENTRE slot, wherever it sits in the price ladder — see orderForDisplay. */
  highlight?: boolean
}

export interface RentalTrack {
  id: RentalTrackId
  /** Switcher label */
  label: string
  plans: RentalPlan[]
}

/** Spend caps are quoted per month everywhere on the page. */
const formatCap = (cap: number | null) =>
  cap === null ? "Unlimited" : `$${(cap / 1000).toLocaleString("en-US")}k / month`

/** Every plan on BOTH tracks carries the same replacement promise — declared
 *  once and shared so no tier can drift into looking weaker than another. */
const REPLACEMENT_SPEC: RentalPlanSpec = {
  label: "Replacement",
  value: "Unlimited, same-day",
}

/** The customer attaches their OWN payment card to the rented ad accounts, so
 *  card rewards on ad spend stay with them — providers that require top-ups
 *  through the provider collect that themselves. Shared by every plan and placed
 *  FIRST in the spec list: it is the strongest differentiator on the page, and
 *  it earns the top row rather than a paragraph elsewhere. */
const OWN_CARD_SPEC: RentalPlanSpec = {
  label: "Add your own card",
  value: "Keep the cashback",
}

/** Ad accounts are provisioned to demand on EVERY plan, both tracks — the client
 *  confirmed on 2026-08-11 that the per-tier counts in the original Standard
 *  table (1 / 2 / 4) are not a limit they enforce. Shared so the six plans can't
 *  drift apart, and so nothing on the page implies the cheaper track is rationed. */
const AD_ACCOUNT_SPEC: RentalPlanSpec = {
  label: "Ad accounts",
  value: "Provisioned on demand",
}

// ── Track 1: Standard (whitehat) ────────────────────────────────────────────
// Source: "Gói trắng — bản chính". Flat 1% spend fee across all three tiers —
// deliberate, so the entry tier isn't punished for being small.

const STANDARD_PLANS: RentalPlan[] = [
  {
    id: "launch",
    name: "Launch",
    description: "First campaigns on rented infrastructure.",
    monthlyFee: 299,
    spendFeePct: 1,
    spendCap: 15000,
    specs: [
      OWN_CARD_SPEC,
      // Ships BM3 Verified
      { label: "Business Manager", value: "Verified, high quality" },
      AD_ACCOUNT_SPEC,
      { label: "Profiles", value: "2" },
      { label: "Pages", value: "1" },
      REPLACEMENT_SPEC,
      { label: "Support", value: "24/7 Telegram" },
    ],
  },
  {
    id: "build",
    name: "Build",
    description: "Room to test more angles at once.",
    monthlyFee: 599,
    spendFeePct: 1,
    spendCap: 50000,
    specs: [
      OWN_CARD_SPEC,
      // Ships BM5 Verified ($250 DSL)
      { label: "Business Manager", value: "Verified, higher daily spend" },
      AD_ACCOUNT_SPEC,
      { label: "Profiles", value: "3" },
      { label: "Pages", value: "2" },
      REPLACEMENT_SPEC,
      { label: "Support", value: "24/7 Telegram" },
    ],
  },
  {
    id: "scale",
    name: "Scale",
    description: "Spend as hard as the offer allows.",
    monthlyFee: 999,
    spendFeePct: 1,
    // Uncapped, matching Elite on the other track — the top tier of each track
    // removes the ceiling (client, 2026-08-11; the source table said $100k).
    spendCap: null,
    highlight: true,
    specs: [
      OWN_CARD_SPEC,
      // Ships BM5 Verified NLM
      { label: "Business Manager", value: "Verified, unlimited daily spend" },
      AD_ACCOUNT_SPEC,
      { label: "Profiles", value: "4" },
      { label: "Pages", value: "3" },
      REPLACEMENT_SPEC,
      { label: "Support", value: "Priority 24/7" },
    ],
  },
]

// ── Track 2: High-risk verticals (BH + GH) ─────────────────────────────────
// Source: "Cấu trúc đề xuất". This track burns through assets, so the spend fee
// carries the replacement load — that fee, the spend cap and the asset counts are
// the only things that move. Replacement, on-demand ad accounts and the own-card
// term are identical to Standard.

const HIGH_RISK_PLANS: RentalPlan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Enter the vertical without buying a stack.",
    monthlyFee: 349,
    spendFeePct: 6,
    spendCap: 15000,
    specs: [
      OWN_CARD_SPEC,
      // Ships BM3 Verified
      { label: "Business Manager", value: "Verified, high quality" },
      AD_ACCOUNT_SPEC,
      { label: "Profiles (2 to 7 years)", value: "2" },
      { label: "Aged reinstated pages", value: "2" },
      REPLACEMENT_SPEC,
      { label: "Support", value: "24/7 Telegram" },
    ],
  },
  {
    id: "growth",
    name: "Growth",
    description: "Sustained spend with a deeper asset bench.",
    monthlyFee: 749,
    spendFeePct: 5,
    spendCap: 45000,
    specs: [
      OWN_CARD_SPEC,
      // Ships BM5 Verified NLM
      { label: "Business Manager", value: "Verified, unlimited daily spend" },
      AD_ACCOUNT_SPEC,
      { label: "Profiles (2 to 7 years)", value: "4" },
      { label: "Aged reinstated pages", value: "4" },
      REPLACEMENT_SPEC,
      { label: "Support", value: "Priority 24/7" },
    ],
  },
  {
    id: "elite",
    name: "Elite",
    description: "No spend ceiling, with a manager on your account.",
    monthlyFee: 1199,
    spendFeePct: 4,
    spendCap: null,
    highlight: true,
    specs: [
      OWN_CARD_SPEC,
      // Ships BM5 Verified NLM. The client's original table said 2× here; they
      // corrected it to a single BM on 2026-08-11 — every plan ships exactly one.
      { label: "Business Manager", value: "Verified, unlimited daily spend" },
      AD_ACCOUNT_SPEC,
      { label: "Profiles (2 to 7 years)", value: "6" },
      { label: "Aged reinstated pages", value: "6" },
      REPLACEMENT_SPEC,
      { label: "Support", value: "Priority + account manager" },
    ],
  },
]

// Core-feature copy is deliberately grounded in what the plans actually ship.
// Competitors in this space quote unverifiable multipliers ("8× higher approval
// rates", "50% lower CPA"); we do not have that data, and inventing it would put
// a number on the page that nobody can stand behind. Every claim below is either
// a term of the plan or a property of the assets it delivers.

export const RENTAL_TRACKS: RentalTrack[] = [
  {
    id: "standard",
    label: "Standard",
    plans: STANDARD_PLANS,
  },
  {
    id: "high-risk",
    label: "High-risk verticals",
    plans: HIGH_RISK_PLANS,
  },
]

export const DEFAULT_TRACK: RentalTrackId = "standard"

export function getTrack(id: RentalTrackId): RentalTrack {
  return RENTAL_TRACKS.find((t) => t.id === id) ?? RENTAL_TRACKS[0]
}

/** Display order for the card grid: the highlighted plan takes the CENTRE slot,
 *  the other two keep their relative order around it.
 *
 *  The centre card is the one with the dark treatment and the badge, so it is
 *  where attention lands — and the client wants that attention on the top tier.
 *  Doing it here rather than by reordering `plans` keeps the arrays in the
 *  client's own ascending-price order, which is what the spec tables look like
 *  and what anyone checking the numbers will expect to find. Note this makes the
 *  visible price sequence non-monotonic (e.g. $299 · $999 · $599) — deliberate,
 *  not a sorting bug. */
export function orderForDisplay(plans: RentalPlan[]): RentalPlan[] {
  const featuredIndex = plans.findIndex((p) => p.highlight)
  if (featuredIndex === -1 || plans.length !== 3) return plans
  const rest = plans.filter((_, i) => i !== featuredIndex)
  return [rest[0], plans[featuredIndex], rest[1]]
}

/** Cheapest entry point across both tracks — used in hero/metadata copy so the
 *  claim can never drift from the table. */
export const LOWEST_MONTHLY_FEE = Math.min(
  ...RENTAL_TRACKS.flatMap((t) => t.plans.map((p) => p.monthlyFee)),
)

// ── Formatting + the three headline terms every plan shares ─────────────────

export const formatMonthlyFee = (fee: number) => `$${fee.toLocaleString("en-US")}`

/** The rows that head every card and the comparison table, in order. Kept as a
 *  function rather than baked into `specs` because these three are the ones the
 *  card renders as its price block, not as list items. */
export function headlineSpecs(plan: RentalPlan): RentalPlanSpec[] {
  return [
    { label: "Spend fee", value: `${plan.spendFeePct}% of ad spend` },
    { label: "Spend cap", value: formatCap(plan.spendCap) },
  ]
}

/** Full row set for the comparison table — headline terms first, then the specs
 *  already declared on the plan. */
export function comparisonRows(plan: RentalPlan): RentalPlanSpec[] {
  return [...headlineSpecs(plan), ...plan.specs]
}

// ── Sales hand-off ──────────────────────────────────────────────────────────

// When the spend fee is charged. One source of truth for the day, with the two
// wordings derived from it: lower-casing the whole sentence to fit it mid-line
// mangles the weekday into "monday".
const SPEND_FEE_BILLING_DAY = "Monday"

/** Sentence-initial form, for standalone use. */
export const SPEND_FEE_BILLING = `Collected weekly, every ${SPEND_FEE_BILLING_DAY}`

/** Telegram pre-fills its composer from ?text=, so the plan travels with the
 *  click and sales sees exactly which tier the customer tapped.
 *
 *  The message spells out the two charges separately and labels them, because
 *  they behave differently: the monthly fee is fixed and paid upfront, the spend
 *  fee is a percentage settled weekly after the fact. Quoting one combined
 *  "total" would be wrong, since the second number does not exist until the
 *  customer has spent. The customer sees this text in their composer before
 *  sending, so it doubles as the last confirmation of what they are agreeing to. */
export function buildPlanEnquiry(
  baseUrl: string,
  track: RentalTrack,
  plan: RentalPlan,
): string {
  const message = [
    "Hi GOADS 👋 I would like to rent the following plan.",
    "",
    `PLAN: ${plan.name} (${track.label} track)`,
    "",
    `1) Fixed fee: ${formatMonthlyFee(plan.monthlyFee)} per month, paid upfront`,
    `2) Spend fee: ${plan.spendFeePct}% of ad spend, collected weekly every ${SPEND_FEE_BILLING_DAY}`,
    `3) Spend cap: ${formatCap(plan.spendCap)}`,
    "",
    "Included: ad accounts on demand, Business Manager, profiles and pages,",
    "unlimited same-day replacement, and I add my own payment card.",
    "",
    "Please confirm availability and the next steps. Thank you!",
  ].join("\n")
  return `${baseUrl}?text=${encodeURIComponent(message)}`
}

// ── Marketing copy ──────────────────────────────────────────────────────────

// Conversion copy: each card names the cost the advertiser is already paying,
// then the term that removes it. Claims stay inside what the plans actually
// guarantee — no invented performance numbers (see the note above RENTAL_TRACKS).

// ── Buy-or-rent intent ──────────────────────────────────────────────────────
// Asked once on arrival at /rental, because the header sends everyone shopping
// for an agency ad account here and roughly half of them want to buy one
// outright instead. Better to route them in one click than to let them read a
// rental page that was never for them.
//
// No prices: the two pages behind this already quote them, and putting numbers
// here invites a comparison on cost alone when the real difference is what the
// customer takes on.

export interface RentalIntentOption {
  id: "buy" | "rent"
  label: string
  body: string
  /** Omitted on the rental option: choosing it just closes the dialog, since
   *  the customer is already on the page it would link to. */
  href?: string
}

export const RENTAL_INTENT_OPTIONS: RentalIntentOption[] = [
  {
    id: "buy",
    label: "Buy assets individually",
    body: "Pick exactly what you need from the catalog, ad accounts, Business Managers, profiles or pages. One-time payment, transferred into your own setup, yours to keep.",
    // Top of /pricing, not the `#agency-ad-account` anchor. Someone leaving the
    // rental page to buy is choosing a purchasing model, not a product; dropping
    // them mid-catalog at one category hides the rest of what they can buy.
    href: "/pricing",
  },
  {
    id: "rent",
    label: "Rent a complete setup",
    body: "Verified BM, profiles, pages and ad accounts provisioned and linked for you, warmed and ready to spend on handover. Billed monthly, replaced same day if anything goes down.",
  },
]

export const RENTAL_BENEFITS = [
  {
    title: "A ban stops the asset, not your campaigns",
    body: "A disabled account costs you the day's spend and the learning phase you already paid for. We replace any asset in the plan the same day, as many times as it happens. No per-incident fee, no cap, and the cheaper track is covered exactly like the expensive one.",
  },
  {
    title: "Your card, your cashback",
    body: "You attach your own payment card, so the rewards and points on your ad spend stay with you. Providers that route top-ups through their own balance collect that themselves. At serious volume it adds up to real money.",
  },
  {
    title: "Live this week, not next month",
    body: "Sourcing a BM, warming profiles, aging pages and linking them takes weeks, and rarely works first time. Your stack arrives assembled and connected. The only thing left is to launch.",
  },
  {
    title: "Keep your capital in ad budget",
    body: "Owning a full setup costs thousands upfront, and replacing it is your problem when Meta takes it. Renting turns that into one monthly line you raise when spend grows and drop when it does not.",
  },
]

// ── GOADS vs a typical agency account ───────────────────────────────────────
//
// The comparison column is "typical agency account", NOT a regular self-serve
// account. That matters for honesty: on a self-serve account the advertiser
// already uses their own card and already keeps their own cashback, so half this
// table would be comparing against nothing. Against other rental/agency
// providers — who fund accounts from their own balance — every row below is a
// real difference.
//
// Rows are claims we can stand behind: terms of our plans, or documented Meta
// behaviour (an ad account's timezone and currency are fixed at creation and
// cannot be changed afterwards, which is why matching them up front matters).
// The reference table this was modelled on quotes a "687% higher ad approval
// rate", a branded account score and a "5 minute" average approval time. None of
// those are ours to claim — ad review is Meta's process, on Meta's timeline —
// so they are not here.

export interface RentalComparisonRow {
  label: string
  /** true → tick, false → cross, string → rendered as text */
  goads: boolean | string
  other: boolean | string
}

export const RENTAL_COMPARISON_ROWS: RentalComparisonRow[] = [
  { label: "Daily spend limit", goads: "No limit", other: "Capped, raised on request" },
  { label: "Ad accounts", goads: "Unlimited, on demand", other: "Fixed quota per plan" },
  {
    label: "Timezone & currency",
    goads: "Matched to your business",
    other: "Whatever the provider has spare",
  },
  { label: "State at handover", goads: "Warmed up, ready to spend", other: "Cold, you warm it" },
  { label: "Add your own payment card", goads: true, other: false },
  { label: "Waiting to top up", goads: "No wait, spend straight away", other: "Hours, every top-up" },
  { label: "Cashback on your ad spend", goads: "Stays with you", other: "Collected by the provider" },
  { label: "Asset replacement", goads: "Unlimited, same-day", other: "Case by case, often billed" },
  { label: "Support", goads: "24/7", other: "Business hours" },
  {
    label: "How you pay us",
    goads: "Crypto (USDT) or bank transfer via Wise",
    other: "Provider balance only",
  },
]

export const RENTAL_FAQ_ITEMS = [
  {
    question: "What is the difference between the two tracks?",
    answer:
      "The spend fee and the depth of the asset bench. Standard covers compliant offers at a flat 1% of ad spend on every tier. High-risk verticals covers offers that put accounts under pressure: the fee starts at 6% and falls to 4% at the top tier, and the profile and page counts are higher. Everything else matches. Ad accounts are provisioned on demand on both tracks, the top tier of each removes the spend ceiling, every asset carries unlimited same-day replacement, and you run all of it on your own card.",
  },
  {
    question: "What does the monthly fee include?",
    answer:
      "The whole stack. Ad accounts, the Business Manager, profiles and pages listed on the plan are all part of the rental, delivered linked and ready to run. The only additional charge is the spend fee, calculated on what you actually spend.",
  },
  {
    question: "How does the spend fee work?",
    answer:
      "It is a percentage of the ad spend that runs through the rented accounts, charged on top of the monthly fee. The rate is fixed per plan: 1% across the Standard track, then 6%, 5% and 4% across High-risk verticals, and it never changes mid-cycle. The two charges are settled differently. The monthly fee is fixed and paid upfront; the spend fee is collected weekly, every Monday, on the spend from the week before.",
  },
  {
    question: "What happens if I hit the spend cap?",
    answer:
      "The cap is the monthly ceiling the plan is provisioned for. If you are approaching it, move up a tier. Scale and Elite, the top tier of each track, carry no ceiling at all. Tell us before you hit it so the assets are ready.",
  },
  {
    question: "What does unlimited replacement cover?",
    answer:
      "Every asset in the plan, on both tracks equally. If a rented ad account, Business Manager, profile or page is restricted or lost, we replace it the same day, as many times as it takes, for as long as the subscription is active. There is no per-incident charge and no cap, and Standard is covered no less than High-risk verticals.",
  },
  {
    question: "Do I own the assets?",
    answer:
      "No. Rented assets stay under GOADS management for the term, which is what makes same-day unlimited replacement possible. If you would rather own your setup outright, the one-time catalog on the Pricing page is the right fit.",
  },
  {
    question: "Can I change plan later?",
    answer:
      "Yes. Move between tiers, or between tracks, from the next billing cycle. Tell us before the cycle closes and we will have the assets provisioned for the switch.",
  },
]
