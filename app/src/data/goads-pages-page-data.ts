// GoAds /pages page data — hero, feature grids, testimonials, FAQ
// Mirrors goads-bm-page-data.ts shape; copy is Facebook Pages-specific.
// All asset paths (images, videos, SVG decorations) are kept 1:1 with the rest of the product pages.

// Product CTA Card — uses shared GoAds verified-panda mark (cross-route).
// ForeplayProductPageCtaCard renders the icon on desktop (right-anchored, 280px)
// AND tablet/mobile (centered, 300/256px) when videoSrc is absent.
export const pagesProductCta = {
  title: "Start running with verified Pages today",
  description:
    "Every Facebook Page ships pre-warmed, policy-clean and backed by a 7-day warranty.\n\nFrom aged Pages to monetized 10K-follower assets — pick the trust score that fits your campaigns.",
  iconSrc: "/foreplay/cta/goads-verified-panda.svg",
  iconAlt: "GoAds panda mascot with verified badge",
}

// Section 1: Hero — text-only variant (laptop preview + CTA removed).
// Bottom padding switches to --fp-py-section scale (108/96/80) in ForeplayProductHero.
export const pagesHero = {
  iconSrc: "/foreplay/PAGES.svg",
  overline: "Facebook Pages",
  title: "Buy Aged Facebook Pages",
  description:
    "Pre-warmed Pages with real history and clean policy records. Skip the new-Page penalty — start advertising from a brand asset Meta already trusts.",
  hideCta: true,
}

// Section 3 (feature grid 1): All Products — Pages card moved to slot 1
export const pagesFeatureGrid1 = {
  subtitle: "ALL PRODUCTS",
  title: "Everything You Need to Scale",
  description:
    "From warmed-up Pages to recovery services. Built for advertisers who refuse to start every campaign from a fresh-Page disadvantage.",
  // Illustrations pending — cards render "coming soon" placeholder until final artwork ships.
  cards: [
    { title: "Facebook Pages", description: "Aged, 1K–10K follower, livestream-ready or monetized — pick the trust score that matches your spend." },
    { title: "Facebook Profiles", description: "Aged, ID-verified profiles to pair with your Page. Clean history, ready to run." },
    { title: "Business Manager", description: "BM1 to BM2500, all Meta-verified. Add your Page, share assets, scale safely." },
    { title: "Verified Badge", description: "Blue tick for Pages and Instagram. Instant credibility boost on the assets you already run." },
    { title: "Unban Service", description: "Page restricted? Ads paused? We recover the asset so you keep the audience." },
    { title: "Free Tools", description: "BM Invite, Cookie Login, 2FA Generator. Free utilities for media buyers." },
  ],
}

// Section 4 (testimonial 1): Stefan M.
export const pagesFeatureGrid1Testimonial = {
  logoSrc: "/foreplay/testimonial1_logo.webp",
  logoAlt: "GoAds client",
  quote:
    "Fresh Pages used to die in 48 hours — couldn't get past learning phase. Switched to GoAds aged Pages, every campaign clears review on the first try. Three months, zero restrictions.",
  authorName: "Stefan M.",
  authorRole: "Agency Owner, Germany",
  authorImageSrc: "/foreplay/testimonial1_founder.webp",
  decorationLeftSrc: "/foreplay/test_left.svg",
  decorationRightSrc: "/foreplay/test_right.svg",
}

