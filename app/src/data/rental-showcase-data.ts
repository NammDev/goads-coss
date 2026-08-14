// Meta Asset Rental — showcase sections for /rental.
//
// Structure, imagery and component set are lifted wholesale from
// /agency-ad-account: use-case carousel → core-feature tabs → feature grids +
// testimonials → CTA card. Only the COPY is rewritten.
//
// WHY the copy could not come across verbatim: the agency page sells a % of ad
// spend on an agency-owned account, the rental page sells a monthly stack. The
// original wording carries a $10K/month spend minimum, provider-side top-ups
// and an open-ended fee — all three contradict the plan table in
// rental-page-data.ts, which is transcribed from the client's spec. Anything
// priced here is derived from that file rather than retyped.
//
// Images are REFERENCED from /public/agency-ad-account/, not copied: same
// files, one source of truth. Paths keep the %20 encoding of the on-disk names.
//
// Two titles diverge from the agency page because the rental product differs,
// and both images carry no baked-in label so the swap is safe:
//   "Dedicated Meta Rep"  → "24/7 Telegram Support"  (rental support channel)
//   "Instant Top-Up"      → "Add Your Own Card"      (customer's card, not ours)

import { LOWEST_MONTHLY_FEE, formatMonthlyFee } from "@/data/rental-page-data"

// --- Use Cases ---
export const rentalUseCases = {
  subtitle: "Use Cases",
  title: "Built for high-spend advertisers",
  description:
    "Whether you're scaling DTC, running a client book, or advertising in a restricted vertical, a rented stack gives you the headroom without the upfront build.",
  cards: [
    {
      imageSrc: "/agency-ad-account/use-cases/DTC%20SCALING.webp",
      imageAlt: "DTC brand scaling Meta ads on a rented stack",
      title: "DTC Scaling",
      description:
        "Move from $10K to $100K+ a day on a Diamond stack with no daily ceiling, and keep the card rewards on every dollar you push.",
    },
    {
      imageSrc: "/agency-ad-account/use-cases/agency%20book%20management.webp",
      imageAlt: "agency managing multi-client Meta campaigns on rented stacks",
      title: "Agency Book Management",
      description:
        "Rent a separate stack per client instead of risking one Business Manager across the whole book. Same-day replacement covers every asset you run.",
    },
    {
      imageSrc: "/agency-ad-account/use-cases/Restricted%20Niches.webp",
      imageAlt: "restricted niche campaigns on a high-risk rental plan",
      title: "Restricted Niches",
      description:
        "Crypto, nutra, finance and dating run on the High-risk track, with profiles aged 2 to 7 years and reinstated pages already in the plan.",
    },
  ],
}

// --- Core Features Tabs ---
// No description: the three tabs below spell the same thing out with a visual
// each, so a paragraph here only delayed reaching them.
export const rentalCoreFeaturesSection = {
  subtitle: "Core Features",
  title: "How renting a stack works",
}

export const rentalCoreFeatureTabs = [
  {
    // Image carries a baked-in "Whitelist Onboarding" pill — label must match it.
    label: "Whitelist Onboarding",
    imageSrc: "/agency-ad-account/core-features/WHITELIST%20ONBOARDING.webp",
    imageAlt: "rented stack handed over ready to launch",
  },
  {
    // Baked-in "Unlimited Daily Spend" pill — same constraint.
    label: "Unlimited Daily Spend",
    imageSrc: "/agency-ad-account/core-features/UNLIMITED%20DAILY%20SPEND.webp",
    imageAlt: "ad account running without a daily spend ceiling",
  },
  {
    label: "24/7 Telegram Support",
    imageSrc: "/agency-ad-account/core-features/DIRCT%20META%20REP.webp",
    imageAlt: "support chat resolving a disabled account",
  },
]

