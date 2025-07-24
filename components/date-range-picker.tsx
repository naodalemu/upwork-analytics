"use client"

import type * as React from "react"
import { useState, useEffect, useRef } from "react"
import { CalendarIcon } from "lucide-react"
import { format, parse } from "date-fns"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  date?: DateRange
  setDate: (date: DateRange | undefined) => void
}

export function DateRangePicker({ className, date, setDate }: DateRangePickerProps) {
  const [startDateInput, setStartDateInput] = useState("")
  const [endDateInput, setEndDateInput] = useState("")
  const [inputError, setInputError] = useState("")
  const [calendarMonth, setCalendarMonth] = useState(date?.from || new Date())
  const endDateInputRef = useRef<HTMLInputElement>(null)

  const parseDate = (dateString: string): Date | null => {
    if (!dateString.trim()) return null

    // Try multiple date formats
    const formats = [
      "MMM dd, yyyy", // Jul 20, 2016
      "MMM d, yyyy", // Jul 2, 2016
      "MM/dd/yyyy", // 07/20/2016
      "M/d/yyyy", // 7/2/2016
      "yyyy-MM-dd", // 2016-07-20
      "dd/MM/yyyy", // 20/07/2016
      "d/M/yyyy", // 2/7/2016
    ]

    for (const formatString of formats) {
      try {
        const parsedDate = parse(dateString, formatString, new Date())
        if (!isNaN(parsedDate.getTime())) {
          return parsedDate
        }
      } catch (error) {
        // Continue to next format
      }
    }

    return null
  }

  const handleApplyManualDates = () => {
    setInputError("")

    const startDate = parseDate(startDateInput)
    const endDate = parseDate(endDateInput)

    if (startDateInput && !startDate) {
      setInputError("Invalid start date format. Try 'Jul 20, 2016' or '07/20/2016'")
      return
    }

    if (endDateInput && !endDate) {
      setInputError("Invalid end date format. Try 'Jun 10, 2018' or '06/10/2018'")
      return
    }

    // Don't allow end date without start date
    if (endDate && !startDate) {
      setInputError("Please provide a start date when setting an end date")
      return
    }

    if (startDate && endDate && startDate > endDate) {
      setInputError("Start date must be before end date")
      return
    }

    setCalendarMonth(endDate || startDate || new Date())

    // Apply the date range
    const newDateRange = {
      from: startDate || undefined,
      to: endDate || undefined,
    }

    setDate(newDateRange)
  }

  const handleClearManualInputs = () => {
    setStartDateInput("")
    setEndDateInput("")
    setInputError("")
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn("w-[300px] justify-start text-left font-normal", !date && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            month={calendarMonth}
            onMonthChange={setCalendarMonth}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />

          {/* Manual Date Input Section */}
          <div className="border-t p-4 space-y-4">
            <div className="text-sm font-medium text-gray-700 mb-2">Or enter dates manually:</div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="start-date" className="text-xs text-gray-600">
                  Start Date
                </Label>
                <Input
                  id="start-date"
                  placeholder="Jul 20, 2016"
                  value={startDateInput}
                  onChange={(e) => setStartDateInput(e.target.value)}
                  className="text-sm"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      endDateInputRef.current?.focus()
                    }
                  }}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="end-date" className="text-xs text-gray-600">
                  End Date
                </Label>
                <Input
                  id="end-date"
                  ref={endDateInputRef}
                  placeholder="Jun 10, 2018"
                  value={endDateInput}
                  onChange={(e) => setEndDateInput(e.target.value)}
                  className="text-sm"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      // Only apply if the start date input has a value,
                      // matching the logic of the disabled button.
                      if (startDateInput) {
                        handleApplyManualDates()
                      }
                    }
                  }}
                />
              </div>
            </div>

            {inputError && <div className="text-xs text-red-600 mt-1">{inputError}</div>}

            <div className="flex gap-2">
              <Button size="sm" onClick={handleApplyManualDates} disabled={!startDateInput} className="flex-1">
                Apply
              </Button>
              <Button size="sm" variant="outline" onClick={handleClearManualInputs} className="flex-1 bg-transparent">
                Clear
              </Button>
            </div>

            <div className="text-xs text-gray-500 mt-2">Supported formats: Jul 20, 2016 • 07/20/2016 • 2016-07-20</div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
