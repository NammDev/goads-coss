// GoAds /tiktok-accounts page data — hero, feature grids, testimonials, FAQ
// Identical shape to goads-profiles-page-data.ts; only TEXT differs.
// All asset paths (images, videos, SVG decorations) are kept 1:1.

// Product CTA Card (same video/icon, only title + description differ)
export const tiktokProductCta = {
  title: "Start scaling on TikTok today",
  description: "Every TikTok asset ships Jumio-verified, policy-clean and backed by a 7-day warranty.\n\nChannels, Shops and Business Centers — live on day one.",
  videoSrc: "/video/cta-swipe-file.mov",
  iconSrc: "/foreplay/hero2_icon.webp",
  iconAlt: "isometric tiktok asset icon",
}

// Section 1: Hero (reuses swipe-file icon/video/preview assets, only text changes)
export const tiktokHero = {
  iconSrc: "/foreplay/hero2_icon.webp",
  iconVideoSrc: "/foreplay/hero2_video.webm",
  overline: "TikTok Assets",
  title: "Buy Verified TikTok Accounts & Shops",
  description: "TikTok Channels, Shops and Business Centers — Jumio-verified and ready to scale. The fastest-growing ad platform, without the account suspension loop.",
  previewImageSrc: "/foreplay/hero2_laptop.webp",
  previewVideoSrc: "/video/62a4ed18ddad95dde8b8bfa4_6833876c700d2cc61b273644_home-video-transcode.mp4",
  ctaLabel: "Get Started",
  ctaHref: "/talk-to-sales",
}

// Section 3 (feature grid 1): All Products — uses bento1 images
// TikTok card moved to slot 1; other 5 follow.
export const tiktokFeatureGrid1 = {
  subtitle: "ALL PRODUCTS",
  title: "Everything You Need to Scale on TikTok",
  description: "Channels, Shops, Business Centers. Built for media buyers who want TikTok reach without the verification headaches.",
  cards: [
    { imageSrc: "/foreplay/bento1_1.webp", title: "TikTok Assets", description: "Channels, Shops, Business Centers. Jumio-verified, ready to publish on day one." },
    { imageSrc: "/foreplay/bento1_2.webp", title: "Business Manager", description: "Verified Meta BMs to pair with TikTok campaigns — cross-platform scaling." },
    { imageSrc: "/foreplay/bento1_3.webp", title: "Unban Service", description: "TikTok account suspended? We recover the asset so you keep the GMV history." },
    { imageSrc: "/foreplay/bento1_4.webp", title: "Facebook Pages", description: "Aged pages with followers, ready to mirror your TikTok creative strategy." },
    { imageSrc: "/foreplay/bento1_5.webp", title: "Verified Badge", description: "Blue tick for Pages and Instagram. Instant credibility across your ad stack." },
    { imageSrc: "/foreplay/bento1_6.webp", title: "Free Tools", description: "2FA Generator, Cookie Login and more. Free utilities for TikTok media buyers." },
  ],
}

// Section 4 (testimonial 1): Stefan M.
export const tiktokFeatureGrid1Testimonial = {
  logoSrc: "/foreplay/testimonial1_logo.webp",
  logoAlt: "GoAds client",
  quote: "TikTok Shop USA is a nightmare to verify yourself. Bought three Jumio-verified Shops from GoAds, all live inside 24 hours, GMV scaling weekly. Worth every dollar.",
  authorName: "Stefan M.",
  authorRole: "Agency Owner, Germany",
  authorImageSrc: "/foreplay/testimonial1_founder.webp",
  decorationLeftSrc: "/foreplay/test_left.svg",
  decorationRightSrc: "/foreplay/test_right.svg",
}

