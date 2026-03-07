import Link from "next/link"
import Error04Illustration from "@/assets/svg/error-04-illustration"
import { Button } from "@/components/ui/button"

const ErrorPage04 = () => {
  return (
    <div className="flex min-h-[calc(100svh-var(--header-height)-200px)] flex-col items-center justify-center gap-12 px-8 py-8 sm:py-16 lg:justify-between lg:py-24">
      <Error04Illustration className="h-[clamp(300px,50vh,600px)]" />

      <div className="text-center">
        <h4 className="mb-1.5 text-2xl font-semibold">Oops! This Page Got Lost</h4>
        <p className="text-muted-foreground mb-2 max-w-md">
          Looks like this page doesn&apos;t exist. But don&apos;t worry — your ad accounts are still safe with us.
        </p>
        <p className="text-muted-foreground mb-6 max-w-md text-sm">
          Need agency ad accounts with 7-day warranty &amp; 24/7 support? We&apos;ve got you covered.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button size="lg" className="rounded-lg text-base" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
          <Button size="lg" variant="outline" className="rounded-lg text-base" asChild>
            <Link href="/talk-to-sales">Talk to Sales</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage04
