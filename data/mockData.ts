import { Car, Stat } from '../types';

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
    id: 'rev-roads',
    category: 'SOLUTIONS',
    title: 'Revolutionizing Roads: Future-Ready Electric Cars Paving the Sustainable Path',
    excerpt: 'Explore the cutting-edge world of carbon-neutral electric vehicles, setting new benchmarks for eco-friendly driving experiences.',
    date: 'OCT 24, 2024',
    readTime: '6 MIN READ',
    author: {
      name: 'Julian Vane',
      role: 'Automotive Analyst',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'
    },
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200',
    content: `The automotive landscape is undergoing a tectonic shift. As we transition away from internal combustion, the definition of performance is being rewritten in volts and amps. At Lumina Motors, we've observed that the modern enthusiast no longer views electric mobility as a compromise, but as a superior mechanical evolution.

    The current generation of electric hypercars utilizes tri-motor and quad-motor configurations to achieve torque vectoring capabilities that were previously impossible. This allows for cornering precision that feels almost telepathic. Furthermore, the integration of solid-state battery technology promises to eliminate range anxiety while drastically reducing vehicle weight.

    Our fleet's recent additions, like the Apex Nebula GT, exemplify this new era. It’s not just about the 0-60 sprint; it's about the silent, relentless surge of power that defines the future of luxury travel.`
  },
  {
    id: 'charging-ahead',
    category: 'SOLUTIONS',
    title: 'Charging Ahead: The Power Play of Next-Gen Electric Car Batteries',
    excerpt: 'Uncover the secrets behind the energy revolution in electric cars, exploring advanced battery technologies driving efficiency and sustainability.',
    date: 'NOV 12, 2024',
    readTime: '5 MIN READ',
    author: {
      name: 'Elena Rossi',
      role: 'Tech Correspondent',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200'
    },
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=1200',
    content: `Energy density is the holy grail of the modern automotive engineer. While lithium-ion has served us well, the industry is looking toward the next frontier. Silicon-anode batteries and graphene-enhanced cooling systems are now moving from the laboratory to the production line.

    These advancements mean faster charging cycles—think 10% to 80% in under eight minutes—and significantly longer operational lifespans. For the luxury rental market, this translates to maximum uptime and a seamless experience for the client.

    At Lumina, we are partnering with leading energy providers to ensure our charging infrastructure matches the high-speed requirements of our fleet. The future is fast, clean, and incredibly powerful.`
  },
  {
    id: 'beyond-carbon',
    category: 'ENERGY',
    title: 'Beyond Carbon: The Environmental Impact of Electric Cars Explained',
    excerpt: 'Delve into the ecological footprint of electric cars, dissecting their impact on climate change and how they contribute to a cleaner planet.',
    date: 'DEC 05, 2024',
    readTime: '8 MIN READ',
    author: {
      name: 'Marcus Thorne',
      role: 'Sustainability Expert',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
    },
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=1200',
    content: `The conversation around EVs often centers on tailpipe emissions, but the true impact lies in the lifecycle analysis. From raw material extraction to end-of-life battery recycling, the industry is striving for a "circular economy" model.

    Lumina Motors is committed to carbon neutrality not just on the road, but throughout our logistics chain. We prioritize assets from manufacturers who utilize renewable energy in their production facilities and implement ethical sourcing for precious metals.

    Driving a high-performance EV is a statement of intent—a choice to enjoy the pinnacle of human engineering without the environmental legacy of the past. It is luxury with a conscience.`
  }
];

