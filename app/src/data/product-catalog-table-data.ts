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
      { name: "Premium Asia Reinstated Profile", basic: "$40", workflow: "Add to Cart", agency: "7 days", enterprise: "Add to Cart" },
      { name: "Premium USA Reinstated Profile", basic: "$50", workflow: "Add to Cart", agency: "7 days", enterprise: "Add to Cart" },
      { name: "Asia Super Aged Double Reinstated (7+ Years)", basic: "$95", workflow: "Add to Cart", agency: "7 days", enterprise: "Add to Cart" },
      { name: "USA Super Aged Double Reinstated (7+ Years)", basic: "$110", workflow: "Add to Cart", agency: "7 days", enterprise: "Add to Cart" },
      { name: "Instagram Account (Real Followers)", basic: false, workflow: "Contact", agency: "7 days", enterprise: "Contact" },
    ],
  },
  {
    name: "Business Manager",
    icon: "/assets/BM.webp",
    features: [
      { name: "BM1 Verified", basic: "$80", workflow: "Add to Cart", agency: "7 days", enterprise: "Add to Cart" },
      { name: "BM3 Verified", basic: "$180", workflow: "Add to Cart", agency: "7 days", enterprise: "Add to Cart" },
      { name: "BM5 Verified ($250 DSL)", basic: "$340", workflow: "Add to Cart", agency: "7 days", enterprise: "Add to Cart" },
      { name: "BM5 Verified (Unlimited DSL)", basic: "$390", workflow: "Add to Cart", agency: "7 days", enterprise: "Add to Cart" },
      { name: "BM3 WABA 250 limit (WhatsApp API)", basic: "$150", workflow: "Add to Cart", agency: "7 days", enterprise: "Add to Cart" },
      { name: "BM10 Verified (Unlimited DSL)", basic: "$999", workflow: "Add to Cart", agency: "7 days", enterprise: "Add to Cart" },
      { name: "BM50", basic: false, workflow: "Contact", agency: "7 days", enterprise: "Contact" },
      { name: "BM100", basic: false, workflow: "Contact", agency: "7 days", enterprise: "Contact" },
      { name: "BM2500", basic: false, workflow: "Contact", agency: "7 days", enterprise: "Contact" },
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
      { name: "Monetized Page (10K Followers)", basic: "$300", workflow: "Add to Cart", agency: "7 days", enterprise: "Add to Cart" },
      { name: "Verified Page (Blue Badge)", basic: "$600", workflow: "Contact", agency: "7 days", enterprise: "Contact" },
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
    ],
  },
  {
    name: "Other Service",
    features: [
      { name: "Unban Service", basic: false, workflow: "Contact", agency: "7 days", enterprise: "Contact" },
      { name: "BM Verification Service", basic: "$100", workflow: "Add to Cart", agency: "7 days", enterprise: "Add to Cart" },
      { name: "Verification Badge (Facebook Page)", basic: "$600", workflow: "Add to Cart", agency: "7 days", enterprise: "Add to Cart" },
      { name: "Verification Badge (Instagram)", basic: "$600", workflow: "Add to Cart", agency: "7 days", enterprise: "Add to Cart" },
      { name: "Verification Badge (TikTok)", basic: false, workflow: "Contact", agency: "7 days", enterprise: "Contact" },
      { name: "SMM (Boost Likes, Followers, Comments)", basic: false, workflow: "Contact", agency: "7 days", enterprise: "Contact" },
    ],
  },
]
