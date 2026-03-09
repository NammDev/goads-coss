/** Coming-soon product page configurations with platform icons */

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-16 sm:size-20">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-16 sm:size-20">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-16 sm:size-20">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.1a8.16 8.16 0 0 0 4.76 1.52v-3.4c-.86 0-1.68-.18-2.42-.5l-.58.03z" />
    </svg>
  )
}

export const comingSoonPages = {
  'agency-ad-account': {
    platformIcon: <FacebookIcon />,
    accentClass: 'text-[#1877F2]',
    badge: 'Facebook',
    heading: 'Facebook Agency Ad Accounts Are Coming',
    description: 'Verified Meta agency ad accounts for Facebook & Instagram. High trust scores, unlimited spend potential, and 7-day replacement warranty — built for serious media buyers.',
    features: ['Verified Agency Setup', 'Unlimited Daily Spend', '7-Day Warranty', 'Facebook & Instagram', '<2h Support Response'],
  },
  'google-agency': {
    platformIcon: <GoogleIcon />,
    accentClass: 'text-[#4285F4]',
    badge: 'Google',
    heading: 'Google Agency Ad Accounts Are Coming',
    description: 'Whitelisted Google Ads accounts with threshold billing, high trust scores, and agency-level support. Perfect for scaling search, display, and YouTube campaigns.',
    features: ['Whitelisted Accounts', 'Threshold Billing', 'Search & Display Ads', 'YouTube Campaigns', 'Agency-Level Support'],
  },
  'tiktok-agency': {
    platformIcon: <TikTokIcon />,
    accentClass: 'text-foreground',
    badge: 'TikTok',
    heading: 'TikTok Agency Ad Accounts Are Coming',
    description: 'Verified TikTok Ads accounts under official agency setup. Access premium ad features, higher spending limits, and dedicated account management for your campaigns.',
    features: ['Verified Agency Setup', 'Higher Spend Limits', 'Premium Ad Features', 'Business Center Access', 'Dedicated Support'],
  },
} as const
