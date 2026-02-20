import { Car, Stat } from "../types";

export interface BlogPost {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    image: string;
  };
}

export const BLOGS: BlogPost[] = [
  {
    id: "rev-roads",
    category: "SOLUTIONS",
    title:
      "Revolutionizing Roads: Future-Ready Electric Cars Paving the Sustainable Path",
    excerpt:
      "Explore the cutting-edge world of carbon-neutral electric vehicles, setting new benchmarks for eco-friendly driving experiences.",
    date: "OCT 24, 2024",
    readTime: "6 MIN READ",
    author: {
      name: "Julian Vane",
      role: "Automotive Analyst",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
    },
    image:
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200",
    content: `The automotive landscape is undergoing a tectonic shift. As we transition away from internal combustion, the definition of performance is being rewritten in volts and amps. At Lumina Motors, we've observed that the modern enthusiast no longer views electric mobility as a compromise, but as a superior mechanical evolution.

    The current generation of electric hypercars utilizes tri-motor and quad-motor configurations to achieve torque vectoring capabilities that were previously impossible. This allows for cornering precision that feels almost telepathic. Furthermore, the integration of solid-state battery technology promises to eliminate range anxiety while drastically reducing vehicle weight.

    Our fleet's recent additions, like the Apex Nebula GT, exemplify this new era. It’s not just about the 0-60 sprint; it's about the silent, relentless surge of power that defines the future of luxury travel.`,
  },
  {
    id: "charging-ahead",
    category: "SOLUTIONS",
    title: "Charging Ahead: The Power Play of Next-Gen Electric Car Batteries",
    excerpt:
      "Uncover the secrets behind the energy revolution in electric cars, exploring advanced battery technologies driving efficiency and sustainability.",
    date: "NOV 12, 2024",
    readTime: "5 MIN READ",
    author: {
      name: "Elena Rossi",
      role: "Tech Correspondent",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    },
    image:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=1200",
    content: `Energy density is the holy grail of the modern automotive engineer. While lithium-ion has served us well, the industry is looking toward the next frontier. Silicon-anode batteries and graphene-enhanced cooling systems are now moving from the laboratory to the production line.

    These advancements mean faster charging cycles—think 10% to 80% in under eight minutes—and significantly longer operational lifespans. For the luxury rental market, this translates to maximum uptime and a seamless experience for the client.

    At Lumina, we are partnering with leading energy providers to ensure our charging infrastructure matches the high-speed requirements of our fleet. The future is fast, clean, and incredibly powerful.`,
  },
  {
    id: "beyond-carbon",
    category: "ENERGY",
    title: "Beyond Carbon: The Environmental Impact of Electric Cars Explained",
    excerpt:
      "Delve into the ecological footprint of electric cars, dissecting their impact on climate change and how they contribute to a cleaner planet.",
    date: "DEC 05, 2024",
    readTime: "8 MIN READ",
    author: {
      name: "Marcus Thorne",
      role: "Sustainability Expert",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    },
    image:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=1200",
    content: `The conversation around EVs often centers on tailpipe emissions, but the true impact lies in the lifecycle analysis. From raw material extraction to end-of-life battery recycling, the industry is striving for a "circular economy" model.

    Lumina Motors is committed to carbon neutrality not just on the road, but throughout our logistics chain. We prioritize assets from manufacturers who utilize renewable energy in their production facilities and implement ethical sourcing for precious metals.

    Driving a high-performance EV is a statement of intent—a choice to enjoy the pinnacle of human engineering without the environmental legacy of the past. It is luxury with a conscience.`,
  },
];

