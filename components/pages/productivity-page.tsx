"use client"

import { PeriodMetrics } from "@/components/period-metrics"
import { ProductivitySummary } from "@/components/productivity-summary"
import type { TransactionData } from "@/lib/csv-parser"

interface ProductivityPageProps {
  data: TransactionData[]
  dateRange: { start: Date; end: Date } | null
}

export function ProductivityPage({ data, dateRange }: ProductivityPageProps) {
  return (
    <div className="space-y-8">
      <ProductivitySummary data={data} dateRange={dateRange} />

      <PeriodMetrics data={data} />
    </div>
  )
}
