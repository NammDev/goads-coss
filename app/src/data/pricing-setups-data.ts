// GOADS pricing page data — 3 setup-tier cards + FAQ items
// Uses Foreplay PricingCardData shape, but: no /month period, no subscription user info,
// features rendered with leading checkmarks (no brand icons)
//
// Every tier is built on BM5 + AGENCY ad accounts: the BM5 is the container,
// the agency ad account is what actually spends. Native ad accounts stopped
// being reliable on Meta, so no setup here may depend on one, and no tier
// ships without an ad account — a setup you cannot advertise from is not a
// setup. Prices MUST mirror src/data/product-catalog-table-data.ts.

import type { PricingCardData } from "@/components/pricing/card"

const BM_ICON = "/assets/BM.webp"
const PROFILE_ICON = "/assets/PROFILES.webp"
const PAGE_ICON = "/assets/PAGES.webp"
const AD_ACCOUNT_ICON = "/assets/META.webp"

// Catalog unit prices, named so a catalog change surfaces here as one edit.
const PRICE_AD_ACCOUNT = 250
const PRICE_BM5 = 390
const PRICE_PROFILE_PREMIUM = 50
const PRICE_PAGE_AGED = 35

// ── Warranty terms — ONE source for the whole page ──
// Stated in two places on /pricing: the footer notice panel and the FAQ. Both
// read this list, so the numbers cannot drift apart.
//
// NOTE: src/data/refund-policy-content.ts still says ad account cover ends at
// the customer's first successful spend, which contradicts the $1,000 below.
// Confirm which is correct before the next change to either file.
export const GOADS_WARRANTY_TERMS = [
  {
    asset: "Agency ad accounts",
    term: "Covered until the account has spent $1,000. Disabled before that, we replace it.",
  },
  {
    asset: "Business Managers",
    term: "7-day replacement from delivery. Most issues show up in the first 48 hours.",
  },
  {
    asset: "Profiles",
    term: "14-day unlimited replacement if a profile is disabled or restricted.",
  },
  {
    asset: "Pages",
    term: "14-day unlimited replacement if a page is disabled or unpublished.",
  },
]

// ── FAQ items — GOADS-specific (warranty / delivery / payment / refunds) ──
export const goadsPricingFaqItems = [
  {
    question: "What is your warranty policy?",
    // Built from GOADS_WARRANTY_TERMS so this answer and the footer panel
    // can never quote different numbers.
    answer:
      GOADS_WARRANTY_TERMS.map((w) => `${w.asset}: ${w.term}`).join(" ") +
      " Policies may be updated, always confirm the exact warranty terms with our support team at the time of purchase.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Delivery times vary by product. Most profile orders deliver within a few hours, while verified Business Managers may take 1-7 days. Contact support for current ETAs on your specific order.",
  },
  {
    question: "What happens if an asset gets restricted or banned?",
    answer:
      "Replacements are provided free of charge within the warranty window. For assets outside warranty, our paid unban/recovery service can attempt to reinstate them, success rates and timelines are case-dependent. Message support for a quick assessment.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "Yes, refunds are issued for undelivered orders or assets that fail the warranty terms above. Refunds are reviewed case-by-case. Reach out to support and we'll resolve it quickly.",
  },
  {
    question: "Do you offer bulk discounts for agencies?",
    answer:
      "Yes. Volume-based discounts apply automatically as your order quantity grows. Agencies and high-volume advertisers can also unlock Enterprise pricing, talk to sales to lock in custom agency rates.",
  },
  {
    question: "How do I always get the most accurate pricing and specs?",
    answer:
      "Our catalog is updated regularly, but specs and availability can change without notice. We strongly recommend messaging the GOADS support team before placing larger orders to confirm current pricing, stock and delivery timelines.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept bank transfer, USDT, and major cryptocurrencies. Agency accounts can request invoicing or custom payment terms, contact our sales team to set this up.",
  },
]

