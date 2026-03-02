'use client'

import { useEffect, useState } from 'react'

import { MessageSquareMoreIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

import {
  HeroNavigation01,
  HeroNavigation01SmallScreen,
  type Navigation
} from '@/components/shadcn-studio/blocks/hero-navigation-01'

import { cn } from '@/lib/utils'

import CraftLogo from '@/assets/svg/craft-logo'

type HeaderProps = {
  navigationData: Navigation[]
  className?: string
}

const Header = ({ navigationData, className }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 h-16 w-full border-b transition-all duration-300',
        {
          'bg-card/75 backdrop-blur': isScrolled
        },
        className
      )}
    >
      <div className='mx-auto flex h-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8'>
        {/* Logo */}
        <a href='#' className='flex items-center gap-3'>
          <CraftLogo />
          <span className='text-primary text-[20px] font-semibold uppercase'>Craft</span>
        </a>

        <div className='flex gap-3'>
          {/* Navigation */}
          <HeroNavigation01
            navigationData={navigationData}
            navigationClassName='grow [&_[data-slot=navigation-menu-list]]:gap-1'
          />
          {/* Actions */}
          <Button variant='outline' className='rounded-full px-4! max-sm:hidden' asChild>
            <a href='#'>
              Let’s talk <MessageSquareMoreIcon />
            </a>
          </Button>

          <Button variant='outline' size='icon' className='rounded-full px-4! sm:hidden' asChild>
            <a href='#'>
              <span className='sr-only'>Let’s talk</span>
              <MessageSquareMoreIcon />
            </a>
          </Button>

          <HeroNavigation01SmallScreen
            navigationData={navigationData}
            logo={
              <span className='flex items-center gap-3'>
                <CraftLogo />
                <span className='text-primary text-[20px] font-semibold uppercase'>Craft</span>
              </span>
            }
          />
        </div>
      </div>
    </header>
  )
}

export default Header
