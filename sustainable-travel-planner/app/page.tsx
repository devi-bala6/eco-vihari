import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { CO2Calculator } from "@/components/co2-calculator"
import { GreenAlternatives } from "@/components/green-alternatives"
import { TripPlanner } from "@/components/trip-planner"
import { ImpactDashboard } from "@/components/impact-dashboard"
import { NFTRewards } from "@/components/nft-rewards"
import { Collaborations } from "@/components/collaborations"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <CO2Calculator />
      <GreenAlternatives />
      <TripPlanner />
      <ImpactDashboard />
      <NFTRewards />
      <Collaborations />
      <Footer />
    </main>
  )
}
