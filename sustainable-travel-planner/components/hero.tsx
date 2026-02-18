import { ArrowDown, Leaf, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-india.jpg"
          alt="Lush green tea plantations in India"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-foreground/60" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 md:py-40">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2 backdrop-blur-sm">
            <Leaf className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-primary-foreground">
              Sustainable Travel for a Greener India
            </span>
          </div>

          <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-primary-foreground sm:text-5xl md:text-7xl text-balance">
            Travel India.
            <br />
            <span className="text-accent">Tread Lightly.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-primary-foreground/80 text-pretty">
            Discover budget-friendly, eco-conscious journeys across India. 
            Track your carbon footprint, find greener alternatives, and earn 
            rewards for every sustainable choice you make.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8"
              asChild
            >
              <a href="#calculator">
                <TrendingDown className="mr-2 h-5 w-5" />
                Calculate Your CO2
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20 backdrop-blur-sm text-base"
              asChild
            >
              <a href="#planner">Plan Your Trip</a>
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
            <div className="text-center">
              <p className="font-serif text-2xl font-bold text-primary-foreground md:text-3xl">12K+</p>
              <p className="mt-1 text-xs text-primary-foreground/60">Green Trips Planned</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-2xl font-bold text-primary-foreground md:text-3xl">45T</p>
              <p className="mt-1 text-xs text-primary-foreground/60">{'CO\u2082 Saved'}</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-2xl font-bold text-primary-foreground md:text-3xl">8K+</p>
              <p className="mt-1 text-xs text-primary-foreground/60">Eco Travelers</p>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#calculator"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce"
        aria-label="Scroll down"
      >
        <ArrowDown className="h-6 w-6 text-primary-foreground/60" />
      </a>
    </section>
  )
}
