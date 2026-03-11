'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'

export default function SettingsPage() {
  function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>

      <Tabs defaultValue="general">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        {/* General tab */}
        <TabsContent value="general">
          <Card className="shadow-none">
            <CardHeader>
              <span className="text-lg font-semibold">General Settings</span>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-5 max-w-lg">
                <div className="space-y-2">
                  <Label htmlFor="system-name">System Name</Label>
                  <Input id="system-name" defaultValue="GoAds Admin" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bot-token">Telegram Bot Token</Label>
                  <Input
                    id="bot-token"
                    type="password"
                    placeholder="bot123456:ABC-DEF..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="warranty-days">Warranty Period (days)</Label>
                  <Input
                    id="warranty-days"
                    type="number"
                    min={1}
                    max={365}
                    defaultValue={7}
                  />
                </div>

                <Button type="submit">Save Settings</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications tab */}
        <TabsContent value="notifications">
          <Card className="shadow-none">
            <CardHeader>
              <span className="text-lg font-semibold">Notification Settings</span>
            </CardHeader>
            <CardContent className="space-y-4 max-w-lg">
              {[
                { id: 'notif-new-order', label: 'Notify on new orders' },
                { id: 'notif-payment', label: 'Notify on payment received' },
                { id: 'notif-cancelled', label: 'Notify on order cancellation' },
                { id: 'notif-new-customer', label: 'Notify on new customer registration' },
                { id: 'notif-low-stock', label: 'Notify on low stock' },
              ].map((item) => (
                <div key={item.id}>
                  <div className="flex items-center gap-3 py-1">
                    <Checkbox id={item.id} defaultChecked />
                    <Label htmlFor={item.id} className="cursor-pointer font-normal">
                      {item.label}
                    </Label>
                  </div>
                  <Separator className="mt-3" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations tab */}
        <TabsContent value="integrations">
          <Card className="shadow-none">
            <CardHeader>
              <span className="text-lg font-semibold">Integrations</span>
            </CardHeader>
            <CardContent className="space-y-4 max-w-lg">
              {[
                {
                  name: 'Telegram',
                  description: 'Receive notifications via Telegram Bot',
                  connected: true,
                },
                {
                  name: 'Zalo',
                  description: 'Receive notifications via Zalo OA',
                  connected: false,
                },
              ].map((integration) => (
                <div
                  key={integration.name}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="space-y-0.5">
                    <p className="font-medium">{integration.name}</p>
                    <p className="text-muted-foreground text-sm">{integration.description}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      integration.connected
                        ? 'border-transparent bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'
                        : 'border-transparent bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400'
                    }
                  >
                    {integration.connected ? 'Connected' : 'Not connected'}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
