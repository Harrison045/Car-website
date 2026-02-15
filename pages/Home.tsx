import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  MapPin, 
  Calendar, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  ArrowUpRight, 
  Zap, 
  Wind, 
  Crosshair, 
  Cpu,
  ChevronDown,
  Key,
  Shield,
  CreditCard,
  HelpCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { CARS, BLOGS } from '../data/mockData';

const TESTIMONIALS = [
  {
    quote: "The most seamless acquisition experience I've had in a decade. Lumina doesn't just sell cars; they curate icons that define your legacy.",
    author: "Marcus Thorne",
    role: "Venture Capitalist",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
  },
  {
    quote: "Their attention to mechanical precision and aesthetic detail is unparalleled. A true masterclass in the philosophy of luxury mobility.",
    author: "Elena Rossi",
    role: "International Architect",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
  },
  {
    quote: "Exceptional concierge service. From the first inquiry to the final delivery, every touchpoint was handled with pure, professional perfection.",
    author: "Julian Vane",
    role: "Automotive Collector",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
  }
];

const FAQ_CATEGORIES = [
  {
    title: "Acquisition & Booking",
    icon: <Key size={18} />,
    questions: [
      { q: "What is the minimum operator age?", a: "Lumina assets require the operator to be at least 25 years of age. For specific Tier-1 hypercars, the minimum age is 30, supplemented by a mandatory safety induction." },
      { q: "Can I request delivery to a private hangar?", a: "Absolute portability is our standard. We provide white-glove delivery to private airfields, yacht clubs, and residential estates globally." },
      { q: "Is there a maximum mileage limit?", a: "Standard daily allocations include 150 miles. Extended mileage packages can be customized during the initial booking sequence." }
    ]
  },
  {
    title: "Security & Insurance",
    icon: <Shield size={18} />,
    questions: [
      { q: "What level of coverage is provided?", a: "Every asset is secured with comprehensive elite-tier insurance. A security hold is required via Lumina Select Vault, which is released immediately upon asset reintegration." },
      { q: "How does biometric access work?", a: "Our fleet uses encrypted biometric tokens. You will receive a secure digital key linked to your identity for the duration of the possession cycle." }
    ]
  }
];

