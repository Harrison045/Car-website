import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Wallet, Percent, ShieldCheck, ArrowRight, CheckCircle } from 'lucide-react';

const Financing: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState(120000);
  const [term, setTerm] = useState(60);
  const [rate, setRate] = useState(4.5);
  const [payment, setPayment] = useState('0');

  // Form State
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  useEffect(() => {
    const r = rate / 100 / 12;
    const n = term;
    const p = loanAmount;
    const m = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setPayment(m.toFixed(2));
  }, [loanAmount, term, rate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ firstName: '', lastName: '', email: '' });
    }, 2000);
  };

  return (
    <div className="pt-48 pb-32 px-6 bg-[#fafafa] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-[10px] text-black/30 uppercase tracking-[0.6em] font-black mb-6 block italic">Capital Solutions</span>
            <h1 className="text-6xl md:text-8xl font-display font-bold uppercase italic tracking-tighter mb-8 leading-[0.8] text-black">Financial <br /> Orchestration</h1>
            <p className="text-black/40 max-w-2xl mx-auto uppercase text-[9px] tracking-[0.4em] leading-loose font-bold italic">Bespoke capital arrangements for world-class performance acquisitions.</p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Calculator Section */}
          <section aria-labelledby="calc-title" className="space-y-10">
            <h2 id="calc-title" className="text-3xl font-bold font-display uppercase italic tracking-tighter mb-8 text-black">Projection Matrix</h2>
            <div className="p-8 glass-light rounded-[2.5rem] border-black/5 space-y-10 shadow-xl bg-white">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <label htmlFor="loan-range" className="text-[9px] font-black uppercase tracking-[0.3em] text-black/40 italic">Asset Value Allocation</label>
                  <span className="text-2xl font-black italic tracking-tighter text-black">${loanAmount.toLocaleString()}</span>
                </div>
                <input 
                  id="loan-range"
                  type="range" min="30000" max="1000000" step="5000"
                  aria-valuemin={30000} aria-valuemax={1000000} aria-valuenow={loanAmount}
                  value={loanAmount} onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-black/5 rounded-full appearance-none cursor-pointer accent-black focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              
              <div role="group" aria-labelledby="term-label">
                <span id="term-label" className="text-[9px] font-black uppercase tracking-[0.3em] text-black/40 italic mb-6 block">Duration Cycle (Months)</span>
                <div className="flex gap-3">
                  {[36, 48, 60, 72, 84].map(t => (
                    <button 
                      key={t} onClick={() => setTerm(t)}
                      aria-pressed={term === t}
                      className={`flex-1 py-4 rounded-[1rem] text-[9px] font-bold uppercase tracking-widest transition-all focus:outline-none focus:ring-2 focus:ring-black ${term === t ? 'bg-black text-white shadow-lg' : 'bg-black/5 text-black/40 hover:bg-black/10'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-6">
                  <label htmlFor="rate-range" className="text-[9px] font-black uppercase tracking-[0.3em] text-black/40 italic">Select Rate (%)</label>
                  <span className="text-2xl font-black italic tracking-tighter text-black">{rate}%</span>
                </div>
                <input 
                  id="rate-range"
                  type="range" min="0.1" max="12" step="0.1"
                  value={rate} onChange={(e) => setRate(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-black/5 rounded-full appearance-none cursor-pointer accent-black focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            <div className="p-12 bg-black rounded-[2.5rem] text-white text-center shadow-2xl" aria-live="polite">
              <span className="text-[9px] font-black uppercase tracking-[0.5em] mb-4 block italic opacity-50">Projected Monthly Amortization</span>
              <div className="text-6xl font-display font-bold tracking-tighter mb-6 leading-none italic">${Math.round(parseFloat(payment)).toLocaleString()}</div>
            </div>
          </section>

          {/* Pre-Approval Form Section */}
          <section aria-labelledby="form-title" className="space-y-16">
            <div className="pt-12 border-t border-black/5">
              <h3 id="form-title" className="text-xl font-bold font-display uppercase italic tracking-widest mb-8 text-black">Initialize Pre-Approval</h3>
              <form 
                className="space-y-4 max-w-lg" 
                onSubmit={handleSubmit}
                aria-label="Financing pre-approval form"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="sr-only">Given Name</label>
                    <input 
                      id="firstName"
                      type="text" 
                      required 
                      aria-required="true"
                      placeholder="GIVEN NAME" 
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="w-full bg-white border border-black/10 rounded-full px-6 py-4 text-[10px] font-bold uppercase tracking-widest focus:ring-2 focus:ring-black focus:outline-none shadow-sm" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="sr-only">Family Name</label>
                    <input 
                      id="lastName"
                      type="text" 
                      required 
                      aria-required="true"
                      placeholder="FAMILY NAME" 
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="w-full bg-white border border-black/10 rounded-full px-6 py-4 text-[10px] font-bold uppercase tracking-widest focus:ring-2 focus:ring-black focus:outline-none shadow-sm" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="finance-email" className="sr-only">Secure Email</label>
                  <input 
                    id="finance-email"
                    type="email" 
                    required 
                    aria-required="true"
                    placeholder="SECURE EMAIL" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white border border-black/10 rounded-full px-6 py-4 text-[10px] font-bold uppercase tracking-widest focus:ring-2 focus:ring-black focus:outline-none shadow-sm" 
                  />
                </div>
                <button 
                  type="submit"
                  disabled={formStatus === 'submitting' || formStatus === 'success'}
                  className="w-full py-5 bg-[#C59B6D] text-white font-black uppercase text-[10px] tracking-[0.4em] rounded-full hover:bg-opacity-90 transition-all shadow-xl flex items-center justify-center gap-3 focus:ring-2 focus:ring-[#C59B6D] focus:ring-offset-2 disabled:opacity-50"
                >
                  {formStatus === 'submitting' ? 'Processing...' : formStatus === 'success' ? <><CheckCircle size={16}/> Application Sent</> : 'Request Application'}
                  {formStatus === 'idle' && <ArrowRight size={16} />}
                </button>
                <div aria-live="polite">
                   {formStatus === 'success' && <p className="text-center text-[8px] font-black uppercase tracking-[0.2em] text-emerald-600 mt-4">Your request has been prioritized for concierge review.</p>}
                </div>
                <p className="text-center text-[8px] font-bold text-black/20 uppercase tracking-[0.2em]">Secure Encryption Active • No Impact on Credit Score</p>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Financing;