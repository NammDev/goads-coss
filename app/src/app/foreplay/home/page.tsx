import { HeroPrecisionSection } from "@/components/foreplay/hero-precision-section"

export default function ForeplayHomePage() {
  return (
    <main>
      {/* Dark section above */}
      <section className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-white/20">Hero section</p>
      </section>

      {/* White floating section */}
      <div className="rounded-t-3xl bg-background">
        <HeroPrecisionSection />
      </div>

      <section className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-white/20">Hero section</p>
      </section>
    </main>
  )
}
