"use client"

import { useState, useMemo, useCallback } from "react"
import { IncomeByProjectCharts } from "@/components/income-by-project-charts"
import { ProjectPerformanceTable } from "@/components/project-performance-table"
import { ProjectTimelineChart } from "@/components/project-timeline-chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { TransactionData } from "@/lib/csv-parser"
import type { TimeGranularity } from "@/lib/utils"

interface ProjectsPageProps {
  data: TransactionData[]
}

type ChartId = "projectTimeline"

export function ProjectsPage({ data }: ProjectsPageProps) {
  const projectStats = useMemo(() => {
    const projectMap = new Map<
      string,
      {
        totalIncome: number
        totalHours: number
        transactionCount: number
        avgHourlyRate: number
        firstTransaction: Date
        lastTransaction: Date
      }
    >()

    data.forEach((transaction) => {
      const existing = projectMap.get(transaction.contract) || {
        totalIncome: 0,
        totalHours: 0,
        transactionCount: 0,
        avgHourlyRate: 0,
        firstTransaction: new Date(transaction.date),
        lastTransaction: new Date(transaction.date),
      }

      existing.totalIncome += transaction.amount
      existing.totalHours += transaction.hours
      existing.transactionCount += 1
      existing.avgHourlyRate = existing.totalHours > 0 ? existing.totalIncome / existing.totalHours : 0

      const transactionDate = new Date(transaction.date)
      if (transactionDate < existing.firstTransaction) {
        existing.firstTransaction = transactionDate
      }
      if (transactionDate > existing.lastTransaction) {
        existing.lastTransaction = transactionDate
      }

      projectMap.set(transaction.contract, existing)
    })

    return Array.from(projectMap.entries()).map(([name, stats]) => ({
      name,
      ...stats,
    }))
  }, [data])

  const [globalGranularity, setGlobalGranularity] = useState<TimeGranularity>("monthly")
  const [chartSpecificGranularities, setChartSpecificGranularities] = useState<Record<ChartId, TimeGranularity>>({
    projectTimeline: "monthly",
  })

  const handleGlobalGranularityChange = useCallback((value: TimeGranularity | "variable") => {
    if (value !== "variable") {
      setGlobalGranularity(value)
      setChartSpecificGranularities({
        projectTimeline: value,
      })
    }
  }, [])

  const handleChartGranularityChange = useCallback((chartId: ChartId, newGranularity: TimeGranularity) => {
    setChartSpecificGranularities((prev) => {
      const updated = { ...prev, [chartId]: newGranularity }
      const allSame = Object.values(updated).every((g) => g === newGranularity)
      if (allSame) {
        setGlobalGranularity(newGranularity)
      } else {
        setGlobalGranularity("variable")
      }
      return updated
    })
  }, [])

  const currentGlobalGranularityDisplay = useMemo(() => {
    const allGranularities = Object.values(chartSpecificGranularities)
    const firstGranularity = allGranularities[0]
    const allMatch = allGranularities.every((g) => g === firstGranularity)

    if (allMatch) {
      return firstGranularity
    }
    return "variable"
  }, [chartSpecificGranularities])

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Project Analysis</h2>
        <div className="flex items-center space-x-2">
          <span className="text-gray-600 text-sm">Granularity:</span>
          <Select value={currentGlobalGranularityDisplay} onValueChange={handleGlobalGranularityChange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="variable" disabled={currentGlobalGranularityDisplay !== "variable"}>
                Variable
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <IncomeByProjectCharts data={data} />

      {/* Project Timeline Chart - Full Width */}
      <ProjectTimelineChart
        data={data}
        initialGranularity={chartSpecificGranularities.projectTimeline}
        onGranularityChange={(g) => handleChartGranularityChange("projectTimeline", g)}
      />

      <ProjectPerformanceTable projects={projectStats} />
    </div>
  )
}
