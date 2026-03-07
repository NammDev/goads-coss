'use client'

import { BuildingIcon, ShieldCheckIcon } from 'lucide-react'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MetaLogo, InstagramLogo, WhatsAppLogo } from '@/assets/svg/ad-platform-logos'

interface BmHierarchyCardProps {
  className?: string
}

const subCards = [
  { label: 'Facebook Ads', Logo: MetaLogo },
  { label: 'Instagram Ads', Logo: InstagramLogo },
  { label: 'WhatsApp Ads', Logo: WhatsAppLogo },
]

const BmHierarchyCard = ({ className }: BmHierarchyCardProps) => {
  return (
    <Card className={`bg-card border-border flex flex-col items-center gap-0 p-5 ${className ?? ''}`}>
      {/* BM root card — prominent, branded */}
      <div className='bg-primary/10 border-primary/30 relative flex w-full flex-col items-center gap-3 rounded-xl border px-5 py-5'>
        <Badge variant="outline" className='border-primary/40 text-primary absolute -top-2.5 right-3 gap-1 text-[10px]'>
          <ShieldCheckIcon className='size-3' />
          Verified
        </Badge>
        <div className='bg-primary flex size-11 items-center justify-center rounded-xl'>
          <BuildingIcon className='text-primary-foreground size-5' />
        </div>
        <div className='text-center'>
          <p className='text-base font-bold'>Business Manager</p>
          <p className='text-muted-foreground mt-0.5 text-xs'>Manage Pages, Profiles & Ad Accounts</p>
        </div>
      </div>

      {/* Dashed connector trunk */}
      <div className='border-border h-6 w-px border-l border-dashed' />

      {/* Horizontal crossbar + sub-cards */}
      <div className='relative flex w-full items-start justify-between gap-3'>
        <div className='border-border absolute top-0 left-[calc(1/6*100%)] right-[calc(1/6*100%)] border-t border-dashed' />

        {subCards.map(({ label, Logo }) => (
          <div key={label} className='flex flex-1 flex-col items-center gap-0'>
            <div className='border-border h-5 w-px border-l border-dashed' />
            <div className='bg-muted/50 border-border flex w-full flex-col items-center gap-2 rounded-lg border px-3 py-3'>
              <Logo className='size-6' />
              <span className='text-muted-foreground text-center text-[11px] font-medium leading-tight'>{label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Extra bottom padding to match original chart card height */}
      <div className='mt-4 flex w-full items-center justify-center gap-2'>
        <div className='bg-primary/20 h-px flex-1 rounded' />
        <span className='text-muted-foreground text-[10px]'>3 platforms connected</span>
        <div className='bg-primary/20 h-px flex-1 rounded' />
      </div>
    </Card>
  )
}

export default BmHierarchyCard
