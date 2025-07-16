export interface TransactionData {
  date: string
  contract: string
  hours: number
  amount: number
  paymentType: string
}

export function parseCSVData(csvText: string): TransactionData[] {
  const lines = csvText.trim().split("\n")
  const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""))

  const data: TransactionData[] = []

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i])

    if (values.length >= 5) {
      data.push({
        date: values[0],
        contract: values[1],
        hours: Number.parseFloat(values[2]) || 0,
        amount: Number.parseFloat(values[3]) || 0,
        paymentType: values[4],
      })
    }
  }

  return data
}

function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ""
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]

    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === "," && !inQuotes) {
      result.push(current.trim())
      current = ""
    } else {
      current += char
    }
  }

  result.push(current.trim())
  return result
}

export function calculateMetrics(data: TransactionData[]) {
  const totalIncome = data.reduce((sum, transaction) => sum + transaction.amount, 0)
  const totalHours = data.reduce((sum, transaction) => sum + transaction.hours, 0)
  const averageHourlyRate = totalHours > 0 ? totalIncome / totalHours : 0
  const totalProjects = new Set(data.map((transaction) => transaction.contract)).size

  return {
    totalIncome,
    totalHours,
    averageHourlyRate,
    totalProjects,
  }
}

// Update filterDataByDateRange to accept DateRange object
import type { DateRange } from "react-day-picker"

export function filterDataByDateRange(data: TransactionData[], range: string | DateRange): TransactionData[] {
  if (typeof range === "string") {
    if (range === "all") return data

    const days = Number.parseInt(range)
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - days)
    cutoffDate.setHours(0, 0, 0, 0) // Set to start of day for accurate comparison

    return data.filter((transaction) => {
      const transactionDate = new Date(transaction.date)
      transactionDate.setHours(0, 0, 0, 0) // Set to start of day
      return transactionDate >= cutoffDate
    })
  } else if (range && range.from) {
    const fromDate = new Date(range.from)
    fromDate.setHours(0, 0, 0, 0)

    let toDate: Date | undefined = undefined
    if (range.to) {
      toDate = new Date(range.to)
      toDate.setHours(23, 59, 59, 999) // Set to end of day
    }

    return data.filter((transaction) => {
      const transactionDate = new Date(transaction.date)
      transactionDate.setHours(0, 0, 0, 0) // Set to start of day for comparison

      const isAfterFrom = transactionDate >= fromDate
      const isBeforeTo = toDate ? transactionDate <= toDate : true

      return isAfterFrom && isBeforeTo
    })
  }
  return data // Fallback if no valid range is provided
}
