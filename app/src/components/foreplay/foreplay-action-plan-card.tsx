// Foreplay action-plan popup card — .calendar-pop-up-main.pop-from-bl
// CSS: bg #fff, border 1px solid solid-100, radius 18px, min/max-w 360px.
// Composes 3 sections (header + body + cta) each separated by a 1px solid-100 divider.
// Header: gap 10px, padding 14px, items-center.
// Body:   gap 15px, padding 14px, flex-col.
// CTA:    gap 8px,  padding 14px, flex-col.
//
// Atom; mounted inside ForeplayCalendarPopup (collapsible widget) and any
// route that wants the card as a hero centerpiece.

import { cn } from "@/lib/utils"
import { fpText } from "@/components/foreplay/foreplay-typography"
import { ForeplayAvatarOnline } from "@/components/foreplay/foreplay-avatar-online"
import { ForeplayDatePill } from "@/components/foreplay/foreplay-date-pill"
import { ForeplayCtaButton } from "@/components/foreplay/foreplay-cta-button"
import {
  actionPlanFounder,
  actionPlanCopy,
  type ActionPlanDate,
} from "@/data/goads-action-plan-page-data"

interface ForeplayActionPlanCardProps {
  dates: ActionPlanDate[]
  onClose?: () => void
  className?: string
}

export function ForeplayActionPlanCard({
  dates,
  onClose,
  className,
}: ForeplayActionPlanCardProps) {
  return (
    <div
      className={cn(
        // .calendar-pop-up-main.pop-from-bl
        "flex w-[360px] min-w-[360px] max-w-[360px] flex-col items-stretch",
        "rounded-[18px] border border-[var(--fp-solid-100)] bg-white shadow-2xl",
        className,
      )}
    >
      {/* .calendar-pop-up-header */}
      <div className="flex items-center gap-[10px] border-b border-[var(--fp-solid-100)] p-[14px]">
        <ForeplayAvatarOnline
          src={actionPlanFounder.avatarSrc}
          alt={actionPlanFounder.avatarAlt}
        />
        {/* .calendar-pop-up-text — flex col, flex-1, gap 0 */}
        <div className="flex flex-1 flex-col">
          <div className={cn(fpText.labelS, "text-[var(--fp-solid-900)]")}>
            {actionPlanFounder.name}
          </div>
          <div className={cn(fpText.bodyXs, "text-[var(--fp-solid-400)]")}>
            {actionPlanFounder.role}
          </div>
        </div>
        {/* .cal-pop-up-close — opacity .75, hover 1 */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex size-6 items-center justify-center text-[var(--fp-solid-900)] opacity-75 transition-opacity duration-200 hover:opacity-100"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* .calendar-pop-body — gap 15px, padding 14px */}
      <div className="flex flex-col gap-[15px] border-b border-[var(--fp-solid-100)] p-[14px]">
        <div className="flex flex-col">
          <div className={cn(fpText.labelS, "text-[var(--fp-solid-900)]")}>
            {actionPlanCopy.cardTitle}
          </div>
          <div className={cn(fpText.bodyS, "text-[var(--fp-solid-400)]")}>
            {actionPlanCopy.cardDescription}
          </div>
        </div>
        {/* #datePills.datepills — gap 8px, justify-between, items-center */}
        <div className="flex items-center justify-between gap-2">
          {dates.map((d, i) => (
            <ForeplayDatePill
              key={`${d.dow}-${d.dom}-${i}`}
              dow={d.dow}
              dom={d.dom}
              isToday={d.isToday}
              href={actionPlanCopy.primaryHref}
            />
          ))}
        </div>
      </div>

      {/* .calendar-pop-cta — gap 8px, padding 14px, flex-col */}
      <div className="flex flex-col gap-2 p-[14px]">
        <ForeplayCtaButton
          href={actionPlanCopy.primaryHref}
          variant="light-primary"
          showIcon={false}
          className="justify-center"
        >
          {actionPlanCopy.primaryCta}
        </ForeplayCtaButton>
        <ForeplayCtaButton
          href={actionPlanCopy.secondaryHref}
          variant="light-stroke"
          showIcon
          className="justify-center"
        >
          {actionPlanCopy.secondaryCta}
        </ForeplayCtaButton>
      </div>
    </div>
  )
}
