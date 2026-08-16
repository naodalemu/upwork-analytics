"use client"

import { BarChart3, ChevronRight } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

interface LandingNavProps {
  onScrollTo: (id: string) => void
}

export function LandingNav({ onScrollTo }: LandingNavProps) {
  return (
    <div className="sticky top-0 z-50 px-4 pt-4">
      <nav className="container mx-auto max-w-5xl rounded-2xl border border-border bg-card/80 backdrop-blur-md shadow-sm">
        <div className="flex items-center justify-between h-14 px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 rounded-md bg-foreground">
              <BarChart3 className="w-4 h-4 text-background" />
            </div>
            <div className="text-base font-semibold text-foreground">Upwork Insights</div>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onScrollTo("features")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => onScrollTo("how-it-works")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => onScrollTo("instruction-section")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Resources
            </button>
            <Link
              href="/contact"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => onScrollTo("file-upload-box")}
              className="group inline-flex items-center gap-1 rounded-full bg-foreground text-background pl-4 pr-3 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Get Started
              <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </nav>
    </div>
  )
}
