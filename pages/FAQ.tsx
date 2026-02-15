import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Shield, CreditCard, Key } from 'lucide-react';

const FAQ: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(0);

  const categories = [
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
    },
    {
      title: "Financial Orchestration",
      icon: <CreditCard size={18} />,
      questions: [
        { q: "Do you accept crypto-assets for payment?", a: "We facilitate high-fidelity transfers across major fiat currencies and select digital assets including BTC and ETH for verified Lumina members." },
        { q: "Are there long-term lease options?", a: "Our 'Lumina Portfolio' program offers 6-month and 12-month rotating access to the entire fleet with preferential capital rates." }
      ]
    }
  ];

  return (
    <div className="bg-white text-black min-h-screen pt-48 pb-32 px-6">
      <div className="max-w-[1000px] mx-auto">
        <header className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="h-px w-12 bg-black" />
            <span className="text-[10px] font-black uppercase tracking-[0.8em]">Knowledge Base</span>
          </motion.div>
          <h1 className="text-6xl md:text-[7rem] font-display font-black uppercase italic tracking-tighter leading-none mb-12">
            Asset <br /> <span className="text-black/10">Inquiry</span>
          </h1>
          <p className="text-black/40 text-[12px] font-bold uppercase tracking-[0.4em] leading-loose italic max-w-xl">
            Technical guidance and operational protocols for the discerning Lumina client.
          </p>
        </header>

        <div className="space-y-24">
          {categories.map((cat, catIdx) => (
            <section key={catIdx}>
              <div className="flex items-center gap-4 mb-12">
                <div className="p-3 bg-neutral-100 rounded-xl text-black/40">
                  {cat.icon}
                </div>
                <h2 className="text-xs font-black uppercase tracking-[0.6em] italic">{cat.title}</h2>
              </div>
              
              <div className="space-y-4">
                {cat.questions.map((item, qIdx) => {
                  const globalIdx = catIdx * 10 + qIdx;
                  const isOpen = activeIdx === globalIdx;
                  
                  return (
                    <div 
                      key={qIdx} 
                      className={`rounded-[2rem] border transition-all duration-500 overflow-hidden ${isOpen ? 'bg-neutral-50 border-black/5 shadow-xl' : 'bg-transparent border-transparent hover:border-black/5'}`}
                    >
                      <button 
                        onClick={() => setActiveIdx(isOpen ? null : globalIdx)}
                        className="w-full px-10 py-8 flex justify-between items-center text-left focus:outline-none"
                      >
                        <span className="text-sm font-black uppercase tracking-widest">{item.q}</span>
                        <ChevronDown size={20} className={`transition-transform duration-500 ${isOpen ? 'rotate-180 text-black' : 'text-black/20'}`} />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                          >
                            <div className="px-10 pb-10">
                              <p className="text-[14px] text-black/50 font-medium leading-[1.8] tracking-wide border-t border-black/5 pt-8">
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
            </section>
          ))}
        </div>

        <section className="mt-40 p-20 glass-light rounded-[4rem] border-black/5 text-center bg-neutral-50">
          <HelpCircle size={40} strokeWidth={1.5} className="mx-auto mb-8 text-black/20" />
          <h3 className="text-2xl font-display font-black uppercase italic tracking-tighter mb-6">Further Clarity?</h3>
          <p className="text-[11px] text-black/40 font-black uppercase tracking-[0.3em] mb-12">
            If your inquiry remains unaddressed, initialize a direct link with our asset concierges.
          </p>
          <button className="px-12 py-6 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-[#C59B6D] transition-all">
            Contact Specialist
          </button>
        </section>
      </div>
    </div>
  );
};

export default FAQ;