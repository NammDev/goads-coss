export type BlogAuthor = {
  name: string
  avatar: string
  title?: string
  socials?: {
    website?: string
    linkedin?: string
    twitter?: string
    instagram?: string
    youtube?: string
    facebook?: string
    tiktok?: string
  }
}

export type BlogPost = {
  slug: string
  category: string
  categorySlug: string
  title: string
  description: string
  author: BlogAuthor
  date: string
  readTime: string
  coverImage: string
  featured?: boolean
  popular?: boolean
  sections: {
    id: string
    title: string
    content: string
  }[]
}

const goadsTeam: BlogAuthor = {
  name: "GoAds Team",
  avatar: "/avatars/goads-team.png",
  title: "Marketing Team",
  socials: {
    website: "https://goads.com",
    linkedin: "https://linkedin.com/company/goads",
    instagram: "https://instagram.com/goads",
  },
}

export const blogCategories = [
  "All",
  "Meta Ads",
  "Google Ads",
  "TikTok Ads",
  "Account Tips",
  "Scaling Strategy",
] as const

export type BlogCategory = (typeof blogCategories)[number]

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-scale-facebook-ads-with-agency-accounts",
    category: "Meta Ads",
    categorySlug: "meta-ads",
    title: "How to Scale Facebook Ads with Agency Accounts",
    description:
      "Learn how agency ad accounts can help you scale your Facebook campaigns without the risk of bans. Discover best practices for account structure, budget allocation, and creative testing.",
    author: goadsTeam,
    date: "March 5, 2026",
    readTime: "8 min read",
    coverImage: "/foreplay/blog/blog_1.png",
    featured: true,
    popular: true,
    sections: [
      {
        id: "why-agency-accounts",
        title: "Why Agency Accounts Matter",
        content: `<p>Agency ad accounts are the backbone of any serious Facebook advertising operation. Unlike personal ad accounts, agency accounts come with higher spending limits, better support, and most importantly — significantly lower ban rates.</p>
<p>When you're spending thousands of dollars per day on ads, the last thing you want is to wake up to a disabled account. Agency accounts provide the stability and trust that Meta's systems look for when evaluating advertiser quality.</p>`,
      },
      {
        id: "account-structure",
        title: "Optimal Account Structure",
        content: `<p>The key to scaling with agency accounts lies in proper structure. Here's what we recommend:</p>
<ul>
<li><strong>Separate accounts by offer</strong> — Each product or service should have its own ad account to isolate risk</li>
<li><strong>Warm up gradually</strong> — Start with $50-100/day and increase by 20% every 2-3 days</li>
<li><strong>Use multiple pixels</strong> — Distribute your tracking across accounts for redundancy</li>
</ul>
<p>This structure ensures that if one account faces issues, your entire operation doesn't come to a halt.</p>`,
      },
      {
        id: "budget-scaling",
        title: "Budget Scaling Strategies",
        content: `<p>Once your account structure is solid, it's time to scale your budgets. The most common mistake advertisers make is scaling too aggressively, which triggers Meta's automated review systems.</p>
<blockquote>"The advertisers who scale fastest are the ones who scale most patiently in the beginning."</blockquote>
<p>We recommend the following approach:</p>
<ul>
<li>Days 1-3: $50-100/day baseline spend</li>
<li>Days 4-7: Increase to $200-300/day</li>
<li>Week 2: Scale to $500-1000/day if metrics hold</li>
<li>Week 3+: Aggressive scaling with 20-30% daily increases</li>
</ul>
<p>Remember, patience in the first two weeks pays dividends in the months that follow.</p>`,
      },
    ],
  },
  {
    slug: "understanding-meta-business-manager-limits",
    category: "Account Tips",
    categorySlug: "account-tips",
    title:
      "Understanding Meta Business Manager Limits and How to Work Around Them",
    description:
      "A comprehensive guide to Meta Business Manager restrictions, spending limits, and how verified agency accounts provide higher thresholds for serious advertisers.",
    author: goadsTeam,
    date: "February 28, 2026",
    readTime: "12 min read",
    coverImage: "/foreplay/6952d2ca7adeb06040a5df45_discovery.png",
    popular: true,
    sections: [
      {
        id: "bm-limits-overview",
        title: "Business Manager Limits Overview",
        content: `<p>Meta Business Manager comes with several built-in limits that can restrict your advertising capabilities. Understanding these limits is the first step to working within — or around — them.</p>
<p>The most common limits include ad account creation caps, spending thresholds, and pixel limitations. Each of these can be a bottleneck for growing advertisers.</p>`,
      },
      {
        id: "spending-thresholds",
        title: "Spending Thresholds Explained",
        content: `<p>New Business Managers typically start with low spending limits — sometimes as low as $50/day. These limits increase over time based on account history, payment reliability, and ad quality.</p>
<p>Verified agency accounts bypass many of these restrictions, starting with significantly higher limits from day one. This is one of the primary reasons serious advertisers invest in agency infrastructure.</p>`,
      },
      {
        id: "best-practices",
        title: "Best Practices for BM Management",
        content: `<p>To maintain a healthy Business Manager and avoid restrictions:</p>
<ul>
<li>Keep your BM verified with up-to-date business documentation</li>
<li>Maintain a consistent payment history without chargebacks</li>
<li>Follow Meta's advertising policies strictly</li>
<li>Use 2FA on all admin accounts</li>
</ul>
<p>These practices not only prevent restrictions but also signal to Meta that you're a trustworthy advertiser.</p>`,
      },
    ],
  },
  {
    slug: "google-whitelisted-accounts-explained",
    category: "Google Ads",
    categorySlug: "google-ads",
    title:
      "Google Whitelisted Accounts Explained: What They Are and Why You Need One",
    description:
      "Explore the benefits of Google whitelisted ad accounts, including higher trust scores, fewer suspensions, and better ad delivery for competitive niches.",
    author: goadsTeam,
    date: "February 20, 2026",
    readTime: "10 min read",
    coverImage: "/foreplay/69419aba40b173a35f30c9ca_a.png",
    popular: true,
    sections: [
      {
        id: "what-is-whitelisted",
        title: "What Is a Whitelisted Account?",
        content: `<p>A Google whitelisted ad account is an account that has been pre-approved or given special trust status within Google's advertising ecosystem. These accounts enjoy benefits like reduced review times, higher spending limits, and fewer automated suspensions.</p>
<p>For advertisers in competitive niches like finance, health, or legal services, a whitelisted account can be the difference between a thriving campaign and constant account suspensions.</p>`,
      },
      {
        id: "benefits",
        title: "Key Benefits",
        content: `<p>The advantages of whitelisted accounts include:</p>
<ul>
<li><strong>Higher trust scores</strong> — Your ads are less likely to be flagged by automated systems</li>
<li><strong>Faster review times</strong> — New ads get approved in minutes instead of hours</li>
<li><strong>Better ad delivery</strong> — Higher quality scores lead to lower CPCs and better placements</li>
<li><strong>Fewer suspensions</strong> — Whitelisted accounts have significantly lower suspension rates</li>
</ul>`,
      },
      {
        id: "how-to-get-one",
        title: "How to Get a Whitelisted Account",
        content: `<p>Getting a whitelisted account typically requires working with an authorized Google partner or agency. At GoAds, we provide pre-verified whitelisted accounts that are ready to use from day one.</p>
<p>Our accounts come with a 7-day warranty and full support to ensure you can start advertising without delays.</p>`,
      },
    ],
  },
  {
    slug: "tiktok-ads-verified-accounts-guide",
    category: "TikTok Ads",
    categorySlug: "tiktok-ads",
    title: "Getting Started with TikTok Verified Ad Accounts",
    description:
      "Everything you need to know about TikTok verified agency accounts — from setup to scaling. Learn how to leverage TikTok's algorithm for maximum ROAS.",
    author: goadsTeam,
    date: "February 15, 2026",
    readTime: "9 min read",
    coverImage: "/foreplay/693c5f30484a0cd5f501cabf_das.png",
    popular: true,
    sections: [
      {
        id: "tiktok-opportunity",
        title: "The TikTok Advertising Opportunity",
        content: `<p>TikTok has rapidly become one of the most powerful advertising platforms, with lower CPMs than Facebook and Google in many markets. Verified agency accounts unlock the platform's full potential for serious advertisers.</p>`,
      },
      {
        id: "setup-guide",
        title: "Account Setup Guide",
        content: `<p>Setting up a TikTok verified ad account involves several steps:</p>
<ul>
<li>Business verification and documentation</li>
<li>Pixel installation and event configuration</li>
<li>Campaign structure setup</li>
<li>Creative asset preparation</li>
</ul>
<p>With a GoAds verified account, much of this process is streamlined — you'll receive a fully verified account ready for campaign launch.</p>`,
      },
      {
        id: "scaling-tiktok",
        title: "Scaling on TikTok",
        content: `<p>TikTok's algorithm rewards creative diversity and engagement. Unlike Facebook where you can scale a single winning ad for weeks, TikTok requires fresh creative every 5-7 days.</p>
<blockquote>"On TikTok, your creative IS your targeting."</blockquote>
<p>Focus on producing authentic, native-looking content that blends with organic TikTok videos. User-generated content style ads consistently outperform polished brand ads on the platform.</p>`,
      },
    ],
  },
  {
    slug: "avoid-facebook-ad-account-bans",
    category: "Meta Ads",
    categorySlug: "meta-ads",
    title: "7 Proven Strategies to Avoid Facebook Ad Account Bans",
    description:
      "Stop losing ad accounts. Learn the most common reasons for bans and actionable strategies to keep your accounts healthy and running.",
    author: goadsTeam,
    date: "February 8, 2026",
    readTime: "11 min read",
    coverImage: "/foreplay/69456cf1f1ab892ffc171ea0_lens.png",
    sections: [
      {
        id: "common-ban-reasons",
        title: "Common Reasons for Account Bans",
        content: `<p>Understanding why accounts get banned is the first step to prevention. The most common triggers include:</p>
<ul>
<li>Policy violations in ad copy or landing pages</li>
<li>Sudden spending spikes that trigger automated review</li>
<li>Using personal accounts for business advertising</li>
<li>Multiple rejected ads in a short period</li>
<li>Payment issues or chargebacks</li>
</ul>`,
      },
      {
        id: "prevention-strategies",
        title: "Prevention Strategies",
        content: `<p>Here are 7 proven strategies to keep your accounts healthy:</p>
<ul>
<li><strong>Use agency accounts</strong> — They have inherently higher trust levels</li>
<li><strong>Warm up gradually</strong> — Never jump from $0 to $1000/day overnight</li>
<li><strong>Review policies regularly</strong> — Meta updates its policies frequently</li>
<li><strong>Diversify your accounts</strong> — Don't put all your budget in one account</li>
<li><strong>Monitor ad quality scores</strong> — Low quality scores are an early warning sign</li>
<li><strong>Keep landing pages compliant</strong> — Your landing page matters as much as your ad</li>
<li><strong>Maintain clean payment methods</strong> — Use reliable payment sources without history of chargebacks</li>
</ul>`,
      },
      {
        id: "recovery-options",
        title: "What to Do If You Get Banned",
        content: `<p>If despite your best efforts an account gets banned, here's what to do:</p>
<p>First, don't panic. Submit an appeal through Meta's standard process. If the ban was a false positive, it's often resolved within 24-48 hours.</p>
<p>If the appeal fails, consider starting fresh with a new agency account from a trusted provider like GoAds. Our accounts come with a 7-day warranty specifically for situations like these.</p>`,
      },
    ],
  },
  // ─── Filler posts for pagination demo ─────────────────────────────────────
  {
    slug: "google-ads-quality-score-deep-dive",
    category: "Google Ads",
    categorySlug: "google-ads",
    title: "Google Ads Quality Score: A Deep Dive for 2026",
    description:
      "Quality Score quietly decides your CPCs. Here's how the three components actually weigh against each other and what to optimize first.",
    author: goadsTeam,
    date: "February 18, 2026",
    readTime: "9 min read",
    coverImage: "/foreplay/699c79256759e8e5e5d30ffa_Blog.png",
    sections: [
      {
        id: "the-three-pillars",
        title: "The Three Pillars",
        content: `<p>Expected CTR, ad relevance, and landing page experience. Each one is graded against your competitors in the same auction — not against an absolute scale.</p>`,
      },
    ],
  },
  {
    slug: "tiktok-spark-ads-vs-non-spark",
    category: "TikTok Ads",
    categorySlug: "tiktok-ads",
    title: "Spark Ads vs Non-Spark: Which Wins in 2026?",
    description:
      "Spark Ads borrow social proof from organic posts. We tested both at $30K/mo spend — here's what actually moved the needle.",
    author: goadsTeam,
    date: "February 12, 2026",
    readTime: "7 min read",
    coverImage: "/foreplay/blog/blog_2.webp",
    sections: [
      {
        id: "test-results",
        title: "Test Results",
        content: `<p>Spark Ads delivered 23% lower CPM but only when paired with a creator who already had organic traction. Cold creators showed no measurable lift.</p>`,
      },
    ],
  },
  {
    slug: "creative-fatigue-detection",
    category: "Scaling Strategy",
    categorySlug: "scaling-strategy",
    title: "Detecting Creative Fatigue Before It Tanks Your ROAS",
    description:
      "Frequency alone is a lagging indicator. These five signals catch fatigue 5-7 days earlier so you can rotate creatives before CPA spikes.",
    author: goadsTeam,
    date: "February 5, 2026",
    readTime: "6 min read",
    coverImage: "/foreplay/blog/blog_1.png",
    sections: [
      {
        id: "leading-indicators",
        title: "Leading Indicators",
        content: `<p>Watch for: declining 3s view rate, rising outbound CPC, falling thumbstop ratio, dropping ATC rate, and growing CPM variance across ad sets.</p>`,
      },
    ],
  },
  {
    slug: "ugc-vs-studio-creative",
    category: "Meta Ads",
    categorySlug: "meta-ads",
    title: "UGC vs Studio Creative: The 2026 Performance Data",
    description:
      "100 brands, 12 months of data. We compared raw UGC against high-production studio ads across cold and warm audiences.",
    author: goadsTeam,
    date: "January 28, 2026",
    readTime: "10 min read",
    coverImage: "/foreplay/blog/blog_2.webp",
    sections: [
      {
        id: "cold-vs-warm",
        title: "Cold vs Warm",
        content: `<p>UGC won 68% of cold prospecting tests. Studio creative won 71% of warm retargeting tests. The pattern was remarkably consistent across verticals.</p>`,
      },
    ],
  },
  {
    slug: "pixel-stacking-explained",
    category: "Account Tips",
    categorySlug: "account-tips",
    title: "Pixel Stacking: The Redundancy Strategy That Saves Accounts",
    description:
      "Running multiple pixels across redundant accounts gives you tracking continuity even when one account gets disabled. Here's how to set it up cleanly.",
    author: goadsTeam,
    date: "January 22, 2026",
    readTime: "8 min read",
    coverImage: "/foreplay/blog/blog_1.png",
    sections: [
      {
        id: "setup",
        title: "Setup",
        content: `<p>Deploy two pixels via GTM, configure both as standard events, and use server-side CAPI as a third layer. Disabled accounts can't take down what they don't fully own.</p>`,
      },
    ],
  },
  {
    slug: "advantage-plus-shopping-campaigns",
    category: "Meta Ads",
    categorySlug: "meta-ads",
    title: "Advantage+ Shopping Campaigns: When to Use Them (And When Not To)",
    description:
      "ASC works phenomenally for some accounts and terribly for others. The deciding factor is rarely the one Meta tells you about.",
    author: goadsTeam,
    date: "January 15, 2026",
    readTime: "11 min read",
    coverImage: "/foreplay/blog/blog_2.webp",
    sections: [
      {
        id: "when-asc-wins",
        title: "When ASC Wins",
        content: `<p>Catalog size > 100 SKUs, AOV between $40-$200, broad demographic appeal, and at least 50 purchases/week of historical data. Missing any of these makes ASC a coin flip.</p>`,
      },
    ],
  },
  {
    slug: "google-pmax-asset-groups",
    category: "Google Ads",
    categorySlug: "google-ads",
    title: "Structuring Performance Max Asset Groups for Maximum ROAS",
    description:
      "PMax rewards intentional structure. Lumping everything into one asset group leaves performance — and budget — on the table.",
    author: goadsTeam,
    date: "January 8, 2026",
    readTime: "9 min read",
    coverImage: "/foreplay/blog/blog_1.png",
    sections: [
      {
        id: "thematic-grouping",
        title: "Thematic Grouping",
        content: `<p>Split asset groups by product theme, not SKU. PMax's algorithm needs enough signal per group to optimize — narrow themes starve the model.</p>`,
      },
    ],
  },
  {
    slug: "tiktok-spark-code-management",
    category: "TikTok Ads",
    categorySlug: "tiktok-ads",
    title: "Managing TikTok Spark Codes at Scale",
    description:
      "Once you're running 20+ Spark Ads across multiple creators, manual code management becomes a bottleneck. Here's the system we use.",
    author: goadsTeam,
    date: "January 2, 2026",
    readTime: "7 min read",
    coverImage: "/foreplay/blog/blog_2.webp",
    sections: [
      {
        id: "the-system",
        title: "The System",
        content: `<p>Centralize codes in a shared sheet with creator, post URL, expiry, ad account, and ad ID. Automate renewal reminders 7 days before expiry.</p>`,
      },
    ],
  },
  {
    slug: "budget-pacing-strategies",
    category: "Scaling Strategy",
    categorySlug: "scaling-strategy",
    title: "Budget Pacing Strategies That Actually Hold Up at Scale",
    description:
      "Daily vs lifetime budgets. CBO vs ABO. Manual scaling vs algorithm. Here's what survives past $5K/day spend.",
    author: goadsTeam,
    date: "December 20, 2025",
    readTime: "12 min read",
    coverImage: "/foreplay/blog/blog_1.png",
    sections: [
      {
        id: "scaling-thresholds",
        title: "Scaling Thresholds",
        content: `<p>Below $1K/day: CBO with daily budgets works fine. $1K-$5K/day: switch to ABO for control. Above $5K/day: split into campaign clusters with manual pacing.</p>`,
      },
    ],
  },
  {
    slug: "ban-recovery-playbook",
    category: "Account Tips",
    categorySlug: "account-tips",
    title: "The Ban Recovery Playbook: What to Do in the First 48 Hours",
    description:
      "Getting banned is stressful but not always terminal. Here's the exact sequence we follow to maximize appeal success rates.",
    author: goadsTeam,
    date: "December 14, 2025",
    readTime: "8 min read",
    coverImage: "/foreplay/blog/blog_2.webp",
    sections: [
      {
        id: "first-48",
        title: "First 48 Hours",
        content: `<p>File the appeal immediately. Document everything. Don't create a new account from the same browser/IP. Wait for a response before any further action.</p>`,
      },
    ],
  },
  {
    slug: "retargeting-windows-deep-dive",
    category: "Meta Ads",
    categorySlug: "meta-ads",
    title: "Retargeting Window Sizes: Beyond the 7/14/30 Defaults",
    description:
      "Most advertisers default to 30-day retargeting windows. But your buying cycle, AOV, and audience size should drive the choice — not Meta's templates.",
    author: goadsTeam,
    date: "December 6, 2025",
    readTime: "6 min read",
    coverImage: "/foreplay/blog/blog_1.png",
    sections: [
      {
        id: "matching-the-cycle",
        title: "Matching the Cycle",
        content: `<p>Short cycle SKUs (under $50, impulse): 3-7 day windows. Mid-cycle ($50-$200, considered): 14-30 days. High AOV ($200+, researched): 60-90 day windows minimum.</p>`,
      },
    ],
  },
  {
    slug: "google-ads-search-terms-audit",
    category: "Google Ads",
    categorySlug: "google-ads",
    title: "The Monthly Search Terms Audit That Cuts CPA by 18%",
    description:
      "Search terms reports get ignored after launch. Spending 30 minutes a month here is the highest-ROI optimization in Google Ads.",
    author: goadsTeam,
    date: "November 28, 2025",
    readTime: "5 min read",
    coverImage: "/foreplay/blog/blog_2.webp",
    sections: [
      {
        id: "the-process",
        title: "The Process",
        content: `<p>Filter for queries with 10+ clicks and 0 conversions. Add as negative. Filter for queries with high conversion rate but low impressions. Promote to exact match.</p>`,
      },
    ],
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

export function getBlogPostsByCategory(categorySlug: string): BlogPost[] {
  return blogPosts.filter((p) => p.categorySlug === categorySlug)
}

export function getFeaturedPost(): BlogPost | undefined {
  return blogPosts.find((p) => p.featured)
}

export function getPopularPosts(limit = 4): BlogPost[] {
  return blogPosts.filter((p) => p.popular).slice(0, limit)
}
