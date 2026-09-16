import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Aperture, ChevronDown, ArrowRight, Star, Check, Trophy } from 'lucide-react';
import { GiShuttlecock, GiPingPongBat } from 'react-icons/gi';
import { MdSportsCricket, MdSportsTennis, MdSportsBasketball } from 'react-icons/md';
import { TbBallFootball } from 'react-icons/tb';
import { motion, AnimatePresence } from 'motion/react';
import { venueService } from '../services/venueService';
import { VENUES_DATASET } from '../data/venues';
import { SportCard } from '../components/SportCard';
import { VenueCard } from '../components/VenueCard';
import { Button } from '../components/Button';
import heroBackground from '../assets/images/sports_venue_background_1789209502947.jpg';
import pickleballImage from '../assets/images/pickleball_court_1789407490662.jpg';

export interface LandingPageProps {
  onNavigate: (route: string) => void;
}

const CITY_IMAGES: Record<string, string> = {
  Ahmedabad: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=600&auto=format&fit=crop&q=80',
  Mumbai: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&auto=format&fit=crop&q=80',
  Pune: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&auto=format&fit=crop&q=80',
  Bengaluru: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&auto=format&fit=crop&q=80',
  Delhi: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&auto=format&fit=crop&q=80',
  Hyderabad: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=600&auto=format&fit=crop&q=80',
  Chennai: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&auto=format&fit=crop&q=80',
  Kolkata: 'https://images.unsplash.com/photo-1558431382-27e303142255?w=600&auto=format&fit=crop&q=80',
};

const getSportIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes('badminton')) return '🏸';
  if (n.includes('football')) return '⚽';
  if (n.includes('cricket')) return '🏏';
  if (n.includes('tennis')) return '🎾';
  if (n.includes('basketball')) return '🏀';
  if (n.includes('pickleball')) return '🏓';
  if (n.includes('table tennis') || n.includes('ping pong')) return '🏓';
  if (n.includes('swimming') || n.includes('pool')) return '🏊';
  if (n.includes('volleyball')) return '🏐';
  if (n.includes('squash')) return '🎾';
  return '🏅';
};

const SPORT_OPTIONS = [
  { value: 'all', label: 'All Sports', icon: '🏆' },
  { value: 'Badminton', label: 'Badminton', icon: '🏸' },
  { value: 'Football', label: 'Football', icon: '⚽' },
  { value: 'Cricket', label: 'Cricket', icon: '🏏' },
  { value: 'Tennis', label: 'Tennis', icon: '🎾' },
  { value: 'Basketball', label: 'Basketball', icon: '🏀' },
  { value: 'Pickleball', label: 'Pickleball', icon: '🏓' },
];

