import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, DollarSign, PenTool, TrendingUp, CheckCircle } from 'lucide-react';

const Sell: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('success');
    }, 2000);
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen pt-48 pb-32 px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-start">
          {/* Content side */}
          <div className="space-y-16">
            <header>
              <span className="text-[10px] font-black uppercase tracking-[0.6em] text-[#C59B6D] mb-6 block italic">Asset Liquidation</span>
              <h1 className="text-6xl md:text-8xl font-display font-black uppercase italic tracking-tighter leading-none mb-10">
                Maximize <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/20">Market Value</span>
              </h1>
            </header>

            <div className="space-y-8" aria-label="Our Advantages">
              {[
                { icon: PenTool, title: 'Expert Documentation', desc: 'Full high-fidelity media production and provenance verification.' },
                { icon: TrendingUp, title: 'Strategic Marketing', desc: 'Targeted placement across elite global platforms.' },
                { icon: DollarSign, title: 'Optimized Pricing', desc: 'Algorithm-driven valuation based on real-time market indices.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-8 group">
                  <div className="w-16 h-16 rounded-2xl glass border-white/5 flex items-center justify-center text-[#C59B6D] transition-all group-hover:bg-white group-hover:text-black">
                    <item.icon size={24} aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest mb-2 italic">{item.title}</h4>
                    <p className="text-[11px] text-white/30 uppercase tracking-wider leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form side */}
          <div className="glass p-12 rounded-[4rem] border-white/10 sticky top-48 shadow-2xl">
            <div className="mb-12">
              <div className="flex justify-between items-center mb-10">
                <h2 id="valuation-form-title" className="text-3xl font-display font-black uppercase italic tracking-tighter">Valuation Request</h2>
                <div className="flex gap-2" aria-hidden="true">
                  {[1, 2, 3].map(s => (
                    <div key={s} className={`h-1.5 w-8 rounded-full transition-all ${step >= s ? 'bg-[#C59B6D]' : 'bg-white/5'}`} />
                  ))}
                </div>
              </div>

              {formStatus === 'success' ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 space-y-6">
                  <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle size={40} />
                  </div>
                  <h3 className="text-2xl font-display font-bold uppercase italic tracking-tighter">Request Initialized</h3>
                  <p className="text-[10px] text-white/40 uppercase tracking-[0.2em]">Our asset analysts will contact you within 4 business hours.</p>
                </motion.div>
              ) : (
                <form 
                  onSubmit={handleFinalSubmit}
                  aria-labelledby="valuation-form-title"
                >
                  <div aria-live="polite" className="sr-only">Step {step} of 3</div>
                  
                  {/* Fixed missing AnimatePresence import */}
                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.fieldset 
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <legend className="sr-only">Vehicle Basics</legend>
                        <div className="space-y-2">
                          <label htmlFor="make-model" className="text-[9px] font-black uppercase tracking-widest opacity-30 px-6">Make & Model</label>
                          <input 
                            id="make-model"
                            type="text" 
                            required
                            placeholder="E.G. PORSCHE 911 GT3" 
                            className="w-full bg-white/5 border border-white/10 rounded-full py-5 px-8 text-[11px] font-black uppercase tracking-widest focus:ring-2 focus:ring-[#C59B6D] focus:outline-none transition-all" 
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label htmlFor="year" className="text-[9px] font-black uppercase tracking-widest opacity-30 px-6">Year</label>
                            <input id="year" type="number" required placeholder="2024" className="w-full bg-white/5 border border-white/10 rounded-full py-5 px-8 text-[11px] font-black uppercase tracking-widest focus:ring-2 focus:ring-[#C59B6D] focus:outline-none transition-all" />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="mileage" className="text-[9px] font-black uppercase tracking-widest opacity-30 px-6">Mileage</label>
                            <input id="mileage" type="text" required placeholder="5,000 MI" className="w-full bg-white/5 border border-white/10 rounded-full py-5 px-8 text-[11px] font-black uppercase tracking-widest focus:ring-2 focus:ring-[#C59B6D] focus:outline-none transition-all" />
                          </div>
                        </div>
                      </motion.fieldset>
                    )}

                    {step === 2 && (
                      <motion.fieldset 
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <legend className="sr-only">Vehicle Condition</legend>
                        <div className="space-y-2">
                          <label htmlFor="condition" className="text-[9px] font-black uppercase tracking-widest opacity-30 px-6">Vehicle Condition</label>
                          <select 
                            id="condition"
                            className="w-full bg-black/80 border border-white/10 rounded-full py-5 px-8 text-[11px] font-black uppercase tracking-widest focus:ring-2 focus:ring-[#C59B6D] focus:outline-none transition-all appearance-none"
                          >
                            <option>PRISTINE / CONCOURS</option>
                            <option>EXCELLENT</option>
                            <option>GOOD</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="price-goal" className="text-[9px] font-black uppercase tracking-widest opacity-30 px-6">Asking Price Goal</label>
                          <input id="price-goal" type="text" required placeholder="$000,000" className="w-full bg-white/5 border border-white/10 rounded-full py-5 px-8 text-[11px] font-black uppercase tracking-widest focus:ring-2 focus:ring-[#C59B6D] focus:outline-none transition-all" />
                        </div>
                      </motion.fieldset>
                    )}

                    {step === 3 && (
                      <motion.fieldset 
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <legend className="sr-only">Personal Credentials</legend>
                        <div className="space-y-2">
                          <label htmlFor="sell-name" className="text-[9px] font-black uppercase tracking-widest opacity-30 px-6">Full Name</label>
                          <input id="sell-name" type="text" required placeholder="JOHN DOE" className="w-full bg-white/5 border border-white/10 rounded-full py-5 px-8 text-[11px] font-black uppercase tracking-widest focus:ring-2 focus:ring-[#C59B6D] focus:outline-none transition-all" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="sell-email" className="text-[9px] font-black uppercase tracking-widest opacity-30 px-6">Secure Email</label>
                          <input id="sell-email" type="email" required placeholder="CONCIERGE@LEGACY.IT" className="w-full bg-white/5 border border-white/10 rounded-full py-5 px-8 text-[11px] font-black uppercase tracking-widest focus:ring-2 focus:ring-[#C59B6D] focus:outline-none transition-all" />
                        </div>
                      </motion.fieldset>
                    )}
                  </AnimatePresence>

                  <div className="pt-10 flex gap-4">
                    {step > 1 && (
                      <button 
                        type="button" 
                        onClick={() => setStep(step - 1)}
                        className="flex-1 py-5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white/5 transition-all focus:ring-2 focus:ring-white focus:outline-none"
                      >
                        Back
                      </button>
                    )}
                    <button 
                      type="button" 
                      onClick={() => {
                        if (step < 3) {
                          setStep(step + 1);
                        } else {
                          // Trigger form submit via ref or direct call if inside form
                          setFormStatus('submitting');
                          setTimeout(() => setFormStatus('success'), 2000);
                        }
                      }}
                      disabled={formStatus === 'submitting'}
                      className="flex-[2] py-5 bg-[#C59B6D] text-white rounded-full text-[10px] font-black uppercase tracking-[0.4em] hover:scale-105 shadow-xl transition-all flex items-center justify-center gap-3 focus:ring-2 focus:ring-[#C59B6D] focus:ring-offset-2 disabled:opacity-50"
                    >
                      {formStatus === 'submitting' ? 'Processing...' : step === 3 ? 'Finalize Request' : 'Continue'} 
                      {formStatus === 'idle' && <ArrowUpRight size={16} />}
                    </button>
                  </div>
                </form>
              )}
            </div>
            
            <p className="text-center text-[8px] font-black uppercase tracking-[0.3em] opacity-20">
              *By submitting you agree to our concierge privacy protocols
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sell;
