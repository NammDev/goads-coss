import { ShoppingBagIcon, MegaphoneIcon, VideoIcon } from 'lucide-react'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TikTokLogo } from '@/assets/svg/ad-platform-logos'

interface TikTokHeroCardProps {
  className?: string
}

const accountTypes = [
  { Icon: ShoppingBagIcon, label: 'TikTok Shop' },
  { Icon: MegaphoneIcon, label: 'Ads Account' },
  { Icon: VideoIcon, label: 'Channel' },
]

const TikTokHeroCard = ({ className }: TikTokHeroCardProps) => {
  return (
    <Card className={`bg-card border-border flex flex-col gap-4 p-5 ${className ?? ''}`}>
      {/* Top: branded header */}
      <div className='bg-primary/10 border-primary/30 relative flex w-full flex-col items-center gap-3 rounded-xl border px-5 py-5'>
        <Badge variant="outline" className='border-primary/40 text-primary absolute -top-2.5 right-3 gap-1 text-[10px]'>
          Verified
        </Badge>
        <div className='bg-primary flex size-11 items-center justify-center rounded-xl'>
          <TikTokLogo className='text-primary-foreground size-6' />
        </div>
        <div className='text-center'>
          <p className='text-base font-bold'>TikTok Assets</p>
          <p className='text-muted-foreground mt-0.5 text-xs'>Verified Accounts</p>
        </div>
      </div>

      {/* Middle: account type rows */}
      <div className='flex flex-col gap-2'>
        {accountTypes.map(({ Icon, label }) => (
          <div key={label} className='bg-muted/50 border-border flex items-center gap-3 rounded-lg border px-3 py-2.5'>
            <Icon className='text-primary size-4 shrink-0' />
            <span className='text-sm font-medium flex-1'>{label}</span>
            <span className='size-2 rounded-full bg-green-500 shrink-0' />
          </div>
        ))}
      </div>

      {/* Bottom: divider + count */}
      <div className='flex w-full items-center gap-2'>
        <div className='bg-primary/20 h-px flex-1 rounded' />
        <span className='text-muted-foreground text-[10px]'>5 account types available</span>
        <div className='bg-primary/20 h-px flex-1 rounded' />
      </div>
    </Card>
  )
}

export default TikTokHeroCard
