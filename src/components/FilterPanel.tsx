
import React, { useState, useEffect } from 'react';
import { Filter, X, RotateCcw } from 'lucide-react';
import { SportType } from '../types';
import { venueService } from '../services/venueService';

export interface FilterState {
  sport: string;
  city?: string;
  venueSearch?: string;
  location?: string;
  priceRange: string;
  venueType: string;
  minRating: number;
  verifiedOnly: boolean;
}

export interface FilterPanelProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onClear: () => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

const PRICE_OPTIONS = [
  { label: 'All Prices', value: 'all' },
  { label: 'Under ₹300', value: 'under-300' },
  { label: '₹300 – ₹500', value: '300-500' },
  { label: '₹500 – ₹1000', value: '500-1000' },
  { label: '₹1000+', value: 'above-1000' },
];

const VENUE_TYPES = [
  { label: 'All Types', value: 'all' },
  { label: 'Indoor', value: 'Indoor' },
  { label: 'Outdoor', value: 'Outdoor' },
  { label: 'Premium', value: 'Premium' },
  { label: 'Community', value: 'Community' },
];

const RATINGS = [
  { label: 'Any Rating', value: 0 },
  { label: '4.5 & above', value: 4.5 },
  { label: '4.0 & above', value: 4.0 },
  { label: '3.0 & above', value: 3.0 },
];

const COURT_SPORTS = [
  { label: 'All Sports', value: 'all' },
  { label: 'Badminton', value: 'Badminton' },
  { label: 'Football', value: 'Football' },
  { label: 'Cricket', value: 'Cricket' },
  { label: 'Tennis', value: 'Tennis' },
  { label: 'Basketball', value: 'Basketball' },
  { label: 'Pickleball', value: 'Pickleball' },
];

