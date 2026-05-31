// Data for the floating "Free Creative Strategy Action Plan" widget.
// Founder swap: Foreplay's Zach Murray → GoAds' Justin Bui (Founder & CEO).
// Date pills are computed at call-site (client) to start from "today" without
// causing SSR/CSR hydration drift.

export const actionPlanFounder = {
  name: "Justin Bui",
  role: "Founder & CEO @ GoAds",
  avatarSrc: "/assets/solutions_test1_avt.webp",
  avatarAlt: "Justin Bui — Founder & CEO of GoAds",
}

export const actionPlanCopy = {
  triggerTitle: "Click Me!",
  triggerSubline: "Free creative strategy action plan",
  cardTitle: "Free Creative Strategy Action Plan",
  cardDescription:
    "Let's analyze your top competitors together. Get a clear action plan to start scaling like the top 1% advertisers.",
  primaryCta: "Book a Call",
  primaryHref: "/book-demo",
  secondaryCta: "Start Free Trial",
  secondaryHref: "/sign-up",
}

export interface ActionPlanDate {
  dow: string
  dom: string
  isToday: boolean
}

// 5 sequential days starting from `today` (default = now).
export function getActionPlanDates(today: Date = new Date()): ActionPlanDate[] {
  const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  return Array.from({ length: 5 }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    return { dow: DOW[d.getDay()], dom: String(d.getDate()), isToday: i === 0 }
  })
}
