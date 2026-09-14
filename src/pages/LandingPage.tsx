import React, { useState, useEffect } from 'react';
import { Search, MapPin, Aperture, ChevronDown, ArrowRight, Star } from 'lucide-react';
import { GiShuttlecock, GiPingPongBat } from 'react-icons/gi';
import { MdSportsCricket, MdSportsTennis, MdSportsBasketball } from 'react-icons/md';
import { TbBallFootball } from 'react-icons/tb';
import { motion } from 'motion/react';
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

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [selectedSport, setSelectedSport] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const allSports = venueService.getAllSports();
  const allCities = venueService.getAllCities();

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.append('q', searchQuery);
    if (selectedSport !== 'all') params.append('sport', selectedSport);
    if (selectedCity !== 'all') params.append('city', selectedCity);
    
    onNavigate(`/venues?${params.toString()}`);
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
        className="relative flex min-h-[500px] md:min-h-[600px] flex-col items-center justify-center overflow-hidden bg-[#041A1A] bg-cover bg-center bg-no-repeat pt-20 pb-16"
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
            className="w-full max-w-3xl rounded-[2rem] md:rounded-full bg-white p-2 sm:p-2.5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100"
          >
            <form onSubmit={handleHeroSearch} className="flex flex-col gap-2 md:flex-row md:items-center h-auto md:h-[60px]">
              
              {/* Search Query */}
              <div className="flex h-[48px] md:h-full items-center gap-3 rounded-full px-5 hover:bg-slate-50 flex-[2] transition relative group">
                <Search className="h-5 w-5 text-slate-400 group-hover:text-emerald-600 shrink-0" strokeWidth={2} />
                <input
                  type="text"
                  placeholder="Search venues, courts, or localities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-[15px] text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>

              <div className="hidden h-8 w-[1px] bg-slate-200 md:block shrink-0" />
              
              {/* Sport */}
              <div className="flex h-[48px] md:h-full items-center gap-2.5 rounded-full px-4 hover:bg-slate-50 flex-[1.2] transition-colors cursor-pointer relative group focus-within:bg-emerald-50/40">
                <Aperture className="h-5 w-5 text-emerald-600 group-hover:text-emerald-700 shrink-0 transition-colors" strokeWidth={2.2} />
                <div className="flex-1 flex flex-col justify-center min-w-0 text-left">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700/80">Sport</p>
                  <select
                    value={selectedSport}
                    onChange={(e) => setSelectedSport(e.target.value)}
                    className="w-full cursor-pointer bg-transparent text-[14px] font-bold text-slate-900 outline-none appearance-none pr-5"
                  >
                    <option value="all" className="font-semibold text-slate-800">All Sports</option>
                    {allSports.map(s => (
                      <option key={s.id} value={s.name} className="font-medium text-slate-800 py-1">
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-hover:text-slate-600 pointer-events-none transition-colors" />
              </div>

              <div className="hidden h-8 w-[1px] bg-slate-200 md:block shrink-0" />

              {/* Cities */}
              <div className="flex h-[48px] md:h-full items-center gap-2.5 rounded-full px-4 hover:bg-slate-50 flex-[1.2] transition-colors cursor-pointer relative group focus-within:bg-emerald-50/40">
                <MapPin className="h-5 w-5 text-emerald-600 group-hover:text-emerald-700 shrink-0 transition-colors" strokeWidth={2.2} />
                <div className="flex-1 flex flex-col justify-center min-w-0 text-left">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700/80">City</p>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full cursor-pointer bg-transparent text-[14px] font-bold text-slate-900 outline-none appearance-none pr-5"
                  >
                    <option value="all" className="font-semibold text-slate-800">All Cities</option>
                    {allCities.map(c => (
                      <option key={c.id} value={c.name} className="font-medium text-slate-800 py-1">
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-hover:text-slate-600 pointer-events-none transition-colors" />
              </div>

              <Button 
                type="submit" 
                variant="primary" 
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="h-[48px] md:h-full rounded-2xl md:rounded-full px-8 shrink-0 bg-[#16A34A] hover:bg-green-700 text-white font-bold w-full md:w-auto mt-2 md:mt-0 transition-all duration-200 shadow-sm hover:shadow"
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

