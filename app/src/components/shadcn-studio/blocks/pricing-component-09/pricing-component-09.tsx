'use client'

import { useState } from 'react'
import { CircleIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

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
  const defaultIdx = plans.findIndex(p => p.isPopular)
  const [selectedIdx, setSelectedIdx] = useState(defaultIdx >= 0 ? defaultIdx : 0)

  return (
    <section className='py-8 sm:py-12'>
      <div className='mx-auto max-w-[1416px] space-y-12 px-4 sm:space-y-16 lg:space-y-24 lg:px-6'>
        <Card className='shadow-none'>
          <CardContent className='grid grid-cols-1 gap-0 md:grid-cols-2 lg:grid-cols-4'>
            {plans.map((plan, idx) => {
              const currentPrice = plan.monthlyPrice
              const isSelected = idx === selectedIdx

              return (
                <div
                  key={plan.name}
                  onClick={() => setSelectedIdx(idx)}
                  className={cn(
                    'flex cursor-pointer flex-col gap-8 p-6 transition-all duration-300',
                    isSelected
                      ? 'bg-muted rounded-[14px] shadow-lg'
                      : 'hover:bg-muted/50 rounded-[14px]'
                  )}
                >
                  <div className='flex flex-col gap-6'>
                    <h3 className='text-3xl font-bold'>{plan.name}</h3>
                    <div className='flex'>
                      {currentPrice > 0 ? (
                        <>
                          <span className='text-muted-foreground text-lg font-medium'>$</span>
                          <NumberTicker value={currentPrice} className='text-5xl font-bold' />
                        </>
                      ) : (
                        <span className='text-5xl font-bold'>Contact</span>
                      )}
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
                    <Button
                      size='lg'
                      variant={isSelected ? 'default' : 'outline'}
                      className={cn(
                        'w-full cursor-pointer',
                        isSelected ? 'btn-mirror-sweep btn-secondary' : 'btn-mirror-sweep btn-tertiary'
                      )}
                    >
                      {currentPrice > 0 ? 'Choose' : 'Contact Sales'}
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
