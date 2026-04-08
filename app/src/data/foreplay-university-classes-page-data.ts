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
  logoSrc: "https://cdn.prod.website-files.com/62a4ed18ddad95dde8b8bfa4/670fd3ca6faff7ca0dab1805_fu-logo-full.svg",
  logoAlt: "foreplay university logo",
  title: "Become a pro with free marketing & advertising masterclasses",
  bgImage: "https://cdn.prod.website-files.com/62a4ed18ddad95dde8b8bfa4/670fd465bbf6fd15113cf634_fu-header-background-tiny.png",
}

// ── Course Cards (5 cards in carousel) ──
const fuLogoIcon = "https://cdn.prod.website-files.com/62a4ed18ddad95dde8b8bfa4/670fe1a3b5fc3cea38b7d07b_f-u-logo-transparent-white.svg"
const comingSoonBg = "https://cdn.prod.website-files.com/62a4ed18ddad95dde8b8bfa4/670fe2f95796e064e2204e42_blank-avatar-3.png"
const activeBg = "https://cdn.prod.website-files.com/62a4ed18ddad95dde8b8bfa4/670fd9e67b82d646bae48121_sarah-card-bg-tiny.png"

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
    wordmarkSrc: "https://cdn.prod.website-files.com/62a4ed18ddad95dde8b8bfa4/6716a79cb8150ee15297cbdd_psychology-in-advertising-wordmark.svg",
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
    icon: "https://cdn.prod.website-files.com/62a4ed18ddad95dde8b8bfa4/670fd3ca6faff7ca0dab1805_fu-logo-full.svg",
    iconAlt: "foreplay university logo",
    title: "Welcome to Your Campus",
    description:
      "Here to help you stay on top of trends, crush creative strategy, and ride the AI waves like a pro.\n\nThink of Foreplay University as your backstage pass to marketing's coolest ideas, straight from the sharpest minds in the game.\n\nThe best part? It's 100% free.",
    image: "https://cdn.prod.website-files.com/62a4ed18ddad95dde8b8bfa4/6718fae17ad24b460a6924a4_campus-photo.png",
    imageAlt: "foreplay university campus",
    reversed: false,
  },
  {
    title: "Become a Professor and Access 100,000+ Marketers",
    description:
      "Do you have a killer process, workflow or app you want to share? Become a Foreplay University professor to share your knowledge.",
    image: "https://cdn.prod.website-files.com/62a4ed18ddad95dde8b8bfa4/671914cc4802cf20d73e78df_become-professor-2.png",
    imageAlt: "become a professor graphic",
    reversed: true,
    ctaLabel: "Apply Now",
    ctaHref: "https://forms.gle/BjqX45o2nYzsgV9g6",
  },
]
