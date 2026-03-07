'use client'

import { useRef } from 'react'

import { MessageSquareMoreIcon, RocketIcon, TicketCheckIcon } from 'lucide-react'

import HeroSvg from '@/assets/svg/hero-svg'
import CustomersCardSvg from '@/assets/svg/customers-card-svg'

import { MotionPreset } from '@/components/ui/motion-preset'
import { WordRotate } from '@/components/ui/word-rotate'
import { Rating } from '@/components/ui/rating'
import { AnimatedBeam } from '@/components/ui/animated-beam'
import { BorderBeam } from '@/components/ui/border-beam'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { Button } from '@/components/ui/button'

import RatingsCard from '@/components/shadcn-studio/blocks/statistics-card-04'
import StatisticsCard from '@/components/shadcn-studio/blocks/statistics-card-03'
import BmHierarchyCard from '@/components/shadcn-studio/blocks/bm-hierarchy-card'

import HeroGridBg from '@/components/shadcn-studio/blocks/hero-clone/hero-grid-bg'
import { HERO_SECTION_WORDS as words } from '@/data/landing-hero'

type AvatarItem = {
  src: string
  fallback: string
  name: string
}

interface HeroSectionProps {
  avatars: AvatarItem[]
  heading?: string
  subheading?: React.ReactNode
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  card1?: React.ReactNode
  card2?: React.ReactNode
  card3?: React.ReactNode
}

