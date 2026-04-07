// GoAds product catalog data — feeds into ForeplayPricingComparison (same layout, different data)
// 3-col mode: col1=name, col2=basic(Price), col3=workflow(Action)
// agency/enterprise unused in 3-col but kept for 5-col compatibility

import type { ComparisonCategory, ComparisonHeaderColumn } from "@/components/foreplay/foreplay-pricing-comparison-table"

export const catalogHeaderColumns: ComparisonHeaderColumn[] = [
  { name: "Price", cta: "", href: "" },
  { name: "Action", cta: "", href: "" },
]

// Default order: Profiles first (for /profiles route). Other routes reorder via slice/spread.
export const catalogCategories: ComparisonCategory[] = [
  {
    name: "Facebook Profiles",
    features: [
      { name: "Facebook Profiles", basic: false, workflow: false, agency: false, enterprise: false, isProduct: true, productHref: "/profiles", productIcon: "/foreplay/footer_4.webp", subtitle: "Aged, verified, ready to scale" },
      { name: "Asia Reinstated Aged Profile", basic: "$30", workflow: "Add to Cart", agency: "7 days", enterprise: "Add to Cart" },
      { name: "USA Reinstated Aged Profile", basic: "$40", workflow: "Add to Cart", agency: "7 days", enterprise: "Add to Cart", tooltip: "Higher trust score for US/EU targeting. Recommended for premium campaigns.", tooltipHref: "/profiles" },
      { name: "Premium Asia Reinstated Profile", basic: "$40", workflow: "Add to Cart", agency: "7 days", enterprise: "Add to Cart" },
      { name: "Premium USA Reinstated Profile", basic: "$50", workflow: "Add to Cart", agency: "7 days", enterprise: "Add to Cart" },
      { name: "Asia Super Aged (7+ Years) Double Reinstated", basic: "$95", workflow: "Add to Cart", agency: "7 days", enterprise: "Add to Cart" },
      { name: "USA Super Aged (7+ Years) Double Reinstated", basic: "$110", workflow: "Add to Cart", agency: "7 days", enterprise: "Add to Cart", hasCrown: true },
    ],
  },
  {
    name: "Business Manager",
    features: [
      { name: "BM1 Verified", basic: "$80", workflow: "Add to Cart", agency: "7 days", enterprise: "Add to Cart" },
      { name: "BM3 Verified", basic: "$180", workflow: "Add to Cart", agency: "7 days", enterprise: "Add to Cart" },
      { name: "BM5 Verified ($250 DSL)", basic: "$320", workflow: "Add to Cart", agency: "7 days", enterprise: "Add to Cart" },
      { name: "BM5 Verified (Unlimited DSL)", basic: "$390", workflow: "Add to Cart", agency: "7 days", enterprise: "Add to Cart" },
      { name: "BM10 Verified ($250 DSL)", basic: false, workflow: "Contact", agency: "7 days", enterprise: "Contact" },
      { name: "BM10 Verified (Unlimited DSL)", basic: false, workflow: "Contact", agency: "7 days", enterprise: "Contact" },
      { name: "BM50", basic: false, workflow: "Contact", agency: "7 days", enterprise: "Contact" },
      { name: "BM100", basic: false, workflow: "Contact", agency: "7 days", enterprise: "Contact" },
      { name: "BM2500", basic: false, workflow: "Contact", agency: "7 days", enterprise: "Contact" },
      { name: "BM + WhatsApp API (2K limit)", basic: "$280", workflow: "Add to Cart", agency: "7 days", enterprise: "Add to Cart" },
      { name: "BM + WhatsApp API (10K limit)", basic: "$1,400", workflow: "Add to Cart", agency: "7 days", enterprise: "Add to Cart" },
    ],
  },
  {
    name: "Facebook Pages",
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
    features: [
      { name: "Fresh TikTok Channel (0 Followers)", basic: "$60", workflow: "Add to Cart", agency: "7 days", enterprise: "Add to Cart" },
      { name: "TikTok Shop Info USA", basic: "$80", workflow: "Add to Cart", agency: "7 days", enterprise: "Add to Cart" },
      { name: "TikTok Ads Business Account", basic: "$120", workflow: "Add to Cart", agency: "7 days", enterprise: "Add to Cart" },
      { name: "TikTok Affiliate (1K+ Followers)", basic: "$180", workflow: "Add to Cart", agency: "7 days", enterprise: "Add to Cart" },
      { name: "TikTok Shop USA (Jumio Verified)", basic: "$400", workflow: "Contact", agency: "7 days", enterprise: "Contact" },
    ],
  },
]
