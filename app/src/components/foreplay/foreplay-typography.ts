// Foreplay typography constants — extracted from foreplay-source.css
// Centralizes all text style classes to eliminate duplication across components
// Usage: import { fpText } from "@/components/foreplay/foreplay-typography"

export const FP_HERO_GRADIENT = "[background-image:radial-gradient(circle_at_50%_-100%,#fff,#ffffffe0)] bg-clip-text [-webkit-text-fill-color:transparent]"

export const fpText = {
  // Display headings — Inter Display + font-optical-sizing:auto
  displayH1: "font-display text-[3.75rem] font-semibold leading-[4.25rem] tracking-[-0.0075em] [font-optical-sizing:auto]",
  displayH2: "font-display text-[2.75rem] font-semibold leading-[3.36rem] tracking-[-0.0075em] [font-optical-sizing:auto]",
  displayH3: "font-display text-[2.25rem] font-semibold leading-[2.75rem] tracking-[-0.00722em] [font-optical-sizing:auto]",
  displayH4: "font-display text-[1.75rem] font-semibold leading-[2.25rem] tracking-[-0.00714em] [font-optical-sizing:auto]",

  // Headings — Inter
  headingM: "font-sans text-base font-[550] leading-6 tracking-[-0.01125em]",

  // Labels — Inter
  labelM: "m-0 font-sans text-base font-medium leading-6 tracking-[-0.01125em] no-underline",
  labelS: "m-0 font-sans text-[0.875rem] font-medium leading-5 tracking-[-0.00643em] no-underline",
  labelL: "m-0 font-sans text-[1.125rem] font-medium leading-6 tracking-[-0.0144em] no-underline",

  // Body — Inter
  bodyM: "font-sans text-base font-normal leading-6 tracking-[-0.01125em]",
  bodyL: "font-sans text-[1.125rem] font-normal leading-7 tracking-[-0.0144em]",
  bodyS: "font-sans text-[0.875rem] font-normal leading-5 tracking-[-0.00643em]",

  // Overline — Inter, uppercase
  overline: "font-sans text-[0.75rem] font-[550] uppercase leading-4 tracking-[0.166667em]",

  // Navlink — Inter
  navlink: "font-sans text-[0.9375rem] leading-5",
} as const
