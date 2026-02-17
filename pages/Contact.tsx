import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Globe,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success"
  >("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    setTimeout(() => {
      setFormStatus("success");
    }, 1500);
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen pt-48 pb-32 px-6">
      <div className="max-w-[1400px] mx-auto">
        <header className="mb-24">
          <span className="text-[10px] font-black uppercase tracking-[0.8em] text-[#C59B6D] mb-8 block text-center">
            Inquiry Concierge
          </span>
          <h1 className="text-6xl md:text-[8rem] font-display font-black uppercase italic tracking-tighter leading-none text-center">
            Let's{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/20">
              Connect
            </span>
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
          {/* Contact Details */}
          <section aria-labelledby="inquiry-details" className="space-y-16">
            <h2
              id="inquiry-details"
              className="text-4xl font-display font-black uppercase italic tracking-tighter"
            >
              General inquiries
            </h2>
            <div className="space-y-12">
              <button className="flex gap-8 items-center group text-left focus:outline-none">
                <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#C59B6D] group-focus:bg-[#C59B6D] transition-all">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] opacity-30 mb-2 italic">
                    Send Email
                  </p>
                  <a href="mailto:">
                    <p className="text-lg font-bold">concierge@lumina.it</p>
                  </a>
                </div>
              </button>
              <button className="flex gap-8 items-center group text-left focus:outline-none">
                <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#C59B6D] group-focus:bg-[#C59B6D] transition-all">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] opacity-30 mb-2 italic">
                    Global Hotline
                  </p>
                  <a href="tel:+">
                    <p className="text-lg font-bold">+39 (03) 21 05 75 190</p>
                  </a>
                </div>
              </button>
            </div>

            <div className="p-12 glass rounded-[3rem] border-white/5 flex items-center gap-8">
              <Globe size={48} className="text-white/10" aria-hidden="true" />
              <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-40 leading-loose">
                Operating with logistics partners across Europe, North America,
                and the Middle East for seamless global delivery.
              </p>
            </div>
          </section>

          {/* Form */}
          <div className="glass p-16 rounded-[4rem] border-white/10">
            <h3
              id="contact-form-title"
              className="text-2xl font-display font-black uppercase italic tracking-tighter mb-12"
            >
              Bespoke inquiry
            </h3>

            {formStatus === "success" ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 bg-[#C59B6D]/20 text-[#C59B6D] rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle size={40} />
                </div>
                <h4 className="text-2xl font-display font-bold uppercase italic tracking-tighter mb-4">
                  Message Transmitted
                </h4>
                <p className="text-[10px] text-white/40 uppercase tracking-[0.3em] leading-relaxed">
                  Your concierge representative will respond shortly.
                </p>
                <button
                  onClick={() => setFormStatus("idle")}
                  className="mt-12 text-[9px] font-black uppercase tracking-[0.5em] border-b border-white/20 pb-2 hover:border-white transition-all"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                aria-labelledby="contact-form-title"
                className="space-y-8"
              >
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="sr-only">
                      Given Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      required
                      placeholder="GIVEN NAME"
                      className="bg-transparent border-b border-white/10 py-4 px-2 text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-[#C59B6D] transition-all w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="sr-only">
                      Family Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      required
                      placeholder="FAMILY NAME"
                      className="bg-transparent border-b border-white/10 py-4 px-2 text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-[#C59B6D] transition-all w-full"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="sr-only">
                    Secure Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="SECURE EMAIL"
                    className="bg-transparent border-b border-white/10 py-4 px-2 text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-[#C59B6D] transition-all w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="interest" className="sr-only">
                    Select Interest
                  </label>
                  <select
                    id="interest"
                    required
                    className="bg-[#050505] border-none border-b border-white/10 py-4 px-2 text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-[#C59B6D] transition-all w-full appearance-none"
                  >
                    <option value="">SELECT INTEREST</option>
                    <option value="rental">ASSET RENTAL</option>
                    <option value="consignment">CONSIGNMENT</option>
                    <option value="financing">FINANCING</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="sr-only">
                    Message Detail
                  </label>
                  <textarea
                    id="message"
                    required
                    placeholder="MESSAGE DETAIL"
                    rows={4}
                    className="bg-transparent border-b border-white/10 py-4 px-2 text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-[#C59B6D] transition-all w-full resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className="w-full py-6 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-[0.5em] hover:bg-[#C59B6D] hover:text-white transition-all shadow-xl flex items-center justify-center gap-4 group focus:ring-2 focus:ring-white focus:ring-offset-2 disabled:opacity-50"
                >
                  {formStatus === "submitting"
                    ? "Processing..."
                    : "Send Inquiry"}
                  {formStatus === "idle" && (
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-2 transition-transform"
                    />
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
