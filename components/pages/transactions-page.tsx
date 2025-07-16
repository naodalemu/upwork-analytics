"use client"

import { TransactionTable } from "@/components/transaction-table"
import type { TransactionData } from "@/lib/csv-parser"

interface TransactionsPageProps {
  data: TransactionData[]
}

export function TransactionsPage({ data }: TransactionsPageProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Transaction History</h2>
        <TransactionTable data={data} />
      </div>
    </div>
  )
}
