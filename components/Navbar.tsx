import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import UserProfile from './UserProfile';
import AuthModal from './AuthModal';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'About', path: '/about' },
    { name: 'Vehicles', path: '/inventory' },
    { name: 'Booking', path: '/booking' },
    { name: 'Contacts', path: '/contact' },
  ];

  const isTransparentState = !scrolled;

  return (
   <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        !isTransparentState 
          ? 'bg-white border-b border-black/5 shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 flex justify-between items-center h-[64px] md:h-[80px]">
        {/* Left Links - Hidden on mobile */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-[9px] sm:text-[10px] font-bold tracking-[0.25em] uppercase transition-all hover:opacity-100 ${
                isTransparentState ? 'text-white/70 hover:text-white' : 'text-black/60 hover:text-black'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Center Logo */}
        <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 group z-10">
          <span className={`font-display text-2xl sm:text-3xl font-bold tracking-[-0.1em] uppercase transition-colors duration-500 ${
            isTransparentState ? 'text-white' : 'text-black'
          }`}>
            Lumina
          </span>
        </Link>

        {/* Right Tools */}
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
          <div className={`hidden sm:flex items-center gap-2 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest cursor-pointer transition-colors duration-500 ${
            isTransparentState ? 'text-white/70' : 'text-black/60'
          }`}>
            <Globe size={12} className="sm:w-3.5 sm:h-3.5" />
            <span className="hidden md:inline">ENG</span>
          </div>
          {isAuthenticated ? (
            <UserProfile />
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className={`w-10 h-10 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-all hover:scale-110 min-w-[40px] min-h-[40px] ${
                isTransparentState 
                  ? 'border-white/20 text-white' 
                  : 'border-black/10 text-black'
              }`}
            >
              <User size={16} className="sm:w-[18px] sm:h-[18px]" />
            </button>
          )}
          <button 
            className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center -mr-2" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <X className={`w-6 h-6 ${isTransparentState ? 'text-white' : 'text-black'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isTransparentState ? 'text-white' : 'text-black'}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-white z-[60] flex flex-col p-8 sm:p-12 lg:hidden overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-16 sm:mb-20">
              <span className="font-display text-2xl font-bold tracking-tighter uppercase text-black">Lumina</span>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-black min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Close menu"
              >
                <X size={32} />
              </button>
            </div>
            <div className="flex flex-col gap-8 sm:gap-10">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  onClick={() => setIsOpen(false)} 
                  className="text-4xl sm:text-5xl font-display font-bold uppercase tracking-tighter text-black hover:text-[#C59B6D] transition-colors min-h-[44px] flex items-center"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            {/* Mobile Menu Footer */}
            <div className="mt-auto pt-12 border-t border-black/5">
              <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-black/40 mb-6">
                <Globe size={16} />
                <span>English</span>
              </div>
              <p className="text-xs text-black/30 uppercase tracking-wider">
                Via Callicratide 36<br />
                Roisan, Aosta(AO), 11100
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </nav>
  );
};

export default Navbar;