import type { TransactionData } from "@/lib/csv-parser"

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

// Exact count of Mon-Fri weekdays between two midnight-normalized dates, inclusive.
function countWeekdays(startDay: Date, endDay: Date): number {
  let count = 0
  const cursor = new Date(startDay)
  while (cursor.getTime() <= endDay.getTime()) {
    const weekday = cursor.getDay()
    if (weekday !== 0 && weekday !== 6) count++
    cursor.setDate(cursor.getDate() + 1)
  }
  return count
}

export interface ProductivityStats {
  totalHours: number
  totalSessions: number
  calendarDays: number
  expectedWorkingDays: number
  avgHoursPerWorkingDay: number
  activeDaysWorked: number
  utilizationRate: number // activeDaysWorked / expectedWorkingDays
  avgHoursPerActiveDay: number
  avgSessionLength: number
  mostProductiveDay: { day: string; hours: number } | null
  leastProductiveDay: { day: string; hours: number } | null
  longestStreak: number
  longestBreak: number
}

export function calculateProductivityStats(
  data: TransactionData[],
  workDaysPerWeek: number,
  dateRange?: { start: Date; end: Date } | null,
): ProductivityStats {
  if (data.length === 0) {
    return {
      totalHours: 0,
      totalSessions: 0,
      calendarDays: 0,
      expectedWorkingDays: 0,
      avgHoursPerWorkingDay: 0,
      activeDaysWorked: 0,
      utilizationRate: 0,
      avgHoursPerActiveDay: 0,
      avgSessionLength: 0,
      mostProductiveDay: null,
      leastProductiveDay: null,
      longestStreak: 0,
      longestBreak: 0,
    }
  }

  const totalHours = data.reduce((sum, t) => sum + t.hours, 0)
  const totalSessions = data.length

  // Prefer the actual selected date range boundaries over the span between the
  // earliest/latest transaction, which understates the range whenever there's
  // no logged data right at its edges (e.g. no work on the very first or last day).
  let rangeStart: Date
  let rangeEnd: Date
  if (dateRange) {
    rangeStart = dateRange.start
    rangeEnd = dateRange.end
  } else {
    const timestamps = data.map((t) => new Date(t.date).getTime()).filter((t) => !isNaN(t))
    rangeStart = new Date(Math.min(...timestamps))
    rangeEnd = new Date(Math.max(...timestamps))
  }

  // Normalize both ends to midnight before diffing - rangeEnd may carry an
  // end-of-day (23:59:59.999) timestamp for inclusive filtering, which would
  // otherwise round up and double-count with the "+1" below.
  const startDay = new Date(rangeStart)
  startDay.setHours(0, 0, 0, 0)
  const endDay = new Date(rangeEnd)
  endDay.setHours(0, 0, 0, 0)
  const calendarDays = Math.max(1, Math.round((endDay.getTime() - startDay.getTime()) / 86400000) + 1)

  // A 5-day week unambiguously means Mon-Fri, so count it exactly. 6 and 7 don't
  // have one universal definition of which extra days count, so they stay on the
  // proportional formula (which is already exact for 7, since every day counts).
  const expectedWorkingDays =
    workDaysPerWeek === 5
      ? Math.max(1, countWeekdays(startDay, endDay))
      : Math.max(1, (calendarDays / 7) * workDaysPerWeek)
  const avgHoursPerWorkingDay = totalHours / expectedWorkingDays

  // Bucket hours per active calendar day and per weekday-of-week
  const hoursByDate = new Map<string, number>()
  const hoursByWeekday = new Map<number, number>()

  for (const t of data) {
    const date = new Date(t.date)
    if (isNaN(date.getTime())) continue
    const dateKey = date.toISOString().slice(0, 10)
    hoursByDate.set(dateKey, (hoursByDate.get(dateKey) || 0) + t.hours)
    const weekday = date.getDay()
    hoursByWeekday.set(weekday, (hoursByWeekday.get(weekday) || 0) + t.hours)
  }

  const activeDaysWorked = hoursByDate.size
  const utilizationRate = expectedWorkingDays > 0 ? activeDaysWorked / expectedWorkingDays : 0
  const avgHoursPerActiveDay = activeDaysWorked > 0 ? totalHours / activeDaysWorked : 0
  const avgSessionLength = totalSessions > 0 ? totalHours / totalSessions : 0

  let mostProductiveDay: { day: string; hours: number } | null = null
  let leastProductiveDay: { day: string; hours: number } | null = null
  for (const [weekday, hours] of hoursByWeekday.entries()) {
    if (!mostProductiveDay || hours > mostProductiveDay.hours) {
      mostProductiveDay = { day: DAY_NAMES[weekday], hours }
    }
    if (!leastProductiveDay || hours < leastProductiveDay.hours) {
      leastProductiveDay = { day: DAY_NAMES[weekday], hours }
    }
  }

  // Longest streak of consecutive active calendar days, and longest gap with no
  // hours logged - including any gap before the first / after the last active day,
  // relative to the selected range boundaries (not just gaps between active days).
  const sortedDates = Array.from(hoursByDate.keys()).sort()
  let longestStreak = sortedDates.length > 0 ? 1 : 0
  let currentStreak = sortedDates.length > 0 ? 1 : 0

  const rangeStartKey = rangeStart.toISOString().slice(0, 10)
  const rangeEndKey = rangeEnd.toISOString().slice(0, 10)
  const leadingGap = Math.round(
    (new Date(sortedDates[0]).getTime() - new Date(rangeStartKey).getTime()) / 86400000,
  )
  const trailingGap = Math.round(
    (new Date(rangeEndKey).getTime() - new Date(sortedDates[sortedDates.length - 1]).getTime()) / 86400000,
  )
  let longestBreak = Math.max(0, leadingGap, trailingGap)

  for (let i = 1; i < sortedDates.length; i++) {
    const prev = new Date(sortedDates[i - 1]).getTime()
    const curr = new Date(sortedDates[i]).getTime()
    const dayGap = Math.round((curr - prev) / 86400000)

    if (dayGap === 1) {
      currentStreak += 1
      longestStreak = Math.max(longestStreak, currentStreak)
    } else {
      currentStreak = 1
    }
    longestBreak = Math.max(longestBreak, dayGap - 1)
  }

  return {
    totalHours,
    totalSessions,
    calendarDays,
    expectedWorkingDays,
    avgHoursPerWorkingDay,
    activeDaysWorked,
    utilizationRate,
    avgHoursPerActiveDay,
    avgSessionLength,
    mostProductiveDay,
    leastProductiveDay,
    longestStreak,
    longestBreak,
  }
}
