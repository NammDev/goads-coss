// Claim steps — clone of Foreplay MCP .mcp-steps-grid (single 3-step grid; the
// Claude/ChatGPT-style tab switcher is intentionally dropped for the giveaway).
// Urgency line + progress bar sit below the grid. EXACT CSS (researcher-03):
// grid cols 1fr×3 gap 16px (mobile flex-col); card bg --alpha-700 radius 24px p 24px;
// number 28×28 --alpha-700 radius 8px; content gap 12px; content-2 gap 6px col.

import { SectionContainer } from "@/components/atoms/section-container"
import { siteText } from "@/components/atoms/typography"
import { cn } from "@/lib/utils"
import { giveawayClaimSteps, giveawayUrgency } from "@/data/giveaway-page-data"
import { GiveawayStepChip } from "@/components/giveaway/giveaway-step-chip"
import { GiveawayProgressBar } from "@/components/giveaway/giveaway-progress-bar"

export function GiveawayClaimSteps() {
  return (
    <SectionContainer variant="wide">
      <div className="flex flex-col items-center">
        {/* .mcp-steps-grid */}
        <div className="grid w-full grid-cols-3 gap-4 max-md:mb-[31px] max-md:flex max-md:flex-col">
          {giveawayClaimSteps.map((step) => (
            <div
              key={step.number}
              // .mcp-steps-wrapper
              className="flex flex-col gap-4 rounded-[24px] bg-[var(--alpha-700)] p-6 text-left"
            >
              {/* .mcp-steps-content */}
              <div className="flex items-start gap-3">
                {/* .mcp-content-number */}
                <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-[var(--alpha-700)] p-1">
                  <span className={cn(siteText.labelS, "text-foreground")}>
                    {step.number}
                  </span>
                </div>
                {/* .mcp-steps-content-2 */}
                <div className="flex flex-col items-start gap-1.5">
                  <span className={cn(siteText.labelM, "text-foreground")}>
                    {step.title}
                  </span>
                  <span className={cn(siteText.bodyM, "text-[var(--alpha-100)]")}>
                    {step.body}
                  </span>
                </div>
              </div>
              <GiveawayStepChip chip={step.chip} />
            </div>
          ))}
        </div>

        {/* Urgency + progress */}
        <p className={cn(siteText.labelM, "mt-6 text-center text-foreground")}>
          {giveawayUrgency}
        </p>
        <div className="mt-4 w-full">
          <GiveawayProgressBar />
        </div>
      </div>
    </SectionContainer>
  )
}
