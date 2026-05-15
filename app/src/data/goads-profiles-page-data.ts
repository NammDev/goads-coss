// GoAds /profiles page data — hero, products grid, testimonials, resources, FAQ

// Product CTA Card (same video/icon, only title + description differ)
export const profilesProductCta = {
  title: "Start scaling with stable profiles today",
  description: "Every Facebook profile ships ID-verified, pre-warmed and backed by a 7-day warranty.\n\nSkip the disable loop — run ads without interruption.",
  iconSrc: "/foreplay/cta/goads-verified-panda.svg",
  iconAlt: "GoAds panda mascot with verified badge",
}

// Section 1: Hero — text-only variant (laptop preview + CTA removed).
// Bottom padding switches to --fp-py-section scale (108/96/80) in ForeplayProductHero.
export const profilesHero = {
  iconSrc: "/foreplay/PROFILES.svg",
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

    { imageSrc: "/foreplay/profiles/Group%201016.svg", title: "Business Manager", description: "Verified BM1 to BM5. The foundation for serious ad operations." },
    { imageSrc: "/foreplay/profiles/Group%201013.svg", title: "Facebook Pages", description: "Aged pages with followers. Ready to run ads and build trust." },
    { imageSrc: "/foreplay/profiles/Group%201015.svg", title: "Unban Service", description: "Profile, Page, Ad Account, BM. We bring them back to life." },
    { imageSrc: "/foreplay/profiles/Group%201017.svg", title: "Verified Badge", description: "Blue tick for Pages and Instagram. Instant credibility boost." },
    { imageSrc: "/foreplay/profiles/Group%201019.svg", title: "TikTok Assets", description: "Accounts, Shops, Business Centers. Scale on the fastest-growing platform." },
    { imageSrc: "/foreplay/profiles/Group%201021.svg", title: "Free Tools", description: "BM Invite, Cookie Login, 2FA Generator and more. Built to save you time." },
  ],
}

// Section 4 (testimonial 1): Stefan M.
export const profilesFeatureGrid1Testimonial = {
  logoSrc: "/foreplay/testimonial1_logo.webp",
  logoAlt: "GoAds client",
  quote: "Telegram sellers nearly killed my business. Constant bans, zero support. Switched to GoAds, haven't looked back. Profiles run, support replies, life is good.",
  authorName: "Stefan M.",
  authorRole: "Agency Owner, Germany",
  authorImageSrc: "/foreplay/testimonial1_founder.webp",
  decorationLeftSrc: "/foreplay/test_left.svg",
  decorationRightSrc: "/foreplay/test_right.svg",
}

// Section 5 (feature grid 2): Resources — uses bento2 images
export const profilesFeatureGrid2 = {
  cards: [
    { imageSrc: "/foreplay/profiles/Group%20896.svg", title: "How to Warm Up Facebook Profiles", description: "Step-by-step guide to prepare your profile before running ads. Avoid checkpoints from day one." },
    { imageSrc: "/foreplay/profiles/Group%20950.svg", title: "BM1 vs BM5: Which One Do You Need?", description: "Breaking down the differences. Find the right Business Manager for your ad spend level." },
    { imageSrc: "/foreplay/profiles/Group%20957.svg", title: "Why Your Ad Account Keeps Getting Banned", description: "Common mistakes that trigger Meta's algorithm. And how to avoid them." },
    { imageSrc: "/foreplay/profiles/Group%20958.svg", title: "Aged Profiles vs Fresh Accounts", description: "Why aged profiles survive longer. The science behind account trust scores." },
    { imageSrc: "/foreplay/profiles/Group%20960.svg", title: "How to Bypass Facebook Verification", description: "Stuck on selfie or ID verification? Here's what actually works." },
    { imageSrc: "/foreplay/profiles/Group%20964.svg", title: "Facebook Ads in 2026: What's Changed", description: "Platform updates, policy shifts, and what it means for advertisers this year." },
  ],
}

// Section 6 (testimonial 2): Ryan D.
export const profilesFeatureGrid2Testimonial = {
  logoSrc: "/foreplay/test_logo.jpg",
  logoAlt: "GoAds client",
  quote: "Bought 20 profiles over 3 months. Only 1 needed replacement and they handled it in under an hour. That's the service I pay for.",
  authorName: "Ryan D.",
  authorRole: "Media Buyer, US",
  authorImageSrc: "/foreplay/test_tim_keen_avatar.webp",
  decorationLeftSrc: "/foreplay/test_left.svg",
  decorationRightSrc: "/foreplay/test_right.svg",
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
  logoSrc: "/foreplay/testimonial1_logo.webp",
  logoAlt: "GoAds client",
  quote: "Telegram sellers nearly killed my business. Constant bans, zero support. Switched to GoAds, haven't looked back. Profiles run, support replies, life is good.",
  authorName: "Stefan M.",
  authorRole: "Agency Owner, Germany",
  authorImageSrc: "/foreplay/testimonial1_founder.webp",
  decorationLeftSrc: "/foreplay/test_left.svg",
  decorationRightSrc: "/foreplay/test_right.svg",
}

// Section 5: Resources (6 blog cards)
export const profilesResourcesSection = {
  subtitle: "RESOURCES",
  title: "Learn From the Experts",
  description: "Guides, tips, and insights to help you run ads smarter. Fresh content from the GoAds team.",
}

export const profilesResourceCards = [
  {
    imageSrc: "/images/placeholder.webp",
    title: "How to Warm Up Facebook Profiles",
    description: "Step-by-step guide to prepare your profile before running ads. Avoid checkpoints from day one.",
  },
  {
    imageSrc: "/images/placeholder.webp",
    title: "BM1 vs BM5: Which One Do You Need?",
    description: "Breaking down the differences. Find the right Business Manager for your ad spend level.",
  },
  {
    imageSrc: "/images/placeholder.webp",
    title: "Why Your Ad Account Keeps Getting Banned",
    description: "Common mistakes that trigger Meta's algorithm. And how to avoid them.",
  },
  {
    imageSrc: "/images/placeholder.webp",
    title: "Aged Profiles vs Fresh Accounts",
    description: "Why aged profiles survive longer. The science behind account trust scores.",
  },
  {
    imageSrc: "/images/placeholder.webp",
    title: "How to Bypass Facebook Verification",
    description: "Stuck on selfie or ID verification? Here's what actually works.",
  },
  {
    imageSrc: "/images/placeholder.webp",
    title: "Facebook Ads in 2026: What's Changed",
    description: "Platform updates, policy shifts, and what it means for advertisers this year.",
  },
]

// Section 6: Testimonial 2
export const profilesTestimonial2 = {
  logoSrc: "/foreplay/test_logo.jpg",
  logoAlt: "GoAds client",
  quote: "Bought 20 profiles over 3 months. Only 1 needed replacement and they handled it in under an hour. That's the service I pay for.",
  authorName: "Ryan D.",
  authorRole: "Media Buyer, US",
  authorImageSrc: "/foreplay/test_tim_keen_avatar.webp",
  decorationLeftSrc: "/foreplay/test_left.svg",
  decorationRightSrc: "/foreplay/test_right.svg",
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
