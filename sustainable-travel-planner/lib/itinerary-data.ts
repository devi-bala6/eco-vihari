export interface ItineraryActivity {
  time: string
  title: string
  description: string
  type: "morning" | "afternoon" | "evening" | "meal" | "travel"
  eco_tip?: string
}

export interface DayPlan {
  day: number
  theme: string
  activities: ItineraryActivity[]
}

export interface DestinationItinerary {
  highlights: string[]
  bestMonths: string
  localTransport: string
  days: DayPlan[]
}

const GOA_ITINERARY: DestinationItinerary = {
  highlights: ["Anjuna Flea Market", "Old Goa Churches", "Dudhsagar Falls", "Palolem Beach"],
  bestMonths: "Nov - Feb",
  localTransport: "Rent a bicycle or scooter, local buses",
  days: [
    {
      day: 1, theme: "North Goa Heritage",
      activities: [
        { time: "6:30 AM", title: "Sunrise at Calangute Beach", description: "Start your day with a peaceful sunrise walk along the golden sands.", type: "morning" },
        { time: "8:00 AM", title: "Breakfast at a beach shack", description: "Try local Goan poi bread with butter and chai at a beachside shack.", type: "meal", eco_tip: "Choose shacks that use biodegradable plates" },
        { time: "10:00 AM", title: "Fort Aguada", description: "Explore this 17th-century Portuguese fort with panoramic Arabian Sea views.", type: "morning" },
        { time: "1:00 PM", title: "Lunch at Anjuna", description: "Enjoy Goan fish curry rice at a local family-run restaurant.", type: "meal" },
        { time: "3:00 PM", title: "Anjuna Flea Market", description: "Browse handicrafts, spices, and sustainable souvenirs from local artisans.", type: "afternoon" },
        { time: "5:30 PM", title: "Vagator Beach sunset", description: "Watch the sunset from Chapora Fort viewpoint overlooking Vagator.", type: "evening" },
        { time: "7:30 PM", title: "Dinner at Thalassa", description: "Greek-Goan fusion dinner with live music and sea breeze.", type: "meal" },
      ],
    },
    {
      day: 2, theme: "Old Goa & Culture",
      activities: [
        { time: "7:00 AM", title: "Morning yoga on the beach", description: "Join a free community yoga session at Mandrem Beach.", type: "morning", eco_tip: "Carry a reusable water bottle" },
        { time: "9:00 AM", title: "Basilica of Bom Jesus", description: "UNESCO World Heritage Site housing St. Francis Xavier's remains.", type: "morning" },
        { time: "11:00 AM", title: "Se Cathedral", description: "One of the largest churches in Asia with stunning Portuguese architecture.", type: "morning" },
        { time: "1:00 PM", title: "Goan thali lunch", description: "Authentic vegetarian Goan thali at a local dhaba.", type: "meal" },
        { time: "3:00 PM", title: "Spice plantation tour", description: "Learn about organic farming, sample fresh spices, enjoy a plantation lunch.", type: "afternoon", eco_tip: "Support organic spice farms" },
        { time: "6:00 PM", title: "Fontainhas Latin Quarter", description: "Walk through the colorful Portuguese-era neighborhood in Panjim.", type: "evening" },
        { time: "8:00 PM", title: "Dinner at a local taverna", description: "Try Goan sausage chili fry and bebinca dessert.", type: "meal" },
      ],
    },
    {
      day: 3, theme: "South Goa Serenity",
      activities: [
        { time: "6:00 AM", title: "Dolphin watching boat trip", description: "Take a traditional fishing boat to spot dolphins at dawn.", type: "morning" },
        { time: "9:00 AM", title: "Palolem Beach", description: "Relax at one of India's most beautiful crescent-shaped beaches.", type: "morning" },
        { time: "12:00 PM", title: "Seafood lunch at Palolem", description: "Fresh catch of the day cooked Goan style at a beach restaurant.", type: "meal" },
        { time: "2:00 PM", title: "Butterfly Beach trek", description: "Short jungle trek to a secluded beach, accessible only by foot or boat.", type: "afternoon", eco_tip: "Carry your trash back, leave no trace" },
        { time: "5:00 PM", title: "Silent noise party prep", description: "Visit Cabo de Rama fort for dramatic cliff views of the Arabian Sea.", type: "evening" },
        { time: "7:00 PM", title: "Farewell dinner", description: "Enjoy prawn balchao and sol kadhi at a family homestay.", type: "meal" },
      ],
    },
  ],
}

