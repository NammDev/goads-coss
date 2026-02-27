import { ArrowUpRightIcon, MessageSquareMore } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { CraftButton, CraftButtonIcon, CraftButtonLabel } from '@/components/ui/craft-button'
import { MotionPreset } from '@/components/ui/motion-preset'
import { NumberTicker } from '@/components/ui/number-ticker'
import ReviewStack from '@/components/shadcn-studio/blocks/testimonials-component-22/review-stack'
import type { ReviewCard } from '@/components/shadcn-studio/blocks/testimonials-component-22/review-stack'

const TestimonialsComponent = ({ reviews }: { reviews: ReviewCard[] }) => {
  return (
    <section>
      <div className='mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-8 md:px-6 md:py-16 lg:px-8'>
        <div className='space-y-2.5'>
          <MotionPreset fade blur slide={{ direction: 'down', offset: 50 }} transition={{ duration: 0.5 }}>
            <Badge variant='outline' className='rounded-none px-1.5'>
              Testimonials
            </Badge>
          </MotionPreset>
          <div className='flex justify-between gap-4 max-md:flex-col'>
            <h2 className='max-w-100 text-2xl font-semibold sm:text-3xl lg:text-4xl'>
              <MotionPreset
                fade
                blur
                slide={{ direction: 'down', offset: 50 }}
                delay={0.3}
                transition={{ duration: 0.5 }}
              >
                Trusted by clients
              </MotionPreset>
              <MotionPreset
                fade
                blur
                slide={{ direction: 'down', offset: 50 }}
                delay={0.45}
                transition={{ duration: 0.5 }}
              >
                around the globe. 🌍
              </MotionPreset>
            </h2>

            <MotionPreset
              delay={0.3}
              fade
              blur
              slide={{ direction: 'down', offset: 50 }}
              transition={{ duration: 0.5 }}
            >
              <p className='text-muted-foreground max-w-xl text-xl'>
                I&apos;m grateful to collaborate with forward-thinking brands and teams who value design that creates a
                real difference in user experiences and drives business success.
              </p>
            </MotionPreset>
          </div>
        </div>

        <div className='grid gap-9 md:grid-cols-2'>
          <div className='flex flex-col gap-8'>
            <MotionPreset
              component='p'
              delay={0.6}
              fade
              blur
              slide={{ direction: 'down', offset: 50 }}
              transition={{ duration: 0.6 }}
              className='text-muted-foreground text-center text-xl'
            >
              I&apos;m grateful to collaborate with brands and teams .
            </MotionPreset>

            <MotionPreset
              delay={0.75}
              fade
              blur
              slide={{ direction: 'down', offset: 50 }}
              transition={{ duration: 0.6 }}
              className='text-card-foreground grid h-28.5 grid-cols-3 lg:gap-5'
            >
              <div className='flex flex-col items-center justify-center gap-2'>
                <span className='text-xl font-medium'>
                  <NumberTicker startValue={0} value={100} delay={0.8} stiffness={170} />+
                </span>
                <span className='text-muted-foreground text-sm'>Happy Client</span>
              </div>
              <div className='flex flex-col items-center justify-center gap-2 border-x'>
                <span className='text-xl font-medium'>
                  $<NumberTicker startValue={50} value={250} delay={0.8} stiffness={170} />m
                </span>
                <span className='text-muted-foreground text-sm'>Revenue Added</span>
              </div>
              <div className='flex flex-col items-center justify-center gap-2'>
                <span className='text-xl font-medium'>
                  <NumberTicker startValue={0} value={4.8} decimalPlaces={1} delay={0.8} stiffness={170} />
                </span>
                <span className='text-muted-foreground text-sm'>Average Rating</span>
              </div>
            </MotionPreset>

            <MotionPreset
              delay={0.9}
              fade
              blur
              slide={{ direction: 'down', offset: 50 }}
              transition={{ duration: 0.6 }}
              className='flex justify-center gap-4 border-y py-8'
            >
              <Button variant='outline' asChild className='rounded-full !px-4'>
                <a href='#'>
                  Let&apos;s talk
                  <MessageSquareMore />
                </a>
              </Button>
              <Separator orientation='vertical' />
              <CraftButton asChild>
                <a href='#'>
                  <CraftButtonLabel>Hire Me</CraftButtonLabel>
                  <CraftButtonIcon>
                    <ArrowUpRightIcon className='size-3 stroke-2 transition-transform duration-500 group-hover:rotate-45' />
                  </CraftButtonIcon>
                </a>
              </CraftButton>
            </MotionPreset>
          </div>

          <MotionPreset
            delay={1.05}
            fade
            blur
            slide={{ direction: 'down', offset: 50 }}
            transition={{ duration: 0.6 }}
            className='max-md:h-89 md:px-5'
          >
            <ReviewStack reviews={reviews} />
          </MotionPreset>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsComponent
