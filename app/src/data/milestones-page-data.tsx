import type { Release } from '@/components/shadcn-studio/blocks/timeline-component-05/timeline-component-05'
import Milestone2025 from '@/components/shadcn-studio/blocks/timeline-component-05/content/milestone-2025'
import Milestone2023 from '@/components/shadcn-studio/blocks/timeline-component-05/content/milestone-2023'
import Milestone2021 from '@/components/shadcn-studio/blocks/timeline-component-05/content/milestone-2021'
import Milestone2019 from '@/components/shadcn-studio/blocks/timeline-component-05/content/milestone-2019'

export const milestoneReleases: Release[] = [
  {
    version: '2025',
    date: 'Present',
    content: <Milestone2025 />,
  },
  {
    version: '2023',
    date: 'Growth Year',
    content: <Milestone2023 />,
  },
  {
    version: '2021',
    date: 'Expansion',
    content: <Milestone2021 />,
  },
  {
    version: '2019',
    date: 'Founded',
    content: <Milestone2019 />,
  },
]
