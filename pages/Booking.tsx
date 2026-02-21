import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  Clock,
  ShieldCheck,
  Car as CarIcon,
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  Plane,
  UserCheck,
  Zap,
  FileText,
  Activity,
  Download,
  MessageSquare,
  QrCode,
  ArrowUpRight,
  Info,
  CreditCard,
} from "lucide-react";
import { carService } from "../services/carService";
import { bookingService } from "../services/bookingService";
import { useAuth } from "../contexts/AuthContext";
import AuthModal from "../components/AuthModal";

const Booking: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { isAuthenticated, user } = useAuth();
  const preSelectedId = searchParams.get("carId");
  const [cars, setCars] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch cars from backend
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const fetchedCars = await carService.getAllCars();
        setCars(fetchedCars);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Update selected car when cars are loaded
  useEffect(() => {
    if (cars.length > 0) {
      const preSelectedCar = cars.find((c) => c.id === preSelectedId);
      setSelectedCar(preSelectedCar || cars[0]);
    }
  }, [cars, preSelectedId]);

  const [selectedCar, setSelectedCar] = useState(() => {
    const initialCar = cars.find((c) => c.id === preSelectedId);
    return initialCar || null;
  });
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [location, setLocation] = useState("Milan HQ");
  const [addons, setAddons] = useState<string[]>([]);
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success"
  >("idle");
  const [showAuthModal, setShowAuthModal] = useState(false);

  const addonOptions = [
    {
      id: "driver",
      name: "Private Chauffeur",
      price: 450,
      icon: UserCheck,
      desc: "Professional security-trained operator",
    },
    {
      id: "delivery",
      name: "Hangar Delivery",
      price: 200,
      icon: Plane,
      desc: "Direct asset positioning at your aircraft",
    },
    {
      id: "insurance",
      name: "Elite Protocol",
      price: 150,
      icon: ShieldCheck,
      desc: "Zero-deductible comprehensive coverage",
    },
  ];

  const duration = useMemo(() => {
    if (!pickupDate || !dropoffDate) return 1;
    const start = new Date(pickupDate);
    const end = new Date(dropoffDate);
    const diff = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
    );
    return diff > 0 ? diff : 1;
  }, [pickupDate, dropoffDate]);

  // Loading state and error handling after all hooks
  if (isLoading || !selectedCar) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white">
          {isLoading ? "Loading..." : "Please select a car"}
        </div>
      </div>
    );
  }

  const dailyRate =
    selectedCar?.rentPrice || Math.round((selectedCar?.price || 0) / 350);
  const addonsTotal = addons.reduce((acc, curr) => {
    const option = addonOptions.find((o) => o.id === curr);
    return acc + (option ? option.price : 0);
  }, 0);
  const totalCommitment = dailyRate * duration + addonsTotal * duration;

  const toggleAddon = (id: string) => {
    setAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    );
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !user) {
      setShowAuthModal(true);
      return;
    }

    if (!pickupDate || !dropoffDate) {
      alert("Please select both pickup and drop-off dates.");
      return;
    }

    setFormStatus("submitting");

    try {
      await bookingService.createBooking({
        carId: selectedCar.id,
        clientName: user.name,
        clientEmail: user.email,
        pickupDate,
        dropoffDate,
        location,
        addons,
        totalPrice: totalCommitment,
      });

      window.scrollTo({ top: 0, behavior: "smooth" });
      setFormStatus("success");
    } catch (error) {
      console.error("Booking Protocol Breach:", error);
      setFormStatus("idle");
      alert("Booking synchronization failed. Please attempt protocol again.");
    }
  };

  const handleSaveManifest = () => {
    const data = `
LUMINA ASSET MANIFEST
Protocol ID: #LU-${selectedCar.id.padStart(4, "0")}-ALPHA
--------------------------------------------------
ASSET: ${selectedCar.make} ${selectedCar.model} (${selectedCar.year})
ENGINE: ${selectedCar.engine}
POWER: ${selectedCar.hp} HP
ACCEL: ${selectedCar.acceleration}

LOGISTICS:
Hub: ${location}
Cycle: ${duration} Days
Activation: ${pickupDate || "Pending Verification"}

CONFIGURATION:
${addons.length > 0 ? addons.map((id) => `- ${addonOptions.find((o) => o.id === id)?.name}`).join("\n") : "No Add-ons"}

FINANCIALS:
Total Commitment: $${totalCommitment.toLocaleString()}
--------------------------------------------------
VERIFIED BY LUMINA SELECT PROTOCOL
    `;
    const blob = new Blob([data], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Lumina_Manifest_${selectedCar.id}.txt`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen pt-48 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {formStatus !== "success" ? (
            <motion.div
              key="booking-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                to="/inventory"
                className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] mb-16 text-white/30 hover:text-white transition-all group"
              >
                <ArrowLeft
                  size={16}
                  className="group-hover:-translate-x-2 transition-transform"
                />{" "}
                Back to Fleet
              </Link>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                <div className="lg:col-span-8 space-y-20">
                  <header>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-[10px] font-black uppercase tracking-[0.8em] text-[#C59B6D] mb-6 block italic"
                    >
                      Secure Possession
                    </motion.span>
                    <h1 className="text-6xl md:text-8xl font-display font-black uppercase italic tracking-tighter leading-none mb-10">
                      Initialize <br />{" "}
                      <span className="text-white/20">Reservation</span>
                    </h1>
                  </header>

                  <section className="space-y-8">
                    <h2 className="text-xs font-black uppercase tracking-[0.5em] italic flex items-center gap-4">
                      <CarIcon size={18} className="text-[#C59B6D]" /> 01.
                      Select Asset
                    </h2>
                    <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar snap-x">
                      {cars.map((car) => (
                        <button
                          key={car.id}
                          onClick={() => setSelectedCar(car)}
                          className={`flex-shrink-0 w-64 snap-start text-left group transition-all ${selectedCar.id === car.id ? "opacity-100" : "opacity-40 grayscale hover:opacity-70"} ${car.status === "Reserved" ? "cursor-not-allowed" : ""}`}
                        >
                          <div
                            className={`aspect-[16/10] rounded-[2rem] overflow-hidden mb-4 border-2 transition-all relative ${selectedCar.id === car.id ? "border-[#C59B6D]" : "border-transparent"}`}
                          >
                            {car.status === "Reserved" && (
                              <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10 backdrop-blur-[2px]">
                                <span className="bg-amber-500 text-black px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest shadow-xl">
                                  Reserved
                                </span>
                              </div>
                            )}
                            <img
                              src={car.image}
                              className={`w-full h-full object-cover ${car.status === "Reserved" ? "grayscale" : ""}`}
                              alt={car.model}
                            />
                          </div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-white/50">
                            {car.make}
                          </p>
                          <h3 className="text-lg font-display font-black uppercase italic tracking-tighter">
                            {car.model}
                          </h3>
                        </button>
                      ))}
                    </div>
                  </section>

                  <section className="space-y-12 pt-12 border-t border-white/5">
                    <h2 className="text-xs font-black uppercase tracking-[0.5em] italic flex items-center gap-4">
                      <MapPin size={18} className="text-[#C59B6D]" /> 02.
                      Logistics Detail
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <label className="text-[9px] font-black uppercase tracking-widest opacity-30 px-4">
                          Pickup / Drop-off Hub
                        </label>
                        <select
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-full py-5 px-8 text-[11px] font-black uppercase tracking-widest focus:ring-2 focus:ring-[#C59B6D] focus:outline-none transition-all appearance-none"
                        >
                          <option value="Milan HQ">Milan HQ</option>
                          <option value="Zurich Hub">Zurich Hub</option>
                          <option value="Dubai Central">Dubai Central</option>
                          <option value="LA Private Wing">
                            LA Private Wing
                          </option>
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <label className="text-[9px] font-black uppercase tracking-widest opacity-30 px-4">
                            From
                          </label>
                          <input
                            type="date"
                            value={pickupDate}
                            onChange={(e) => setPickupDate(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-full py-5 px-6 text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-[#C59B6D] focus:outline-none transition-all [color-scheme:dark]"
                          />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[9px] font-black uppercase tracking-widest opacity-30 px-4">
                            To
                          </label>
                          <input
                            type="date"
                            value={dropoffDate}
                            onChange={(e) => setDropoffDate(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-full py-5 px-6 text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-[#C59B6D] focus:outline-none transition-all [color-scheme:dark]"
                          />
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="space-y-12 pt-12 border-t border-white/5">
                    <h2 className="text-xs font-black uppercase tracking-[0.5em] italic flex items-center gap-4">
                      <Zap size={18} className="text-[#C59B6D]" /> 03. Concierge
                      Enhancements
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {addonOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => toggleAddon(option.id)}
                          className={`p-8 rounded-[2.5rem] border text-left transition-all group ${addons.includes(option.id) ? "bg-white text-black border-white" : "bg-white/5 text-white border-white/10 hover:border-white/30"}`}
                        >
                          <option.icon
                            size={24}
                            className={`mb-6 ${addons.includes(option.id) ? "text-black" : "text-[#C59B6D]"}`}
                          />
                          <h4 className="text-sm font-black uppercase tracking-widest mb-2">
                            {option.name}
                          </h4>
                          <p
                            className={`text-[10px] font-bold uppercase tracking-wider mb-6 opacity-40`}
                          >
                            {option.desc}
                          </p>
                          <p className="text-lg font-black italic">
                            ${option.price}
                            <span className="text-[10px] font-normal not-italic opacity-50">
                              /D
                            </span>
                          </p>
                        </button>
                      ))}
                    </div>
                  </section>
                </div>

                <div className="lg:col-span-4">
                  <div className="glass p-12 rounded-[4rem] border-white/10 sticky top-48 shadow-2xl overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#C59B6D]/5 rounded-full blur-3xl -mr-16 -mt-16" />

                    <h3 className="text-2xl font-display font-black uppercase italic tracking-tighter mb-10">
                      Asset Summary
                    </h3>

                    <div className="space-y-8">
                      <div className="flex justify-between items-center pb-6 border-b border-white/5">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-white/30">
                            {selectedCar.make}
                          </p>
                          <p className="text-lg font-black uppercase italic tracking-tighter">
                            {selectedCar.model}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-black italic">
                            ${dailyRate}
                            <span className="text-[10px] font-normal not-italic opacity-30">
                              /D
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-white/40">
                          <span>Duration Cycle</span>
                          <span className="text-white">{duration} Days</span>
                        </div>
                        <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-white/40">
                          <span>Concierge Add-ons</span>
                          <span className="text-white">
                            ${addonsTotal * duration}
                          </span>
                        </div>
                      </div>

                      <div className="pt-8 border-t border-white/10">
                        <div className="flex justify-between items-end mb-10">
                          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
                            Total Commitment
                          </span>
                          <span className="text-5xl font-black italic tracking-tighter text-glow">
                            ${totalCommitment.toLocaleString()}
                          </span>
                        </div>

                        <button
                          onClick={handleBooking}
                          disabled={
                            formStatus === "submitting" ||
                            selectedCar?.status === "Reserved"
                          }
                          className="w-full py-6 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-[0.5em] hover:bg-[#C59B6D] hover:text-white transition-all shadow-xl flex items-center justify-center gap-4 group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {formStatus === "submitting"
                            ? "Establishing Protocol..."
                            : selectedCar?.status === "Reserved"
                              ? "Asset Currently Secured"
                              : "Confirm Reservation"}
                          {formStatus === "idle" &&
                            selectedCar?.status !== "Reserved" && (
                              <ChevronRight
                                size={18}
                                className="group-hover:translate-x-2 transition-transform"
                              />
                            )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="booking-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="max-w-6xl mx-auto py-12"
            >
              <div className="text-center mb-16">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-8 border border-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.1)]"
                >
                  <CheckCircle2 size={40} strokeWidth={2.5} />
                </motion.div>
                <span className="text-[10px] font-black uppercase tracking-[1em] text-[#C59B6D] mb-4 block italic">
                  Reservation Complete
                </span>
                <h2 className="text-6xl md:text-8xl font-display font-black uppercase italic tracking-tighter leading-none">
                  Asset <span className="text-white/10">Manifest</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Manifest Card */}
                <div className="lg:col-span-8">
                  <div className="glass rounded-[3.5rem] p-12 border-white/5 relative overflow-hidden flex flex-col gap-16">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#C59B6D]/5 rounded-full blur-[120px] -mr-48 -mt-48" />

                    {/* Primary Identity Section */}
                    <div className="flex flex-col md:flex-row justify-between items-start gap-12 relative z-10">
                      <div>
                        <span className="text-[9px] font-black uppercase tracking-[0.5em] text-[#C59B6D] mb-4 block italic">
                          Authorized Asset
                        </span>
                        <h3 className="text-5xl font-display font-black uppercase italic tracking-tighter leading-none mb-6">
                          {selectedCar.make} <br /> {selectedCar.model}
                        </h3>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 italic">
                          Protocol: #LU-{selectedCar.id.padStart(4, "0")}
                          -ALPHA-77
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-3xl">
                        <QrCode size={100} className="text-black" />
                      </div>
                    </div>

                    {/* Detailed Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
                      <div className="space-y-10">
                        <div>
                          <h4 className="text-[9px] font-black uppercase tracking-[0.5em] text-white/20 mb-6 flex items-center gap-2 italic">
                            <Info size={12} /> Technical Specifications
                          </h4>
                          <div className="grid grid-cols-2 gap-y-6">
                            <div>
                              <p className="text-[8px] font-black uppercase tracking-[0.2em] text-white/40 mb-1">
                                Configuration
                              </p>
                              <p className="text-[11px] font-bold uppercase tracking-widest">
                                {selectedCar.engine}
                              </p>
                            </div>
                            <div>
                              <p className="text-[8px] font-black uppercase tracking-[0.2em] text-white/40 mb-1">
                                Peak Performance
                              </p>
                              <p className="text-[11px] font-bold uppercase tracking-widest">
                                {selectedCar.hp} HP
                              </p>
                            </div>
                            <div>
                              <p className="text-[8px] font-black uppercase tracking-[0.2em] text-white/40 mb-1">
                                Acceleration
                              </p>
                              <p className="text-[11px] font-bold uppercase tracking-widest">
                                {selectedCar.acceleration} 0-60
                              </p>
                            </div>
                            <div>
                              <p className="text-[8px] font-black uppercase tracking-[0.2em] text-white/40 mb-1">
                                Asset Year
                              </p>
                              <p className="text-[11px] font-bold uppercase tracking-widest">
                                {selectedCar.year}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-[9px] font-black uppercase tracking-[0.5em] text-white/20 mb-6 flex items-center gap-2 italic">
                            <MapPin size={12} /> Logistics Routing
                          </h4>
                          <div className="grid grid-cols-2 gap-y-6">
                            <div>
                              <p className="text-[8px] font-black uppercase tracking-[0.2em] text-white/40 mb-1">
                                Collection Hub
                              </p>
                              <p className="text-[11px] font-bold uppercase tracking-widest">
                                {location}
                              </p>
                            </div>
                            <div>
                              <p className="text-[8px] font-black uppercase tracking-[0.2em] text-white/40 mb-1">
                                Cycle Duration
                              </p>
                              <p className="text-[11px] font-bold uppercase tracking-widest">
                                {duration} Days
                              </p>
                            </div>
                            <div className="col-span-2">
                              <p className="text-[8px] font-black uppercase tracking-[0.2em] text-white/40 mb-1">
                                Activation Window
                              </p>
                              <p className="text-[11px] font-bold uppercase tracking-widest flex items-center gap-2 text-[#C59B6D]">
                                <Clock size={12} />{" "}
                                {pickupDate || "AWAITING VERIFICATION"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-10">
                        <div>
                          <h4 className="text-[9px] font-black uppercase tracking-[0.5em] text-white/20 mb-6 flex items-center gap-2 italic">
                            <Zap size={12} /> Active Configuration
                          </h4>
                          <div className="space-y-3">
                            {addons.length > 0 ? (
                              addons.map((id) => {
                                const opt = addonOptions.find(
                                  (o) => o.id === id,
                                );
                                return (
                                  <div
                                    key={id}
                                    className="flex justify-between items-center py-2 border-b border-white/5"
                                  >
                                    <span className="text-[10px] font-bold uppercase tracking-widest">
                                      {opt?.name}
                                    </span>
                                    <span className="text-[10px] font-black text-white/40">
                                      +${opt?.price}/D
                                    </span>
                                  </div>
                                );
                              })
                            ) : (
                              <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">
                                Standard Fleet Spec Only
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="bg-white/[0.03] rounded-3xl p-8 border border-white/5">
                          <div className="flex justify-between items-end mb-6">
                            <div>
                              <h4 className="text-[9px] font-black uppercase tracking-[0.5em] text-white/40 mb-2 italic">
                                Financial Audit
                              </h4>
                              <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">
                                Authorized Settlement
                              </p>
                            </div>
                            <CreditCard
                              size={24}
                              className="text-[#C59B6D] mb-2"
                            />
                          </div>
                          <div className="flex justify-between items-baseline">
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30">
                              Total Commitment
                            </span>
                            <span className="text-4xl font-display font-black italic tracking-tighter text-glow">
                              ${totalCommitment.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 relative z-10">
                      <button
                        onClick={handleSaveManifest}
                        className="flex-1 py-6 bg-gradient-to-b from-white to-[#E5E5E5] text-black rounded-full text-[11px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl"
                      >
                        <Download size={18} strokeWidth={2.5} /> Save Dossier
                      </button>
                      <button className="flex-1 py-6 bg-white/5 border border-white/10 text-white rounded-full text-[11px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-white/10 transition-all active:scale-[0.98]">
                        <MessageSquare size={18} strokeWidth={2} /> Contact
                        Concierge
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Visual / Next Steps */}
                <div className="lg:col-span-4 space-y-8">
                  <div className="aspect-[4/5] rounded-[3.5rem] overflow-hidden glass border-white/5 relative group">
                    <img
                      src={selectedCar.image}
                      className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110"
                      alt="Success Asset"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-10 left-10">
                      <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40 mb-1">
                        Assigned Unit
                      </p>
                      <h5 className="text-2xl font-display font-black uppercase italic tracking-tighter">
                        {selectedCar.model}
                      </h5>
                    </div>
                  </div>

                  <div className="glass p-10 rounded-[3rem] border-white/5">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.5em] italic mb-8 border-b border-white/5 pb-4">
                      Protocol Sequence
                    </h4>
                    <div className="space-y-6">
                      {[
                        {
                          id: "01",
                          text: "Identity verification via Lumina ID App",
                        },
                        {
                          id: "02",
                          text: "Logistics call from our Milan HQ team",
                        },
                        {
                          id: "03",
                          text: "Encrypted key handover at collection hub",
                        },
                      ].map((step) => (
                        <div key={step.id} className="flex gap-4 items-start">
                          <span className="text-[9px] font-black text-[#C59B6D] py-1">
                            {step.id}
                          </span>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 leading-relaxed">
                            {step.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    to="/inventory"
                    className="flex items-center justify-center gap-4 py-6 text-[10px] font-black uppercase tracking-[0.6em] text-white/30 hover:text-white transition-all group"
                  >
                    Return to Fleet Hub{" "}
                    <ArrowUpRight
                      size={16}
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
};

export default Booking;
