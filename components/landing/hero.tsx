"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronRight, Shield, Sparkles, DollarSign, Zap, UploadCloud } from "lucide-react"
import { DashboardPreview } from "@/components/landing/dashboard-preview"
import { FileUpload } from "@/components/file-upload"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

interface HeroProps {
  onFileUpload: (file: File) => void
  isLoading: boolean
  onDemoClick: () => void
  onScrollTo: (id: string) => void
}

export function Hero({ onFileUpload, isLoading, onDemoClick, onScrollTo }: HeroProps) {
  const [uploadOpen, setUploadOpen] = useState(false)

  const handleGetDataClick = () => {
    setUploadOpen(false)
    setTimeout(() => onScrollTo("instruction-section"), 150)
  }

  return (
    <section className="relative isolate overflow-hidden bg-background" id="hero">
      {/* Light mode soft wash */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-blue-300/40 via-blue-100/40 to-background dark:from-transparent dark:via-transparent dark:to-transparent" />

      <div className="container mx-auto px-4 pt-20 pb-20 md:pt-24 md:pb-32">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/60 text-muted-foreground text-xs font-medium mb-8">
            <Shield className="w-3.5 h-3.5" />
            100% private — your data never leaves your browser
          </div>

          <h1 className="text-5xl md:text-7xl font-semibold text-foreground mb-6 leading-[1.05] tracking-tight text-balance">
            Turn your{" "}
            <span className="relative inline-block">
              <span className="text-[#14A800]">Upwork</span>
              <Sparkles
                className="absolute -top-5 -right-6 w-5 h-5 text-[#14A800] rotate-12 animate-pulse"
                style={{ animationDuration: "2.5s" }}
              />
              <DollarSign
                className="absolute -bottom-4 -left-7 w-5 h-5 text-[#14A800]/70 -rotate-12 animate-bounce"
                style={{ animationDuration: "3s" }}
              />
            </span>{" "}
            history
            <br />
            <span className="text-muted-foreground">into real financial clarity</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-balance">
            Upload your Upwork transaction CSV and instantly get income trends,
            productivity insights, and client breakdowns — no spreadsheets required.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4" id="file-upload-box">
            <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
              <DialogTrigger asChild>
                <button className="inline-flex items-center justify-center gap-1.5 rounded-full bg-foreground text-background pl-6 pr-5 py-3 text-sm font-semibold hover:opacity-90 transition-opacity">
                  <UploadCloud className="w-4 h-4" />
                  Upload Your CSV
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Upload your CSV</DialogTitle>
                  <DialogDescription>
                    Drop your Upwork weekly summary CSV below. Everything happens
                    in your browser — nothing is ever uploaded to a server.
                  </DialogDescription>
                </DialogHeader>
                <FileUpload onFileUpload={onFileUpload} isLoading={isLoading} />
                <p className="text-center text-xs text-muted-foreground">
                  Don't have your CSV yet?{" "}
                  <button
                    onClick={handleGetDataClick}
                    className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                  >
                    See how to get it
                  </button>
                </p>
              </DialogContent>
            </Dialog>

            <button
              onClick={onDemoClick}
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-1 rounded-full border border-border text-foreground px-6 py-3 text-sm font-semibold hover:bg-card transition-colors disabled:opacity-60"
            >
              {isLoading ? "Loading Demo..." : "Try with Sample Data"}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-muted-foreground">
            No signup required &nbsp;•&nbsp; No account needed &nbsp;•&nbsp; Runs entirely in your browser
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Textured surface peeking out behind the glass dashboard card - full-bleed
              edge to edge horizontally, symmetric fade top/bottom so it reads as an
              ambient glow instead of a hard-edged photo, and dimmed so it stays a
              background detail rather than competing with the card */}
          <div
            className="pointer-events-none absolute left-1/2 -top-20 -bottom-20 w-screen -translate-x-1/2 -z-10 opacity-[0.38] dark:opacity-[0.15]"
            style={{
              maskImage: "linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)",
            }}
          >
            <Image
              src="/natural-textured-surface-light.png"
              alt=""
              fill
              className="object-cover object-center dark:hidden"
              priority
            />
            <Image
              src="/natural-textured-surface.png"
              alt=""
              fill
              className="hidden object-cover object-center dark:block"
              priority
            />
          </div>

          <DashboardPreview />
        </div>
      </div>
    </section>
  )
}
