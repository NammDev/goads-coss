import { CheckIcon, XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { MotionPreset } from '@/components/ui/motion-preset'

import { cn } from '@/lib/utils'

type Plan = {
  name: string
  price: string
  buttonText: string
  description: string
  features: {
    title: string
    description: string
    available: boolean
  }[]
  isPopular?: boolean
  highlight?: boolean
}

const Pricing = ({ plans }: { plans: Plan[] }) => {
  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      <div className='container space-y-12 sm:space-y-16'>
        <div className='flex flex-col items-center gap-4 text-center'>
          <MotionPreset fade slide={{ direction: 'down' }} transition={{ duration: 0.5 }} inView>
            <span className='font-medium underline underline-offset-6'>Pricing</span>
          </MotionPreset>
          <MotionPreset fade slide={{ direction: 'down' }} transition={{ duration: 0.5 }} delay={0.1} inView>
            <h2 className='text-2xl font-semibold sm:text-3xl lg:text-4xl'>
              Simple,{' '}
              <span className='relative font-bold'>
                Transparent
                <svg
                  width='453'
                  height='8'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='absolute -bottom-1 left-0 w-full'
                >
                  <path
                    d='M2 6.75068C53.4722 -1.10509 368.533 2.14284 451.5 6.75085'
                    stroke='currentColor'
                    strokeWidth='2.5'
                    strokeLinecap='round'
                  />
                </svg>
              </span>{' '}
              Pricing
            </h2>
          </MotionPreset>
          <MotionPreset fade slide={{ direction: 'down' }} transition={{ duration: 0.5 }} delay={0.2} inView>
            <p className='text-muted-foreground max-w-2xl text-lg'>
              No hidden fees. No long-term contracts. Pick the plan that fits your scale.
            </p>
          </MotionPreset>
        </div>

        <MotionPreset fade slide={{ direction: 'up' }} transition={{ duration: 0.5 }} delay={0.3} inView>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-6'>
            {plans.map((plan, index) => (
              <div key={index} className='flex flex-col gap-4'>
                <Card className={cn('relative overflow-hidden border-none', { 'bg-primary': plan.highlight })}>
                  <CardContent className='flex flex-col gap-6'>
                    <div className='flex flex-col gap-4'>
                      <h3 className={cn('text-3xl font-semibold', { 'text-primary-foreground': plan.highlight })}>
                        {plan.name}
                      </h3>
                      {plan.price === 'Custom' ? (
                        <span className={cn('text-5xl font-bold', { 'text-primary-foreground': plan.highlight })}>
                          {plan.price}
                        </span>
                      ) : (
                        <div className='flex gap-1'>
                          <span className='text-muted-foreground text-lg font-medium'>$</span>
                          <span className={cn('text-5xl font-bold', { 'text-primary-foreground': plan.highlight })}>
                            {plan.price}
                          </span>
                        </div>
                      )}
                      <p
                        className={cn('text-base', {
                          'text-primary-foreground': plan.highlight,
                          'text-muted-foreground': !plan.highlight
                        })}
                      >
                        {plan.description}
                      </p>
                    </div>
                    <Button variant={plan.isPopular ? 'default' : 'secondary'} size='lg' className='w-full rounded-full'>
                      {plan.buttonText}
                    </Button>
                  </CardContent>

                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='99'
                    height='88'
                    viewBox='0 0 99 88'
                    fill='none'
                    className='absolute top-0 right-0'
                  >
                    <path
                      d='M0.175781 2.13478C0.175781 -2.2835 3.7575 -5.86523 8.17578 -5.86523H69.3922C73.8104 -5.86523 77.3922 -2.28351 77.3922 2.13477V79.1935C77.3922 83.6117 73.8105 87.1935 69.3922 87.1935H8.17579C3.75751 87.1935 0.175781 83.6117 0.175781 79.1935V2.13478Z'
                      fill={plan.highlight ? 'var(--background)' : 'var(--primary)'}
                      fillOpacity={plan.highlight ? '0.04' : '0.1'}
                    />
                    <path
                      d='M35.3594 -13.1953C35.3594 -17.6136 38.9411 -21.1953 43.3594 -21.1953H104.576C108.994 -21.1953 112.576 -17.6136 112.576 -13.1953V63.8634C112.576 68.2816 108.994 71.8634 104.576 71.8634H43.3594C38.9411 71.8634 35.3594 68.2817 35.3594 63.8634V-13.1953Z'
                      fill={plan.highlight ? 'var(--background)' : 'var(--primary)'}
                      fillOpacity={plan.highlight ? '0.07' : '0.1'}
                    />
                  </svg>
                </Card>

                <div className='flex flex-col gap-4'>
                  {plan.features.map((feature, i) => (
                    <div key={i}>
                      <div className='flex items-start gap-2 px-1 py-1'>
                        {feature.available ? <CheckIcon className='size-6' /> : <XIcon className='size-6' />}
                        <div>
                          <span className='text-base font-semibold'>{feature.title}: </span>
                          <span className='text-base'>{feature.description}</span>
                        </div>
                      </div>
                      {i < plan.features.length - 1 && <Separator className='bg-border mt-4' />}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </MotionPreset>
      </div>
    </section>
  )
}

export default Pricing