const Home: React.FC = () => {
  const [currentHeroCarIdx, setCurrentHeroCarIdx] = useState(0);
  const [currentTestimonialIdx, setCurrentTestimonialIdx] = useState(0);
  const [currentOfferIdx, setCurrentOfferIdx] = useState(0);
  const [activeFaqIdx, setActiveFaqIdx] = useState<number | null>(0);
  
  // Carousel State for Seamless Merry-Go-Round
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isResetting, setIsResetting] = useState(false);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  
  // Video State
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isHeroHovered, setIsHeroHovered] = useState(false);

  // We double the cars for the seamless loop
  const carouselCars = [...CARS, ...CARS];

  const OFFERS = CARS.map(car => ({
    id: car.id,
    make: car.make,
    model: car.model,
    price: Math.round(car.price / 400),
    image: car.image
  }));

  // Standard Rotations
  useEffect(() => {
    const heroTimer = setInterval(() => setCurrentHeroCarIdx((prev) => (prev + 1) % CARS.length), 8000);
    const testimonialTimer = setInterval(() => setCurrentTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS.length), 6000);
    const offerTimer = setInterval(() => setCurrentOfferIdx((prev) => (prev + 1) % OFFERS.length), 60000);

    return () => {
      clearInterval(heroTimer);
      clearInterval(testimonialTimer);
      clearInterval(offerTimer);
    };
  }, [OFFERS.length]);

  // Separate Effect for Carousel to handle Pause on Hover
  useEffect(() => {
    let carouselTimer: any;

    if (!isCarouselPaused) {
      carouselTimer = setInterval(() => {
        setIsResetting(false);
        setCarouselIndex((prev) => prev + 1);
      }, 5000);
    }

    return () => {
      if (carouselTimer) clearInterval(carouselTimer);
    };
  }, [isCarouselPaused]);

  const handleAnimationComplete = () => {
    if (carouselIndex >= CARS.length) {
      setIsResetting(true);
      setCarouselIndex(0);
    }
  };

  const toggleVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const currentHeroCar = CARS[currentHeroCarIdx];
  const currentTestimonial = TESTIMONIALS[currentTestimonialIdx];
  const currentOffer = OFFERS[currentOfferIdx];

  return (
    <div className="bg-white">
      {/* 1. Hero Section */}
      <section 
        className="relative h-[95vh] w-full overflow-hidden bg-[#0a0a0a]"
        onMouseEnter={() => setIsHeroHovered(true)}
        onMouseLeave={() => setIsHeroHovered(false)}
      >
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-60 grayscale-[0.2]"
            poster="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2400"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-luxury-car-driving-on-the-highway-at-sunset-34537-large.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
        </div>

        <AnimatePresence>
          {isHeroHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
            >
              <motion.button
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                onClick={toggleVideo}
                className="w-20 h-20 rounded-full glass border border-white/20 flex items-center justify-center text-white pointer-events-auto hover:bg-white/10 transition-colors"
                aria-label={isVideoPlaying ? "Pause Video" : "Play Video"}
              >
                {isVideoPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative z-10 h-full max-w-[1600px] mx-auto px-8 flex flex-col justify-center pb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-white text-4xl md:text-[5rem] font-display font-bold uppercase tracking-tighter leading-[1.1] mb-8 max-w-3xl">
              Luxury car <br /> purchase in Italy
            </h1>
            <Link to="/inventory" className="inline-flex items-center gap-4 px-10 py-5 bg-[#C59B6D] text-white rounded-full font-bold uppercase text-[10px] tracking-widest hover:bg-[#b38a5e] transition-all">
              Rent Now
            </Link>
          </motion.div>

          <div className="absolute top-32 right-8 hidden lg:block h-72">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentHeroCar.id}
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -20 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="glass-light p-5 rounded-[2rem] w-72 shadow-2xl relative overflow-hidden"
              >
                <Link to={`/car/${currentHeroCar.id}`}>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-base text-black">
                      ${Math.round(currentHeroCar.price / 300).toLocaleString()}/day
                    </span>
                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:scale-110 transition-transform">
                      <ArrowRight size={14} />
                    </div>
                  </div>
                  <div className="h-32 mb-3 overflow-hidden rounded-xl">
                    <img 
                      src={currentHeroCar.image} 
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
                      alt={currentHeroCar.model} 
                    />
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-black/80">{currentHeroCar.make}</p>
                      <p className="text-[12px] font-display font-bold uppercase tracking-tight text-black">{currentHeroCar.model}</p>
                    </div>
                    <div className="flex gap-1">
                      {CARS.map((_, i) => (
                        <div 
                          key={i} 
                          className={`w-1 h-1 rounded-full transition-all duration-300 ${i === currentHeroCarIdx ? 'w-3 bg-[#C59B6D]' : 'bg-black/10'}`} 
                        />
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Booking Bar */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-[1200px] px-8 z-20">
          <div className="bg-white rounded-full p-1.5 flex flex-col lg:flex-row items-center shadow-2xl border border-black/5 overflow-hidden">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-4 w-full">
              <div className="px-5 py-3 border-r border-black/5 hover:bg-neutral-50 transition-colors cursor-pointer group">
                <p className="text-[7px] font-black uppercase tracking-widest text-black/30 mb-0.5 group-hover:text-[#C59B6D]">Pick Up Address</p>
                <div className="flex items-center gap-2">
                  <MapPin size={10} className="text-black/20" />
                  <span className="text-[10px] font-bold uppercase tracking-tight text-black">Milan, Airport...</span>
                </div>
              </div>
              <div className="px-5 py-3 border-r border-black/5 hover:bg-neutral-50 transition-colors cursor-pointer group">
                <p className="text-[7px] font-black uppercase tracking-widest text-black/30 mb-0.5 group-hover:text-[#C59B6D]">Drop Off Address</p>
                <div className="flex items-center gap-2">
                  <MapPin size={10} className="text-black/20" />
                  <span className="text-[10px] font-bold uppercase tracking-tight text-black">Distance, Hourly...</span>
                </div>
              </div>
              <div className="px-5 py-3 border-r border-black/5 hover:bg-neutral-50 transition-colors cursor-pointer group">
                <p className="text-[7px] font-black uppercase tracking-widest text-black/30 mb-0.5 group-hover:text-[#C59B6D]">Pick Up Date</p>
                <div className="flex items-center gap-2">
                  <Calendar size={10} className="text-black/20" />
                  <span className="text-[10px] font-bold uppercase tracking-tight text-black">APR 19, 2024</span>
                </div>
              </div>
              <div className="px-5 py-3 hover:bg-neutral-50 transition-colors cursor-pointer group">
                <p className="text-[7px] font-black uppercase tracking-widest text-black/30 mb-0.5 group-hover:text-[#C59B6D]">Pick Up Time</p>
                <div className="flex items-center gap-2">
                  <Clock size={10} className="text-black/20" />
                  <span className="text-[10px] font-bold uppercase tracking-tight text-black">10:00 AM</span>
                </div>
              </div>
            </div>
            <button className="bg-[#E9C46A] hover:bg-[#dfba5d] text-white px-8 py-4 rounded-full flex items-center gap-3 transition-all lg:w-auto w-full justify-center">
              <Play size={12} fill="white" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em]">Book Now</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. About Us Section */}
      <section className="py-40 max-w-[1600px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-4 lg:pt-8">
            <h2 className="text-5xl md:text-6xl font-display font-bold uppercase tracking-tighter mb-12 text-black leading-none italic">About Us</h2>
            <div className="space-y-10 max-w-sm">
              <p className="text-[13px] text-black/50 leading-relaxed font-medium">
                Established with a vision to redefine luxury mobility, Lumina Motors provides an unparalleled fleet of precision-engineered assets. Our legacy is built on the pursuit of automotive excellence.
              </p>
              <p className="text-[13px] text-black/50 leading-relaxed font-medium">
                We curate only the finest masterpieces, ensuring every mile driven reflects the pinnacle of human engineering.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-4">
            <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.6 }} className="overflow-hidden rounded-[2.5rem] shadow-2xl lg:h-[600px]">
              <img src="https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110" alt="Main Gallery Car" />
            </motion.div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-[#1A1A1A] text-white rounded-[2.5rem] flex flex-col justify-center items-center text-center shadow-xl h-[150px]">
              <span className="text-4xl lg:text-5xl font-display font-bold tracking-tighter italic">+15 years</span>
              <span className="text-[9px] uppercase font-bold tracking-[0.4em] opacity-40 mt-1">Experience</span>
            </div>
            
            <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.6 }} className="overflow-hidden rounded-[2.5rem] shadow-2xl h-[436px]">
              <img src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale transition-all duration-1000 hover:grayscale-0 hover:scale-110" alt="Secondary Gallery Car" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Best Offer Section */}
      <section className="bg-[#EBE9E4] overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[700px]">
          <div className="bg-[#3D4C44] text-white p-20 flex-1 flex flex-col justify-center relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div key={currentOffer.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.8 }}>
                <span className="text-[10px] uppercase font-bold tracking-[0.6em] opacity-40 mb-12 block text-white/50">Limited Asset Release</span>
                <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter leading-none mb-10 text-white italic">Best <br /> offer</h2>
                <div className="mb-14">
                  <h3 className="text-2xl font-display font-bold uppercase tracking-tighter mb-2 text-white">{currentOffer.make} {currentOffer.model}</h3>
                  <p className="text-lg opacity-60">for ${currentOffer.price}/day</p>
                </div>
                <Link to={`/car/${currentOffer.id}`} className="inline-block w-48 py-5 bg-[#C59B6D] text-white rounded-full text-center font-bold uppercase text-[10px] tracking-widest hover:bg-opacity-90 transition-all shadow-xl">Rent Now</Link>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex-[1.5] relative flex items-center justify-center p-12 bg-white overflow-hidden">
             <div className="absolute inset-0 bg-neutral-100/50" />
             <AnimatePresence mode="wait">
               <motion.img key={currentOffer.id} initial={{ opacity: 0, scale: 0.9, x: 50 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 1.1, x: -50 }} transition={{ duration: 1, ease: "circOut" }} src={currentOffer.image} className="relative z-10 w-full max-w-4xl object-contain car-shadow" alt={`${currentOffer.make} Offer`} />
             </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 4. Vehicles Section */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-20 gap-8">
            <h2 className="text-7xl font-display font-bold uppercase tracking-tight text-black italic">Vehicles</h2>
            <p className="text-[13px] text-black/30 max-w-sm leading-relaxed font-medium">
              Curating tomorrow's icons through the lens of pure engineering. Hover to pause and inspect technical DNA.
            </p>
          </div>

          <div 
            className="relative"
            onMouseEnter={() => setIsCarouselPaused(true)}
            onMouseLeave={() => setIsCarouselPaused(false)}
          >
            <motion.div 
              animate={{ x: `-${carouselIndex * (100 / 4)}%` }}
              transition={isResetting ? { duration: 0 } : { duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
              onAnimationComplete={handleAnimationComplete}
              className="flex gap-4"
            >
              {carouselCars.map((car, idx) => (
                <div key={`${car.id}-${idx}`} className="flex-shrink-0 w-full md:w-[calc(50%-8px)] lg:w-[calc(25%-12px)]">
                  <Link to={`/car/${car.id}`}>
                    <motion.div 
                      whileHover="hover"
                      initial="initial"
                      className="relative aspect-[3/4] overflow-hidden group rounded-2xl cursor-pointer bg-neutral-100"
                    >
                      <motion.img 
                        src={car.image} 
                        variants={{ initial: { scale: 1 }, hover: { scale: 1.05 } }}
                        transition={{ duration: 0.8 }}
                        className="w-full h-full object-cover transition-all grayscale-[0.3] group-hover:grayscale-0" 
                        alt={car.model} 
                      />
                      
                      <motion.div 
                        variants={{ initial: { opacity: 0 }, hover: { opacity: 1 } }}
                        className="absolute inset-0 z-10 flex flex-col justify-end pointer-events-none"
                      >
                         <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
                         
                         <motion.div 
                           variants={{ initial: { y: -100 }, hover: { y: 600 } }}
                           transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                           className="absolute top-0 inset-x-0 h-[1px] bg-white/40 shadow-[0_0_15px_rgba(255,255,255,0.6)] z-20"
                         />

                         <div className="relative z-30 p-10 w-full border-t border-white/10">
                            <div className="flex justify-between items-end mb-8 border-b border-white/5 pb-6">
                               <div>
                                  <div className="flex items-center gap-2 mb-2">
                                     <Cpu size={12} className="text-[#E9C46A]" />
                                     <span className="text-[8px] font-black uppercase tracking-[0.5em] text-white/50">Mechanical Profile</span>
                                  </div>
                                  <h4 className="text-3xl font-display font-bold text-white uppercase italic tracking-tighter leading-none">
                                     <span className="text-[10px] font-black opacity-40 block mb-1 not-italic tracking-[0.4em]">{car.year}</span>
                                     {car.make} <br /> {car.model}
                                  </h4>
                               </div>
                               <div className="text-right">
                                  <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/30 block mb-2">Asset Value</span>
                                  <p className="text-2xl font-black text-[#E9C46A] italic tracking-tighter leading-none">
                                     ${Math.round(car.price / 400).toLocaleString()}/D
                                  </p>
                               </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 mb-10">
                               {[
                                 { icon: Wind, label: 'Aero Coefficient', value: 88 + (idx % 12), unit: 'cD' },
                                 { icon: Crosshair, label: 'Tactical Grip', value: 94 - (idx % 8), unit: 'G' },
                                 { icon: Zap, label: 'Instant Power Delivery', value: 97 - (idx % 5), unit: 'kW' }
                               ].map((stat, sIdx) => (
                                 <div key={sIdx} className="w-full">
                                    <div className="flex justify-between text-[8px] uppercase font-black tracking-widest text-white/40 mb-3">
                                       <span className="flex items-center gap-2.5"><stat.icon size={12} /> {stat.label}</span>
                                       <span className="text-white font-bold">{stat.value}% <span className="text-white/20 ml-1 font-normal">({stat.unit})</span></span>
                                    </div>
                                    <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                                       <motion.div 
                                          variants={{ initial: { width: 0 }, hover: { width: `${stat.value}%` } }}
                                          transition={{ duration: 1.5, delay: 0.1 + (sIdx * 0.1), ease: "circOut" }}
                                          className="h-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]"
                                       />
                                    </div>
                                 </div>
                               ))}
                            </div>

                            <div className="flex items-center justify-center py-5 bg-white text-black rounded-full shadow-2xl transition-all hover:bg-[#E9C46A] hover:scale-[1.02] active:scale-[0.98]">
                               <span className="text-[10px] font-black uppercase tracking-[0.6em]">Initialize Command</span>
                            </div>
                         </div>
                      </motion.div>

                      <motion.div variants={{ initial: { opacity: 1 }, hover: { opacity: 0 } }} className="absolute inset-0 p-10 flex flex-col justify-between z-20">
                        <h3 className="text-4xl font-display font-bold leading-[0.9] tracking-tighter uppercase whitespace-pre-line italic text-white shadow-sm drop-shadow-md">
                          <span className="text-xs block mb-2 opacity-60 not-italic tracking-[0.5em] font-black">{car.year}</span>
                          {car.make} <br /> {car.model.split(' ')[0]}
                        </h3>
                        <div className="flex justify-end">
                          <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl bg-white text-black transition-transform hover:scale-110">
                            <ArrowUpRight size={24} strokeWidth={2.5} />
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  </Link>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex gap-4 mt-12 justify-end">
            <button 
              onClick={() => { setIsResetting(false); setCarouselIndex((prev) => prev - 1); }}
              className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all active:scale-90"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => { setIsResetting(false); setCarouselIndex((prev) => prev + 1); }}
              className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all active:scale-90"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* 5. Testimonials Section */}
      <section className="py-24 bg-[#0A0A0A] relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-8 relative z-10">
          <div className="flex flex-col items-center mb-16">
            <span className="text-[9px] font-black uppercase tracking-[0.6em] text-white/20 mb-4 italic">Client Feedback</span>
            <div className="w-px h-10 bg-gradient-to-b from-white/10 to-transparent" />
          </div>
          <div className="flex justify-center items-center h-[380px] relative">
            <AnimatePresence mode="wait">
              <motion.div key={currentTestimonialIdx} initial={{ opacity: 0, scale: 0.95, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 1.05, y: -15 }} transition={{ duration: 0.6 }} className="w-full max-w-2xl glass-dark border-white/5 p-10 md:p-14 rounded-[2.5rem] shadow-2xl text-center">
                <p className="text-lg md:text-2xl font-display font-bold uppercase tracking-tighter leading-snug mb-8 italic text-white/90">"{currentTestimonial.quote}"</p>
                <div className="flex flex-col items-center gap-4">
                  <img src={currentTestimonial.image} className="w-14 h-14 rounded-full object-cover grayscale" alt={currentTestimonial.author} />
                  <div>
                    <h5 className="text-[12px] font-black uppercase tracking-widest text-white">{currentTestimonial.author}</h5>
                    <p className="text-[8px] text-white/30 uppercase tracking-[0.3em]">{currentTestimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 5.5 FAQ Section (NEW) */}
      <section className="py-40 bg-white">
        <div className="max-w-[1000px] mx-auto px-8">
          <header className="mb-24 text-center">
            <span className="text-[10px] font-black uppercase tracking-[0.8em] text-black/20 mb-8 block">Knowledge Base</span>
            <h2 className="text-5xl md:text-7xl font-display font-black uppercase italic tracking-tighter leading-none mb-8">
              Asset <br /> <span className="text-black/10">Inquiry</span>
            </h2>
          </header>

          <div className="space-y-16">
            {FAQ_CATEGORIES.map((cat, catIdx) => (
              <div key={catIdx}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-2.5 bg-neutral-100 rounded-lg text-black/30">
                    {cat.icon}
                  </div>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.4em] italic">{cat.title}</h3>
                </div>
                
                <div className="space-y-3">
                  {cat.questions.map((item, qIdx) => {
                    const globalIdx = catIdx * 10 + qIdx;
                    const isOpen = activeFaqIdx === globalIdx;
                    
                    return (
                      <div 
                        key={qIdx} 
                        className={`rounded-[1.5rem] border transition-all duration-500 overflow-hidden ${isOpen ? 'bg-neutral-50 border-black/5' : 'bg-transparent border-transparent hover:bg-neutral-50/50'}`}
                      >
                        <button 
                          onClick={() => setActiveFaqIdx(isOpen ? null : globalIdx)}
                          className="w-full px-8 py-6 flex justify-between items-center text-left focus:outline-none"
                        >
                          <span className="text-[11px] font-black uppercase tracking-widest text-black/80">{item.q}</span>
                          <ChevronDown size={16} className={`transition-transform duration-500 ${isOpen ? 'rotate-180 text-black' : 'text-black/20'}`} />
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                            >
                              <div className="px-8 pb-8 pt-2">
                                <p className="text-[13px] text-black/50 font-medium leading-[1.6] tracking-wide">
                                  {item.a}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <Link to="/faq" className="inline-block text-[10px] font-black uppercase tracking-[0.3em] border-b-2 border-black pb-1.5 hover:border-black/30 transition-all">
              View Detailed FAQ
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Journal Section */}
      <section className="py-40 bg-white border-t border-black/5">
        <div className="max-w-[1600px] mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-20 gap-8">
            <h2 className="text-7xl font-display font-bold uppercase tracking-tight text-black italic">Journal</h2>
            <Link to="/blog" className="text-[11px] font-black uppercase tracking-[0.3em] border-b-2 border-black pb-1.5 hover:border-black/30 transition-all">Explore All Stories</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            {BLOGS.slice(0, 3).map((post, idx) => (
              <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="group cursor-pointer flex flex-col">
                <Link to={`/blog/${post.id}`}>
                  <div className="relative overflow-hidden aspect-[16/10] mb-8 rounded-lg shadow-sm">
                    <img src={post.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={post.title} />
                  </div>
                  <span className="text-[11px] font-bold text-black/40 uppercase tracking-[0.2em] mb-4">{post.category}</span>
                  <h4 className="text-[22px] font-bold text-black leading-tight mb-5 group-hover:text-black/70 transition-colors">{post.title}</h4>
                  <p className="text-[14px] text-black/50 leading-relaxed font-medium mb-8 line-clamp-3">{post.excerpt}</p>
                  <div className="mt-auto"><span className="inline-block text-[11px] font-black uppercase tracking-[0.2em] border-b-2 border-black pb-1.5">Read Article</span></div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Newsletter */}
      <section className="py-40 bg-neutral-50 text-center px-8">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-tighter mb-8 text-black italic">Subscribe and get 20% off <br /> your first rental.</h2>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="YOUR EMAIL..." className="flex-1 bg-white border border-black/10 rounded-full px-6 py-4 text-[10px] font-bold uppercase tracking-widest shadow-sm focus:outline-none" />
            <button className="bg-black text-white px-8 py-4 rounded-full text-[9px] font-bold uppercase tracking-[0.4em] hover:bg-neutral-800 transition-all">Submit</button>
          </form>
          <p className="mt-6 text-[8px] font-bold text-black/20 uppercase tracking-[0.3em]">Join 5,000+ performance enthusiasts</p>
        </div>
      </section>
    </div>
  );
};

export default Home;