// Section 5 (feature grid 2): Resources — illustrations pending, "coming soon" placeholders for now.
export const pagesFeatureGrid2 = {
  cards: [
    { title: "Aged vs 1K vs 10K Pages: Which Should You Buy?", description: "Match Page follower count to your campaign type. A clear breakdown of who buys which tier." },
    { title: "Livestream Ads Ready Pages: When They Pay Off", description: "Break-even math for live shopping and video campaigns. When the livestream tier is worth it." },
    { title: "Why Aged Pages Survive Policy Review 3× Better", description: "The trust-score mechanics behind Page history and why fresh Pages get flagged on day one." },
    { title: "How to Assign a Purchased Page to Your BM", description: "Step-by-step workflow to add, share and run ads from a new Page without tripping policy flags." },
    { title: "Monetized Pages: Unlock Reels & Stars Revenue", description: "What monetization actually requires, and how a pre-qualified 10K Page shortcuts the wait." },
    { title: "Getting the Blue Tick on a 10K Follower Page", description: "Verification eligibility, documents you need, and timelines for the Meta verified badge." },
  ],
}

// Section 6 (testimonial 2): Ryan D.
export const pagesFeatureGrid2Testimonial = {
  logoSrc: "/foreplay/test_logo.jpg",
  logoAlt: "GoAds client",
  quote:
    "Bought a 5K aged Page on Monday, ran $400/day from it by Friday. Same supplier, same playbook for the last four months. One Page restricted — replaced in 30 minutes.",
  authorName: "Ryan D.",
  authorRole: "Media Buyer, US",
  authorImageSrc: "/foreplay/test_tim_keen_avatar.webp",
  decorationLeftSrc: "/foreplay/test_left.svg",
  decorationRightSrc: "/foreplay/test_right.svg",
}

// Section 7: FAQ (10 Pages-specific items)
export const pagesFaq = {
  title: "Questions about Facebook Pages?",
  description: "Most frequent questions about buying, warming up and scaling aged Facebook Pages.",
  items: [
    {
      question: "What is an aged Facebook Page?",
      answer:
        "A Page that has been active for at least 6 months with organic posts, profile fills and a real follower base. Aged Pages clear Meta's ad review faster and run higher spend without learning-phase penalties.",
    },
    {
      question: "Which Page tier should I buy?",
      answer:
        "Aged Reinstated for cold-traffic tests. 1K–3K Follower for direct-response campaigns. 5K–10K Follower for scaling and retargeting. Livestream Ads Ready for live-shopping. Monetized or Verified for brand and high-CPM creative.",
    },
    {
      question: "What's the difference between an aged Page and a verified Page?",
      answer:
        "Aged = trust score from history. Verified = the blue badge Meta awards after document review. You can buy a verified Page directly, or upgrade an aged Page once it qualifies for the badge.",
    },
    {
      question: "How long does a purchased Page last?",
      answer:
        "With clean creatives and a proper warmup, most clients keep the same Page running for 6+ months. Restrictions almost always come from creative policy violations, not the Page itself.",
    },
    {
      question: "What happens if my Page gets restricted?",
      answer:
        "Within the 7-day warranty, we replace it at no charge. After the warranty, we offer a same-day unban service or a discounted replacement Page.",
    },
    {
      question: "Can I link a purchased Page to my own Business Manager?",
      answer:
        "Yes. Every Page ships with full admin access — you can claim it under your BM, share access with team members, or run ads via a partner BM.",
    },
    {
      question: "Do I need to warm up the Page before running ads?",
      answer:
        "No, our aged Pages are already warmed (posts, comments, organic reach). For premium campaigns we still recommend 24–48 hours of light activity before pushing large budgets.",
    },
    {
      question: "Can I rebrand the Page (name, photo, category)?",
      answer:
        "Yes, but slowly. Change one element at a time over 1–2 weeks to avoid triggering Meta's anti-brand-flip filter. We include a rebrand checklist with every order.",
    },
    {
      question: "How are Pages delivered?",
      answer:
        "Usually within a few hours. Delivery includes Page admin access, cookies, recovery email, and full warmup history so you can verify what you bought.",
    },
    {
      question: "Do you offer bulk or enterprise pricing?",
      answer:
        "Yes. Agencies ordering 10+ Pages or buying Verified Pages in volume get tiered discounts. Contact sales for a custom quote.",
    },
  ],
}
