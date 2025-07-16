"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { TransactionData } from "@/lib/csv-parser"

interface MonthlyComparisonChartProps {
  data: TransactionData[]
}

export function MonthlyComparisonChart({ data }: MonthlyComparisonChartProps) {
  const comparisonData = useMemo(() => {
    const yearMonthMap = new Map<string, Map<string, number>>()

    data.forEach((transaction) => {
      const date = new Date(transaction.date)
      const year = date.getFullYear().toString()
      const month = date.toLocaleDateString("en-US", { month: "short" })

      if (!yearMonthMap.has(month)) {
        yearMonthMap.set(month, new Map())
      }

      const monthData = yearMonthMap.get(month)!
      const current = monthData.get(year) || 0
      monthData.set(year, current + transaction.amount)
    })

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const years = Array.from(new Set(data.map((t) => new Date(t.date).getFullYear()))).sort()

    return months.map((month) => {
      const monthData: any = { month }
      years.forEach((year) => {
        monthData[year.toString()] = yearMonthMap.get(month)?.get(year.toString()) || 0
      })
      return monthData
    })
  }, [data])

  const years = Array.from(new Set(data.map((t) => new Date(t.date).getFullYear()))).sort()
  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"]

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: $
              {entry.value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Year-over-Year Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `$${value.toLocaleString()}`} />
              <Tooltip content={<CustomTooltip />} />
              {years.map((year, index) => (
                <Bar key={year} dataKey={year.toString()} fill={COLORS[index % COLORS.length]} name={year.toString()} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
