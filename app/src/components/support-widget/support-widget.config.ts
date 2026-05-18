// Content for support-widget (data-driven). Swap logo/avatars with real assets.

export interface SwActionRow {
  title: string
  sub?: string
  icon: "send" | "external"
  href?: string
  external?: boolean
}

export const SW_CONFIG = {
  logoSrc: "/foreplay/photo_2026-05-18_00-43-01.jpg", // real Foreplay logo (rendered white on the gradient header)
  avatars: [
    { alt: "Support agent 1", src: "/foreplay/sample-foreplay-avatar.webp" },
    { alt: "Support agent 2", src: "/foreplay/test_tim_keen_avatar.webp" },
  ],
  title: "How can we help?",
  rows: [
    { title: "Send us a message", sub: "We'll be back online tomorrow", icon: "send" },
    { title: "🖥️ Book a Demo", href: "/book-demo", external: true, icon: "external" },
  ] as SwActionRow[],
  highlight: {
    heading: "💡 Share your ideas",
    body: "Suggest features or report bugs here.",
    cta: "Send Feedback",
    href: "/book-demo",
  },
  tabs: { home: "Home", messages: "Messages" },
} as const
