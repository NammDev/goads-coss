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

const namNguyen: BlogAuthor = {
  name: "Nam Nguyen",
  avatar: "/about/nam-nguyen.webp",
  title: "Founder",
}

const justinBui: BlogAuthor = {
  name: "Justin Bui",
  avatar: "/about/justin-bui.webp",
  title: "Co-Founder",
}

const goadsTeam: BlogAuthor = {
  name: "GOADS Team",
  avatar: "/avatars/goads-team.png",
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
    slug: "stop-scaling-broken-funnels",
    category: "Scaling Strategy",
    categorySlug: "scaling-strategy",
    title:
      "Stop Scaling Broken Funnels: Why Ads Should Be Your Third Priority, Not First",
    description:
      "Why not just raise the ad budget first? Here's our answer, backed by a real dropshipping case study that scaled from $15K to $350K a month. Funnel first, content second, ads third. Get the sequence wrong and you only leak money faster.",
    author: goadsTeam,
    date: "June 26, 2026",
    readTime: "6 min read",
    coverImage: "/assets/blog/blog-cover-placeholder.svg",
    popular: true,
    sections: [
      {
        id: "bleeding-money-case-study",
        title: "The $15,000/Month Store That Was Bleeding Money",
        content: `<p>We hear this question all the time from our clients. "Why not just increase ad budget first? It's faster than fixing the funnel." Here's our answer, backed by a real case study.</p>
<p>One client came to us running a US dropshipping store doing around $15,000 a month in revenue. They were running their own ads, testing creatives constantly, and burning through budget.</p>
<p>The problem wasn't the ads. The problem wasn't even the product.</p>
<p>The problem was this. Customers were landing on the site, browsing, and leaving. There was no mechanism to take them deeper into the journey, from viewing to trusting, from trusting to buying, from buying to referring.</p>
<p>So what happens when you pump more ad budget into a leaky funnel? You leak faster. You burn more. You mistake spending for growing.</p>`,
      },
      {
        id: "right-order-of-operations",
        title: "The Right Order of Operations",
        content: `<p>We didn't increase their ad spend. Instead, we followed a specific sequence.</p>
<ul>
<li><strong>Funnel first.</strong> Map the customer journey. Identify where conversions drop. Fix the path before adding more traffic.</li>
<li><strong>Content second.</strong> Build trust layers. Create curiosity and credibility before asking for the sale. Social proof, UGC, and email sequences all warm cold traffic.</li>
<li><strong>Ads third.</strong> Only now do you scale. Ads are for expanding reach once the system converts, not for rescuing a broken funnel.</li>
<li><strong>Tracking last.</strong> Measure everything. Know exactly which channels perform and which drain budget.</li>
</ul>`,
      },
      {
        id: "the-results",
        title: "The Results",
        content: `<p>After restructuring the funnel and content, the numbers moved fast.</p>
<ul>
<li><strong>Month 1 to 4:</strong> $15,000 grew to $85,000 a month.</li>
<li><strong>Month 6:</strong> $200,000+ a month.</li>
<li><strong>Month 12:</strong> $350,000+ a month, year over year.</li>
</ul>
<p>And here's what matters most. This wasn't a lucky spike. Monthly year-over-year growth held steady.</p>
<ul>
<li>March: +163%</li>
<li>April: +159%</li>
<li>May: +157%</li>
<li>June: +127%</li>
</ul>
<blockquote>Repeatable. Measurable. Not luck.</blockquote>`,
      },
      {
        id: "the-data-backs-this-up",
        title: "The Data Backs This Up",
        content: `<p>A 2026 industry survey found that marketers waste an average of 26 percent of their ad budget on ineffective channels. Nearly half misallocate at least 20 percent of their spend, mostly because they scale before fixing infrastructure.</p>
<p>Meanwhile, research from Nielsen and Meta shows that a properly sequenced full-funnel strategy delivers 13 percent higher incremental sales compared to focusing only on bottom-of-funnel tactics.</p>
<p>Another ecommerce case study from 2026 showed what happens when you reorganize the funnel layers correctly.</p>
<ul>
<li><strong>Top of funnel.</strong> Video content showing before and after to spark curiosity.</li>
<li><strong>Middle of funnel.</strong> Offers and social proof to build trust.</li>
<li><strong>Bottom of funnel.</strong> Scarcity and urgency to close.</li>
</ul>
<p>The results were dramatic.</p>
<ul>
<li>Conversion rate jumped from 1.5% to 4.7%.</li>
<li>Cost per acquisition dropped from $55 to $18.</li>
<li>ROAS hit 9.8x.</li>
</ul>
<blockquote>Same ad budget. Different sequence. Completely different outcome.</blockquote>`,
      },
      {
        id: "ads-arent-wrong-just-third",
        title: "Ads Aren't Wrong, They're Just Third",
        content: `<p>We're not saying ads are bad. Ads are essential. But they're step three, not step one.</p>
<p>Reversing this order, pouring budget into ads before the funnel is fixed, is the most common way businesses burn money while believing they're growing.</p>
<blockquote>Growth that can't be repeated isn't growth. It's gambling.</blockquote>`,
      },
      {
        id: "the-question-to-answer",
        title: "The Question You Need to Answer",
        content: `<p>Before you increase your ad budget, ask yourself one thing.</p>
<blockquote>Are you scaling ads, or are you scaling a broken funnel?</blockquote>
<p>If traffic comes in and leaks out, more traffic just means more leakage. Fix the funnel. Then scale.</p>`,
      },
      {
        id: "how-goads-helps",
        title: "How GOADS Helps",
        content: `<p>We provide the infrastructure that makes scaling possible. Verified Business Managers, aged profiles, and agency ad accounts, all backed by our 7-day replacement warranty.</p>
<p>But infrastructure is just one piece. The real growth comes from getting the sequence right. We've seen hundreds of ad accounts, and we know what separates the ones that scale from the ones that burn.</p>`,
      },
    ],
  },
  {
    slug: "how-much-can-you-scale-ad-budget",
    category: "Scaling Strategy",
    categorySlug: "scaling-strategy",
    title: "How Much Can You Scale Ad Budget?",
    description:
      "The 10 to 20 percent rule is a safe default, not the whole story. Here are the three signals that tell you when a campaign can take aggressive scaling, and when adding budget only amplifies your problems.",
    author: namNguyen,
    date: "June 6, 2026",
    readTime: "7 min read",
    coverImage: "/assets/blog/how-much-can-you-scale-ad-budget.webp",
    featured: true,
    popular: true,
    sections: [
      {
        id: "the-wrong-question",
        title: "Everyone Asks the Wrong Question",
        content: `<p>Ask any media buyer how to scale a winning campaign and you'll hear the same answer. Raise the budget 10 to 20 percent at a time, and never move too fast.</p>
<p>That advice isn't wrong. It's just incomplete.</p>
<p>There are moments when you can scale far harder and far faster than that. The only reason most advertisers never do is that they can't tell when they've earned the right to. The real question was never about a percentage. It's this:</p>
<blockquote>How much spend can you pour in before the numbers stop making money?</blockquote>
<p>Answer that, and the 10 to 20 percent rule becomes what it always was. A safe default for advertisers who don't yet have the data to know better.</p>`,
      },
      {
        id: "why-scaling-breaks-margin",
        title: "Why More Budget Quietly Eats Your Margin",
        content: `<p>Scaling almost always means reaching a wider, colder audience. The warm pocket of buyers that converted cheaply gets exhausted, and the platform starts spending your extra budget on people who sit further from a purchase.</p>
<p>The symptoms are predictable. CPA creeps up. ROAS drifts down. The marginal dollars leak into weak audiences, poor placements, and creatives that never deserved the spend in the first place.</p>
<p>So scaling is not "add money and win." It's knowing exactly how far you can push before the math turns against you. The advertisers who scale fastest aren't the bravest. They're the ones who know where their ceiling sits before they reach it.</p>`,
      },
      {
        id: "signal-1-unit-economics",
        title: "Signal 1: You Actually Know Your Unit Economics",
        content: `<p>This is the foundation under every scaling decision. You need the one number most advertisers can only guess at. At what ROAS do you still make money? And just as important, does that number account for the lifetime value of a customer, or only the first order?</p>
<p>The difference changes everything. A brand on a subscription model can happily accept a 1.2x ROAS on the first purchase, because the real profit lives in month two, month three, and beyond. A brand selling a one time product might need 3x on day one simply to break even.</p>
<blockquote>Same ROAS number, two completely different pictures. One advertiser should scale hard. The other should slow down. The dashboard looks identical for both.</blockquote>
<p>There's one more trap. The ROAS that Facebook and Google report back to you usually runs lower than reality, because platform attribution misses most of the impact that happens across other channels and after a view. If you make scaling decisions from the in platform dashboard alone, with no independent measurement, you're deciding with half the data.</p>`,
      },
      {
        id: "signal-2-performance-holds",
        title: "Signal 2: Performance Holds When You Add Spend",
        content: `<p>This is the clearest green light there is. You raise the budget, purchases climb with it, and ROAS stays flat or dips only slightly. That's a campaign with room to grow.</p>
<p>The opposite signal is just as loud. Push the budget up 20 percent, watch ROAS fall 40 percent the same day, and you've found the ceiling. Don't force it.</p>
<p>What matters most is where you look. Track daily performance after every increase, not weekly and not monthly. When you scale fast, the market answers fast, so you need to be sensitive enough to catch the turn early, while reversing it is still cheap.</p>`,
      },
      {
        id: "signal-3-funnel-fits-audience",
        title: "Signal 3: Your Funnel and Audience Speak the Same Language",
        content: `<p>This is what ultimately decides how high your ceiling goes.</p>
<p>When the creative hits the right angle, the landing page is built for the right person, and the entire funnel speaks one consistent language, scaling becomes simple. You're just reaching more people inside the same pocket. The campaign keeps working for the right reason, not because you got lucky.</p>
<p>When the funnel is loose, the story falls apart. The creative says one thing, the landing page says another, and the product page says a third. No amount of budget repairs that. You're only paying to amplify the confusion.</p>
<p>Raising that ceiling is mechanical, not magical:</p>
<ul>
<li><strong>Test creative relentlessly.</strong> Keep going until you find genuine winners, not merely acceptable ads.</li>
<li><strong>Split by device and audience.</strong> That's how you learn what truly works, and for whom.</li>
<li><strong>Build a dedicated landing page for each angle.</strong> Stop pointing every ad at one generic page.</li>
</ul>`,
      },
      {
        id: "the-bottom-line",
        title: "The Bottom Line",
        content: `<p>The "raise it 10 to 20 percent at a time" rule still holds for most situations. It's safe, it carries little risk, and when you're unsure, it's the right call.</p>
<p>But when you have all three signals working together, a real grasp of your unit economics, performance that holds as spend climbs, and a funnel that fits its audience, you can push much harder than "recommended" ever suggests.</p>
<blockquote>Scaling isn't an act of courage, and it isn't a gamble. It's a function of whether you have enough data to be confident.</blockquote>
<p>One quieter prerequisite sits underneath all of it. Your account has to take the heat. Aggressive scaling means sudden spend spikes, the exact pattern that gets fragile accounts flagged and shut down. Your infrastructure should never be the thing that caps you. The only ceiling worth reaching is the one your data draws, which is precisely why serious advertisers run on stable agency accounts with real headroom. The limit on their scaling becomes their numbers, never their account.</p>`,
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
