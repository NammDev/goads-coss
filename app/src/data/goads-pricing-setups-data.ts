// GOADS pricing page data — 3 setup-tier cards + FAQ items
// Uses Foreplay PricingCardData shape, but: no /month period, no subscription user info,
// features rendered with leading checkmarks (no brand icons)

import type { PricingCardData } from "@/components/foreplay/foreplay-pricing-card"

// ── FAQ items — GOADS-specific (warranty / delivery / payment / refunds) ──
export const goadsPricingFaqItems = [
  {
    question: "What is your warranty policy?",
    answer:
      "Profiles come with a 14-day unlimited warranty. Business Managers (BMs) include a 7-day warranty. Ad Accounts are covered under warranty until you begin spending. Policies may be updated — always confirm the exact warranty terms with our support team at the time of purchase.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Delivery times vary by product. Most profile orders deliver within a few hours, while verified Business Managers may take 1-7 days. Contact support for current ETAs on your specific order.",
  },
  {
    question: "What happens if an asset gets restricted or banned?",
    answer:
      "Replacements are provided free of charge within the warranty window. For assets outside warranty, our paid unban/recovery service can attempt to reinstate them — success rates and timelines are case-dependent. Message support for a quick assessment.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "Yes — refunds are issued for undelivered orders or assets that fail the warranty terms above. Refunds are reviewed case-by-case. Reach out to support and we'll resolve it quickly.",
  },
  {
    question: "Do you offer bulk discounts for agencies?",
    answer:
      "Yes. Volume-based discounts apply automatically as your order quantity grows. Agencies and high-volume advertisers can also unlock Enterprise pricing — talk to sales to lock in custom agency rates.",
  },
  {
    question: "How do I always get the most accurate pricing and specs?",
    answer:
      "Our catalog is updated regularly, but specs and availability can change without notice. We strongly recommend messaging the GOADS support team before placing larger orders to confirm current pricing, stock and delivery timelines.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept bank transfer, USDT, and major cryptocurrencies. Agency accounts can request invoicing or custom payment terms — contact our sales team to set this up.",
  },
]

export const goadsSetupCards: PricingCardData[] = [
  {
    planName: "Advanced Setup",
    description: "Essential setup for advertisers getting started with agency infrastructure.",
    price: "$250",
    ctaLabel: "Get Started",
    ctaHref: "/talk-to-sales",
    ctaVariant: "secondary",
    features: [
      { iconSrc: "/foreplay/BM.svg", label: "1x BM3 Verified: Business Manager with 3 ad account slots", available: true },
      { iconSrc: "/foreplay/PROFILES.svg", label: "2x Premium Profiles: High-trust profiles ready for advertising", available: true },
      { iconSrc: "/foreplay/PAGES.svg", label: "1x Aged Reinstated Page: Established page for campaign stability", available: true },
      { label: "Telegram support included during setup", available: true },
      { label: "14-Day Warranty: Replacement for profile issues", available: true },
    ],
  },
  {
    planName: "Premium Setup",
    description: "Bulletproof setup for serious advertisers scaling campaigns.",
    price: "$650",
    ctaLabel: "Scale Now",
    ctaHref: "/talk-to-sales",
    ctaVariant: "primary",
    features: [
      { iconSrc: "/foreplay/BM.svg", label: "1x BM5 Verified: $250 spending limit", available: true },
      { iconSrc: "/foreplay/BM.svg", label: "1x BM3 Verified: Business Manager with 3 ad account slots", available: true },
      { iconSrc: "/foreplay/PROFILES.svg", label: "4x Premium Profiles: High-trust profiles ready for advertising", available: true },
      { iconSrc: "/foreplay/PAGES.svg", label: "3x Aged Reinstated Pages: Established pages for campaign stability", available: true },
      { label: "14-Day Warranty: Replacement for profile issues", available: true },
    ],
  },
  {
    planName: "Elite Setup",
    description: "Bulletproof setup for agencies and high-volume advertisers.",
    price: "$890",
    ctaLabel: "Go Elite",
    ctaHref: "/talk-to-sales",
    ctaVariant: "secondary",
    features: [
      { iconSrc: "/foreplay/BM.svg", label: "2x BM5 Verified: $250 spending limit each", available: true },
      { iconSrc: "/foreplay/PROFILES.svg", label: "6x Premium Profiles: High-trust profiles ready for advertising", available: true },
      { iconSrc: "/foreplay/PAGES.svg", label: "3x Aged Reinstated Pages: Established pages for campaign stability", available: true },
      { iconSrc: "/foreplay/PAGES.svg", label: "1x 10,000 Followers Page: Aged reinstated page with established audience", available: true },
      { label: "14-Day Warranty: Replacement for profile issues", available: true },
    ],
  },
]
