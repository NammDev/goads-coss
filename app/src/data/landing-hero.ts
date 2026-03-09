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
  icon: string
  name: string
}

export const BRAND_LOGOS: BrandLogo[] = [
  { icon: 'https://cdn.simpleicons.org/facebook/1877F2', name: 'Facebook' },
  { icon: 'https://cdn.simpleicons.org/instagram/E4405F', name: 'Instagram' },
  { icon: 'https://cdn.simpleicons.org/meta/0081FB', name: 'Meta' },
  { icon: 'https://cdn.simpleicons.org/whatsapp/25D366', name: 'WhatsApp' },
  { icon: 'https://cdn.simpleicons.org/google/4285F4', name: 'Google' },
  { icon: 'https://cdn.simpleicons.org/tiktok/000000', name: 'TikTok' },
  { icon: '/partners/incogniton.jpg', name: 'Incogniton' },
  { icon: '/partners/adspower.png', name: 'AdsPower' },
  { icon: '/partners/dolphin-anty.svg', name: 'Dolphin{anty}' },
  { icon: '/partners/floxy.avif', name: 'Floxy' },
  { icon: 'https://cdn.simpleicons.org/facebook/1877F2', name: 'Facebook' },
  { icon: 'https://cdn.simpleicons.org/instagram/E4405F', name: 'Instagram' },
  { icon: 'https://cdn.simpleicons.org/meta/0081FB', name: 'Meta' },
  { icon: 'https://cdn.simpleicons.org/whatsapp/25D366', name: 'WhatsApp' },
  { icon: 'https://cdn.simpleicons.org/google/4285F4', name: 'Google' },
  { icon: 'https://cdn.simpleicons.org/tiktok/000000', name: 'TikTok' },
  { icon: '/partners/incogniton.jpg', name: 'Incogniton' },
  { icon: '/partners/adspower.png', name: 'AdsPower' },
  { icon: '/partners/dolphin-anty.svg', name: 'Dolphin{anty}' },
  { icon: '/partners/floxy.avif', name: 'Floxy' },
]

// hero-section-23 word rotate
export const HERO_SECTION_WORDS = ['Meta', 'Google', 'TikTok']
