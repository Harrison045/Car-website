import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

interface CustomSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  bgClass?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ 
  label, 
  value, 
  options, 
  onChange,
  bgClass = "bg-white"
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

  return (
    <div className={`relative px-5 py-3 border-r border-black/5 ${bgClass} transition-colors cursor-pointer group h-full flex flex-col justify-center`} ref={containerRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-full flex flex-col justify-center"
      >
        <p className="text-[7px] font-black uppercase tracking-widest text-black/30 mb-0.5 group-hover:text-[#C59B6D] transition-colors">{label}</p>
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-bold uppercase tracking-tight text-black truncate">{value}</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown size={12} className={`text-black/40 group-hover:text-black transition-colors ${isOpen ? 'text-[#C59B6D]' : ''}`} />
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
            className="absolute bottom-[calc(100%+8px)] left-0 w-full min-w-[200px] bg-white rounded-xl shadow-2xl border border-black/5 py-2 z-50 overflow-hidden"
          >
            <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
              {options.map((option) => (
                <div
                  key={option}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className={`px-5 py-3 flex items-center justify-between hover:bg-neutral-50 cursor-pointer transition-colors ${value === option ? 'bg-neutral-50' : ''}`}
                >
                  <span className={`text-[10px] uppercase tracking-widest ${value === option ? 'font-black text-black' : 'font-bold text-black/60'}`}>
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
