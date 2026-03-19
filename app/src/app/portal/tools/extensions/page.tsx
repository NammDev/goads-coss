import { DownloadIcon, ExternalLinkIcon, MessageCircleIcon } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getExtensionTokenStatus } from '@/lib/actions/extension-actions'
import { ExtensionTokenCard } from './extension-token-card'

const INSTALL_STEPS = [
  'Download the extension file (.zip) to your computer',
  'Open Chrome browser and go to chrome://extensions',
  'Enable "Developer mode" in the top right corner',
  'Drag and drop the .zip file onto the extensions page or click "Load unpacked"',
  'The extension will appear in your toolbar, ready to use',
]

export default async function PortalExtensionsPage() {
  const tokenRes = await getExtensionTokenStatus()
  const tokenStatus = tokenRes.success
    ? {
        hasToken: tokenRes.data.hasToken,
        id: tokenRes.data.id,
        lastUsedAt: tokenRes.data.lastUsedAt?.toISOString() ?? null,
        expiresAt: tokenRes.data.expiresAt?.toISOString(),
        createdAt: tokenRes.data.createdAt?.toISOString(),
      }
    : { hasToken: false }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Extensions</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Exclusive Chrome extensions for GoAds customers
        </p>
      </div>

      {/* BM Extension card */}
      <Card className="shadow-none">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle className="text-lg">BM Invite Extension</CardTitle>
              <p className="text-muted-foreground mt-1 text-sm">
                Chrome extension that automatically accepts Business Manager
                invitations, saving time on account setup.
              </p>
            </div>
            <Badge className="shrink-0 border-transparent bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
              Eligible
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button size="sm" className="gap-2">
            <DownloadIcon className="size-4" />
            Download Extension
          </Button>
          <Button variant="outline" size="sm" className="gap-2" asChild>
            <a
              href="https://goads.vn/tools/bm-invite"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLinkIcon className="size-4" />
              View Guide
            </a>
          </Button>
        </CardContent>
      </Card>

      {/* Token management */}
      <ExtensionTokenCard initial={tokenStatus} />

      {/* Installation guide */}
      <Card className="shadow-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Installation Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3">
            {INSTALL_STEPS.map((step, idx) => (
              <li key={idx} className="flex gap-3 text-sm">
                <span className="bg-primary/10 text-primary flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold">
                  {idx + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <div className="flex items-start gap-3 rounded-lg border border-dashed p-4 text-sm">
        <MessageCircleIcon className="text-muted-foreground mt-0.5 size-4 shrink-0" />
        <p className="text-muted-foreground">
          Not eligible? Contact admin via{' '}
          <a
            href="https://t.me/goads_support"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Telegram
          </a>{' '}
          to get activation support.
        </p>
      </div>
    </div>
  )
}
