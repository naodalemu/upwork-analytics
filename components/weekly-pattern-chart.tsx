"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { TransactionData } from "@/lib/csv-parser"

interface WeeklyPatternChartProps {
  data: TransactionData[]
}

export function WeeklyPatternChart({ data }: WeeklyPatternChartProps) {
  const weeklyData = useMemo(() => {
    const dayMap = new Map<number, { income: number; hours: number; count: number }>()

    data.forEach((transaction) => {
      const date = new Date(transaction.date)
      const dayOfWeek = date.getDay() // 0 = Sunday, 1 = Monday, etc.

      const current = dayMap.get(dayOfWeek) || { income: 0, hours: 0, count: 0 }
      current.income += transaction.amount
      current.hours += transaction.hours
      current.count += 1
      dayMap.set(dayOfWeek, current)
    })

    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    return dayNames.map((name, index) => {
      const data = dayMap.get(index) || { income: 0, hours: 0, count: 0 }
      return {
        day: name,
        income: data.income,
        hours: data.hours,
        avgIncome: data.count > 0 ? data.income / data.count : 0,
      }
    })
  }, [data])

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-1">{data.day}</p>
          <p className="text-green-600">
            Total Income: ${data.income.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-blue-600">Total Hours: {data.hours.toFixed(2)}h</p>
          <p className="text-purple-600">
            Avg Income per Transaction: $
            {data.avgIncome.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Weekly Work Pattern</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `$${value.toLocaleString()}`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="income" fill="#3B82F6" name="income" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
