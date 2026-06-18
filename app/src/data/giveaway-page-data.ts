// Single source of truth for the /giveaway route (Foreplay MCP UI clone).
// Telegram / Discord point to the same channels as the footer social links.

import { CONTACT } from "@/data/contact-info"

export const giveawayLinks = {
  telegram: CONTACT.telegram.channel, // https://t.me/goadsagency
  discord: CONTACT.discord, // https://discord.gg/hhY5enS3zk
} as const

// Hero — BM-style product hero (big 3D gift icon + h1 + subtitle + 2 CTAs).
// Icon generated via Gemini Nano Banana Pro.
export const giveawayHero = {
  iconSrc: "/assets/giveaway/giveaway-gift-3d-v2.png",
  // 2-line headline (\n rendered via whitespace-pre-line in the hero).
  title: "Get a Free\nAged Facebook Page",
  subtitle:
    "200 premium aged Facebook Pages, created 2021 to 2023 and fully reinstated by Meta. Worth $35 each, yours completely free. Only the first 200 get one.",
  primaryCta: { label: "Join Telegram", href: giveawayLinks.telegram },
  secondaryCta: { label: "Join Discord", href: giveawayLinks.discord },
} as const

// 3-step claim flow — connected steps (numbered circle → icons → title → action).
// Step 1 offers BOTH channels (join either), step 2 copies the keyword, step 3
// shows an info pill (the result). `note` empty → no pill; `chips` empty → no button.
export const giveawayClaimSteps = [
  {
    number: "1",
    title: "Join our community",
    chips: [
      { kind: "link", label: "Telegram Channel", href: giveawayLinks.telegram },
      { kind: "link", label: "Discord Channel", href: giveawayLinks.discord },
    ],
    note: "",
  },
  {
    number: "2",
    title: "Message us the keyword",
    chips: [
      {
        kind: "copy",
        label: "GOADS GIVEAWAY - Free fanpage",
        copyText: "GOADS GIVEAWAY - Free fanpage",
      },
    ],
    note: "",
  },
  {
    number: "3",
    title: "Get your free page",
    chips: [],
    note: "Please share with your friends and network",
  },
] as const

// Heading for the claim-steps block (now in the white section under the hero).
export const giveawayClaimStepsHead = {
  subtitle: "HOW TO CLAIM",
  title: "Claim yours in 3 simple steps",
} as const

// 4 alternating feature rows (.lens-gamification-grid). reverse:true → image-first.
export const giveawayFeatureRows = [
  {
    overline: "Aged & Reinstated",
    title: "Pages that pass ad review",
    description:
      "Every page is aged and fully reinstated by Meta, so you can run ads from day one without cold-start limits or instant bans.",
    imageSrc: "/assets/giveaway/row-1-v5.png",
    imageAlt: "Aged reinstated Facebook page status",
    cta: { label: "Join Telegram", href: giveawayLinks.telegram },
    reverse: false,
  },
  {
    overline: "Created 2021 to 2023",
    title: "Real history, real trust",
    description:
      "Each page carries genuine activity from 2021 to 2023. That aged trust earns higher limits and smoother approvals than any fresh page.",
    imageSrc: "/assets/giveaway/row-2-v5.png",
    imageAlt: "Account history and follower growth",
    cta: { label: "Join Discord", href: giveawayLinks.discord },
    reverse: true,
  },
  {
    overline: "$35 Value Each",
    title: "$7,000 in pages, on us",
    description:
      "200 premium pages at $35 each, given away free. The same inventory we sell every day, yours at zero cost.",
    imageSrc: "/assets/giveaway/row-3-v5.png",
    imageAlt: "Giveaway value breakdown",
    cta: { label: "Join Telegram", href: giveawayLinks.telegram },
    reverse: false,
  },
  {
    overline: "First 200 Only",
    title: "Limited slots, first come first served",
    description:
      "The moment the 200th page is claimed, the drop closes for good. Join now to lock in your slot before it is gone.",
    imageSrc: "/assets/giveaway/row-4-v5.png",
    imageAlt: "Claim progress, 47 of 200 claimed",
    cta: { label: "Join Discord", href: giveawayLinks.discord },
    reverse: true,
  },
] as const

// Sitewide announcement bar (above the header). Links to the giveaway route.
// `highlight` is rendered in the amber accent to make the dollar value pop.
export const giveawayBanner = {
  text: "🎁 Giveaway: 200 free aged Facebook Pages worth ",
  highlight: "$7,000",
  cta: "Claim yours",
  href: "/giveaway",
} as const

// FAQ — reuses ProductPageFaqAccordion (subtitle defaults to "FAQ").
export const giveawayFaq = {
  title: "Giveaway questions answered",
  description:
    "Everything you need to know before you claim one of the 200 free aged Facebook Pages.",
  items: [
    {
      question: "What exactly do I get?",
      answer:
        "One premium aged Facebook Page, created between 2021 and 2023, fully reinstated by Meta and ready to run ads. Each page is worth $35, and we are giving away 200 of them ($7,000 total) for free.",
    },
    {
      question: "How do I claim my free page?",
      answer:
        'Join our Telegram and Discord, then DM us the keyword "GOADS GIVEAWAY - Free fanpage". Our team confirms your slot and hands over your page while stock lasts.',
    },
    {
      question: "What does aged and reinstated mean?",
      answer:
        "The page was created years ago and built real history, then was fully restored by Meta after a past restriction. That aged trust clears ad review faster than a brand new page.",
    },
    {
      question: "How many pages can I claim?",
      answer:
        "One page per person. The drop is capped at the first 200 people, so claim early before slots run out.",
    },
    {
      question: "Is it really free? Any catch?",
      answer:
        "Completely free. No payment, no deposit. We run this drop to introduce new advertisers to GOADS and our wider catalog of accounts and services.",
    },
    {
      question: "What happens after all 200 are claimed?",
      answer:
        "The giveaway closes the moment the 200th page is claimed. Stay in our Telegram and Discord to catch the next drop and members-only deals.",
    },
  ],
}

// Final CTA (reuses HomeCta with giveaway copy, single button).
export const giveawayFinalCta = {
  title: "Claim your free aged Facebook page",
  description: 'First 200 only. Join Telegram and DM us "GOADS GIVEAWAY - Free fanpage" to claim yours.',
  primaryLabel: "Join Telegram",
  primaryHref: giveawayLinks.telegram,
} as const
