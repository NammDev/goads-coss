import { HeadphonesIcon, ArrowUpRightIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card3D } from '@/components/card-3d'

/* ---------- default enterprise data ---------- */

export interface EnterpriseSolutionProps {
  title?: string
  description?: string
  features?: string[]
  buttonText?: string
  price?: string
}

const DEFAULTS: Required<EnterpriseSolutionProps> = {
  title: 'Custom Enterprise Solutions',
  description: 'Need a custom setup? Contact us directly for a tailored quote, dedicated account manager, and priority delivery.',
  features: ['Volume discounts', 'Dedicated manager', 'Custom configuration', 'Priority support'],
  buttonText: 'Contact Sales',
  price: 'Custom',
}

/* ---------- enterprise solution card — uses same Card3D shell as product cards ---------- */

export function EnterpriseSolutionCard(props: EnterpriseSolutionProps) {
  const { title, description, features, buttonText, price } = { ...DEFAULTS, ...props }

  return (
    <Card3D index={0} inView contentClassName='flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between'>
      {/* left: icon + text */}
      <div className='flex items-start gap-4'>
        <div className='bg-primary/10 flex size-11 shrink-0 items-center justify-center rounded-xl'>
          <HeadphonesIcon className='size-5 text-primary' />
        </div>
        <div>
          <h3 className='text-base font-semibold'>{title}</h3>
          <p className='text-muted-foreground mt-1 text-sm'>{description}</p>
          {features.length > 0 && (
            <div className='text-muted-foreground mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs'>
              {features.map((f) => (
                <span key={f} className='flex items-center gap-1'>
                  <span className='text-primary'>&#10003;</span> {f}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* right: price + button */}
      <div className='flex shrink-0 items-center gap-3 max-sm:mt-2 max-sm:ml-15'>
        <span className='text-lg font-bold'>{price}</span>
        <Button size='sm' variant='outline' className='cursor-pointer gap-1.5'>
          {buttonText}
          <ArrowUpRightIcon className='size-3.5' />
        </Button>
      </div>
    </Card3D>
  )
}
