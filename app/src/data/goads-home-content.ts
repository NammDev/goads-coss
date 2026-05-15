// GoAds home page content — swap into Foreplay layout components
// Layout stays identical, only text/props change

export const goadsHome = {
  // Section 1: Hero
  hero: {
    headline: "Premium Meta Assets\nBuilt for Winning Campaigns",
    subheadline: "GOADS provides verified Business Managers, agency ad accounts, profiles, pages, and Meta infrastructure for teams scaling serious campaigns.",
    ctaLabel: "Contact Us",
    ctaHref: "/talk-to-sales",
    trustBadge: "TRUSTED BY 1000+ ADVERTISERS WORLDWIDE",
  },

  // Section 2: Before & After
  winning: {
    title: "Built to last, made to scale",
    description: "Stop rebuilding from scratch. Every ban means starting over. New BM, new profile, new warmup, lost momentum. We built GoAds so you never have to do that again.",
  },

  // Section 3: Products & Solutions (3 product showcases)
  products: {
    subtitle: "PRODUCTS & SOLUTIONS",
    title: "Infrastructure designed for your success",
    description: "Verified assets, instant delivery, real support. Everything you need to keep your ads live.",
    showcases: [
      {
        overline: "Assets",
        title: "Premium assets, ready to scale",
        ctaHref: "/agency-ad-account",
        learnMoreHref: "/agency-ad-account",
      },
      {
        overline: "Solutions",
        title: "Fix issues, stay scaling",
        ctaHref: "/unban",
        learnMoreHref: "/unban",
      },
      {
        overline: "Agency Ad Accounts",
        title: "Grow without limits",
        ctaHref: "/agency-ad-account",
        learnMoreHref: "/agency-ad-account",
      },
    ],
  },

  // Section 4: Chrome Extension
  chromeExtension: {
    subtitle: "FREE CHROME EXTENSION",
    title: "Bypass Business Manager invites.\nLogin by cookie.",
    description: "All in one tool.",
    ctaLabel: "Install Free",
  },

  // Section 5: Tools & Services (2 product showcases)
  tools: {
    subtitle: "TOOLS & SERVICES",
    title: "Powerful tools built from real experience",
    description: "Extensions, tools and services designed to solve real problems. So you can focus on scaling.",
    showcases: [
      {
        overline: "Technology",
        title: "Optimize Your Workflow",
        ctaHref: "/tools",
        learnMoreHref: "/tools",
      },
      {
        overline: "Service",
        title: "Always On, Always Reliable",
        ctaHref: "/talk-to-sales",
        learnMoreHref: "/talk-to-sales",
      },
    ],
  },

  // Section 6: Our Promise (replaces Collaboration/Sharing)
  promise: {
    subtitle: "OUR PROMISE",
    title: "What we commit to every client",
    description: "We built our reputation on these standards. And we protect it with every single delivery. This is the promise behind every order.",
    ctaLabel: "Get Started",
    ctaHref: "/talk-to-sales",
  },

  // Section 7: Community & Resources (replaces Features Grid)
  community: {
    subtitle: "COMMUNITY & RESOURCES",
    title: "Stay connected, stay ahead",
    description: "Tools, updates, and direct access to our team. Everything to keep you moving.",
    cards: [
      {
        title: "Direct access anytime",
        description: "Reach us on Telegram, WhatsApp or Discord. Real answers from real people, 24/7.",
      },
      {
        title: "Built to save you time",
        description: "Extensions and tools we built to fix what Meta breaks. Free for all users.",
      },
      {
        title: "Stay in the loop",
        description: "Platform changes, new products, insider tips. Fresh updates straight from us.",
      },
    ],
  },

  // Section 8: Final CTA
  cta: {
    title: "Your next winning campaign starts here",
    description: "Join 500+ advertisers who trust GoAds. Stable assets, real support, instant replacement.",
    primaryLabel: "Get Started",
    primaryHref: "/talk-to-sales",
    secondaryLabel: "View Pricing",
    secondaryHref: "/pricing",
  },
} as const