const JAIPUR_ITINERARY: DestinationItinerary = {
  highlights: ["Amber Fort", "Hawa Mahal", "Nahargarh Fort", "Jantar Mantar"],
  bestMonths: "Oct - Mar",
  localTransport: "Auto-rickshaw, city bus, cycle rickshaw in old city",
  days: [
    {
      day: 1, theme: "Royal Forts & Palaces",
      activities: [
        { time: "6:00 AM", title: "Sunrise at Nahargarh Fort", description: "Drive up to Nahargarh for breathtaking sunrise views over the Pink City.", type: "morning" },
        { time: "8:00 AM", title: "Breakfast at Tapri", description: "Famous chai and stuffed parathas at this iconic Jaipur cafe.", type: "meal" },
        { time: "10:00 AM", title: "Amber Fort", description: "Explore the magnificent fort-palace complex. Walk up instead of elephant rides.", type: "morning", eco_tip: "Avoid elephant rides - walk the beautiful cobbled path instead" },
        { time: "1:00 PM", title: "Rajasthani thali lunch", description: "Dal baati churma and gate ki sabzi at a local restaurant.", type: "meal" },
        { time: "3:00 PM", title: "Jal Mahal photo stop", description: "Visit the stunning Water Palace floating on Man Sagar Lake.", type: "afternoon" },
        { time: "4:30 PM", title: "Hawa Mahal", description: "See the iconic Palace of Winds with 953 small windows.", type: "afternoon" },
        { time: "6:30 PM", title: "Bazaar walk", description: "Walk through Johari Bazaar for traditional jewelry and textiles.", type: "evening" },
        { time: "8:00 PM", title: "Dinner at Chokhi Dhani", description: "Experience a Rajasthani village-themed dinner with folk performances.", type: "meal" },
      ],
    },
    {
      day: 2, theme: "Culture & Crafts",
      activities: [
        { time: "7:00 AM", title: "Morning walk at Central Park", description: "Jog or walk around the beautiful gardens and Jaipur flag monument.", type: "morning" },
        { time: "9:00 AM", title: "City Palace", description: "Explore the royal residence with its blend of Mughal and Rajasthani architecture.", type: "morning" },
        { time: "11:00 AM", title: "Jantar Mantar", description: "UNESCO-listed astronomical observation site with giant instruments.", type: "morning" },
        { time: "12:30 PM", title: "Lassi at Lassiwala", description: "Try the legendary fresh lassi at the original MI Road shop.", type: "meal" },
        { time: "2:00 PM", title: "Block printing workshop", description: "Learn traditional Rajasthani block printing from local artisans at Sanganer.", type: "afternoon", eco_tip: "Buy handmade textiles directly from artisan families" },
        { time: "5:00 PM", title: "Birla Mandir sunset", description: "Visit the white marble temple with spectacular sunset views.", type: "evening" },
        { time: "7:30 PM", title: "Street food walk", description: "Pyaaz kachori, mirchi vada, and kulfi at the old city street stalls.", type: "meal" },
      ],
    },
    {
      day: 3, theme: "Beyond the City",
      activities: [
        { time: "6:30 AM", title: "Sunrise hot air balloon ride", description: "Float above the Aravalli hills and forts (seasonal, book ahead).", type: "morning" },
        { time: "9:30 AM", title: "Galtaji Temple (Monkey Temple)", description: "Ancient temple complex in a narrow crevice of the Aravalli hills.", type: "morning" },
        { time: "12:00 PM", title: "Lunch at a heritage haveli", description: "Eat inside a restored haveli for an authentic royal dining experience.", type: "meal" },
        { time: "2:30 PM", title: "Anokhi Museum of Hand Printing", description: "Learn about Rajasthan's textile heritage and sustainable fashion.", type: "afternoon" },
        { time: "5:00 PM", title: "Jaigarh Fort cannon", description: "See the world's largest cannon on wheels at this hilltop fortress.", type: "evening" },
        { time: "7:00 PM", title: "Farewell rooftop dinner", description: "Dine on a rooftop with views of the illuminated Amber Fort.", type: "meal" },
      ],
    },
  ],
}

