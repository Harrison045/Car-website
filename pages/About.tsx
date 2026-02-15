import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Target, 
  Award, 
  Users, 
  Globe, 
  Clock, 
  Cpu, 
  Zap, 
  MapPin, 
  History,
  FileSearch,
  Truck,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  const milestones = [
    { year: '2010', title: 'The Genesis', desc: 'Lumina founded in Aosta, Italy, focusing on rare Italian classic restoration.' },
    { year: '2015', title: 'Global Bridge', desc: 'Expanded logistics hubs to Monaco and Zurich, serving the Pan-European elite.' },
    { year: '2020', title: 'The Electric Shift', desc: 'First ultra-luxury EV fleet introduced, setting a new sustainable benchmark.' },
    { year: '2024', title: 'Lumina Select', desc: 'Launch of our biometric concierge app and autonomous delivery network.' }
  ];

  const services = [
    { 
      icon: Clock, 
      title: '24/7 Concierge', 
      desc: 'A dedicated representative assigned to every client, ensuring 100% uptime and immediate response.',
      stat: '0.4s Avg Response'
    },
    { 
      icon: ShieldCheck, 
      title: 'Secured Logistics', 
      desc: 'White-glove, enclosed transport with real-time GPS tracking and climate-controlled environments.',
      stat: '100% Zero-Damage'
    },
    { 
      icon: Globe, 
      title: 'Global Portability', 
      desc: 'Pick up in Milan, drop off in Dubai. We handle all cross-border documentation and customs.',
      stat: '45+ Countries'
    }
  ];

  const protocols = [
    { id: '01', title: 'Mechanical DNA', desc: 'Full drivetrain disassembly and high-fidelity stress testing.' },
    { id: '02', title: 'Provenance Audit', desc: 'Complete historical verification and title integrity checks.' },
    { id: '03', title: 'Aesthetic Refinement', desc: 'Nanotech ceramic coating and bespoke interior rejuvenation.' }
  ];

  return (
    <div className="bg-[#050505] text-white min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1562141982-10f547164993?auto=format&fit=crop&q=80&w=2400" 
            className="w-full h-full object-cover opacity-30 grayscale"
            alt="Luxury Interior Detail"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-[#050505]" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4 mb-10"
          >
            <div className="h-px w-12 bg-[#C59B6D]" />
            <span className="text-[10px] font-black uppercase tracking-[0.8em] text-[#C59B6D]">Est. 2010 • Aosta, Italy</span>
            <div className="h-px w-12 bg-[#C59B6D]" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "circOut" }}
            className="text-6xl md:text-[8rem] font-display font-black uppercase italic tracking-tighter leading-none mb-12"
          >
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/20">Art of</span> <br /> Possession
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white/40 text-[10px] md:text-xs font-black uppercase tracking-[0.4em] max-w-xl mx-auto leading-loose"
          >
            We curate mechanical masterpieces for those who view mobility as a tactile philosophy.
          </motion.p>
        </div>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-20">
          <span className="text-[8px] font-black uppercase tracking-[0.4em]">Scroll to Explore</span>
          <div className="w-px h-16 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* 2. Philosophy & Protocol Section */}
      <section className="py-40 px-6 max-w-[1400px] mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-5">
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase italic tracking-tighter mb-12">
              The <span className="text-[#C59B6D]">Lumina</span> <br /> Protocol
            </h2>
            <div className="space-y-12">
              {protocols.map((p) => (
                <div key={p.id} className="group cursor-default">
                  <div className="flex items-center gap-6 mb-4">
                    <span className="text-2xl font-display font-black text-white/10 group-hover:text-[#C59B6D] transition-colors">{p.id}</span>
                    <h4 className="text-xs font-black uppercase tracking-widest">{p.title}</h4>
                  </div>
                  <p className="text-[11px] text-white/30 uppercase tracking-[0.2em] leading-relaxed pl-14">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
            <Link to="/inventory" className="inline-flex items-center gap-4 mt-20 px-8 py-4 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
              Inspect the Fleet <ArrowRight size={14} />
            </Link>
          </div>
          
          <div className="lg:col-span-7 grid grid-cols-2 gap-8">
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden glass border-white/5 mt-12">
              <img src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-1000" alt="Mechanical Detail" />
            </div>
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden glass border-white/5">
              <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-1000" alt="Performance Car" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Concierge Experience Grid */}
      <section className="py-40 bg-white text-black">
        <div className="max-w-[1600px] mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-24 gap-8">
            <h2 className="text-6xl font-display font-black uppercase italic tracking-tighter leading-none">Concierge <br /> Ecosystem</h2>
            <p className="text-xs text-black/40 font-black uppercase tracking-[0.3em] max-w-sm leading-relaxed">
              We eliminate the friction of acquisition. Our network handles the complexity, leaving you with the experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {services.map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-12 bg-neutral-50 rounded-[3rem] border border-black/5 hover:shadow-2xl transition-all group"
              >
                <div className="w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                  <service.icon size={28} />
                </div>
                <h4 className="text-xl font-display font-black uppercase italic tracking-tighter mb-6">{service.title}</h4>
                <p className="text-[11px] text-black/40 font-bold uppercase tracking-[0.2em] leading-relaxed mb-10">
                  {service.desc}
                </p>
                <div className="pt-8 border-t border-black/10 flex justify-between items-center">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-black/20">Metric</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#C59B6D]">{service.stat}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Chronology / Timeline */}
      <section className="py-40 px-6 bg-[#050505] overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-6 mb-24">
            <History size={32} className="text-[#C59B6D]" />
            <h2 className="text-4xl font-display font-black uppercase italic tracking-tighter">Chronology</h2>
          </div>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 hidden lg:block" />
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
              {milestones.map((m, i) => (
                <div key={i} className="relative z-10 space-y-8 group">
                  <div className="text-5xl font-display font-black text-white/5 group-hover:text-[#C59B6D]/20 transition-colors duration-500">
                    {m.year}
                  </div>
                  <div className="lg:pt-20">
                    <div className="w-3 h-3 rounded-full bg-[#C59B6D] mb-8 hidden lg:block shadow-[0_0_15px_rgba(197,155,109,0.5)]" />
                    <h4 className="text-xs font-black uppercase tracking-[0.4em] mb-4 text-[#C59B6D]">{m.title}</h4>
                    <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Global Presence Section */}
      <section className="py-40 border-t border-white/5">
        <div className="max-w-[1600px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
             <div className="order-2 lg:order-1">
                <div className="grid grid-cols-2 gap-x-12 gap-y-16">
                   {[
                     { city: 'Milan', role: 'Headquarters' },
                     { city: 'Zurich', role: 'Finance Hub' },
                     { city: 'Monaco', role: 'Elite Concierge' },
                     { city: 'Dubai', role: 'ME Logistics' },
                     { city: 'Los Angeles', role: 'US Operations' },
                     { city: 'Aosta', role: 'Technical Center' }
                   ].map((loc, i) => (
                     <div key={i} className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                           <MapPin size={12} className="text-[#C59B6D]" />
                           <span className="text-xl font-display font-black uppercase italic tracking-tighter">{loc.city}</span>
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 pl-6">{loc.role}</span>
                     </div>
                   ))}
                </div>
             </div>
             <div className="order-1 lg:order-2 space-y-12">
                <span className="text-[10px] font-black uppercase tracking-[0.8em] text-[#C59B6D] italic">The Network</span>
                <h2 className="text-5xl font-display font-black uppercase italic tracking-tighter leading-[0.9]">Global <br /> Mobility <br /> Synchronized</h2>
                <p className="text-white/40 text-[11px] font-black uppercase tracking-[0.2em] leading-loose max-w-lg italic">
                  With asset hubs strategically positioned across major financial and leisure centers, Lumina ensures your preferred masterpiece is ready when you land.
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* 6. Contact Transition */}
      <section className="py-60 text-center px-8 bg-gradient-to-b from-transparent to-[#0A0A0A]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-display font-black uppercase italic tracking-tighter mb-12">Ready to Initialize?</h2>
          <p className="text-[11px] text-white/30 font-black uppercase tracking-[0.4em] mb-16 leading-loose">
            Speak with an asset concierge to discuss your specific mobility requirements or private fleet acquisitions.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/contact" className="px-12 py-6 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-[#C59B6D] hover:text-white transition-all shadow-2xl">
              Connect with Concierge
            </Link>
            <Link to="/inventory" className="px-12 py-6 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-white/5 transition-all">
              Browse Inventory
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;