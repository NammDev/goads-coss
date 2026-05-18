// support-widget design literals (distinct surface — NOT foreplay tokens).
// Values sourced/derived in plan 260518-0013 spec. One source of truth (DRY).

export const SW = {
  // gradient header
  gradFrom: "#FFFFFF",
  gradTo: "#528BFF",
  gradAngle: "117.67deg",
  // text + surfaces
  textMuted: "#6C6F74", // [SRC] inactive tab color
  textStrong: "#1A1A1A",
  title: "#FFFFFF",
  bodyBg: "#FFFFFF",
  cardBorder: "#E6E8EB",
  btnBg: "#0A0A0A",
  tabActive: "#0A0A0A",
  // geometry [SRC]
  panelRadius: 24,
  panelShadow: "0 5px 40px 0 rgba(9,14,21,0.16)",
  // open/close motion [SRC]
  transition:
    "width 200ms, height 200ms, max-height 200ms, transform 300ms cubic-bezier(0,1.2,1,1), opacity 83ms ease-out",
} as const

export const SW_GRADIENT = `linear-gradient(${SW.gradAngle}, ${SW.gradFrom}, ${SW.gradTo})`