const HeroSection = ({
  avatars,
  heading = 'Buy Meta Business Manager',
  subheading,
  primaryCta = { label: 'Get Your BM Today', href: '/#pricing' },
  secondaryCta = { label: 'Talk to Support', href: 'https://t.me/GoAdsSupport' },
  card1,
  card2,
  card3,
}: HeroSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRef1 = useRef<HTMLDivElement>(null)
  const cardRef2 = useRef<HTMLDivElement>(null)
  const chartRef = useRef<HTMLDivElement>(null)
  const span1Ref = useRef<HTMLSpanElement>(null)
  const span2Ref = useRef<HTMLSpanElement>(null)
  const span3Ref = useRef<HTMLSpanElement>(null)

  return (
    <section className='relative flex-1 overflow-hidden'>
      <HeroGridBg />
      <div className='relative z-10 mx-auto flex h-full max-w-[1416px] flex-col px-4 pt-4 pb-8 sm:pt-6 sm:pb-16 lg:px-6 lg:pt-8 lg:pb-24'>
        <div className='relative grid grid-cols-1 gap-12 max-xl:justify-center sm:gap-16 lg:gap-24 xl:grid-cols-2'>
          <div className='space-y-32 p-8'>
            <div className='flex flex-col justify-center gap-6 max-xl:items-center max-xl:text-center md:max-xl:mx-auto md:max-xl:max-w-150'>
              <MotionPreset
                fade
                slide
                transition={{ duration: 0.5 }}
                className='bg-muted flex w-fit items-center gap-2.5 rounded-full border px-2 py-1'
              >
                <span className='bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs font-medium'>
                  Trusted Platform
                </span>
                <span className='text-muted-foreground'>5+ years serving 500+ advertisers</span>
              </MotionPreset>
              <MotionPreset fade slide={{ offset: 50 }} blur transition={{ duration: 0.5 }} delay={0.3}>
                <h1 className='inline max-w-3xl text-3xl leading-[1.29167] font-bold sm:text-4xl lg:text-5xl'>
                  {heading}
                </h1>
              </MotionPreset>
              <MotionPreset fade slide={{ offset: 50 }} blur transition={{ duration: 0.5 }} delay={0.5}>
                <p className='text-muted-foreground text-xl'>
                  {subheading ?? (<>Stop worrying about BM restrictions and unstable assets. GoAds provides <strong>high-quality Meta Business Managers ready for scaling</strong>, trusted by agencies and media buyers worldwide.</>)}
                </p>
              </MotionPreset>
              <MotionPreset
                component='div'
                fade
                slide={{ offset: 50 }}
                blur
                transition={{ duration: 0.5 }}
                delay={0.7}
                className='flex flex-wrap items-center gap-4 max-sm:flex-col'
              >
                <Button
                  asChild
                  size='lg'
                  className='relative w-fit overflow-hidden rounded-full text-base before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-[position:-100%_0,0_0] has-[>svg]:px-6 dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.2)_50%,transparent_75%,transparent_100%)]'
                >
                  <a href={primaryCta.href}>
                    {primaryCta.label}
                    <RocketIcon />
                  </a>
                </Button>
                <Button asChild variant='outline' className='rounded-full text-base has-[>svg]:px-6' size='lg'>
                  <a href={secondaryCta.href} target='_blank' rel='noopener noreferrer'>
                    {secondaryCta.label}
                    <MessageSquareMoreIcon />
                  </a>
                </Button>
              </MotionPreset>
              <MotionPreset
                component='div'
                fade
                slide={{ offset: 50 }}
                blur
                transition={{ duration: 0.5 }}
                delay={0.8}
                className='mt-4 flex items-center gap-6 max-sm:flex-col max-sm:justify-center max-sm:text-center'
              >
                <div className='flex -space-x-2'>
                  {avatars.map((avatar, index) => (
                    <Avatar
                      key={index}
                      className='ring-background size-12 ring-2 transition-all duration-300 ease-in-out hover:z-1 hover:-translate-y-1 hover:shadow-md'
                    >
                      <AvatarImage src={avatar.src} alt={avatar.name} />
                      <AvatarFallback className='text-xs'>{avatar.fallback}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>

                <div>
                  <p className='text-sm'>Rated <strong>4.9★ by 500+ clients</strong></p>
                  <Rating
                    readOnly
                    variant='yellow'
                    size={24}
                    value={4.9}
                    precision={0.1}
                    className='max-sm:justify-center'
                  />
                </div>
              </MotionPreset>
            </div>
            <div className='space-y-3.5 px-4 py-2'>
              <MotionPreset
                component='p'
                fade
                slide={{ direction: 'down', offset: 50 }}
                delay={0.8}
                transition={{ duration: 0.5 }}
                className='text-muted-foreground'
              >
                Trusted by advertisers in <strong>30+ countries</strong>
              </MotionPreset>
              <MotionPreset
                fade
                slide={{ direction: 'down', offset: 50 }}
                delay={0.9}
                transition={{ duration: 0.5 }}
                className='relative'
              >
                <div className='from-background pointer-events-none absolute inset-y-0 left-0 z-1 w-15 bg-gradient-to-r via-85% to-transparent' />
                <div className='from-background pointer-events-none absolute inset-y-0 right-0 z-1 w-15 bg-gradient-to-l via-85% to-transparent' />
                <div className='flex flex-wrap items-center gap-x-8 gap-y-3 py-2'>
                  <span className='text-muted-foreground text-sm font-medium'>Meta Partner</span>
                  <span className='text-muted-foreground text-sm font-medium'>Google Whitelisted</span>
                  <span className='text-muted-foreground text-sm font-medium'>TikTok Verified</span>
                  <span className='text-muted-foreground text-sm font-medium'>7-Day Warranty</span>
                  <span className='text-muted-foreground text-sm font-medium'>97% Stability Rate</span>
                </div>
              </MotionPreset>
            </div>
          </div>
          <div ref={containerRef} className='relative flex flex-col items-center justify-center px-8'>
            <HeroSvg className='absolute -inset-y-9 -z-1 max-md:hidden xl:inset-y-0' />
            <div className='mb-14 grid w-full grid-cols-1 gap-10 px-2 pt-2 max-xl:max-w-140 md:mb-7 md:grid-cols-2'>
              <div ref={cardRef1} className='relative'>
                {card1 ?? (
                  <StatisticsCard
                    title='Statistics'
                    badgeContent='Last 6 months'
                    value='$13.4k'
                    changePercentage='+38%'
                    icon={<TicketCheckIcon />}
                    trend='up'
                    className='h-full gap-2 py-3'
                  />
                )}
                <div className='bg-background absolute -inset-2 -z-1 rounded-xl border'>
                  <BorderBeam duration={15} size={60} colorFrom='var(--primary)' colorTo='var(--primary)' />
                </div>
              </div>
              <div ref={cardRef2} className='relative'>
                {card2 ?? (
                  <RatingsCard
                    title='Customers'
                    badgeContent='Daily customers'
                    value='42.4k'
                    changePercentage={9.2}
                    svg={<CustomersCardSvg />}
                    className='h-full'
                  />
                )}
                <div className='bg-background absolute -inset-2 -z-1 rounded-xl border'>
                  <BorderBeam duration={15} size={60} colorFrom='var(--primary)' colorTo='var(--primary)' />
                </div>
              </div>
            </div>
            <div className='mb-7 flex items-center gap-36 max-md:hidden xl:gap-34'>
              <span ref={span1Ref} className='size-0.5' />
              <span ref={span2Ref} className='size-0.5' />
              <span ref={span3Ref} className='size-0.5' />
            </div>
            <div ref={chartRef} className='flex w-full items-center justify-center px-2'>
              <div className='relative w-fit'>
                {card3 ?? <BmHierarchyCard className='sm:w-full sm:max-w-100' />}
                <div className='bg-background absolute -inset-2 -z-1 rounded-xl border'>
                  <BorderBeam duration={15} size={60} colorFrom='var(--primary)' colorTo='var(--primary)' />
                </div>
                <span className='bg-background absolute -top-1.5 left-1/2 size-1.5 -translate-x-1/2' />
              </div>
            </div>
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={cardRef1}
              toRef={span1Ref}
              gradientStartColor='var(--primary)'
              duration={4.5}
              className='-z-1 max-md:hidden'
              startYOffset={90}
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={cardRef2}
              toRef={span3Ref}
              gradientStartColor='var(--primary)'
              duration={4.5}
              className='-z-1 max-md:hidden'
              startYOffset={90}
              reverse
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={span1Ref}
              toRef={span2Ref}
              gradientStartColor='var(--primary)'
              duration={4.5}
              className='-z-1 max-md:hidden'
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={span3Ref}
              toRef={span2Ref}
              gradientStartColor='var(--primary)'
              duration={4.5}
              className='-z-1 max-md:hidden'
              reverse
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={span2Ref}
              toRef={chartRef}
              gradientStartColor='var(--primary)'
              duration={4.5}
              className='-z-1 max-md:hidden'
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
