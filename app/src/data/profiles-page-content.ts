// GoAds /profiles page data — hero, products grid, testimonials, resources, FAQ

// Product CTA Card (same video/icon, only title + description differ)
export const profilesProductCta = {
  title: "Start scaling with stable profiles today",
  description: "Every Facebook profile ships ID-verified, pre-warmed and backed by a 7-day warranty.\n\nSkip the disable loop, run ads without interruption.",
  iconSrc: "/assets/cta/verified-panda.svg",
  iconAlt: "GOADS panda mascot with verified badge",
}

// Section 1: Hero — text-only variant (laptop preview + CTA removed).
// Bottom padding switches to --py-section scale (108/96/80) in ProductHero.
export const profilesHero = {
  iconSrc: "/assets/PROFILES.webp",
  overline: "Facebook Profiles",
  title: "Buy Aged Facebook Profiles",
  description: "Run ads without interruptions. Pre-tested, ID-verified, and backed by warranty. The foundation every serious advertiser needs.",
  hideCta: true,
}

// Section 5-8: Feature Grids + Testimonials (keep all images/logos, only text changes)
// Section 3 (feature grid 1): All Products — uses bento1 images
export const profilesFeatureGrid1 = {
  subtitle: "ALL PRODUCTS",
  title: "Everything You Need to Scale",
  description: "From stable assets to recovery services. Built for advertisers who need reliability.",
  cards: [

    { imageSrc: "/profiles/all-products/Business%20Manager.webp", title: "Business Manager", description: "Verified BM1 to BM5. The foundation for serious ad operations." },
    { imageSrc: "/profiles/all-products/Facebook%20Pages.webp", title: "Facebook Pages", description: "Aged pages with followers. Ready to run ads and build trust." },
    { imageSrc: "/profiles/all-products/Unban%20Service.webp", title: "Unban Service", description: "Profile, Page, Ad Account, BM. We bring them back to life." },
    { imageSrc: "/profiles/all-products/Verified%20Badge.webp", title: "Verified Badge", description: "Blue tick for Pages and Instagram. Instant credibility boost." },
    { imageSrc: "/profiles/all-products/TikTok%20Assets.webp", title: "TikTok Assets", description: "Accounts, Shops, Business Centers. Scale on the fastest-growing platform." },
    { imageSrc: "/profiles/all-products/Free%20Tools.svg", title: "Free Tools", description: "BM Invite, Cookie Login, 2FA Generator and more. Built to save you time." },
  ],
}

// Section 4 (testimonial 1): Stefan M.
export const profilesFeatureGrid1Testimonial = {
  quote: "Telegram sellers nearly killed my business. Constant bans, zero support. Switched to GOADS, haven't looked back. Profiles run, support replies, life is good.",
  authorName: "Elena Vasquez",
  authorRole: "Agency Owner, Vasquez Growth",
  authorImageSrc: "/assets/testimonials/t05.webp",
  decorationLeftSrc: "/assets/test_left.svg",
  decorationRightSrc: "/assets/test_right.svg",
}

// Section 5 (feature grid 2): Resources — uses bento2 images
export const profilesFeatureGrid2 = {
  cards: [
    { imageSrc: "/profiles/features/How%20to%20Warm%20Up%20Facebook%20Profiles.svg", title: "How to Warm Up Facebook Profiles", description: "Step-by-step guide to prepare your profile before running ads. Avoid checkpoints from day one." },
    { imageSrc: "/profiles/features/BM1%20vs%20BM5%20Which%20One%20Do%20You%20Need.webp", title: "BM1 vs BM5: Which One Do You Need?", description: "Breaking down the differences. Find the right Business Manager for your ad spend level." },
    { imageSrc: "/profiles/features/Why%20Your%20Ad%20Account%20Keeps%20Getting%20Banned.webp", title: "Why Your Ad Account Keeps Getting Banned", description: "Common mistakes that trigger Meta's algorithm. And how to avoid them." },
    { imageSrc: "/profiles/features/Aged%20Profiles%20vs%20Fresh%20Accounts.webp", title: "Aged Profiles vs Fresh Accounts", description: "Why aged profiles survive longer. The science behind account trust scores." },
    { imageSrc: "/profiles/features/How%20to%20Bypass%20Facebook%20Verification.webp", title: "How to Bypass Facebook Verification", description: "Stuck on selfie or ID verification? Here's what actually works." },
    { imageSrc: "/profiles/features/Facebook%20Ads%20in%202026%20What_s%20Changed.webp", title: "Facebook Ads in 2026: What's Changed", description: "Platform updates, policy shifts, and what it means for advertisers this year." },
  ],
}

// Section 6 (testimonial 2): Ryan D.
export const profilesFeatureGrid2Testimonial = {
  quote: "Bought 20 profiles over 3 months. Only 1 needed replacement and they handled it in under an hour. That's the service I pay for.",
  authorName: "Mateo Romero",
  authorRole: "Media Buyer, Romero Media",
  authorImageSrc: "/assets/testimonials/t03.webp",
  decorationLeftSrc: "/assets/test_left.svg",
  decorationRightSrc: "/assets/test_right.svg",
}

// Section 3: All Products (6 cards)
export const profilesProductsSection = {
  subtitle: "ALL PRODUCTS",
  title: "Everything You Need to Scale",
  description: "From stable assets to recovery services. Built for advertisers who need reliability.",
}

