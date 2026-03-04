// ---------------------------------------------------------------------------
// Stats Section Data (stats-section.tsx)
// Icons are kept in the component — only text data lives here.
// ---------------------------------------------------------------------------

export interface StatItem {
  iconName: string
  value: string
  suffix: string
  label: string
}

export const STATS_DATA: StatItem[] = [
  { iconName: 'GithubIcon', value: '4,000', suffix: '+', label: 'Agency Ad Accounts Delivered' },
  { iconName: 'ComponentIcon', value: '$25M', suffix: '+', label: 'Ad Spend Powered' },
  { iconName: 'BlocksIcon', value: '98.5', suffix: '%', label: 'Account Stability Rate' },
  { iconName: 'UsersRoundIcon', value: '600', suffix: '+', label: 'Advertisers & Agencies' },
]
