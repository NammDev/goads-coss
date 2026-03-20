'use client'
import { useSearchParams } from 'next/navigation'
import { DownloadIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Props = {
  endpoint: string
  label?: string
}

export function ExportCSVButton({ endpoint, label = 'Export CSV' }: Props) {
  const searchParams = useSearchParams()

  const handleExport = () => {
    const params = new URLSearchParams(searchParams.toString())
    window.open(`${endpoint}?${params.toString()}`, '_blank')
  }

  return (
    <Button variant="outline" size="sm" onClick={handleExport}>
      <DownloadIcon className="mr-1.5 size-3.5" />
      {label}
    </Button>
  )
}
