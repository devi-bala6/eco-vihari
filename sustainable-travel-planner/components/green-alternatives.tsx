import { Train, Bike, Home, Utensils, TreePine, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

const alternatives = [
  {
    icon: Train,
    title: "Travel by Rail",
    description: "India's vast railway network connects every corner. Choose trains over flights to cut emissions by up to 84%.",
    stat: "84% less CO2",
    image: "/images/train-india.jpg",
    alt: "Indian train journey through green mountains",
  },
  {
    icon: Bike,
    title: "Cycle & Walk",
    description: "Explore cities and villages on two wheels or on foot. Zero emissions, full immersion in local culture.",
    stat: "Zero emissions",
    image: "/images/cycling-india.jpg",
    alt: "Cyclists riding through an Indian village",
  },
  {
    icon: Home,
    title: "Eco Homestays",
    description: "Stay with local families in sustainable homestays. Support communities directly and reduce hotel carbon footprints.",
    stat: "70% less impact",
    image: "/images/homestay-india.jpg",
    alt: "Traditional Indian eco homestay",
  },
]

const quickTips = [
  { icon: TreePine, tip: "Choose destinations accessible by train" },
  { icon: Utensils, tip: "Eat local, seasonal food at dhabas" },
  { icon: Home, tip: "Book eco-certified accommodations" },
  { icon: Bike, tip: "Rent cycles for city exploration" },
]

export function GreenAlternatives() {
  return (
    <section id="alternatives" className="py-28 px-6 bg-secondary">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">Greener Choices</p>
          <h2 className="font-serif text-4xl font-bold text-foreground sm:text-5xl md:text-6xl text-balance">
            Sustainable Alternatives
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-muted-foreground leading-relaxed text-pretty text-lg">
            Small switches in how you travel, stay, and eat can dramatically 
            reduce your environmental impact without sacrificing the experience.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {alternatives.map((alt) => {
            const Icon = alt.icon
            return (
              <Card key={alt.title} className="overflow-hidden border-border bg-card group hover:shadow-lg transition-shadow">
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={alt.image}
                    alt={alt.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-foreground/20" />
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground border-0 rounded-full">
                    {alt.stat}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-card-foreground">{alt.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{alt.description}</p>
                  <a href="#planner" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                    Plan this way <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          {quickTips.map((tip) => {
            const Icon = tip.icon
            return (
              <div key={tip.tip} className="flex items-center gap-3 rounded-xl bg-card border border-border p-5 hover:shadow-sm transition-shadow">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <p className="text-sm font-medium text-card-foreground leading-snug">{tip.tip}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
