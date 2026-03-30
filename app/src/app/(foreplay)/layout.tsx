import { fontInter } from "@/fonts"

export default function ForeplayLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`foreplay ${fontInter.variable} min-h-svh bg-background text-foreground`}>
      {children}
    </div>
  )
}
