import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Clock, Phone } from 'lucide-react';

const Locations: React.FC = () => {
  const hubs = [
    {
      city: 'Milan',
      country: 'Italy',
      address: 'Via Callicratide 36, Roisan, Aosta(AO), 11100',
      phone: '+39 0321 0575190',
      hours: '08:00 AM - 06:00 PM (CET)',
      image: 'https://images.unsplash.com/photo-1520622730324-42f5be38f4d5?auto=format&fit=crop&q=80&w=1200',
      type: 'Global HQ'
    },
    {
      city: 'Zurich',
      country: 'Switzerland',
      address: 'Bahnhofstrasse 45, 8001 Zürich',
      phone: '+41 44 211 40 00',
      hours: '09:00 AM - 05:00 PM (CET)',
      image: 'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?auto=format&fit=crop&q=80&w=1200',
      type: 'Finance Hub'
    },
    {
      city: 'Dubai',
      country: 'UAE',
      address: 'Burj Khalifa District, Downtown Dubai',
      phone: '+971 4 888 8888',
      hours: '10:00 AM - 10:00 PM (GST)',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1200',
      type: 'Luxury Hub'
    },
    {
      city: 'Los Angeles',
      country: 'USA',
      address: '9000 Sunset Blvd, West Hollywood, CA 90069',
      phone: '+1 310-278-5444',
      hours: '08:00 AM - 08:00 PM (PST)',
      image: 'https://images.unsplash.com/photo-1542736668-939a1740954b?auto=format&fit=crop&q=80&w=1200',
      type: 'North American Hub'
    }
  ];

  return (
    <div className="bg-[#050505] text-white min-h-screen pt-48 pb-32 px-6">
      <div className="max-w-[1600px] mx-auto">
        <header className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="h-px w-12 bg-[#C59B6D]" />
            <span className="text-[10px] font-black uppercase tracking-[0.8em] text-[#C59B6D]">Global Network</span>
          </motion.div>
          <h1 className="text-6xl md:text-[8rem] font-display font-black uppercase italic tracking-tighter leading-none mb-12">
            The <br /> <span className="text-white/10">Presence</span>
          </h1>
          <p className="max-w-2xl text-white/40 text-[11px] font-black uppercase tracking-[0.4em] leading-loose italic">
            Strategically positioned at the world's most influential intersections to facilitate seamless transitions between masterpiece assets.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {hubs.map((hub, idx) => (
            <motion.div
              key={hub.city}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group glass rounded-[4rem] overflow-hidden border-white/5 hover:border-white/20 transition-all shadow-2xl"
            >
              <div className="aspect-[21/9] overflow-hidden">
                <img src={hub.image} className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110" alt={hub.city} />
              </div>
              <div className="p-12">
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#C59B6D] mb-4 block italic">{hub.type}</span>
                    <h3 className="text-4xl font-display font-black uppercase italic tracking-tighter">{hub.city}</h3>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">{hub.country}</p>
                  </div>
                  <button className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all group/btn">
                    <Navigation size={20} className="group-hover/btn:scale-110 transition-transform" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 border-t border-white/5 pt-10">
                  <div className="space-y-6">
                    <div className="flex gap-4 items-start">
                      <MapPin size={14} className="text-[#C59B6D] shrink-0" />
                      <p className="text-[10px] font-black uppercase tracking-widest leading-loose text-white/60">{hub.address}</p>
                    </div>
                    <div className="flex gap-4 items-center">
                      <Phone size={14} className="text-[#C59B6D] shrink-0" />
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/60">{hub.phone}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <Clock size={14} className="text-[#C59B6D] shrink-0" />
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 mb-2">Operational Hours</p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/60">{hub.hours}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Locations;