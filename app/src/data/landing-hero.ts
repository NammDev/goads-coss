// ---------------------------------------------------------------------------
// Hero Section Data (hero-clone + hero-section-23)
// ---------------------------------------------------------------------------

export const ROTATE_WORDS = ['Scaling', 'Growing', 'Winning', 'Profiting']

export const TYPEWRITER_WORDS = [
  'Media Buyers',
  'Agencies',
  'E-commerce Brands',
  'Dropshippers',
  'Lead Gen Teams',
]

export interface AvatarItem {
  id: string
  alt: string
  fallback: string
}

export const AVATARS: AvatarItem[] = [
  { id: 'avatar-38', alt: 'client', fallback: 'C1' },
  { id: 'avatar-42', alt: 'client', fallback: 'C2' },
  { id: 'avatar-27', alt: 'client', fallback: 'C3' },
  { id: 'avatar-34', alt: 'client', fallback: 'C4' },
  { id: 'avatar-29', alt: 'client', fallback: 'C5' },
]

export interface PlatformLogo {
  src: string
  alt: string
}

export const PLATFORM_LOGOS: PlatformLogo[] = [
  { src: 'https://cdn.simpleicons.org/meta/000000', alt: 'Meta' },
  { src: 'https://cdn.simpleicons.org/googleads/000000', alt: 'Google Ads' },
  { src: 'https://cdn.simpleicons.org/tiktok/000000', alt: 'TikTok' },
  { src: 'https://cdn.simpleicons.org/facebook/000000', alt: 'Facebook' },
  { src: 'https://cdn.simpleicons.org/instagram/000000', alt: 'Instagram' },
]

export interface BrandLogo {
  image: string
  name: string
}

export const BRAND_LOGOS: BrandLogo[] = [
  { image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/google-logo.png', name: 'Google' },
  { image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/amazon-logo.png', name: 'Amazon' },
  { image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/hubspot-logo.png', name: 'Hubspot' },
  { image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/walmart-logo.png', name: 'Walmart' },
  { image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/microsoft-logo.png', name: 'Microsoft' },
  { image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/airbnb-logo.png', name: 'Airbnb' },
  { image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/fedex-logo.png', name: 'Fedex' },
  { image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/adobe-logo.png', name: 'Adobe' },
  { image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/shopify-logo.png', name: 'Shopify' },
  { image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/ola-logo.png', name: 'Ola' },
  { image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/huawei-logo.png', name: 'Huawei' },
  { image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/bookmyshow-logo.png', name: 'Book My Show' },
]

// hero-section-23 word rotate
export const HERO_SECTION_WORDS = ['Meta', 'Google', 'TikTok']
