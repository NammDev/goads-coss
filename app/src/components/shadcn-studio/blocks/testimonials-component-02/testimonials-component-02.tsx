import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Rating } from '@/components/ui/rating'
import { MotionPreset } from '@/components/ui/motion-preset'

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

        {/* Testimonials Grid */}
        <MotionPreset
          fade
          slide={{ direction: 'down' }}
          delay={0.3}
          transition={{ duration: 0.5 }}
        >
          <div className='columns-1 gap-6 sm:columns-2 lg:columns-3'>
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className='mb-6 break-inside-avoid-column border-none shadow-none transition-shadow duration-300 hover:shadow-md'
              >
                <CardContent className='space-y-6'>
                  <div className='flex items-center justify-between gap-3'>
                    <Rating readOnly variant='yellow' size={24} value={testimonial.rating} precision={0.5} />

                    <div className='flex grow justify-end gap-1.5'>
                      <img src={testimonial.platformImage} alt={testimonial.platformName} className='size-5.5' />
                      <span className='text-sm'>{testimonial.platformName}</span>
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <h3 className='text-lg font-semibold'>{testimonial.title}</h3>
                    <p className='text-muted-foreground'>{testimonial.content}</p>
                  </div>
                  <div className='flex items-center gap-3'>
                    <Avatar className='size-12'>
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback className='text-sm'>
                        {testimonial.name
                          .split(' ', 2)
                          .map(n => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className='space-y-0.5'>
                      <h4 className='font-medium'>{testimonial.name}</h4>
                      <p className='text-muted-foreground text-sm'>{testimonial.handle}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </MotionPreset>
      </div>
    </section>
  )
}

export default TestimonialsComponent
