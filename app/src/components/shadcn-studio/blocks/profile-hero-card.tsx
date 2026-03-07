import { BadgeCheckIcon, CalendarIcon, ShieldCheckIcon, ZapIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { MetaLogo } from '@/assets/svg/ad-platform-logos'

interface ProfileHeroCardProps {
  className?: string
}

const stats = [
  { icon: CalendarIcon, label: '7+ yrs' },
  { icon: ShieldCheckIcon, label: 'Verified' },
  { icon: ZapIcon, label: 'Ad Ready' },
]

const ProfileHeroCard = ({ className }: ProfileHeroCardProps) => {
  return (
    <Card className={`bg-card border-border flex flex-col items-center gap-0 p-5 ${className ?? ''}`}>
      {/* Profile avatar section */}
      <div className='bg-primary/10 border-primary/30 relative flex w-full flex-col items-center gap-3 rounded-xl border px-5 py-5'>
        <Badge variant="outline" className='border-primary/40 text-primary absolute -top-2.5 right-3 gap-1 text-[10px]'>
          <ShieldCheckIcon className='size-3' />
          Verified
        </Badge>

        {/* Avatar with gradient + verified overlay */}
        <div className='relative'>
          <div className='size-14 rounded-full bg-gradient-to-br from-primary/70 via-primary to-blue-400 flex items-center justify-center shadow-md'>
            <span className='text-primary-foreground text-xl font-bold select-none'>F</span>
          </div>
          <div className='absolute -bottom-1 -right-1 bg-primary rounded-full p-0.5 shadow'>
            <BadgeCheckIcon className='text-primary-foreground size-4' />
          </div>
        </div>

        <div className='text-center'>
          <p className='text-base font-bold'>Verified Profile</p>
          <p className='text-muted-foreground mt-0.5 text-xs'>Aged &amp; Reinstated</p>
        </div>

        {/* Mini stats row */}
        <div className='flex w-full items-center justify-center gap-1'>
          {stats.map(({ icon: Icon, label }, i) => (
            <div key={label} className='flex items-center gap-1'>
              {i > 0 && <span className='text-border text-xs'>|</span>}
              <div className='flex items-center gap-1'>
                <Icon className='text-primary size-3' />
                <span className='text-muted-foreground text-[11px] font-medium'>{label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className='mt-4 flex w-full items-center justify-center gap-2'>
        <div className='bg-primary/20 h-px flex-1 rounded' />
        <div className='flex items-center gap-1.5'>
          <MetaLogo className='size-4' />
          <span className='text-muted-foreground text-[10px]'>Ready for Advertising</span>
        </div>
        <div className='bg-primary/20 h-px flex-1 rounded' />
      </div>
    </Card>
  )
}

export default ProfileHeroCard
