// GoAds /blue-verification page data — hero, feature rows, examples section, FAQ
// Mirrors /unban data structure. Asset paths reused 1:1 — only TEXT differs.

import type { FeatureRowData } from "@/data/foreplay-university-classes-page-data"

// ── Hero (no badge, no carousel — title + bg image only) ──
export const blueVerificationHero = {
  title: "Get verified across Facebook & Instagram",
  bgImage: "/foreplay/university_bghero.png",
}

// ── Feature Rows (2 rows: brand authority + multi-platform) ──
export const blueVerificationFeatureRows: FeatureRowData[] = [
  {
    title: "The blue badge changes how customers see you",
    description:
      "Verified accounts earn up to 30% more engagement on average. The blue check tells your audience you're the real brand — not a competitor, not an impersonator.\n\nBeyond credibility, verification unlocks priority support, account protection and impersonation-removal tools that unverified accounts never see.\n\nWe've taken accounts from unverified to verified on both Facebook and Instagram — at every business size.",
    image: "/foreplay/goads/goads-blue-verification-badge.webp",
    imageAlt: "Verified Instagram profile with a large blue checkmark, by GoAds",
    imageMaxWidth: 840, // +50% larger than the default 560
    reversed: false,
  },
  {
    title: "Verified on every platform your customers follow you",
    description:
      "Your audience doesn't separate Facebook from Instagram — they expect the badge on every profile. One unverified handle breaks trust across both.\n\nWe handle both platforms end-to-end. Single point of contact, official Meta channels only, predictable timelines on every submission.",
    image: "/foreplay/goads/goads-blue-verification-multiplatform.webp",
    imageAlt: "Verified Facebook Page with a blue checkmark on iPhone, by GoAds",
    imageMaxWidth: 840, // match image 1 size
    reversed: true,
    ctaLabel: "Contact us now",
    ctaHref: "/book-demo",
  },
]

// ── FAQ ──
export const blueVerificationFaq = {
  subtitle: "FAQ",
  title: "Questions about Blue Verification?",
  description:
    "Most frequent questions about our blue badge verification service for Facebook and Instagram.",
  items: [
    {
      question: "How long does verification take?",
      answer:
        "Most verifications complete in just 2 days. Timeline can vary slightly based on Meta review queue and account eligibility.",
    },
    {
      question: "What platforms do you verify?",
      answer:
        "We currently verify Facebook and Instagram accounts only. Both submissions go through official Meta channels.",
    },
    {
      question: "Do you guarantee verification?",
      answer:
        "We have a 98%+ approval rate. If verification is denied, we offer a full refund or reattempt at no extra cost.",
    },
    {
      question: "What do I need to provide?",
      answer:
        "Basic account info, proof of identity or business registration, and access to your account. We handle the rest.",
    },
    {
      question: "Is this official Meta verification?",
      answer:
        "Yes. We submit your application through official Meta channels. You get the real blue badge on your account — no third-party tricks.",
    },
  ],
}
