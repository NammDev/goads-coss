// Shared types for the UniversityHero / UniversityFeatureRow / UniversityCourseCard
// layout pattern. Originally cloned from Foreplay's /university/classes page — only
// the type contracts survive (concrete content was deleted as Foreplay-leftover).

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
  /** Optional px cap for the image (default 560). */
  imageMaxWidth?: number
}
