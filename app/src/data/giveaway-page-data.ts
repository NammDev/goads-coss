// Single source of truth for the /giveaway route (Foreplay MCP UI clone).
// Swap `giveawayLinks` when the real Telegram / Discord invites land — one place.

export const giveawayLinks = {
  telegram: "#", // TODO: real Telegram invite URL
  discord: "#", // TODO: real Discord invite URL
} as const

// Hero — .api-hero-content (tag pill + h1 + subtitle + 2 CTAs)
export const giveawayHero = {
  tag: "🎁 GIVEAWAY",
  // 2-line headline (\n rendered via whitespace-pre-line in the hero). The "200"
  // emphasis lives in the subtitle + progress bar.
  title: "Claim Your Free\nAged Facebook Page",
  subtitle:
    "Grab one of 200 premium aged Facebook Pages, created 2021 to 2023 and fully reinstated. Worth $35 each ($7,000 total), free for the first 200 to claim.",
  primaryCta: { label: "Join Telegram", href: giveawayLinks.telegram },
  secondaryCta: { label: "Join Discord", href: giveawayLinks.discord },
} as const

// 3-step claim grid (.mcp-steps-grid). `chip.kind` drives chip rendering.
export const giveawayClaimSteps = [
  {
    number: "1",
    title: "Follow Telegram",
    body: "Join our Telegram channel to get the giveaway link.",
    chip: { kind: "link", label: "Open Telegram", href: giveawayLinks.telegram },
  },
  {
    number: "2",
    title: "Join Discord",
    body: "Hop into the Discord server and head to #giveaway.",
    chip: { kind: "link", label: "Open Discord", href: giveawayLinks.discord },
  },
  {
    number: "3",
    title: 'DM us "FREE PAGE"',
    body: "Send us the keyword to claim your aged page.",
    chip: { kind: "copy", label: "FREE PAGE", copyText: "FREE PAGE" },
  },
] as const

export const giveawayUrgency = "First 200 only."

// Deterministic auto-increment counter (no backend). count = min(cap, base +
// floor(elapsedHoursSinceStart * ratePerHour)). Tune ratePerHour to the real
// giveaway window so it reaches ~cap by close (see plan Unresolved Q2).
export const giveawayProgress = {
  base: 47,
  startISO: "2026-06-16T00:00:00Z",
  ratePerHour: 1,
  cap: 200,
} as const

// 4 alternating feature rows (.lens-gamification-grid). reverse:true → image-first.
export const giveawayFeatureRows = [
  {
    overline: "Aged & Reinstated",
    title: "Trusted, Reinstated Facebook Pages",
    description:
      "Each page is aged and reinstated — ready to run ads without the cold-start penalty.",
    imageSrc: "/assets/giveaway/row-1.png",
    imageAlt: "Aged reinstated Facebook page",
    cta: { label: "Join Telegram", href: giveawayLinks.telegram },
    reverse: false,
  },
  {
    overline: "Created 2021–2023",
    title: "Real History, Real Age",
    description:
      "Pages created between 2021 and 2023 — genuine account history, not freshly spun up.",
    imageSrc: "/assets/giveaway/row-2.png",
    imageAlt: "Page creation history",
    cta: { label: "Join Discord", href: giveawayLinks.discord },
    reverse: true,
  },
  {
    overline: "$35 Value Each",
    title: "$7,000 Total Given Away",
    description:
      "200 pages worth $35 each — completely free for the first 200 claimers.",
    imageSrc: "/assets/giveaway/row-3.png",
    imageAlt: "Giveaway value breakdown",
    cta: { label: "Join Telegram", href: giveawayLinks.telegram },
    reverse: false,
  },
  {
    overline: "First 200 Only",
    title: "Limited & First-Come",
    description:
      "Once 200 pages are claimed, the giveaway closes. Don't miss your slot.",
    imageSrc: "/assets/giveaway/row-4.png",
    imageAlt: "Limited slots remaining",
    cta: { label: "Join Discord", href: giveawayLinks.discord },
    reverse: true,
  },
] as const

// Sitewide announcement bar (above the header). Links to the giveaway route.
export const giveawayBanner = {
  text: "🎁 Giveaway: 200 free aged Facebook Pages worth $7,000.",
  cta: "Claim yours",
  href: "/giveaway",
} as const

// FAQ — reuses ProductPageFaqAccordion (subtitle defaults to "FAQ").
export const giveawayFaq = {
  title: "Giveaway questions answered",
  description:
    "Everything you need to know about claiming one of the 200 free aged Facebook Pages.",
  items: [
    {
      question: "What exactly am I getting?",
      answer:
        "One premium aged Facebook Page created between 2021 and 2023, fully reinstated and ready to run ads. Each page is valued at $35, and we are giving away 200 of them ($7,000 total) completely free.",
    },
    {
      question: "How do I claim a free page?",
      answer:
        "Follow our Telegram channel, join the Discord server, then send us the keyword FREE PAGE. Our team confirms your slot and hands over a page while stock lasts.",
    },
    {
      question: "What does aged reinstated mean?",
      answer:
        "The page was created years ago, built real history, and was previously restricted before being fully restored by Meta. That aged trust clears ad review faster than a brand new page.",
    },
    {
      question: "How many pages can I claim?",
      answer:
        "One page per person. The giveaway is limited to the first 200 people, so claim early before the slots run out.",
    },
    {
      question: "Is it really free? Any catch?",
      answer:
        "Yes, completely free. No payment, no deposit. We run this drop to introduce new advertisers to GoAds and our wider catalog of accounts and services.",
    },
    {
      question: "What happens after all 200 are claimed?",
      answer:
        "The giveaway closes once the counter reaches 200. Stay in our Telegram and Discord to catch the next drop and member only deals.",
    },
  ],
}

// Final CTA (reuses HomeCta with giveaway copy, single button).
export const giveawayFinalCta = {
  title: "Claim your free aged Facebook page now",
  description: "First 200 only — join Telegram and DM us the keyword to claim.",
  primaryLabel: "Join Telegram",
  primaryHref: giveawayLinks.telegram,
} as const
