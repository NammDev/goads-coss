import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const Milestone2025 = () => {
  return (
    <div>
      <div className='space-y-4'>
        <div className='space-y-3'>
          <h3 className='text-xl font-semibold'>Full-Stack Ad Infrastructure Platform</h3>
          <p className='text-muted-foreground text-sm'>
            GoAds evolved into a complete ad infrastructure platform with setup services, browser tools,
            and an expanded product catalog covering Meta, Google, and TikTok ecosystems.
          </p>
        </div>
        <Accordion type='multiple' className='-mt-4 mb-0 w-full' defaultValue={['item-1']}>
          <AccordionItem value='item-1'>
            <AccordionTrigger className='hover:no-underline [&>svg]:size-6'>
              <Badge className='h-6 rounded-sm border-none bg-green-600/10 text-green-600 dark:bg-green-400/10 dark:text-green-400'>
                Launched
              </Badge>
            </AccordionTrigger>
            <AccordionContent className='text-muted-foreground'>
              <ul className='list-inside list-disc space-y-3 text-sm'>
                <li>Bulletproof Setup service (2 BMs + 2 Profiles + Pages)</li>
                <li>GoAds Tools platform with 11 browser extensions & utilities</li>
                <li>Partner Program with commission-based referrals</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-2'>
            <AccordionTrigger className='hover:no-underline [&>svg]:size-6'>
              <Badge className='h-6 rounded-sm border-none bg-sky-600/10 text-sky-600 dark:bg-sky-400/10 dark:text-sky-400'>
                Milestones
              </Badge>
            </AccordionTrigger>
            <AccordionContent className='text-muted-foreground'>
              <ul className='list-inside list-disc space-y-3 text-sm'>
                <li>Serving clients across 30+ countries</li>
                <li>Average support response time reduced to under 2 hours</li>
                <li>Launched anti-detect browser & proxy partnerships</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

export default Milestone2025