export const CARS: Car[] = [
  {
    id: "1",
    make: "Porsche",
    model: "718 Cayman GT4 RS",
    year: 2024,
    price: 170100,
    mileage: 120,
    transmission: "Automatic",
    fuelType: "Gasoline",
    bodyType: "Coupe",
    engine: "4.0 L naturally aspirated flat-six",
    hp: 500,
    acceleration: "3.2s",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&q=80&w=1200",
    ],
    features: [
      "Sport-Focused Chassis",
      "Ceramic Composite Brakes",
      "Lightweight Aerodynamic Design",
      "PDK Dual-Clutch Automatic",
      "Rear-Axle Steering",
      "Sport Exhaust System",
    ],
    description:
      "The Porsche 718 Cayman GT4 RS is the ultimate evolution of Porsche’s mid-engine sports car philosophy before the 718 line transitions toward electrification. It pairs a high-revving 4.0 L flat-6 engine (closely related to the unit in the 911 GT3) with Porsche’s advanced PDK dual-clutch transmission for ultra-fast shifts and track-ready performance.",
    status: "Available",
  },
  {
    id: "2",
    make: "Lumina",
    model: "Horizon S",
    year: 2024,
    price: 98000,
    mileage: 0,
    transmission: "Automatic",
    fuelType: "Hybrid",
    bodyType: "Sedan",
    engine: "3.0L V6 Twin-Turbo Hybrid",
    hp: 550,
    acceleration: "3.8s",
    image:
      "https://images.unsplash.com/photo-1555212697-194d092e3b8f?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1555212697-194d092e3b8f?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80&w=1200",
    ],
    features: [
      "Panoramic Glass Roof",
      "Burmester Premium Sound System",
      "Night Vision Assist",
      "Soft-Close Doors",
      "Massaging Ventilated Seats",
      "Ambient Interior Lighting",
    ],
    description:
      "The Lumina Horizon S represents the pinnacle of executive luxury, combining sophisticated hybrid technology with unparalleled comfort. Its advanced 3.0L V6 twin-turbo hybrid powertrain delivers both impressive performance and remarkable efficiency, while the handcrafted interior provides sanctuary-like comfort for the discerning business professional.",
    status: "Available",
  },
  {
    id: "3",
    make: "Titan",
    model: "Obsidian XR",
    year: 2023,
    price: 125000,
    mileage: 5400,
    transmission: "Automatic",
    fuelType: "Gasoline",
    bodyType: "SUV",
    engine: "4.4L V8 Biturbo",
    hp: 625,
    acceleration: "3.2s",
    image:
      "https://images.unsplash.com/photo-1549399810-3e1667c8bc3a?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1549399810-3e1667c8bc3a?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80&w=1200",
    ],
    features: [
      "Advanced Off-road Package",
      "Heavy-Duty Towing Hitch",
      "Executive Seating Package",
      "Matrix LED Laser Headlights",
      "Air Suspension System",
      "360-Degree Camera System",
    ],
    description:
      "The Titan Obsidian XR commands attention on every terrain, blending rugged capability with uncompromising luxury. Its potent 4.4L V8 biturbo engine delivers supercar-rivaling performance while the advanced off-road package ensures dominance beyond paved roads. Inside, executive-grade amenities create an oasis of comfort.",
    status: "Reserved",
  },
  {
    id: "4",
    make: "Zenith",
    model: "Veloce 12",
    year: 2025,
    price: 345000,
    mileage: 0,
    transmission: "Manual",
    fuelType: "Gasoline",
    bodyType: "Coupe",
    engine: "6.5L V12 Naturally Aspirated",
    hp: 830,
    acceleration: "2.8s",
    image:
      "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200",
    ],
    features: [
      "Titanium High-Performance Exhaust",
      "Carbon Fiber Monocoque Chassis",
      "Carbon Fiber Racing Seats",
      "Advanced Telemetry System",
      "Push-Rod Suspension",
      "Carbon Ceramic Brakes",
    ],
    description:
      "The Zenith Veloce 12 represents the final chapter in the golden age of naturally aspirated V12 supercars. Its thundering 6.5L V12 engine produces an intoxicating 830 horsepower, delivered through a pure manual transmission for the ultimate driver connection. With a carbon fiber monocoque and racing-derived aerodynamics, this is the last of a dying breed—a raw, emotional masterpiece built for true driving purists.",
    status: "Available",
  },
  {
    id: "5",
    make: "Specter",
    model: "Ghost Rider",
    year: 2024,
    price: 210000,
    mileage: 450,
    transmission: "Automatic",
    fuelType: "Electric",
    bodyType: "Sedan",
    engine: "Dual-Motor Performance",
    hp: 760,
    acceleration: "2.6s",
    image:
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&q=80&w=1200",
    ],
    features: [
      "Stealth Mode Operation",
      "Adaptive Ghost Air Suspension",
      "AI-Powered Navigation System",
      "Ultra-Fast Charging Capability",
      "Biometric Vehicle Access",
      "Autonomous Driving Suite",
    ],
    description:
      "The Specter Ghost Rider redefines electric luxury with phantom-like silence and brutal instant torque. Its dual-motor performance system delivers 760 horsepower with zero emissions, while the advanced AI navigation and autonomous capabilities create an unprecedented driving experience. This is electric mobility elevated to an art form.",
    status: "Available",
  },
  {
    id: "6",
    make: "Vanguard",
    model: "Storm XT",
    year: 2024,
    price: 155000,
    mileage: 1200,
    transmission: "Automatic",
    fuelType: "Gasoline",
    bodyType: "SUV",
    engine: "5.0L Supercharged V8",
    hp: 575,
    acceleration: "4.1s",
    image:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1549399810-3e1667c8bc3a?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200",
    ],
    features: [
      "Adaptive Terrain Response System",
      "Luxury Technology Package",
      "Performance Sport Exhaust",
      "Electronic Limited-Slip Differential",
      "Adaptive Cruise Control",
      "Premium Audio System",
    ],
    description:
      "The Vanguard Storm XT commands respect on the open road as a rugged yet refined beast. Its supercharged 5.0L V8 engine produces 575 horsepower of pure American muscle, while the adaptive terrain response system ensures capability in any condition. This is performance SUV design elevated to an art form.",
    status: "Available",
  },
  {
    id: "7",
    make: "Elysian",
    model: "Aurora",
    year: 2025,
    price: 420000,
    mileage: 10,
    transmission: "Automatic",
    fuelType: "Hybrid",
    bodyType: "Convertible",
    engine: "V10 Hybrid Powerplant",
    hp: 950,
    acceleration: "2.4s",
    image:
      "https://images.unsplash.com/photo-1553412264-ad56f8d4f4c5?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1553412264-ad56f8d4f4c5?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1549399810-3e1667c8bc3a?auto=format&fit=crop&q=80&w=1200",
    ],
    features: [
      "Retractable Glass Roof",
      "Holographic Display System",
      "Active Aero Bodywork",
      "Neural Interface Control",
      "Self-Leveling Suspension",
      "Quantum Encryption Security",
    ],
    description:
      "The Elysian Aurora is a masterpiece of open-top engineering that brings you closer to both sky and speed. Its revolutionary V10 hybrid powerplant generates 950 horsepower while the retractable glass roof provides an unobstructed view of the stars. This is automotive poetry in motion—a symphony of power, beauty, and innovation.",
    status: "Available",
  },
  {
    id: "8",
    make: "Nova",
    model: "Quasar",
    year: 2024,
    price: 285000,
    mileage: 800,
    transmission: "Automatic",
    fuelType: "Electric",
    bodyType: "Coupe",
    engine: "Quad-Motor Matrix",
    hp: 1200,
    acceleration: "1.9s",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1553412264-ad56f8d4f4c5?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&q=80&w=1200",
    ],
    features: [
      "Advanced Torque Vectoring",
      "Carbon-Ceramic Braking System",
      "Quad-Motor Performance Matrix",
      "Battery Thermal Management",
      "Regenerative Braking Plus",
      "Over-the-Air Updates",
    ],
    description:
      "The Nova Quasar pushes the boundaries of automotive physics, light-years ahead of the competition. Its quad-motor matrix delivers 1200 horsepower with instantaneous torque distribution to each wheel, achieving a mind-bending 1.9-second 0-60 time. This isn't just electric performance—it's the future accelerated.",
    status: "Available",
  },
];

export const STATS: Stat[] = [
  { label: "Cars Sold", value: 1250 },
  { label: "Happy Clients", value: 980 },
  { label: "Years Experience", value: 15 },
  { label: "Awards Won", value: 24 },
];
