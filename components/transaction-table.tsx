"use client"

import { useState, useMemo } from "react"
import { Search, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import type { TransactionData } from "@/lib/csv-parser"

interface TransactionTableProps {
  data: TransactionData[]
}

type SortField = "date" | "contract" | "hours" | "amount" | "paymentType"
type SortDirection = "asc" | "desc"

export function TransactionTable({ data }: TransactionTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<SortField>("date")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")

  // Add pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const { paginatedData, totalPages, totalItems } = useMemo(() => {
    const filtered = data.filter(
      (transaction) =>
        transaction.contract.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.paymentType.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    filtered.sort((a, b) => {
      let aValue: any = a[sortField]
      let bValue: any = b[sortField]

      if (sortField === "date") {
        aValue = new Date(aValue).getTime()
        bValue = new Date(bValue).getTime()
      } else if (sortField === "amount" || sortField === "hours") {
        aValue = Number(aValue)
        bValue = Number(bValue)
      }

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    const totalPages = Math.ceil(filtered.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedData = filtered.slice(startIndex, startIndex + itemsPerPage)

    return { paginatedData, totalPages, totalItems: filtered.length }
  }, [data, searchTerm, sortField, sortDirection, currentPage])

  // Reset to first page when search changes
  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

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
    <div>
      <h2 className="text-xl font-semibold text-foreground mb-4">The Details</h2>
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Transaction History</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("date")} className="h-auto p-0 font-medium">
                      Date
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("contract")} className="h-auto p-0 font-medium">
                      Contract
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("hours")} className="h-auto p-0 font-medium">
                      Hours
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("amount")} className="h-auto p-0 font-medium">
                      Amount
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("paymentType")}
                      className="h-auto p-0 font-medium"
                    >
                      Payment Type
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((transaction, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {new Date(transaction.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <div className="truncate" title={transaction.contract}>
                        {transaction.contract}
                      </div>
                    </TableCell>
                    <TableCell>{transaction.hours.toFixed(2)}h</TableCell>
                    <TableCell className="font-medium text-green-600">
                      $
                      {transaction.amount.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getPaymentTypeBadgeColor(transaction.paymentType)}>
                        {transaction.paymentType}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {paginatedData.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">No transactions found matching your search.</div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of{" "}
                {totalItems} transactions
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
