import { MotionPreset } from '@/components/ui/motion-preset'
import { SectionHeader } from '@/components/section-header'

import UserAnalytics from '@/components/shadcn-studio/blocks/bento-grid-19/user-analytics'
import ProductMetrics from '@/components/shadcn-studio/blocks/bento-grid-19/product-metrics'
import CheckOrdersStatus from '@/components/shadcn-studio/blocks/bento-grid-19/check-orders-status'
import EnterpriseCollaboration from '@/components/shadcn-studio/blocks/bento-grid-19/enterprise-collaboration'
import StayInformed from '@/components/shadcn-studio/blocks/bento-grid-19/stay-informed'
import TurnViewersToOrders from '@/components/shadcn-studio/blocks/bento-grid-19/turn-viewers-to-orders'
import ProductManagement from '@/components/shadcn-studio/blocks/bento-grid-19/product-management'

const BentoGrid = () => {
  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      <div className='container space-y-12 sm:space-y-16'>
        <SectionHeader
          label='Premium Agency Ad Accounts'
          heading='Premium ad accounts built for scaling'
          description='Rent verified Meta, Google, and TikTok agency ad accounts with higher trust scores, better approval rates, and unlimited scaling potential.'
        />
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        <div className='grid grid-rows-2 gap-6'>
          <MotionPreset
            fade
            blur
            slide={{ direction: 'down', offset: 75 }}
            transition={{ duration: 0.5 }}
            className='bg-card flex flex-col gap-6 overflow-hidden rounded-xl pb-6'
          >
            <UserAnalytics />
            <div className='space-y-2 px-6'>
              <h3 className='text-2xl font-semibold'>Turn ad stability into customer growth</h3>
              <p className='text-muted-foreground text-sm'>
                With high-trust agency ad accounts, your campaigns run longer and scale faster. That means consistent traffic, more leads, and more customers every day.
              </p>
            </div>
          </MotionPreset>

          <MotionPreset
            fade
            blur
            slide={{ direction: 'down', offset: 75 }}
            delay={0.15}
            transition={{ duration: 0.5 }}
            className='bg-card flex flex-col gap-6 overflow-hidden rounded-xl pb-6'
          >
            <ProductMetrics />
            <div className='space-y-2 px-6'>
              <h3 className='text-2xl font-semibold'>Full control over your ad performance</h3>
              <p className='text-muted-foreground text-sm'>
                Monitor campaign spend, account health, and performance metrics in real time. Our infrastructure helps advertisers scale campaigns while keeping performance stable and predictable.
              </p>
            </div>
          </MotionPreset>
        </div>

        <div className='grid grid-rows-3 gap-6'>
          <MotionPreset
            fade
            blur
            slide={{ direction: 'down', offset: 75 }}
            delay={0.3}
            transition={{ duration: 0.5 }}
            className='bg-card flex flex-col gap-6 overflow-hidden rounded-xl py-6'
          >
            <CheckOrdersStatus />
            <div className='space-y-2 px-6'>
              <h3 className='text-2xl font-semibold'>Scale revenue faster</h3>
              <p className='text-muted-foreground text-sm'>
                Our clients see an average 49% increase in ad spend capacity after switching to agency accounts.
              </p>
            </div>
          </MotionPreset>

          <MotionPreset
            fade
            blur
            slide={{ direction: 'down', offset: 75 }}
            delay={0.45}
            transition={{ duration: 0.5 }}
            className='bg-card flex flex-col overflow-hidden rounded-xl pb-6'
          >
            <EnterpriseCollaboration />
            <div className='space-y-2 px-6'>
              <h3 className='text-2xl font-semibold'>Built for brands that scale</h3>
              <p className='text-muted-foreground text-sm'>
                GoAds sits at the center of your advertising ecosystem — connecting you to every major platform with verified, high-trust infrastructure trusted by advertisers worldwide.
              </p>
            </div>
          </MotionPreset>

          <MotionPreset
            fade
            blur
            slide={{ direction: 'down', offset: 75 }}
            delay={0.6}
            transition={{ duration: 0.5 }}
            className='bg-card flex flex-col gap-6 overflow-hidden rounded-xl pb-6'
          >
            <StayInformed />
            <div className='space-y-2 px-6'>
              <h3 className='text-2xl font-semibold'>Dedicated monitoring & support</h3>
              <p className='text-muted-foreground text-sm'>
                Our team actively monitors account status, delivery, and performance. If any issue appears, we step in immediately so your campaigns keep running without interruption.
              </p>
            </div>
          </MotionPreset>
        </div>

        <div className='grid gap-6 max-md:grid-rows-2 md:max-lg:col-span-2 md:max-lg:grid-cols-2 lg:grid-rows-2'>
          <MotionPreset
            fade
            blur
            slide={{ direction: 'down', offset: 75 }}
            delay={0.75}
            transition={{ duration: 0.5 }}
            className='bg-card flex flex-col gap-6 overflow-hidden rounded-xl pb-6'
          >
            <TurnViewersToOrders />
            <div className='space-y-2 px-6'>
              <h3 className='text-2xl font-semibold'>More conversions. More revenue.</h3>
              <p className='text-muted-foreground text-sm'>
                Stable agency ad accounts keep your campaigns running without interruptions. Reach more buyers, generate more purchases, and scale your revenue consistently.
              </p>
            </div>
          </MotionPreset>

          <MotionPreset
            fade
            blur
            slide={{ direction: 'down', offset: 75 }}
            delay={0.9}
            transition={{ duration: 0.5 }}
            className='bg-card flex flex-col gap-6 overflow-hidden rounded-xl pb-6'
          >
            <ProductManagement />
            <div className='space-y-2 px-6'>
              <h3 className='text-2xl font-semibold'>Replacement guarantee</h3>
              <p className='text-muted-foreground text-sm'>
                If an account encounters unexpected restrictions within the warranty period, we replace it quickly at no extra cost. Your campaigns stay running — no downtime, no unnecessary risk.
              </p>
            </div>
          </MotionPreset>
        </div>
        </div>
      </div>
    </section>
  )
}

export default BentoGrid
