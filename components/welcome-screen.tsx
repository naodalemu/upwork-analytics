"use client"

import { LandingNav } from "@/components/landing/landing-nav"
import { Hero } from "@/components/landing/hero"
import { AdditionalFeatures } from "@/components/landing/additional-features"
import { HowItWorks } from "@/components/landing/how-it-works"
import { PrivacySection } from "@/components/landing/privacy-section"
import { Instructions } from "@/components/landing/instructions"
import { FooterCta } from "@/components/landing/footer-cta"

interface WelcomeScreenProps {
  onFileUpload: (file: File) => void
  isLoading: boolean
}

export function WelcomeScreen({ onFileUpload, isLoading }: WelcomeScreenProps) {
  const handleDemoClick = async () => {
    if (isLoading) return
    try {
      const response = await fetch("/sample-data.csv")
      if (!response.ok) {
        throw new Error("Network response was not ok.")
      }
      const blob = await response.blob()
      const sampleFile = new File([blob], "sample-data.csv", {
        type: "text/csv",
      })
      onFileUpload(sampleFile)
    } catch (error) {
      console.error("Error loading sample data:", error)
    }
  }

  const handleScrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-blue-300/40 dark:bg-background">
      <LandingNav onScrollTo={handleScrollTo} />

      <Hero
        onFileUpload={onFileUpload}
        isLoading={isLoading}
        onDemoClick={handleDemoClick}
        onScrollTo={handleScrollTo}
      />

      <AdditionalFeatures />

      <HowItWorks />

      <PrivacySection />

      <Instructions />

      <FooterCta onScrollTo={handleScrollTo} />
    </div>
  )
}
