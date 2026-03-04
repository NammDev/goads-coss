'use client'

import { useState } from 'react'

import { CircleIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'

import { cn } from '@/lib/utils'
import { NumberTicker } from '@/components/ui/number-ticker'

type Plans = {
  name: string
  monthlyPrice: number
  annualPrice: number
  features: string[]
  isPopular?: boolean
}

const Pricing = ({ plans }: { plans: Plans[] }) => {
  const [isAnnual, setIsAnnual] = useState(false)

  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-[1416px] space-y-12 px-4 sm:space-y-16 lg:space-y-24 lg:px-6'>
        <div className='flex flex-col items-center gap-10'>
          <div className='flex flex-col items-center gap-4 text-center'>
            <Badge variant='outline' className='text-sm font-normal'>
              Pricing Detail
            </Badge>
            <h2 className='text-4xl font-semibold'>Choose the right plan for your business</h2>
            <p className='text-muted-foreground text-xl'>All-inclusive pricing. Shop now and save big!</p>
          </div>
          <div className='flex items-center gap-3'>
            <span className='text-foreground text-base font-medium'>Monthly</span>
            <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
            <span className='text-foreground text-base font-medium'>Annually</span>
          </div>
        </div>

        <Card className={'shadow-none'}>
          <CardContent className='grid grid-cols-1 gap-0 md:grid-cols-2 lg:grid-cols-4'>
            {plans.map(plan => {
              const currentPrice = isAnnual ? plan.annualPrice : plan.monthlyPrice
              const isProPlan = plan.isPopular

              return (
                <div
                  key={plan.name}
                  className={cn('flex flex-col gap-8 p-6', { 'bg-muted rounded-[14px] shadow-lg': isProPlan })}
                >
                  <div className='flex flex-col gap-6'>
                    <div
                      className={cn('flex items-center', { 'justify-between': isProPlan, 'justify-start': !isProPlan })}
                    >
                      <h3 className='text-3xl font-bold'>{plan.name}</h3>
                      {isProPlan && <Badge className='bg-primary rounded-lg px-3 py-1'>Popular</Badge>}
                    </div>
                    <div className='flex'>
                      <span className='text-muted-foreground text-lg font-medium'>$</span>
                      <NumberTicker value={currentPrice} className='text-5xl font-bold' />
                      <span className='text-muted-foreground self-end text-lg font-medium'>
                        /{isAnnual ? 'year' : 'month'}
                      </span>
                    </div>
                  </div>

                  <div className='flex flex-col gap-3'>
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className='flex items-start gap-2 py-1'>
                        <CircleIcon className='bg-primary mt-2 size-2 shrink-0 rounded-full' />
                        <p className='text-base'>{feature}</p>
                      </div>
                    ))}
                  </div>

                  <div className='flex flex-1 items-end'>
                    <Button variant={isProPlan ? 'default' : 'secondary'} size='lg' className='w-full'>
                      Choose
                    </Button>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default Pricing
