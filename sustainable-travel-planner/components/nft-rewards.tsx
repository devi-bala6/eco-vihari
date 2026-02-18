"use client"

import { Award, Shield, Star, Zap, Trophy, Lock, Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"

const nftBadges = [
  {
    name: "Green Explorer",
    description: "Complete your first eco-friendly trip",
    icon: Star,
    level: "Bronze",
    requirement: "1 green trip",
    earned: true,
    progress: 100,
  },
  {
    name: "Carbon Saver",
    description: "Save 100 kg of CO2 through sustainable choices",
    icon: Shield,
    level: "Silver",
    requirement: "100 kg CO2 saved",
    earned: true,
    progress: 100,
  },
  {
    name: "Eco Warrior",
    description: "Complete 10 sustainable trips and inspire 5 others",
    icon: Zap,
    level: "Gold",
    requirement: "10 trips + 5 referrals",
    earned: false,
    progress: 65,
  },
  {
    name: "Planet Guardian",
    description: "Save 1 tonne of CO2 and plant 10 trees via Eco Vihari",
    icon: Trophy,
    level: "Platinum",
    requirement: "1T CO2 + 10 trees",
    earned: false,
    progress: 30,
  },
]

const rewards = [
  "10% off at partner eco-homestays",
  "Free cycle rental at partner cities",
  "Exclusive access to eco-travel events",
  "Priority booking for green experiences",
  "NFT collectibles with real-world perks",
  "Feature on the Eco Vihari leaderboard",
]

export function NFTRewards() {
  return (
    <section id="rewards" className="py-28 px-6 bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">Rewards</p>
          <h2 className="font-serif text-4xl font-bold text-foreground sm:text-5xl md:text-6xl text-balance">
            Earn NFT Rewards for Going Green
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-muted-foreground leading-relaxed text-pretty text-lg">
            Every sustainable choice earns you unique NFT badges with real-world perks.
            Collect, trade, and unlock exclusive benefits as you travel greener.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="grid gap-4 sm:grid-cols-2">
              {nftBadges.map((badge) => {
                const Icon = badge.icon
                return (
                  <Card
                    key={badge.name}
                    className={`border-border bg-card transition-all hover:shadow-md ${
                      badge.earned ? "ring-1 ring-primary/20" : ""
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-5">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-full ${
                          badge.earned ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                        }`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex items-center gap-1.5">
                          {badge.earned ? (
                            <Badge className="bg-primary/10 text-primary border-0 text-xs rounded-full">
                              <Check className="mr-1 h-3 w-3" /> Earned
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="text-xs rounded-full">
                              <Lock className="mr-1 h-3 w-3" /> Locked
                            </Badge>
                          )}
                        </div>
                      </div>

                      <h3 className="font-semibold text-card-foreground text-lg">{badge.name}</h3>
                      <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{badge.description}</p>

                      <div className="mt-5">
                        <div className="flex items-center justify-between text-xs mb-2">
                          <span className="text-muted-foreground">{badge.requirement}</span>
                          <span className="font-semibold text-foreground">{badge.progress}%</span>
                        </div>
                        <Progress value={badge.progress} className="h-2" />
                      </div>

                      <div className="mt-4">
                        <Badge variant="outline" className="text-xs rounded-full">
                          {badge.level}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-6">
            <Card className="border-border bg-card overflow-hidden">
              <div className="relative h-52">
                <Image
                  src="/images/nft-badge.jpg"
                  alt="Eco Vihari NFT badge collectible"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-foreground/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Award className="h-10 w-10 text-accent mx-auto mb-3" />
                    <p className="text-primary-foreground font-serif font-bold text-xl">NFT Collectibles</p>
                    <p className="text-primary-foreground/80 text-sm mt-1">On-chain proof of impact</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-semibold text-card-foreground text-lg mb-4">Unlock real perks</h3>
                <ul className="flex flex-col gap-3">
                  {rewards.map((reward) => (
                    <li key={reward} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      {reward}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Button size="lg" className="w-full rounded-full h-12 text-base">
              Start Earning Rewards
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