// Section 5 (feature grid 2): Resources — uses bento2 images
export const tiktokFeatureGrid2 = {
  cards: [
    { imageSrc: "/foreplay/bento2_1.png", title: "How to Warm Up a TikTok Business Account", description: "Step-by-step warmup so your account doesn't flag on the first campaign. Avoid the cold-start penalty." },
    { imageSrc: "/foreplay/bento2_2.webp", title: "TikTok Shop USA vs Global: What's Different", description: "KYC, Jumio, tax docs, payout flows. The full breakdown for sellers picking a region." },
    { imageSrc: "/foreplay/bento2_3.webp", title: "Why Your TikTok Ads Account Keeps Getting Banned", description: "Common trigger patterns that burn fresh accounts. How to stay inside policy." },
    { imageSrc: "/foreplay/bento2_4.webp", title: "Jumio-Verified TikTok Shops: What You Get", description: "Why a Jumio-verified Shop outperforms a fresh one — trust score, approval rate, GMV." },
    { imageSrc: "/foreplay/bento2_5.webp", title: "TikTok Business Center: The Setup Guide", description: "Structure your accounts, pixels and catalogs the right way from day one." },
    { imageSrc: "/foreplay/bento2_6.webp", title: "TikTok Ads in 2026: What's Changed", description: "Platform updates, Spark Ads, Shop Ads and what it means for media buyers this year." },
  ],
}

// Section 6 (testimonial 2): Ryan D.
export const tiktokFeatureGrid2Testimonial = {
  logoSrc: "/foreplay/test_logo.jpg",
  logoAlt: "GoAds client",
  quote: "Ran 8 TikTok Shops in 3 months. Only 1 got flagged and they replaced it inside an hour. Support was in Telegram before I finished typing the ticket.",
  authorName: "Ryan D.",
  authorRole: "Media Buyer, US",
  authorImageSrc: "/foreplay/test_tim_keen_avatar.webp",
  decorationLeftSrc: "/foreplay/test_left.svg",
  decorationRightSrc: "/foreplay/test_right.svg",
}

// Section 7: FAQ (10 TikTok-specific items)
export const tiktokFaq = {
  title: "Questions about TikTok Assets?",
  description: "Most frequent questions about buying, using and scaling TikTok Channels, Shops and Business Centers.",
  items: [
    { question: "What TikTok assets do you sell?", answer: "Fresh TikTok Channels, Ads Business Accounts, TikTok Shop Info (USA), Affiliate accounts with follower counts, and fully Jumio-verified TikTok Shops USA." },
    { question: "What does Jumio-verified mean?", answer: "Jumio is TikTok's KYC partner. A Jumio-verified Shop has completed full identity + business verification, so you skip the weeks-long approval loop and start listing products immediately." },
    { question: "Can I run ads right after delivery?", answer: "Yes. Our TikTok Ads Business Accounts ship with a pixel slot, clean policy history and a light warmup already done. Add your creative and launch." },
    { question: "How long do TikTok accounts last?", answer: "With a proper warmup and clean creative, most clients run the same channel or shop for 3–6 months. Suspensions come from policy hits, not the account itself." },
    { question: "What if my TikTok account gets suspended?", answer: "Within the 7-day warranty, we replace it at no charge. After warranty, we offer a paid unban service or a discounted replacement." },
    { question: "Do TikTok Shops work outside the US?", answer: "TikTok Shop is region-locked. Our USA Shops target US customers; for other regions, contact sales — we handle UK, SEA and EU on request." },
    { question: "Can I change the password and email after purchase?", answer: "Yes. We recommend spacing security changes out over a few days and logging in from a stable IP/device to stay under the fraud-detection radar." },
    { question: "How are TikTok assets delivered?", answer: "Usually within a few hours. Delivery includes login credentials, cookies, recovery email, Jumio/KYC status (if applicable) and a warmup guide." },
    { question: "Do I need a Business Center?", answer: "If you run more than one TikTok Ads account or Shop, yes. We sell BCs separately or bundled with multi-asset orders — contact sales for combos." },
    { question: "Do you offer bulk pricing?", answer: "Yes. Agencies and DTC brands ordering 5+ TikTok assets get tiered discounts. Contact us for a custom quote." },
  ],
}
