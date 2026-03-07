import { SectionDivider } from '@/components/section-divider'
import CTASection from '@/components/shadcn-studio/blocks/cta-section-05/cta-section-05'
import { PageHero } from '@/components/page-hero'
import { WavyUnderline } from '@/components/section-header'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { FAQ_ITEMS } from '@/data/landing-faq'

/* ---------- page ---------- */

export default function FAQPage() {
  return (
    <main className='flex-1'>
      <PageHero
        label='FAQ'
        heading={
          <>
            Frequently Asked{' '}
            <span className='relative inline-block'>
              Questions
              <WavyUnderline className='-bottom-1.5 left-[8%] h-2 w-5/6' />
            </span>
          </>
        }
        description='Everything you need to know about GoAds products, delivery, warranties, and support.'
      />
      <SectionDivider />

      <section className='py-8 sm:py-16 lg:py-24'>
        <div className='mx-auto max-w-3xl px-4 lg:px-6'>
          <Accordion type='single' collapsible className='w-full'>
            {FAQ_ITEMS.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className='text-left text-base font-medium'>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className='text-muted-foreground text-sm leading-relaxed'>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <SectionDivider />
      <CTASection />
    </main>
  )
}
