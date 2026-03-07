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

/* ---------- FAQ data ---------- */

const faqs = [
  {
    q: 'What is an agency ad account?',
    a: 'An agency ad account is a verified advertising account created under a Meta/Google/TikTok agency structure. These accounts have higher trust scores, higher spending limits, and better stability compared to regular ad accounts.',
  },
  {
    q: 'How does the 7-day warranty work?',
    a: 'If your account gets disabled within 7 days of delivery for reasons unrelated to policy violations on your end, we will replace it for free — no questions asked.',
  },
  {
    q: 'How fast is delivery?',
    a: 'Most accounts are delivered within 1-4 hours after payment confirmation. Bulk orders or custom setups may take up to 24 hours.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept cryptocurrency (USDT, BTC, ETH), bank transfers, PayPal, Wise, and other methods. Visit our Payment Methods page for full details.',
  },
  {
    q: 'Can I use these accounts with anti-detect browsers?',
    a: 'Yes, our accounts work perfectly with all major anti-detect browsers including Dolphin{anty}, GoLogin, and AdsPower. We also offer partner discounts on these tools.',
  },
  {
    q: 'What is a Business Manager (BM)?',
    a: 'A Business Manager is a Meta tool that lets you manage ad accounts, pages, and team members in one place. We offer BM1 through BM10, both verified and standard.',
  },
  {
    q: 'Do you offer bulk discounts?',
    a: 'Yes, we offer tiered pricing for bulk orders. The more accounts you purchase, the better the per-unit price. Contact our sales team for custom quotes.',
  },
  {
    q: 'How do I get support?',
    a: 'Our primary support channel is Telegram (@GoAdsSupport) with an average response time under 2 hours. We also offer Discord community support and email support.',
  },
  {
    q: 'What makes GoAds different from other providers?',
    a: 'We combine 5+ years of experience, a 7-day warranty policy, sub-2-hour support response times, and a full-stack platform covering Meta, Google, and TikTok — all from a single provider.',
  },
]

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
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className='text-left text-base font-medium'>
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className='text-muted-foreground text-sm leading-relaxed'>
                  {faq.a}
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