const MANALI_ITINERARY: DestinationItinerary = {
  highlights: ["Rohtang Pass", "Old Manali", "Solang Valley", "Jogini Falls"],
  bestMonths: "Mar - Jun, Sep - Nov",
  localTransport: "Local bus, shared taxi, walk or rent bicycle",
  days: [
    {
      day: 1, theme: "Old Manali & Temples",
      activities: [
        { time: "7:00 AM", title: "Wake up to mountain views", description: "Start with a chai on your balcony overlooking the Beas River valley.", type: "morning" },
        { time: "8:30 AM", title: "Breakfast at Lazy Dog Cafe", description: "Pancakes and fresh mountain honey in the heart of Old Manali.", type: "meal" },
        { time: "10:00 AM", title: "Hadimba Devi Temple", description: "Ancient wood and stone temple surrounded by a cedar forest.", type: "morning", eco_tip: "Walk through the forest trail instead of driving" },
        { time: "12:00 PM", title: "Manu Temple & Old Manali walk", description: "Explore the charming village streets and visit the sage Manu's shrine.", type: "morning" },
        { time: "1:30 PM", title: "Lunch at Johnson's Cafe", description: "Fresh trout fish and Himachali siddu in a garden setting.", type: "meal" },
        { time: "3:30 PM", title: "Jogini Falls trek", description: "A gentle 2km forest trek to a beautiful waterfall from Vashisht.", type: "afternoon" },
        { time: "6:00 PM", title: "Vashisht Hot Springs", description: "Soak in natural hot water springs at the ancient Vashisht temple.", type: "evening" },
        { time: "8:00 PM", title: "Dinner at The Corner House", description: "Cozy dinner with live acoustic music and mountain ambiance.", type: "meal" },
      ],
    },
    {
      day: 2, theme: "Adventure & Valleys",
      activities: [
        { time: "6:00 AM", title: "Sunrise at Beas Kund start point", description: "Early start for the mountain trek towards Beas Kund glacier.", type: "morning" },
        { time: "9:00 AM", title: "Solang Valley", description: "Paragliding, zorbing, or simply enjoy the panoramic mountain meadows.", type: "morning" },
        { time: "12:30 PM", title: "Maggi and chai at Solang", description: "The quintessential mountain snack at a hillside stall.", type: "meal" },
        { time: "2:00 PM", title: "Rohtang Pass drive", description: "Drive up to the 3,978m pass for snow and stunning Himalayan views.", type: "afternoon", eco_tip: "Share vehicles with other travelers to reduce emissions" },
        { time: "5:30 PM", title: "Manali Mall Road walk", description: "Stroll the bustling main street, shop for woolens and handicrafts.", type: "evening" },
        { time: "7:30 PM", title: "Himachali dinner", description: "Try local dham feast with rajma, rice, and madra at a family dhaba.", type: "meal" },
      ],
    },
    {
      day: 3, theme: "Riverside & Relaxation",
      activities: [
        { time: "7:00 AM", title: "River Beas morning walk", description: "Walk along the river listening to the mountain stream soundtrack.", type: "morning" },
        { time: "9:00 AM", title: "White water rafting", description: "Thrilling Grade II-III rapids on the Beas River.", type: "morning" },
        { time: "12:00 PM", title: "Lunch at a riverside dhaba", description: "Fresh trout and local veggies with views of the rushing Beas.", type: "meal" },
        { time: "2:00 PM", title: "Naggar Castle & Roerich Art Gallery", description: "Medieval stone castle turned heritage hotel, plus Russian artist's gallery.", type: "afternoon" },
        { time: "5:00 PM", title: "Sunset at Manali Sanctuary", description: "Spot Himalayan birds in this quiet nature reserve above Old Manali.", type: "evening", eco_tip: "Stay on marked trails to protect wildlife habitats" },
        { time: "7:30 PM", title: "Farewell bonfire dinner", description: "End the trip with a campfire dinner under the stars.", type: "meal" },
      ],
    },
  ],
}

