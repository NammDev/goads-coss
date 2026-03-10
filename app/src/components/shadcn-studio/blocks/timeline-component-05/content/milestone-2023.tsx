import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const Milestone2023 = () => {
  return (
    <div>
      <div className='space-y-4'>
        <div className='space-y-3'>
          <h3 className='text-xl font-semibold'>500+ Active Clients Milestone</h3>
          <p className='text-muted-foreground text-sm'>
            GoAds hit a major milestone with 500+ active clients worldwide, solidifying our position
            as a trusted ad infrastructure provider in the media buying community.
          </p>
        </div>
        <Accordion type='multiple' className='-mt-4 mb-0 w-full' defaultValue={['item-1']}>
          <AccordionItem value='item-1'>
            <AccordionTrigger className='hover:no-underline [&>svg]:size-6'>
              <Badge className='h-6 rounded-sm border-none bg-success/10 text-success'>
                Growth
              </Badge>
            </AccordionTrigger>
            <AccordionContent className='text-muted-foreground'>
              <ul className='list-inside list-disc space-y-3 text-sm'>
                <li>500+ active clients across multiple countries</li>
                <li>Introduced 7-day warranty policy on all accounts</li>
                <li>Built dedicated Telegram support with live agents</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-2'>
            <AccordionTrigger className='hover:no-underline [&>svg]:size-6'>
              <Badge className='h-6 rounded-sm border-none bg-info/10 text-info'>
                Products
              </Badge>
            </AccordionTrigger>
            <AccordionContent className='text-muted-foreground'>
              <ul className='list-inside list-disc space-y-3 text-sm'>
                <li>Added Facebook Profiles & Pages to product catalog</li>
                <li>Launched Business Manager packages (BM1 to BM10)</li>
                <li>Introduced Meta Pixels & Domain verification services</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

export default Milestone2023
