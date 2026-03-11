import type { Metadata } from "next"
import { MessageCircleIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CONTACT } from '@/data/contact-info'
import { salesBenefits } from '@/data/talk-to-sales-data'

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
