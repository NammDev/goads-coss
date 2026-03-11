import type { JSX } from 'react'

import Image from 'next/image'
import { MessageCircleIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface TabData {
  name: string
  value: string
  content: JSX.Element
}

type AboutUsData = {
  contentTitle: string
  contentDescription: string
  tabs: TabData[]
}

const AboutUs = ({ aboutUsData }: { aboutUsData: AboutUsData }) => {
  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-[1416px] px-4 lg:px-6'>
  

        <div className='grid items-center gap-8 lg:gap-16 lg:grid-cols-2'>
          <div className='space-y-6'>
            <h3 className='text-xl font-semibold'>{aboutUsData.contentTitle}</h3>
            <p className='text-muted-foreground'>{aboutUsData.contentDescription}</p>

            <Separator />

            <Tabs defaultValue='vision' className='gap-6'>
              <TabsList>
                {aboutUsData.tabs.map(tab => (
                  <TabsTrigger key={tab.value} value={tab.value}>
                    {tab.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {aboutUsData.tabs.map(tab => (
                <TabsContent key={tab.value} value={tab.value}>
                  {tab.content}
                </TabsContent>
              ))}
            </Tabs>
          </div>

          <div className='flex justify-center pb-8 lg:justify-end'>
            <div className='bg-primary/10 relative flex max-w-112 items-end rounded-tl-[60px] rounded-tr-xl'>
              <Image
                src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/about-us/image-17.png'
                alt='About us illustration'
                width={448}
                height={500}
                className='w-full'
              />
              <div className='absolute -bottom-8 left-0 sm:-left-15'>
                <Image
                  src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/about-us/image-7.png'
                  alt='About us card'
                  width={176}
                  height={120}
                  className='max-w-44 dark:invert'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUs
