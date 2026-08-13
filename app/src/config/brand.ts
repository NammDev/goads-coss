// Brand configuration — the single source of truth for everything that differs
// between the sites this one codebase can ship as (white-label).
//
// How it works:
//   - `NEXT_PUBLIC_BRAND` (build-time env) picks the active brand. Unset → "goads",
//     so the existing GOADS site is 100% unchanged unless the env is set.
//   - Components/metadata read `brand` instead of hardcoding GOADS strings. What is
//     genuinely different per brand (name, domain, contact, metadata) lives here;
//     what is structurally different (e.g. a whole new header) is a separate
//     component chosen by `brand.key`, not a field in this file.
//
// This file is pure data + a resolver. Adding it changes NOTHING at runtime until
// a consumer imports it — that wiring happens in later phases.

export type BrandKey = "goads" | "adstoolkit"

export interface BrandSocial {
  label: string
  href: string
}

export interface Brand {
  /** Stable id, also the value of NEXT_PUBLIC_BRAND. */
  key: BrandKey
  /** Display name / wordmark text. */
  name: string
  /** Canonical site origin (no trailing slash). */
  url: string
  /** <title> and OG title. */
  title: string
  /** Meta description / OG description. */
  description: string
  /** SEO keywords for <meta keywords>. */
  keywords: string[]
  /** OG image path, served from /public. */
  ogImage: string
  /** Alt text for the OG image. */
  ogImageAlt: string
  /** Primary contact channel; empty string = none (neutral brands hide it). */
  telegram: string
  /** Footer/social links; empty = render none. */
  socials: BrandSocial[]
  /**
   * When true this brand is a tools-only site: middleware exposes only the tools
   * routes on its domain and the home route lands on the tools page. Drives the
   * route-scoping in a later phase; harmless until then.
   */
  toolsOnly: boolean
}

// ── Brand definitions ────────────────────────────────────────────────────────

// GOADS — the current site, verbatim from app/layout.tsx + the existing contact
// links. Keeping these here does not change the site; layout.tsx keeps its own
// constants until Phase 1 points them at `brand`.
const GOADS: Brand = {
  key: "goads",
  name: "GOADS",
  url: "https://goadsagency.com",
  title: "GOADS | Agency Ad Accounts & Meta Assets | 24/7 Support",
  description:
    "Premium agency ad accounts and Meta assets backed by industry-leading warranty, dedicated customer support, fast delivery, and long-term reliability.",
  keywords: [
    "GOADS",
    "agency ad accounts",
    "Meta Business Manager",
    "verified BM",
    "Facebook ad accounts",
    "Facebook profiles",
    "Facebook pages",
    "TikTok accounts",
    "Meta assets",
    "unban service",
    "blue verification",
    "scale Facebook ads",
  ],
  ogImage: "/og-image.png",
  ogImageAlt: "GOADS - Agency Ad Accounts & Meta Assets",
  telegram: "https://t.me/goadsagency",
  socials: [{ label: "Telegram", href: "https://t.me/goadsagency" }],
  toolsOnly: false,
}

// AdsToolkit — the new neutral, tools-only brand. No GOADS traces: no goads
// domain, no t.me/goadsagency, its own name. Domain + OG image are placeholders
// until the real ones are provided (override the domain with NEXT_PUBLIC_SITE_URL
// at deploy time if needed).
const ADSTOOLKIT: Brand = {
  key: "adstoolkit",
  name: "ToolFB",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://toolfb.media",
  title: "ToolFB | Free Meta Ads & Business Manager Tools",
  description:
    "A free toolkit for Meta advertisers — Business Manager utilities, 2FA, bookmarklets and more. No sign-up, runs in your browser.",
  keywords: [
    "Meta ads tools",
    "Business Manager tools",
    "BM tools",
    "2FA generator",
    "facebook bookmarklets",
    "ad account tools",
    "free ads tools",
    "toolfb",
  ],
  ogImage: "/og-image.png",
  ogImageAlt: "ToolFB - Free Meta Ads & Business Manager Tools",
  telegram: "",
  socials: [],
  toolsOnly: true,
}

export const BRANDS: Record<BrandKey, Brand> = {
  goads: GOADS,
  adstoolkit: ADSTOOLKIT,
}

// ── Resolver ─────────────────────────────────────────────────────────────────

// Default to GOADS so an unset env leaves the existing site untouched. An unknown
// value also falls back to GOADS rather than throwing — a bad env should not brick
// the build.
function resolveBrandKey(): BrandKey {
  const raw = process.env.NEXT_PUBLIC_BRAND
  return raw === "adstoolkit" ? "adstoolkit" : "goads"
}

/** The active brand for this build. */
export const brand: Brand = BRANDS[resolveBrandKey()]

/** Look up any brand by key (e.g. for previews/tests). */
export function getBrand(key: BrandKey): Brand {
  return BRANDS[key]
}

/** Convenience flags for `brand.key === …` branches in components. */
export const isGoads = brand.key === "goads"
export const isAdsToolkit = brand.key === "adstoolkit"
