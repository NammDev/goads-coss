import { BadgeCheckIcon, SparklesIcon, CheckCircleIcon } from 'lucide-react'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MetaLogo, InstagramLogo } from '@/assets/svg/ad-platform-logos'

interface VerificationHeroCardProps {
  className?: string
}

const platforms = [
  { label: 'Facebook', Logo: MetaLogo },
  { label: 'Instagram', Logo: InstagramLogo },
  { label: 'Business Manager', Logo: MetaLogo },
]

const VerificationHeroCard = ({ className }: VerificationHeroCardProps) => {
  return (
    <Card className={`bg-card border-border flex flex-col items-center gap-4 p-5 ${className ?? ''}`}>
      {/* Top: branded verification hero */}
      <div className='bg-primary/10 border-primary/30 relative flex w-full flex-col items-center gap-3 rounded-xl border px-5 py-5'>
        <Badge variant="outline" className='border-primary/40 text-primary absolute -top-2.5 right-3 gap-1 text-[10px]'>
          <SparklesIcon className='size-3' />
          Premium
        </Badge>
        <div className='bg-primary flex size-12 items-center justify-center rounded-xl'>
          <BadgeCheckIcon className='text-primary-foreground size-5' />
        </div>
        <div className='text-center'>
          <p className='text-base font-bold'>Blue Badge Verification</p>
          <p className='text-muted-foreground mt-0.5 text-xs'>Official Platform Verification</p>
        </div>
      </div>

      {/* Middle: platform rows */}
      <div className='flex w-full flex-col gap-2'>
        {platforms.map(({ label, Logo }) => (
          <div key={label} className='bg-muted/50 border-border flex items-center justify-between rounded-lg border px-3 py-2.5'>
            <div className='flex items-center gap-2'>
              <Logo className='size-4' />
              <span className='text-sm font-medium'>{label}</span>
            </div>
            <CheckCircleIcon className='size-4 text-info' />
          </div>
        ))}
      </div>

      {/* Bottom: divider + summary */}
      <div className='flex w-full items-center justify-center gap-2'>
        <div className='bg-primary/20 h-px flex-1 rounded' />
        <span className='text-muted-foreground text-[10px]'>Verified across 3 platforms</span>
        <div className='bg-primary/20 h-px flex-1 rounded' />
      </div>
    </Card>
  )
}

export default VerificationHeroCard
