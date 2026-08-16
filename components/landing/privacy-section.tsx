"use client"

import { motion } from "motion/react"

export function PrivacySection() {
  return (
    <section className="bg-background px-4 py-28 sm:py-40">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
          className="text-7xl sm:text-8xl md:text-[8rem] lg:text-[9rem] font-semibold tracking-tight leading-[0.92] text-balance"
        >
          <span className="text-foreground">Your data is yours.</span>
          <br />
          <span className="text-muted-foreground">Period.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10 max-w-xs text-sm text-muted-foreground"
        >
          Your CSV is parsed and analyzed entirely on your device using JavaScript. We never see
          it, and neither does anyone else.
        </motion.p>
      </div>
    </section>
  )
}
