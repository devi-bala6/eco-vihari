"use client"

import { useState, useMemo } from "react"
import {
  MapPin, Wallet, Leaf, Sparkles, Train, Plane, Bus,
  Clock, Sun, Sunset, Moon, UtensilsCrossed, Footprints,
  ChevronRight, ChevronDown, Info, Calendar, Users,
} from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { DESTINATIONS, INDIAN_CITIES, calculateDistance } from "@/lib/travel-data"
import { getItinerary, type ItineraryActivity, type DayPlan } from "@/lib/itinerary-data"

/* helpers */

interface DestDisplayItem {
  name: string
  distance: number
  trainPrice: number
  trainCo2: number
  trainName: string
  trainTime: string
  busPrice: number
  busCo2: number
  flightPrice: number
  flightCo2: number
  region: string
  tags: string[]
}

function getRegion(name: string): string {
  const north = ["Manali", "Shimla", "Amritsar", "Rishikesh", "Leh", "Srinagar", "Agra", "Jaipur", "Jaisalmer"]
  const south = ["Bengaluru", "Chennai", "Kochi", "Ooty", "Munnar", "Pondicherry", "Hyderabad"]
  const east = ["Kolkata", "Darjeeling", "Gangtok"]
  const west = ["Mumbai", "Goa", "Udaipur"]
  if (north.includes(name)) return "North"
  if (south.includes(name)) return "South"
  if (east.includes(name)) return "East"
  if (west.includes(name)) return "West"
  return "Central"
}

function getTags(name: string): string[] {
  const tagMap: Record<string, string[]> = {
    Mumbai: ["Metro", "Culture", "Coastal"],
    Goa: ["Beach", "Nightlife", "Coastal"],
    Jaipur: ["Heritage", "Culture", "Desert"],
    Varanasi: ["Spiritual", "Heritage", "Culture"],
    Manali: ["Mountains", "Adventure", "Snow"],
    Shimla: ["Hill Station", "Heritage", "Nature"],
    Udaipur: ["Heritage", "Lakes", "Culture"],
    Amritsar: ["Spiritual", "Heritage", "Food"],
    Rishikesh: ["Yoga", "Adventure", "Spiritual"],
    Kolkata: ["Culture", "Heritage", "Food"],
    Hyderabad: ["Heritage", "Food", "Tech"],
    Bengaluru: ["Tech", "Gardens", "Culture"],
    Chennai: ["Temples", "Coastal", "Culture"],
    Kochi: ["Backwaters", "Coastal", "Culture"],
    Leh: ["Adventure", "Mountains", "Spiritual"],
    Srinagar: ["Lakes", "Mountains", "Gardens"],
    Agra: ["Heritage", "Architecture"],
    Jaisalmer: ["Desert", "Heritage", "Culture"],
    Darjeeling: ["Tea", "Mountains", "Nature"],
    Gangtok: ["Mountains", "Monasteries", "Nature"],
    Ooty: ["Hill Station", "Nature", "Tea"],
    Munnar: ["Tea", "Nature", "Hill Station"],
    Pondicherry: ["Beach", "French Quarter", "Cycling"],
  }
  return tagMap[name] || ["Travel"]
}

const activityIcons: Record<string, typeof Sun> = {
  morning: Sun,
  afternoon: Sunset,
  evening: Moon,
  meal: UtensilsCrossed,
  travel: Footprints,
}

const activityColors: Record<string, string> = {
  morning: "bg-amber-50 text-amber-700 border-amber-200",
  afternoon: "bg-orange-50 text-orange-700 border-orange-200",
  evening: "bg-indigo-50 text-indigo-700 border-indigo-200",
  meal: "bg-rose-50 text-rose-700 border-rose-200",
  travel: "bg-sky-50 text-sky-700 border-sky-200",
}

const destImages: Record<string, string> = {
  Mumbai: "/images/hero-india.jpg",
  Goa: "/images/cycling-india.jpg",
  Manali: "/images/hero-india.jpg",
  Jaipur: "/images/homestay-india.jpg",
  Varanasi: "/images/train-india.jpg",
}

/* Activity timeline item */

