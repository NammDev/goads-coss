import type { Metadata } from "next"
import { MessageCircleIcon, CalendarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { CONTACT } from '@/data/contact-info'
import { salesBenefits } from '@/data/talk-to-sales-data'
import { CalEmbed } from '@/components/cal-embed'

export const metadata: Metadata = {
  title: "Talk to Sales | Contact GoAds Team",
  description: "Contact GoAds sales team via Telegram. Get personalized recommendations for agency ad accounts and Business Managers.",
}

export default function TalkToSalesPage() {
  return (
    <main className="flex-1">
      <section className="py-20 lg:py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground mb-6">
              <MessageCircleIcon className="size-4" />
              Available 7 days a week
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Talk to Our Sales Team
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Need a custom setup, bulk pricing, or have questions about our products?
              Our team is ready to help you scale.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" asChild className="gap-2">
                <a href={CONTACT.telegram.support} target="_blank" rel="noopener noreferrer">
                  <MessageCircleIcon className="size-4" />
                  Chat on Telegram
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href={`mailto:${CONTACT.email}`}>Email Us</a>
              </Button>
            </div>
          </div>

          {/* Cal.com booking embed */}
          <div className="mx-auto mt-16 max-w-4xl">
            <Separator className="mb-12" />
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground mb-4">
                <CalendarIcon className="size-4" />
                Book a meeting
              </div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Schedule a Call
              </h2>
              <p className="mt-2 text-muted-foreground">
                Pick a time that works for you. We&apos;ll discuss your needs and find the best solution.
              </p>
            </div>
            <CalEmbed calLink="nam-khanh-nguyen-dhpuv7/30min" />
          </div>

          <Separator className="mx-auto mt-16 max-w-4xl" />

          <div className="mx-auto mt-16 grid max-w-4xl gap-6 sm:grid-cols-3">
            {salesBenefits.map(({ icon: Icon, title, description }) => (
              <Card key={title}>
                <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
