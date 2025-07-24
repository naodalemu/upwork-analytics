"use client"

import { useState, useMemo, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { TransactionData } from "@/lib/csv-parser"
import { getWeekNumber, type TimeGranularity } from "@/lib/utils"

interface ProjectTimelineChartProps {
  data: TransactionData[]
  initialGranularity?: TimeGranularity
  onGranularityChange?: (granularity: TimeGranularity) => void
}

function getQuarterKey(date: Date): string {
  const year = date.getFullYear()
  const quarter = Math.floor(date.getMonth() / 3) + 1
  return `${year}-Q${quarter}`
}

export function ProjectTimelineChart({
  data,
  initialGranularity = "monthly",
  onGranularityChange,
}: ProjectTimelineChartProps) {
  const [granularity, setGranularity] = useState<TimeGranularity>(initialGranularity)

  useEffect(() => {
    setGranularity(initialGranularity)
  }, [initialGranularity])

  const handleGranularityChange = (value: TimeGranularity) => {
    setGranularity(value)
    onGranularityChange?.(value)
  }

  const timelineData = useMemo(() => {
    const dataMap = new Map<string, Map<string, number>>()

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

      if (!dataMap.has(key)) {
        dataMap.set(key, new Map())
      }

      const periodData = dataMap.get(key)!
      const current = periodData.get(transaction.contract) || 0
      periodData.set(transaction.contract, current + transaction.amount)
    })

    // Get top 5 projects by total income for the entire dataset to ensure consistent bars
    const projectTotals = new Map<string, number>()
    data.forEach((transaction) => {
      const current = projectTotals.get(transaction.contract) || 0
      projectTotals.set(transaction.contract, current + transaction.amount)
    })

    const topProjects = Array.from(projectTotals.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name]) => name)

    return Array.from(dataMap.entries())
      .map(([key, projects]) => {
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
        } else if (granularity === "quarterly") {
          const [year, quarter] = key.split("-Q")
          formattedLabel = `${quarter} ${year}`
        } else {
          formattedLabel = new Date(key).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        }

        const periodData: any = {
          key,
          label: formattedLabel,
        }

        topProjects.forEach((project) => {
          periodData[project] = projects.get(project) || 0
        })

        return periodData
      })
      .sort((a, b) => a.key.localeCompare(b.key))
  }, [data, granularity])

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
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg">Project Timeline</CardTitle>
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
            <BarChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={60} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `$${value.toLocaleString()}`} />
              <Tooltip content={<CustomTooltip />} />
              {timelineData.length > 0 &&
                Object.keys(timelineData[0])
                  .filter((key) => key !== "key" && key !== "label") // Filter out internal keys
                  .map((project, index) => (
                    <Bar
                      key={project}
                      dataKey={project}
                      stackId="projects"
                      fill={COLORS[index % COLORS.length]}
                      name={project.length > 30 ? project.substring(0, 30) + "..." : project}
                    />
                  ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
