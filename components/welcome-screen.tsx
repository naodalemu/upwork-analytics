"use client"
import { FileText, BarChart3, TrendingUp, Link, Calendar, Download, Columns, Upload, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card" // Added CardHeader, CardTitle
import { FileUpload } from "@/components/file-upload"
import { Button } from "@/components/ui/button"

interface WelcomeScreenProps {
  onFileUpload: (file: File) => void
  isLoading: boolean
}


export function WelcomeScreen({ onFileUpload, isLoading }: WelcomeScreenProps) {
  const handleDemoClick = async () => {
    // Prevent clicking if an upload is already in progress
    if (isLoading) return

    try {
      // Fetch the sample file from the public directory
      const response = await fetch("/sample-data.csv")
      if (!response.ok) {
        throw new Error("Network response was not ok.")
      }
      // Create a blob from the response
      const blob = await response.blob()
      // Create a File object that the onFileUpload function expects
      const sampleFile = new File([blob], "sample-data.csv", { type: "text/csv" })

      // Call the existing upload function with the sample file
      onFileUpload(sampleFile)
    } catch (error) {
      console.error("Error loading sample data:", error)
      // You could add a user-facing error message here (e.g., using a toast notification)
    }
  }
  
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
                <h2 className="font-semibold text-gray-900 mb-2">Income Analytics</h2>
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
                <h2 className="font-semibold text-gray-900 mb-2">Visual Reports</h2>
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
                <h2 className="font-semibold text-gray-900 mb-2">Detailed History</h2>
                <p className="text-gray-600 text-sm">
                  Searchable transaction history with filtering options to dive deep into your data.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Upload Section - Remains in its own Card */}
          <Card className="border-0 shadow-xl bg-white mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Upload Your Data</h2>
              <p className="text-gray-600 mb-6">
                Drag and drop your prepared Upwork CSV file here, or click to select it.
              </p>

              <FileUpload onFileUpload={onFileUpload} isLoading={isLoading} />

              <div className="flex items-center my-6">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-4 text-sm text-gray-500">Or</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              <div className="text-center">
                <Button
                  onClick={handleDemoClick}
                  disabled={isLoading}
                  className="
                    w-full max-w-md mx-auto px-6 py-3
                    font-semibold text-white
                    rounded-lg shadow-md
                    bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 
                    [background-size:200%]
                    transition-all duration-500 ease-out hover:[background-position:right]
                    hover:shadow-xl hover:-translate-y-0.5
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-md disabled:translate-y-0
                  "
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Try with Sample Data
                </Button>
              </div>

              <div className="mt-6 text-sm text-gray-500">
                <p className="mb-2">
                  <strong>Required CSV columns:</strong> Date, Contract, Hours, Amount, Payment type
                </p>
                <p>Your data is processed locally in your browser and never sent to any server.</p>
              </div>
            </CardContent>
          </Card>

          {/* Instructions Section - Now in its own Card */}
          <Card className="border-0 shadow-xl bg-white p-4 sm:p-10">
            {" "}
            {/* Added mb-8 for spacing */}
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-900">
                Don't Know How To Get Your Upwork Data?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-8">
                Follow these steps to export and prepare your Upwork weekly summary CSV file for analysis:
              </p>

              <div className="grid md:grid-cols-2 gap-6 text-left pt-2 sm:pt-5">
                {/* Step 1 */}
                <div className="flex items-start space-x-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full flex-shrink-0">
                    <Link className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">1. Go to Upwork Reports</h3>
                    <p className="text-gray-600 text-sm">
                      Navigate to{" "}
                      <a
                        href="https://www.upwork.com/nx/reports/freelancer/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Upwork Freelancer Reports
                      </a>
                      .
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start space-x-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full flex-shrink-0">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">2. Select "Weekly Summary"</h3>
                    <p className="text-gray-600 text-sm">
                      On the reports page, find and click on the "Weekly Summary" option.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start space-x-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full flex-shrink-0">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">3. Choose Your Date Range</h3>
                    <p className="text-gray-600 text-sm">
                      Select the period you want to analyze. Note that Upwork typically limits exports to a maximum of 1
                      year per file.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex items-start space-x-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full flex-shrink-0">
                    <Download className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">4. Export Multiple Files (if needed)</h3>
                    <p className="text-gray-600 text-sm">
                      If your payment history exceeds one year, export multiple CSVs. For example, for Oct 5, 2023 - Jul
                      10, 2025, export Oct 1, 2023 - Oct 4, 2024, then Oct 5, 2024 - Jul 10, 2025.
                    </p>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="flex items-start space-x-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full flex-shrink-0">
                    <Columns className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">5. Combine Your CSVs</h3>
                    <p className="text-gray-600 text-sm">
                      Open all exported CSVs in a spreadsheet editor. Copy the content (excluding headers) from the
                      second and subsequent files, and paste it into the first file, directly below its data. Ensure the
                      first file retains its header row. Save this combined file.
                    </p>
                  </div>
                </div>

                {/* Step 6 */}
                <div className="flex items-start space-x-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full flex-shrink-0">
                    <Upload className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">6. Upload Your File</h3>
                    <p className="text-gray-600 text-sm">
                      Drag and drop your combined CSV file into the area below, or click the button to browse and select
                      it.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
