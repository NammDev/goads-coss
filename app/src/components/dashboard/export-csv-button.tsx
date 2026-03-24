'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { DownloadIcon, Loader2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

type Props = {
  endpoint: string
  label?: string
}

export function ExportCSVButton({ endpoint, label = 'Export CSV' }: Props) {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)

  const handleExport = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams(searchParams.toString())
      const res = await fetch(`${endpoint}?${params.toString()}`)
      if (!res.ok) throw new Error(`Export failed (${res.status})`)

      const blob = await res.blob()
      const filename = res.headers.get('Content-Disposition')
        ?.match(/filename="?([^"]+)"?/)?.[1] ?? 'export.csv'

      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      a.click()
      URL.revokeObjectURL(url)
      toast.success('CSV exported successfully')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Export failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handleExport} disabled={loading}>
      {loading
        ? <Loader2Icon className="mr-1.5 size-3.5 animate-spin" />
        : <DownloadIcon className="mr-1.5 size-3.5" />}
      {label}
    </Button>
  )
}
