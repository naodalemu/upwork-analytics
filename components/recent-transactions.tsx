"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { TransactionData } from "@/lib/csv-parser"

interface RecentTransactionsProps {
  data: TransactionData[]
}

export function RecentTransactions({ data }: RecentTransactionsProps) {
  const recentTransactions = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5)

  const getPaymentTypeBadgeColor = (paymentType: string) => {
    switch (paymentType.toLowerCase()) {
      case "bonus":
        return "bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-400"
      case "hourly":
        return "bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-400"
      case "fixed":
        return "bg-purple-100 text-purple-800 dark:bg-purple-950/40 dark:text-purple-400"
      default:
        return "bg-muted text-foreground"
    }
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTransactions.map((transaction, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-foreground truncate">{transaction.contract}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(transaction.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  • {transaction.hours.toFixed(2)}h
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Badge variant="secondary" className={getPaymentTypeBadgeColor(transaction.paymentType)}>
                  {transaction.paymentType}
                </Badge>
                <p className="font-semibold text-green-600">
                  ${transaction.amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
