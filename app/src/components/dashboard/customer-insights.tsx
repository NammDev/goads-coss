"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, UserIcon, MapPin } from "lucide-react"
import { CustomerInsightsGrowth } from "./customer-insights-growth"
import {
  CustomerInsightsDemographics,
  CustomerInsightsRegions,
  TablePagination,
} from "./customer-insights-demographics"

export function CustomerInsights() {
  const [activeTab, setActiveTab] = useState("growth")

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Customer Insights</CardTitle>
        <CardDescription>Growth trends and demographics</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-muted/50 p-1 rounded-full h-12">
            <TabsTrigger
              value="growth"
              className="cursor-pointer flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium !text-foreground/70 transition-all data-[state=active]:!bg-background data-[state=active]:shadow-sm data-[state=active]:!text-foreground"
            >
              <TrendingUp className="h-4 w-4" />
              Growth
            </TabsTrigger>
            <TabsTrigger
              value="demographics"
              className="cursor-pointer flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium !text-foreground/70 transition-all data-[state=active]:!bg-background data-[state=active]:shadow-sm data-[state=active]:!text-foreground"
            >
              <UserIcon className="h-4 w-4" />
              Demographics
            </TabsTrigger>
            <TabsTrigger
              value="regions"
              className="cursor-pointer flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium !text-foreground/70 transition-all data-[state=active]:!bg-background data-[state=active]:shadow-sm data-[state=active]:!text-foreground"
            >
              <MapPin className="h-4 w-4" />
              Regions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="growth" className="mt-8 space-y-6">
            <div className="grid gap-6">
              <CustomerInsightsGrowth />
            </div>
          </TabsContent>

          <TabsContent value="demographics" className="mt-8">
            <CustomerInsightsDemographics />
            <TablePagination count={5} />
          </TabsContent>

          <TabsContent value="regions" className="mt-8">
            <CustomerInsightsRegions />
            <TablePagination count={5} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
