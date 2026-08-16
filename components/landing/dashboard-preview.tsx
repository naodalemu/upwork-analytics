import { Zap, DollarSign, Users, Activity } from "lucide-react"

const revenueSummary = [
  { label: "Hourly Contracts", value: "$12,900" },
  { label: "Fixed-Price Projects", value: "$9,950" },
  { label: "Bonuses", value: "$3,700" },
  { label: "Referrals", value: "$1,150" },
]

const barHeights = [30, 45, 35, 60, 42, 70]

const statTiles = [
  { label: "Overall Income", value: "$72,980", icon: Zap },
  { label: "Income This Month", value: "$16,245", icon: DollarSign },
  { label: "Active Clients", value: "18", icon: Users },
  { label: "Hours This Month", value: "142h", icon: Activity },
]

export function DashboardPreview() {
  return (
    <div className="relative rounded-2xl border border-white/40 dark:border-white/10 bg-white/30 dark:bg-white/[0.06] backdrop-blur-2xl shadow-2xl shadow-black/10 dark:shadow-black/50 overflow-hidden">
      {/* Glass highlight sheen */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent dark:from-white/10" />

      <div className="relative p-8 sm:p-10 lg:p-12">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground">Dashboard</h3>
          <p className="text-sm text-muted-foreground">Your freelance income, at a glance</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-4">
          {/* Monthly hours progress card */}
          <div className="rounded-xl border border-white/40 dark:border-white/10 bg-white/40 dark:bg-white/[0.04] backdrop-blur-md p-5">
            <p className="text-xs text-muted-foreground mb-1">Hours Logged</p>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-bold text-foreground">142.5</span>
              <span className="text-sm text-muted-foreground">hrs this month</span>
            </div>
            <p className="text-xs text-muted-foreground mb-4">Total Earned</p>
            <div className="text-xl font-bold text-foreground mb-3">$16,245</div>
            <div className="h-1.5 w-full rounded-full bg-muted/60 overflow-hidden">
              <div className="h-full w-3/4 rounded-full bg-blue-500" />
            </div>
          </div>

          {/* Revenue summary list card */}
          <div className="rounded-xl border border-white/40 dark:border-white/10 bg-white/40 dark:bg-white/[0.04] backdrop-blur-md p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-foreground">Income Summary</p>
              <span className="text-xs text-muted-foreground">Last 30 Days</span>
            </div>
            <div className="space-y-2.5">
              {revenueSummary.map((row) => (
                <div key={row.label} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{row.label}</span>
                  <span className="font-medium text-foreground">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mini chart card */}
          <div className="rounded-xl border border-white/40 dark:border-white/10 bg-white/40 dark:bg-white/[0.04] backdrop-blur-md p-5">
            <p className="text-xs text-muted-foreground mb-1">Income Trend</p>
            <div className="text-2xl font-bold text-foreground mb-4">+18.4%</div>
            <div className="flex items-end gap-1.5 h-16">
              {barHeights.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm bg-blue-500/80 dark:bg-blue-500/70"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statTiles.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-white/40 dark:border-white/10 bg-white/40 dark:bg-white/[0.04] backdrop-blur-md p-4"
            >
              <div className="w-8 h-8 rounded-lg bg-white/50 dark:bg-white/10 flex items-center justify-center mb-3">
                <stat.icon className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="text-lg font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
