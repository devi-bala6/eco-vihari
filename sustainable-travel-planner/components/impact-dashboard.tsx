"use client"

import { TreePine, Droplets, Footprints, Leaf } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const monthlyData = [
  { month: "Jan", saved: 120 },
  { month: "Feb", saved: 95 },
  { month: "Mar", saved: 180 },
  { month: "Apr", saved: 210 },
  { month: "May", saved: 155 },
  { month: "Jun", saved: 280 },
  { month: "Jul", saved: 320 },
  { month: "Aug", saved: 260 },
  { month: "Sep", saved: 190 },
  { month: "Oct", saved: 230 },
  { month: "Nov", saved: 300 },
  { month: "Dec", saved: 350 },
]

const breakdownData = [
  { name: "Train Travel", value: 45 },
  { name: "Eco Stays", value: 25 },
  { name: "Cycling", value: 18 },
  { name: "Local Food", value: 12 },
]

const COLORS = [
  "oklch(0.35 0.10 155)",
  "oklch(0.55 0.12 155)",
  "oklch(0.72 0.14 75)",
  "oklch(0.50 0.08 180)",
]

const impactStats = [
  {
    icon: TreePine,
    value: "2,140",
    label: "Trees Equivalent Saved",
    description: "CO2 offset by our community",
  },
  {
    icon: Droplets,
    value: "45T",
    label: "CO2 Reduced",
    description: "Tonnes of carbon saved collectively",
  },
  {
    icon: Footprints,
    value: "12,800",
    label: "Green Trips Taken",
    description: "Sustainable journeys completed",
  },
  {
    icon: Leaf,
    value: "340+",
    label: "Eco Partners",
    description: "Homestays & green businesses",
  },
]

export function ImpactDashboard() {
  return (
    <section id="impact" className="py-28 px-6 bg-secondary">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">Community Impact</p>
          <h2 className="font-serif text-4xl font-bold text-foreground sm:text-5xl md:text-6xl text-balance">
            The Impact We Make Together
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-muted-foreground leading-relaxed text-pretty text-lg">
            Every green choice adds up. See how the Eco Vihari community is 
            making a real difference for India and the planet.
          </p>
        </div>

        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 mb-12">
          {impactStats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label} className="border-border bg-card hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <p className="font-serif text-3xl font-bold text-card-foreground md:text-4xl">{stat.value}</p>
                  <p className="mt-2 text-sm font-semibold text-card-foreground">{stat.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          <Card className="border-border bg-card lg:col-span-3 overflow-hidden">
            <CardContent className="p-6 md:p-8">
              <h3 className="font-serif text-xl font-bold text-card-foreground mb-1">Monthly CO2 Saved (kg)</h3>
              <p className="text-sm text-muted-foreground mb-8">
                Community-wide carbon savings over the past year
              </p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData} barSize={20}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.90 0.01 85)" />
                    <XAxis
                      dataKey="month"
                      tick={{ fill: "oklch(0.50 0.02 155)", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "oklch(0.50 0.02 155)", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "oklch(0.99 0.003 85)",
                        border: "1px solid oklch(0.90 0.01 85)",
                        borderRadius: "10px",
                        fontSize: "13px",
                      }}
                    />
                    <Bar dataKey="saved" fill="oklch(0.35 0.10 155)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card lg:col-span-2 overflow-hidden">
            <CardContent className="p-6 md:p-8">
              <h3 className="font-serif text-xl font-bold text-card-foreground mb-1">Savings Breakdown</h3>
              <p className="text-sm text-muted-foreground mb-8">
                How our community saves carbon
              </p>
              <div className="h-48 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={breakdownData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {breakdownData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "oklch(0.99 0.003 85)",
                        border: "1px solid oklch(0.90 0.01 85)",
                        borderRadius: "10px",
                        fontSize: "13px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col gap-3">
                {breakdownData.map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: COLORS[index] }}
                      />
                      <span className="text-sm text-card-foreground">{item.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-card-foreground">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