export const profilesProductCards = [
  {
    title: "Business Manager",
    description: "Verified BM1 to BM5. The foundation for serious ad operations.",
    ctaLabel: "Learn More",
    href: "/bm",
  },
  {
    title: "Facebook Pages",
    description: "Aged pages with followers. Ready to run ads and build trust.",
    ctaLabel: "Learn More",
    href: "/pages",
  },
  {
    title: "Unban Service",
    description: "Profile, Page, Ad Account, BM. We bring them back to life.",
    ctaLabel: "Learn More",
    href: "/unban",
  },
  {
    title: "Verified Badge",
    description: "Blue tick for Pages and Instagram. Instant credibility boost.",
    ctaLabel: "Learn More",
    href: "/blue-verification",
  },
  {
    title: "TikTok Assets",
    description: "Accounts, Shops, Business Centers. Scale on the fastest-growing platform.",
    ctaLabel: "Learn More",
    href: "/tiktok-accounts",
  },
  {
    title: "Free Tools",
    description: "BM Invite, Cookie Login, 2FA Generator and more. Built to save you time.",
    ctaLabel: "Explore Tools",
    href: "/tools",
  },
]

// Section 4: Testimonial 1
export const profilesTestimonial1 = {
  quote: "Telegram sellers nearly killed my business. Constant bans, zero support. Switched to GOADS, haven't looked back. Profiles run, support replies, life is good.",
  authorName: "Stefan M.",
  authorRole: "Agency Owner, Germany",
  authorImageSrc: "/assets/testimonial1_founder.webp",
  decorationLeftSrc: "/assets/test_left.svg",
  decorationRightSrc: "/assets/test_right.svg",
}

// Section 5: Resources (6 blog cards)
export const profilesResourcesSection = {
  subtitle: "RESOURCES",
  title: "Learn From the Experts",
  description: "Guides, tips, and insights to help you run ads smarter. Fresh content from the GOADS team.",
}

export const profilesResourceCards = [
  {
    imageSrc: "/profiles/features/How%20to%20Warm%20Up%20Facebook%20Profiles.svg",
    title: "How to Warm Up Facebook Profiles",
    description: "Step-by-step guide to prepare your profile before running ads. Avoid checkpoints from day one.",
  },
  {
    imageSrc: "/profiles/features/BM1%20vs%20BM5%20Which%20One%20Do%20You%20Need.webp",
    title: "BM1 vs BM5: Which One Do You Need?",
    description: "Breaking down the differences. Find the right Business Manager for your ad spend level.",
  },
  {
    imageSrc: "/profiles/features/Why%20Your%20Ad%20Account%20Keeps%20Getting%20Banned.webp",
    title: "Why Your Ad Account Keeps Getting Banned",
    description: "Common mistakes that trigger Meta's algorithm. And how to avoid them.",
  },
  {
    imageSrc: "/profiles/features/Aged%20Profiles%20vs%20Fresh%20Accounts.webp",
    title: "Aged Profiles vs Fresh Accounts",
    description: "Why aged profiles survive longer. The science behind account trust scores.",
  },
  {
    imageSrc: "/profiles/features/How%20to%20Bypass%20Facebook%20Verification.webp",
    title: "How to Bypass Facebook Verification",
    description: "Stuck on selfie or ID verification? Here's what actually works.",
  },
  {
    imageSrc: "/profiles/features/Facebook%20Ads%20in%202026%20What_s%20Changed.webp",
    title: "Facebook Ads in 2026: What's Changed",
    description: "Platform updates, policy shifts, and what it means for advertisers this year.",
  },
]

// Section 6: Testimonial 2
export const profilesTestimonial2 = {
  quote: "Bought 20 profiles over 3 months. Only 1 needed replacement and they handled it in under an hour. That's the service I pay for.",
  authorName: "Ryan D.",
  authorRole: "Media Buyer, US",
  authorImageSrc: "/assets/test_tim_keen_avatar.webp",
  decorationLeftSrc: "/assets/test_left.svg",
  decorationRightSrc: "/assets/test_right.svg",
}

// Section 7: FAQ (10 items)
export const profilesFaq = {
  title: "Questions about Facebook Profiles?",
  description: "Most frequent questions about buying and using aged profiles.",
  items: [
    { question: "What is a reinstated profile?", answer: "A profile that was disabled by Meta, then recovered using ID verification. This process makes it more trusted by Meta's system." },
    { question: "How long do profiles last?", answer: "With proper warmup and clean campaigns, most profiles run stable for months or longer. Some clients use the same profile for 6+ months." },
    { question: "What if my profile gets banned?", answer: "If it happens within the warranty period, we replace it instantly. No questions asked." },
    { question: "Do I need to verify anything myself?", answer: "No. All profiles are already ID-verified before delivery. Just login and start." },
    { question: "Asia or USA profile - which should I choose?", answer: "Asia for global campaigns and best value. USA for targeting US/EU markets with higher trust scores." },
    { question: "How do I login to the profile?", answer: "We provide cookies for instant login. Just import to your browser and you're in. Full guide included." },
    { question: "Can I change the profile password and email?", answer: "Yes. We recommend spacing out security changes over a few days to keep it natural." },
    { question: "How should I warm up my profile?", answer: "Light browsing for 1-2 days before adding to BM. We include a full warmup guide with every order." },
    { question: "What's included with each profile?", answer: "Login credentials, cookies, recovery email access, setup guide, and 7-day warranty." },
    { question: "Do you offer bulk pricing?", answer: "Yes. Contact us directly for volume discounts on 10+ profiles." },
  ],
}
