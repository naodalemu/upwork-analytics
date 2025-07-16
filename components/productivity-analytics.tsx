"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { TransactionData } from "@/lib/csv-parser"

interface ProductivityAnalyticsProps {
  data: TransactionData[]
}

export function ProductivityAnalytics({ data }: ProductivityAnalyticsProps) {
  const productivityData = useMemo(() => {
    const hourRanges = [
      { range: "0-2h", min: 0, max: 2 },
      { range: "2-4h", min: 2, max: 4 },
      { range: "4-6h", min: 4, max: 6 },
      { range: "6-8h", min: 6, max: 8 },
      { range: "8+h", min: 8, max: Number.POSITIVE_INFINITY },
    ]

    const rangeData = hourRanges.map(({ range, min, max }) => {
      const transactions = data.filter((t) => t.hours >= min && t.hours < max)
      const totalIncome = transactions.reduce((sum, t) => sum + t.amount, 0)
      const totalHours = transactions.reduce((sum, t) => sum + t.hours, 0)
      const avgRate = totalHours > 0 ? totalIncome / totalHours : 0

      return {
        range,
        transactions: transactions.length,
        totalIncome,
        avgRate,
      }
    })

    return rangeData
  }, [data])

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-1">Session Length: {data.range}</p>
          <p className="text-green-600">
            Total Income: $
            {data.totalIncome.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-blue-600">Transactions: {data.transactions}</p>
          <p className="text-purple-600">
            Avg Hourly Rate: $
            {data.avgRate.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Productivity by Session Length</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={productivityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `$${value.toFixed(0)}`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="avgRate" fill="#10B981" name="avgRate" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
