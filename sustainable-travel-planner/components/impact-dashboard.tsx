"use client"

import { TreePine, Droplets, Footprints, Leaf } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
  "oklch(0.45 0.14 155)",
  "oklch(0.60 0.15 155)",
  "oklch(0.75 0.15 85)",
  "oklch(0.55 0.10 180)",
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
    <section id="impact" className="py-24 px-6 bg-secondary">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-0">
            Community Impact
          </Badge>
          <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl md:text-5xl text-balance">
            The Impact We Make Together
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground leading-relaxed text-pretty">
            Every green choice adds up. See how the Eco Vihri community is 
            making a real difference for India and the planet.
          </p>
        </div>

        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 mb-10">
          {impactStats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label} className="border-border bg-card">
                <CardContent className="p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-3">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <p className="font-serif text-2xl font-bold text-card-foreground md:text-3xl">{stat.value}</p>
                  <p className="mt-1 text-sm font-medium text-card-foreground">{stat.label}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          <Card className="border-border bg-card lg:col-span-3">
            <CardContent className="p-6">
              <h3 className="font-semibold text-card-foreground mb-1">Monthly CO2 Saved (kg)</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Community-wide carbon savings over the past year
              </p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData} barSize={24}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.90 0.02 155)" />
                    <XAxis
                      dataKey="month"
                      tick={{ fill: "oklch(0.45 0.03 155)", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "oklch(0.45 0.03 155)", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "oklch(0.99 0.003 155)",
                        border: "1px solid oklch(0.90 0.02 155)",
                        borderRadius: "8px",
                        fontSize: "13px",
                      }}
                    />
                    <Bar dataKey="saved" fill="oklch(0.45 0.14 155)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card lg:col-span-2">
            <CardContent className="p-6">
              <h3 className="font-semibold text-card-foreground mb-1">Savings Breakdown</h3>
              <p className="text-sm text-muted-foreground mb-6">
                How our community saves carbon
              </p>
              <div className="h-48 mb-4">
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
                        backgroundColor: "oklch(0.99 0.003 155)",
                        border: "1px solid oklch(0.90 0.02 155)",
                        borderRadius: "8px",
                        fontSize: "13px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col gap-2">
                {breakdownData.map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-sm"
                        style={{ backgroundColor: COLORS[index] }}
                      />
                      <span className="text-sm text-card-foreground">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium text-card-foreground">{item.value}%</span>
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
