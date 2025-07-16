"use client"

import { useState, useCallback } from "react"
import { WelcomeScreen } from "@/components/welcome-screen"
import { Dashboard } from "@/components/dashboard"
import { parseCSVData, type TransactionData } from "@/lib/csv-parser"

export default function Home() {
  const [data, setData] = useState<TransactionData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasData, setHasData] = useState(false)

  const handleFileUpload = useCallback(async (file: File) => {
    setIsLoading(true)
    try {
      const text = await file.text()
      const parsedData = parseCSVData(text)
      setData(parsedData)
      setHasData(true)
    } catch (error) {
      console.error("Error parsing CSV:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleReset = useCallback(() => {
    setData([])
    setHasData(false)
  }, [])

  if (!hasData) {
    return <WelcomeScreen onFileUpload={handleFileUpload} isLoading={isLoading} />
  }

  return <Dashboard data={data} onReset={handleReset} />
}
