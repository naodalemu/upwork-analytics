"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Project {
  name: string
  totalIncome: number
  totalHours: number
  transactionCount: number
  avgHourlyRate: number
  firstTransaction: Date
  lastTransaction: Date
}

interface ProjectPerformanceTableProps {
  projects: Project[]
}

export function ProjectPerformanceTable({ projects }: ProjectPerformanceTableProps) {
  const sortedProjects = projects.sort((a, b) => b.totalIncome - a.totalIncome)

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Project Performance Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Total Income</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead>Avg Rate</TableHead>
                <TableHead>Transactions</TableHead>
                <TableHead>Duration</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedProjects.map((project, index) => {
                const durationDays = Math.ceil(
                  (project.lastTransaction.getTime() - project.firstTransaction.getTime()) / (1000 * 60 * 60 * 24),
                )

                return (
                  <TableRow key={index}>
                    <TableCell className="max-w-xs">
                      <div className="truncate font-medium" title={project.name}>
                        {project.name}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-green-600">
                      $
                      {project.totalIncome.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </TableCell>
                    <TableCell>{project.totalHours.toFixed(1)}h</TableCell>
                    <TableCell>
                      $
                      {project.avgHourlyRate.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </TableCell>
                    <TableCell>{project.transactionCount}</TableCell>
                    <TableCell>{durationDays} days</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
