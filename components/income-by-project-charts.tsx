"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts" // Removed BarChart, Bar, XAxis, YAxis, CartesianGrid
import type { TransactionData } from "@/lib/csv-parser"

interface IncomeByProjectChartsProps {
  data: TransactionData[]
  showOnlyDonut?: boolean // This prop will now effectively just control if this component is used for the donut chart
}

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
  "#84CC16",
  "#F97316",
  "#EC4899",
  "#6366F1",
]

export function IncomeByProjectCharts({ data }: IncomeByProjectChartsProps) {
  // Removed showOnlyDonut from props
  const projectData = useMemo(() => {
    const projectMap = new Map<string, number>()

    data.forEach((transaction) => {
      const current = projectMap.get(transaction.contract) || 0
      projectMap.set(transaction.contract, current + transaction.amount)
    })

    return Array.from(projectMap.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
  }, [data])

  const pieData = useMemo(() => {
    const total = projectData.reduce((sum, item) => sum + item.value, 0)
    return projectData.map((item) => ({
      ...item,
      percentage: ((item.value / total) * 100).toFixed(1),
    }))
  }, [projectData])

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{data.name}</p>
          <p className="text-green-600">
            ${data.value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          {data.percentage && <p className="text-gray-600 text-sm">{data.percentage}% of total</p>}
        </div>
      )
    }
    return null
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Top Earning Contracts</h2>
      <div className="max-w-2xl mx-auto">
        {" "}
        {/* Simplified layout as only donut chart remains */}
        {/* Donut Chart */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Income Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {pieData.slice(0, 5).map((item, index) => (
                <div key={item.name} className="flex items-center text-sm">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="flex-1 truncate">{item.name}</span>
                  <span className="font-medium">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
