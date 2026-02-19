
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CARS } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from '../components/AuthModal';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Gauge, 
  Zap, 
  Settings2, 
  Activity, 
  Fuel, 
  ArrowUpRight,
  X,
  ShieldCheck,
  ShieldAlert,
  ChevronRight,
  QrCode,
  FileText,
  Calendar,
  Download,
  MessageSquare,
  Info,
  Clock,
  CreditCard,
  MapPin
} from 'lucide-react';

const CarDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const car = CARS.find(c => c.id === id);
  
  const [activeImg, setActiveImg] = useState(car?.gallery[0] || car?.image || '');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  useEffect(() => {
    if (car) {
      setActiveImg(car.gallery[0] || car.image);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [id, car]);

  if (!car) return (
    <div className="pt-60 text-center h-screen bg-black text-white">
      <h1 className="text-4xl font-display font-black uppercase italic mb-8">Asset Not Found</h1>
      <Link to="/inventory" className="text-xs font-black uppercase tracking-widest border-b border-white/20 pb-2 text-white">Return to Inventory</Link>
    </div>
  );

  const specs = [
    { icon: Activity, label: 'Engine Configuration', val: car.engine, color: 'text-blue-400' },
    { icon: Zap, label: 'Maximum Power', val: `${car.hp} HP`, color: 'text-yellow-400' },
    { icon: Gauge, label: '0-60 MPH Sprint', val: car.acceleration, color: 'text-red-400' },
    { icon: Settings2, label: 'Transmission System', val: car.transmission, color: 'text-purple-400' },
    { icon: Fuel, label: 'Energy Source', val: car.fuelType, color: 'text-emerald-400' }
  ];

  const similarCars = CARS.filter(c => 
    c.id !== car.id && 
    (c.make === car.make || c.bodyType === car.bodyType)
  );

  const handleBookingStart = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    setBookingStatus('idle');
    setShowConfirmModal(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setShowConfirmModal(false);
    setBookingStatus('idle');
    document.body.style.overflow = 'auto';
  };

  const confirmBooking = () => {
    setBookingStatus('submitting');
    setTimeout(() => {
      setBookingStatus('success');
    }, 2500);
  };

  const handleSaveManifest = () => {
    const data = `
LUMINA ASSET MANIFEST
Protocol ID: #LU-${car.id.padStart(4, '0')}-ALPHA
--------------------------------------------------
ASSET: ${car.make} ${car.model} (${car.year})
ENGINE: ${car.engine}
POWER: ${car.hp} HP
ACCEL: ${car.acceleration}

LOGISTICS:
Hub: Lumina Milan HQ
Cycle: 1 Day Activation
Status: Verified

FINANCIALS:
Valuation Base: $${car.price.toLocaleString()}
--------------------------------------------------
VERIFIED BY LUMINA SELECT PROTOCOL
    `;
    const blob = new Blob([data], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Lumina_Manifest_${car.id}.txt`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="pt-48 pb-32 px-6 bg-[#050505] text-white relative">
      <div className="max-w-[1600px] mx-auto">
        <Link to="/inventory" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] mb-16 text-white/30 hover:text-white transition-all group">
          <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" /> Back to Fleet
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-40">
          <div className="space-y-8">
            <AnimatePresence mode='wait'>
              <motion.div 
                key={activeImg}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.6 }}
                className="aspect-[16/10] rounded-[3.5rem] overflow-hidden glass border-white/10"
              >
                <img src={activeImg} className="w-full h-full object-cover" alt={car.model} />
              </motion.div>
            </AnimatePresence>
            <div className="grid grid-cols-4 gap-6">
              {car.gallery.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveImg(img)}
                  className={`aspect-square rounded-[1.5rem] overflow-hidden glass border-2 transition-all ${activeImg === img ? 'border-white scale-105 shadow-2xl' : 'border-transparent opacity-40 hover:opacity-100 hover:scale-105'}`}
                >
                  <img src={img} className="w-full h-full object-cover" alt={`${car.model} gallery ${i}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-6 mb-10">
                <span className="px-6 py-2 rounded-full glass border border-white/10 text-[10px] font-black tracking-widest uppercase italic">{car.year} Model</span>
                <span className={`flex items-center gap-2 px-6 py-2 rounded-full text-[10px] font-black tracking-widest uppercase italic ${car.status === 'Available' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                   {car.status}
                </span>
              </div>
              <h1 className="text-7xl md:text-[6rem] font-display font-bold uppercase italic tracking-tighter mb-8 leading-[0.9] text-white">
                {car.make} <br /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/20">{car.model}</span>
              </h1>
              <div className="flex items-baseline gap-4 mb-14">
                <span className="text-5xl font-black italic tracking-tighter">${car.price.toLocaleString()}</span>
                <span className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">Excluding Local Taxes</span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <button onClick={handleBookingStart} className="flex-1 py-7 bg-white text-black font-black uppercase text-xs tracking-[0.3em] rounded-full hover:scale-105 transition-all shadow-xl">Secure This Asset</button>
                <button onClick={() => navigate('/contact')} className="flex-1 py-7 glass border-white/10 text-white font-black uppercase text-xs tracking-[0.3em] rounded-full hover:bg-white/10 transition-all transform hover:scale-105">Book Private View</button>
              </div>
            </motion.div>
          </div>
        </div>

        <section className="py-32 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4">
            <h2 className="text-4xl md:text-5xl font-display font-bold uppercase italic tracking-tighter text-white">Technical Prowess</h2>
            <p className="text-[10px] text-white/20 uppercase tracking-[0.5em] font-black italic">Precision Engineered Metrics</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {specs.map((spec, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative p-10 glass rounded-[3rem] border-white/5 overflow-hidden flex flex-col items-center text-center gap-8 hover:bg-white/[0.03] transition-all"
              >
                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 transition-opacity">
                  <spec.icon size={80} strokeWidth={1} />
                </div>
                
                <div className="relative">
                  <motion.div 
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center ${spec.color} group-hover:scale-110 transition-transform duration-500`}
                  >
                    <spec.icon size={32} />
                  </motion.div>
                </div>

                <div className="relative z-10">
                  <div className="text-[9px] uppercase tracking-[0.4em] text-white/30 mb-3 font-black">{spec.label}</div>
                  <div className="text-xl font-display font-black uppercase tracking-tighter italic leading-tight group-hover:text-white transition-colors">{spec.val}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {similarCars.length > 0 && (
          <section className="py-32 border-t border-white/5">
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4">
              <h2 className="text-4xl md:text-5xl font-display font-bold uppercase italic tracking-tighter text-white">Similar Assets</h2>
              <p className="text-[10px] text-white/20 uppercase tracking-[0.5em] font-black italic">Curated Recommendations</p>
            </div>
            
            <div className="relative group/carousel">
              <div className="flex gap-10 overflow-x-auto pb-12 snap-x no-scrollbar">
                {similarCars.map((sCar) => (
                  <Link 
                    key={sCar.id} 
                    to={`/car/${sCar.id}`}
                    className="flex-shrink-0 w-[300px] md:w-[450px] snap-start group/card"
                  >
                    <div className="glass rounded-[2.5rem] overflow-hidden border-white/5 h-full transition-all group-hover/card:border-white/20 group-hover/card:-translate-y-2">
                      <div className="aspect-[16/10] overflow-hidden">
                        <img 
                          src={sCar.image} 
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110" 
                          alt={sCar.model} 
                        />
                      </div>
                      <div className="p-10 flex justify-between items-end">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-2 italic">{sCar.make}</p>
                          <h4 className="text-2xl font-display font-black uppercase italic tracking-tighter">{sCar.model}</h4>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-2 italic">Valuation</p>
                          <p className="text-lg font-black italic">${sCar.price.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      <AnimatePresence>
        {showConfirmModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black flex flex-col items-start justify-start overflow-y-auto pt-20"
          >
            <motion.div 
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.2 }}
              transition={{ duration: 1.5, ease: "circOut" }}
              className="absolute inset-0 z-0"
            >
              <img src={car.image} className="w-full h-full object-cover grayscale" alt="Background asset" />
              <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
            </motion.div>

            <div className="relative z-10 w-full max-w-6xl px-8 py-8 flex flex-col items-center text-center mx-auto">
              <motion.button 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={handleCloseModal}
                className="absolute top-0 right-8 w-16 h-16 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all group"
              >
                <X size={24} className="group-hover:rotate-90 transition-transform" />
              </motion.button>

              <AnimatePresence mode="wait">
                {bookingStatus !== 'success' ? (
                  <motion.div
                    key="confirm-view"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-24 h-24 rounded-full bg-[#C59B6D]/10 text-[#C59B6D] flex items-center justify-center mb-12 shadow-[0_0_50px_rgba(197,155,109,0.2)]">
                      <ShieldAlert size={48} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.8em] text-[#C59B6D] mb-8 block italic">Validation Required</span>
                    <h2 className="text-6xl md:text-[8rem] font-display font-black uppercase italic tracking-tighter leading-none mb-12">
                      Initialize <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/20">Possession</span>
                    </h2>
                    <p className="text-lg md:text-xl text-white/40 font-medium uppercase tracking-[0.1em] mb-16 max-w-3xl mx-auto leading-relaxed italic">
                      Authorizing the secure transfer and temporary ownership protocol for the <span className="text-white font-black">{car.make} {car.model}</span>.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-8 justify-center items-center w-full">
                      <button onClick={handleCloseModal} className="order-2 sm:order-1 px-16 py-7 text-[11px] font-black uppercase tracking-[0.5em] text-white/30 hover:text-white transition-all">Abort Sequence</button>
                      <button onClick={confirmBooking} disabled={bookingStatus === 'submitting'} className="order-1 sm:order-2 px-20 py-7 bg-white text-black rounded-full text-[11px] font-black uppercase tracking-[0.6em] hover:bg-[#C59B6D] transition-all flex items-center gap-4 group">
                        {bookingStatus === 'submitting' ? 'Establishing Secure Link...' : 'Authorize Possession'}
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success-view"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-4xl w-full"
                  >
                    <div className="w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-10 border border-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.1)]">
                      <CheckCircle2 size={40} strokeWidth={2.5} />
                    </div>

                    <span className="text-[10px] font-black uppercase tracking-[1em] text-[#C59B6D] mb-6 block italic">Protocol Established</span>
                    <h2 className="text-6xl md:text-[8rem] font-display font-black uppercase italic tracking-tighter leading-none mb-12">
                      Asset <span className="text-white/20">Manifest</span>
                    </h2>

                    <div className="glass rounded-[3.5rem] p-12 border-white/5 text-left relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-64 h-64 bg-[#C59B6D]/5 rounded-full blur-[80px] -mr-32 -mt-32" />
                       <div className="flex justify-between items-start mb-12">
                          <div>
                             <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#C59B6D] mb-4 block italic">Authorized Asset</p>
                             <h3 className="text-4xl font-display font-black uppercase italic tracking-tighter leading-none mb-2">{car.make} {car.model}</h3>
                             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">ID: #LU-{car.id.padStart(4, '0')}-ALPHA-DIRECT</p>
                          </div>
                          <QrCode size={80} className="text-white/20" />
                       </div>

                       <div className="grid grid-cols-2 gap-x-12 gap-y-10 mb-16">
                          <div>
                             <h4 className="text-[8px] font-black uppercase tracking-[0.4em] text-white/20 mb-4 flex items-center gap-2 italic"><Info size={10} /> Specifications</h4>
                             <div className="grid grid-cols-2 gap-4">
                                <div><p className="text-[8px] text-white/40 uppercase mb-1">Engine</p><p className="text-[10px] font-bold uppercase">{car.engine}</p></div>
                                <div><p className="text-[8px] text-white/40 uppercase mb-1">Power</p><p className="text-[10px] font-bold uppercase">{car.hp} HP</p></div>
                             </div>
                          </div>
                          <div>
                             <h4 className="text-[8px] font-black uppercase tracking-[0.4em] text-white/20 mb-4 flex items-center gap-2 italic"><MapPin size={10} /> Logistics</h4>
                             <div className="grid grid-cols-2 gap-4">
                                <div><p className="text-[8px] text-white/40 uppercase mb-1">Hub</p><p className="text-[10px] font-bold uppercase">Milan HQ</p></div>
                                <div><p className="text-[8px] text-white/40 uppercase mb-1">Status</p><p className="text-[10px] font-bold uppercase text-emerald-500">Verified</p></div>
                             </div>
                          </div>
                          <div className="col-span-2 bg-white/[0.03] p-6 rounded-3xl border border-white/5 flex justify-between items-center">
                             <div>
                                <p className="text-[8px] text-white/40 uppercase mb-1 italic">Authorized Valuation</p>
                                <p className="text-2xl font-display font-black italic tracking-tighter">${car.price.toLocaleString()}</p>
                             </div>
                             <CreditCard size={20} className="text-[#C59B6D]/40" />
                          </div>
                       </div>

                       <div className="flex flex-col sm:flex-row gap-6">
                          <button onClick={handleSaveManifest} className="flex-1 py-6 bg-gradient-to-b from-white to-[#E5E5E5] text-black rounded-full text-[11px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl">
                            <Download size={18} strokeWidth={2.5} /> Save Dossier
                          </button>
                          <button onClick={handleCloseModal} className="flex-1 py-6 bg-white/5 border border-white/10 text-white rounded-full text-[11px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-white/10 transition-all">
                            Done
                          </button>
                       </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {bookingStatus === 'submitting' && (
              <motion.div initial={{ top: "-10%" }} animate={{ top: "110%" }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }} className="absolute left-0 right-0 h-[1px] bg-[#C59B6D] shadow-[0_0_20px_#C59B6D] z-10 opacity-40" />
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </div>
  );
};

export default CarDetails;
