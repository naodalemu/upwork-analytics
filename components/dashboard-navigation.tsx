"use client"

import { BarChart3, Briefcase, TrendingUp, PieChart, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DashboardNavigationProps {
  currentPage: string
  onPageChange: (page: string) => void
}

const navigationItems = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "projects", label: "Projects", icon: Briefcase },
  { id: "trends", label: "Trends", icon: TrendingUp },
  { id: "analytics", label: "Analytics", icon: PieChart },
  { id: "transactions", label: "Transactions", icon: FileText },
]

export function DashboardNavigation({ currentPage, onPageChange }: DashboardNavigationProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <nav className="flex space-x-8">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => onPageChange(item.id)}
              className={`
                flex items-center space-x-2 px-3 py-4 border-b-2 transition-colors
                ${
                  currentPage === item.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }
              `}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Button>
          ))}
        </nav>
      </div>
    </div>
  )
}
