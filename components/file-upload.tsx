"use client"

import type React from "react"

import { useCallback, useState } from "react"
import { Upload, FileText, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FileUploadProps {
  onFileUpload: (file: File) => void
  isLoading: boolean
}

export function FileUpload({ onFileUpload, isLoading }: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)

      const files = Array.from(e.dataTransfer.files)
      const csvFile = files.find((file) => file.type === "text/csv" || file.name.endsWith(".csv"))

      if (csvFile) {
        onFileUpload(csvFile)
      }
    },
    [onFileUpload],
  )

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        onFileUpload(file)
      }
    },
    [onFileUpload],
  )

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className={`
          border-2 border-dashed rounded-lg p-8 text-center transition-colors relative
          ${isDragOver ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"}
          ${isLoading ? "pointer-events-none opacity-50" : "cursor-pointer"}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isLoading ? (
          <div className="flex flex-col items-center">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
            <p className="text-gray-600">Processing your file...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <Upload className="w-8 h-8 text-gray-600" />
            </div>
            <p className="text-lg font-medium text-gray-900 mb-2">Drop your CSV file here</p>
            <p className="text-gray-600 mb-4">or click to browse</p>
            <Button variant="outline" className="mb-2 bg-transparent">
              <FileText className="w-4 h-4 mr-2" />
              Choose File
            </Button>
            <p className="text-xs text-gray-500">Supports CSV files only</p>
          </div>
        )}

        <input
          type="file"
          accept=".csv"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isLoading}
        />
      </div>
    </div>
  )
}
