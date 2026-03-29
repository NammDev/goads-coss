export default function ForeplayLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-svh bg-[oklch(0.08_0.01_260)]">
      {children}
    </div>
  )
}
