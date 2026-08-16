"use client"

import { useMemo } from "react"
import { DollarSign, Clock, TrendingUp, Briefcase } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { calculateMetrics, type TransactionData } from "@/lib/csv-parser"

interface KPICardsProps {
  data: TransactionData[]
}

export function KPICards({ data }: KPICardsProps) {
  const metrics = useMemo(() => {
    return calculateMetrics(data)
  }, [data])

  const kpis = [
    {
      title: "Total Income",
      value: `$${metrics.totalIncome.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: DollarSign,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-950/40",
    },
    {
      title: "Total Hours",
      value: `${metrics.totalHours.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}h`,
      icon: Clock,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950/40",
    },
    {
      title: "Average Hourly Rate",
      value: `$${metrics.averageHourlyRate.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: TrendingUp,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-950/40",
    },
    {
      title: "Total Projects",
      value: metrics.totalProjects.toString(),
      icon: Briefcase,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-950/40",
    },
  ]

  return (
    <div>
      <h2 className="text-xl font-semibold text-foreground mb-4">At a Glance</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <Card key={index} className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">{kpi.title}</p>
                  <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                </div>
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${kpi.bgColor}`}>
                  <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
