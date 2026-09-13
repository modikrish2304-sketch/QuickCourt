import React from 'react';
import { Filter, X, RotateCcw } from 'lucide-react';
import { SportType } from '../types';

export interface FilterState {
  sport: string;
  priceRange: string;
  venueType: string;
  minRating: number;
}

export interface FilterPanelProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onClear: () => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

const SPORTS_OPTIONS: { label: string; value: string }[] = [
  { label: 'All Sports', value: 'all' },
  { label: 'Badminton', value: 'Badminton' },
  { label: 'Football', value: 'Football' },
  { label: 'Cricket', value: 'Cricket' },
  { label: 'Tennis', value: 'Tennis' },
  { label: 'Basketball', value: 'Basketball' },
  { label: 'Pickleball', value: 'Pickleball' },
];

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

const RATING_OPTIONS = [
  { label: 'Any Rating', value: 0 },
  { label: '4.5+ ★', value: 4.5 },
  { label: '4.0+ ★', value: 4.0 },
  { label: '3.5+ ★', value: 3.5 },
];

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onChange,
  onClear,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const hasActiveFilters =
    filters.sport !== 'all' ||
    filters.priceRange !== 'all' ||
    filters.venueType !== 'all' ||
    filters.minRating > 0;

  const content = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-emerald-600" />
          <h3 className="font-bold text-slate-900 text-sm font-display">Filters</h3>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Clear All
          </button>
        )}
      </div>

      {/* Sport Type */}
      <div>
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5 block">
          Sport Type
        </label>
        <div className="flex flex-wrap gap-1.5">
          {SPORTS_OPTIONS.map((opt) => {
            const isSelected =
              filters.sport === opt.value ||
              (opt.value === 'all' && (filters.sport === 'all' || !filters.sport));

            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange({ ...filters, sport: opt.value })}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5 block">
          Price Range
        </label>
        <div className="flex flex-wrap gap-1.5">
          {PRICE_OPTIONS.map((opt) => {
            const isSelected = filters.priceRange === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange({ ...filters, priceRange: opt.value })}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Venue Type */}
      <div>
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5 block">
          Venue Type
        </label>
        <div className="flex flex-wrap gap-1.5">
          {VENUE_TYPES.map((opt) => {
            const isSelected = filters.venueType === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange({ ...filters, venueType: opt.value })}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Minimum Rating */}
      <div>
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5 block">
          Rating
        </label>
        <div className="flex flex-wrap gap-1.5">
          {RATING_OPTIONS.map((opt) => {
            const isSelected = filters.minRating === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange({ ...filters, minRating: opt.value })}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop side card */}
      <div className="hidden lg:block bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        {content}
      </div>

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end bg-slate-900/50 backdrop-blur-sm">
          <div className="w-full max-w-xs bg-white h-full p-6 shadow-2xl overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-base text-slate-900">Filter Venues</h3>
                <button
                  onClick={onCloseMobile}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {content}
            </div>

            <div className="pt-6 border-t border-slate-200 mt-6 flex gap-3">
              <button
                onClick={onClear}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Reset
              </button>
              <button
                onClick={onCloseMobile}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-xs font-bold text-white hover:bg-emerald-700"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
