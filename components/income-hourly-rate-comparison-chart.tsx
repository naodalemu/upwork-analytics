"use client"

import { useState, useMemo, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { TransactionData } from "@/lib/csv-parser"
import { getWeekNumber, type TimeGranularity } from "@/lib/utils"

interface IncomeHourlyRateComparisonChartProps {
  data: TransactionData[]
  initialGranularity?: TimeGranularity
  onGranularityChange?: (granularity: TimeGranularity) => void
}

export function IncomeHourlyRateComparisonChart({
  data,
  initialGranularity = "monthly",
  onGranularityChange,
}: IncomeHourlyRateComparisonChartProps) {
  const [granularity, setGranularity] = useState<TimeGranularity>(initialGranularity)

  useEffect(() => {
    setGranularity(initialGranularity)
  }, [initialGranularity])

  const handleGranularityChange = (value: TimeGranularity) => {
    setGranularity(value)
    onGranularityChange?.(value)
  }

  const comparisonData = useMemo(() => {
    const dataMap = new Map<string, { totalIncome: number; totalHours: number }>()

    data.forEach((transaction) => {
      const date = new Date(transaction.date)
      let key: string

      if (granularity === "monthly") {
        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
      } else if (granularity === "weekly") {
        key = getWeekNumber(date)
      } else {
        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
      }

      const current = dataMap.get(key) || { totalIncome: 0, totalHours: 0 }
      current.totalIncome += transaction.amount
      current.totalHours += transaction.hours
      dataMap.set(key, current)
    })

    return Array.from(dataMap.entries())
      .map(([key, data]) => {
        let formattedLabel: string
        if (granularity === "monthly") {
          formattedLabel = new Date(key + "-01").toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
          })
        } else if (granularity === "weekly") {
          const [yearStr, weekStr] = key.split("-W")
          const year = Number.parseInt(yearStr)
          const week = Number.parseInt(weekStr)
          const date = new Date(year, 0, 1 + (week - 1) * 7) // Start of the week
          date.setDate(date.getDate() + ((1 - date.getDay() + 7) % 7)) // Adjust to Monday
          formattedLabel = `Week of ${date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
        } else {
          formattedLabel = new Date(key).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        }
        return {
          key,
          income: data.totalIncome,
          hourlyRate: data.totalHours > 0 ? data.totalIncome / data.totalHours : 0,
          label: formattedLabel,
        }
      })
      .sort((a, b) => a.key.localeCompare(b.key))
  }, [data, granularity])

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const incomeData = payload.find((p: any) => p.dataKey === "income")
      const hourlyRateData = payload.find((p: any) => p.dataKey === "hourlyRate")

      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-1">{label}</p>
          {incomeData && (
            <p className="text-green-600">
              Income: $
              {incomeData.value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          )}
          {hourlyRateData && (
            <p className="text-purple-600">
              Hourly Rate: $
              {hourlyRateData.value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          )}
        </div>
      )
    }
    return null
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg">Monthly Income vs. Hourly Rate Trend</CardTitle>
        <Select value={granularity} onValueChange={(value) => handleGranularityChange(value as TimeGranularity)}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="daily">Daily</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={60} />
              <YAxis
                yAxisId="left"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
                label={{ value: "Income", angle: -90, position: "insideLeft", style: { textAnchor: "middle" } }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `$${value.toFixed(0)}`}
                label={{ value: "Hourly Rate", angle: 90, position: "insideRight", style: { textAnchor: "middle" } }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="income"
                stroke="#3B82F6"
                strokeWidth={3}
                name="Monthly Income"
                dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#3B82F6", strokeWidth: 2 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="hourlyRate"
                stroke="#8B5CF6"
                strokeWidth={3}
                name="Average Hourly Rate"
                dot={{ fill: "#8B5CF6", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#8B5CF6", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
