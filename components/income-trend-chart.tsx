"use client"

import { useState, useMemo, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { TransactionData } from "@/lib/csv-parser"
import { getWeekNumber, getQuarterKey, type TimeGranularity } from "@/lib/utils"

interface IncomeTrendChartProps {
  data: TransactionData[]
  initialGranularity?: TimeGranularity
  onGranularityChange?: (granularity: TimeGranularity) => void
}

export function IncomeTrendChart({ data, initialGranularity = "monthly", onGranularityChange }: IncomeTrendChartProps) {
  const [granularity, setGranularity] = useState<TimeGranularity>(initialGranularity)

  useEffect(() => {
    setGranularity(initialGranularity)
  }, [initialGranularity])

  const handleGranularityChange = (value: TimeGranularity) => {
    setGranularity(value)
    onGranularityChange?.(value)
  }

  const processedData = useMemo(() => {
    const incomeMap = new Map<string, number>()

    data.forEach((transaction) => {
      const date = new Date(transaction.date)
      let key: string

      if (granularity === "monthly") {
        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
      } else if (granularity === "weekly") {
        key = getWeekNumber(date)
      } else if (granularity === "quarterly") {
        key = getQuarterKey(date)
      } else {
        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
      }

      const current = incomeMap.get(key) || 0
      incomeMap.set(key, current + transaction.amount)
    })

    return Array.from(incomeMap.entries())
      .map(([key, income]) => {
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
          const date = new Date(year, 0, 1 + (week - 1) * 7)
          date.setDate(date.getDate() + ((1 - date.getDay() + 7) % 7))
          formattedLabel = `Week of ${date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
        } else if (granularity === "quarterly") {
          const [year, quarter] = key.split("-")
          formattedLabel = `${quarter} ${year}`
        } else {
          formattedLabel = new Date(key).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        }
        return {
          key,
          income,
          label: formattedLabel,
        }
      })
      .sort((a, b) => a.key.localeCompare(b.key))
  }, [data, granularity])

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-1">{data.label}</p>
          <p className="text-green-600 font-semibold">
            Total Income: ${data.income.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg">Monthly Income Trend</CardTitle>
        <Select value={granularity} onValueChange={(value) => handleGranularityChange(value as TimeGranularity)}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="quarterly">Quarterly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="daily">Daily</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={processedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={60} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `$${value.toLocaleString()}`} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#3B82F6"
                strokeWidth={3}
                dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#3B82F6", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
