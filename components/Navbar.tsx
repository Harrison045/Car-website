import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', path: '/about' },
    { name: 'Vehicles', path: '/inventory' },
    { name: 'Booking', path: '/booking' },
    { name: 'Contacts', path: '/contact' },
  ];

  // Logic to determine if we are on the Home page and haven't scrolled yet
  const isTransparentState = location.pathname === '/' && !scrolled;

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'py-4 bg-white border-b border-black/5 shadow-sm' 
          : 'py-8 bg-transparent'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-8 flex justify-between items-center">
        {/* Left Links */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-[10px] font-bold tracking-[0.25em] uppercase transition-all hover:opacity-100 ${
                isTransparentState ? 'text-white/70 hover:text-white' : 'text-black/60 hover:text-black'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Center Logo */}
        <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 group">
          <span className={`font-display text-3xl font-bold tracking-[-0.1em] uppercase transition-colors duration-500 ${
            isTransparentState ? 'text-white' : 'text-black'
          }`}>
            Lumina
          </span>
        </Link>

        {/* Right Tools */}
        <div className="flex items-center gap-8">
          <div className={`hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest cursor-pointer transition-colors duration-500 ${
            isTransparentState ? 'text-white/70' : 'text-black/60'
          }`}>
            <Globe size={14} />
            <span>ENG</span>
          </div>
          <Link 
            to="/contact" 
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:scale-110 ${
              isTransparentState 
                ? 'border-white/20 text-white' 
                : 'border-black/10 text-black'
            }`}
          >
            <User size={18} />
          </Link>
          <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <X className={isTransparentState ? 'text-white' : 'text-black'} />
            ) : (
              <Menu className={isTransparentState ? 'text-white' : 'text-black'} />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-white z-[60] flex flex-col p-12 lg:hidden"
          >
            <div className="flex justify-between items-center mb-20">
              <span className="font-display text-2xl font-bold tracking-tighter uppercase text-black">Lumina</span>
              <button onClick={() => setIsOpen(false)} className="text-black"><X size={32} /></button>
            </div>
            <div className="flex flex-col gap-10">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  onClick={() => setIsOpen(false)} 
                  className="text-5xl font-display font-bold uppercase tracking-tighter text-black hover:text-[#C59B6D] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;