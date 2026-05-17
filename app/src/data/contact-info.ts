/** Single source of truth for all contact URLs */
export const CONTACT = {
  telegram: {
    official: 'https://t.me/goads_official',
    support: 'https://t.me/GoAdsSupport',
    officialWithMessage: 'https://t.me/goads_official?text=Hi%20GOADS%20%F0%9F%91%8B%20I%27m%20interested%20in%20your%20services.%20Can%20you%20help%20me%3F',
    officialVerificationBadge: 'https://t.me/goads_official?text=Hi%20GOADS%2C%20I%20would%20like%20to%20use%20the%20Verification%20Badge%20%28Blue%20Tick%29%20service.',
  },
  whatsapp: {
    main: 'https://wa.me/84865717497',
    withMessage: 'https://wa.me/84865717497?text=Hi%20GOADS%20%F0%9F%91%8B%20I%27m%20interested%20in%20your%20services.%20Can%20you%20help%20me%3F',
  },
  email: 'info@goads.shop',
  linkedin: '#',
} as const
