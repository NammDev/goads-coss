// Floating contact card — mounted inside CalendarPopup (collapsible widget) and
// any route that wants the card as a hero centerpiece.
//
// Structure: header (founder) + body (title/desc + 3 channel pills) + cta (2 buttons).
// CSS: bg #fff, border 1px solid-100, radius 18px, fixed 360px width.
// Each section separated by a 1px solid-100 divider.

import { cn } from "@/lib/utils"
import { siteText } from "@/components/atoms/typography"
import { AvatarOnline } from "@/components/atoms/avatar-online"
import { ChannelPill } from "@/components/atoms/channel-pill"
import { CtaButton } from "@/components/atoms/cta-button"
import {
  actionPlanFounder,
  actionPlanCopy,
  contactChannels,
} from "@/data/action-plan-page-data"

interface ActionPlanCardProps {
  onClose?: () => void
  className?: string
}

export function ActionPlanCard({ onClose, className }: ActionPlanCardProps) {
  return (
    <div
      className={cn(
        // Cap at 360px (desktop) but shrink to fit narrow viewports so the
        // floating support card never overflows at 375px (min: 100vw − 40px gutter).
        "flex w-[min(360px,calc(100vw-2.5rem))] flex-col items-stretch",
        "rounded-[18px] border border-[var(--solid-100)] bg-white shadow-2xl",
        className,
      )}
    >
      {/* Header — founder identity */}
      <div className="flex items-center gap-[10px] border-b border-[var(--solid-100)] p-[14px]">
        <AvatarOnline
          src={actionPlanFounder.avatarSrc}
          alt={actionPlanFounder.avatarAlt}
        />
        <div className="flex flex-1 flex-col">
          <div className={cn(siteText.labelS, "text-[var(--solid-900)]")}>
            {actionPlanFounder.name}
          </div>
          <div className={cn(siteText.bodyXs, "text-[var(--solid-400)]")}>
            {actionPlanFounder.role}
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex size-6 cursor-pointer items-center justify-center text-[var(--solid-900)] opacity-75 transition-opacity duration-200 hover:opacity-100"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Body — title + description + 3 channel pills */}
      <div className="flex flex-col gap-[15px] border-b border-[var(--solid-100)] p-[14px]">
        <div className="flex flex-col">
          <div className={cn(siteText.labelS, "text-[var(--solid-900)]")}>
            {actionPlanCopy.cardTitle}
          </div>
          <div className={cn(siteText.bodyS, "text-[var(--solid-400)]")}>
            {actionPlanCopy.cardDescription}
          </div>
        </div>
        {/* Channel pills — same rhythm as the old datepills row (gap 8px, justify-between, items-center) */}
        <div className="flex items-center justify-between gap-2">
          {contactChannels.map((c) => (
            <ChannelPill key={c.label} label={c.label} href={c.href} icon={c.icon} />
          ))}
        </div>
      </div>

      {/* CTA — Book a Call (primary) + Start Free Trial (secondary) */}
      <div className="flex flex-col gap-2 p-[14px]">
        <CtaButton
          href={actionPlanCopy.primaryHref}
          variant="light-primary"
          showIcon={false}
          className="justify-center"
        >
          {actionPlanCopy.primaryCta}
        </CtaButton>
        <CtaButton
          href={actionPlanCopy.secondaryHref}
          variant="light-stroke"
          showIcon
          className="justify-center"
        >
          {actionPlanCopy.secondaryCta}
        </CtaButton>
      </div>
    </div>
  )
}
