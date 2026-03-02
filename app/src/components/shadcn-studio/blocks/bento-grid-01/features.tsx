'use client'

import { useEffect, useRef } from 'react'

import { FileTextIcon, GemIcon, GiftIcon, Grid2x2CheckIcon, LeafIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AnimatedBeam } from '@/components/ui/animated-beam'
import { MotionPreset } from '@/components/ui/motion-preset'

import IconBG from '@/assets/svg/bento-icon-bg'
import Logo from '@/assets/svg/logo'

const Features = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const span1Ref = useRef<HTMLSpanElement>(null)
  const span2Ref = useRef<HTMLSpanElement>(null)
  const span3Ref = useRef<HTMLSpanElement>(null)
  const span4Ref = useRef<HTMLSpanElement>(null)
  const span5Ref = useRef<HTMLSpanElement>(null)
  const span6Ref = useRef<HTMLSpanElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const all = document.querySelectorAll('.card')

    const handleMouseMove = (ev: MouseEvent) => {
      all.forEach(e => {
        const blob = e.querySelector('.blob') as HTMLElement
        const fblob = e.querySelector('.fake-blob') as HTMLElement

        if (!blob || !fblob) return

        const rec = fblob.getBoundingClientRect()

        blob.style.opacity = '1'

        blob.animate(
          [
            {
              transform: `translate(${
                ev.clientX - rec.left - 24 - rec.width / 2
              }px, ${ev.clientY - rec.top - 24 - rec.height / 2}px)`
            }
          ],
          {
            duration: 300,
            fill: 'forwards'
          }
        )
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
      {/* Free Components & Examples */}
      <MotionPreset fade blur delay={0.9} transition={{ duration: 0.5 }}>
        <div className='bg-foreground/10 card group relative h-full overflow-hidden rounded-xl p-px transition-all duration-300 ease-in-out'>
          <Card className='group-hover:bg-card/90 h-full justify-between border-0 pb-0 shadow-none transition-all duration-300 ease-in-out'>
            <CardContent className='flex flex-col items-center gap-6 text-center'>
              <span className='text-6xl font-bold'>800+</span>
              <h3 className='text-xl font-medium'>Free Components & Examples</h3>
              <p className='text-lg'>
                Hundreds of component examples for all your website needs that meet accessibility criteria.
              </p>
              <Button size='lg' asChild>
                <a href='#'>View Components</a>
              </Button>
            </CardContent>

            <img
              src='https://cdn.shadcnstudio.com/ss-assets/blocks/bento-grid/image-1.png'
              alt='Components Example'
              className='w-full dark:invert'
            />
          </Card>
          <div className='blob bg-primary absolute top-0 left-0 -z-1 size-62.5 rounded-full opacity-0 blur-2xl transition-all duration-300 ease-in-out' />
          <div className='fake-blob absolute top-0 left-0 -z-1 [display:hidden] size-50 rounded-full' />
        </div>
      </MotionPreset>

      {/* Universal Framework Compatibility */}
      <MotionPreset fade blur delay={1} transition={{ duration: 0.5 }}>
        <div className='bg-foreground/10 card group relative h-full overflow-hidden rounded-xl p-px transition-all duration-300 ease-in-out'>
          <Card className='group-hover:bg-card/90 h-full border-0 shadow-none transition-all duration-300 ease-in-out'>
            <CardContent className='flex flex-col items-center gap-6 text-center'>
              <div className='relative'>
                <IconBG />
                <GemIcon className='text-primary absolute top-1/2 left-1/2 size-13.5 -translate-x-1/2 -translate-y-1/2 stroke-1' />
              </div>

              <h3 className='text-xl font-medium'>Universal Framework Compatibility</h3>

              <p className='text-lg'>
                Built on shadcn/ui foundation, seamlessly integrating with React, Next.js, and modern web frameworks.
              </p>

              <div ref={containerRef} className='relative flex size-64 flex-col items-center justify-between'>
                <span
                  ref={span1Ref}
                  className='bg-card z-1 flex size-13 items-center justify-center rounded-full border'
                >
                  <img
                    src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/nextjs-logo.png'
                    alt='Next.js Logo'
                    className='h-7 dark:invert'
                  />
                </span>

                <div className='flex w-full justify-between'>
                  <span
                    ref={span2Ref}
                    className='bg-card z-1 flex size-13 items-center justify-center rounded-full border'
                  >
                    <img
                      src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/vite-logo.png'
                      alt='Vite Logo'
                      className='h-6.5'
                    />
                  </span>
                  <span
                    ref={span3Ref}
                    className='bg-card z-1 flex size-13 items-center justify-center rounded-full border'
                  >
                    <img
                      src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/tailwind-logo.png'
                      alt='Tailwind Logo'
                      className='h-5'
                    />
                  </span>
                </div>

                <div ref={logoRef} className='z-1 flex h-12 items-center justify-center overflow-visible'>
                  <Logo className='size-16' />
                </div>

                <div className='flex w-full justify-between'>
                  <span
                    ref={span4Ref}
                    className='bg-card z-1 flex size-13 items-center justify-center rounded-full border'
                  >
                    <img
                      src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/shadcn-logo.png'
                      alt='Shadcn Logo'
                      className='h-7'
                    />
                  </span>
                  <span
                    ref={span5Ref}
                    className='bg-card z-1 flex size-13 items-center justify-center rounded-full border'
                  >
                    <img
                      src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/motion-logo.png'
                      alt='Motion Logo'
                      className='h-7'
                    />
                  </span>
                </div>

                <span
                  ref={span6Ref}
                  className='bg-card z-1 flex size-13 items-center justify-center rounded-full border'
                >
                  <img
                    src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/react-logo.png'
                    alt='React Logo'
                    className='h-7'
                  />
                </span>

                <AnimatedBeam containerRef={containerRef} fromRef={span1Ref} toRef={logoRef} duration={4.5} />
                <AnimatedBeam
                  containerRef={containerRef}
                  fromRef={span2Ref}
                  toRef={logoRef}
                  duration={4.5}
                  delay={4.75}
                  curvature={-25}
                />
                <AnimatedBeam
                  containerRef={containerRef}
                  fromRef={span3Ref}
                  toRef={logoRef}
                  duration={4.5}
                  delay={1.75}
                  curvature={-25}
                  reverse
                />
                <AnimatedBeam
                  containerRef={containerRef}
                  fromRef={span4Ref}
                  toRef={logoRef}
                  duration={4.5}
                  delay={4}
                  curvature={25}
                />
                <AnimatedBeam
                  containerRef={containerRef}
                  fromRef={span5Ref}
                  toRef={logoRef}
                  duration={4.5}
                  delay={2.5}
                  curvature={25}
                  reverse
                />
                <AnimatedBeam
                  containerRef={containerRef}
                  fromRef={span6Ref}
                  toRef={logoRef}
                  duration={4.5}
                  delay={2.5}
                />
              </div>
            </CardContent>
          </Card>
          <div className='blob bg-primary absolute top-0 left-0 -z-1 size-62.5 rounded-full opacity-0 blur-2xl transition-all duration-300 ease-in-out' />
          <div className='fake-blob absolute top-0 left-0 -z-1 [display:hidden] size-50 rounded-full' />
        </div>
      </MotionPreset>

      {/* Unstyled & Accessible Plugins */}

      <MotionPreset fade blur delay={1.1} transition={{ duration: 0.5 }}>
        <div className='bg-foreground/10 card group relative h-full overflow-hidden rounded-xl p-px transition-all duration-300 ease-in-out'>
          <Card className='group-hover:bg-card/90 h-full justify-between border-0 pb-0 shadow-none transition-all duration-300 ease-in-out'>
            <CardContent className='flex flex-col items-center gap-6 text-center'>
              <div className='relative'>
                <IconBG />
                <LeafIcon className='text-primary absolute top-1/2 left-1/2 size-13.5 -translate-x-1/2 -translate-y-1/2 stroke-1' />
              </div>
              <h3 className='text-xl font-medium'>Unstyled & Accessible Plugins</h3>
              <p className='text-lg'>
                Seamlessly add unstyled, accessible plugins for functionality without sacrificing design.
              </p>
            </CardContent>

            <img
              src='https://cdn.shadcnstudio.com/ss-assets/blocks/bento-grid/image-2.png'
              alt='Unstyled & Accessible Plugins'
              className='w-full dark:invert'
            />
          </Card>
          <div className='blob bg-primary absolute top-0 left-0 -z-1 size-62.5 rounded-full opacity-0 blur-2xl transition-all duration-300 ease-in-out' />
          <div className='fake-blob absolute top-0 left-0 -z-1 [display:hidden] size-50 rounded-full' />
        </div>
      </MotionPreset>

      {/* Ready-to-use Templates */}
      <MotionPreset fade blur delay={1.2} transition={{ duration: 0.5 }}>
        <div className='bg-foreground/10 card group relative h-full overflow-hidden rounded-xl p-px transition-all duration-300 ease-in-out'>
          <Card className='group-hover:bg-card/90 h-full justify-between border-0 pb-0 shadow-none transition-all duration-300 ease-in-out'>
            <CardContent className='flex flex-col items-center gap-6 text-center'>
              <div className='relative'>
                <IconBG />
                <FileTextIcon className='text-primary absolute top-1/2 left-1/2 size-13.5 -translate-x-1/2 -translate-y-1/2 stroke-1' />
              </div>
              <h3 className='text-xl font-medium'>Ready-to-use Templates</h3>
              <p className='text-lg'>Pre-built ready-to-use templates to accelerate your project development.</p>
            </CardContent>

            <div className='relative'>
              <img
                src='https://cdn.shadcnstudio.com/ss-assets/blocks/bento-grid/image-3.png'
                alt='Ready-to-use Templates'
                className='z-1 w-full opacity-40 blur-[3px] dark:grayscale dark:invert'
              />
              <div className='to-primary/10 absolute inset-0 bg-gradient-to-b from-transparent' />
              <span className='text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-medium'>
                Coming Soon!
              </span>
            </div>
          </Card>
          <div className='blob bg-primary absolute top-0 left-0 -z-1 size-62.5 rounded-full opacity-0 blur-2xl transition-all duration-300 ease-in-out' />
          <div className='fake-blob absolute top-0 left-0 -z-1 [display:hidden] size-50 rounded-full' />
        </div>
      </MotionPreset>

      {/* Free Forever */}
      <MotionPreset fade blur delay={1.3} transition={{ duration: 0.5 }}>
        <div className='bg-foreground/10 card group relative h-full overflow-hidden rounded-xl p-px transition-all duration-300 ease-in-out'>
          <Card className='group-hover:bg-card/90 h-full border-0 shadow-none transition-all duration-300 ease-in-out'>
            <CardContent className='flex flex-col items-center gap-6 text-center'>
              <div className='relative'>
                <IconBG />
                <GiftIcon className='text-primary absolute top-1/2 left-1/2 size-13.5 -translate-x-1/2 -translate-y-1/2 stroke-1' />
              </div>
              <h3 className='text-xl font-medium'>Free Forever</h3>
              <p className='text-lg'>Completely free forever, open-source, and built for the community.</p>
              <img
                src='https://cdn.shadcnstudio.com/ss-assets/blocks/bento-grid/image-4.png'
                alt='Free Forever'
                className='w-full max-w-71'
              />
            </CardContent>
          </Card>
          <div className='blob bg-primary absolute top-0 left-0 -z-1 size-62.5 rounded-full opacity-0 blur-2xl transition-all duration-300 ease-in-out' />
          <div className='fake-blob absolute top-0 left-0 -z-1 [display:hidden] size-50 rounded-full' />
        </div>
      </MotionPreset>

      {/* Blocks */}
      <MotionPreset fade blur delay={1.4} transition={{ duration: 0.5 }}>
        <div className='bg-foreground/10 card group relative h-full overflow-hidden rounded-xl p-px transition-all duration-300 ease-in-out'>
          <Card className='group-hover:bg-card/90 h-full justify-between border-0 pb-0 shadow-none transition-all duration-300 ease-in-out'>
            <CardContent className='flex flex-col items-center gap-6 text-center'>
              <div className='relative'>
                <IconBG />
                <Grid2x2CheckIcon className='text-primary absolute top-1/2 left-1/2 size-13.5 -translate-x-1/2 -translate-y-1/2 stroke-1' />
              </div>
              <h3 className='text-xl font-medium'>Blocks</h3>
              <p className='text-lg'>
                Kickstart your project with shadcn/studio&apos;s wide range of shadcn/ui blocks and layouts.
              </p>
            </CardContent>

            <div className='relative'>
              <img
                src='https://cdn.shadcnstudio.com/ss-assets/blocks/bento-grid/image-5.png'
                alt='Ready-to-use Templates'
                className='z-1 w-full opacity-40 blur-[3px] dark:grayscale dark:invert'
              />
              <div className='to-primary/10 absolute inset-0 bg-gradient-to-b from-transparent' />
              <span className='text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-medium'>
                Coming Soon!
              </span>
            </div>
          </Card>
          <div className='blob bg-primary absolute top-0 left-0 -z-1 size-62.5 rounded-full opacity-0 blur-2xl transition-all duration-300 ease-in-out' />
          <div className='fake-blob absolute top-0 left-0 -z-1 [display:hidden] size-50 rounded-full' />
        </div>
      </MotionPreset>
    </div>
  )
}

export default Features
