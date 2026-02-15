import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Shield, Zap, Award, Briefcase, Handshake } from 'lucide-react';

const Partners: React.FC = () => {
  const categories = [
    {
      title: "Technical Pioneers",
      partners: [
        { name: "Apex Engineering", role: "Drivetrain Development", logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200" },
        { name: "Nebula Dynamics", role: "Battery Architecture", logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=200" },
        { name: "Zenith Aero", role: "Active Aerodynamics", logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=200" }
      ]
    },
    {
      title: "Logistics & Security",
      partners: [
        { name: "Titan Vaults", role: "Asset Storage", logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=200" },
        { name: "Vanguard Global", role: "Enclosed Transport", logo: "https://images.unsplash.com/photo-1507206130118-b5907f817163?auto=format&fit=crop&q=80&w=200" },
        { name: "Shield Biometrics", role: "Access Protocols", logo: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=200" }
      ]
    }
  ];

  return (
    <div className="bg-[#050505] text-white min-h-screen pt-48 pb-32 px-6">
      <div className="max-w-[1400px] mx-auto">
        <header className="mb-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4 mb-10"
          >
            <div className="h-px w-12 bg-[#C59B6D]" />
            <span className="text-[10px] font-black uppercase tracking-[0.8em] text-[#C59B6D]">Strategic Alliances</span>
            <div className="h-px w-12 bg-[#C59B6D]" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-6xl md:text-8xl font-display font-black uppercase italic tracking-tighter leading-none mb-12"
          >
            The Lumina <br /> <span className="text-white/20">Ecosystem</span>
          </motion.h1>
          <p className="max-w-2xl mx-auto text-white/40 text-[11px] font-black uppercase tracking-[0.4em] leading-loose italic">
            Collaborating with the world's most innovative entities to ensure every Lumina asset exceeds the boundaries of traditional luxury.
          </p>
        </header>

        <div className="space-y-40">
          {categories.map((cat, idx) => (
            <section key={idx}>
              <h2 className="text-xs font-black uppercase tracking-[0.6em] text-[#C59B6D] mb-16 italic flex items-center gap-4">
                <Handshake size={14} /> {cat.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {cat.partners.map((partner, pIdx) => (
                  <motion.div
                    key={pIdx}
                    whileHover={{ y: -10 }}
                    className="glass p-12 rounded-[3.5rem] border-white/5 hover:border-[#C59B6D]/30 transition-all group"
                  >
                    <div className="w-20 h-20 rounded-2xl overflow-hidden mb-10 grayscale group-hover:grayscale-0 transition-all duration-700 border border-white/10">
                      <img src={partner.logo} className="w-full h-full object-cover" alt={partner.name} />
                    </div>
                    <h4 className="text-xl font-display font-black uppercase italic tracking-tighter mb-4">{partner.name}</h4>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/30">{partner.role}</p>
                  </motion.div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-60 p-20 glass rounded-[4rem] border-white/10 text-center">
          <h3 className="text-3xl font-display font-black uppercase italic tracking-tighter mb-8">Join the Vanguard</h3>
          <p className="text-[11px] text-white/40 font-black uppercase tracking-[0.3em] mb-12 max-w-xl mx-auto">
            We are always seeking exceptional partners who share our commitment to performance, aesthetics, and mechanical purity.
          </p>
          <button className="px-12 py-6 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-[#C59B6D] hover:text-white transition-all">
            Initiate Partnership Inquiry
          </button>
        </section>
      </div>
    </div>
  );
};

export default Partners;