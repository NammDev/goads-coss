'use client'

import { useEffect, useState } from 'react'

import { ExternalLinkIcon, LogInIcon } from 'lucide-react'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { PrimaryFlowButton, SecondaryFlowButton } from '@/components/ui/flow-button'

import {
  HeroNavigation01,
  HeroNavigation01SmallScreen,
  type Navigation
} from '@/components/shadcn-studio/blocks/hero-navigation-01'

import { cn } from '@/lib/utils'

import FlowLogo from '@/assets/svg/flow-logo'

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
        'sticky top-0 z-50 h-16 w-full transition-all duration-300',
        {
          'bg-card/75 backdrop-blur-sm': isScrolled
        },
        className
      )}
    >
      <div className='flex h-full items-center justify-between gap-4 px-4 sm:px-6 lg:px-8'>
        {/* Logo */}
        <a href='#'>
          <div className='flex items-center gap-3'>
            <FlowLogo className='size-8' />
            <span className='text-xl font-semibold'>Flow</span>
          </div>
        </a>

        {/* Navigation */}
        <HeroNavigation01
          navigationData={navigationData}
          navigationClassName='[&_[data-slot=navigation-menu-list]]:gap-1'
        />

        {/* Actions */}
        <div className='flex gap-4 sm:gap-6'>
          <SecondaryFlowButton className='max-sm:hidden' asChild>
            <a href='#'>Login</a>
          </SecondaryFlowButton>

          <PrimaryFlowButton className='max-sm:hidden' asChild>
            <a href='#'>Try demo</a>
          </PrimaryFlowButton>

          <Tooltip>
            <TooltipTrigger asChild>
              <SecondaryFlowButton size='icon' className='sm:hidden' asChild>
                <a href='#'>
                  <LogInIcon />
                  <span className='sr-only'>Login</span>
                </a>
              </SecondaryFlowButton>
            </TooltipTrigger>
            <TooltipContent>Login</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <PrimaryFlowButton size='icon' className='sm:hidden' asChild>
                <a href='#'>
                  <ExternalLinkIcon />
                  <span className='sr-only'>Try Demo</span>
                </a>
              </PrimaryFlowButton>
            </TooltipTrigger>
            <TooltipContent>Try Demo</TooltipContent>
          </Tooltip>

          <HeroNavigation01SmallScreen
            navigationData={navigationData}
            logo={
              <div className='flex items-center gap-3'>
                <FlowLogo className='size-8' />
                <span className='text-xl font-semibold'>Flow</span>
              </div>
            }
          />
        </div>
      </div>
    </header>
  )
}

export default Header
