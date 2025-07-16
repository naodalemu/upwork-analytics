"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import type { TransactionData } from "@/lib/csv-parser"

interface PaymentTypeDistributionProps {
  data: TransactionData[]
}

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"]

export function PaymentTypeDistribution({ data }: PaymentTypeDistributionProps) {
  const paymentTypeData = useMemo(() => {
    const typeMap = new Map<string, number>()

    data.forEach((transaction) => {
      const current = typeMap.get(transaction.paymentType) || 0
      typeMap.set(transaction.paymentType, current + transaction.amount)
    })

    const total = Array.from(typeMap.values()).reduce((sum, value) => sum + value, 0)

    return Array.from(typeMap.entries()).map(([type, amount]) => ({
      type,
      amount,
      percentage: ((amount / total) * 100).toFixed(1),
    }))
  }, [data])

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-1">Payment Type: {data.type}</p>
          <p className="text-green-600">
            Total Amount: ${data.amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-gray-600">Percentage: {data.percentage}%</p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Payment Type Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={paymentTypeData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="amount"
                label={({ type, percentage }) => `${type}: ${percentage}%`}
              >
                {paymentTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 space-y-2">
          {paymentTypeData.map((item, index) => (
            <div key={item.type} className="flex items-center justify-between text-sm">
              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
              <span>{item.type}</span>
              <span className="font-medium">{item.percentage}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
