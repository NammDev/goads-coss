// Claim steps — connected 3-step flow in the white block below the hero.
// Each step: a glowing numbered circle → icon row → title → action
// (step 1 = both channels, step 2 = copy keyword, step 3 = info pill).
// Dashed connectors link the circles on desktop; steps stack on mobile.

import { Fragment } from "react"
import { SectionContainer } from "@/components/atoms/section-container"
import { SectionHead } from "@/components/atoms/section-head"
import { siteText } from "@/components/atoms/typography"
import { cn } from "@/lib/utils"
import { giveawayClaimSteps, giveawayClaimStepsHead } from "@/data/giveaway-page-data"
import { GiveawayStepChip } from "@/components/giveaway/giveaway-step-chip"

type Step = (typeof giveawayClaimSteps)[number]

export function GiveawayClaimSteps() {
  return (
    <SectionContainer variant="section">
      <div className="flex flex-col items-center py-12">
        <SectionHead
          subtitle={giveawayClaimStepsHead.subtitle}
          title={giveawayClaimStepsHead.title}
          titleSize="h3"
          variant="dark"
        />

        {/* Connected flow — 3 columns + dashed connectors (stacks on mobile) */}
        <div className="mt-12 flex w-full items-start justify-center gap-2 max-md:flex-col max-md:items-center max-md:gap-12">
          {giveawayClaimSteps.map((step, i) => (
            <Fragment key={step.number}>
              <StepColumn step={step} />
              {i < giveawayClaimSteps.length - 1 && <Connector />}
            </Fragment>
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}

function StepColumn({ step }: { step: Step }) {
  return (
    <div className="flex w-full max-w-[280px] flex-col items-center gap-4 text-center">
      {/* Numbered circle — black on white (Foreplay monochrome) */}
      <div className="flex size-16 items-center justify-center rounded-full bg-[var(--solid-900)] text-white ring-8 ring-[var(--solid-50)]">
        <span className="font-sans text-[1.5rem] font-semibold leading-none">{step.number}</span>
      </div>

      <span className={cn(siteText.labelL, "text-[var(--solid-700)]")}>{step.title}</span>

      {/* Action: button(s) for steps 1-2, info pill for step 3.
          Step 1 buttons carry the channel logo inline. */}
      {step.chips.length > 0 && (
        <div className="flex w-full flex-col gap-2">
          {step.chips.map((chip) => (
            <GiveawayStepChip
              key={chip.label}
              chip={chip}
              leadingIcon={chipIcon(chip.label)}
            />
          ))}
        </div>
      )}
      {step.note && (
        <span
          className={cn(
            siteText.labelS,
            "whitespace-nowrap rounded-lg border border-[var(--solid-100)] bg-white px-4 py-2 text-[var(--solid-700)]",
          )}
        >
          {step.note}
        </span>
      )}
    </div>
  )
}

// Dashed connector between circles — mt aligns it to the circle's vertical center.
function Connector() {
  return (
    <div className="mt-8 hidden flex-1 items-center gap-1 self-start md:flex">
      <span className="h-0 w-full border-t-2 border-dashed border-[var(--solid-200)]" />
      <Chevron />
    </div>
  )
}

// Leading icon for a step-1 button, chosen by its label.
function chipIcon(label: string) {
  if (label === "Telegram Channel") return <TelegramIcon />
  if (label === "Discord Channel") return <DiscordIcon />
  return undefined
}

/* ── Icons (currentColor) ───────────────────────────────────────────── */

function TelegramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.5.5 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.009-1.252-.242-1.865-.442-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )
}

function DiscordIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z" />
    </svg>
  )
}

function Chevron() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="shrink-0 text-[var(--solid-200)]" aria-hidden="true">
      <path d="M8 6.5l3.5 3.5L8 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