export const goadsSetupCards: PricingCardData[] = [
  {
    planName: "Advanced Setup",
    description: "The smallest setup that actually runs. One BM, one live account.",
    price: "$625",
    ctaLabel: "Get Started",
    ctaHref: "/book-demo",
    ctaVariant: "secondary",
    // a la carte: BM5 $390 + ad account $250 + profile $50 = $690 (save $65).
    // No `offer`: every tier ships BM5 outright, so there is nothing to upgrade
    // from. `upgrade` stays so the configurator keeps the original-profile
    // add-on and the savings badge is derived rather than typed.
    upgrade: { count: 1, retailPrice: PRICE_BM5 + PRICE_AD_ACCOUNT + PRICE_PROFILE_PREMIUM },
    features: [
      { iconSrc: BM_ICON, label: "1x BM5 Super Aged: unlimited spending limit, holds your agency ad accounts", available: true },
      { iconSrc: AD_ACCOUNT_ICON, label: "1x Agency Ad Account: warranty up to $1,000 spend", available: true },
      { iconSrc: PROFILE_ICON, label: "1x Premium Profile: admin access to the BM", available: true },
      { label: "Telegram support included during setup", available: true },
      { label: "Full credentials handed over on day one", available: true },
    ],
    // One pod: a single BM5 holding one ad account, administered by one
    // profile. No second BM, so no pixel-bank pod and no bridge arrow.
    topology: {
      intro: "One Business Manager holding one agency ad account, administered by your profile.",
      pods: [
        {
          label: "Ad Account Hub",
          bm: { iconSrc: BM_ICON, name: "BM5 Super Aged", sub: "Unlimited DSL" },
          assets: [
            { iconSrc: PROFILE_ICON, label: "Premium", count: 1 },
            { iconSrc: AD_ACCOUNT_ICON, label: "Ad Account", count: 1 },
          ],
          caption: "Holds and runs your ad account",
        },
      ],
      steps: [
        "Your Premium Profile is admin on the BM5",
        "We share 1 agency ad account into that BM5",
        "You spend from the ad account with no BM spend cap",
      ],
    },
  },
  {
    planName: "Premium Setup",
    description: "Spare account and spare profile, so nothing stops when one goes down.",
    price: "$925",
    ctaLabel: "Scale Now",
    ctaHref: "/book-demo",
    ctaVariant: "primary",
    // a la carte: BM5 $390 + 2x ad account $500 + 2x profile $100 + page $35
    // = $1,025 (save $100).
    upgrade: {
      count: 1,
      retailPrice:
        PRICE_BM5 + PRICE_AD_ACCOUNT * 2 + PRICE_PROFILE_PREMIUM * 2 + PRICE_PAGE_AGED,
    },
    features: [
      { iconSrc: BM_ICON, label: "1x BM5 Super Aged: unlimited spending limit", available: true },
      { iconSrc: AD_ACCOUNT_ICON, label: "2x Agency Ad Accounts: one live, one on standby", available: true },
      { iconSrc: PROFILE_ICON, label: "2x Premium Profiles: one admin, one backup", available: true },
      { iconSrc: PAGE_ICON, label: "1x Aged Reinstated Page: skip it if you already have one", available: true },
      { label: "Warranty up to $1,000 spend per ad account", available: true },
    ],
    topology: {
      intro: "One Business Manager carrying two ad accounts, with a spare profile and a page ready to run.",
      pods: [
        {
          label: "Ad Account Hub",
          bm: { iconSrc: BM_ICON, name: "BM5 Super Aged", sub: "Unlimited DSL" },
          assets: [
            { iconSrc: PROFILE_ICON, label: "Premium", count: 2 },
            { iconSrc: AD_ACCOUNT_ICON, label: "Ad Account", count: 2 },
            { iconSrc: PAGE_ICON, label: "Aged", count: 1 },
          ],
          caption: "Holds and runs your ad accounts",
        },
      ],
      steps: [
        "2 Premium Profiles administer the BM5, one admin and one backup",
        "We share 2 agency ad accounts into that BM5",
        "One account runs live, the other waits on standby",
        "The aged page is linked so campaigns stay stable",
      ],
    },
  },
  {
    planName: "Elite Setup",
    description: "A pixel bank feeding a scaling BM, so your pixel survives the account that spends.",
    price: "$1840",
    ctaLabel: "Go Elite",
    ctaHref: "/book-demo",
    ctaVariant: "secondary",
    // a la carte: 2x BM5 $780 + 4x ad account $1,000 + 4x profile $200
    // + 2x page $70 = $2,050 (save $210).
    upgrade: {
      count: 2,
      retailPrice:
        PRICE_BM5 * 2 + PRICE_AD_ACCOUNT * 4 + PRICE_PROFILE_PREMIUM * 4 + PRICE_PAGE_AGED * 2,
    },
    features: [
      { iconSrc: BM_ICON, label: "2x BM5 Super Aged: one pixel bank, one running your ads", available: true },
      { iconSrc: AD_ACCOUNT_ICON, label: "4x Agency Ad Accounts: all four on the scaling BM, warranty up to $1,000 spend each", available: true },
      { iconSrc: PROFILE_ICON, label: "4x Premium Profiles: two operating each BM", available: true },
      { iconSrc: PAGE_ICON, label: "2x Aged Reinstated Pages: linked to the scaling BM", available: true },
      { label: "Warranty up to $1,000 spend per ad account", available: true },
    ],
    // Pixel-bank pod + scaling pod, joined by pixel sharing. The bank holds
    // ONLY profiles: its job is to create and warm the pixel, and keeping ad
    // accounts off it is what keeps the pixel out of reach when the spending
    // account is the one that gets hit. Everything that actually runs ads —
    // all four ad accounts and both pages — lives on the scaling BM.
    topology: {
      intro: "One BM5 does nothing but build and warm your pixel. The other runs the ads, carrying every ad account and page, and receives the pixel by sharing.",
      bridgeLabel: "pixel sharing",
      pods: [
        {
          label: "Pixel Bank",
          index: 1,
          isBank: true,
          bm: { iconSrc: BM_ICON, name: "BM5 Super Aged", sub: "Unlimited DSL" },
          assets: [{ iconSrc: PROFILE_ICON, label: "Premium", count: 2 }],
          caption: "Creates & warms your pixel",
        },
        {
          label: "Scaling",
          index: 2,
          bm: { iconSrc: BM_ICON, name: "BM5 Super Aged", sub: "Unlimited DSL" },
          assets: [
            { iconSrc: PROFILE_ICON, label: "Premium", count: 2 },
            { iconSrc: AD_ACCOUNT_ICON, label: "Ad Account", count: 4 },
            { iconSrc: PAGE_ICON, label: "Aged", count: 2 },
          ],
          caption: "Runs & scales your ads",
        },
      ],
      steps: [
        "2 Premium Profiles build and operate the pixel-bank BM5",
        "That BM5 creates and warms your advertising pixel",
        "The pixel is shared into your second BM5",
        "2 Premium Profiles, 4 agency ad accounts and 2 aged pages run and scale ads there",
      ],
    },
  },
]

/** Cheapest setup across the three tiers. Mirrors LOWEST_MONTHLY_FEE on the
 *  rental side: promo copy elsewhere reads this instead of retyping a price,
 *  so a tier change can never leave a stale "from $X" behind. */
export const LOWEST_SETUP_PRICE = Math.min(
  ...goadsSetupCards.map((card) => Number(String(card.price).replace(/[^0-9.]/g, ""))),
)
