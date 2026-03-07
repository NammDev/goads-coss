import { ShieldCheckIcon, StoreIcon, UsersIcon, ThumbsUpIcon, HeartIcon } from 'lucide-react'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface PageHeroCardProps {
  className?: string
}

const stats = [
  { icon: UsersIcon, label: '10K', sub: 'Followers' },
  { icon: ThumbsUpIcon, label: '8K', sub: 'Likes' },
  { icon: HeartIcon, label: 'Ads', sub: 'Ready' },
]

const PageHeroCard = ({ className }: PageHeroCardProps) => {
  return (
    <Card className={`bg-card border-border flex flex-col items-center gap-0 p-5 ${className ?? ''}`}>
      {/* Page card — cover + avatar + info */}
      <div className='bg-primary/10 border-primary/30 relative flex w-full flex-col gap-0 rounded-xl border overflow-hidden'>
        <Badge variant="outline" className='border-primary/40 text-primary absolute top-2 right-3 gap-1 text-[10px] z-10'>
          <ShieldCheckIcon className='size-3' />
          Verified
        </Badge>

        {/* Cover photo placeholder */}
        <div className='bg-gradient-to-r from-primary/20 to-primary/5 h-10 w-full rounded-t-lg' />

        {/* Avatar + page info */}
        <div className='flex flex-col items-center gap-2 px-5 py-4'>
          <div className='bg-primary -mt-6 flex size-11 items-center justify-center rounded-lg border-2 border-card'>
            <StoreIcon className='text-primary-foreground size-5' />
          </div>
          <div className='text-center'>
            <p className='text-base font-bold'>GoAds Store</p>
            <p className='text-muted-foreground mt-0.5 text-xs'>Digital Services</p>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className='mt-4 flex w-full gap-2'>
        {stats.map(({ icon: Icon, label, sub }) => (
          <div key={sub} className='bg-muted/50 border-border flex flex-1 flex-col items-center gap-1 rounded-lg border px-2 py-3'>
            <Icon className='text-primary size-4' />
            <span className='text-sm font-bold leading-none'>{label}</span>
            <span className='text-muted-foreground text-[10px]'>{sub}</span>
          </div>
        ))}
      </div>

      {/* Bottom footer */}
      <div className='mt-4 flex w-full items-center justify-center gap-2'>
        <div className='bg-primary/20 h-px flex-1 rounded' />
        <span className='text-muted-foreground text-[10px]'>Facebook Page · Ready for Advertising</span>
        <div className='bg-primary/20 h-px flex-1 rounded' />
      </div>
    </Card>
  )
}

export default PageHeroCard
