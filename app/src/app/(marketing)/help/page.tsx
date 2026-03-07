import { SectionDivider } from '@/components/section-divider'
import CTASection from '@/components/shadcn-studio/blocks/cta-section-05/cta-section-05'
import { PageHero } from '@/components/page-hero'
import { WavyUnderline } from '@/components/section-header'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  MessageCircle,
  BookOpen,
  CreditCard,
  HelpCircle,
  Shield,
  Zap,
  ExternalLink,
} from 'lucide-react'
import Link from 'next/link'

/* ---------- Help categories ---------- */

const helpCategories = [
  {
    icon: MessageCircle,
    title: 'Telegram Support',
    description: 'Get real-time help from our support team. Average response time under 2 hours.',
    action: 'Open Telegram',
    href: 'https://t.me/GoAdsSupport',
    external: true,
  },
  {
    icon: HelpCircle,
    title: 'FAQ',
    description: 'Find answers to common questions about accounts, delivery, warranties, and more.',
    action: 'View FAQ',
    href: '/faq',
    external: false,
  },
  {
    icon: CreditCard,
    title: 'Payment Help',
    description: 'Learn about accepted payment methods, processing times, and transaction support.',
    action: 'Payment Methods',
    href: '/payment',
    external: false,
  },
  {
    icon: Shield,
    title: 'Warranty & Replacements',
    description: 'Understand our 7-day warranty policy and how to request account replacements.',
    action: 'Learn More',
    href: '/faq',
    external: false,
  },
  {
    icon: Zap,
    title: 'Getting Started',
    description: 'New to GoAds? Learn how to set up your first agency account and start running ads.',
    action: 'View Guide',
    href: '/blog',
    external: false,
  },
  {
    icon: BookOpen,
    title: 'Blog & Guides',
    description: 'Tips, tutorials, and best practices for media buyers using GoAds infrastructure.',
    action: 'Read Blog',
    href: '/blog',
    external: false,
  },
]

/* ---------- page ---------- */

export default function HelpPage() {
  return (
    <main className='flex-1'>
      <PageHero
        label='Support'
        heading={
          <>
            How Can We{' '}
            <span className='relative inline-block'>
              Help
              <WavyUnderline className='-bottom-0.5' />
            </span>
            ?
          </>
        }
        description='Find answers, get support, and learn how to make the most of GoAds products and services.'
      />
      <SectionDivider />

      <section className='py-8 sm:py-16 lg:py-24'>
        <div className='mx-auto max-w-[1416px] px-4 lg:px-6'>
          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {helpCategories.map((cat) => (
              <Card key={cat.title} className='flex flex-col'>
                <CardContent className='flex flex-1 flex-col gap-4 p-6'>
                  <div className='bg-primary/10 flex size-10 items-center justify-center rounded-lg'>
                    <cat.icon className='text-primary size-5' />
                  </div>
                  <div className='space-y-1'>
                    <h3 className='text-lg font-semibold'>{cat.title}</h3>
                    <p className='text-muted-foreground text-sm'>{cat.description}</p>
                  </div>
                  <Button variant='outline' className='mt-auto w-full' asChild>
                    {cat.external ? (
                      <a href={cat.href} target='_blank' rel='noopener noreferrer'>
                        {cat.action}
                        <ExternalLink className='ml-2 size-4' />
                      </a>
                    ) : (
                      <Link href={cat.href}>{cat.action}</Link>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />
      <CTASection />
    </main>
  )
}
