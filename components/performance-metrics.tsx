"use client"

import { useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Clock, Target, Award } from "lucide-react"
import type { TransactionData } from "@/lib/csv-parser"

interface PerformanceMetricsProps {
  data: TransactionData[]
}

export function PerformanceMetrics({ data }: PerformanceMetricsProps) {
  const metrics = useMemo(() => {
    const sortedData = data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    const midpoint = Math.floor(sortedData.length / 2)

    const firstHalf = sortedData.slice(0, midpoint)
    const secondHalf = sortedData.slice(midpoint)

    const firstHalfIncome = firstHalf.reduce((sum, t) => sum + t.amount, 0)
    const secondHalfIncome = secondHalf.reduce((sum, t) => sum + t.amount, 0)
    const incomeGrowth = firstHalfIncome > 0 ? ((secondHalfIncome - firstHalfIncome) / firstHalfIncome) * 100 : 0

    const firstHalfHours = firstHalf.reduce((sum, t) => sum + t.hours, 0)
    const secondHalfHours = secondHalf.reduce((sum, t) => sum + t.hours, 0)
    const firstHalfRate = firstHalfHours > 0 ? firstHalfIncome / firstHalfHours : 0
    const secondHalfRate = secondHalfHours > 0 ? secondHalfIncome / secondHalfHours : 0
    const rateGrowth = firstHalfRate > 0 ? ((secondHalfRate - firstHalfRate) / firstHalfRate) * 100 : 0

    const totalIncome = data.reduce((sum, t) => sum + t.amount, 0)
    const totalHours = data.reduce((sum, t) => sum + t.hours, 0)
    const avgRate = totalHours > 0 ? totalIncome / totalHours : 0

    const highestTransaction = Math.max(...data.map((t) => t.amount))
    const mostProductiveDay = data.reduce((max, t) => (t.amount > max.amount ? t : max), data[0])

    return {
      incomeGrowth,
      rateGrowth,
      avgRate,
      highestTransaction,
      mostProductiveDay,
      totalProjects: new Set(data.map((t) => t.contract)).size,
    }
  }, [data])

  const performanceCards = [
    {
      title: "Income Growth",
      value: `${metrics.incomeGrowth >= 0 ? "+" : ""}${metrics.incomeGrowth.toFixed(1)}%`,
      icon: metrics.incomeGrowth >= 0 ? TrendingUp : TrendingDown,
      color: metrics.incomeGrowth >= 0 ? "text-green-600" : "text-red-600",
      bgColor: metrics.incomeGrowth >= 0 ? "bg-green-50" : "bg-red-50",
    },
    {
      title: "Rate Growth",
      value: `${metrics.rateGrowth >= 0 ? "+" : ""}${metrics.rateGrowth.toFixed(1)}%`,
      icon: metrics.rateGrowth >= 0 ? TrendingUp : TrendingDown,
      color: metrics.rateGrowth >= 0 ? "text-green-600" : "text-red-600",
      bgColor: metrics.rateGrowth >= 0 ? "bg-green-50" : "bg-red-50",
    },
    {
      title: "Average Rate",
      value: `$${metrics.avgRate.toFixed(2)}`,
      icon: DollarSign,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Highest Transaction",
      value: `$${metrics.highestTransaction.toFixed(2)}`,
      icon: Award,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Most Productive",
      value: new Date(metrics.mostProductiveDay?.date || "").toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      icon: Target,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Active Projects",
      value: metrics.totalProjects.toString(),
      icon: Clock,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {performanceCards.map((card, index) => (
        <Card key={index} className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              </div>
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${card.bgColor}`}>
                <card.icon className={`w-6 h-6 ${card.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
