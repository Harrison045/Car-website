import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Eye, Lock, FileText } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  const sections = [
    {
      title: "Data Stewardship",
      content: "At Lumina Motors, we view your personal information as a high-fidelity asset. We collect only what is necessary to facilitate white-glove automotive experiences, including identity verification and logistics coordination."
    },
    {
      title: "Biometric Integration",
      content: "Our Lumina Select biometric protocols utilize encrypted hashing for vehicle access. Raw biometric data is never stored on our servers; it remains localized to your secure hardware tokens."
    },
    {
      title: "Logistics Transparency",
      content: "Real-time tracking of assets is restricted to authorized concierge personnel and the client. Historical movement data is purged within 30 days of rental completion to ensure absolute privacy."
    },
    {
      title: "Global Compliance",
      content: "We adhere strictly to GDPR and CCPA standards across all our global hubs (Milan, Zurich, Dubai, LA). You retain the right to request a full digital audit of your stored credentials at any time."
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
            <span className="text-[10px] font-black uppercase tracking-[0.8em]">Legal Framework</span>
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-display font-black uppercase italic tracking-tighter leading-none mb-12">
            Privacy <br /> <span className="text-black/10">Protocols</span>
          </h1>
          <p className="text-black/40 text-[12px] font-bold uppercase tracking-[0.4em] leading-loose italic">
            Effective Date: January 1, 2024. Your privacy is the foundation of our trust.
          </p>
        </header>

        <div className="space-y-24">
          {sections.map((section, idx) => (
            <motion.section 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="flex items-center gap-6 mb-8">
                <span className="text-2xl font-display font-black text-black/5 group-hover:text-black/20 transition-colors">0{idx + 1}</span>
                <h2 className="text-xs font-black uppercase tracking-[0.6em] italic">{section.title}</h2>
              </div>
              <p className="text-[14px] text-black/60 font-medium leading-[2] tracking-wide max-w-3xl pl-14">
                {section.content}
              </p>
            </motion.section>
          ))}
        </div>

        <div className="mt-40 p-16 bg-neutral-50 rounded-[3rem] border border-black/5">
          <h3 className="text-xs font-black uppercase tracking-[0.4em] mb-6 italic flex items-center gap-3">
             <ShieldCheck size={16} /> Privacy Officer
          </h3>
          <p className="text-[11px] text-black/40 font-bold uppercase tracking-widest leading-loose">
            For inquiries regarding data protection or the deletion of your Lumina Profile, please contact our dedicated DPO at <span className="text-black underline underline-offset-4">privacy@lumina.it</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;