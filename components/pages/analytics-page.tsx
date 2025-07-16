"use client"

import { ProductivityAnalytics } from "@/components/productivity-analytics"
import { SeasonalAnalysis } from "@/components/seasonal-analysis"
import { PerformanceMetrics } from "@/components/performance-metrics"
import { ClientRetentionAnalysis } from "@/components/client-retention-analysis"
import type { TransactionData } from "@/lib/csv-parser"

interface AnalyticsPageProps {
  data: TransactionData[]
}

export function AnalyticsPage({ data }: AnalyticsPageProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Advanced Analytics</h2>
        <PerformanceMetrics data={data} />
      </div>

      {/* Productivity Analytics - Full Width */}
      <ProductivityAnalytics data={data} />

      {/* Seasonal Analysis - Full Width */}
      <SeasonalAnalysis data={data} />

      <ClientRetentionAnalysis data={data} />
    </div>
  )
}
