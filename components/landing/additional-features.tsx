"use client"

import { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { SkyImage } from "@/components/landing/sky-image"
import { BottomFade } from "@/components/landing/bottom-fade"
import { cn } from "@/lib/utils"

const features = [
  { title: "Fully private, by design", sky: 1 },
  { title: "Rich, visual income insights", sky: 2 },
  { title: "Instant setup, zero signup", sky: 3 },
  { title: "Track your productivity", sky: 4 },
  { title: "Filter any date range", sky: 5 },
  { title: "Easy on the eyes, day or night", sky: 6 },
]

// Matches privacy-section.tsx's `container mx-auto max-w-6xl` centering exactly,
// so the first card rests at the same left edge as "Your data is yours." — while
// the carousel viewport itself stays full-bleed for every other card position.
const FIRST_CARD_INSET = "max(1rem, calc((100vw - 1152px) / 2))"

export function AdditionalFeatures() {
  const [viewportRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: "trimSnaps",
    dragFree: false,
  })
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const onSelect = useCallback((api: NonNullable<typeof emblaApi>) => {
    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    onSelect(emblaApi)
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
  }, [emblaApi, onSelect])

  return (
    <section id="features" className="py-20 sm:py-28 bg-background overflow-hidden">
      <div className="container mx-auto max-w-6xl mb-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground ml-3 tracking-tight">
              Everything you need
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canScrollPrev}
              aria-label="Scroll left"
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-card transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canScrollNext}
              aria-label="Scroll right"
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-card transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={viewportRef}>
        <div className="flex gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              style={i === 0 ? { marginLeft: FIRST_CARD_INSET } : undefined}
              className="relative flex-shrink-0 w-[80%] sm:w-[40%] lg:w-[20rem] h-[420px] sm:h-[500px] rounded-3xl overflow-hidden border border-border/60 group"
            >
              <SkyImage
                index={feature.sky}
                priority={i === 0}
                sizes="(min-width: 1024px) 76vw, (min-width: 640px) 80vw, 84vw"
                className="transition-transform duration-700 group-hover:scale-105"
              />
              <BottomFade />

              <div className="relative h-full flex flex-col justify-between p-6 sm:p-8">
                <span className="font-mono text-xs text-white/60 self-end">0{i + 1}</span>
                <h3
                  className={cn(
                    "font-semibold text-white text-3xl sm:text-4xl tracking-tight leading-[1.05] max-w-sm"
                  )}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {feature.title}
                </h3>
              </div>
            </div>
          ))}
          {/* Trailing spacer so the last card can pass the same distance the leading inset ate */}
          <div className="flex-shrink-0" style={{ width: FIRST_CARD_INSET }} aria-hidden />
        </div>
      </div>
    </section>
  )
}
