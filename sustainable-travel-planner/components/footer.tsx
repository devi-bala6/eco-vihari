import { Leaf } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const footerLinks = {
  Product: ["CO2 Calculator", "Trip Planner", "Green Alternatives", "Impact Dashboard"],
  Rewards: ["NFT Badges", "Leaderboard", "Partner Perks", "Referral Program"],
  Company: ["About Us", "Blog", "Careers", "Press"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
}

export function Footer() {
  return (
    <footer className="bg-foreground px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2.5 mb-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
                <Leaf className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-serif text-xl font-bold text-primary-foreground">Eco Vihari</span>
            </a>
            <p className="text-sm text-primary-foreground/50 leading-relaxed max-w-xs">
              Making sustainable travel the default choice for every Indian traveler. 
              Budget-friendly, planet-friendly.
            </p>
            <div className="mt-8 flex gap-3">
              {["Twitter", "Instagram", "LinkedIn"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground/50 hover:bg-primary-foreground/20 hover:text-primary-foreground transition-colors text-xs font-semibold"
                  aria-label={social}
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-primary-foreground mb-5 uppercase tracking-wider">{category}</h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-primary-foreground/40 hover:text-primary-foreground transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-12 bg-primary-foreground/10" />

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-primary-foreground/30">
            2026 Eco Vihari. All rights reserved. Made with care for the planet.
          </p>
          <p className="text-xs text-primary-foreground/30">
            Reducing one carbon footprint at a time.
          </p>
        </div>
      </div>
    </footer>
  )
}