export const CARS: Car[] = [
  {
    id: '1',
    make: 'Apex',
    model: 'Nebula GT',
    year: 2024,
    price: 185000,
    mileage: 120,
    transmission: 'Automatic',
    fuelType: 'Electric',
    bodyType: 'Coupe',
    engine: 'Tri-Motor Electric',
    hp: 1020,
    acceleration: '2.1s',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1603584173870-7f3ca935532d?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Autopilot Vision', 'Ceramic Brakes', 'Active Aero', '22" Forged Wheels'],
    description: 'The Nebula GT redefines electric performance with a tri-motor configuration capable of staggering acceleration and precision handling.',
    status: 'Available'
  },
  {
    id: '2',
    make: 'Lumina',
    model: 'Horizon S',
    year: 2024,
    price: 98000,
    mileage: 0,
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    bodyType: 'Sedan',
    engine: '3.0L V6 Twin-Turbo Hybrid',
    hp: 550,
    acceleration: '3.8s',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Panoramic Glass Roof', 'Burmester Sound', 'Night Vision', 'Soft-Close Doors'],
    description: 'A perfect blend of luxury and efficiency. The Horizon S offers unparalleled comfort for the discerning executive.',
    status: 'Available'
  },
  {
    id: '3',
    make: 'Titan',
    model: 'Obsidian XR',
    year: 2023,
    price: 125000,
    mileage: 5400,
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    bodyType: 'SUV',
    engine: '4.4L V8 Biturbo',
    hp: 625,
    acceleration: '3.2s',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Off-road Package', 'Towing Hitch', 'Executive Seating', 'Laser Headlights'],
    description: 'Dominance on every terrain. The Obsidian XR combines the utility of an SUV with the soul of a supercar.',
    status: 'Reserved'
  },
  {
    id: '4',
    make: 'Zenith',
    model: 'Veloce 12',
    year: 2025,
    price: 345000,
    mileage: 0,
    transmission: 'Manual',
    fuelType: 'Gasoline',
    bodyType: 'Coupe',
    engine: '6.5L V12 Naturally Aspirated',
    hp: 830,
    acceleration: '2.8s',
    image: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Titanium Exhaust', 'Carbon Fiber Monocoque', 'Racing Seats', 'Telemetry System'],
    description: 'The last of its kind. A raw, emotional V12 masterpiece built for the true driving enthusiast.',
    status: 'Available'
  },
  {
    id: '5',
    make: 'Specter',
    model: 'Ghost Rider',
    year: 2024,
    price: 210000,
    mileage: 450,
    transmission: 'Automatic',
    fuelType: 'Electric',
    bodyType: 'Sedan',
    engine: 'Dual-Motor Performance',
    hp: 760,
    acceleration: '2.6s',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1200',
    gallery: [],
    features: ['Stealth Mode', 'Ghost Suspension', 'AI Navigator'],
    description: 'Silent but deadly. The Ghost Rider combines phantom-like silence with brutal electric torque.',
    status: 'Available'
  },
  {
    id: '6',
    make: 'Vanguard',
    model: 'Storm XT',
    year: 2024,
    price: 155000,
    mileage: 1200,
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    bodyType: 'SUV',
    engine: '5.0L Supercharged V8',
    hp: 575,
    acceleration: '4.1s',
    image: 'https://images.unsplash.com/photo-1520105072000-f44fc083e50b?auto=format&fit=crop&q=80&w=1200',
    gallery: [],
    features: ['Adaptive Terrain Response', 'Luxury Tech Pack'],
    description: 'Command respect on the open road with the Storm XT, a rugged yet refined beast.',
    status: 'Available'
  },
  {
    id: '7',
    make: 'Elysian',
    model: 'Aurora',
    year: 2025,
    price: 420000,
    mileage: 10,
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    bodyType: 'Convertible',
    engine: 'V10 Hybrid Powerplant',
    hp: 950,
    acceleration: '2.4s',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200',
    gallery: [],
    features: ['Retractable Glass Roof', 'Holographic Display'],
    description: 'A masterpiece of open-top engineering, bringing you closer to the sky and the speed.',
    status: 'Available'
  },
  {
    id: '8',
    make: 'Nova',
    model: 'Quasar',
    year: 2024,
    price: 285000,
    mileage: 800,
    transmission: 'Automatic',
    fuelType: 'Electric',
    bodyType: 'Coupe',
    engine: 'Quad-Motor Matrix',
    hp: 1200,
    acceleration: '1.9s',
    image: 'https://images.unsplash.com/photo-1603584173870-7f3ca935532d?auto=format&fit=crop&q=80&w=1200',
    gallery: [],
    features: ['Torque Vectoring', 'Carbon-Ceramic Braking'],
    description: 'Pushing the boundaries of physics, the Quasar is light-years ahead of the competition.',
    status: 'Available'
  }
];

export const STATS: Stat[] = [
  { label: 'Cars Sold', value: 1250 },
  { label: 'Happy Clients', value: 980 },
  { label: 'Years Experience', value: 15 },
  { label: 'Awards Won', value: 24 }
];