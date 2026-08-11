// "Why rent" grid — four cards below the configurator.
//
// Dark scope (--alpha-* tokens): the white block above it now belongs to the
// builder, so this section sits back on the page background. Two white blocks in
// a row would flatten the page rhythm.
//
// Copy lives in rental-page-data.ts so the pricing claims inside it stay derived
// from the tier table rather than retyped.

import { cn } from "@/lib/utils"
import { siteText } from "@/components/atoms/typography"
import { RENTAL_BENEFITS } from "@/data/rental-page-data"

export function RentalBenefits() {
  return (
    <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
      {RENTAL_BENEFITS.map((benefit) => (
        <div
          key={benefit.title}
          className="flex flex-col gap-2 rounded-[16px] border border-[var(--alpha-700)] bg-[var(--alpha-900)] p-6 max-sm:p-5"
        >
          <h3 className={cn(siteText.labelL, "text-foreground")}>{benefit.title}</h3>
          <p className={cn(siteText.bodyM, "text-[var(--alpha-100)] [text-wrap:pretty]")}>
            {benefit.body}
          </p>
        </div>
      ))}
    </div>
  )
}
