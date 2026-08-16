import type { TransactionData } from "@/lib/csv-parser"
import { getWeekNumber } from "@/lib/utils"

export type TimePeriod = "daily" | "weekly" | "monthly" | "yearly"

export interface PeriodMetrics {
  period: TimePeriod
  label: string
  periodsWorked: number
  averageHours: number
  averageIncome: number
}

function getPeriodKey(date: Date, period: TimePeriod): string {
  switch (period) {
    case "daily":
      return date.toISOString().slice(0, 10)
    case "weekly":
      return getWeekNumber(date)
    case "monthly":
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
    case "yearly":
      return `${date.getFullYear()}`
  }
}

const PERIOD_LABELS: Record<TimePeriod, string> = {
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
  yearly: "Yearly",
}

export function calculatePeriodMetrics(data: TransactionData[], period: TimePeriod): PeriodMetrics {
  const hoursByPeriod = new Map<string, number>()
  const incomeByPeriod = new Map<string, number>()

  for (const transaction of data) {
    const date = new Date(transaction.date)
    if (isNaN(date.getTime())) continue

    const key = getPeriodKey(date, period)
    hoursByPeriod.set(key, (hoursByPeriod.get(key) || 0) + transaction.hours)
    incomeByPeriod.set(key, (incomeByPeriod.get(key) || 0) + transaction.amount)
  }

  const periodsWorked = hoursByPeriod.size
  const totalHours = data.reduce((sum, t) => sum + t.hours, 0)
  const totalIncome = data.reduce((sum, t) => sum + t.amount, 0)

  return {
    period,
    label: PERIOD_LABELS[period],
    periodsWorked,
    averageHours: periodsWorked > 0 ? totalHours / periodsWorked : 0,
    averageIncome: periodsWorked > 0 ? totalIncome / periodsWorked : 0,
  }
}

export function calculateAllPeriodMetrics(data: TransactionData[]): PeriodMetrics[] {
  return (["daily", "weekly", "monthly", "yearly"] as TimePeriod[]).map((period) =>
    calculatePeriodMetrics(data, period),
  )
}