const CITY_OPTIONS = [
  { value: 'all', label: 'All Cities', icon: '📍' },
  { value: 'Ahmedabad', label: 'Ahmedabad', icon: '🏙️' },
  { value: 'Surat', label: 'Surat', icon: '🏙️' },
  { value: 'Vadodara', label: 'Vadodara', icon: '🏙️' },
  { value: 'Mumbai', label: 'Mumbai', icon: '🏙️' },
  { value: 'Delhi', label: 'Delhi', icon: '🏙️' },
  { value: 'Bengaluru', label: 'Bengaluru', icon: '🏙️' },
];

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [selectedSport, setSelectedSport] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSportDropdownOpen, setIsSportDropdownOpen] = useState(false);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [sportDropUp, setSportDropUp] = useState(false);
  const [cityDropUp, setCityDropUp] = useState(false);

  const sportDropdownRef = useRef<HTMLDivElement>(null);
  const cityDropdownRef = useRef<HTMLDivElement>(null);

  const checkPlacement = (ref: React.RefObject<HTMLDivElement | null>, setDropUp: (val: boolean) => void) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const dropdownHeight = 350;
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      // Intelligently open upward if close to the bottom of the viewport and more space above
      if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
        setDropUp(true);
      } else {
        setDropUp(false);
      }
    }
  };

  useEffect(() => {
    if (isSportDropdownOpen) {
      checkPlacement(sportDropdownRef, setSportDropUp);
    }
  }, [isSportDropdownOpen]);

  useEffect(() => {
    if (isCityDropdownOpen) {
      checkPlacement(cityDropdownRef, setCityDropUp);
    }
  }, [isCityDropdownOpen]);

  useEffect(() => {
    if (!isSportDropdownOpen && !isCityDropdownOpen) return;
    const handleUpdate = () => {
      if (isSportDropdownOpen) checkPlacement(sportDropdownRef, setSportDropUp);
      if (isCityDropdownOpen) checkPlacement(cityDropdownRef, setCityDropUp);
    };
    window.addEventListener('resize', handleUpdate);
    window.addEventListener('scroll', handleUpdate, { passive: true });
    return () => {
      window.removeEventListener('resize', handleUpdate);
      window.removeEventListener('scroll', handleUpdate);
    };
  }, [isSportDropdownOpen, isCityDropdownOpen]);

  // Smoothly close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sportDropdownRef.current && !sportDropdownRef.current.contains(event.target as Node)) {
        setIsSportDropdownOpen(false);
      }
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target as Node)) {
        setIsCityDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const allSports = venueService.getAllSports();
  const allCities = venueService.getAllCities();

  const handleHeroSearch = (e?: React.FormEvent | React.MouseEvent) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    setIsSportDropdownOpen(false);
    setIsCityDropdownOpen(false);

    const params = new URLSearchParams();
    const cleanQuery = searchQuery.trim();
    if (cleanQuery) params.append('q', cleanQuery);
    if (selectedSport && selectedSport !== 'all' && selectedSport !== 'All Sports') {
      params.append('sport', selectedSport);
    }
    if (selectedCity && selectedCity !== 'all' && selectedCity !== 'All Cities') {
      params.append('city', selectedCity);
    }
    
    const queryString = params.toString();
    onNavigate(queryString ? `/venues?${queryString}` : '/venues');
  };

  const sports = [
    { 
      name: 'Badminton', 
      venueCount: 40,
      icon: <span className="w-5 h-5 inline-flex items-center justify-center"><GiShuttlecock size={20} /></span>, 
      image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&auto=format&fit=crop&q=80' 
    },
    { 
      name: 'Football', 
      venueCount: 40,
      icon: <span className="w-5 h-5 inline-flex items-center justify-center"><TbBallFootball size={20} /></span>, 
      image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&auto=format&fit=crop&q=80' 
    },
    { 
      name: 'Cricket', 
      venueCount: 40,
      icon: <span className="w-5 h-5 inline-flex items-center justify-center"><MdSportsCricket size={20} /></span>, 
      image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&auto=format&fit=crop&q=80' 
    },
    { 
      name: 'Tennis', 
      venueCount: 40,
      icon: <span className="w-5 h-5 inline-flex items-center justify-center"><MdSportsTennis size={20} /></span>, 
      image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&auto=format&fit=crop&q=80' 
    },
    { 
      name: 'Basketball', 
      venueCount: 40,
      icon: <span className="w-5 h-5 inline-flex items-center justify-center"><MdSportsBasketball size={20} /></span>, 
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop&q=80' 
    },
    { 
      name: 'Pickleball', 
      venueCount: 40,
      icon: <span className="w-5 h-5 inline-flex items-center justify-center"><GiPingPongBat size={20} /></span>, 
      image: pickleballImage 
    },
  ];

  // Pick 6 top rated venues
  const topVenues = VENUES_DATASET.filter(v => v.topRated).slice(0, 6);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* HERO SECTION */}
      <section 
        className="relative z-20 flex min-h-[500px] md:min-h-[600px] flex-col items-center justify-center bg-[#041A1A] bg-cover bg-center bg-no-repeat pt-20 pb-16"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-slate-900/40" />
        
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8 mt-12">
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="mb-4 max-w-5xl text-[48px] font-black leading-[1.05] tracking-tight text-white sm:text-[64px] md:text-[76px]"
          >
            <span className="block drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">Find Your Arena</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="mb-12 max-w-2xl text-[17px] font-semibold text-white/95 sm:text-[19px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          >
            Play more. Worry less. Find and book the best sports venues
          </motion.p>

          {/* Search Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
            className="w-full max-w-4xl rounded-2xl md:rounded-full bg-white p-2 md:p-2.5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 relative z-30"
          >
            <form id="hero-search-form" onSubmit={handleHeroSearch} className="flex flex-col gap-2.5 md:flex-row md:items-center">
              
              {/* Search Query */}
              <div className="flex h-[50px] items-center gap-3 rounded-xl md:rounded-full px-4 bg-slate-50/60 hover:bg-slate-100/70 border border-slate-200/80 md:border-transparent md:bg-transparent md:hover:bg-slate-50/80 flex-1 min-w-[200px] transition relative group">
                <Search className="h-5 w-5 text-slate-400 group-hover:text-emerald-600 shrink-0" strokeWidth={2} />
                <input
                  id="hero-search-input"
                  type="text"
                  placeholder="Search venues, courts, or locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-[14px] md:text-[15px] font-medium text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>

              <div className="hidden h-8 w-[1px] bg-slate-200 md:block shrink-0 mx-0.5" />
              
              {/* Sport Selector */}
              <div
                ref={sportDropdownRef}
                className={`relative h-[50px] w-full md:w-[190px] lg:w-[205px] shrink-0 ${
                  isSportDropdownOpen ? 'z-50' : 'z-20'
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    if (!isSportDropdownOpen) {
                      checkPlacement(sportDropdownRef, setSportDropUp);
                    }
                    setIsSportDropdownOpen((prev) => !prev);
                    setIsCityDropdownOpen(false);
                  }}
                  className={`w-full h-full flex items-center justify-between gap-2.5 px-3 rounded-xl border text-left transition-all duration-200 cursor-pointer select-none ${
                    isSportDropdownOpen
                      ? 'bg-white border-emerald-600 ring-2 ring-emerald-500/20 shadow-xs'
                      : 'bg-slate-50/80 hover:bg-slate-100/90 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isSportDropdownOpen
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    <Trophy className="w-4 h-4" strokeWidth={2.2} />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-center leading-tight">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block truncate">
                      SPORT
                    </span>
                    <span className="text-[13px] font-bold text-slate-900 truncate block">
                      {selectedSport === 'all' ? 'All Sports' : selectedSport}
                    </span>
                  </div>

                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isSportDropdownOpen ? 'rotate-180 text-emerald-600' : ''
                    }`}
                    strokeWidth={2.2}
                  />
                </button>

                {/* Sport Dropdown Panel */}
                <AnimatePresence>
                  {isSportDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: sportDropUp ? -6 : 6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: sportDropUp ? -4 : 4, scale: 0.98 }}
                      transition={{ duration: 0.16, ease: 'easeOut' }}
                      onClick={(e) => e.stopPropagation()}
                      className={`absolute left-0 ${
                        sportDropUp ? 'bottom-[calc(100%+6px)] origin-bottom' : 'top-[calc(100%+6px)] origin-top'
                      } w-full min-w-[230px] z-50 rounded-xl bg-white border border-slate-200 shadow-xl overflow-hidden text-left`}
                    >
                      <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] font-black uppercase tracking-wider text-slate-600">
                          SELECT SPORT
                        </span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                          {SPORT_OPTIONS.length - 1} Sports
                        </span>
                      </div>

                      <div className="p-2 max-h-[min(300px,calc(100vh-160px))] overflow-y-auto space-y-1 overscroll-contain [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
                        {SPORT_OPTIONS.map((sport) => {
                          const isSelected = selectedSport === sport.value;
                          return (
                            <button
                              key={sport.value}
                              type="button"
                              onClick={() => {
                                setSelectedSport(sport.value);
                                setIsSportDropdownOpen(false);
                              }}
                              className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg border text-[13px] transition-all duration-150 text-left cursor-pointer ${
                                isSelected
                                  ? 'bg-emerald-50/90 border-emerald-500 text-emerald-950 font-bold shadow-xs ring-1 ring-emerald-500/20'
                                  : 'bg-white hover:bg-slate-50 border-slate-200/70 hover:border-slate-300 text-slate-700 hover:text-slate-900 font-medium'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <span
                                  className={`w-7 h-7 rounded-md flex items-center justify-center text-sm shrink-0 border transition-colors ${
                                    isSelected
                                      ? 'bg-emerald-100 border-emerald-200 text-emerald-800'
                                      : 'bg-slate-100/80 border-slate-200/60 text-slate-700'
                                  }`}
                                >
                                  {sport.icon}
                                </span>
                                <span className="truncate">{sport.label}</span>
                              </div>
                              {isSelected && (
                                <span className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center text-white shrink-0 ml-2 shadow-2xs">
                                  <Check className="w-3 h-3 stroke-[3]" />
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="hidden h-8 w-[1px] bg-slate-200 md:block shrink-0 mx-0.5" />

              {/* City Selector */}
              <div
                ref={cityDropdownRef}
                className={`relative h-[50px] w-full md:w-[190px] lg:w-[205px] shrink-0 ${
                  isCityDropdownOpen ? 'z-50' : 'z-20'
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    if (!isCityDropdownOpen) {
                      checkPlacement(cityDropdownRef, setCityDropUp);
                    }
                    setIsCityDropdownOpen((prev) => !prev);
                    setIsSportDropdownOpen(false);
                  }}
                  className={`w-full h-full flex items-center justify-between gap-2.5 px-3 rounded-xl border text-left transition-all duration-200 cursor-pointer select-none ${
                    isCityDropdownOpen
                      ? 'bg-white border-emerald-600 ring-2 ring-emerald-500/20 shadow-xs'
                      : 'bg-slate-50/80 hover:bg-slate-100/90 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isCityDropdownOpen
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    <MapPin className="w-4 h-4" strokeWidth={2.2} />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-center leading-tight">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block truncate">
                      CITY
                    </span>
                    <span className="text-[13px] font-bold text-slate-900 truncate block">
                      {selectedCity === 'all' ? 'All Cities' : selectedCity}
                    </span>
                  </div>

                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isCityDropdownOpen ? 'rotate-180 text-emerald-600' : ''
                    }`}
                    strokeWidth={2.2}
                  />
                </button>

                {/* City Dropdown Panel */}
                <AnimatePresence>
                  {isCityDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: cityDropUp ? -6 : 6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: cityDropUp ? -4 : 4, scale: 0.98 }}
                      transition={{ duration: 0.16, ease: 'easeOut' }}
                      onClick={(e) => e.stopPropagation()}
                      className={`absolute left-0 ${
                        cityDropUp ? 'bottom-[calc(100%+6px)] origin-bottom' : 'top-[calc(100%+6px)] origin-top'
                      } w-full min-w-[230px] z-50 rounded-xl bg-white border border-slate-200 shadow-xl overflow-hidden text-left`}
                    >
                      <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] font-black uppercase tracking-wider text-slate-600">
                          SELECT CITY
                        </span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                          {CITY_OPTIONS.length - 1} Cities
                        </span>
                      </div>

                      <div className="p-2 max-h-[min(300px,calc(100vh-160px))] overflow-y-auto space-y-1 overscroll-contain [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
                        {CITY_OPTIONS.map((city) => {
                          const isSelected = selectedCity === city.value;
                          return (
                            <button
                              key={city.value}
                              type="button"
                              onClick={() => {
                                setSelectedCity(city.value);
                                setIsCityDropdownOpen(false);
                              }}
                              className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg border text-[13px] transition-all duration-150 text-left cursor-pointer ${
                                isSelected
                                  ? 'bg-emerald-50/90 border-emerald-500 text-emerald-950 font-bold shadow-xs ring-1 ring-emerald-500/20'
                                  : 'bg-white hover:bg-slate-50 border-slate-200/70 hover:border-slate-300 text-slate-700 hover:text-slate-900 font-medium'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <span
                                  className={`w-7 h-7 rounded-md flex items-center justify-center text-sm shrink-0 border transition-colors ${
                                    isSelected
                                      ? 'bg-emerald-100 border-emerald-200 text-emerald-800'
                                      : 'bg-slate-100/80 border-slate-200/60 text-slate-700'
                                  }`}
                                >
                                  {city.icon}
                                </span>
                                <span className="truncate">{city.label}</span>
                              </div>
                              {isSelected && (
                                <span className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center text-white shrink-0 ml-2 shadow-2xs">
                                  <Check className="w-3 h-3 stroke-[3]" />
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Button 
                id="hero-search-button"
                type="submit" 
                variant="primary" 
                onClick={handleHeroSearch}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="h-[50px] rounded-xl md:rounded-full px-7 shrink-0 bg-[#16A34A] hover:bg-green-700 text-white font-bold w-full md:w-auto transition-all duration-200 shadow-sm hover:shadow cursor-pointer select-none"
              >
                Search
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* EXPLORE SPORTS SECTION */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl text-left">
              <span className="mb-3 inline-block rounded-full bg-[#14B8A6]/10 px-3 py-1 text-xs font-bold tracking-widest text-[#14B8A6] uppercase">
                Discover Your Game
              </span>
              <h2 className="text-[32px] sm:text-[40px] font-black font-display tracking-tight text-[#0B1F3A] leading-tight">
                Explore Sports
              </h2>
              <p className="mt-4 text-[17px] text-[#64748B] leading-relaxed">
                Find the perfect court for your favorite game across 240 premier venues.
              </p>
            </div>
            <div className="hidden md:block shrink-0">
              <Button 
                variant="outline" 
                className="rounded-full border-slate-200 text-slate-600 hover:bg-slate-100 font-semibold px-6 hover:text-[#0B1F3A]"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                onClick={() => onNavigate('/venues')}
              >
                View all sports
              </Button>
            </div>
          </div>
          
          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
            {sports.map((sport) => (
              <SportCard
                key={sport.name}
                name={sport.name}
                venueCount={sport.venueCount}
                icon={sport.icon}
                image={sport.image}
                onClick={() => onNavigate(`/venues?sport=${sport.name}`)}
              />
            ))}
          </div>
          
          {/* Mobile Only Button */}
          <div className="mt-10 block md:hidden text-center">
            <Button 
              variant="outline" 
              className="rounded-full border-slate-200 w-full justify-center text-slate-600 bg-white"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => onNavigate('/venues')}
            >
              View all sports
            </Button>
          </div>

        </div>
      </section>

      {/* POPULAR / TOP RATED VENUES SECTION */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <span className="mb-2 inline-block rounded-full bg-amber-50 px-3 py-1 text-xs font-bold tracking-wider text-amber-700 uppercase">
                Featured Arenas
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-slate-900">
                Popular & Top-Rated Venues
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-500">
                Highest rated courts with certified facilities, floodlights, and immediate availability.
              </p>
            </div>
            <Button 
              variant="outline" 
              className="rounded-full border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold px-6 shrink-0"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => onNavigate('/venues?sort=top-rated')}
            >
              See All 240 Venues
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topVenues.map((venue) => (
              <VenueCard
                key={venue.id}
                venue={venue}
                onViewDetails={(id) => onNavigate(`/venues/${id}`)}
                onBookNow={(id) => onNavigate(`/book/${id}`)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