const VARANASI_ITINERARY: DestinationItinerary = {
  highlights: ["Ganga Aarti", "Sarnath", "Kashi Vishwanath", "Morning boat ride"],
  bestMonths: "Oct - Mar",
  localTransport: "Cycle rickshaw, walking, boat rides",
  days: [
    {
      day: 1, theme: "Sacred Ghats & Rituals",
      activities: [
        { time: "5:00 AM", title: "Sunrise boat ride on the Ganges", description: "Witness the dawn breaking over the ancient ghats from a traditional rowboat.", type: "morning", eco_tip: "Choose hand-rowed boats over motorized ones" },
        { time: "7:30 AM", title: "Ghat walk & morning chai", description: "Walk from Assi Ghat to Dashashwamedh, watch morning rituals unfold.", type: "morning" },
        { time: "9:00 AM", title: "Kashi Vishwanath Temple", description: "Visit one of the holiest Hindu temples dedicated to Lord Shiva.", type: "morning" },
        { time: "11:00 AM", title: "Breakfast at Blue Lassi", description: "Famous handmade lassi in earthen pots, a Varanasi institution since 1925.", type: "meal" },
        { time: "1:00 PM", title: "Silk weaving workshop", description: "Watch artisans create Banarasi silk sarees on traditional handlooms.", type: "afternoon" },
        { time: "4:00 PM", title: "Ramnagar Fort", description: "18th-century fort and museum on the eastern bank of the Ganges.", type: "afternoon" },
        { time: "7:00 PM", title: "Ganga Aarti at Dashashwamedh Ghat", description: "Mesmerizing fire ritual with thousands of lamps on the riverbank.", type: "evening" },
        { time: "8:30 PM", title: "Street food dinner", description: "Tamatar chaat, kachori sabzi, and malaiyo dessert in the lanes.", type: "meal" },
      ],
    },
    {
      day: 2, theme: "Buddhism & Beyond",
      activities: [
        { time: "6:00 AM", title: "Morning yoga at the ghats", description: "Join a sunrise yoga session overlooking the river.", type: "morning" },
        { time: "8:30 AM", title: "Breakfast at Kashi Chat Bhandar", description: "Famous chaat and thandai in the old city lanes.", type: "meal" },
        { time: "10:00 AM", title: "Sarnath excursion", description: "Visit where Buddha gave his first sermon. See the Dhamek Stupa and museum.", type: "morning" },
        { time: "1:00 PM", title: "Lunch at a Buddhist monastery", description: "Simple, wholesome vegetarian meal at one of Sarnath's monasteries.", type: "meal", eco_tip: "Carry your own bag and bottle" },
        { time: "3:00 PM", title: "BHU campus & Bharat Kala Bhavan", description: "Walk through the beautiful Banaras Hindu University and visit the art museum.", type: "afternoon" },
        { time: "6:00 PM", title: "Sunset from Assi Ghat", description: "Quiet evening at the southernmost ghat with chai and live classical music.", type: "evening" },
        { time: "8:00 PM", title: "Farewell dinner", description: "Banarasi thali with baati chokha, puri sabzi, and rabri at a heritage restaurant.", type: "meal" },
      ],
    },
  ],
}

