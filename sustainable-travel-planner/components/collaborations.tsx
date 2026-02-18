"use client"

import { useState } from "react"
import { Users, Handshake, Building, Tent, Globe, Send, Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

const collaborationTypes = [
  {
    icon: Tent,
    title: "Eco Homestay Partners",
    description: "List your homestay on our platform and get connected with eco-conscious travelers from across India.",
    count: "120+ partners",
  },
  {
    icon: Building,
    title: "Green Businesses",
    description: "Partner with us to offer sustainable travel products, rentals, and eco-friendly services to our community.",
    count: "85+ businesses",
  },
  {
    icon: Users,
    title: "Travel Communities",
    description: "Organize group eco-trips, share sustainable travel knowledge, and grow your community with us.",
    count: "45+ groups",
  },
  {
    icon: Globe,
    title: "NGOs & Nonprofits",
    description: "Collaborate on conservation projects, tree planting drives, and environmental awareness campaigns.",
    count: "30+ organizations",
  },
]

export function Collaborations() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <section id="collaborate" className="py-28 px-6 bg-secondary">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">Collaborate</p>
          <h2 className="font-serif text-4xl font-bold text-foreground sm:text-5xl md:text-6xl text-balance">
            Join the Green Travel Movement
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-muted-foreground leading-relaxed text-pretty text-lg">
            Whether you are a homestay owner, a green business, a travel community, or an NGO, 
            there is a place for you in the Eco Vihari ecosystem.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-20">
          {collaborationTypes.map((collab) => {
            const Icon = collab.icon
            return (
              <Card key={collab.title} className="border-border bg-card hover:border-primary/30 hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-5">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-card-foreground text-lg mb-2">{collab.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{collab.description}</p>
                  <Badge variant="secondary" className="text-xs rounded-full">{collab.count}</Badge>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid gap-8 lg:grid-cols-2 items-stretch">
          <div className="relative rounded-2xl overflow-hidden min-h-[400px]">
            <Image
              src="/images/collab-community.jpg"
              alt="Eco Vihari community collaborating together"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-foreground/30" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="rounded-xl bg-card/90 backdrop-blur-sm p-6 border border-border">
                <div className="flex items-center gap-3 mb-2">
                  <Handshake className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-card-foreground text-lg">Join 280+ collaborators</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Our partners collectively help travelers save over 45 tonnes of CO2 every year.
                </p>
              </div>
            </div>
          </div>

          <Card className="border-border bg-card">
            <CardContent className="p-6 md:p-8">
              {submitted ? (
                <div className="text-center py-16">
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Check className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-card-foreground">Thank You!</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    We have received your collaboration request. Our team will reach out within 48 hours.
                  </p>
                  <Button variant="outline" className="mt-8 rounded-full" onClick={() => setSubmitted(false)}>
                    Submit Another
                  </Button>
                </div>
              ) : (
                <>
                  <h3 className="font-serif text-2xl font-bold text-card-foreground mb-2">
                    Become a Partner
                  </h3>
                  <p className="text-sm text-muted-foreground mb-8">
                    Fill in your details and we will connect with you.
                  </p>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      setSubmitted(true)
                    }}
                    className="flex flex-col gap-5"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="collab-name" className="text-card-foreground text-sm font-semibold">Full Name</Label>
                        <Input id="collab-name" placeholder="Your name" className="mt-2 h-12 rounded-lg" required />
                      </div>
                      <div>
                        <Label htmlFor="collab-org" className="text-card-foreground text-sm font-semibold">Organization</Label>
                        <Input id="collab-org" placeholder="Your organization" className="mt-2 h-12 rounded-lg" required />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="collab-email" className="text-card-foreground text-sm font-semibold">Email</Label>
                      <Input id="collab-email" type="email" placeholder="you@example.com" className="mt-2 h-12 rounded-lg" required />
                    </div>
                    <div>
                      <Label htmlFor="collab-type" className="text-card-foreground text-sm font-semibold">Collaboration Type</Label>
                      <Select>
                        <SelectTrigger className="mt-2 h-12 rounded-lg">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="homestay">Eco Homestay Partner</SelectItem>
                          <SelectItem value="business">Green Business</SelectItem>
                          <SelectItem value="community">Travel Community</SelectItem>
                          <SelectItem value="ngo">NGO / Nonprofit</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="collab-message" className="text-card-foreground text-sm font-semibold">Message</Label>
                      <Textarea
                        id="collab-message"
                        placeholder="Tell us about your organization and how you'd like to collaborate..."
                        className="mt-2 min-h-[120px] rounded-lg"
                      />
                    </div>
                    <Button type="submit" size="lg" className="w-full rounded-full h-12 text-base">
                      <Send className="mr-2 h-4 w-4" /> Submit Request
                    </Button>
                  </form>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
