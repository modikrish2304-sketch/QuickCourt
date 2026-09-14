
import React from 'react';
import { MapPin, Star, ArrowRight, ShieldCheck, Info, Calendar, Zap } from 'lucide-react';
import { Facility } from '../types';

export interface VenueCardProps {
  venue: Facility;
  onViewDetails?: (id: string | number) => void;
  onBookNow?: (id: string | number) => void;
}

const SPORT_ICONS: Record<string, string> = {
  Badminton: '🏸',
  Football: '⚽',
  Cricket: '🏏',
  Tennis: '🎾',
  Basketball: '🏀',
  Pickleball: '🏓',
};

const DEFAULT_SPORT_IMAGES: Record<string, string> = {
  Badminton: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&auto=format&fit=crop&q=80',
  Football: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&auto=format&fit=crop&q=80',
  Cricket: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&auto=format&fit=crop&q=80',
  Tennis: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&auto=format&fit=crop&q=80',
  Basketball: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop&q=80',
  Pickleball: 'https://images.unsplash.com/photo-1611255894596-10d477e8140a?w=800&auto=format&fit=crop&q=80',
  'Table Tennis': 'https://images.unsplash.com/photo-1534158914592-062992fbe900?w=800&auto=format&fit=crop&q=80',
  Squash: 'https://images.unsplash.com/photo-1558365849-6ebd8b0454b2?w=800&auto=format&fit=crop&q=80',
  Swimming: 'https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?w=800&auto=format&fit=crop&q=80',
};

export const VenueCard: React.FC<VenueCardProps> = ({ venue, onViewDetails, onBookNow }) => {
  const primarySport = venue.sports?.[0] || 'Badminton';
  const displayImage = venue.imageUrl || venue.images?.[0] || DEFAULT_SPORT_IMAGES[primarySport] || DEFAULT_SPORT_IMAGES.Badminton;
  
  const ratingVal = typeof venue.rating === 'number' ? venue.rating : 4.5;
  const isTopRated = venue.topRated ?? ratingVal >= 4.7;
  const reviewCount = venue.reviews ?? venue.reviewCount ?? 120;
  const price = venue.pricePerHour ?? venue.startingPrice ?? 500;
  const venueTitle = venue.venueName || venue.name;
  
  // Availability status
  const slots = typeof venue.availableSlots === 'number' ? venue.availableSlots : 8;
  const availText = venue.availabilityText || (slots === 0 ? 'Fully Booked Today' : `${slots} Slots Available Today`);
  
  // Dot color
  const statusColor = slots === 0 ? 'bg-red-500' : slots <= 3 ? 'bg-amber-500' : 'bg-emerald-500';
  const statusBg = slots === 0 ? 'bg-red-50 text-red-700 border-red-200' : slots <= 3 ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200';

  // Verification status rule
  const isVerified = venue.verified === true && venue.demoData === false;

  const handleDetailsClick = () => {
    if (onViewDetails) {
      onViewDetails(venue.id);
    }
  };

  const handleBookClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onBookNow) {
      onBookNow(venue.id);
    } else if (onViewDetails) {
      onViewDetails(venue.id);
    }
  };

  return (
    <div 
      onClick={handleDetailsClick}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-xs border border-slate-200/80 transition-all duration-300 hover:shadow-xl hover:border-emerald-500/40 hover:-translate-y-1 cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <img
          src={displayImage}
          alt={venueTitle}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = DEFAULT_SPORT_IMAGES[primarySport] || DEFAULT_SPORT_IMAGES.Badminton;
          }}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          {isTopRated ? (
            <div className="inline-flex items-center gap-1 rounded-full bg-amber-500/95 px-2.5 py-1 text-[11px] font-black text-white shadow-md backdrop-blur-xs">
              <Star className="h-3 w-3 fill-white text-white" />
              <span>Top Rated</span>
            </div>
          ) : <div />}

          <div className="rounded-full bg-slate-900/80 px-2.5 py-1 text-[11px] font-bold text-white shadow-md backdrop-blur-xs">
            {venue.venueType || 'Indoor'}
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        
        {/* Venue Name */}
        <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-emerald-700 transition-colors mb-1">
          {venueTitle}
        </h3>

        {/* Location • City */}
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-3">
          <MapPin className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
          <span className="line-clamp-1">
            {venue.city} • {venue.location || venue.area || venue.address}
          </span>
        </div>

        {/* Rating & Reviews + Price */}
        <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200/60 px-2 py-0.5 rounded-md text-xs font-bold">
              <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
              <span>{ratingVal.toFixed(1)}</span>
            </div>
            <span className="text-xs text-slate-400 font-medium">· {reviewCount} Reviews</span>
          </div>

          <div className="text-right">
            <span className="text-base sm:text-lg font-black text-slate-900">₹{price}</span>
            <span className="text-[11px] text-slate-500 font-medium">/hour</span>
          </div>
        </div>

        {/* Sports List */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          {venue.sports?.map((s) => (
            <span 
              key={s} 
              className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 bg-slate-100/80 px-2 py-0.5 rounded-md"
            >
              <span>{SPORT_ICONS[s] || '🏅'}</span>
              <span>{s}</span>
            </span>
          ))}
        </div>

        {/* Availability Badge & Status */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-bold ${statusBg}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${statusColor}`} />
            <span>{availText}</span>
          </div>

          {isVerified ? (
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="hidden sm:inline">Verified</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400">
              <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="hidden sm:inline">Demo</span>
            </div>
          )}
        </div>

        {/* Bottom Actions Row: View Details & Book Now */}
        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          {/* View Details Action */}
          <button
            type="button"
            onClick={handleDetailsClick}
            className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-emerald-700 transition-colors py-1.5 px-2.5 rounded-xl hover:bg-slate-100"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Book Now Primary Button */}
          <button
            type="button"
            onClick={handleBookClick}
            className="inline-flex items-center justify-center gap-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white py-1.5 px-3.5 rounded-xl shadow-xs hover:shadow-md transition-all duration-150 group/book"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Now</span>
          </button>
        </div>

      </div>
    </div>
  );
};

