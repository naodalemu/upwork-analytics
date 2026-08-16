"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "motion/react"
import { Download, Combine, Upload } from "lucide-react"
import { SkyImage } from "@/components/landing/sky-image"
import { BottomFade } from "@/components/landing/bottom-fade"
import { cn } from "@/lib/utils"

const steps = [
  {
    title: "Export",
    description: "Download your \"Weekly Summary\" CSV from Upwork Reports.",
    icon: Download,
    sky: 7,
  },
  {
    title: "Combine",
    description: "If needed, merge multiple CSV files into one single file.",
    icon: Combine,
    sky: 8,
  },
  {
    title: "Analyze",
    description: "Drag and drop your file to instantly generate your dashboard.",
    icon: Upload,
    sky: 1,
  },
]

const AUTO_ADVANCE_MS = 4500

export function HowItWorks() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (paused) return
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length)
    }, AUTO_ADVANCE_MS)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [paused])

  const offsetOf = (i: number) => {
    const raw = ((i - active + 1 + steps.length) % steps.length) - 1
    return raw
  }

  return (
    <section id="how-it-works" className="bg-background px-4 py-20 sm:py-28 overflow-hidden">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-center gap-4 pb-10">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            <span className="text-foreground">Your dashboard</span>{" "}
            <span className="text-muted-foreground">in 60 seconds.</span>
          </h2>
        </div>

        <div
          className="relative h-[440px] sm:h-[460px] [perspective:1400px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {steps.map((step, i) => {
            const offset = offsetOf(i)
            const isActive = offset === 0
            return (
              // Outer element owns the static -50%/-50% centering transform;
              // Framer Motion writes its own inline `transform`, so animating
              // x/scale/rotateY on the same element as the Tailwind translate
              // classes would silently drop the centering offset.
              <motion.div
                key={step.title}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ transformStyle: "preserve-3d" }}
                animate={{ zIndex: isActive ? 20 : 10 - Math.abs(offset) }}
                transition={{ duration: 0 }}
              >
                <motion.button
                  type="button"
                  aria-label={`Show step ${i + 1}: ${step.title}`}
                  onClick={() => setActive(i)}
                  animate={{
                    x: `${offset * 16}%`,
                    scale: isActive ? 1 : 0.94,
                    opacity: Math.abs(offset) > 1 ? 0 : isActive ? 1 : 0.85,
                    rotate: offset * 10,
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 30 }}
                  className={cn(
                    "block w-[280px] sm:w-[300px] h-[400px] sm:h-[480px] rounded-3xl overflow-hidden",
                    "border border-border/60 text-left cursor-pointer relative"
                  )}
                  style={{ transformOrigin: "bottom center" }}
                >
                  <SkyImage
                    index={step.sky}
                    priority={i === 0}
                    sizes="360px"
                  />
                  <BottomFade />

                  <div className="relative h-full flex flex-col justify-between p-6 sm:p-7">
                    <span className="font-mono text-xs text-white/70">0{i + 1}</span>
                    <div className="p-1">
                      <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-3">
                        <step.icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-medium text-white mb-1.5">{step.title}</h3>
                      <p className="text-sm text-white/80">{step.description}</p>
                    </div>
                  </div>
                </motion.button>
              </motion.div>
            )
          })}
        </div>

        <div className="flex items-center justify-center gap-2 mt-8">
          {steps.map((step, i) => (
            <button
              key={step.title}
              onClick={() => setActive(i)}
              aria-label={`Go to step ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === active ? "w-6 bg-foreground" : "w-1.5 bg-border"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
