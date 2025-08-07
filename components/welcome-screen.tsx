"use client";

import {
  FileText,
  BarChart3,
  TrendingUp,
  Download,
  Upload,
  Target,
  Users,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Shield,
  MessageSquare,
  Github,
  Twitter,
  Combine,
  Heart,
  Sparkles,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useRef } from "react";
import Link from "next/link";
import emailjs from "emailjs-com";
import { Textarea } from "@/components/ui/textarea"; // Assuming you have a Textarea component
import { Send, Check, AlertTriangle } from "lucide-react";

interface WelcomeScreenProps {
  onFileUpload: (file: File) => void;
  isLoading: boolean;
}

export function WelcomeScreen({ onFileUpload, isLoading }: WelcomeScreenProps) {
  const [formStatus, setFormStatus] = useState("idle"); // 'idle', 'sending', 'sent', 'error'
  const formRef = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;
    setFormStatus("sending");

    emailjs
      .sendForm(
        "service_b4cc0sg",
        "template_c0b0i9h",
        formRef.current,
        "Q02nSjXoTREWNVgcR"
      )
      .then(
        (result) => {
          console.log(result.text);
          setFormStatus("sent");
          formRef.current?.reset();
          setTimeout(() => setFormStatus("idle"), 5000);
        },
        (error) => {
          console.log(error.text);
          setFormStatus("error");
          setTimeout(() => setFormStatus("idle"), 5000);
        }
      );
  };

  const handleDemoClick = async () => {
    if (isLoading) return;
    try {
      const response = await fetch("/sample-data.csv");
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const blob = await response.blob();
      const sampleFile = new File([blob], "sample-data.csv", {
        type: "text/csv",
      });
      onFileUpload(sampleFile);
    } catch (error) {
      console.error("Error loading sample data:", error);
    }
  };

  const handleScrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-gray-900">
                Upwork Insights
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => handleScrollTo("features")}
                className="text-gray-600 hover:text-gray-900"
              >
                Features
              </button>
              <button
                onClick={() => handleScrollTo("how-it-works")}
                className="text-gray-600 hover:text-gray-900"
              >
                How It Works
              </button>
              <Link
                href="/contact"
                className="text-gray-600 hover:text-gray-900"
              >
                <button className="text-gray-600 hover:text-gray-900">
                  Contact
                </button>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="https://naodalemu.lemonsqueezy.com/buy/ebfeaf68-6feb-4676-ad7e-196f9ed83642"
                className="lemonsqueezy-button group inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold text-white transition-all duration-300 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 [background-size:200%] hover:[background-position:right] focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
              >
                <Heart className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                Buy me a coffee
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gray-50 py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              THE SMART WAY TO CONTROL
              <br />
              YOUR UPWORK FINANCES
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Instantly transform your Upwork transaction history into a
              powerful analytics dashboard. No more spreadsheets, just clarity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button
                onClick={() => handleScrollTo("instruction-section")}
                size="lg"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md"
              >
                Analyze My Earnings
              </Button>
              <Button
                onClick={handleDemoClick}
                disabled={isLoading}
                variant="outline"
                size="lg"
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-md hover:border-gray-400"
              >
                {isLoading ? (
                  "Loading Demo..."
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" /> Try with Sample Data
                  </>
                )}
              </Button>
            </div>

            {/* Dashboard Cards Mockup */}
            <div className="relative max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-4 transform rotate-12">
                    <div className="bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl shadow-2xl flex items-center justify-center p-4">
                      <img src="/og-image.png" alt="" className="rounded-sm" />
                    </div>
                    <div className="bg-gradient-to-br from-purple-400 to-pink-600 rounded-2xl shadow-2xl transform -rotate-12 flex items-center justify-center p-4">
                      <img src="/og-image.png" alt="" className="rounded-sm" />
                    </div>
                    <div className="bg-gradient-to-br from-orange-400 to-red-600 rounded-2xl shadow-2xl transform rotate-6 flex items-center justify-center p-4">
                      <img src="/og-image.png" alt="" className="rounded-sm" />
                    </div>
                  </div>
                </div>
                <div className="h-64"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Track Performance Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold text-gray-900 mb-8">
                TRACK YOUR PERFORMANCE OVER TIME
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Go beyond single payments. See the bigger picture of your
                freelance career by tracking income trends, identifying your
                best months, and understanding your growth trajectory.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">
                    Identify your most profitable months and quarters.
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">
                    Understand seasonal trends in your workflow.
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">
                    Compare year-over-year growth and performance.
                  </span>
                </div>
              </div>
            </div>
            <div>
              {/* Income Snapshot Mockup */}
              <div className="bg-gray-50 p-8 rounded-3xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Income Snapshot
                </h3>
                <div className="space-y-4">
                  <div className="bg-gray-900 text-white p-4 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-gray-900" />
                      </div>
                      <span className="font-medium">Highest Earning Month</span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">12,875</div>
                      <div className="text-sm text-gray-400">USD</div>
                    </div>
                  </div>
                  <div className="bg-gray-900 text-white p-4 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                        <DollarSign className="w-4 h-4 text-gray-900" />
                      </div>
                      <span className="font-medium">
                        Average Monthly Income
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">5,122</div>
                      <div className="text-sm text-gray-400">USD</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Discover Clients Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              {/* Client Leaderboard Mockup */}
              <div className="bg-white p-8 rounded-3xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">
                  CLIENT LEADERBOARD
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-800">
                      Innovate Corp
                    </span>
                    <span className="font-bold text-green-600">$22,450</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-800">
                      Future Tech
                    </span>
                    <span className="font-bold text-green-600">$18,900</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-800">
                      Quantum Solutions
                    </span>
                    <span className="font-bold text-green-600">$15,100</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-5xl font-bold text-gray-900 mb-8">
                DISCOVER YOUR MOST VALUABLE CLIENTS
              </h2>
              <p className="text-lg text-gray-600">
                Who are your best clients? Our visual reports instantly show you
                which projects are driving your success. Compare earnings by
                client and payment type to focus your efforts where they matter
                most.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Control History Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold text-gray-900 mb-8">
                CONTROL YOUR TRANSACTION HISTORY
              </h2>
              <p className="text-lg text-gray-600">
                Don't let important details get lost. Dive deep into your entire
                payment history with powerful search and filtering. Find any
                transaction, verify any payment, and have every detail at your
                fingertips in seconds.
              </p>
            </div>
            <div>
              {/* Payment Type Mockup */}
              <div className="bg-gray-50 p-8 rounded-3xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Payment Type Distribution
                </h3>
                <div className="space-y-3">
                  <div className="bg-blue-500 text-white p-3 rounded-xl flex items-center justify-between">
                    <span className="text-sm font-medium">Fixed-Price</span>
                    <span className="font-semibold">$45,230</span>
                  </div>
                  <div className="bg-green-500 text-white p-3 rounded-xl flex items-center justify-between">
                    <span className="text-sm font-medium">Hourly</span>
                    <span className="font-semibold">$31,880</span>
                  </div>
                  <div className="bg-yellow-500 text-white p-3 rounded-xl flex items-center justify-between">
                    <span className="text-sm font-medium">Bonuses</span>
                    <span className="font-semibold">$4,150</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-8">
              YOUR DASHBOARD IN 60 SECONDS
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Download className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                1. Export
              </h3>
              <p className="text-gray-600">
                Download your "Weekly Summary" CSV from Upwork Reports.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Combine className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                2. Combine
              </h3>
              <p className="text-gray-600">
                If needed, merge multiple CSV files into one single file.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Upload className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                3. Analyze
              </h3>
              <p className="text-gray-600">
                Drag and drop your file to instantly generate your dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Shield className="w-16 h-16 mx-auto mb-6 text-blue-600" />
            <h2 className="text-5xl font-bold text-gray-900 mb-8">
              YOUR DATA IS YOURS. PERIOD.
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              We built this tool with privacy at its core. Your CSV file is
              processed entirely within your browser using JavaScript. No data
              is ever sent to, stored on, or even seen by our servers. When you
              close the tab, your information is gone. No tracking, no accounts,
              no compromise.
            </p>
          </div>
        </div>
      </section>

      {/* Detailed Instructions Section */}
      <section id="instruction-section" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              Don't Know How To Get Your Data?
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Follow these steps to export and prepare your Upwork weekly
              summary CSV file for analysis.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-x-12 gap-y-10">
            {/* Step 1 */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full">
                <span className="text-xl font-bold text-blue-600">1</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Go to Upwork Reports
                </h3>
                <p className="text-gray-600">
                  Navigate to{" "}
                  <a
                    href="https://www.upwork.com/nx/reports/freelancer/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Upwork Reports
                  </a>{" "}
                  and select the "Weekly Summary" option.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full">
                <span className="text-xl font-bold text-blue-600">2</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Select "Weekly Summary
                </h3>
                <p className="text-gray-600">
                  On the reports page, find and click on the "Weekly Summary"
                  option.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full">
                <span className="text-xl font-bold text-blue-600">3</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Choose Your Date Range
                </h3>
                <p className="text-gray-600">
                  Select the period you want to analyze. Note that Upwork
                  typically limits exports to one year per file.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full">
                <span className="text-xl font-bold text-blue-600">4</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Export Multiple Files (If Needed)
                </h3>
                <p className="text-gray-600">
                  If your history exceeds one year, export multiple CSVs. For
                  example, one for 2023, one for 2024, etc.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full">
                <span className="text-xl font-bold text-blue-600">5</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Combine Your CSVs
                </h3>
                <p className="text-gray-600">
                  Open the first file. Copy the data (excluding headers) from
                  all other files and paste it at the bottom of the first file.
                  Save this combined version.
                </p>
              </div>
            </div>

            {/* Step 6 */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full">
                <span className="text-xl font-bold text-blue-600">6</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Upload Your File
                </h3>
                <p className="text-gray-600">
                  Drag and drop your combined CSV file into the area below, or
                  click the button to browse and select it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* File Upload Section */}
      <section id="upload-section" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <FileUpload onFileUpload={onFileUpload} isLoading={isLoading} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              HAVE A QUESTION OR SUGGESTION?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              We're constantly working to improve this tool for freelancers. If
              you have any feedback or run into an issue, we'd love to hear from
              you.
            </p>
            <div className="flex gap-4 max-w-md mx-auto">
              <Link href="/contact" className="flex-1">
                <Button className="bg-white text-gray-900 hover:bg-gray-100 px-8">
                  Direct Contact Options
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-20 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column: Info & Socials */}
            <div>
              <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-lg">
                Have a question, a suggestion for a new feature, or just want to
                connect? Drop a message here or find me on social media.
              </p>
              <div className="flex items-center gap-6">
                <a
                  href="https://github.com/naodalemu/upwork-analytics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-7 h-7" />
                </a>
                <a
                  href="https://x.com/naod_alemu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-7 h-7" />
                </a>
              </div>
              <div className="mt-10">
                <Link
                  href="/contact"
                  className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2"
                >
                  <span>Or see all contact options</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div>
              <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="user_name"
                      className="block text-sm font-medium text-gray-400 mb-2"
                    >
                      Name (Optional)
                    </label>
                    <Input
                      type="text"
                      name="user_name"
                      id="user_name"
                      placeholder="Your Name"
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="user_email"
                      className="block text-sm font-medium text-gray-400 mb-2"
                    >
                      Email (Optional)
                    </label>
                    <Input
                      type="email"
                      name="user_email"
                      id="user_email"
                      placeholder="your@email.com"
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-400 mb-2"
                  >
                    Message (Required)
                  </label>
                  <Textarea
                    name="message"
                    id="message"
                    placeholder="I have a suggestion for..."
                    required
                    rows={5}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <Button
                    type="submit"
                    className="w-full bg-white text-gray-900 font-semibold hover:bg-gray-200 disabled:opacity-70 transition-all duration-300"
                    disabled={formStatus !== "idle"}
                  >
                    {formStatus === "idle" && (
                      <>
                        <Send className="w-4 h-4 mr-2" /> Send Message
                      </>
                    )}
                    {formStatus === "sending" && "Sending..."}
                    {formStatus === "sent" && (
                      <>
                        <Check className="w-4 h-4 mr-2" /> Message Sent!
                      </>
                    )}
                    {formStatus === "error" && (
                      <>
                        <AlertTriangle className="w-4 h-4 mr-2" /> Try Again
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-16 pt-8 text-center text-sm text-gray-500">
            <p>© 2025 Upwork Insights. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