const MUMBAI_ITINERARY: DestinationItinerary = {
  highlights: ["Gateway of India", "Marine Drive", "Elephanta Caves", "Dhobi Ghat"],
  bestMonths: "Nov - Feb",
  localTransport: "Local trains, BEST buses, walking",
  days: [
    {
      day: 1, theme: "Iconic Mumbai",
      activities: [
        { time: "6:00 AM", title: "Sunrise at Marine Drive", description: "Walk along the Queen's Necklace as the city wakes up.", type: "morning" },
        { time: "8:00 AM", title: "Irani cafe breakfast", description: "Bun maska and chai at the legendary Kyani & Co or Yazdani Bakery.", type: "meal" },
        { time: "10:00 AM", title: "Gateway of India", description: "The iconic arch monument built during the British Raj era.", type: "morning" },
        { time: "11:30 AM", title: "Elephanta Caves boat trip", description: "Ferry ride to the UNESCO World Heritage cave temples.", type: "morning", eco_tip: "Use the government ferry instead of private speedboats" },
        { time: "2:00 PM", title: "Lunch at Leopold Cafe", description: "Historic cafe featured in 'Shantaram', serving since 1871.", type: "meal" },
        { time: "4:00 PM", title: "Crawford Market & Dhobi Ghat", description: "Visit the bustling market and the world's largest open-air laundry.", type: "afternoon" },
        { time: "6:30 PM", title: "Sunset at Worli Sea Face", description: "Watch the sun set behind the Bandra-Worli Sea Link.", type: "evening" },
        { time: "8:00 PM", title: "Street food at Mohammad Ali Road", description: "Seekh kebabs, nihari, and malpua in the food lane.", type: "meal" },
      ],
    },
    {
      day: 2, theme: "Local Mumbai Life",
      activities: [
        { time: "7:00 AM", title: "Dabbawalas at Churchgate", description: "Watch Mumbai's legendary lunchbox delivery system in action.", type: "morning" },
        { time: "9:00 AM", title: "Chhatrapati Shivaji Terminus", description: "Marvel at this UNESCO-listed Victorian Gothic railway station.", type: "morning" },
        { time: "10:30 AM", title: "Kala Ghoda art district walk", description: "Street art, galleries, and indie bookshops in Mumbai's cultural heart.", type: "morning" },
        { time: "1:00 PM", title: "Lunch at a Parsi cafe", description: "Dhansak and berry pulao at Jimmy Boy or Britannia.", type: "meal" },
        { time: "3:00 PM", title: "Dharavi creative walk", description: "Guided walking tour of the vibrant community and its recycling industry.", type: "afternoon", eco_tip: "Book through ethical tour operators that give back to the community" },
        { time: "6:00 PM", title: "Bandra Bandstand & Carter Road", description: "Walk along the seaside promenade, see SRK's Mannat, enjoy the vibe.", type: "evening" },
        { time: "8:00 PM", title: "Farewell dinner", description: "Vada pav, pav bhaji, and sev puri at Juhu Beach food stalls.", type: "meal" },
      ],
    },
  ],
}

function generateGenericItinerary(name: string, days: number): DestinationItinerary {
  const templates: DayPlan[] = []
  for (let d = 1; d <= Math.min(days, 3); d++) {
    templates.push({
      day: d,
      theme: d === 1 ? "Arrival & Exploration" : d === 2 ? "Deep Dive & Culture" : "Nature & Farewell",
      activities: [
        { time: "6:30 AM", title: `Morning walk in ${name}`, description: `Start your day exploring the local neighborhood and soaking in the atmosphere.`, type: "morning" },
        { time: "8:00 AM", title: "Local breakfast", description: "Enjoy authentic regional breakfast at a popular local spot.", type: "meal" },
        { time: "10:00 AM", title: `Visit ${name}'s top attraction`, description: "Explore the most popular landmark and learn about local history.", type: "morning", eco_tip: "Walk or cycle instead of hiring private transport" },
        { time: "1:00 PM", title: "Regional cuisine lunch", description: "Try the signature local dish at a family-run restaurant.", type: "meal" },
        { time: "3:00 PM", title: "Cultural experience", description: "Visit local artisan workshops, temples, or nature spots.", type: "afternoon" },
        { time: "6:00 PM", title: "Sunset & evening stroll", description: "Find the best sunset viewpoint and walk through the evening markets.", type: "evening" },
        { time: "8:00 PM", title: "Dinner", description: "End the day with local street food or a heritage restaurant.", type: "meal" },
      ],
    })
  }
  return {
    highlights: [`${name} Heritage Sites`, "Local Markets", "Nature Trails", "Regional Cuisine"],
    bestMonths: "Oct - Mar",
    localTransport: "Local bus, auto-rickshaw, walking",
    days: templates,
  }
}

export const DESTINATION_ITINERARIES: Record<string, DestinationItinerary> = {
  Goa: GOA_ITINERARY,
  Jaipur: JAIPUR_ITINERARY,
  Manali: MANALI_ITINERARY,
  Varanasi: VARANASI_ITINERARY,
  Mumbai: MUMBAI_ITINERARY,
}

export function getItinerary(destination: string, days: number): DestinationItinerary {
  const specific = DESTINATION_ITINERARIES[destination]
  if (specific) return specific
  return generateGenericItinerary(destination, days)
}