// --- Feature Grid (first set) ---
// No description: twelve cards follow, each with its own sentence.
export const rentalFeatureGrid1 = {
  subtitle: "All Features",
  title: "Everything the monthly fee covers",
  cards: [
    {
      imageSrc: "/agency-ad-account/all-features/Whitelisted%20Status.webp",
      title: "Whitelisted Status",
      description: "A verified Business Manager on every tier, so campaigns clear review instead of queueing.",
    },
    {
      imageSrc: "/agency-ad-account/all-features/Unlimited%20Daily%20Spend%20(2).svg",
      title: "Unlimited Daily Spend",
      description: "The Diamond tier ships a BM with no daily ceiling. Scale a winner to whatever the auction will take.",
    },
    {
      imageSrc: "/agency-ad-account/all-features/dedicated%20meta%20rep.webp",
      title: "24/7 Telegram Support",
      description: "A real person on Telegram at any hour, priority queue on Diamond. No ticket forms.",
    },
    {
      imageSrc: "/agency-ad-account/all-features/Restricted%20Niche%20Access.webp",
      title: "Restricted Niche Access",
      description: "The High-risk track runs categories a standard BM gets banned for: crypto, nutra, finance.",
    },
    {
      imageSrc: "/agency-ad-account/all-features/Priority%20Policy%20Review.svg",
      title: "Priority Policy Review",
      description: "Ads reviewed by humans, not just the algorithm. Faster approvals on the assets you rent.",
    },
    {
      imageSrc: "/agency-ad-account/all-features/Instant%20Top-Up.svg",
      title: "Add Your Own Card",
      description: "Your card stays attached to the ad accounts, so cashback and points on ad spend stay with you.",
    },
  ],
}

// --- Testimonial 1 ---
export const rentalTestimonial1 = {
  quote:
    "We were burning a Business Manager every couple of weeks trying to hold $30K a day. On a rented Diamond stack we've had four replacements in three months, and not one of them cost us a campaign day.",
  authorName: "James Carter",
  authorRole: "Performance Director, NovaPeak Commerce",
  authorImageSrc: "/assets/testimonials/t08.webp",
  decorationLeftSrc: "/assets/test_left.svg",
  decorationRightSrc: "/assets/test_right.svg",
}

// --- Feature Grid (second set) ---
export const rentalFeatureGrid2 = {
  cards: [
    {
      imageSrc: "/agency-ad-account/all-features/Compliance%20Pre-Review.webp",
      title: "Compliance Pre-Review",
      description: "We check the landing page before submission, which is why most rented accounts never see a review queue.",
    },
    {
      imageSrc: "/agency-ad-account/all-features/Multi-Account%20Structure.webp",
      title: "Multi-Account Structure",
      description: "Run a stack per client or per offer, isolated, so one flag never takes the whole book down.",
    },
    {
      imageSrc: "/agency-ad-account/all-features/Transparent%20Fee%20Model.svg",
      title: "Transparent Fee Model",
      description: "One monthly fee plus a flat spend fee, 1% on Standard. No setup fee, no replacement fee.",
    },
    {
      imageSrc: "/agency-ad-account/all-features/Pixel%20Continuity.svg",
      title: "Pixel Continuity",
      description: "Keep your pixel events and custom audiences when an asset is swapped, so the learning phase survives.",
    },
    {
      imageSrc: "/agency-ad-account/all-features/Fast%20Replacement%20SLA.webp",
      title: "Unlimited Replacement",
      description: "Any asset in the plan, replaced the same business day, as many times as it happens, on both tracks.",
    },
    {
      imageSrc: "/agency-ad-account/all-features/Unified%20Billing.webp",
      title: "Unified Billing",
      description: "The whole stack on one monthly line you raise when spend grows and drop when it doesn't.",
    },
  ],
}

// --- Testimonial 2 ---
export const rentalTestimonial2 = {
  quote:
    "Moved the whole affiliate book onto rented stacks. One monthly line per client, replacements handled the same day, and we stopped tying up capital in assets Meta can take away overnight.",
  authorName: "Daniel Brooks",
  authorRole: "Founder, BrightScale Media",
  authorImageSrc: "/assets/testimonials/t10.webp",
  decorationLeftSrc: "/assets/test_left.svg",
  decorationRightSrc: "/assets/test_right.svg",
}

// --- Product CTA ---
// Entry price is derived from the plan table so it can't drift out of sync.
export const rentalProductCta = {
  title: "Rent your first stack this week",
  description: `Business Manager, ad accounts, profiles and pages, assembled and connected, from ${formatMonthlyFee(LOWEST_MONTHLY_FEE)} a month with unlimited same-day replacement on every asset.`,
  iconSrc: "/assets/cta/verified-panda.svg",
  iconAlt: "GOADS panda mascot with verified badge",
}
