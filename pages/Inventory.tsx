import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, List, SlidersHorizontal, ArrowUpRight, Search, X } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';

// Import Car interface for type safety
import { Car } from '../types';

const SkeletonCard: React.FC<{ view: 'grid' | 'list' }> = ({ view }) => (
  <div 
    aria-hidden="true"
    className={`glass rounded-[3rem] overflow-hidden flex flex-col animate-pulse ${view === 'list' ? 'md:flex-row md:h-72' : ''}`}
  >
    <div className={`${view === 'list' ? 'md:w-[40%] h-64 md:h-full' : 'aspect-[16/10]'} bg-white/5 relative overflow-hidden`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
    </div>
    <div className="p-10 flex-1 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-6">
          <div className="space-y-3">
            <div className="h-8 w-48 bg-white/10 rounded-lg" />
            <div className="h-8 w-32 bg-white/5 rounded-lg" />
          </div>
          <div className="h-8 w-20 bg-white/10 rounded-lg" />
        </div>
        <div className="h-3 w-40 bg-white/5 rounded-full" />
      </div>
      <div className="flex justify-between items-center pt-8 border-t border-white/5">
        <div className="flex gap-3">
          <div className="h-6 w-16 bg-white/5 rounded-full" />
          <div className="h-6 w-16 bg-white/5 rounded-full" />
        </div>
        <div className="h-8 w-24 bg-white/10 rounded-full" />
      </div>
    </div>
  </div>
);

const Inventory: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [filters, setFilters] = useState({
    make: 'All',
    bodyType: 'All',
    fuelType: 'All',
    transmission: 'All',
    maxPrice: 500000
  });
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch cars from backend
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:5050/api/cars');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [search, filters]);

  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      // Defensive: Check if car exists and has required properties
      if (!car || typeof car !== 'object') return false;
      
      const carMake = car.make || '';
      const carModel = car.model || '';
      const carBodyType = car.bodyType || '';
      const carFuelType = car.fuelType || '';
      const carTransmission = car.transmission || '';
      const carPrice = car.price || 0;
      
      const matchesSearch = carMake.toLowerCase().includes(search.toLowerCase()) || 
                          carModel.toLowerCase().includes(search.toLowerCase());
      const matchesMake = filters.make === 'All' || carMake === filters.make;
      const matchesBody = filters.bodyType === 'All' || carBodyType === filters.bodyType;
      const matchesFuel = filters.fuelType === 'All' || carFuelType === filters.fuelType;
      const matchesTransmission = filters.transmission === 'All' || carTransmission === filters.transmission;
      const matchesPrice = carPrice <= filters.maxPrice;
      
      return matchesSearch && matchesMake && matchesBody && matchesFuel && matchesTransmission && matchesPrice;
    });
  }, [search, filters, cars]);

  const makes = ['All', ...new Set(cars.map(c => c.make || '').filter(Boolean))];
  const bodies = ['All', ...new Set(cars.map(c => c.bodyType || '').filter(Boolean))];

  return (
    <div className="pt-48 pb-32 px-6 bg-[#050505] min-h-screen">
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-12">
          <div>
            <span className="text-[10px] text-white/40 uppercase tracking-[0.6em] font-black mb-6 block italic">Elite Collection</span>
            <h1 className="text-6xl md:text-8xl font-display font-black uppercase italic tracking-tighter mb-6 leading-none">The Fleet</h1>
            <p 
              aria-live="polite"
              className="text-white/50 uppercase text-[10px] tracking-[0.3em] font-black"
            >
              {isLoading ? 'Synchronizing Asset Database...' : `Currently Curating ${cars.length} Performance Assets`}
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto">
            <div className="relative w-full md:w-80 group">
              <label htmlFor="inventory-search" className="sr-only">Search models</label>
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-white transition-colors" aria-hidden="true" />
              <input 
                id="inventory-search"
                type="text" 
                placeholder="SEARCH MODELS..."
                className="w-full bg-white/5 border border-white/10 rounded-full py-5 pl-14 pr-14 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-[#C59B6D] focus:border-white/30 transition-all focus:bg-white/10 text-white placeholder:text-white/30"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button 
                  onClick={() => setSearch('')} 
                  aria-label="Clear search"
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-white/40 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#C59B6D] rounded-full p-1"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <div className="flex p-1.5 bg-white/5 rounded-full border border-white/10" role="group" aria-label="View switch">
              <button 
                onClick={() => setView('grid')}
                aria-label="Grid view"
                aria-pressed={view === 'grid'}
                className={`p-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#C59B6D] ${view === 'grid' ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white'}`}
              >
                <LayoutGrid size={20} />
              </button>
              <button 
                onClick={() => setView('list')}
                aria-label="List view"
                aria-pressed={view === 'list'}
                className={`p-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#C59B6D] ${view === 'list' ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white'}`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
          <aside className="lg:col-span-1 space-y-12">
            <div className="sticky top-32">
              <h2 className="text-[10px] uppercase tracking-[0.5em] text-white/50 mb-10 flex items-center gap-3 font-black">
                <SlidersHorizontal size={14} aria-hidden="true" /> Refine Search
              </h2>
              
              <div className="space-y-12">
                <nav aria-label="Filter by manufacturer">
                  <h3 className="text-[10px] font-black uppercase tracking-widest mb-6 block text-white/60 italic">Manufacturer</h3>
                  <div className="flex flex-wrap gap-3">
                    {makes.map(make => (
                      <button 
                        key={make}
                        onClick={() => setFilters(f => ({ ...f, make }))}
                        aria-pressed={filters.make === make}
                        className={`px-5 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all focus:outline-none focus:ring-2 focus:ring-[#C59B6D] ${filters.make === make ? 'bg-white text-black border-white' : 'border-white/10 text-white/50 hover:border-white/30'}`}
                      >
                        {make}
                      </button>
                    ))}
                  </div>
                </nav>

                <fieldset>
                  <legend className="text-[10px] font-black uppercase tracking-widest mb-6 block text-white/60 italic">Body Architecture</legend>
                  <div className="space-y-4">
                    {bodies.map(body => (
                      <label key={body} className="flex items-center gap-4 cursor-pointer group focus-within:ring-2 focus-within:ring-[#C59B6D] focus-within:ring-offset-4 focus-within:ring-offset-black rounded-lg p-1">
                        <div className="relative w-5 h-5 flex items-center justify-center">
                          <input 
                            type="radio" 
                            name="body" 
                            checked={filters.bodyType === body}
                            onChange={() => setFilters(f => ({ ...f, bodyType: body }))}
                            className="peer opacity-0 absolute inset-0 cursor-pointer"
                          />
                          <div className={`w-full h-full border-2 rounded transition-all ${filters.bodyType === body ? 'border-white bg-white' : 'border-white/10 group-hover:border-white/30'}`} />
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${filters.bodyType === body ? 'text-white' : 'text-white/50 group-hover:text-white/70'}`}>{body}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div>
                  <div className="flex justify-between items-center mb-6">
                    <label htmlFor="price-threshold" className="text-[10px] font-black uppercase tracking-widest text-white/60 italic">Budget Threshold</label>
                    <span className="text-[10px] font-black tracking-widest text-white" aria-live="polite">${(filters.maxPrice/1000).toFixed(0)}K</span>
                  </div>
                  <input 
                    id="price-threshold"
                    type="range" 
                    min="50000" 
                    max="500000" 
                    step="5000"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters(f => ({ ...f, maxPrice: parseInt(e.target.value) }))}
                    aria-valuemin={50000}
                    aria-valuemax={500000}
                    aria-valuenow={filters.maxPrice}
                    aria-valuetext={`$${filters.maxPrice.toLocaleString()}`}
                    className="w-full h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C59B6D]"
                  />
                </div>

                <button 
                  onClick={() => setFilters({ make: 'All', bodyType: 'All', maxPrice: 500000 })}
                  className="w-full py-5 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] text-white/30 hover:text-white hover:border-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-[#C59B6D]"
                >
                  Reset Parameters
                </button>
              </div>
            </div>
          </aside>

          <main className="lg:col-span-3">
            <AnimatePresence mode='wait'>
              {isLoading ? (
                <motion.div 
                  key="skeleton-grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={view === 'grid' ? "grid grid-cols-1 md:grid-cols-2 gap-10" : "space-y-8"}
                  role="status"
                  aria-label="Loading inventory"
                >
                  {[...Array(6)].map((_, i) => (
                    <SkeletonCard key={i} view={view} />
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  key="results-grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={view === 'grid' ? "grid grid-cols-1 md:grid-cols-2 gap-10" : "space-y-8"}
                >
                  {filteredCars.map(car => (
                    <motion.div
                      key={car.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`group glass rounded-[3rem] overflow-hidden transition-all flex flex-col hover:border-white/20 ${view === 'list' ? 'md:flex-row md:h-72' : ''}`}
                    >
                      <div className={`${view === 'list' ? 'md:w-[40%] h-64 md:h-full' : 'aspect-[16/10]'} overflow-hidden relative`}>
                        <img 
                          src={car.image} 
                          className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" 
                          alt={`${car.make} ${car.model}`} 
                        />
                        {car.status !== 'Available' && (
                          <div className="absolute top-6 left-6 px-4 py-2 bg-black/80 backdrop-blur-xl rounded-full text-[9px] font-black uppercase tracking-[0.2em] z-10 text-white">
                            {car.status}
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                      
                      <div className="p-10 flex-1 flex flex-col justify-between">
                        <div className="focus-within:ring-2 focus-within:ring-[#C59B6D] focus-within:ring-offset-8 focus-within:ring-offset-black rounded-xl p-2 -m-2">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-3xl font-black font-display uppercase italic tracking-tighter leading-none text-white">
                              {car.make} <br /> {car.model}
                            </h3>
                            <span className="text-xl font-black text-white">${car.price.toLocaleString()}</span>
                          </div>
                          <div className="flex gap-6 text-[9px] text-white/50 uppercase tracking-[0.3em] font-black mb-8">
                            <span>{car.year}</span>
                            <span className="w-1 h-1 bg-white/20 rounded-full my-auto" aria-hidden="true" />
                            <span>{car.mileage.toLocaleString()} MILES</span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-8 border-t border-white/5">
                          <div className="flex gap-3">
                            <span className="px-4 py-1.5 bg-white/5 rounded-full text-[8px] font-black uppercase tracking-widest text-white/70">{car.fuelType}</span>
                            <span className="px-4 py-1.5 bg-white/5 rounded-full text-[8px] font-black uppercase tracking-widest text-white/70">{car.hp} HP</span>
                          </div>
                          <Link 
                            to={`/car/${car.id}`} 
                            className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-white/70 hover:text-white transition-colors group/link focus:outline-none focus:ring-2 focus:ring-[#C59B6D] rounded-full p-2"
                          >
                            View Asset
                            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover/link:bg-white group-hover/link:text-black transition-all">
                              <ArrowUpRight size={14} aria-hidden="true" />
                            </div>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {filteredCars.length === 0 && (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="py-40 text-center glass rounded-[4rem] border-dashed border-2 border-white/5 w-full col-span-full"
                      role="status"
                    >
                      <p className="text-white/40 uppercase tracking-[0.5em] text-xs font-black mb-8 italic">No Assets Found Matching Parameters</p>
                      <button 
                        onClick={() => setFilters({ make: 'All', bodyType: 'All', maxPrice: 500000 })} 
                        className="px-10 py-5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all focus:outline-none focus:ring-2 focus:ring-[#C59B6D]"
                      >
                        Clear All Filters
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Inventory;