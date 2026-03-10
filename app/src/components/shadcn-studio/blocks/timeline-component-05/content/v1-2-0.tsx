import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { CopyCode } from '@/components/ui/copy-code'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const V1_2_0_Content = () => {
  const codeExample = `// Example of updated API usage
const agent = new AIAgent({
  model: "Shadcn/studio",
  reasoning: "enhanced",
  multiModal: true,
});`

  return (
    <div>
      <div className='space-y-4'>
        <div className='space-y-3'>
          <h3 className='text-xl font-semibold'>Studio Dashboard Live Preview & Deployment</h3>
          <p className='text-muted-foreground text-sm'>
            The new Studio Dashboard brings together everything you need to preview, test, and deploy your component
            library right from your browser.
          </p>
        </div>
        <ul className='text-muted-foreground ml-2 list-inside list-disc space-y-3 text-sm'>
          <li>Preview components in any framework (Next.js, Remix, Vite)</li>
          <li>One-click deploy to Vercel</li>
          <li>Real-time preview links for teams</li>
        </ul>
        <div className='flex flex-wrap items-center gap-4'>
          {/* vite */}
          <div className='flex items-center gap-1.5 rounded-[6px] bg-amber-600/10 px-3 py-1 dark:bg-amber-400/10'>
            <Image src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/vite-logo.png' alt='Vite' width={18} height={18} className='h-4.5' />
            <span className='text-xs font-medium'>Vite</span>
          </div>
          {/* React */}
          <div className='flex items-center gap-1.5 rounded-[6px] bg-sky-600/10 px-3 py-1 dark:bg-sky-400/10'>
            <Image src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/react-logo.png' alt='React' width={18} height={18} className='h-4.5' />
            <span className='text-xs font-medium'>React</span>
          </div>
          {/* Angular */}
          <div className='bg-destructive/10 flex items-center gap-1.5 rounded-[6px] px-3 py-1'>
            <Image
              src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/astro-icon.png'
              alt='Astro'
              width={18}
              height={18}
              className='h-4.5 dark:hidden'
            />
            <Image
              src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/astro-icon-dark.png'
              alt='Astro'
              width={18}
              height={18}
              className='hidden h-4.5 dark:block'
            />
            <span className='text-xs font-medium'>Astro</span>
          </div>
        </div>
        <CopyCode code={codeExample} />
        <p className='text-muted-foreground text-sm'>
          The Studio Dashboard is a powerful tool within shadcnstudio that streamlines the process of designing,
          previewing, and deploying your component library. It allows you to instantly preview components in different
          frameworks (like Next.js, Remix, and Vite) directly from the dashboard.
        </p>
        <Accordion type='multiple' className='-mt-4 mb-0 w-full' defaultValue={['item-1']}>
          <AccordionItem value='item-1'>
            <AccordionTrigger className='hover:no-underline [&>svg]:size-6'>
              <Badge className='h-6 rounded-sm border-none bg-success/10 text-success'>
                New
              </Badge>
            </AccordionTrigger>
            <AccordionContent className='text-muted-foreground'>
              <ul className='text-muted-foreground list-inside list-disc space-y-3 text-sm'>
                <li>Live Preview mode instantly test UI changes inside the dashboard.</li>
                <li>One-click Deployment push updates to production without leaving Studio.</li>
                <li>Multi-environment support manage dev, staging, and production easily.</li>
                <li>New semantic tokens cleaner mapping for UI states (hover, active, focus)</li>
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
                <li>Improved preview performance for heavy UI blocks (+40% faster).</li>
                <li>Smarter auto-refresh reloads only the updated section, not the full screen.</li>
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
                <li>Fixed deployment logs not showing real-time events</li>
                <li>Corrected spacing token mismatch in forms, modals, and bento blocks</li>
                <li>Fixed incorrect color export in some frameworks (React / Vue)</li>
                <li>Resolved UI flicker when switching between preview modes</li>
                <li>Corrected environment variables not syncing in some workspaces</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

export default V1_2_0_Content
