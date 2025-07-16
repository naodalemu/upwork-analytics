"use client"

import { KPICards } from "@/components/kpi-cards"
import { IncomeByProjectCharts } from "@/components/income-by-project-charts"
import { IncomeTrendChart } from "@/components/income-trend-chart"
import { RecentTransactions } from "@/components/recent-transactions"
import type { TransactionData } from "@/lib/csv-parser"

interface OverviewPageProps {
  data: TransactionData[]
}

export function OverviewPage({ data }: OverviewPageProps) {
  return (
    <div className="space-y-8">
      <KPICards data={data} />

      {/* Income Trend Chart - Full Width */}
      <IncomeTrendChart data={data} />

      {/* Income by Project - Full Width */}
      <IncomeByProjectCharts data={data} showOnlyDonut />

      <RecentTransactions data={data} />
    </div>
  )
}
