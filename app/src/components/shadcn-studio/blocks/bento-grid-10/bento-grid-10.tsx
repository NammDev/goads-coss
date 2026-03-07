import { BotMessageSquareIcon, FileCode2Icon, PaletteIcon, Table2Icon } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { MotionPreset } from '@/components/ui/motion-preset'
import { Orbiting } from '@/components/ui/orbiting'
import { SectionHeader } from '@/components/section-header'

import CommitItem from '@/components/shadcn-studio/blocks/bento-grid-10/commit-item'
import CardAskPlainLanguage from '@/components/shadcn-studio/blocks/bento-grid-10/card-ask-plain-language'
import CardParticles from '@/components/shadcn-studio/blocks/bento-grid-10/card-particles'

import Logo from '@/assets/svg/logo'
import { MetaLogo, GoogleLogo, TikTokLogo, InstagramLogo, BingLogo, YouTubeLogo } from '@/assets/svg/ad-platform-logos'

const BentoGrid = () => {
  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      <div className='container space-y-12 sm:space-y-16'>
        <SectionHeader
          label='Meta Assets'
          heading='Everything you need to run ads at scale'
          description='Business Managers, Pages, Profiles, and verified assets — fully set up and ready to power your campaigns across Meta platforms.'
        />
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-5'>
        <MotionPreset
          fade
          blur
          slide={{ direction: 'down', offset: 75 }}
          transition={{ duration: 0.45 }}
          className='overflow-hidden lg:col-span-2'
        >
          <Card className='bg-card h-full gap-10 overflow-hidden border-0 pt-0'>
            <MotionPreset
              fade
              slide={{ direction: 'down', offset: 50 }}
              delay={0.1}
              transition={{ duration: 0.45 }}
              className='relative flex h-80 justify-center overflow-hidden'
            >
              <div className='relative flex size-151 flex-col items-center justify-center'>
                <Orbiting duration={30} radius={280}>
                  <span className='bg-card grid size-11 place-content-center overflow-hidden rounded-full'>
                    <MetaLogo className='size-7' />
                  </span>
                  <span className='bg-card grid size-11 place-content-center overflow-hidden rounded-full'>
                    <GoogleLogo className='size-7' />
                  </span>
                  <span className='bg-card grid size-11 place-content-center overflow-hidden rounded-full'>
                    <TikTokLogo className='size-7' />
                  </span>
                  <span className='bg-card grid size-11 place-content-center overflow-hidden rounded-full'>
                    <InstagramLogo className='size-7' />
                  </span>
                </Orbiting>
                <Orbiting duration={30} radius={220} reverse speed={1.33}>
                  <span className='bg-card grid size-11 place-content-center overflow-hidden rounded-full'>
                    <BingLogo className='size-7' />
                  </span>
                  <span className='bg-card grid size-11 place-content-center overflow-hidden rounded-full'>
                    <YouTubeLogo className='size-7' />
                  </span>
                  <span className='bg-card grid size-11 place-content-center overflow-hidden rounded-full'>
                    <BingLogo className='size-7' />
                  </span>
                  <span className='bg-card grid size-11 place-content-center overflow-hidden rounded-full'>
                    <YouTubeLogo className='size-7' />
                  </span>
                </Orbiting>
                <Orbiting duration={30} radius={160} speed={1.67}>
                  <span className='bg-card grid size-11 place-content-center overflow-hidden rounded-full'>
                    <MetaLogo className='size-7' />
                  </span>
                  <span className='bg-card grid size-11 place-content-center overflow-hidden rounded-full'>
                    <TikTokLogo className='size-7' />
                  </span>
                  <span className='bg-card grid size-11 place-content-center overflow-hidden rounded-full'>
                    <MetaLogo className='size-7' />
                  </span>
                  <span className='bg-card grid size-11 place-content-center overflow-hidden rounded-full'>
                    <TikTokLogo className='size-7' />
                  </span>
                </Orbiting>
                <Orbiting duration={30} radius={100} reverse speed={2}>
                  <span className='bg-card grid size-11 place-content-center overflow-hidden rounded-full'>
                    <GoogleLogo className='size-7' />
                  </span>
                  <span className='bg-card grid size-11 place-content-center overflow-hidden rounded-full'>
                    <InstagramLogo className='size-7' />
                  </span>
                </Orbiting>

                <Logo className='absolute top-1/2 left-1/2 z-10 size-16 -translate-x-1/2 -translate-y-[calc(50%+1rem)]' />
              </div>
              <div className='from-card pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-20% to-transparent' />
              <div className='from-card pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l to-transparent' />
              <div className='from-card pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-20% to-transparent' />
              <div className='from-card pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r to-transparent' />
            </MotionPreset>
            <CardHeader className='gap-4'>
              <MotionPreset fade slide={{ direction: 'down', offset: 50 }} delay={0.25} transition={{ duration: 0.45 }}>
                <CardTitle className='text-2xl font-semibold'>Everything advertisers need in one place</CardTitle>
              </MotionPreset>
              <MotionPreset fade slide={{ direction: 'down', offset: 50 }} delay={0.4} transition={{ duration: 0.45 }}>
                <CardDescription className='text-sm'>
                  Business Managers, profiles, pages, and verified identities for Meta and TikTok advertising. GoAds provides a complete asset ecosystem so advertisers and agencies can launch and scale campaigns without worrying about infrastructure.
                </CardDescription>
              </MotionPreset>
            </CardHeader>
          </Card>
        </MotionPreset>

        <MotionPreset
          fade
          blur
          slide={{ direction: 'down', offset: 75 }}
          delay={0.2}
          transition={{ duration: 0.45 }}
          className='overflow-hidden lg:col-span-3'
        >
          <Card className='bg-card h-full border-0'>
            <CardContent className='flex-1 px-4'>
              <ScrollArea className='relative'>
                <div className='flex gap-6 px-1 py-7 max-md:flex-col'>
                  <MotionPreset
                    fade
                    slide={{ direction: 'down', offset: 50 }}
                    delay={0.3}
                    transition={{ duration: 0.45 }}
                    className='flex-1'
                  >
                    <Card className='h-full min-w-52 shadow-lg'>
                      <CardContent className='flex flex-col items-start gap-4'>
                        <MetaLogo className='size-7' />
                        <div className='bg-muted flex items-center gap-3 rounded-sm p-2'>
                          <Table2Icon className='size-5 shrink-0' />
                          <span>Verified Asset</span>
                        </div>
                        <div className='bg-muted flex items-center gap-3 rounded-sm p-2'>
                          <Table2Icon className='size-5 shrink-0' />
                          <span>Aged reinstated Asset</span>
                        </div>
                        <div className='bg-muted flex items-center gap-3 rounded-sm p-2'>
                          <Table2Icon className='size-5 shrink-0' />
                          <span>Service variety</span>
                        </div>
                      </CardContent>
                    </Card>
                  </MotionPreset>
                  <MotionPreset
                    fade
                    slide={{ direction: 'down', offset: 50 }}
                    delay={0.45}
                    transition={{ duration: 0.45 }}
                    className='flex-1'
                  >
                    <Card className='h-full min-w-52 pb-0 shadow-lg'>
                      <CardContent className='flex flex-1 flex-col gap-4 px-4'>
                        <div className='flex gap-2'>
                          <TikTokLogo className='size-7' />
                          <GoogleLogo className='size-7' />
                        </div>
                        <div className='relative flex h-full max-h-46 flex-col gap-4 overflow-hidden pt-4 pl-7.5'>
                          <span className='bg-border absolute inset-y-0 left-2.75 w-0.5 rounded-full' />
                          <CommitItem message='Flexible payment options' />
                          <CommitItem message='Committed to customer trust' />
                          <div className='from-card absolute inset-x-0 top-0 h-4 bg-gradient-to-b to-transparent' />
                          <div className='from-card absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t to-transparent' />
                        </div>
                      </CardContent>
                    </Card>
                  </MotionPreset>
                  <MotionPreset
                    fade
                    slide={{ direction: 'down', offset: 50 }}
                    delay={0.6}
                    transition={{ duration: 0.45 }}
                    className='flex-1'
                  >
                    <Card className='h-full min-w-52 overflow-hidden shadow-lg'>
                      <CardContent className='flex h-full flex-col gap-4'>
                        <div className='flex gap-2'>
                          <MetaLogo className='size-7' />
                          <GoogleLogo className='size-7' />
                          <TikTokLogo className='size-7' />
                        </div>
                        <div className='grid h-full place-content-center'>
                          <div className='relative z-1 flex h-full flex-col items-center justify-center'>
                            <span className='bg-muted absolute top-1/2 left-0 grid size-9 -translate-x-full -translate-y-1/2 place-content-center rounded-sm'>
                              <PaletteIcon className='size-5 shrink-0' />
                              <span className='outline-border bg-primary absolute top-1/2 right-0 size-1.5 translate-x-1/2 -translate-y-1/2 rounded-full outline-1 outline-offset-1' />
                            </span>
                            <svg
                              width='80'
                              height='45'
                              viewBox='0 0 80 45'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M0.5 44.5H11.5941C18.9211 44.5 25.7672 40.8523 29.854 34.771L46.3467 10.2289C50.4335 4.14757 57.2796 0.499893 64.6066 0.499893H79.5007'
                                stroke='var(--border)'
                                strokeLinecap='round'
                              />
                            </svg>
                            <svg
                              width='80'
                              height='45'
                              viewBox='0 0 80 45'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                              className='-z-1 rotate-x-180'
                            >
                              <path
                                d='M0.5 44.5H11.5941C18.9211 44.5 25.7672 40.8523 29.854 34.771L46.3467 10.2289C50.4335 4.14757 57.2796 0.499893 64.6066 0.499893H79.5007'
                                stroke='var(--border)'
                                strokeLinecap='round'
                              />
                            </svg>
                            <span className='bg-muted absolute top-0 right-0 grid size-9 translate-x-full -translate-y-1/2 place-content-center rounded-sm'>
                              <BotMessageSquareIcon className='size-5 shrink-0' />
                              <span className='outline-border bg-primary absolute top-1/2 left-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full outline-1 outline-offset-1' />
                              <span className='outline-border bg-primary absolute top-1/2 right-0 size-1.5 translate-x-1/2 -translate-y-1/2 rounded-full outline-1 outline-offset-1' />
                              <span className='bg-border absolute top-1/2 right-0 -z-1 h-px w-8 translate-x-full -translate-y-1/2' />
                            </span>
                            <span className='bg-muted absolute right-0 bottom-0 grid size-9 translate-x-full translate-y-1/2 place-content-center rounded-sm'>
                              <FileCode2Icon className='size-5 shrink-0' />
                              <span className='outline-border bg-primary absolute top-1/2 left-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full outline-1 outline-offset-1' />
                              <span className='outline-border bg-primary absolute top-1/2 right-0 size-1.5 translate-x-1/2 -translate-y-1/2 rounded-full outline-1 outline-offset-1' />
                              <span className='bg-border absolute top-1/2 right-0 -z-1 h-px w-8 translate-x-full -translate-y-1/2' />
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </MotionPreset>
                  <div className='from-card pointer-events-none absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r to-transparent lg:max-xl:block' />
                  <div className='from-card pointer-events-none absolute inset-y-0 right-0 hidden w-24 bg-gradient-to-l to-transparent lg:max-xl:block' />
                </div>
                <ScrollBar orientation='horizontal' />
              </ScrollArea>
            </CardContent>
            <CardHeader className='gap-4'>
              <MotionPreset fade slide={{ direction: 'down', offset: 50 }} delay={0.75} transition={{ duration: 0.45 }}>
                <CardTitle className='text-2xl font-semibold'>Built by experts for serious advertisers</CardTitle>
              </MotionPreset>
              <MotionPreset fade slide={{ direction: 'down', offset: 50 }} delay={0.9} transition={{ duration: 0.45 }}>
                <CardDescription className='text-sm'>
                  Every asset is carefully prepared with aged profiles, trusted pages, and hardened Business Managers to maximize stability. Our team continuously tests and improves setups so clients receive high-quality assets designed for long-term campaign performance.
                </CardDescription>
              </MotionPreset>
            </CardHeader>
          </Card>
        </MotionPreset>

        <MotionPreset
          fade
          blur
          slide={{ direction: 'down', offset: 75 }}
          delay={0.4}
          transition={{ duration: 0.45 }}
          className='overflow-hidden lg:col-span-3'
        >
          <CardAskPlainLanguage />
        </MotionPreset>

        <MotionPreset
          fade
          blur
          slide={{ direction: 'down', offset: 75 }}
          delay={0.6}
          transition={{ duration: 0.45 }}
          className='overflow-hidden lg:col-span-2'
        >
          <CardParticles />
        </MotionPreset>
        </div>
      </div>
    </section>
  )
}

export default BentoGrid
