"use client"

import { motion } from "motion/react"
import { SkyImage } from "@/components/landing/sky-image"
import { cn } from "@/lib/utils"

const steps = [
  {
    title: "Go to Upwork Reports",
    description: (
      <>
        Navigate to{" "}
        <a
          href="https://www.upwork.com/nx/reports/freelancer/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
        >
          Upwork Reports
        </a>{" "}
        and select the "Weekly Summary" option.
      </>
    ),
  },
  {
    title: 'Select "Weekly Summary"',
    description: 'On the reports page, find and click on the "Weekly Summary" option.',
  },
  {
    title: "Choose Your Date Range",
    description:
      "Select the period you want to analyze. Note that Upwork typically limits exports to one year per file.",
  },
  {
    title: "Export Multiple Files (If Needed)",
    description:
      "If your history exceeds one year, export multiple CSVs. For example, one for 2023, one for 2024, etc.",
  },
  {
    title: "Combine Your CSVs",
    description:
      "Open the first file. Copy the data (excluding headers) from all other files and paste it at the bottom of the first file. Save this combined version.",
  },
  {
    title: "Upload Your File",
    description: (
      <>
        Click the{" "}
        <a className="text-blue-600 dark:text-blue-400 font-medium hover:underline" href="#file-upload-box">
          "Upload Your CSV" button
        </a>{" "}
        near the top of the page, then drag and drop your file or browse to select it.
      </>
    ),
  },
]

export function Instructions() {
  return (
    <section id="instruction-section" className="bg-background px-4 py-20 sm:py-28">
      <div className="container mx-auto max-w-3xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-center gap-4 pb-14 sm:pb-20 text-center sm:text-left">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mx-auto sm:mx-0">
            <span className="text-foreground">Don't know how</span>{" "}
            <span className="text-muted-foreground">to get your data?</span>
          </h2>
        </div>

        <div className="relative">
          <div
            className="absolute top-2 bottom-2 left-5 sm:left-1/2 w-px sm:-translate-x-1/2"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, hsl(var(--border)) 0, hsl(var(--border)) 6px, transparent 6px, transparent 14px)",
            }}
            aria-hidden
          />

          <div className="flex flex-col gap-10 sm:gap-14">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: isLeft ? -20 : 20, y: 10 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
                  className={cn(
                    "relative z-10 flex flex-row-reverse items-start gap-4 sm:gap-8",
                    isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
                  )}
                >
                  <div className="sm:flex-1 sm:max-w-sm">
                    <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
                      <h3 className="text-sm font-medium text-foreground mb-1.5">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>

                  <div className="relative flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden ring-4 ring-background border border-border/60">
                    <SkyImage index={i + 1} sizes="48px" />
                    <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                      <span className="font-mono text-xs sm:text-sm font-semibold text-white">{i + 1}</span>
                    </div>
                  </div>

                  <div className="hidden sm:block sm:flex-1" />
                </motion.div>
              )
            })}
          </div>
        </div>

        <p className="text-sm text-muted-foreground mt-14 sm:mt-20 text-center">
          Exporting more than a year of history? Export each year separately, then combine
          the files before uploading.
        </p>
      </div>
    </section>
  )
}
