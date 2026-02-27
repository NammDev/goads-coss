import type { ComponentType } from 'react'

import { ChevronRightIcon } from 'lucide-react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MotionPreset } from '@/components/ui/motion-preset'

type FAQ = {
  question: string
  answer: string
}[]

type FAQTab = {
  value: string
  label: string
  icon: ComponentType
  faqs: FAQ
}[]

const FAQ = ({ tabsData }: { tabsData: FAQTab }) => {
  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      <div className='container space-y-12 sm:space-y-16'>
        {/* FAQ Header */}
        <div className='flex flex-col items-center gap-4 text-center'>
          <MotionPreset fade slide={{ direction: 'down' }} transition={{ duration: 0.5 }} inView>
            <span className='font-medium underline underline-offset-6'>FAQ</span>
          </MotionPreset>
          <MotionPreset fade slide={{ direction: 'down' }} transition={{ duration: 0.5 }} delay={0.1} inView>
            <h2 className='text-2xl font-semibold sm:text-3xl lg:text-4xl'>
              Got{' '}
              <span className='relative font-bold'>
                Questions?
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
              </span>
            </h2>
          </MotionPreset>
          <MotionPreset fade slide={{ direction: 'down' }} transition={{ duration: 0.5 }} delay={0.2} inView>
            <p className='text-muted-foreground max-w-2xl text-lg'>
              Everything you need to know about GoAds accounts, warranties, and support.
            </p>
          </MotionPreset>
        </div>

        <MotionPreset fade slide={{ direction: 'up' }} transition={{ duration: 0.5 }} delay={0.3} inView>
          <Tabs defaultValue={tabsData[0]?.value} orientation='vertical'>
            <div className='grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3'>
              {/* Vertical Tabs List */}
              <TabsList className='h-max w-full flex-col gap-2 bg-transparent p-0'>
                {tabsData.map(tab => {
                  const IconComponent = tab.icon

                  return (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className='data-[state=active]:bg-primary/10 data-[state=active]:text-primary dark:data-[state=active]:text-primary dark:data-[state=active]:bg-primary/10 border-border data-[state=active]:border-primary/20 dark:data-[state=active]:border-primary/20 bg-background w-full gap-2 rounded-lg px-6 py-2.5 text-base data-[state=active]:shadow-none [&>svg]:size-4'
                    >
                      <IconComponent />
                      <span className='flex-1 text-start'>{tab.label}</span>
                      <ChevronRightIcon className='size-4 rtl:rotate-180' />
                    </TabsTrigger>
                  )
                })}
              </TabsList>

              {/* Tab Content */}
              <div className='lg:col-span-2'>
                {tabsData.map(tab => (
                  <TabsContent key={tab.value} value={tab.value} className='mt-0'>
                    <Accordion type='single' collapsible className='w-full rounded-lg border' defaultValue='item-1'>
                      {tab.faqs.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index + 1}`}>
                          <AccordionTrigger className='px-5 text-base'>{item.question}</AccordionTrigger>
                          <AccordionContent className='text-muted-foreground px-5 text-base'>
                            {item.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </TabsContent>
                ))}
              </div>
            </div>
          </Tabs>
        </MotionPreset>
      </div>
    </section>
  )
}

export default FAQ
