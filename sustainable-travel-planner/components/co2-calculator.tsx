"use client"

import { useState, useMemo } from "react"
import {
  Plane, Car, Train, Bus, MapPin, Users, Calendar, Utensils,
  Home, ArrowRight, Leaf,
  ExternalLink, ChevronDown, Award,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  calculateDistance, DESTINATIONS, INDIAN_CITIES,
  ACCOMMODATION_OPTIONS, FOOD_OPTIONS,
  buildTransportOptions, getTransportCostAndCo2,
  findBestEcoCombinations,
  type TransportMode,
} from "@/lib/travel-data"

const transportIcons: Record<string, typeof Plane> = {
  Flight: Plane,
  Train: Train,
  Bus: Bus,
  "Car (Personal)": Car,
  "Car (Taxi/Rental)": Car,
}

const TRANSPORT_MODES: TransportMode[] = [
  "Flight", "Train", "Bus", "Car (Personal)", "Car (Taxi/Rental)",
]

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n)
}

export function CO2Calculator() {
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [transport, setTransport] = useState<TransportMode>("Train")
  const [stay, setStay] = useState("Budget Hotel")
  const [food, setFood] = useState("Local Street Food")
  const [travelers, setTravelers] = useState(2)
  const [days, setDays] = useState(5)
  const [calculated, setCalculated] = useState(false)

  const originCities = useMemo(() => Object.keys(INDIAN_CITIES).sort(), [])
  const destinationNames = useMemo(() => Object.keys(DESTINATIONS).sort(), [])

  const result = useMemo(() => {
    if (!calculated || !origin || !destination) return null

    const originCoords = INDIAN_CITIES[origin]
    const destInfo = DESTINATIONS[destination]
    if (!originCoords || !destInfo) return null

    const distance = calculateDistance(originCoords, destInfo.coords)
    const baseDelhiDistance = destInfo.distance
    const distanceRatio = baseDelhiDistance > 0 ? distance / baseDelhiDistance : 1

    const transportOptions = buildTransportOptions(destInfo, distanceRatio, distance)
    const userTransport = transportOptions[transport]
    const { cost: transportCost, co2: transportCo2 } = getTransportCostAndCo2(userTransport, travelers)

    const stayCost = ACCOMMODATION_OPTIONS[stay].price * days
    const stayCo2 = ACCOMMODATION_OPTIONS[stay].co2 * days
    const foodCost = FOOD_OPTIONS[food].price * days * travelers
    const foodCo2 = FOOD_OPTIONS[food].co2 * days * travelers

    const userTotalCost = transportCost + stayCost + foodCost
    const userTotalCo2 = transportCo2 + stayCo2 + foodCo2

    const bestCombinations = findBestEcoCombinations(
      transportOptions, travelers, days, stay, food
    )
    const ecoBest = bestCombinations[0]

    const isAlreadyEco =
      ecoBest.transport === transport &&
      ecoBest.stay === stay &&
      ecoBest.food === food

    const savings = userTotalCost - ecoBest.totalCost
    const co2Savings = userTotalCo2 - ecoBest.totalCo2
    const percentReduction = userTotalCo2 > 0 ? (co2Savings / userTotalCo2) * 100 : 0

    const allTransportDisplay = TRANSPORT_MODES.map((mode) => {
      const opt = transportOptions[mode]
      const { cost, co2 } = getTransportCostAndCo2(opt, travelers)
      return { mode, name: opt.name, cost, co2, time: opt.time }
    })

    return {
      distance,
      transportOptions,
      userTransport,
      transportCost,
      transportCo2,
      transportName: userTransport.name,
      stayCost,
      stayCo2,
      foodCost,
      foodCo2,
      userTotalCost,
      userTotalCo2,
      bestCombinations,
      ecoBest,
      isAlreadyEco,
      savings,
      co2Savings,
      percentReduction,
      allTransportDisplay,
    }
  }, [calculated, origin, destination, transport, stay, food, travelers, days])

  const handleCalculate = () => {
    if (origin && destination) {
      setCalculated(true)
    }
  }

  const handleReset = () => {
    setCalculated(false)
  }

  return (
    <section id="calculator" className="py-28 px-6 bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">Carbon Impact Calculator</p>
          <h2 className="font-serif text-4xl font-bold text-foreground sm:text-5xl md:text-6xl text-balance">
            Calculate Your Travel Impact
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-muted-foreground leading-relaxed text-pretty text-lg">
            Compare CO2 emissions, costs, and get eco-optimized recommendations
            across {Object.keys(DESTINATIONS).length} destinations and {Object.keys(INDIAN_CITIES).length}+ origin cities.
          </p>
        </div>

        {/* INPUT FORM */}
        <Card className="border-border bg-card mb-10 overflow-hidden">
          <CardContent className="p-0">
            <div className="p-6 md:p-10">
              {/* Row 1: Origin & Destination */}
              <div className="grid gap-6 md:grid-cols-2 mb-8">
                <div>
                  <Label className="text-card-foreground flex items-center gap-2 mb-3 text-sm font-semibold">
                    <MapPin className="h-4 w-4 text-primary" /> Your City
                  </Label>
                  <Select value={origin} onValueChange={(v) => { setOrigin(v); handleReset() }}>
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
                    <MapPin className="h-4 w-4 text-destructive" /> Destination
                  </Label>
                  <Select value={destination} onValueChange={(v) => { setDestination(v); handleReset() }}>
                    <SelectTrigger className="h-12 rounded-lg"><SelectValue placeholder="Select destination" /></SelectTrigger>
                    <SelectContent>
                      {destinationNames.map((d) => (
                        <SelectItem key={d} value={d}>{d}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Row 2: Transport mode */}
              <div className="mb-8">
                <Label className="text-card-foreground mb-4 block text-sm font-semibold">Transport Mode</Label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                  {TRANSPORT_MODES.map((mode) => {
                    const Icon = transportIcons[mode]
                    const isSelected = transport === mode
                    return (
                      <button
                        key={mode}
                        onClick={() => { setTransport(mode); handleReset() }}
                        className={`flex flex-col items-center gap-2.5 rounded-xl border-2 p-4 transition-all ${
                          isSelected
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/30 bg-card"
                        }`}
                      >
                        <Icon className={`h-5 w-5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                        <span className={`text-xs font-semibold ${isSelected ? "text-primary" : "text-muted-foreground"}`}>
                          {mode}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Row 3: Accommodation & Food */}
              <div className="grid gap-6 md:grid-cols-2 mb-8">
                <div>
                  <Label className="text-card-foreground flex items-center gap-2 mb-3 text-sm font-semibold">
                    <Home className="h-4 w-4 text-primary" /> Accommodation
                  </Label>
                  <Select value={stay} onValueChange={(v) => { setStay(v); handleReset() }}>
                    <SelectTrigger className="h-12 rounded-lg"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {Object.keys(ACCOMMODATION_OPTIONS).map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-card-foreground flex items-center gap-2 mb-3 text-sm font-semibold">
                    <Utensils className="h-4 w-4 text-primary" /> Dining Preference
                  </Label>
                  <Select value={food} onValueChange={(v) => { setFood(v); handleReset() }}>
                    <SelectTrigger className="h-12 rounded-lg"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {Object.keys(FOOD_OPTIONS).map((f) => (
                        <SelectItem key={f} value={f}>{f}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Row 4: Sliders */}
              <div className="grid gap-8 md:grid-cols-2 mb-10">
                <div>
                  <Label className="text-card-foreground flex items-center justify-between mb-4">
                    <span className="flex items-center gap-2 text-sm font-semibold"><Users className="h-4 w-4 text-primary" /> Travelers</span>
                    <span className="text-lg font-bold text-primary">{travelers}</span>
                  </Label>
                  <Slider
                    value={[travelers]}
                    onValueChange={(v) => { setTravelers(v[0]); handleReset() }}
                    min={1} max={10} step={1}
                  />
                </div>
                <div>
                  <Label className="text-card-foreground flex items-center justify-between mb-4">
                    <span className="flex items-center gap-2 text-sm font-semibold"><Calendar className="h-4 w-4 text-primary" /> Duration (days)</span>
                    <span className="text-lg font-bold text-primary">{days}</span>
                  </Label>
                  <Slider
                    value={[days]}
                    onValueChange={(v) => { setDays(v[0]); handleReset() }}
                    min={1} max={30} step={1}
                  />
                </div>
              </div>

              <Button
                onClick={handleCalculate}
                className="w-full rounded-full h-12 text-base"
                size="lg"
                disabled={!origin || !destination}
              >
                Calculate My Impact
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* RESULTS */}
        {result && (
          <div className="flex flex-col gap-8">
            {/* Summary metrics */}
            <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
              {[
                { label: "Distance", value: `${result.distance} km`, color: "text-foreground" },
                { label: "Travelers", value: travelers.toString(), color: "text-primary" },
                { label: "Duration", value: `${days} days`, color: "text-foreground" },
                { label: "Your CO2", value: `${Math.round(result.userTotalCo2)} kg`, color: "text-destructive" },
              ].map((m) => (
                <Card key={m.label} className="border-border bg-card">
                  <CardContent className="p-6 text-center">
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">{m.label}</p>
                    <p className={`font-serif text-3xl font-bold ${m.color}`}>{m.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Eco assistant message */}
            <Card className={`${result.isAlreadyEco ? "border-primary/30 bg-primary/5" : "border-accent/30 bg-accent/5"}`}>
              <CardContent className="p-6 flex items-start gap-4">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${result.isAlreadyEco ? "bg-primary/10" : "bg-accent/10"}`}>
                  <Leaf className={`h-6 w-6 ${result.isAlreadyEco ? "text-primary" : "text-accent-foreground"}`} />
                </div>
                <div>
                  <p className="font-semibold text-card-foreground text-lg mb-1">Eco Assistant</p>
                  {result.isAlreadyEco ? (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Excellent! Your trip is already optimal! You are generating only{" "}
                      <span className="font-bold text-primary">{Math.round(result.userTotalCo2)} kg CO2</span>.
                      Have a safe and sustainable journey!
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Your current plan generates{" "}
                      <span className="font-bold text-destructive">{Math.round(result.userTotalCo2)} kg CO2</span>.
                      Consider the eco-alternative below to save{" "}
                      <span className="font-bold text-primary">
                        {"INR"} {formatCurrency(result.savings)}
                      </span> and{" "}
                      <span className="font-bold text-primary">
                        {Math.round(result.co2Savings)} kg CO2
                      </span>!
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Comparison: Your Plan vs Eco Plan */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* User Plan */}
              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-2.5 w-2.5 rounded-full bg-destructive" />
                    <h3 className="font-semibold text-card-foreground text-lg">Your Current Plan</h3>
                  </div>
                  <div className="flex flex-col gap-3 mb-6">
                    <div className="flex items-center justify-between rounded-xl bg-secondary p-4">
                      <span className="text-sm text-secondary-foreground">Transport: {result.transportName}</span>
                      <span className="text-sm font-bold text-foreground">INR {formatCurrency(result.transportCost)}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-secondary p-4">
                      <span className="text-sm text-secondary-foreground">Stay: {stay}</span>
                      <span className="text-sm font-bold text-foreground">INR {formatCurrency(result.stayCost)}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-secondary p-4">
                      <span className="text-sm text-secondary-foreground">Food: {food}</span>
                      <span className="text-sm font-bold text-foreground">INR {formatCurrency(result.foodCost)}</span>
                    </div>
                  </div>
                  <div className="rounded-xl bg-destructive/10 p-5">
                    <p className="text-xl font-bold text-destructive">Total: INR {formatCurrency(result.userTotalCost)}</p>
                    <p className="text-sm text-destructive/80 mt-1">Carbon: {Math.round(result.userTotalCo2)} kg CO2</p>
                  </div>
                </CardContent>
              </Card>

              {/* Eco Plan */}
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                    <h3 className="font-semibold text-card-foreground text-lg">Recommended Eco Plan</h3>
                    <Badge className="ml-auto bg-primary text-primary-foreground border-0 rounded-full">Best</Badge>
                  </div>
                  <div className="flex flex-col gap-3 mb-6">
                    <div className="flex items-center justify-between rounded-xl bg-card p-4">
                      <span className="text-sm text-muted-foreground">Transport: {result.ecoBest.transportName}</span>
                      <span className="text-sm font-bold text-foreground">INR {formatCurrency(result.ecoBest.transportCost)}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-card p-4">
                      <span className="text-sm text-muted-foreground">Stay: {result.ecoBest.stay}</span>
                      <span className="text-sm font-bold text-foreground">INR {formatCurrency(result.ecoBest.stayCost)}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-card p-4">
                      <span className="text-sm text-muted-foreground">Food: {result.ecoBest.food}</span>
                      <span className="text-sm font-bold text-foreground">INR {formatCurrency(result.ecoBest.foodCost)}</span>
                    </div>
                  </div>
                  <div className="rounded-xl bg-primary/10 p-5">
                    <p className="text-xl font-bold text-primary">Total: INR {formatCurrency(result.ecoBest.totalCost)}</p>
                    <p className="text-sm text-primary/80 mt-1">Carbon: {Math.round(result.ecoBest.totalCo2)} kg CO2</p>
                  </div>

                  {/* Booking links */}
                  <div className="flex flex-wrap gap-2 mt-5">
                    {result.ecoBest.transport === "Train" && (
                      <a href="https://www.irctc.co.in" target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity">
                        Book Train <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                    {result.ecoBest.transport === "Bus" && (
                      <a href="https://www.redbus.in" target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity">
                        Book Bus <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                    {result.ecoBest.transport === "Flight" && (
                      <a href="https://www.makemytrip.com/flights/" target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity">
                        Book Flight <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                    <a href={ACCOMMODATION_OPTIONS[result.ecoBest.stay]?.bookingLink || "#"} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-4 py-2 text-xs font-semibold text-secondary-foreground hover:opacity-90 transition-opacity">
                      Find Stay <ExternalLink className="h-3 w-3" />
                    </a>
                    <a href={FOOD_OPTIONS[result.ecoBest.food]?.bookingLink || "#"} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-4 py-2 text-xs font-semibold text-secondary-foreground hover:opacity-90 transition-opacity">
                      Find Food <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* All transport options comparison */}
            <div>
              <h3 className="font-semibold text-foreground mb-5 flex items-center gap-2 text-lg">
                <ChevronDown className="h-4 w-4" /> All Transport Options
              </h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {result.allTransportDisplay.map((opt) => {
                  const Icon = transportIcons[opt.mode]
                  const isCurrent = transport === opt.mode
                  const isRecommended = result.ecoBest.transport === opt.mode
                  return (
                    <Card
                      key={opt.mode}
                      className={`border-2 transition-colors ${
                        isRecommended
                          ? "border-primary bg-primary/5"
                          : isCurrent
                          ? "border-accent bg-accent/5"
                          : "border-border bg-card"
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-semibold text-card-foreground">{opt.mode}</span>
                          </div>
                          {isRecommended && <Badge className="bg-primary text-primary-foreground border-0 text-[10px] px-1.5 py-0.5 rounded-full">Eco</Badge>}
                          {isCurrent && !isRecommended && <Badge variant="secondary" className="text-[10px] px-1.5 py-0.5 rounded-full">You</Badge>}
                        </div>
                        <p className="text-xs text-muted-foreground mb-3 truncate">{opt.name}</p>
                        <div className="flex flex-col gap-1.5 text-sm">
                          <span className="text-foreground font-semibold">INR {formatCurrency(opt.cost)}</span>
                          <span className="text-muted-foreground">{Math.round(opt.co2)} kg CO2</span>
                          <span className="text-xs text-muted-foreground mt-1">{opt.time}</span>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* Top 3 eco combinations */}
            <div>
              <h3 className="font-semibold text-foreground mb-5 flex items-center gap-2 text-lg">
                <Award className="h-4 w-4 text-primary" /> Top 3 Eco-Friendly Combinations
              </h3>
              <div className="grid gap-4 md:grid-cols-3">
                {result.bestCombinations.map((combo, i) => (
                  <Card key={i} className={`border-2 ${i === 0 ? "border-primary bg-primary/5" : "border-border bg-card"}`}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-5">
                        <Badge variant={i === 0 ? "default" : "secondary"} className="rounded-full">
                          Rank #{i + 1}
                        </Badge>
                        <span className="text-lg font-serif font-bold text-muted-foreground">
                          {i === 0 ? "1st" : i === 1 ? "2nd" : "3rd"}
                        </span>
                      </div>
                      <div className="flex flex-col gap-2.5 text-sm mb-5">
                        <p className="text-card-foreground"><span className="text-muted-foreground">Transport:</span> {combo.transport}</p>
                        <p className="text-card-foreground"><span className="text-muted-foreground">Stay:</span> {combo.stay}</p>
                        <p className="text-card-foreground"><span className="text-muted-foreground">Food:</span> {combo.food}</p>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-border text-sm">
                        <span className="text-foreground font-bold">INR {formatCurrency(combo.totalCost)}</span>
                        <span className="text-muted-foreground">{Math.round(combo.totalCo2)} kg CO2</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
