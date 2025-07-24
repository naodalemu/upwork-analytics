"use client"

import { useState, useMemo, useCallback } from "react"
import { IncomeTrendChart } from "@/components/income-trend-chart"
import { HourlyRateTrendChart } from "@/components/hourly-rate-trend-chart"
import { MonthlyComparisonChart } from "@/components/monthly-comparison-chart"
import { PaymentTypeDistribution } from "@/components/payment-type-distribution"
import { IncomeHourlyRateComparisonChart } from "@/components/income-hourly-rate-comparison-chart"
import { TotalHoursWorkedChart } from "@/components/total-hours-worked-chart"
import { IncomeHoursComparisonChart } from "@/components/income-hours-comparison-chart" // New import
import { WeeklyPatternChart } from "@/components/weekly-pattern-chart" // New import
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { TransactionData } from "@/lib/csv-parser"
import type { TimeGranularity } from "@/lib/utils"

interface TrendsPageProps {
  data: TransactionData[]
}

type ChartId =
  | "incomeTrend"
  | "hourlyRateTrend"
  | "incomeHourlyRateComparison"
  | "totalHoursWorked"
  | "incomeHoursComparison"

export function TrendsPage({ data }: TrendsPageProps) {
  const [globalGranularity, setGlobalGranularity] = useState<TimeGranularity>("monthly")
  const [chartSpecificGranularities, setChartSpecificGranularities] = useState<Record<ChartId, TimeGranularity>>({
    incomeTrend: "monthly",
    hourlyRateTrend: "monthly",
    incomeHourlyRateComparison: "monthly",
    totalHoursWorked: "monthly",
    incomeHoursComparison: "monthly",
  })

  const handleGlobalGranularityChange = useCallback((value: TimeGranularity | "variable") => {
    if (value !== "variable") {
      setGlobalGranularity(value)
      setChartSpecificGranularities({
        incomeTrend: value,
        hourlyRateTrend: value,
        incomeHourlyRateComparison: value,
        totalHoursWorked: value,
        incomeHoursComparison: value,
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
        <h2 className="text-2xl font-bold text-gray-900">Income & Performance Trends</h2>
        <div className="flex items-center space-x-2">
          <span className="text-gray-600 text-sm">Granularity:</span>
          <Select value={currentGlobalGranularityDisplay} onValueChange={handleGlobalGranularityChange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="quarterly">Quarterly</SelectItem>
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

      {/* Income Trend Chart */}
      <div className="mb-8">
        <IncomeTrendChart
          data={data}
          initialGranularity={chartSpecificGranularities.incomeTrend}
          onGranularityChange={(g) => handleChartGranularityChange("incomeTrend", g)}
        />
      </div>

      {/* Hourly Rate Trend Chart */}
      <div className="mb-8">
        <HourlyRateTrendChart
          data={data}
          initialGranularity={chartSpecificGranularities.hourlyRateTrend}
          onGranularityChange={(g) => handleChartGranularityChange("hourlyRateTrend", g)}
        />
      </div>

      {/* Total Hours Worked Chart */}
      <div className="mb-8">
        <TotalHoursWorkedChart
          data={data}
          initialGranularity={chartSpecificGranularities.totalHoursWorked}
          onGranularityChange={(g) => handleChartGranularityChange("totalHoursWorked", g)}
        />
      </div>

      {/* New Comparison Chart: Income vs. Hours */}
      <div className="mb-8">
        <IncomeHoursComparisonChart
          data={data}
          initialGranularity={chartSpecificGranularities.incomeHoursComparison}
          onGranularityChange={(g) => handleChartGranularityChange("incomeHoursComparison", g)}
        />
      </div>

      {/* New Comparison Chart: Income vs. Hourly Rate */}
      <IncomeHourlyRateComparisonChart
        data={data}
        initialGranularity={chartSpecificGranularities.incomeHourlyRateComparison}
        onGranularityChange={(g) => handleChartGranularityChange("incomeHourlyRateComparison", g)}
      />

      {/* Weekly Pattern Chart - Does not use global granularity */}
      <div className="mb-8">
        <WeeklyPatternChart data={data} />
      </div>

      {/* Payment Type Distribution - Does not use global granularity */}
      <div className="mb-8">
        <PaymentTypeDistribution data={data} />
      </div>

      {/* Monthly Comparison Chart - Does not use global granularity */}
      <MonthlyComparisonChart data={data} />
    </div>
  )
}