const CITY_OPTIONS = [
  { label: 'All Cities', value: 'all' },
  { label: 'Ahmedabad', value: 'Ahmedabad' },
  { label: 'Mumbai', value: 'Mumbai' },
  { label: 'Pune', value: 'Pune' },
  { label: 'Bengaluru', value: 'Bengaluru' },
  { label: 'Delhi', value: 'Delhi' },
  { label: 'Hyderabad', value: 'Hyderabad' },
  { label: 'Chennai', value: 'Chennai' },
  { label: 'Kolkata', value: 'Kolkata' },
];

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onChange,
  onClear,
  isOpenMobile,
  onCloseMobile,
}) => {
  const [sports, setSports] = useState<{ label: string; value: string }[]>(COURT_SPORTS);

  useEffect(() => {
    // Only the specified court games
    setSports(COURT_SPORTS);

    // If current selected sport is not in the court list, reset to 'all'
    if (filters.sport && filters.sport !== 'all' && !COURT_SPORTS.some(s => s.value === filters.sport)) {
      onChange({ ...filters, sport: 'all' });
    }
  }, []);

  const handleChange = (key: keyof FilterState, value: any) => {
    onChange({ ...filters, [key]: value });
  };

  const MobileWrapper = ({ children }: { children: React.ReactNode }) => (
    <>
      {/* Backdrop */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={onCloseMobile}
        />
      )}
      {/* Drawer */}
      <div 
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-xs transform bg-white shadow-xl transition-transform duration-300 ease-in-out lg:static lg:block lg:w-auto lg:max-w-none lg:translate-x-0 lg:bg-transparent lg:shadow-none ${isOpenMobile ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {children}
      </div>
    </>
  );

  return (
    <MobileWrapper>
      <div className="flex h-full flex-col lg:h-auto lg:block">
        <div className="flex items-center justify-between border-b border-slate-200 p-4 lg:hidden">
          <h2 className="text-lg font-bold text-slate-900">Filters</h2>
          <button onClick={onCloseMobile} className="rounded-full p-2 hover:bg-slate-100 text-slate-500">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 lg:p-0">
          <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-end lg:gap-3 lg:bg-white lg:p-4 lg:rounded-2xl lg:shadow-2xs lg:border lg:border-slate-200 w-full">
            
            {/* Sport Filter */}
            <div className="flex flex-col gap-1.5 lg:flex-1 lg:min-w-[150px]">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider flex items-center justify-between">
                <span>Court Sport</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                  Court Games
                </span>
              </label>
              <select 
                value={filters.sport}
                onChange={(e) => handleChange('sport', e.target.value)}
                className="w-full rounded-xl border border-slate-300 hover:border-emerald-500 focus:border-emerald-600 bg-white hover:bg-emerald-50/25 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 px-3.5 py-2 text-sm font-semibold text-slate-900 shadow-2xs outline-none transition-all duration-150 cursor-pointer"
              >
                {sports.map((opt) => (
                  <option key={opt.value} value={opt.value} className="text-slate-800 font-medium py-1">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* City Filter */}
            <div className="flex flex-col gap-1.5 lg:flex-1 lg:min-w-[140px]">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider flex items-center justify-between">
                <span>City</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                  Top Cities
                </span>
              </label>
              <select 
                value={filters.city || 'all'}
                onChange={(e) => handleChange('city', e.target.value)}
                className="w-full rounded-xl border border-slate-300 hover:border-emerald-500 focus:border-emerald-600 bg-white hover:bg-emerald-50/25 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 px-3.5 py-2 text-sm font-semibold text-slate-900 shadow-2xs outline-none transition-all duration-150 cursor-pointer"
              >
                {CITY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} className="text-slate-800 font-medium py-1">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div className="flex flex-col gap-1.5 lg:flex-1 lg:min-w-[125px]">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Price</label>
              <select 
                value={filters.priceRange}
                onChange={(e) => handleChange('priceRange', e.target.value)}
                className="w-full rounded-xl border border-slate-300 hover:border-emerald-500 focus:border-emerald-600 bg-white hover:bg-emerald-50/20 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 px-3.5 py-2 text-sm font-semibold text-slate-900 shadow-2xs outline-none transition-all duration-150 cursor-pointer"
              >
                {PRICE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} className="text-slate-800 font-medium py-1">{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Venue Type */}
            <div className="flex flex-col gap-1.5 lg:flex-1 lg:min-w-[120px]">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Venue Type</label>
              <select 
                value={filters.venueType}
                onChange={(e) => handleChange('venueType', e.target.value)}
                className="w-full rounded-xl border border-slate-300 hover:border-emerald-500 focus:border-emerald-600 bg-white hover:bg-emerald-50/20 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 px-3.5 py-2 text-sm font-semibold text-slate-900 shadow-2xs outline-none transition-all duration-150 cursor-pointer"
              >
                {VENUE_TYPES.map((opt) => (
                  <option key={opt.value} value={opt.value} className="text-slate-800 font-medium py-1">{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Rating */}
            <div className="flex flex-col gap-1.5 lg:flex-1 lg:min-w-[125px]">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Rating</label>
              <select 
                value={filters.minRating}
                onChange={(e) => handleChange('minRating', Number(e.target.value))}
                className="w-full rounded-xl border border-slate-300 hover:border-emerald-500 focus:border-emerald-600 bg-white hover:bg-emerald-50/20 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 px-3.5 py-2 text-sm font-semibold text-slate-900 shadow-2xs outline-none transition-all duration-150 cursor-pointer"
              >
                {RATINGS.map((opt) => (
                  <option key={opt.value} value={opt.value} className="text-slate-800 font-medium py-1">{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Verified Only */}
            <div className="flex items-center gap-2 lg:mb-1 shrink-0">
              <label 
                htmlFor="verifiedOnly" 
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/80 hover:bg-emerald-50/30 hover:border-emerald-300 cursor-pointer transition-all duration-150 select-none shadow-2xs"
              >
                <input
                  type="checkbox"
                  id="verifiedOnly"
                  checked={filters.verifiedOnly}
                  onChange={(e) => handleChange('verifiedOnly', e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                />
                <span className="text-xs font-bold text-slate-800">
                  Verified Only
                </span>
              </label>
            </div>

            {/* Clear Button */}
            <div className="mt-4 flex justify-end lg:mt-0 lg:ml-auto shrink-0">
              <button
                onClick={onClear}
                className="flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white hover:bg-rose-50 hover:border-rose-300 hover:text-rose-700 px-3.5 py-2 text-xs font-bold text-slate-700 transition-all duration-150 shadow-2xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-500/20"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Clear
              </button>
            </div>

          </div>
        </div>
      </div>
    </MobileWrapper>
  );
};
