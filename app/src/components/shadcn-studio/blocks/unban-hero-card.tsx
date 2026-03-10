import { ShieldCheckIcon, RefreshCwIcon, ArrowRightIcon } from 'lucide-react'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MetaLogo, InstagramLogo } from '@/assets/svg/ad-platform-logos'

interface UnbanHeroCardProps {
  className?: string
}

const recoveryRows = [
  { Logo: MetaLogo, label: 'Facebook Profile', status: 'Restored' },
  { Logo: MetaLogo, label: 'Facebook Page', status: 'Recovered' },
  { Logo: InstagramLogo, label: 'Instagram', status: 'Active' },
]

const UnbanHeroCard = ({ className }: UnbanHeroCardProps) => {
  return (
    <Card className={`bg-card border-border flex flex-col gap-4 p-5 ${className ?? ''}`}>
      {/* Top branded section */}
      <div className='bg-primary/10 border-primary/30 relative flex w-full flex-col items-center gap-3 rounded-xl border px-5 py-5'>
        <Badge variant="outline" className='border-primary/40 text-primary absolute -top-2.5 right-3 gap-1 text-[10px]'>
          <ShieldCheckIcon className='size-3' />
          98% Success
        </Badge>

        {/* Icon combo */}
        <div className='relative flex items-center justify-center'>
          <div className='bg-primary flex size-11 items-center justify-center rounded-xl'>
            <ShieldCheckIcon className='text-primary-foreground size-5' />
          </div>
          <div className='bg-success/10 border-success/30 absolute -right-3 -bottom-2 flex size-7 items-center justify-center rounded-lg border'>
            <RefreshCwIcon className='text-success size-3.5' />
          </div>
        </div>

        <div className='text-center'>
          <p className='text-base font-bold'>Account Recovery</p>
          <p className='text-muted-foreground mt-0.5 text-xs'>Professional Unban Service</p>
        </div>
      </div>

      {/* Recovery status rows */}
      <div className='flex flex-col gap-2'>
        {recoveryRows.map(({ Logo, label, status }) => (
          <div key={label} className='bg-muted/50 border-border flex items-center gap-2 rounded-lg border px-3 py-2.5'>
            <Logo className='text-destructive/50 size-4 shrink-0' />
            <span className='text-muted-foreground text-xs font-medium'>{label}</span>
            <ArrowRightIcon className='text-muted-foreground/50 mx-auto size-3 shrink-0' />
            <span className='text-success text-xs font-semibold'>{status}</span>
          </div>
        ))}
      </div>

      {/* Bottom divider + trust line */}
      <div className='flex items-center gap-2'>
        <div className='bg-primary/20 h-px flex-1 rounded' />
        <span className='text-muted-foreground text-[10px]'>Trusted by 500+ advertisers</span>
        <div className='bg-primary/20 h-px flex-1 rounded' />
      </div>
    </Card>
  )
}

export default UnbanHeroCard
