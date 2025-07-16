"use client"
import { FileText, BarChart3, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { FileUpload } from "@/components/file-upload"

interface WelcomeScreenProps {
  onFileUpload: (file: File) => void
  isLoading: boolean
}

export function WelcomeScreen({ onFileUpload, isLoading }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-6">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Financial Clarity Dashboard</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transform your Upwork transaction data into actionable insights. Upload your CSV file and discover
              comprehensive analytics about your income performance.
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Income Analytics</h3>
                <p className="text-gray-600 text-sm">
                  Track total earnings, hourly rates, and project performance with interactive visualizations.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Visual Reports</h3>
                <p className="text-gray-600 text-sm">
                  Beautiful charts and graphs that make your financial data easy to understand and analyze.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Detailed History</h3>
                <p className="text-gray-600 text-sm">
                  Searchable transaction history with filtering options to dive deep into your data.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Upload Section */}
          <Card className="border-0 shadow-xl bg-white">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Get Started</h2>
              <p className="text-gray-600 mb-6">
                Upload your Upwork weekly summary CSV file to begin analyzing your financial data.
              </p>

              <FileUpload onFileUpload={onFileUpload} isLoading={isLoading} />

              <div className="mt-6 text-sm text-gray-500">
                <p className="mb-2">
                  <strong>Required CSV columns:</strong> Date, Contract, Hours, Amount, Payment type
                </p>
                <p>Your data is processed locally in your browser and never sent to any server.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
