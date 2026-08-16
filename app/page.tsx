"use client"

import { useState, useCallback, useEffect } from "react"
import { WelcomeScreen } from "@/components/welcome-screen"
import { Dashboard } from "@/components/dashboard"
import { parseCSVData, type TransactionData } from "@/lib/csv-parser"

const STORAGE_KEY = "dashboard-data"

export default function Home() {
  const [data, setData] = useState<TransactionData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasData, setHasData] = useState(false)

  // Rehydrate from sessionStorage on mount so navigating to another route
  // (e.g. Contact Us) and back, or reloading the page, doesn't force a re-upload.
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsedData: TransactionData[] = JSON.parse(stored)
        if (parsedData.length > 0) {
          setData(parsedData)
          setHasData(true)
        }
      }
    } catch (error) {
      console.error("Error restoring saved data:", error)
    }
  }, [])

  const handleFileUpload = useCallback(async (file: File) => {
    setIsLoading(true)
    try {
      const text = await file.text()
      const parsedData = parseCSVData(text)
      setData(parsedData)
      setHasData(true)
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(parsedData))
    } catch (error) {
      console.error("Error parsing CSV:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleReset = useCallback(() => {
    setData([])
    setHasData(false)
    sessionStorage.removeItem(STORAGE_KEY)
  }, [])

  if (!hasData) {
    return <WelcomeScreen onFileUpload={handleFileUpload} isLoading={isLoading} />
  }

  return <Dashboard data={data} onReset={handleReset} />
}
