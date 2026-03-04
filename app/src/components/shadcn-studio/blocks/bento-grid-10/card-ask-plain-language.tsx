'use client'

import Autoplay from 'embla-carousel-autoplay'
import { SparklesIcon } from 'lucide-react'

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { MotionPreset } from '@/components/ui/motion-preset'

import { cn } from '@/lib/utils'
import { BENTO10_CHATS as chats } from '@/data/landing-bento'

const CardAskPlainLanguage = () => {
  return (
    <Card className='bg-card h-full overflow-hidden border-0 pt-0'>
      <MotionPreset fade slide={{ direction: 'down', offset: 50 }} delay={0.5} transition={{ duration: 0.45 }}>
        <Carousel
          opts={{
            align: 'center',
            loop: true,
            slidesToScroll: 1
          }}
          plugins={[Autoplay({ delay: 1500, stopOnInteraction: false })]}
          orientation='vertical'
          className='relative w-full px-4'
        >
          <CarouselContent className='-mt-6 max-h-101'>
            {chats.map((chat, index) => (
              <CarouselItem
                key={index}
                className={cn('flex px-1 pt-6', index % 2 === 0 ? 'justify-start' : 'justify-end')}
              >
                <div className='bg-card flex w-full max-w-4/5 items-start gap-4 rounded-xl p-5 shadow-lg'>
                  <SparklesIcon className='size-6 shrink-0' />
                  <span className='text-lg'>{chat}</span>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className='from-card pointer-events-none absolute inset-x-0 top-0 h-30 bg-gradient-to-b from-10% to-transparent' />
          <div className='from-card pointer-events-none absolute inset-x-0 bottom-0 h-30 bg-gradient-to-t from-10% to-transparent' />
        </Carousel>
      </MotionPreset>
      <CardHeader className='gap-4'>
        <MotionPreset fade slide={{ direction: 'down', offset: 50 }} delay={0.65} transition={{ duration: 0.45 }}>
          <CardTitle className='text-2xl font-semibold'>Personal support for every client</CardTitle>
        </MotionPreset>
        <MotionPreset fade slide={{ direction: 'down', offset: 50 }} delay={0.8} transition={{ duration: 0.45 }}>
          <CardDescription className='text-sm'>
            Every client receives direct support and 1-on-1 assistance throughout the entire process. From selecting the right assets to onboarding and troubleshooting, our team ensures you always have the support needed to keep campaigns running smoothly.
          </CardDescription>
        </MotionPreset>
      </CardHeader>
    </Card>
  )
}

export default CardAskPlainLanguage
