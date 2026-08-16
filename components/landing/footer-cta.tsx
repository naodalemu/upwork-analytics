import { ArrowRight, BarChart3, Github, Twitter, Heart } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface FooterCtaProps {
  onScrollTo?: (id: string) => void
}

const productLinks = [
  { label: "Features", id: "features" },
  { label: "How It Works", id: "how-it-works" },
  { label: "Resources", id: "instruction-section" },
]

export function FooterCta({ onScrollTo }: FooterCtaProps) {
  return (
    <footer id="contact" className="bg-muted/40 dark:bg-background px-4 py-6 sm:px-6 sm:py-10">
      <div className="container mx-auto max-w-5xl space-y-4">
        {/* CTA card */}
        <div className="relative overflow-hidden rounded-3xl bg-foreground text-background px-6 py-16 sm:py-20">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.06] to-transparent" />
          <div className="relative max-w-xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Get in touch</h2>
            <p className="text-lg text-background/70 mb-8">
              Have a question, a suggestion for a new feature, or found an issue?
              We'd love to hear from you.
            </p>
            <Link href="/contact">
              <Button className="bg-background text-foreground hover:bg-background/90 px-8">
                Contact Us
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Footer links card */}
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 pt-10 sm:px-10">
          <div className="relative grid gap-10 sm:grid-cols-2 md:grid-cols-4">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center justify-center w-7 h-7 rounded-md bg-foreground">
                  <BarChart3 className="w-4 h-4 text-background" />
                </div>
                <span className="text-base font-semibold text-foreground">Upwork Insights</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs">
                Turn your Upwork transaction history into clear income, client,
                and productivity insights — entirely in your browser.
              </p>
              <div className="flex items-center gap-3 mt-6">
                <a
                  href="https://github.com/naodalemu/upwork-analytics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://x.com/naod_alemu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Product links */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 mb-4">
                Product
              </p>
              <ul className="space-y-3">
                {productLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => onScrollTo?.(link.id)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company links */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 mb-4">
                Company
              </p>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/contact"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <a
                    href="https://github.com/naodalemu/upwork-analytics"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://naodalemu.lemonsqueezy.com/buy/ebfeaf68-6feb-4676-ad7e-196f9ed83642"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Heart className="w-3.5 h-3.5" />
                    Buy me a coffee
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="relative border-t border-border mt-10 pt-6 pb-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2025 Upwork Insights. All rights reserved.</p>
            <p>Built for freelancers, not spreadsheets.</p>
          </div>

          {/* Decorative watermark */}
          <div
            aria-hidden="true"
            className="pointer-events-none select-none absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-[7rem] sm:text-[9rem] font-bold leading-none text-foreground/[0.04]"
          >
            Upwork Insights
          </div>
        </div>
      </div>
    </footer>
  )
}
