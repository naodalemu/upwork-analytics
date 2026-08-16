"use client"

import { useEffect, useMemo, useState } from "react"
import { Activity, Flame, CalendarCheck, Timer, TrendingUp, TrendingDown, CalendarX, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { calculateProductivityStats } from "@/lib/productivity-metrics"
import type { TransactionData } from "@/lib/csv-parser"

interface ProductivitySummaryProps {
  data: TransactionData[]
  dateRange?: { start: Date; end: Date } | null
}

const WORKWEEK_STORAGE_KEY = "productivity-workweek"
const TARGET_HOURS_PER_DAY = 8

export function ProductivitySummary({ data, dateRange }: ProductivitySummaryProps) {
  const [workDaysPerWeek, setWorkDaysPerWeek] = useState(5)

  useEffect(() => {
    const stored = sessionStorage.getItem(WORKWEEK_STORAGE_KEY)
    if (stored) setWorkDaysPerWeek(Number(stored))
  }, [])

  const handleWorkDaysChange = (value: string) => {
    setWorkDaysPerWeek(Number(value))
    sessionStorage.setItem(WORKWEEK_STORAGE_KEY, value)
  }

  const stats = useMemo(
    () => calculateProductivityStats(data, workDaysPerWeek, dateRange),
    [data, workDaysPerWeek, dateRange],
  )

  const ratio = stats.avgHoursPerWorkingDay / TARGET_HOURS_PER_DAY
  const status =
    ratio >= 0.95 && ratio <= 1.1 ? "on-target" : ratio > 1.1 ? "over" : "under"

  const statusStyles = {
    "on-target": "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950/40",
    over: "text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-950/40",
    under: "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/40",
  } as const

  const statusLabel = {
    "on-target": "On target",
    over: "Above target",
    under: "Below target",
  } as const

  const utilizationPct = Math.min(999, Math.round(stats.utilizationRate * 100))
  const progressPct = Math.min(150, Math.round(ratio * 100))

  return (
    <div>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-muted-foreground" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-foreground">Productivity</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-muted-foreground">Work week:</span>
          <Select value={String(workDaysPerWeek)} onValueChange={handleWorkDaysChange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 days/week</SelectItem>
              <SelectItem value="6">6 days/week</SelectItem>
              <SelectItem value="7">7 days/week</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Hero tier - the two headline numbers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-8">
            <p className="text-base font-medium text-gray-600 dark:text-muted-foreground mb-2">
              Avg Hours / Working Day
            </p>
            <p className="text-4xl font-bold text-gray-900 dark:text-foreground mb-4">
              {stats.avgHoursPerWorkingDay.toLocaleString("en-US", {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              })}
              h
            </p>
            <div className="h-2 w-full rounded-full bg-muted overflow-hidden mb-3">
              <div
                className={cn(
                  "h-full rounded-full",
                  status === "on-target" ? "bg-green-500" : status === "over" ? "bg-orange-500" : "bg-blue-500",
                )}
                style={{ width: `${Math.min(100, progressPct)}%` }}
              />
            </div>
            <span className={cn("inline-block text-xs font-medium px-2 py-1 rounded-full", statusStyles[status])}>
              {statusLabel[status]} ({TARGET_HOURS_PER_DAY}h/day goal)
            </span>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-8">
            <p className="text-base font-medium text-gray-600 dark:text-muted-foreground mb-2">Total Hours Logged</p>
            <p className="text-4xl font-bold text-gray-900 dark:text-foreground mb-4">
              {stats.totalHours.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}h
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-muted-foreground">
              <span>{stats.totalSessions} session{stats.totalSessions === 1 ? "" : "s"}</span>
              <span className="text-gray-300 dark:text-border">•</span>
              <span>{stats.activeDaysWorked} day{stats.activeDaysWorked === 1 ? "" : "s"} worked</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Medium tier - supporting metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-1">
              <CalendarCheck className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm font-medium text-gray-600 dark:text-muted-foreground">Days Worked</p>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-foreground">{stats.activeDaysWorked}</p>
            <p className="text-xs text-gray-500 dark:text-muted-foreground mt-2">{utilizationPct}% of expected</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-1">
              <Timer className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm font-medium text-gray-600 dark:text-muted-foreground">Hrs / Day Worked</p>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-foreground">
              {stats.avgHoursPerActiveDay.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}h
            </p>
            <p className="text-xs text-gray-500 dark:text-muted-foreground mt-2">Only days worked</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm font-medium text-gray-600 dark:text-muted-foreground">Avg Session</p>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-foreground">
              {stats.avgSessionLength.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}h
            </p>
            <p className="text-xs text-gray-500 dark:text-muted-foreground mt-2">Per transaction</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm font-medium text-gray-600 dark:text-muted-foreground">Expected Days</p>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-foreground">
              {Math.round(stats.expectedWorkingDays)}
            </p>
            <p className="text-xs text-gray-500 dark:text-muted-foreground mt-2">
              At {workDaysPerWeek}/week over {stats.calendarDays}d
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Small tier - detail/trivia metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm bg-muted/40">
          <CardContent className="p-4">
            <div className="flex items-center gap-1.5 mb-1">
              <Flame className="w-3.5 h-3.5 text-muted-foreground" />
              <p className="text-xs font-medium text-gray-600 dark:text-muted-foreground">Longest Streak</p>
            </div>
            <p className="text-lg font-semibold text-gray-900 dark:text-foreground">
              {stats.longestStreak}d
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-muted/40">
          <CardContent className="p-4">
            <div className="flex items-center gap-1.5 mb-1">
              <CalendarX className="w-3.5 h-3.5 text-muted-foreground" />
              <p className="text-xs font-medium text-gray-600 dark:text-muted-foreground">Longest Break</p>
            </div>
            <p className="text-lg font-semibold text-gray-900 dark:text-foreground">
              {stats.longestBreak}d
            </p>
          </CardContent>
        </Card>

        {stats.mostProductiveDay && (
          <Card className="border-0 shadow-sm bg-muted/40">
            <CardContent className="p-4">
              <div className="flex items-center gap-1.5 mb-1">
                <TrendingUp className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                <p className="text-xs font-medium text-gray-600 dark:text-muted-foreground">Best Day</p>
              </div>
              <p className="text-lg font-semibold text-gray-900 dark:text-foreground">
                {stats.mostProductiveDay.day}
              </p>
            </CardContent>
          </Card>
        )}

        {stats.leastProductiveDay && (
          <Card className="border-0 shadow-sm bg-muted/40">
            <CardContent className="p-4">
              <div className="flex items-center gap-1.5 mb-1">
                <TrendingDown className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                <p className="text-xs font-medium text-gray-600 dark:text-muted-foreground">Slowest Day</p>
              </div>
              <p className="text-lg font-semibold text-gray-900 dark:text-foreground">
                {stats.leastProductiveDay.day}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
