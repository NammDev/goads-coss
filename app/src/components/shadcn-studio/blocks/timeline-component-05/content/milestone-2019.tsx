import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const Milestone2019 = () => {
  return (
    <div>
      <div className='space-y-4'>
        <div className='space-y-3'>
          <h3 className='text-xl font-semibold'>GoAds Founded</h3>
          <p className='text-muted-foreground text-sm'>
            GoAds was born from a simple idea: media buyers deserve reliable, high-quality ad accounts
            without the constant fear of bans and disruptions. We started small, serving local advertisers.
          </p>
        </div>
        <Accordion type='multiple' className='-mt-4 mb-0 w-full' defaultValue={['item-1']}>
          <AccordionItem value='item-1'>
            <AccordionTrigger className='hover:no-underline [&>svg]:size-6'>
              <Badge className='h-6 rounded-sm border-none bg-success/10 text-success'>
                Foundation
              </Badge>
            </AccordionTrigger>
            <AccordionContent className='text-muted-foreground'>
              <ul className='list-inside list-disc space-y-3 text-sm'>
                <li>First 50 Facebook agency ad accounts sold</li>
                <li>Established direct relationships with Meta partners</li>
                <li>Built initial client base of local media buyers</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

export default Milestone2019
