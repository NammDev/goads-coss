import { Info, AlertTriangle, Lightbulb } from "lucide-react"

const variants = {
  info: {
    icon: Info,
    border: "border-primary/40",
    bg: "bg-primary/5",
    iconColor: "text-primary",
  },
  warning: {
    icon: AlertTriangle,
    border: "border-destructive/40",
    bg: "bg-destructive/5",
    iconColor: "text-destructive",
  },
  tip: {
    icon: Lightbulb,
    border: "border-chart-2/40",
    bg: "bg-chart-2/5",
    iconColor: "text-chart-2",
  },
} as const

export function DocsCallout({
  variant = "info",
  title,
  children,
}: {
  variant?: keyof typeof variants
  title?: string
  children: React.ReactNode
}) {
  const v = variants[variant]
  const Icon = v.icon

  return (
    <div
      className={`my-4 rounded-lg border-l-4 ${v.border} ${v.bg} p-4 not-prose`}
    >
      <div className="flex items-start gap-3">
        <Icon className={`mt-0.5 size-5 shrink-0 ${v.iconColor}`} />
        <div className="text-sm">
          {title && <p className="mb-1 font-semibold">{title}</p>}
          <div className="text-muted-foreground">{children}</div>
        </div>
      </div>
    </div>
  )
}
