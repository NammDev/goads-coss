/** Single source of truth for all contact URLs */
export const CONTACT = {
  telegram: {
    official: 'https://t.me/goads_official',
    support: 'https://t.me/GoAdsSupport',
    officialWithMessage: 'https://t.me/goads_official?text=Hello!%20I%27m%20interested%20in%20your%20products.',
  },
  whatsapp: {
    main: 'https://wa.me/84865717497',
    withMessage: 'https://wa.me/84865717497?text=Hello!%20I%27m%20interested%20in%20your%20products.',
  },
  email: 'support@goads.shop',
  linkedin: '#',
} as const
