// Haversine distance calculation (same as Python version)
export function calculateDistance(
  coord1: [number, number],
  coord2: [number, number]
): number {
  const R = 6371
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const lat1 = toRad(coord1[1])
  const lon1 = toRad(coord1[0])
  const lat2 = toRad(coord2[1])
  const lon2 = toRad(coord2[0])
  const dlon = lon2 - lon1
  const dlat = lat2 - lat1
  const a =
    Math.sin(dlat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return Math.round(R * c)
}

export interface TransportInfo {
  name: string
  price: number
  co2: number
  time: string
}

export interface DestinationData {
  coords: [number, number]
  distance: number // base distance from Delhi
  flight: TransportInfo
  train: TransportInfo
  bus: TransportInfo
}

export const DESTINATIONS: Record<string, DestinationData> = {
  Mumbai: { coords: [72.8777, 19.076], distance: 1150, flight: { name: "Indigo 6E-201", price: 5400, co2: 145, time: "2h 10m" }, train: { name: "Rajdhani Express", price: 2950, co2: 35, time: "15h 30m" }, bus: { name: "Volvo AC Sleeper", price: 1800, co2: 55, time: "22h 00m" } },
  Goa: { coords: [73.818, 15.2993], distance: 1900, flight: { name: "SpiceJet SG-101", price: 6500, co2: 230, time: "2h 30m" }, train: { name: "Goa Express", price: 3200, co2: 48, time: "24h 00m" }, bus: { name: "Neeta Travels", price: 2200, co2: 85, time: "36h 00m" } },
  Jaipur: { coords: [75.7873, 26.9124], distance: 280, flight: { name: "Air India AI-403", price: 3800, co2: 45, time: "1h 05m" }, train: { name: "Shatabdi Express", price: 1200, co2: 12, time: "4h 30m" }, bus: { name: "Rajasthan Roadways", price: 800, co2: 18, time: "6h 30m" } },
  Varanasi: { coords: [82.9739, 25.3176], distance: 820, flight: { name: "Vistara UK-701", price: 5200, co2: 105, time: "1h 45m" }, train: { name: "Vande Bharat", price: 2100, co2: 25, time: "8h 15m" }, bus: { name: "UPSRTC AC", price: 1500, co2: 40, time: "14h 00m" } },
  Manali: { coords: [77.1892, 32.2396], distance: 540, flight: { name: "Helicopter Service", price: 9500, co2: 90, time: "1h 30m" }, train: { name: "Kalka-Shimla + Bus", price: 1800, co2: 22, time: "16h 00m" }, bus: { name: "HRTC Volvo", price: 1200, co2: 35, time: "14h 00m" } },
  Shimla: { coords: [77.1734, 31.1048], distance: 340, flight: { name: "Air India", price: 4500, co2: 55, time: "1h 10m" }, train: { name: "Kalka-Shimla Toy Train", price: 800, co2: 8, time: "5h 30m" }, bus: { name: "HRTC AC", price: 700, co2: 15, time: "8h 00m" } },
  Udaipur: { coords: [73.7125, 24.5854], distance: 660, flight: { name: "IndiGo 6E-501", price: 4800, co2: 85, time: "1h 30m" }, train: { name: "Mewar Express", price: 1900, co2: 20, time: "12h 00m" }, bus: { name: "RSRTC AC", price: 1400, co2: 30, time: "13h 30m" } },
  Amritsar: { coords: [74.8723, 31.634], distance: 450, flight: { name: "SpiceJet SG-301", price: 4200, co2: 60, time: "1h 15m" }, train: { name: "Shatabdi Express", price: 1500, co2: 15, time: "6h 00m" }, bus: { name: "PRTC AC", price: 1000, co2: 25, time: "9h 00m" } },
  Rishikesh: { coords: [78.2676, 30.0869], distance: 240, flight: { name: "Helicopter", price: 7000, co2: 40, time: "1h 00m" }, train: { name: "Dehradun Express", price: 600, co2: 6, time: "4h 30m" }, bus: { name: "Uttarakhand Transport", price: 400, co2: 10, time: "6h 00m" } },
  Kolkata: { coords: [88.3639, 22.5726], distance: 1500, flight: { name: "Air India AI-202", price: 6200, co2: 190, time: "2h 20m" }, train: { name: "Rajdhani Express", price: 3500, co2: 42, time: "17h 30m" }, bus: { name: "Private AC Sleeper", price: 2500, co2: 75, time: "28h 00m" } },
  Hyderabad: { coords: [78.4867, 17.385], distance: 1580, flight: { name: "IndiGo 6E-601", price: 5800, co2: 200, time: "2h 15m" }, train: { name: "Rajdhani Express", price: 3200, co2: 40, time: "20h 00m" }, bus: { name: "APSRTC Garuda", price: 2300, co2: 65, time: "24h 00m" } },
  Bengaluru: { coords: [77.5946, 12.9716], distance: 2100, flight: { name: "Vistara UK-801", price: 7200, co2: 265, time: "2h 45m" }, train: { name: "Rajdhani Express", price: 4200, co2: 50, time: "32h 00m" }, bus: { name: "KSRTC Airavat", price: 3200, co2: 85, time: "36h 00m" } },
  Chennai: { coords: [80.2707, 13.0827], distance: 2200, flight: { name: "Air India AI-303", price: 6800, co2: 275, time: "2h 50m" }, train: { name: "Rajdhani Express", price: 4500, co2: 55, time: "28h 30m" }, bus: { name: "TNSTC AC", price: 3500, co2: 90, time: "34h 00m" } },
  Kochi: { coords: [76.2711, 9.9312], distance: 2600, flight: { name: "IndiGo 6E-701", price: 8200, co2: 325, time: "3h 30m" }, train: { name: "Kerala Express", price: 4800, co2: 65, time: "38h 00m" }, bus: { name: "KSRTC AC", price: 3800, co2: 105, time: "48h 00m" } },
  Leh: { coords: [77.5771, 34.1526], distance: 1000, flight: { name: "Air India AI-401", price: 9500, co2: 130, time: "1h 30m" }, train: { name: "Jammu + Bus", price: 3500, co2: 45, time: "48h 00m" }, bus: { name: "HRTC + J&K Transport", price: 2800, co2: 70, time: "36h 00m" } },
  Srinagar: { coords: [74.7973, 34.0837], distance: 800, flight: { name: "Vistara UK-901", price: 8800, co2: 105, time: "1h 40m" }, train: { name: "Jammu Tawi + Taxi", price: 3200, co2: 40, time: "20h 00m" }, bus: { name: "J&K SRTC", price: 2500, co2: 50, time: "18h 00m" } },
  Agra: { coords: [78.0081, 27.1767], distance: 230, flight: { name: "N/A", price: 0, co2: 0, time: "0h 00m" }, train: { name: "Gatiman Express", price: 900, co2: 8, time: "1h 40m" }, bus: { name: "UPSRTC AC Volvo", price: 600, co2: 12, time: "3h 30m" } },
  Jaisalmer: { coords: [70.9223, 26.9157], distance: 800, flight: { name: "SpiceJet", price: 5500, co2: 95, time: "1h 40m" }, train: { name: "Runicha Express", price: 1800, co2: 28, time: "18h 00m" }, bus: { name: "RSRTC Sleeper", price: 1200, co2: 45, time: "16h 00m" } },
  Darjeeling: { coords: [88.2627, 27.041], distance: 1500, flight: { name: "Via Bagdogra", price: 6000, co2: 180, time: "2h 15m" }, train: { name: "North East Express", price: 2800, co2: 45, time: "28h 00m" }, bus: { name: "Private Volvo", price: 2200, co2: 70, time: "32h 00m" } },
  Gangtok: { coords: [88.6138, 27.3389], distance: 1600, flight: { name: "Via Pakyong", price: 7000, co2: 190, time: "2h 30m" }, train: { name: "NJP + Taxi", price: 3000, co2: 50, time: "30h 00m" }, bus: { name: "NBSTC", price: 2400, co2: 80, time: "35h 00m" } },
  Ooty: { coords: [76.6951, 11.41], distance: 2300, flight: { name: "Via Coimbatore", price: 7500, co2: 280, time: "3h 00m" }, train: { name: "Nilgiri Mountain Rail", price: 4000, co2: 60, time: "40h 00m" }, bus: { name: "KSRTC", price: 3200, co2: 95, time: "48h 00m" } },
  Munnar: { coords: [77.0595, 10.0889], distance: 2600, flight: { name: "Via Kochi", price: 8000, co2: 310, time: "3h 15m" }, train: { name: "Kerala Express + Taxi", price: 4500, co2: 70, time: "45h 00m" }, bus: { name: "KSRTC Sleeper", price: 3500, co2: 110, time: "50h 00m" } },
  Pondicherry: { coords: [79.8145, 11.9416], distance: 2400, flight: { name: "SpiceJet", price: 7200, co2: 290, time: "2h 55m" }, train: { name: "Puducherry Exp", price: 4200, co2: 65, time: "42h 00m" }, bus: { name: "TNSTC Ultra", price: 3400, co2: 100, time: "46h 00m" } },
}

export const INDIAN_CITIES: Record<string, [number, number]> = {
  Delhi: [77.209, 28.6139], Mumbai: [72.8777, 19.076], Bengaluru: [77.5946, 12.9716],
  Chennai: [80.2707, 13.0827], Kolkata: [88.3639, 22.5726], Hyderabad: [78.4867, 17.385],
  Pune: [73.8567, 18.5204], Ahmedabad: [72.5714, 23.0225], Jaipur: [75.7873, 26.9124],
  Lucknow: [80.9462, 26.8467], Kanpur: [80.3319, 26.4499], Nagpur: [79.0882, 21.1458],
  Indore: [75.8577, 22.7196], Thane: [72.9781, 19.2183], Bhopal: [77.4126, 23.2599],
  Visakhapatnam: [83.2185, 17.6868], Patna: [85.1376, 25.5941], Vadodara: [73.1812, 22.3072],
  Ghaziabad: [77.4538, 28.6692], Ludhiana: [75.8573, 30.901], Agra: [78.0081, 27.1767],
  Nashik: [73.7898, 19.9975], Faridabad: [77.3178, 28.4089], Meerut: [77.7064, 28.9845],
  Rajkot: [70.8029, 22.3039], Kalyan: [73.1305, 19.2437], Vasai: [72.7449, 19.3919],
  Varanasi: [82.9739, 25.3176], Srinagar: [74.7973, 34.0837], Aurangabad: [75.3433, 19.8762],
  Dhanbad: [86.4304, 23.7957], Amritsar: [74.8723, 31.634], Allahabad: [81.8463, 25.4358],
  Ranchi: [85.3096, 23.3441], Howrah: [88.2644, 22.5958], Coimbatore: [76.9558, 11.0168],
  Jabalpur: [79.9865, 23.1815], Gwalior: [78.1828, 26.2183], Vijayawada: [80.648, 16.5062],
  Jodhpur: [73.0229, 26.2389], Madurai: [78.1198, 9.9252], Raipur: [81.6296, 21.2514],
  Kota: [75.8648, 25.2138], Chandigarh: [76.7794, 30.7333], Guwahati: [91.743, 26.1445],
  Solapur: [75.91, 17.6599], Hubli: [75.1104, 15.3647], Bareilly: [79.415, 28.367],
  Moradabad: [78.7757, 28.8388], Mysore: [76.6394, 12.2958], Tiruchirappalli: [78.6808, 10.7905],
  Bhubaneswar: [85.8245, 20.2961], Salem: [78.1586, 11.6643], Jamshedpur: [86.2029, 22.8046],
  Warangal: [79.5882, 17.9689],
}

export interface AccommodationOption {
  price: number
  co2: number
  bookingLink: string
}

export const ACCOMMODATION_OPTIONS: Record<string, AccommodationOption> = {
  "Luxury Hotel (5-Star)": { price: 8000, co2: 60, bookingLink: "https://www.makemytrip.com/hotels/" },
  "Standard Hotel (3-Star)": { price: 3500, co2: 25, bookingLink: "https://www.goibibo.com/hotels/" },
  "Budget Hotel": { price: 2000, co2: 15, bookingLink: "https://www.oyorooms.com" },
  "Eco-Resort": { price: 4500, co2: 10, bookingLink: "https://www.treebo.com" },
  "Hostel/Dormitory": { price: 800, co2: 5, bookingLink: "https://www.zostel.com" },
  Homestay: { price: 1500, co2: 8, bookingLink: "https://www.saffronstays.com" },
  "Camping (Tent/Van)": { price: 1200, co2: 5, bookingLink: "https://www.campervan.com" },
  "With Relatives": { price: 0, co2: 0, bookingLink: "#" },
}

export const FOOD_OPTIONS: Record<string, AccommodationOption> = {
  "Fine Dining (Restaurants)": { price: 3000, co2: 15, bookingLink: "https://www.eazydiner.com" },
  "Standard Restaurants": { price: 1500, co2: 8, bookingLink: "https://www.zomato.com" },
  "Local Street Food": { price: 500, co2: 3, bookingLink: "https://www.google.com/maps/search/street+food" },
  "Self-Cooking": { price: 400, co2: 2, bookingLink: "https://www.bigbasket.com" },
  "Food Stalls/Dhabas": { price: 300, co2: 2, bookingLink: "https://www.google.com/maps/search/dhaba" },
  "With Relatives": { price: 0, co2: 0, bookingLink: "#" },
}

export type TransportMode = "Flight" | "Train" | "Bus" | "Car (Personal)" | "Car (Taxi/Rental)"

export interface TransportOptionCalc {
  name: string
  pricePerPerson?: number
  co2PerPerson?: number
  priceTotalTrip?: number
  co2TotalTrip?: number
  isPerPerson: boolean
  time: string
  type: TransportMode
}

export interface EcoCombination {
  transport: TransportMode
  stay: string
  food: string
  totalCost: number
  totalCo2: number
  transportName: string
  transportCost: number
  stayCost: number
  foodCost: number
  ecoScore: number
}

export function buildTransportOptions(
  destInfo: DestinationData,
  distanceRatio: number,
  distance: number
): Record<TransportMode, TransportOptionCalc> {
  const carSpeedAvg = 60
  const carTimeHours = Math.floor(distance / carSpeedAvg)
  const carTimeMin = Math.floor((distance % carSpeedAvg))
  const carTimeStr = `${carTimeHours}h ${carTimeMin}m`

  return {
    Flight: {
      name: destInfo.flight.name,
      pricePerPerson: Math.round(destInfo.flight.price * distanceRatio),
      co2PerPerson: Math.round(destInfo.flight.co2 * distanceRatio),
      isPerPerson: true,
      time: destInfo.flight.time,
      type: "Flight",
    },
    Train: {
      name: destInfo.train.name,
      pricePerPerson: Math.round(destInfo.train.price * distanceRatio),
      co2PerPerson: Math.round(destInfo.train.co2 * distanceRatio),
      isPerPerson: true,
      time: destInfo.train.time,
      type: "Train",
    },
    Bus: {
      name: destInfo.bus.name,
      pricePerPerson: Math.round(destInfo.bus.price * distanceRatio),
      co2PerPerson: Math.round(destInfo.bus.co2 * distanceRatio),
      isPerPerson: true,
      time: destInfo.bus.time,
      type: "Bus",
    },
    "Car (Personal)": {
      name: "Personal Vehicle",
      priceTotalTrip: distance * 15,
      co2TotalTrip: distance * 0.15,
      isPerPerson: false,
      time: carTimeStr,
      type: "Car (Personal)",
    },
    "Car (Taxi/Rental)": {
      name: "Taxi / Rental",
      priceTotalTrip: distance * 22,
      co2TotalTrip: distance * 0.15,
      isPerPerson: false,
      time: carTimeStr,
      type: "Car (Taxi/Rental)",
    },
  }
}

export function getTransportCostAndCo2(
  opt: TransportOptionCalc,
  travelers: number
): { cost: number; co2: number } {
  if (opt.isPerPerson) {
    return {
      cost: (opt.pricePerPerson ?? 0) * travelers,
      co2: (opt.co2PerPerson ?? 0) * travelers,
    }
  }
  const vehiclesNeeded = Math.ceil(travelers / 4)
  return {
    cost: (opt.priceTotalTrip ?? 0) * vehiclesNeeded,
    co2: (opt.co2TotalTrip ?? 0) * vehiclesNeeded,
  }
}

export function findBestEcoCombinations(
  transportOptions: Record<TransportMode, TransportOptionCalc>,
  travelers: number,
  days: number,
  userStay: string,
  userFood: string
): EcoCombination[] {
  const combinations: EcoCombination[] = []
  const transportModes: TransportMode[] = [
    "Flight", "Train", "Bus", "Car (Personal)", "Car (Taxi/Rental)",
  ]

  for (const tKey of transportModes) {
    const tData = transportOptions[tKey]
    for (const [sKey, sData] of Object.entries(ACCOMMODATION_OPTIONS)) {
      // respect "With Relatives" lock
      if (userStay !== "With Relatives" && sKey === "With Relatives") continue
      if (userStay === "With Relatives" && sKey !== "With Relatives") continue

      for (const [fKey, fData] of Object.entries(FOOD_OPTIONS)) {
        if (userFood !== "With Relatives" && fKey === "With Relatives") continue
        if (userFood === "With Relatives" && fKey !== "With Relatives") continue

        const { cost: tCost, co2: tCo2 } = getTransportCostAndCo2(tData, travelers)
        const sCost = sData.price * days
        const sCo2 = sData.co2 * days
        const fCost = fData.price * days * travelers
        const fCo2 = fData.co2 * days * travelers
        const totalCost = tCost + sCost + fCost
        const totalCo2 = tCo2 + sCo2 + fCo2
        const ecoScore = totalCost / 1000 + totalCo2 * 0.5

        combinations.push({
          transport: tKey,
          stay: sKey,
          food: fKey,
          totalCost,
          totalCo2,
          transportName: tData.name,
          transportCost: tCost,
          stayCost: sCost,
          foodCost: fCost,
          ecoScore,
        })
      }
    }
  }

  combinations.sort((a, b) => a.ecoScore - b.ecoScore)
  return combinations.slice(0, 3)
}

export function getRank(percentReduction: number) {
  if (percentReduction >= 50) {
    return {
      name: "Guardian of the Earth",
      icon: "crown",
      description: "Outstanding! You are slashing carbon emissions in half. A true protector of the planet.",
      color: "from-emerald-500 to-green-400",
    }
  }
  if (percentReduction >= 20) {
    return {
      name: "Eco Warrior",
      icon: "shield",
      description: "Great job! You are making significant strides towards sustainable travel.",
      color: "from-sky-400 to-cyan-400",
    }
  }
  return {
    name: "Conscious Traveler",
    icon: "footprints",
    description: "You are aware of your impact. Small steps lead to big changes.",
    color: "from-amber-400 to-orange-400",
  }
}
