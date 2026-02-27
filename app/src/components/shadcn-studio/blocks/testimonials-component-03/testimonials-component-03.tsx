import { Marquee } from '@/components/ui/marquee'
import { MotionPreset } from '@/components/ui/motion-preset'

import TestimonialCard from '@/components/shadcn-studio/blocks/testimonials-component-03/testimonial-card'

export type TestimonialItem = {
  name: string
  handle: string
  avatar: string
  rating: number
  title: string
  content: string
  platformName: string
  platformImage: string
}

type TestimonialsComponentProps = {
  title?: string
  subtitle?: string
  description?: string
  testimonials: TestimonialItem[]
}

const TestimonialsComponent = ({
  title = 'Testimonials',
  subtitle = 'The Wall of',
  description = "Here's what advertisers say about scaling with GoAds.",
  testimonials,
}: TestimonialsComponentProps) => {
  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      <div className='container space-y-10 sm:space-y-14'>
        {/* Header */}
        <div className='flex flex-col items-center gap-4 text-center'>
          <span className='font-medium underline underline-offset-6'>{title}</span>
          <h2 className='text-2xl font-semibold sm:text-3xl lg:text-4xl'>
            {subtitle}{' '}
            <span className='relative font-bold'>
              Love
              <svg
                width='453'
                height='8'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='absolute -bottom-0.5 left-0 h-2 w-full rotate-2'
              >
                <path
                  d='M2 6.75068C53.4722 -1.10509 368.533 2.14284 451.5 6.75085'
                  stroke='currentColor'
                  strokeWidth='2.5'
                  strokeLinecap='round'
                />
              </svg>
            </span>
          </h2>
          <p className='text-muted-foreground text-lg'>{description}</p>
        </div>

        {/* Testimonials Marquee */}
        <MotionPreset
          fade
          slide={{ direction: 'down' }}
          delay={0.3}
          transition={{ duration: 0.5 }}
          className='relative grid sm:grid-cols-2 lg:grid-cols-4'
        >
          <div className='from-background absolute top-0 z-1 h-1/3 w-full bg-gradient-to-b to-transparent' />
          <Marquee vertical pauseOnHover delay={0.9} duration={20} gap={1.5} className='h-200'>
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </Marquee>
          <Marquee vertical pauseOnHover delay={0.9} duration={20} gap={1.5} reverse className='h-200 max-sm:hidden'>
            {testimonials.slice(3, 6).map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </Marquee>
          <Marquee vertical pauseOnHover delay={0.9} duration={20} gap={1.5} className='h-200 max-lg:hidden'>
            {testimonials.slice(6, 9).map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </Marquee>
          <Marquee vertical pauseOnHover delay={0.9} duration={20} gap={1.5} reverse className='h-200 max-lg:hidden'>
            {testimonials.slice(9, 12).map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </Marquee>
        </MotionPreset>
      </div>
    </section>
  )
}

export default TestimonialsComponent
