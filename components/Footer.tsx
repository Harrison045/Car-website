import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A0A0A] text-white pt-32 pb-16 px-8">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
          {/* Brand Info */}
          <div>
            <Link to="/" className="inline-block mb-10">
              <span className="font-display text-4xl font-bold tracking-tighter uppercase">Lumina</span>
            </Link>
            <div className="space-y-4 text-xs font-bold tracking-wider opacity-40 leading-loose uppercase">
              <p>Via Callicratide 36</p>
              <p>Roisan, Aosta(AO), 11100</p>
              <p>0321 0575190</p>
            </div>
            <div className="flex gap-6 mt-10">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, idx) => (
                <a key={idx} href="#" className="opacity-30 hover:opacity-100 transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav Columns */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.5em] mb-12 opacity-30">For Renters</h4>
            <ul className="space-y-6 text-[10px] font-bold uppercase tracking-widest opacity-60">
              <li><Link to="/about" className="hover:text-[#C59B6D]">About Us</Link></li>
              <li><Link to="/inventory" className="hover:text-[#C59B6D]">Our Fleet</Link></li>
              <li><Link to="/locations" className="hover:text-[#C59B6D]">Locations</Link></li>
              <li><Link to="/faq" className="hover:text-[#C59B6D]">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.5em] mb-12 opacity-30">Resources</h4>
            <ul className="space-y-6 text-[10px] font-bold uppercase tracking-widest opacity-60">
              <li><Link to="/blog" className="hover:text-[#C59B6D]">Media & Blog</Link></li>
              <li><Link to="/partners" className="hover:text-[#C59B6D]">Partners</Link></li>
              <li><Link to="/privacy" className="hover:text-[#C59B6D]">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-[#C59B6D]">Terms of Use</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.5em] mb-12 opacity-30">Contact Us</h4>
            <div className="space-y-6 text-[10px] font-bold uppercase tracking-widest opacity-60 leading-relaxed">
              <p>Monday - Sunday<br />8:00 AM - 6:00 PM (CET)</p>
              <p>Hotline: 978-806-3277</p>
              <p>Email: concierge@lumina.it</p>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[8px] font-black uppercase tracking-[0.6em] opacity-20">
          <p>© 2024 Lumina Motors Italy. All Rights Reserved.</p>
          <div className="flex gap-10 mt-4 md:mt-0">
            <span>Sitemap</span>
            <span>Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;