function ActivityItem({ activity }: { activity: ItineraryActivity }) {
  const Icon = activityIcons[activity.type] || Sun
  const colorClass = activityColors[activity.type] || activityColors.morning

  return (
    <div className="group relative flex gap-4">
      <div className="flex flex-col items-center">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${colorClass} transition-transform group-hover:scale-110`}>
          <Icon className="h-4 w-4" />
        </div>
        <div className="w-px flex-1 bg-border" />
      </div>

      <div className="pb-8 flex-1">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-xs font-mono font-semibold text-muted-foreground tracking-wider">{activity.time}</span>
          <Badge variant="secondary" className={`text-[10px] px-2 py-0 ${colorClass} border rounded-full`}>
            {activity.type}
          </Badge>
        </div>
        <h4 className="font-semibold text-foreground leading-snug">{activity.title}</h4>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{activity.description}</p>
        {activity.eco_tip && (
          <div className="mt-2.5 flex items-start gap-2 rounded-lg bg-primary/5 border border-primary/10 p-3">
            <Leaf className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-primary font-medium leading-snug">{activity.eco_tip}</p>
          </div>
        )}
      </div>
    </div>
  )
}

/* Day card */

function DayCard({ dayPlan, isOpen, onToggle }: { dayPlan: DayPlan; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden transition-shadow hover:shadow-md">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between p-5 md:p-6 text-left hover:bg-secondary/50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-serif text-lg font-bold">
            D{dayPlan.day}
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-lg leading-tight">{dayPlan.theme}</h3>
            <p className="text-sm text-muted-foreground">{dayPlan.activities.length} activities planned</p>
          </div>
        </div>
        <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="border-t border-border px-5 pt-6 pb-2 md:px-6">
          {dayPlan.activities.map((act, i) => (
            <ActivityItem key={i} activity={act} />
          ))}
        </div>
      )}
    </div>
  )
}

/* Destination card */

function DestCard({
  dest,
  isSelected,
  onSelect,
}: {
  dest: DestDisplayItem
  isSelected: boolean
  onSelect: () => void
}) {
  const imgSrc = destImages[dest.name] || "/images/hero-india.jpg"

  return (
    <button
      onClick={onSelect}
      className={`group relative w-full text-left rounded-2xl border-2 overflow-hidden transition-all duration-300 ${
        isSelected
          ? "border-primary shadow-lg shadow-primary/10 ring-2 ring-primary/20"
          : "border-border hover:border-primary/30 hover:shadow-md"
      }`}
    >
      <div className="relative h-32 overflow-hidden">
        <Image src={imgSrc} alt={dest.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-foreground/50" />
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
          <div>
            <h3 className="font-serif text-xl font-bold text-background drop-shadow-md">{dest.name}</h3>
            <p className="text-xs text-background/80">{dest.region} India</p>
          </div>
          <Badge className="bg-primary/90 text-primary-foreground border-0 text-xs backdrop-blur-sm rounded-full">
            {dest.trainCo2} kg CO2
          </Badge>
        </div>
      </div>

      <div className="p-4">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {dest.tags.map((tag) => (
            <span key={tag} className="inline-block rounded-full bg-secondary text-secondary-foreground px-2.5 py-0.5 text-[10px] font-medium">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 text-primary font-medium">
              <Train className="h-3 w-3" /> Train
            </span>
            <span className="text-foreground font-semibold">INR {dest.trainPrice.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Bus className="h-3 w-3" /> Bus
            </span>
            <span className="text-foreground">INR {dest.busPrice.toLocaleString("en-IN")}</span>
          </div>
          {dest.flightPrice > 0 && (
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Plane className="h-3 w-3" /> Flight
              </span>
              <span className="text-foreground">INR {dest.flightPrice.toLocaleString("en-IN")}</span>
            </div>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between pt-3 border-t border-border">
          <span className="text-[11px] text-muted-foreground">{dest.distance} km away</span>
          {isSelected ? (
            <span className="text-xs font-semibold text-primary flex items-center gap-1">
              Selected <ChevronRight className="h-3 w-3" />
            </span>
          ) : (
            <span className="text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors flex items-center gap-1">
              Select <ChevronRight className="h-3 w-3" />
            </span>
          )}
        </div>
      </div>
    </button>
  )
}

/* Main Trip Planner */

export function TripPlanner() {
  const [origin, setOrigin] = useState("")
  const [region, setRegion] = useState("")
  const [budgetFilter, setBudgetFilter] = useState("")
  const [selectedDest, setSelectedDest] = useState("")
  const [tripDays, setTripDays] = useState(3)
  const [tripTravelers, setTripTravelers] = useState(2)
  const [showResults, setShowResults] = useState(false)
  const [openDays, setOpenDays] = useState<number[]>([1])

  const originCities = useMemo(() => Object.keys(INDIAN_CITIES).sort(), [])

  const destinations: DestDisplayItem[] = useMemo(() => {
    const originCoords = origin ? INDIAN_CITIES[origin] : null
    if (!originCoords) return []

    return Object.entries(DESTINATIONS).map(([name, data]) => {
      const distance = calculateDistance(originCoords, data.coords)
      const ratio = data.distance > 0 ? distance / data.distance : 1
      return {
        name,
        distance,
        trainPrice: Math.round(data.train.price * ratio),
        trainCo2: Math.round(data.train.co2 * ratio),
        trainName: data.train.name,
        trainTime: data.train.time,
        busPrice: Math.round(data.bus.price * ratio),
        busCo2: Math.round(data.bus.co2 * ratio),
        flightPrice: Math.round(data.flight.price * ratio),
        flightCo2: Math.round(data.flight.co2 * ratio),
        region: getRegion(name),
        tags: getTags(name),
      }
    })
  }, [origin])

  const filtered = useMemo(() => {
    let list = destinations
    if (region && region !== "all") list = list.filter((d) => d.region === region)
    if (budgetFilter === "budget") list = list.filter((d) => d.trainPrice < 2000)
    if (budgetFilter === "mid") list = list.filter((d) => d.trainPrice >= 2000 && d.trainPrice < 4000)
    if (budgetFilter === "premium") list = list.filter((d) => d.trainPrice >= 4000)
    return list.sort((a, b) => a.trainCo2 - b.trainCo2)
  }, [destinations, region, budgetFilter])

  const results = showResults ? filtered : []

  const itinerary = useMemo(() => {
    if (!selectedDest) return null
    return getItinerary(selectedDest, tripDays)
  }, [selectedDest, tripDays])

  const toggleDay = (day: number) => {
    setOpenDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    )
  }

  const selectedDestData = results.find((d) => d.name === selectedDest)

  return (
    <section id="planner" className="py-28 px-6 bg-background">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">Trip Planner</p>
          <h2 className="font-serif text-4xl font-bold text-foreground sm:text-5xl md:text-6xl text-balance">
            Plan Your Eco-Friendly Trip
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-muted-foreground leading-relaxed text-pretty text-lg">
            Choose your destination, and we will craft a detailed day-by-day itinerary
            with wake-up times, must-visit places, local food spots, and eco tips.
          </p>
        </div>

        {/* Step 1: Filters */}
        <Card className="border-border bg-card mb-10 overflow-hidden">
          <div className="bg-primary/5 border-b border-border px-6 py-4">
            <p className="text-sm font-semibold text-foreground flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">1</span>
              Choose your starting point & preferences
            </p>
          </div>
          <CardContent className="p-6 md:p-10">
            <div className="grid gap-6 md:grid-cols-4 items-end">
              <div>
                <Label className="text-card-foreground flex items-center gap-2 mb-3 text-sm font-semibold">
                  <MapPin className="h-4 w-4 text-primary" /> Starting from
                </Label>
                <Select value={origin} onValueChange={(v) => { setOrigin(v); setShowResults(false); setSelectedDest("") }}>
                  <SelectTrigger className="h-12 rounded-lg"><SelectValue placeholder="Select your city" /></SelectTrigger>
                  <SelectContent>
                    {originCities.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-card-foreground flex items-center gap-2 mb-3 text-sm font-semibold">
                  <Sparkles className="h-4 w-4 text-primary" /> Region
                </Label>
                <Select value={region} onValueChange={(v) => { setRegion(v); setShowResults(false); setSelectedDest("") }}>
                  <SelectTrigger className="h-12 rounded-lg"><SelectValue placeholder="All regions" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    <SelectItem value="North">North India</SelectItem>
                    <SelectItem value="South">South India</SelectItem>
                    <SelectItem value="East">East India</SelectItem>
                    <SelectItem value="West">West India</SelectItem>
                    <SelectItem value="Central">Central India</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-card-foreground flex items-center gap-2 mb-3 text-sm font-semibold">
                  <Wallet className="h-4 w-4 text-primary" /> Budget (train)
                </Label>
                <Select value={budgetFilter} onValueChange={(v) => { setBudgetFilter(v); setShowResults(false); setSelectedDest("") }}>
                  <SelectTrigger className="h-12 rounded-lg"><SelectValue placeholder="Any budget" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Budget</SelectItem>
                    <SelectItem value="budget">Under INR 2,000</SelectItem>
                    <SelectItem value="mid">INR 2,000 - 4,000</SelectItem>
                    <SelectItem value="premium">Above INR 4,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button size="lg" onClick={() => { setShowResults(true); setSelectedDest("") }} className="w-full rounded-full h-12" disabled={!origin}>
                <Leaf className="mr-2 h-4 w-4" />
                Find Destinations
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Step 2: Destination selection */}
        {results.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">2</span>
              <p className="text-sm font-semibold text-foreground">
                Select a destination ({results.length} found, sorted by lowest CO2)
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {results.map((dest) => (
                <DestCard
                  key={dest.name}
                  dest={dest}
                  isSelected={selectedDest === dest.name}
                  onSelect={() => {
                    setSelectedDest(dest.name)
                    setOpenDays([1])
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {results.length === 0 && showResults && (
          <div className="text-center py-16 mb-10">
            <p className="text-muted-foreground text-lg">No destinations match your filters. Try adjusting your preferences.</p>
          </div>
        )}

        {!showResults && (
          <div className="text-center py-12 mb-10">
            <p className="text-muted-foreground">
              Select your city and preferences above, then click &quot;Find Destinations&quot; to see personalized recommendations.
            </p>
          </div>
        )}

        {/* Step 3: Itinerary */}
        {selectedDest && itinerary && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">3</span>
              <p className="text-sm font-semibold text-foreground">
                Your itinerary for {selectedDest}
              </p>
            </div>

            {/* Trip config bar */}
            <Card className="border-border bg-card mb-8 overflow-hidden">
              <CardContent className="p-6 md:p-8">
                <div className="grid gap-8 md:grid-cols-2 mb-8">
                  <div>
                    <Label className="text-card-foreground flex items-center justify-between mb-4">
                      <span className="flex items-center gap-2 text-sm font-semibold"><Calendar className="h-4 w-4 text-primary" /> Trip Duration</span>
                      <span className="text-lg font-bold text-primary">{tripDays} days</span>
                    </Label>
                    <Slider
                      value={[tripDays]}
                      onValueChange={(v) => { setTripDays(v[0]); setOpenDays([1]) }}
                      min={1} max={7} step={1}
                    />
                  </div>
                  <div>
                    <Label className="text-card-foreground flex items-center justify-between mb-4">
                      <span className="flex items-center gap-2 text-sm font-semibold"><Users className="h-4 w-4 text-primary" /> Travelers</span>
                      <span className="text-lg font-bold text-primary">{tripTravelers}</span>
                    </Label>
                    <Slider
                      value={[tripTravelers]}
                      onValueChange={(v) => setTripTravelers(v[0])}
                      min={1} max={10} step={1}
                    />
                  </div>
                </div>

                {/* Quick info */}
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="flex items-center gap-3 rounded-xl bg-secondary p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Highlights</p>
                      <p className="text-sm font-medium text-foreground truncate">{itinerary.highlights.slice(0, 2).join(", ")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl bg-secondary p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Best Time</p>
                      <p className="text-sm font-medium text-foreground">{itinerary.bestMonths}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl bg-secondary p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Footprints className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Local Transport</p>
                      <p className="text-sm font-medium text-foreground truncate">{itinerary.localTransport}</p>
                    </div>
                  </div>
                  {selectedDestData && (
                    <div className="flex items-center gap-3 rounded-xl bg-primary/5 border border-primary/10 p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Train className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Eco Route</p>
                        <p className="text-sm font-bold text-primary">INR {selectedDestData.trainPrice.toLocaleString("en-IN")} / {selectedDestData.trainCo2} kg</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Day-by-day itinerary */}
            <div className="flex flex-col gap-4">
              {itinerary.days.slice(0, tripDays).map((dayPlan) => (
                <DayCard
                  key={dayPlan.day}
                  dayPlan={dayPlan}
                  isOpen={openDays.includes(dayPlan.day)}
                  onToggle={() => toggleDay(dayPlan.day)}
                />
              ))}
            </div>

            {tripDays > itinerary.days.length && (
              <div className="mt-4 flex items-start gap-3 rounded-xl border border-border bg-secondary/50 p-5">
                <Info className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We have detailed plans for {itinerary.days.length} days in {selectedDest}. 
                  For the remaining {tripDays - itinerary.days.length} day(s), we recommend revisiting your favorite spots, 
                  exploring nearby villages, or simply relaxing at your eco-stay.
                </p>
              </div>
            )}

            {/* CTA */}
            <div className="mt-10 text-center">
              <a href="#calculator">
                <Button size="lg" className="text-base px-10 rounded-full h-12">
                  Calculate Full Trip CO2
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
