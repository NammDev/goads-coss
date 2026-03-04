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
          label='Agency Ad Accounts'
          heading='Premium accounts built for scale'
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
              <h3 className='text-2xl font-semibold'>Verified agency accounts</h3>
              <p className='text-muted-foreground text-sm'>
                Every account is created under official agency Business Managers with high trust scores — ready to run ads from day one.
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
              <h3 className='text-2xl font-semibold'>Track ad spend performance</h3>
              <p className='text-muted-foreground text-sm'>
                Monitor your account health, daily spend limits, and campaign metrics — all in one clear dashboard.
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
              <h3 className='text-2xl font-semibold'>Trusted by top brands</h3>
              <p className='text-muted-foreground text-sm'>
                Join 500+ agencies and e-commerce brands already scaling their ad campaigns with GoAds infrastructure.
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
              <h3 className='text-2xl font-semibold'>Real-time account updates</h3>
              <p className='text-muted-foreground text-sm'>
                Get instant notifications on account status, payment confirmations, and delivery updates — never miss a thing.
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
              <h3 className='text-2xl font-semibold'>Fast delivery, tracked end-to-end</h3>
              <p className='text-muted-foreground text-sm'>
                Most accounts delivered within 1–4 hours. Track every step from order to account handoff in real time.
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
              <h3 className='text-2xl font-semibold'>7-day warranty on every account</h3>
              <p className='text-muted-foreground text-sm'>
                If anything goes wrong within 7 days, we replace your account at no extra cost. No questions asked, no lengthy tickets — just instant support.
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
