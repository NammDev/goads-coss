import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const Milestone2021 = () => {
  return (
    <div>
      <div className='space-y-4'>
        <div className='space-y-3'>
          <h3 className='text-xl font-semibold'>Multi-Platform Expansion</h3>
          <p className='text-muted-foreground text-sm'>
            GoAds expanded beyond Meta to become a multi-platform ad infrastructure provider,
            adding Google Ads and TikTok Ads agency accounts to our portfolio.
          </p>
        </div>
        <Accordion type='multiple' className='-mt-4 mb-0 w-full' defaultValue={['item-1']}>
          <AccordionItem value='item-1'>
            <AccordionTrigger className='hover:no-underline [&>svg]:size-6'>
              <Badge className='h-6 rounded-sm border-none bg-success/10 text-success'>
                New Platforms
              </Badge>
            </AccordionTrigger>
            <AccordionContent className='text-muted-foreground'>
              <ul className='list-inside list-disc space-y-3 text-sm'>
                <li>Google Ads whitelisted agency accounts launched</li>
                <li>TikTok Ads verified agency accounts added</li>
                <li>TikTok Business Center & Shop accounts available</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

export default Milestone2021
