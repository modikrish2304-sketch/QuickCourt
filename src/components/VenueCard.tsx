import React from 'react';
import { MapPin, Star, Sparkles, ChevronRight } from 'lucide-react';
import { Facility } from '../types';
import { Button } from './Button';

export interface VenueCardProps {
  venue: Facility;
  onViewDetails: (venueId: string) => void;
  onBookNow: (venueId: string) => void;
}

export const VenueCard: React.FC<VenueCardProps> = ({
  venue,
  onViewDetails,
  onBookNow,
}) => {
  const primaryImage =
    venue.images?.[0] ||
    'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=900&auto=format&fit=crop&q=80';

  const venueTypeBadge = () => {
    const vt = (venue.venueType || 'Indoor').toLowerCase();
    if (vt === 'premium') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
          <Sparkles className="w-3 h-3 text-amber-600" /> Premium
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200 capitalize">
        {venue.venueType || 'Indoor'}
      </span>
    );
  };

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Venue Image with Badges */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
          <img
            src={primaryImage}
            alt={venue.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />

          {/* Top badges */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            {venueTypeBadge()}
          </div>

          {/* Rating Pill */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white/95 backdrop-blur-md shadow-md text-xs font-bold text-slate-900 border border-slate-200/50">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{venue.rating > 0 ? venue.rating.toFixed(1) : '4.8'}</span>
            <span className="text-slate-400 font-normal text-[10px]">
              ({venue.reviewCount || 45})
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5">
          {/* Title */}
          <h3
            onClick={() => onViewDetails(venue.id)}
            className="text-base font-bold text-slate-900 font-display hover:text-emerald-600 transition-colors line-clamp-1 cursor-pointer"
          >
            {venue.name}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1.5 mt-1.5 text-xs text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">
              {venue.area}, {venue.city}
            </span>
          </div>

          {/* Sports tags */}
          <div className="flex flex-wrap gap-1.5 mt-3.5">
            {venue.sports.slice(0, 3).map((sport) => (
              <span
                key={sport}
                className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100"
              >
                {sport}
              </span>
            ))}
            {venue.sports.length > 3 && (
              <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-600">
                +{venue.sports.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer: Pricing & Action Buttons */}
      <div className="p-5 pt-0">
        <div className="border-t border-slate-100 pt-3.5 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              Starting from
            </span>
            <div className="flex items-baseline gap-0.5">
              <span className="text-lg font-black text-slate-900 font-display">
                ₹{venue.startingPrice}
              </span>
              <span className="text-xs text-slate-500 font-medium">/hour</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails(venue.id)}
            >
              Details
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => onBookNow(venue.id)}
              rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
