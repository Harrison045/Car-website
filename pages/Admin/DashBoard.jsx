import React, { useState, useEffect, useMemo } from "react";
import { carService } from "../../services/carService";
import { bookingService } from "../../services/bookingService";
import { inquiryService } from "../../services/inquiryService";
import { adminAuthService } from "../../services/adminAuthService";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  LogOut,
  Car,
  Settings,
  TrendingUp,
  Mail,
  Clock,
  CheckCircle2,
  X,
  PlusCircle,
  AlertCircle,
  Edit2,
} from "lucide-react";

const Dashboard = () => {
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);

  const stats = useMemo(() => {
    return {
      total: cars.length,
      available: cars.filter((c) => c.status === "Available").length,
      valuation: cars.reduce((acc, curr) => acc + (curr.price || 0), 0),
      requests: bookings.filter((b) => b.status === "Pending").length,
      inquiries: inquiries.filter((i) => i.status === "New").length,
      reserved: cars.filter((c) => c.status === "Reserved").length,
    };
  }, [cars, bookings]);

  const [form, setForm] = useState({
    make: "",
    model: "",
    price: "",
    rentPrice: "",
    year: "",
    image: "",
    fuelType: "Gasoline",
    transmission: "Automatic",
    bodyType: "Sedan",
    mileage: "0",
    hp: "0",
    acceleration: "0s",
    engine: "",
    description: "",
    status: "Available",
  });

  const fetchCars = async () => {
    try {
      const data = await carService.getAllCars();
      setCars(data);
    } catch (err) {
      setError("Fleet synchronization protocol failure.");
      console.error(err);
    }
  };

  const fetchInquiries = async () => {
    try {
      const headers = adminAuthService.getAuthHeaders();
      const data = await inquiryService.getAllInquiries(headers);
      setInquiries(data);
    } catch (err) {
      console.error("Error fetching inquiries:", err);
    }
  };

  useEffect(() => {
    // Check if user is authenticated
    if (!adminAuthService.isAuthenticated()) {
      window.location.href = "/admin/login";
      return;
    }

    const initDashboard = async () => {
      setIsLoading(true);
      await Promise.all([fetchCars(), fetchBookings(), fetchInquiries()]);
      setIsLoading(false);
    };
    initDashboard();
  }, []);

  // Auto-clear messages after 3 seconds
  useEffect(() => {
    if (error || successMessage) {
      const timer = setTimeout(() => {
        setError("");
        setSuccessMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, successMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const headers = adminAuthService.getAuthHeaders();
      const carData = {
        make: form.make,
        model: form.model,
        price: parseFloat(form.price),
        rentPrice: parseFloat(form.rentPrice) || 0,
        year: parseInt(form.year),
        image:
          form.image ||
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800",
        fuelType: form.fuelType,
        transmission: form.transmission,
        bodyType: form.bodyType,
        mileage: parseInt(form.mileage) || 0,
        hp: parseInt(form.hp) || 0,
        acceleration: form.acceleration || "0s",
        engine: form.engine || "Standard",
        description: form.description,
        status: form.status,
        gallery: [
          form.image ||
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800",
        ],
        features: ["Premium", "Luxury", "Modern"],
      };

      if (isEditing) {
        await carService.updateCar(currentEditId, carData, headers);
        setSuccessMessage("Asset protocol successfully updated.");
      } else {
        await carService.createCar(carData, headers);
        setSuccessMessage("Asset successfully registered to fleet.");
      }

      handleCloseModal();
      fetchCars();
    } catch (err) {
      setError(
        isEditing
          ? "Update protocol failed."
          : "Registration protocol breach detected.",
      );
      console.error("Error submitting form:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setIsEditing(false);
    setCurrentEditId(null);
    setForm({
      make: "",
      model: "",
      price: "",
      rentPrice: "",
      year: "",
      image: "",
      fuelType: "Gasoline",
      transmission: "Automatic",
      bodyType: "Sedan",
      mileage: "0",
      hp: "0",
      acceleration: "0s",
      engine: "",
      description: "",
      status: "Available",
    });
  };

  const openEditModal = (car) => {
    setIsEditing(true);
    setCurrentEditId(car.id);
    setForm({
      make: car.make,
      model: car.model,
      price: car.price.toString(),
      rentPrice: (car.rentPrice || 0).toString(),
      year: car.year.toString(),
      image: car.image,
      fuelType: car.fuelType,
      transmission: car.transmission,
      bodyType: car.bodyType,
      mileage: car.mileage.toString(),
      hp: car.hp.toString(),
      acceleration: car.acceleration,
      engine: car.engine,
      description: car.description,
      status: car.status,
    });
    setShowAddModal(true);
  };

  const fetchBookings = async () => {
    try {
      const headers = adminAuthService.getAuthHeaders();
      const data = await bookingService.getAllBookings(headers);
      setBookings(data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  const handleLogout = () => {
    adminAuthService.logout();
    window.location.href = "/admin/login";
  };

  const updateBookingStatus = async (id, status) => {
    try {
      const headers = adminAuthService.getAuthHeaders();
      await bookingService.updateBookingStatus(id, status, headers);

      // If approved, automatically mark the car as reserved
      if (status === "Approved") {
        const booking = bookings.find((b) => b.id === id);
        const carId =
          booking?.carId?.id || booking?.carId?._id || booking?.carId;

        if (carId) {
          await carService.updateCar(carId, { status: "Reserved" }, headers);
          fetchCars();
        }
      }

      setSuccessMessage(`Protocol updated: Request ${status}.`);
      fetchBookings();
    } catch (err) {
      setError("Status update protocol failed.");
    }
  };

  const updateInquiryStatus = async (id, status) => {
    try {
      const headers = adminAuthService.getAuthHeaders();
      await inquiryService.updateInquiryStatus(id, status, headers);
      setSuccessMessage(`Protocol updated: Inquiry ${status}.`);
      fetchInquiries();
    } catch (err) {
      setError("Inquiry status update failed.");
    }
  };

  const deleteCar = async (id) => {
    try {
      if (
        window.confirm(
          "Are you sure you want to delete this asset from the fleet?",
        )
      ) {
        const headers = adminAuthService.getAuthHeaders();
        await carService.deleteCar(id, headers);
        setSuccessMessage("Asset successfully removed from fleet.");
        fetchCars();
      }
    } catch (err) {
      setError("Deletion protocol failed.");
      console.error("Error deleting car:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#C59B6D] selection:text-black">
      {/* Notifications */}
      <div className="fixed top-24 right-10 z-[100] flex flex-col gap-4">
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="glass border-red-500/50 p-6 rounded-3xl flex items-center gap-4 bg-red-500/10 backdrop-blur-xl"
            >
              <AlertCircle className="text-red-500" />
              <div className="text-sm font-black uppercase tracking-widest">
                {error}
              </div>
            </motion.div>
          )}
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="glass border-emerald-500/50 p-6 rounded-3xl flex items-center gap-4 bg-emerald-500/10 backdrop-blur-xl"
            >
              <CheckCircle2 className="text-emerald-500" />
              <div className="text-sm font-black uppercase tracking-widest">
                {successMessage}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="max-w-[1700px] mx-auto p-10 pt-40">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-10">
          <div>
            <span className="text-[10px] text-[#C59B6D] uppercase tracking-[0.6em] font-black mb-6 block italic">
              Executive Control
            </span>
            <h1 className="text-6xl md:text-8xl font-display font-black uppercase italic tracking-tighter leading-none mb-6">
              Fleet Manager
            </h1>
            <p className="text-white/30 uppercase text-[10px] tracking-[0.4em] font-black">
              Authorized Administrative Protocol Level Alpha
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => {
                handleCloseModal();
                setShowAddModal(true);
              }}
              className="px-10 py-6 bg-white text-black rounded-full text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]"
            >
              <PlusCircle size={18} /> Register New Asset
            </button>
          </div>
        </header>

        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass p-10 rounded-[3rem] border-white/5 relative overflow-hidden group"
          >
            <div className="absolute -right-10 -bottom-10 opacity-[0.03] group-hover:opacity-10 transition-opacity">
              <Car size={160} />
            </div>
            <div className="relative z-10">
              <div className="text-[9px] uppercase tracking-[0.3em] text-white/30 mb-4 font-black">
                Total Assets Under Control
              </div>
              <div className="text-5xl font-display font-black italic tracking-tighter">
                {stats.total}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass p-10 rounded-[3rem] border-white/5 relative overflow-hidden group"
          >
            <div className="absolute -right-10 -bottom-10 opacity-[0.03] group-hover:opacity-10 transition-opacity">
              <CheckCircle2 size={160} />
            </div>
            <div className="relative z-10">
              <div className="text-[9px] uppercase tracking-[0.3em] text-emerald-500/50 mb-4 font-black">
                Available for Acquisition
              </div>
              <div className="text-5xl font-display font-black italic tracking-tighter text-emerald-400">
                {stats.available}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass p-10 rounded-[3rem] border-white/5 relative overflow-hidden group"
          >
            <div className="absolute -right-10 -bottom-10 opacity-[0.03] group-hover:opacity-10 transition-opacity">
              <TrendingUp size={160} />
            </div>
            <div className="relative z-10">
              <div className="text-[9px] uppercase tracking-[0.3em] text-[#C59B6D] mb-4 font-black">
                Total Portfolio Valuation
              </div>
              <div className="text-4xl font-display font-black italic tracking-tighter">
                ${(stats.valuation / 1000000).toFixed(1)}M+
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass p-10 rounded-[3rem] border-white/5 relative overflow-hidden group"
          >
            <div className="absolute -right-10 -bottom-10 opacity-[0.03] group-hover:opacity-10 transition-opacity">
              <Clock size={160} />
            </div>
            <div className="relative z-10">
              <div className="text-[9px] uppercase tracking-[0.3em] text-blue-500/50 mb-4 font-black">
                Awaiting Authorization
              </div>
              <div className="text-5xl font-display font-black italic tracking-tighter text-blue-400">
                {stats.requests}
              </div>
            </div>
          </motion.div>

          {/* New Inquiries Stat */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass p-10 rounded-[3rem] border-white/5 relative overflow-hidden group"
          >
            <div className="absolute -right-10 -bottom-10 opacity-[0.03] group-hover:opacity-10 transition-opacity">
              <Mail size={160} />
            </div>
            <div className="relative z-10">
              <div className="text-[9px] uppercase tracking-[0.3em] text-white/30 mb-4 font-black">
                Active Inquiries
              </div>
              <div className="text-5xl font-display font-black italic tracking-tighter">
                {stats.inquiries}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Fleet List */}
        <section>
          <div className="flex justify-between items-baseline mb-12 border-b border-white/5 pb-10">
            <h2 className="text-4xl font-display font-black uppercase italic tracking-tighter">
              Current Inventory
            </h2>
            <div className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-black italic">
              Displaying {cars.length} Assets
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {cars.map((car, idx) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="group glass rounded-[2.5rem] overflow-hidden border-white/5 hover:border-white/20 transition-all flex flex-col"
              >
                <div className="aspect-[16/10] relative overflow-hidden">
                  <img
                    src={car.image}
                    className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                    alt={car.model}
                  />
                  <div className="absolute top-6 left-6 flex gap-2">
                    <span
                      className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${car.status === "Available" ? "bg-emerald-500 text-black" : "bg-black/60 text-white backdrop-blur-xl border border-white/10"}`}
                    >
                      {car.status}
                    </span>
                  </div>
                  <div className="absolute top-6 right-6 flex gap-3">
                    <button
                      onClick={() => openEditModal(car)}
                      className="p-3 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full text-white/40 hover:text-[#C59B6D] hover:border-[#C59B6D]/30 transition-all"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => deleteCar(car.id)}
                      className="p-3 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full text-white/40 hover:text-red-500 hover:border-red-500/30 transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div className="mb-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-black font-display uppercase italic tracking-tighter text-white">
                        {car.make} <br /> {car.model}
                      </h3>
                      <span className="text-lg font-black italic">
                        ${car.price.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex gap-4 text-[8px] text-white/40 uppercase tracking-[0.2em] font-black">
                      <span>{car.year}</span>
                      <span>•</span>
                      <span>{car.mileage.toLocaleString()} MI</span>
                    </div>
                  </div>

                  <div className="flex gap-4 border-t border-white/5 pt-6">
                    <span className="text-[8px] font-black uppercase tracking-widest text-[#C59B6D]">
                      {car.fuelType}
                    </span>
                    <span className="text-[8px] font-black uppercase tracking-widest text-white/30">
                      {car.transmission}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Acquisition Requests */}
        <section className="mt-32">
          <div className="flex justify-between items-baseline mb-12 border-b border-white/5 pb-10">
            <h2 className="text-4xl font-display font-black uppercase italic tracking-tighter">
              Acquisition Requests
            </h2>
            <div className="text-[10px] text-blue-400 uppercase tracking-[0.4em] font-black italic">
              {stats.requests} Pending Protocols
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <AnimatePresence>
              {bookings.length === 0 ? (
                <div className="glass p-20 rounded-[3rem] text-center border-dashed border-white/5">
                  <p className="text-white/20 uppercase text-[10px] tracking-[0.5em] font-black italic">
                    No Transmission Data Detected
                  </p>
                </div>
              ) : (
                bookings.map((booking, idx) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="glass p-10 rounded-[2.5rem] border-white/5 flex flex-col lg:flex-row justify-between items-center gap-10 hover:border-white/10 transition-all group"
                  >
                    <div className="flex items-center gap-8 w-full">
                      <div className="w-24 h-24 rounded-3xl overflow-hidden bg-white/5 flex-shrink-0">
                        <img
                          src={booking.carId?.image}
                          className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                          alt="Request Asset"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <span
                            className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                              booking.status === "Pending"
                                ? "bg-blue-500/20 text-blue-400"
                                : booking.status === "Approved"
                                  ? "bg-emerald-500/20 text-emerald-400"
                                  : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {booking.status}
                          </span>
                          <span className="text-[9px] text-white/20 font-black uppercase tracking-widest italic pt-0.5">
                            #{booking.id.slice(-6).toUpperCase()}
                          </span>
                        </div>
                        <h3 className="text-xl font-display font-black uppercase italic tracking-tighter mb-2">
                          {booking.carId?.make} {booking.carId?.model}
                        </h3>
                        <div className="flex flex-wrap gap-6 text-[9px] text-white/40 uppercase tracking-widest font-black">
                          <span>
                            Client:{" "}
                            <span className="text-white">
                              {booking.clientName}
                            </span>
                          </span>
                          <span>
                            Timeline:{" "}
                            <span className="text-[#C59B6D]">
                              {new Date(
                                booking.pickupDate,
                              ).toLocaleDateString()}{" "}
                              -{" "}
                              {new Date(
                                booking.dropoffDate,
                              ).toLocaleDateString()}
                            </span>
                          </span>
                          <span>
                            Valuation:{" "}
                            <span className="text-white">
                              ${booking.totalPrice?.toLocaleString()}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 w-full lg:w-auto">
                      {booking.status === "Pending" && (
                        <>
                          <button
                            onClick={() =>
                              updateBookingStatus(booking.id, "Approved")
                            }
                            className="flex-1 lg:flex-initial px-8 py-4 bg-emerald-500 text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() =>
                              updateBookingStatus(booking.id, "Declined")
                            }
                            className="flex-1 lg:flex-initial px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500/20 hover:text-red-500 hover:border-red-500/30 transition-all"
                          >
                            Decline
                          </button>
                        </>
                      )}
                      {booking.status !== "Pending" && (
                        <div className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 italic px-8">
                          Protocol Finalized
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Inbound Inquiries */}
        <section className="mt-32">
          <div className="flex justify-between items-baseline mb-12 border-b border-white/5 pb-10">
            <h2 className="text-4xl font-display font-black uppercase italic tracking-tighter">
              Inbound Inquiries
            </h2>
            <div className="text-[10px] text-[#C59B6D] uppercase tracking-[0.4em] font-black italic">
              {stats.inquiries} New Messages
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <AnimatePresence>
              {inquiries.length === 0 ? (
                <div className="glass p-20 rounded-[3rem] text-center border-dashed border-white/5">
                  <p className="text-white/20 uppercase text-[10px] tracking-[0.5em] font-black italic">
                    No Client Messaging Found
                  </p>
                </div>
              ) : (
                inquiries.map((inquiry, idx) => (
                  <motion.div
                    key={inquiry.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="glass p-10 rounded-[2.5rem] border-white/5 hover:border-white/10 transition-all group"
                  >
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <span
                            className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                              inquiry.type === "Valuation"
                                ? "bg-[#C59B6D]/20 text-[#C59B6D]"
                                : "bg-white/10 text-white/40"
                            }`}
                          >
                            {inquiry.type} Protocol
                          </span>
                          <span
                            className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                              inquiry.status === "New"
                                ? "bg-blue-500/20 text-blue-400"
                                : "bg-white/5 text-white/20"
                            }`}
                          >
                            {inquiry.status}
                          </span>
                        </div>
                        <h4 className="text-lg font-black uppercase tracking-widest mb-1 italic">
                          {inquiry.subject}
                        </h4>
                        <p className="text-[10px] text-white/30 uppercase tracking-widest font-black mb-4">
                          From: {inquiry.name} ({inquiry.email})
                        </p>
                        <p className="text-[11px] text-white/60 leading-relaxed max-w-3xl">
                          {inquiry.message}
                        </p>

                        {inquiry.details && inquiry.type === "Valuation" && (
                          <div className="mt-6 p-6 bg-white/5 rounded-2xl grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div>
                              <div className="text-[7px] text-white/20 uppercase font-black tracking-widest mb-1">
                                Year
                              </div>
                              <div className="text-[10px] font-black">
                                {inquiry.details.year}
                              </div>
                            </div>
                            <div>
                              <div className="text-[7px] text-white/20 uppercase font-black tracking-widest mb-1">
                                Mileage
                              </div>
                              <div className="text-[10px] font-black">
                                {inquiry.details.mileage}
                              </div>
                            </div>
                            <div>
                              <div className="text-[7px] text-white/20 uppercase font-black tracking-widest mb-1">
                                Condition
                              </div>
                              <div className="text-[10px] font-black italic">
                                {inquiry.details.condition}
                              </div>
                            </div>
                            <div>
                              <div className="text-[7px] text-white/20 uppercase font-black tracking-widest mb-1">
                                Ask
                              </div>
                              <div className="text-[10px] font-black text-[#C59B6D]">
                                {inquiry.details.priceGoal}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-4">
                        {inquiry.status === "New" && (
                          <button
                            onClick={() =>
                              updateInquiryStatus(inquiry.id, "Processed")
                            }
                            className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all"
                          >
                            Mark Processed
                          </button>
                        )}
                        <div className="text-[9px] text-white/10 font-black uppercase tracking-widest py-4">
                          {new Date(inquiry.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </section>
      </div>

      {/* Add Asset Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6"
          >
            <div
              className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
              onClick={handleCloseModal}
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="glass max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-[3.5rem] border-white/10 relative z-10 p-12 custom-scrollbar"
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-10 right-10 p-4 rounded-full glass border-white/5 text-white/30 hover:text-white transition-all"
              >
                <X size={20} />
              </button>

              <div className="mb-12">
                <span className="text-[10px] text-[#C59B6D] uppercase tracking-[0.6em] font-black mb-4 block italic">
                  {isEditing ? "Update Protocol" : "New Registration"}
                </span>
                <h2 className="text-5xl font-display font-black uppercase italic tracking-tighter">
                  {isEditing ? "Modify Asset" : "Add To Fleet"}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Form fields with custom styling */}
                  <div className="space-y-4">
                    <label className="text-[9px] uppercase tracking-[0.4em] font-black text-white/30 ml-4 block italic">
                      Manufacturer
                    </label>
                    <input
                      type="text"
                      required
                      value={form.make}
                      onChange={(e) =>
                        setForm({ ...form, make: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#C59B6D] transition-all"
                      placeholder="e.g. LAMBORGHINI"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[9px] uppercase tracking-[0.4em] font-black text-white/30 ml-4 block italic">
                      Model Name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.model}
                      onChange={(e) =>
                        setForm({ ...form, model: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#C59B6D] transition-all"
                      placeholder="e.g. REVUELTO"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[9px] uppercase tracking-[0.4em] font-black text-white/30 ml-4 block italic">
                      Purchase Price ($)
                    </label>
                    <input
                      type="number"
                      required
                      value={form.price}
                      onChange={(e) =>
                        setForm({ ...form, price: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#C59B6D] transition-all"
                      placeholder="850000"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[9px] uppercase tracking-[0.4em] font-black text-white/30 ml-4 block italic">
                      Daily Rent Price ($)
                    </label>
                    <input
                      type="number"
                      required
                      value={form.rentPrice}
                      onChange={(e) =>
                        setForm({ ...form, rentPrice: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#C59B6D] transition-all"
                      placeholder="1500"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[9px] uppercase tracking-[0.4em] font-black text-white/30 ml-4 block italic">
                      Production Year
                    </label>
                    <input
                      type="number"
                      required
                      value={form.year}
                      onChange={(e) =>
                        setForm({ ...form, year: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#C59B6D] transition-all"
                      placeholder="2025"
                    />
                  </div>
                  <div className="space-y-4 col-span-full">
                    <label className="text-[9px] uppercase tracking-[0.4em] font-black text-white/30 ml-4 block italic">
                      Primary Asset Image URL
                    </label>
                    <input
                      type="text"
                      required
                      value={form.image}
                      onChange={(e) =>
                        setForm({ ...form, image: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#C59B6D] transition-all font-mono"
                      placeholder="https://..."
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="text-[9px] uppercase tracking-[0.4em] font-black text-white/30 ml-4 block italic">
                      Fuel Component
                    </label>
                    <select
                      value={form.fuelType}
                      onChange={(e) =>
                        setForm({ ...form, fuelType: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#C59B6D] transition-all appearance-none"
                    >
                      <option className="bg-black" value="Gasoline">
                        Gasoline
                      </option>
                      <option className="bg-black" value="Diesel">
                        Diesel
                      </option>
                      <option className="bg-black" value="Electric">
                        Electric
                      </option>
                      <option className="bg-black" value="Hybrid">
                        Hybrid
                      </option>
                    </select>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[9px] uppercase tracking-[0.4em] font-black text-white/30 ml-4 block italic">
                      Transmission Protocol
                    </label>
                    <select
                      value={form.transmission}
                      onChange={(e) =>
                        setForm({ ...form, transmission: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#C59B6D] transition-all appearance-none"
                    >
                      <option className="bg-black" value="Automatic">
                        Automatic
                      </option>
                      <option className="bg-black" value="Manual">
                        Manual
                      </option>
                    </select>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[9px] uppercase tracking-[0.4em] font-black text-white/30 ml-4 block italic">
                      Body Architecture
                    </label>
                    <select
                      value={form.bodyType}
                      onChange={(e) =>
                        setForm({ ...form, bodyType: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#C59B6D] transition-all appearance-none"
                    >
                      <option className="bg-black" value="SUV">
                        SUV
                      </option>
                      <option className="bg-black" value="Sedan">
                        Sedan
                      </option>
                      <option className="bg-black" value="Coupe">
                        Coupe
                      </option>
                      <option className="bg-black" value="Convertible">
                        Convertible
                      </option>
                    </select>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[9px] uppercase tracking-[0.4em] font-black text-white/30 ml-4 block italic">
                      Current Status
                    </label>
                    <select
                      value={form.status}
                      onChange={(e) =>
                        setForm({ ...form, status: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#C59B6D] transition-all appearance-none"
                    >
                      <option className="bg-black" value="Available">
                        Available
                      </option>
                      <option className="bg-black" value="Reserved">
                        Reserved
                      </option>
                      <option className="bg-black" value="Sold">
                        Sold
                      </option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[9px] uppercase tracking-[0.4em] font-black text-white/30 ml-4 block italic">
                    Asset Description
                  </label>
                  <textarea
                    rows={4}
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#C59B6D] transition-all resize-none"
                    placeholder="Provide a detailed overview of the performance asset..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-6 bg-white text-black rounded-full font-black uppercase text-xs tracking-[0.4em] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_50px_rgba(255,255,255,0.1)] disabled:opacity-50"
                >
                  {isLoading
                    ? "Synchronizing Asset..."
                    : isEditing
                      ? "Update Acquisition Details"
                      : "Register To Fleet"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
