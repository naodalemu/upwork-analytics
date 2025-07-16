"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import type { TransactionData } from "@/lib/csv-parser"

interface ClientRetentionAnalysisProps {
  data: TransactionData[]
}

export function ClientRetentionAnalysis({ data }: ClientRetentionAnalysisProps) {
  const clientAnalysis = useMemo(() => {
    const clientMap = new Map<
      string,
      {
        totalIncome: number
        totalHours: number
        transactionCount: number
        firstTransaction: Date
        lastTransaction: Date
        avgTransactionValue: number
      }
    >()

    data.forEach((transaction) => {
      const existing = clientMap.get(transaction.contract) || {
        totalIncome: 0,
        totalHours: 0,
        transactionCount: 0,
        firstTransaction: new Date(transaction.date),
        lastTransaction: new Date(transaction.date),
        avgTransactionValue: 0,
      }

      existing.totalIncome += transaction.amount
      existing.totalHours += transaction.hours
      existing.transactionCount += 1

      const transactionDate = new Date(transaction.date)
      if (transactionDate < existing.firstTransaction) {
        existing.firstTransaction = transactionDate
      }
      if (transactionDate > existing.lastTransaction) {
        existing.lastTransaction = transactionDate
      }

      clientMap.set(transaction.contract, existing)
    })

    return Array.from(clientMap.entries())
      .map(([name, stats]) => {
        const durationDays = Math.ceil(
          (stats.lastTransaction.getTime() - stats.firstTransaction.getTime()) / (1000 * 60 * 60 * 24),
        )

        return {
          name,
          ...stats,
          avgTransactionValue: stats.totalIncome / stats.transactionCount,
          durationDays: Math.max(1, durationDays),
          status: durationDays > 90 ? "Long-term" : durationDays > 30 ? "Regular" : "New",
        }
      })
      .sort((a, b) => b.totalIncome - a.totalIncome)
  }, [data])

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Long-term":
        return "bg-green-100 text-green-800"
      case "Regular":
        return "bg-blue-100 text-blue-800"
      case "New":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Client Retention Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total Income</TableHead>
                <TableHead>Transactions</TableHead>
                <TableHead>Avg Value</TableHead>
                <TableHead>Duration</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientAnalysis.slice(0, 10).map((client, index) => (
                <TableRow key={index}>
                  <TableCell className="max-w-xs">
                    <div className="truncate font-medium" title={client.name}>
                      {client.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={getStatusBadgeColor(client.status)}>
                      {client.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium text-green-600">
                    $
                    {client.totalIncome.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell>{client.transactionCount}</TableCell>
                  <TableCell>
                    $
                    {client.avgTransactionValue.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell>{client.durationDays} days</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
