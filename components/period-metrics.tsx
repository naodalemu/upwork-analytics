"use client"

import { useMemo } from "react"
import { CalendarDays } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { calculateAllPeriodMetrics, type PeriodMetrics as PeriodMetricsData } from "@/lib/time-metrics"
import type { TransactionData } from "@/lib/csv-parser"
import { cn } from "@/lib/utils"

interface PeriodMetricsProps {
  data: TransactionData[]
}

function StatBlock({
  m,
  size,
}: {
  m: PeriodMetricsData
  size: "hero" | "compact"
}) {
  const valueClass = size === "hero" ? "text-3xl" : "text-xl"

  return (
    <Card className="border-0 shadow-sm h-full">
      <CardContent className={cn("h-full flex flex-col", size === "hero" ? "p-7" : "p-5")}>
        <p
          className={cn(
            "font-medium text-gray-600 dark:text-muted-foreground mb-4",
            size === "hero" ? "text-base" : "text-sm",
          )}
        >
          {m.label}
        </p>
        <div className="grid grid-cols-2 gap-4 mb-auto">
          <div>
            <p className={cn("font-bold text-gray-900 dark:text-foreground", valueClass)}>
              {m.averageHours.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}h
            </p>
            <p className="text-xs text-gray-500 dark:text-muted-foreground">Avg hours</p>
          </div>
          <div>
            <p className={cn("font-bold text-gray-900 dark:text-foreground", valueClass)}>
              $
              {m.averageIncome.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </p>
            <p className="text-xs text-gray-500 dark:text-muted-foreground">Avg income</p>
          </div>
        </div>
        <p className="text-xs text-gray-500 dark:text-muted-foreground mt-4">
          {m.periodsWorked} {m.label.toLowerCase()} period{m.periodsWorked === 1 ? "" : "s"} worked
        </p>
      </CardContent>
    </Card>
  )
}

export function PeriodMetrics({ data }: PeriodMetricsProps) {
  const metrics = useMemo(() => calculateAllPeriodMetrics(data), [data])
  const byPeriod = Object.fromEntries(metrics.map((m) => [m.period, m]))

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <CalendarDays className="w-5 h-5 text-muted-foreground" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-foreground">Averages Over Time</h2>
      </div>

      {/* Monthly and yearly are the numbers freelancers care about most - shown big */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <StatBlock m={byPeriod.monthly} size="hero" />
        <StatBlock m={byPeriod.yearly} size="hero" />
      </div>

      {/* Daily and weekly are noisier / less commonly acted on - shown smaller */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatBlock m={byPeriod.daily} size="compact" />
        <StatBlock m={byPeriod.weekly} size="compact" />
      </div>
    </div>
  )
}
