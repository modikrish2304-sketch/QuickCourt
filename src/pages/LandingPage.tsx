import React, { useState, useEffect } from 'react';
import { Search, MapPin, ArrowRight, ShieldCheck, Zap, Award, Users, Star, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import { venueService } from '../services/venueService';
import { Facility, SportType } from '../types';
import { VenueCard } from '../components/VenueCard';
import { SportCard } from '../components/SportCard';
import { Button } from '../components/Button';
import { SkeletonCard } from '../components/SkeletonCard';
import heroBackground from '../assets/images/sports_venue_background_1789209502947.jpg';

export interface LandingPageProps {
  onNavigate: (route: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [selectedSport, setSelectedSport] = useState<string>('All');
  const [selectedCity, setSelectedCity] = useState<string>('All Cities');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [popularVenues, setPopularVenues] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);

  const popularSports = venueService.getPopularSports();

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        setLoading(true);
        const res = await venueService.getPopularVenues(6);
        setPopularVenues(res);
      } finally {
        setLoading(false);
      }
    };
    fetchVenues();
  }, []);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedSport && selectedSport !== 'All') params.set('sport', selectedSport);
    if (selectedCity && selectedCity !== 'All Cities') params.set('city', selectedCity);
    if (searchQuery.trim()) params.set('q', searchQuery.trim());
    onNavigate(`/venues?${params.toString()}`);
  };

  const handleSportClick = (sportName: string) => {
    onNavigate(`/venues?sport=${encodeURIComponent(sportName)}`);
  };

  const cities = ['All Cities', 'Bengaluru', 'Ahmedabad', 'Mumbai', 'Delhi', 'Pune', 'Hyderabad'];
  const sports = ['All', 'Badminton', 'Football', 'Cricket', 'Tennis', 'Basketball', 'Pickleball'];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* HERO SECTION */}
      <section 
        className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-[#041A1A] bg-cover bg-center bg-no-repeat pt-20 pb-16"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        {/* Subtle dark overlay across entire image to ensure readability */}
        <div className="absolute inset-0 bg-[#041515]/20" />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8 mt-12">
          {/* Main Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="mb-6 max-w-5xl text-[56px] font-black leading-[1.05] tracking-tight text-white sm:text-[64px] md:text-[76px]"
          >
            <span className="block drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">Find Your Arena</span>
          </motion.h1>

          {/* Supporting Text */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="mb-14 max-w-2xl text-[17px] font-medium text-white/80 sm:text-[19px] drop-shadow-md"
          >
            Play more. Worry less. Find and book the best sports venues near you.
          </motion.p>

          {/* Search Card */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
            className="w-full max-w-[760px] rounded-[2rem] md:rounded-full bg-white p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100"
          >
            <form onSubmit={handleHeroSearch} className="flex flex-col gap-1.5 md:flex-row md:items-center h-auto md:h-[56px]">
              
              {/* Venue Search */}
              <div className="flex h-full min-h-[44px] flex-1 items-center gap-3 rounded-full pl-5 pr-3 text-left transition hover:bg-slate-50 cursor-text group">
                <Search className="h-4 w-4 text-slate-400 group-focus-within:text-[#16A34A] transition-colors shrink-0" strokeWidth={2.5} />
                <div className="flex-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search venues, courts..."
                    className="w-full bg-transparent text-[14px] font-medium text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="hidden h-7 w-[1px] bg-slate-200 md:block shrink-0" />

              {/* Sport */}
              <div className="flex h-full min-h-[44px] items-center gap-2.5 rounded-full px-4 text-left hover:bg-slate-50 md:w-[150px] transition cursor-pointer relative group">
                <svg className="h-4 w-4 text-slate-400 group-hover:text-[#16A34A] transition-colors shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 12l3-2.5"></path>
                  <path d="M12 12v3.5"></path>
                  <path d="M12 12l-3-2.5"></path>
                  <path d="M15 9.5l3.5 1.5"></path>
                  <path d="M9 9.5L5.5 11"></path>
                  <path d="M12 15.5l2 3.5"></path>
                  <path d="M12 15.5l-2 3.5"></path>
                </svg>
                <div className="flex-1 flex flex-col justify-center min-w-0 pt-0.5">
                  <p className="text-[10px] font-medium text-slate-500 leading-[1.2]">
                    Sport
                  </p>
                  <select
                    value={selectedSport}
                    onChange={(e) => setSelectedSport(e.target.value)}
                    className="w-full cursor-pointer bg-transparent text-[13px] font-semibold text-slate-900 outline-none appearance-none pr-4 leading-[1.2]"
                  >
                    {sports.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 group-hover:text-slate-600 transition-colors pointer-events-none" />
              </div>

              {/* Divider */}
              <div className="hidden h-7 w-[1px] bg-slate-200 md:block shrink-0" />

              {/* City */}
              <div className="flex h-full min-h-[44px] items-center gap-2.5 rounded-full px-4 text-left hover:bg-slate-50 md:w-[150px] transition cursor-pointer relative group">
                <MapPin className="h-4 w-4 text-slate-400 group-hover:text-[#16A34A] transition-colors shrink-0" strokeWidth={2.5} />
                <div className="flex-1 flex flex-col justify-center min-w-0 pt-0.5">
                  <p className="text-[10px] font-medium text-slate-500 leading-[1.2]">
                    Location
                  </p>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full cursor-pointer bg-transparent text-[13px] font-semibold text-slate-900 outline-none appearance-none pr-4 leading-[1.2]"
                  >
                    {cities.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 group-hover:text-slate-600 transition-colors pointer-events-none" />
              </div>

              {/* Search Button */}
              <button type="submit" className="flex h-full min-h-[44px] w-full md:w-auto md:min-w-[120px] items-center justify-center gap-1.5 rounded-[1.5rem] md:rounded-full bg-[#16A34A] px-5 text-[14px] font-bold text-white transition-all duration-200 hover:bg-[#15803d] shadow-[0_4px_12px_rgba(22,163,74,0.3)] md:ml-1">
                Search
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* POPULAR SPORTS SECTION */}
      <section className="py-16 sm:py-20 bg-slate-50/60 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 block mb-1">
                Explore By Sport
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                Choose Your Game
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                From high-speed badminton to late-night 5v5 turf matches.
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('/venues')}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Browse All Sports
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularSports.map((sport) => (
              <SportCard
                key={sport.name}
                name={sport.name}
                venueCount={sport.venueCount}
                icon={sport.icon}
                image={sport.image}
                description={sport.description}
                onClick={() => handleSportClick(sport.name)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 block mb-1">
              Seamless 3-Step Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              How QuickCourt Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
              Say goodbye to unreturned phone calls and double-booked turfs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm relative">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center font-bold text-lg mb-5">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900 font-display">
                Discover Verified Venues
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Filter by your favorite sport, location, court type (indoor/outdoor), and starting price per hour with verified photos.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm relative">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center font-bold text-lg mb-5">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900 font-display">
                Pick Your Court & Slot
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Choose your specific court surface (wooden, synthetic, acrylic) and select an available 1-hour time slot in real-time.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm relative">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center font-bold text-lg mb-5">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900 font-display">
                Pay & Play Instantly
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Complete a fast simulated payment, get your digital pass with QR code, and walk onto the court ready for game time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-emerald-50 via-slate-50 to-white p-8 sm:p-12 rounded-3xl border border-emerald-200/80 shadow-sm">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-display">
              Ready To Play Your Next Match?
            </h2>
            <p className="text-sm text-slate-600 max-w-xl mx-auto mt-3">
              Join thousands of badminton champions, box cricket squads, and weekend warriors on QuickCourt today.
            </p>
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                variant="primary"
                size="lg"
                onClick={() => onNavigate('/venues')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Find Venues Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => onNavigate('/signup')}
              >
                Create Free Player Account
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
