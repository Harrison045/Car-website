import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

interface CustomSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  bgClass?: string;
  theme?: 'light' | 'dark';
}

const CustomSelect: React.FC<CustomSelectProps> = ({ 
  label, 
  value, 
  options, 
  onChange,
  bgClass = "bg-white",
  theme = 'light'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const textColor = theme === 'dark' ? 'text-white' : 'text-black';
  const labelColor = theme === 'dark' ? 'text-white/40' : 'text-black/40';
  const chevronColor = theme === 'dark' ? 'text-white/30 group-hover:text-white' : 'text-black/30 group-hover:text-black';
  const dropdownBg = theme === 'dark' ? 'bg-neutral-800 border-white/10 text-white' : 'bg-white border-black/5 text-black';
  const hoverBg = theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-neutral-50';
  const selectedBg = theme === 'dark' ? 'bg-white/10' : 'bg-neutral-50';

  return (
    <div className={`relative px-5 py-3 ${bgClass} transition-all duration-300 cursor-pointer group h-full flex flex-col justify-center rounded-xl hover:shadow-md`} ref={containerRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-full flex flex-col justify-center"
      >
        <p className={`text-[9px] font-bold uppercase tracking-widest ${labelColor} mb-1 group-hover:text-[#C59B6D] transition-colors`}>{label}</p>
        <div className="flex items-center justify-between gap-2">
          <span className={`text-[13px] font-bold uppercase tracking-tight ${textColor} truncate`}>{value}</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown size={14} className={`${chevronColor} transition-colors ${isOpen ? 'text-[#C59B6D]' : ''}`} />
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`absolute bottom-[calc(100%+12px)] left-0 w-full min-w-[220px] rounded-2xl shadow-2xl border py-2 z-50 overflow-hidden ${dropdownBg}`}
          >
            <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
              {options.map((option) => (
                <div
                  key={option}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className={`px-5 py-3 flex items-center justify-between cursor-pointer transition-colors ${hoverBg} ${value === option ? selectedBg : ''}`}
                >
                  <span className={`text-[11px] uppercase tracking-widest ${value === option ? 'font-black' : 'font-bold opacity-60'}`}>
                    {option}
                  </span>
                  {value === option && <Check size={12} className="text-[#C59B6D]" />}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomSelect;
