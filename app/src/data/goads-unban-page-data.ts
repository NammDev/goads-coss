// GoAds /unban page data — hero, course cards, feature rows, examples section, FAQ
// Shape mirrors foreplay-university-classes-page-data + ecommerceExamplesSection.
// ALL asset paths (images, SVGs, bg images) reused 1:1 — only TEXT differs.

import type {
  CourseCardData,
  FeatureRowData,
} from "@/data/foreplay-university-classes-page-data"

// ── Hero (no badge, no cards — just title + bg image) ──
export const unbanHero = {
  title: "Recover banned Facebook profiles, pages, ad accounts & BMs",
  bgImage: "/foreplay/university_bghero.png",
}

// ── Course Cards (5 slots — reuses same backgrounds / wordmark) ──
const comingSoonBg = "/foreplay/university_backexpert.png"
const activeBg = "/foreplay/university_expert.png"

export const unbanCourseCards: CourseCardData[] = [
  {
    title: "Coming Soon",
    href: "#",
    bgImage: comingSoonBg,
    isComingSoon: true,
    opacityVariant: "_3",
  },
  {
    title: "Coming Soon",
    href: "#",
    bgImage: comingSoonBg,
    isComingSoon: true,
    opacityVariant: "_2",
  },
  {
    title: "Unban Success Stories",
    href: "/foreplay/unban",
    bgImage: activeBg,
    wordmarkSrc: "/foreplay/university_psychology.svg",
    isComingSoon: false,
  },
  {
    title: "Coming Soon",
    href: "#",
    bgImage: comingSoonBg,
    isComingSoon: true,
    opacityVariant: "_2",
  },
  {
    title: "Coming Soon",
    href: "#",
    bgImage: comingSoonBg,
    isComingSoon: true,
    opacityVariant: "_3",
  },
]

// ── Feature Rows (2 left-right sections — keep images, swap copy) ──
export const unbanFeatureRows: FeatureRowData[] = [
  {
    title: "Bring Your Assets Back to Life",
    description:
      "Disabled Business Manager? Banned profile? Page restricted? We recover Meta assets using official appeal channels — no shady workarounds, no short-term fixes.\n\nMost cases resolve within 48–72 hours. You keep your pixel, your audience history and your ad spend intact.\n\nPay only when the asset is fully recovered.",
    image: "/foreplay/university_images1.png",
    imageAlt: "GoAds unban workflow",
    reversed: false,
  },
  {
    title: "Enterprise Recovery for Agencies & High-Spenders",
    description:
      "When ad operations run at scale, a single ban doesn't just take an asset down — it stalls campaigns, halts revenue and damages client trust. Standard unban routes don't move fast enough when multiple clients are at risk.\n\nRunning multiple BMs, 10+ ad accounts, or a blocked agency client? Our enterprise unban desk handles bulk recoveries, prioritized queues and dedicated case managers.",
    image: "/foreplay/university_images2.png",
    imageAlt: "GoAds enterprise unban service",
    reversed: true,
    ctaLabel: "Contact us now",
    ctaHref: "/talk-to-sales",
  },
]

// ── Examples Grid (ecommerceExamples array reused — only section copy changes) ──
export const unbanExamplesSection = {
  subtitle: "Recent Recoveries",
  title: "Real bans, real recoveries",
  description:
    "A snapshot of recent disabled assets GoAds has brought back — profiles, pages, ad accounts and Business Managers.",
}

// ── FAQ ──
export const unbanFaq = {
  subtitle: "FAQ",
  title: "Questions about the Unban Service?",
  description:
    "Most frequent questions about recovering disabled Facebook profiles, pages, ad accounts and Business Managers.",
  items: [
    {
      question: "What assets can you unban?",
      answer:
        "Facebook profiles, Facebook Pages, ad accounts, Business Managers, Instagram accounts and Meta commerce accounts. If it lives inside Meta, we can usually appeal it.",
    },
    {
      question: "How long does the unban process take?",
      answer:
        "Most cases resolve within 48–72 hours. Complex BM or commerce disables can take 5–7 business days depending on Meta's review queue.",
    },
    {
      question: "Do you guarantee recovery?",
      answer:
        "We have a 90%+ success rate across all Meta asset types. If recovery fails, you pay nothing — no upfront fees, no partial charges.",
    },
    {
      question: "What do I need to provide?",
      answer:
        "Access to the disabled asset (cookies or login credentials), a valid ID matching the account, and any previous disable notifications from Meta. We handle the rest.",
    },
    {
      question: "Is this official Meta recovery?",
      answer:
        "Yes. We submit appeals through official Meta channels using verified agency access. No scripts, no grey-hat tricks, no risk to your reputation.",
    },
  ],
}
