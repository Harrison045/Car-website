import React from 'react';
import { motion } from 'framer-motion';
import { Scale, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

const TermsOfUse: React.FC = () => {
  const terms = [
    {
      title: "Asset Stewardship",
      content: "Users agree to treat Lumina assets with the utmost respect for their mechanical and aesthetic integrity. Unauthorized modification of any vehicle hardware or software is strictly prohibited."
    },
    {
      title: "Operator Credentials",
      content: "Operation of a Lumina asset requires a valid, high-tier international operator's license. For specific high-performance hypercars, a Lumina-certified safety briefing may be mandatory."
    },
    {
      title: "Jurisdictional Boundaries",
      content: "Assets are permitted for use within the specific geographical boundaries defined in the rental agreement. Crossing international borders without explicit concierge authorization is a violation of these terms."
    },
    {
      title: "Liability & Insurance",
      content: "While Lumina provides comprehensive elite insurance, the operator remains responsible for any damage resulting from negligence, reckless operation, or use on non-sanctioned racing circuits."
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
            <span className="text-[10px] font-black uppercase tracking-[0.8em]">Governance</span>
          </motion.div>
          <h1 className="text-6xl md:text-[7rem] font-display font-black uppercase italic tracking-tighter leading-none mb-12">
            Terms <br /> <span className="text-black/10">Of Use</span>
          </h1>
          <p className="text-black/40 text-[12px] font-bold uppercase tracking-[0.4em] leading-loose italic">
            Defining the parameters of the Lumina acquisition experience.
          </p>
        </header>

        <div className="space-y-32">
          {terms.map((term, idx) => (
            <motion.section 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="flex items-baseline gap-10 mb-8 border-b border-black/5 pb-8">
                <span className="text-sm font-black font-display opacity-10">/0{idx + 1}</span>
                <h2 className="text-2xl font-display font-black uppercase italic tracking-tighter">{term.title}</h2>
              </div>
              <p className="text-[15px] text-black/60 font-medium leading-[1.8] tracking-wide max-w-3xl">
                {term.content}
              </p>
            </motion.section>
          ))}
        </div>

        <section className="mt-60 border-t-2 border-black py-20">
          <div className="flex flex-col md:flex-row gap-16 items-start">
             <div className="md:w-1/3">
                <h3 className="text-xs font-black uppercase tracking-[0.4em] italic mb-6">Concierge Notice</h3>
                <AlertCircle size={32} strokeWidth={1.5} />
             </div>
             <div className="md:w-2/3">
                <p className="text-[11px] text-black/40 font-bold uppercase tracking-widest leading-loose mb-10">
                  By accessing the Lumina platform and initializing an asset request, you signify your unreserved acceptance of these governance protocols. Lumina reserves the right to terminate access for any violation of mechanical or operational safety standards.
                </p>
                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest">
                   <CheckCircle2 size={16} className="text-emerald-500" />
                   Verified Compliance Standards 2024
                </div>
             </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TermsOfUse;