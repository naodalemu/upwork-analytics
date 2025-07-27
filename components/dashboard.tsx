"use client";

import { useState, useMemo } from "react";
import { ArrowLeft, Calendar, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DashboardNavigation } from "@/components/dashboard-navigation";
import { OverviewPage } from "@/components/pages/overview-page";
import { ProjectsPage } from "@/components/pages/projects-page";
import { TrendsPage } from "@/components/pages/trends-page";
import { AnalyticsPage } from "@/components/pages/analytics-page";
import { TransactionsPage } from "@/components/pages/transactions-page";
import { filterDataByDateRange, type TransactionData } from "@/lib/csv-parser";
import { DateRangePicker } from "@/components/date-range-picker";
import type { DateRange } from "react-day-picker";
import Link from "next/link";

interface DashboardProps {
  data: TransactionData[];
  onReset: () => void;
}

export function Dashboard({ data, onReset }: DashboardProps) {
  const [currentPage, setCurrentPage] = useState("overview");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [customDateRange, setCustomDateRange] = useState<DateRange | undefined>(
    undefined
  );

  const filteredData = useMemo(() => {
    if (customDateRange && customDateRange.from) {
      return filterDataByDateRange(data, customDateRange);
    }
    return filterDataByDateRange(data, dateFilter);
  }, [data, dateFilter, customDateRange]);

  const handlePredefinedDateChange = (value: string) => {
    setDateFilter(value);
    setCustomDateRange(undefined);
  };

  const handleCustomDateRangeChange = (range: DateRange | undefined) => {
    setCustomDateRange(range);
    if (range && range.from) {
      setDateFilter("custom");
    } else {
      setDateFilter("all");
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case "overview":
        return <OverviewPage data={filteredData} />;
      case "projects":
        return <ProjectsPage data={filteredData} />;
      case "trends":
        return <TrendsPage data={filteredData} />;
      case "analytics":
        return <AnalyticsPage data={filteredData} />;
      case "transactions":
        return <TransactionsPage data={filteredData} />;
      default:
        return <OverviewPage data={filteredData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onReset}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Upload
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Financial Dashboard
                </h1>
                <p className="text-gray-600">
                  Analyzing {data.length} transactions
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <Select
                  value={dateFilter}
                  onValueChange={handlePredefinedDateChange}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Select Date Range">
                      {dateFilter === "custom" && customDateRange?.from
                        ? `${customDateRange.from.toLocaleDateString()} - ${
                            customDateRange.to
                              ? customDateRange.to.toLocaleDateString()
                              : "..."
                          }`
                        : dateFilter === "all"
                        ? "All Time"
                        : dateFilter === "30"
                        ? "Last 30 Days"
                        : dateFilter === "90"
                        ? "Last 3 Months"
                        : dateFilter === "180"
                        ? "Last 6 Months"
                        : dateFilter === "365"
                        ? "Last Year"
                        : "Select Date Range"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="30">Last 30 Days</SelectItem>
                    <SelectItem value="90">Last 3 Months</SelectItem>
                    <SelectItem value="180">Last 6 Months</SelectItem>
                    <SelectItem value="365">Last Year</SelectItem>
                    {customDateRange && customDateRange.from && (
                      <SelectItem value="custom">
                        Custom: {customDateRange.from.toLocaleDateString()} -{" "}
                        {customDateRange.to
                          ? customDateRange.to.toLocaleDateString()
                          : "..."}
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
              {/* Add the custom date range picker */}
              <DateRangePicker
                date={customDateRange}
                setDate={handleCustomDateRangeChange}
              />
              <Link href="/contact">
                <Button variant="outline" className="group">
                  <MessageSquare className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:rotate-12" />
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <DashboardNavigation
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">{renderPage()}</div>
    </div>
  );
}
