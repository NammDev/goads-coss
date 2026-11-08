// GoAds product catalog data — feeds into PricingComparison (same layout, different data)
// 3-col mode: col1=name, col2=basic(Price), col3=workflow(Action)
// agency/enterprise unused in 3-col but kept for 5-col compatibility

import type { ComparisonCategory, ComparisonHeaderColumn } from "@/components/pricing/comparison-table"

export const catalogHeaderColumns: ComparisonHeaderColumn[] = [
  { name: "Price", cta: "", href: "" },
  { name: "Action", cta: "", href: "" },
]

// Default order: Profiles first (for /profiles route). Other routes reorder via slice/spread.
export const catalogCategories: ComparisonCategory[] = [
  {
    name: "Facebook Profiles",
    icon: "/assets/PROFILES.webp",
    features: [
      { name: "Premium Profile (Farmed, Clean History)", basic: "$50", workflow: "Add to Cart", agency: "7 days", enterprise: "Add to Cart" },
      { name: "Premium Super Aged Profile (Farmed, Clean History)", basic: "$80", workflow: "Add to Cart", agency: "7 days", enterprise: "Add to Cart" },
      { name: "Instagram Profile (Farmed, Clean History)", basic: "$50", workflow: "Add to Cart", agency: "7 days", enterprise: "Add to Cart", hasInstagramBadge: true },
    ],
  },
  {
    name: "Business Manager",
    icon: "/assets/BM.webp",
    features: [
      { name: "BM5 Super Aged (Unlimited DSL)", basic: "$390", workflow: "Add to Cart", agency: "7 days", enterprise: "Add to Cart" },
      { name: "BM10 Verified (Unlimited DSL)", basic: "$790", workflow: "Add to Cart", agency: "7 days", enterprise: "Add to Cart" },
      { name: "BM50", basic: false, workflow: "Contact", agency: "7 days", enterprise: "Contact" },
    ],
  },
  {
    name: "Agency Ad Account",
    icon: "/assets/META.webp",
    features: [
      { name: "Ad Account (Unlimited DSL)", basic: "$250", workflow: "Add to Cart", agency: "7 days", enterprise: "Add to Cart" },
    ],
  },
  {
    name: "Facebook Pages",
    icon: "/navbar/pages.webp",
    features: [
      { name: "Aged Reinstated Facebook Page", basic: "$35", workflow: "Add to Cart", agency: "7 days", enterprise: "Add to Cart" },
      { name: "1K–3K Follower Facebook Page", basic: "$45", workflow: "Add to Cart", agency: "7 days", enterprise: "Add to Cart" },
      { name: "5K Follower Facebook Page", basic: "$65", workflow: "Add to Cart", agency: "7 days", enterprise: "Add to Cart" },
      { name: "10K Follower Facebook Page", basic: "$110", workflow: "Add to Cart", agency: "7 days", enterprise: "Add to Cart" },
      { name: "Livestream Ads Ready Page", basic: "$200", workflow: "Add to Cart", agency: "7 days", enterprise: "Add to Cart" },
      { name: "Verified Page (Blue Badge)", basic: "$600", workflow: "Contact", agency: "7 days", enterprise: "Contact", hasVerifiedBadge: true },
    ],
  },
  {
    name: "TikTok Assets",
    icon: "/navbar/tiktok.webp",
    features: [
      { name: "Fresh TikTok Channel (0 Followers)", basic: "$60", workflow: "Add to Cart", agency: "7 days", enterprise: "Add to Cart" },
      { name: "TikTok Shop Info USA", basic: "$80", workflow: "Add to Cart", agency: "7 days", enterprise: "Add to Cart" },
      { name: "TikTok Ads Business Account", basic: "$120", workflow: "Add to Cart", agency: "7 days", enterprise: "Add to Cart" },
      { name: "TikTok Affiliate (1K+ Followers)", basic: "$180", workflow: "Add to Cart", agency: "7 days", enterprise: "Add to Cart" },
      { name: "TikTok Shop USA (Jumio Verified)", basic: "$400", workflow: "Contact", agency: "7 days", enterprise: "Contact" },
      { name: "TikTok BC30 Verified (30 Warmed-Up Ad Accounts)", basic: "$590", workflow: "Add to Cart", agency: "7 days", enterprise: "Add to Cart" },
    ],
  },
  {
    name: "Other Service",
    features: [
      { name: "Unban Service", basic: false, workflow: "Contact", agency: "7 days", enterprise: "Contact" },
      { name: "BM Verification Service", basic: "$100", workflow: "Add to Cart", agency: "7 days", enterprise: "Add to Cart", hasVerifiedBadge: true },
      { name: "Verification Badge (Facebook Page)", basic: "$600", workflow: "Add to Cart", agency: "7 days", enterprise: "Add to Cart", hasVerifiedBadge: true },
      { name: "Verification Badge (Instagram)", basic: "$600", workflow: "Add to Cart", agency: "7 days", enterprise: "Add to Cart", hasVerifiedBadge: true },
      { name: "Verification Badge (TikTok)", basic: false, workflow: "Contact", agency: "7 days", enterprise: "Contact", hasVerifiedBadge: true },
      { name: "SMM (Boost Likes, Followers, Comments)", basic: false, workflow: "Contact", agency: "7 days", enterprise: "Contact" },
    ],
  },
]
