// Data for /university/classes page
// Course cards + feature rows

export interface CourseCardData {
  title: string
  href: string
  /** Background image URL for the card */
  bgImage: string
  /** Wordmark SVG overlay (active cards only) */
  wordmarkSrc?: string
  isComingSoon: boolean
  /** Opacity variant: default=1, _2=0.5, _3=0.25 */
  opacityVariant?: "_2" | "_3"
}

export interface FeatureRowData {
  icon?: string
  iconAlt?: string
  title: string
  description: string
  image: string
  imageAlt: string
  reversed?: boolean
  ctaLabel?: string
  ctaHref?: string
}

// ── Hero ──
export const universityHero = {
  logoSrc: "/foreplay/university_logo.svg",
  logoAlt: "foreplay university logo",
  title: "Become a pro with free marketing & advertising masterclasses",
  bgImage: "/foreplay/university_bghero.png",
}

// ── Course Cards (5 cards in carousel) ──
const fuLogoIcon = "/foreplay/university_logowhite.svg"
const comingSoonBg = "/foreplay/university_backexpert.png"
const activeBg = "/foreplay/university_expert.png"

export const courseCards: CourseCardData[] = [
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
    title: "Psychology in Advertising",
    href: "/university/psychology-in-advertising",
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

export { fuLogoIcon }

// ── Feature Rows (2 left-right sections) ──
export const featureRows: FeatureRowData[] = [
  {
    icon: "/foreplay/university_logo.svg",
    iconAlt: "foreplay university logo",
    title: "Welcome to Your Campus",
    description:
      "Here to help you stay on top of trends, crush creative strategy, and ride the AI waves like a pro.\n\nThink of Foreplay University as your backstage pass to marketing's coolest ideas, straight from the sharpest minds in the game.\n\nThe best part? It's 100% free.",
    image: "/foreplay/university_images1.png",
    imageAlt: "foreplay university campus",
    reversed: false,
  },
  {
    title: "Become a Professor and Access 100,000+ Marketers",
    description:
      "Do you have a killer process, workflow or app you want to share? Become a Foreplay University professor to share your knowledge.",
    image: "/foreplay/university_images2.png",
    imageAlt: "become a professor graphic",
    reversed: true,
    ctaLabel: "Apply Now",
    ctaHref: "https://forms.gle/BjqX45o2nYzsgV9g6",
  },
]
