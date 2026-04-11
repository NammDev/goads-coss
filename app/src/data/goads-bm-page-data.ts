// GoAds /bm page data — hero, feature grids, testimonials, FAQ
// Identical shape to goads-profiles-page-data.ts; only TEXT differs.
// All asset paths (images, videos, SVG decorations) are kept 1:1.

// Product CTA Card (same video/icon, only title + description differ)
export const bmProductCta = {
  title: "Start scaling with a verified BM today",
  description: "Every Business Manager ships Meta-verified, configured and backed by a 7-day warranty.\n\nFrom BM1 to BM2500 — pick the DSL that fits your spend.",
  videoSrc: "/video/cta-swipe-file.mov",
  iconSrc: "/foreplay/hero2_icon.webp",
  iconAlt: "isometric business manager icon",
}

// Section 1: Hero (reuses swipe-file icon/video/preview assets, only text changes)
export const bmHero = {
  iconSrc: "/foreplay/hero2_icon.webp",
  iconVideoSrc: "/foreplay/hero2_video.webm",
  overline: "Business Managers",
  title: "Buy Verified Meta Business Managers",
  description: "BM1 to BM2500, verified by Meta, ready to run high-budget ads. Skip the disabled-account loop — start with a BM your auction actually trusts.",
  previewImageSrc: "/foreplay/hero2_laptop.webp",
  previewVideoSrc: "/video/62a4ed18ddad95dde8b8bfa4_6833876c700d2cc61b273644_home-video-transcode.mp4",
  ctaLabel: "Get Started",
  ctaHref: "/talk-to-sales",
}

// Section 3 (feature grid 1): All Products — uses bento1 images
// BM card moved to slot 1, other 5 cards follow in similar order.
export const bmFeatureGrid1 = {
  subtitle: "ALL PRODUCTS",
  title: "Everything You Need to Scale",
  description: "From verified BMs to recovery services. Built for advertisers who refuse to babysit disabled accounts.",
  cards: [
    { imageSrc: "/foreplay/bento1_1.webp", title: "Business Manager", description: "BM1, BM3, BM5, BM10 — all Meta-verified. Pick the DSL that fits your spend." },
    { imageSrc: "/foreplay/bento1_2.webp", title: "Facebook Profiles", description: "Aged, ID-verified profiles to pair with your BM. Clean history, ready to run." },
    { imageSrc: "/foreplay/bento1_3.webp", title: "Unban Service", description: "BM banned? Ad account disabled? We recover the asset so you keep the pixel." },
    { imageSrc: "/foreplay/bento1_4.webp", title: "Verified Badge", description: "Blue tick for Pages and Instagram. Instant credibility boost on your BM assets." },
    { imageSrc: "/foreplay/bento1_5.webp", title: "TikTok Assets", description: "Accounts, Shops, Business Centers. Diversify beyond Meta without the disable risk." },
    { imageSrc: "/foreplay/bento1_6.webp", title: "Free Tools", description: "BM Invite, Cookie Login, 2FA Generator. Free utilities for media buyers." },
  ],
}

// Section 4 (testimonial 1): Stefan M.
export const bmFeatureGrid1Testimonial = {
  logoSrc: "/foreplay/testimonial1_logo.webp",
  logoAlt: "GoAds client",
  quote: "Lost two BM5s in a week last quarter — Telegram sellers, zero replacement. Switched to GoAds, bought a BM10 Unlimited DSL, been live 4 months straight. Support replies in minutes.",
  authorName: "Stefan M.",
  authorRole: "Agency Owner, Germany",
  authorImageSrc: "/foreplay/testimonial1_founder.webp",
  decorationLeftSrc: "/foreplay/test_left.svg",
  decorationRightSrc: "/foreplay/test_right.svg",
}

