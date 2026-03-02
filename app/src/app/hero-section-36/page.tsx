import { PenToolIcon, FrameIcon, PaletteIcon, FramerIcon, PanelTopIcon, TabletSmartphoneIcon } from 'lucide-react'

import Header from '@/components/shadcn-studio/blocks/hero-section-36/header'
import HeroSection from '@/components/shadcn-studio/blocks/hero-section-36/hero-section-36'
import type { Navigation } from '@/components/shadcn-studio/blocks/hero-navigation-01'

const navigationData: Navigation[] = [
  {
    title: 'Portfolio',
    href: '#'
  },
  {
    title: 'Services',
    contentClassName: '!w-141 grid-cols-2',
    splitItems: true,
    items: [
      {
        type: 'section',
        title: 'Product & UX Strategy',
        items: [
          {
            title: 'UI/UX Design',
            href: '#',
            description: 'Design intuitive digital experiences for web & mobile products.',
            icon: <PaletteIcon className='size-4.5!' />
          },
          {
            title: 'Logo & Brand Identity',
            href: '#',
            description: 'Create memorable brand visuals that strengthen recognition.',
            icon: <PenToolIcon className='size-4.5!' />
          },
          {
            title: 'Wireframing & Prototyping',
            href: '#',
            description: 'Test ideas fast with interactive prototypes.',
            icon: <FrameIcon className='size-4.5!' />
          }
        ]
      },
      {
        type: 'section',
        title: 'Interface & Delivery',
        items: [
          {
            title: 'Framer Website Development',
            href: '#',
            description: 'From Figma to fully-animated no-code websites.',
            icon: <FramerIcon className='size-4.5!' />
          },
          {
            title: 'Landing Page Design',
            href: '#',
            description: 'High-impact pages that convert visitors into customers.',
            icon: <PanelTopIcon className='size-4.5!' />
          },
          {
            title: 'Mobile App UI Design',
            href: '#',
            description: 'Pixel-perfect app experiences for iOS & Android.',
            icon: <TabletSmartphoneIcon className='size-4.5!' />
          }
        ]
      }
    ]
  },
  {
    title: 'About',
    href: '#'
  },
  {
    title: 'Projects',
    href: '#'
  },
  {
    title: 'Testimonials',
    href: '#'
  }
]

const avatars = [
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png',
    fallback: 'OS',
    name: 'Olivia Sparks'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-6.png',
    fallback: 'HL',
    name: 'Howard Lloyd'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png',
    fallback: 'HR',
    name: 'Hallie Richards'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-16.png',
    fallback: 'JW',
    name: 'Jenny Wilson'
  }
]

const HeroSectionPage = () => {
  return (
    <div className='flex flex-col'>
      {/* Header Section */}
      <Header navigationData={navigationData} />

      {/* Main Content */}
      <main className='flex flex-col'>
        <HeroSection avatars={avatars} />
      </main>
    </div>
  )
}

export default HeroSectionPage
