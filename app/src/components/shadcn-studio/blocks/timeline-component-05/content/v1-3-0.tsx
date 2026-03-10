import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const V1_3_0_Content = () => {
  return (
    <div>
      <div className='space-y-4'>
        <div className='space-y-3'>
          <h3 className='text-xl font-semibold'>Component Sync Unified Library Management (Beta)</h3>
          <p className='text-muted-foreground text-sm'>
            We&apos;re launching Component Sync, a new way to manage, version, and update all your shadcn components
            across projects with a single click.
          </p>
        </div>
        <div className='space-y-3'>
          <p className='font-medium'>Now you can :</p>
          <ul className='text-muted-foreground ml-2 list-inside list-disc space-y-3 text-sm'>
            <li>Sync shared components instantly between multiple apps</li>
            <li>Track version diffs and apply updates selectively</li>
            <li>Automatically resolve dependency conflicts</li>
          </ul>
        </div>
        <Image
          src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/timeline/image-04.png'
          alt='Component Sync Demo'
          width={800}
          height={450}
          className='rounded-[10px] w-full'
        />
        <Accordion type='multiple' className='-mt-4 mb-0 w-full' defaultValue={['item-1']}>
          <AccordionItem value='item-1'>
            <AccordionTrigger className='hover:no-underline [&>svg]:size-6'>
              <Badge className='h-6 rounded-sm border-none bg-success/10 text-success'>
                New
              </Badge>
            </AccordionTrigger>
            <AccordionContent className='text-muted-foreground'>
              <ul className='text-muted-foreground list-inside list-disc space-y-3 text-sm'>
                <li>“Sync All” button for project-wide updates.</li>
                <li>Component diff viewer with inline changelog.</li>
                <li>Scoped sync choose which namespaces or folders to update</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-2'>
            <AccordionTrigger className='hover:no-underline [&>svg]:size-6'>
              <Badge className='h-6 rounded-sm border-none bg-info/10 text-info'>
                Updates
              </Badge>
            </AccordionTrigger>
            <AccordionContent className='text-muted-foreground'>
              <ul className='text-muted-foreground list-inside list-disc space-y-3 text-sm'>
                <li>Faster load times in component explorer (-30%)</li>
                <li>Auto-preview for dark/light theme variants</li>
                <li>TypeScript types now update automatically when syncing</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-3'>
            <AccordionTrigger className='hover:no-underline [&>svg]:size-6'>
              <Badge className='h-6 rounded-sm border-none bg-warning/10 text-warning'>
                Bug Fixes
              </Badge>
            </AccordionTrigger>
            <AccordionContent className='text-muted-foreground'>
              <ul className='text-muted-foreground list-inside list-disc space-y-3 text-sm'>
                <li>Fixed sync conflicts with large component libraries</li>
                <li>Resolved memory leak in diff viewer</li>
                <li>Fixed incorrect version detection for nested components</li>
              </ul>
              <div className='mt-4 flex flex-wrap items-center gap-4'>
                <div className='bg-primary/10 text-destructive rounded-[6px] px-3 py-1 text-xs leading-4.5 font-medium'>
                  /v1/components/sync
                </div>
                <div className='bg-primary/10 text-destructive rounded-[6px] px-3 py-1 text-xs leading-4.5 font-medium'>
                  /v1/components/pull
                </div>
                <div className='bg-primary/10 text-destructive rounded-[6px] px-3 py-1 text-xs leading-4.5 font-medium'>
                  --interactive
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

export default V1_3_0_Content