// Section 5 (feature grid 2): Resources — uses bento2 images
export const bmFeatureGrid2 = {
  cards: [
    { imageSrc: "/foreplay/bento2_1.png", title: "BM1 vs BM3 vs BM5: Which Do You Need?", description: "Match the ad account count to your spend. A clear breakdown of who buys which tier." },
    { imageSrc: "/foreplay/bento2_2.webp", title: "Unlimited DSL vs $250 DSL: Real-World Cost", description: "Break-even math for scaling campaigns. When the premium tier actually pays off." },
    { imageSrc: "/foreplay/bento2_3.webp", title: "Why Verified BMs Survive 10× Longer", description: "The trust-score mechanics behind Meta's verification and why it matters for disables." },
    { imageSrc: "/foreplay/bento2_4.webp", title: "How to Add Ad Accounts to a Verified BM", description: "Step-by-step workflow to add, share and assign accounts without tripping policy flags." },
    { imageSrc: "/foreplay/bento2_5.webp", title: "BM10, BM50, BM100: Enterprise Scaling Guide", description: "When to graduate from BM5 to multi-account enterprise structures. Agency playbook." },
    { imageSrc: "/foreplay/bento2_6.webp", title: "WhatsApp Business API Setup on a Verified BM", description: "Connect WABA, pick your messaging tier, and start conversational ads — in under an hour." },
  ],
}

// Section 6 (testimonial 2): Ryan D.
export const bmFeatureGrid2Testimonial = {
  logoSrc: "/foreplay/test_logo.jpg",
  logoAlt: "GoAds client",
  quote: "Started with a BM3, moved to BM5 Unlimited DSL after two weeks, now running a BM10. Same supplier, same playbook. Zero bans, one replacement in 4 months — handled in 40 minutes.",
  authorName: "Ryan D.",
  authorRole: "Media Buyer, US",
  authorImageSrc: "/foreplay/test_tim_keen_avatar.webp",
  decorationLeftSrc: "/foreplay/test_left.svg",
  decorationRightSrc: "/foreplay/test_right.svg",
}

// Section 7: FAQ (10 BM-specific items)
export const bmFaq = {
  title: "Questions about Business Managers?",
  description: "Most frequent questions about buying, using and scaling verified Meta Business Managers.",
  items: [
    { question: "What is a verified Business Manager?", answer: "A BM that has passed Meta's Business Verification flow (legal entity + domain + documents). Verified status unlocks higher ad account caps, WhatsApp API access and better trust with Meta's review system." },
    { question: "Which BM tier should I buy?", answer: "BM1 for solo buyers or testing. BM3 for small teams running 2–3 campaigns in parallel. BM5 for scaling agencies. BM10+ for enterprise operations with multiple clients or geographies." },
    { question: "What does DSL mean and which limit do I need?", answer: "DSL = Daily Spend Limit per ad account. $250 DSL is fine for most direct-response campaigns. Choose Unlimited DSL if you plan to scale a single account past $250/day or run high-CPM brand campaigns." },
    { question: "How long does a verified BM last?", answer: "With clean creatives and a proper warmup, most clients run the same verified BM for 6+ months. Disables mostly come from policy violations, not from the BM itself." },
    { question: "What happens if my BM gets disabled?", answer: "Within the 7-day warranty, we replace it at no charge — instantly. After the warranty, we offer a same-day unban service or a discounted replacement." },
    { question: "Can I add my own ad accounts to a purchased BM?", answer: "Yes. Every verified BM ships with the full admin access you need to create or link ad accounts, share assets, and assign team roles." },
    { question: "Do I need a separate profile to manage the BM?", answer: "You can use your own profile, but we strongly recommend pairing the BM with an aged GoAds profile to avoid a fresh-account trust penalty on first login." },
    { question: "What about WhatsApp Business API?", answer: "We sell verified BMs pre-configured with WABA — choose between a 2K or 10K messaging limit. Scale up anytime by re-verifying with Meta." },
    { question: "How are BMs delivered?", answer: "Usually within a few hours. Delivery includes BM ID, admin credentials, access cookies, setup instructions and any WABA keys if applicable." },
    { question: "Do you offer bulk or enterprise pricing?", answer: "Yes. Agencies running 10+ BMs or enterprise clients ordering BM50/BM100/BM2500 get tiered discounts. Contact sales for a custom quote." },
  ],
}
