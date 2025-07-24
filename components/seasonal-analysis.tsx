"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { TransactionData } from "@/lib/csv-parser"

interface SeasonalAnalysisProps {
  data: TransactionData[]
}

export function SeasonalAnalysis({ data }: SeasonalAnalysisProps) {
  const seasonalData = useMemo(() => {
    const quarterMap = new Map<string, number>()

    data.forEach((transaction) => {
      const date = new Date(transaction.date)
      const month = date.getMonth() + 1
      const year = date.getFullYear()

      let quarter: string
      if (month <= 3) quarter = `Q1 ${year}`
      else if (month <= 6) quarter = `Q2 ${year}`
      else if (month <= 9) quarter = `Q3 ${year}`
      else quarter = `Q4 ${year}`

      const current = quarterMap.get(quarter) || 0
      quarterMap.set(quarter, current + transaction.amount)
    })

    return Array.from(quarterMap.entries())
      .map(([quarter, income]) => ({ quarter, income }))
      .sort((a, b) => {
        // Extract year and quarter for proper chronological sorting
        const [aQuarter, aYear] = a.quarter.split(" ")
        const [bQuarter, bYear] = b.quarter.split(" ")

        // First sort by year, then by quarter
        if (aYear !== bYear) {
          return Number.parseInt(aYear) - Number.parseInt(bYear)
        }

        // If same year, sort by quarter (Q1, Q2, Q3, Q4)
        const quarterOrder = { Q1: 1, Q2: 2, Q3: 3, Q4: 4 }
        return quarterOrder[aQuarter] - quarterOrder[bQuarter]
      })
  }, [data])

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-1">{data.quarter}</p>
          <p className="text-orange-600 font-semibold">
            Total Income: ${data.income.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Seasonal Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={seasonalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="quarter" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={60} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `$${value.toLocaleString()}`} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#F59E0B"
                strokeWidth={3}
                dot={{ fill: "#F59E0B", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#F59E0B", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
