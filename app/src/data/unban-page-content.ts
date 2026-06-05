// GoAds /unban page data — hero, feature rows, FAQ

import type { FeatureRowData } from "@/data/university-shared-types"

export const unbanHero = {
  title: "Recover banned Facebook profiles, pages, ad accounts & BMs",
  bgImage: "/assets/university_bghero.png",
}

// ── Feature Rows (2 left-right sections — keep images, swap copy) ──
export const unbanFeatureRows: FeatureRowData[] = [
  {
    title: "Bring Your Assets Back to Life",
    description:
      "Disabled Business Manager? Banned profile? Page restricted? We recover Meta assets using official appeal channels, no shady workarounds, no short-term fixes.\n\nMost cases resolve within 48–72 hours. You keep your pixel, your audience history and your ad spend intact.\n\nPay only when the asset is fully recovered.",
    image: "/assets/unban-recovery.webp",
    imageAlt: "GOADS recovering a disabled Meta Business Manager, Disabled to Recovered in 48–72h",
    reversed: false,
  },
  {
    title: "Enterprise Recovery for Agencies & High-Spenders",
    description:
      "When ad operations run at scale, a single ban doesn't just take an asset down, it stalls campaigns, halts revenue and damages client trust. Standard unban routes don't move fast enough when multiple clients are at risk.\n\nRunning multiple BMs, 10+ ad accounts, or a blocked agency client? Our enterprise unban desk handles bulk recoveries, prioritized queues and dedicated case managers.",
    image: "/assets/unban-enterprise.webp",
    imageAlt: "GOADS enterprise recovery desk, multi-client queue with a dedicated case manager",
    reversed: true,
    ctaLabel: "Contact us now",
    ctaHref: "/pricing#other-service",
  },
]

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
        "We have a 90%+ success rate across all Meta asset types. If recovery fails, you pay nothing, no upfront fees, no partial charges.",
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
