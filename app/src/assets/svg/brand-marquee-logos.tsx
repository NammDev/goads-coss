// ---------------------------------------------------------------------------
// Brand Marquee Data — Real logos for the hero logo cloud
// Major brands: Simple Icons official SVGs (downloaded to /public/partners/)
// Partner brands: Real favicon icons from their websites
// ---------------------------------------------------------------------------

export interface MarqueeBrand {
  name: string
  src: string
}

export const MARQUEE_BRANDS: MarqueeBrand[] = [
  // Major platforms — official Simple Icons SVGs
  { name: 'Facebook', src: '/partners/facebook-icon.svg' },
  { name: 'Instagram', src: '/partners/instagram-icon.svg' },
  { name: 'Meta', src: '/partners/meta-icon.svg' },
  { name: 'WhatsApp', src: '/partners/whatsapp-icon.svg' },
  { name: 'Google', src: '/partners/google-icon.svg' },
  { name: 'TikTok', src: '/partners/tiktok-icon.svg' },
  { name: 'Google Ads', src: '/partners/googleads-icon.svg' },
  // Partner brands — real icons from their websites
  { name: 'Dolphin{anty}', src: '/partners/dolphin-anty-icon.png' },
  { name: 'AdsPower', src: '/partners/adspower-icon.png' },
  { name: 'GoLogin', src: '/partners/gologin-icon.png' },
  { name: 'Incogniton', src: '/partners/incogniton-icon.png' },
  { name: 'Floxy', src: '/partners/floxy-icon.png' },
]
