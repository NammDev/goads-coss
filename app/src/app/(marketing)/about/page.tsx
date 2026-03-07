import AboutUs from '@/components/shadcn-studio/blocks/about-us-page-03/about-us-page-03'
import Team from '@/components/shadcn-studio/blocks/team-section-05/team-section-05'
import { SectionDivider } from '@/components/section-divider'
import CTASection from '@/components/shadcn-studio/blocks/cta-section-05/cta-section-05'
import { PageHeroBig } from '@/components/page-hero-big'
import { WavyUnderline } from '@/components/section-header'

/* ---------- About Us data ---------- */

const aboutUsData = {
  contentTitle: 'Who We Are',
  contentDescription:
    'GoAds is a trusted Meta, Google & TikTok ad infrastructure provider with 5+ years of experience serving 500+ media buyers, agencies, and e-commerce brands worldwide. We help advertisers scale without the fear of losing accounts.',
  tabs: [
    {
      name: 'Vision',
      value: 'vision',
      content: (
        <div className="space-y-3">
          <p className="text-muted-foreground">
            We envision a world where media buyers can focus entirely on performance — not on account
            recovery, setup headaches, or platform bans. Our mission is to be the infrastructure
            backbone that powers every successful ad campaign.
          </p>
          <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
            <li>Eliminate account disruptions for advertisers globally</li>
            <li>Become the #1 trusted ad infrastructure partner</li>
            <li>Enable agencies to scale without limits</li>
          </ul>
        </div>
      ),
    },
    {
      name: 'Values',
      value: 'values',
      content: (
        <div className="space-y-3">
          <p className="text-muted-foreground">
            Everything we do is built on trust, speed, and reliability. We treat every client&apos;s
            ad spend as if it were our own.
          </p>
          <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
            <li>7-day warranty on every account — no questions asked</li>
            <li>&lt;2h average support response time</li>
            <li>Transparent pricing, no hidden fees</li>
            <li>Continuous account quality improvements</li>
          </ul>
        </div>
      ),
    },
    {
      name: 'History',
      value: 'history',
      content: (
        <div className="space-y-3">
          <p className="text-muted-foreground">
            Founded in 2019, GoAds started as a small team helping local media buyers access
            reliable agency accounts. Today we serve 500+ clients across 30+ countries with a
            full-stack ad infrastructure platform.
          </p>
          <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
            <li>2019 — Founded, first 50 agency accounts sold</li>
            <li>2021 — Expanded to Google & TikTok ad accounts</li>
            <li>2023 — 500+ active clients milestone</li>
            <li>2025 — Full-stack setup services & tools platform</li>
          </ul>
        </div>
      ),
    },
  ],
}

/* ---------- Team data ---------- */

const teamMembers = [
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/team/team-1.png',
    alt: 'CEO portrait',
    name: 'David Nguyen',
    role: 'CEO & Founder',
    description:
      'Serial entrepreneur with 8+ years in digital advertising. David founded GoAds to solve the account instability problem that plagues media buyers worldwide.',
    socialLinks: {
      facebook: '#',
      twitter: '#',
      github: '#',
      instagram: '#',
    },
  },
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/team/team-2.png',
    alt: 'COO portrait',
    name: 'Sarah Chen',
    role: 'COO',
    description:
      'Operations expert who ensures every account is delivered on time with quality. Sarah oversees our 7-day warranty program and client success initiatives.',
    socialLinks: {
      facebook: '#',
      twitter: '#',
      github: '#',
      instagram: '#',
    },
  },
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/team/team-3.png',
    alt: 'CTO portrait',
    name: 'Michael Tran',
    role: 'CTO',
    description:
      'Full-stack engineer building the tools and automation behind GoAds. From browser extensions to account monitoring — Michael makes the tech work.',
    socialLinks: {
      facebook: '#',
      twitter: '#',
      github: '#',
      instagram: '#',
    },
  },
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/team/team-4.png',
    alt: 'Head of Support portrait',
    name: 'Lisa Pham',
    role: 'Head of Support',
    description:
      'Leading our <2h response support team. Lisa and her team handle account issues, replacements, and setup consultations via Telegram and live chat.',
    socialLinks: {
      facebook: '#',
      twitter: '#',
      github: '#',
      instagram: '#',
    },
  },
]

/* ---------- page ---------- */

export default function AboutPage() {
  return (
    <main className="flex-1">
      <PageHeroBig
        badge="About Us"
        tagline="Meet the team behind your ad infrastructure."
        heading={
          <>
            The Team Behind{' '}
            <span className="relative inline-block">
              GoAds
              <WavyUnderline className="-bottom-1.5 left-[8%] h-2 w-5/6" />
            </span>
          </>
        }
        description="5+ years of helping advertisers scale with premium ad infrastructure, verified accounts, and dedicated support."
        ctas={[
          { label: 'View Our Plans', href: '/#pricing' },
        ]}
        illustration={
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Hero illustration"
              className="h-93.5 dark:hidden"
              src="https://cdn.shadcnstudio.com/ss-assets/landing-page/ambassador/image-1.png?height=374&format=auto"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Hero illustration dark"
              className="hidden h-93.5 dark:block"
              src="https://cdn.shadcnstudio.com/ss-assets/landing-page/ambassador/image-1-dark.png?height=374&format=auto"
            />
          </div>
        }
      />
      <SectionDivider />
      <AboutUs aboutUsData={aboutUsData} />
      <SectionDivider />
      <Team teamMembers={teamMembers} />
      <SectionDivider />
      <CTASection />
    </main>
  )
}
