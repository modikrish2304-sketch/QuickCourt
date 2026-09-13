import React, { useState, useEffect } from 'react';
import { venueService, VenueFilterParams } from '../services/venueService';
import { Facility } from '../types';
import { VenueCard } from '../components/VenueCard';
import { SearchBar } from '../components/SearchBar';
import { FilterPanel, FilterState } from '../components/FilterPanel';
import { Pagination } from '../components/Pagination';
import { SkeletonCard } from '../components/SkeletonCard';
import { Button } from '../components/Button';
import { Filter, MapPin, X, RotateCcw } from 'lucide-react';

export interface VenuesPageProps {
  onNavigate: (route: string) => void;
  initialQuery?: string;
  initialSport?: string;
  initialCity?: string;
}

export const VenuesPage: React.FC<VenuesPageProps> = ({
  onNavigate,
  initialQuery = '',
  initialSport = 'all',
  initialCity = 'All Cities',
}) => {
  const [venues, setVenues] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(initialQuery);
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    sport: initialSport,
    priceRange: 'all',
    venueType: 'all',
    minRating: 0,
  });

  const cities = ['All Cities', 'Bengaluru', 'Ahmedabad', 'Mumbai', 'Delhi', 'Pune', 'Hyderabad'];

  const fetchVenues = async () => {
    try {
      setLoading(true);
      const params: VenueFilterParams = {
        search: search.trim() || undefined,
        sport: filters.sport !== 'all' ? filters.sport : undefined,
        priceRange: filters.priceRange as any,
        venueType: filters.venueType as any,
        minRating: filters.minRating > 0 ? filters.minRating : undefined,
        city: selectedCity !== 'All Cities' ? selectedCity : undefined,
        page,
        limit: 8,
      };

      const result = await venueService.getVenues(params);
      setVenues(result.venues);
      setTotalPages(result.totalPages);
      setTotalCount(result.total);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, [search, filters, selectedCity, page]);

  const handleClearFilters = () => {
    setFilters({
      sport: 'all',
      priceRange: 'all',
      venueType: 'all',
      minRating: 0,
    });
    setSearch('');
    setSelectedCity('All Cities');
    setPage(1);
  };

  const removeFilterTag = (key: keyof FilterState) => {
    setFilters((prev) => ({
      ...prev,
      [key]: key === 'minRating' ? 0 : 'all',
    }));
    setPage(1);
  };

  const hasActiveFilters =
    filters.sport !== 'all' ||
    filters.priceRange !== 'all' ||
    filters.venueType !== 'all' ||
    filters.minRating > 0 ||
    search.trim().length > 0 ||
    selectedCity !== 'All Cities';

  return (
    <div className="min-h-screen bg-slate-50/50 py-8 sm:py-12 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Sports Venues & Arenas
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Find, compare and book tournament-grade courts in your neighborhood.
            </p>
          </div>

          {/* City selector dropdown */}
          <div className="flex items-center gap-2 self-start md:self-auto bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-xs">
            <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-xs font-semibold text-slate-400">City:</span>
            <select
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                setPage(1);
              }}
              className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
            >
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Top Search & Filter Trigger Bar */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1">
            <SearchBar
              value={search}
              onChange={(val) => {
                setSearch(val);
                setPage(1);
              }}
              placeholder="Search by venue name, sport or area..."
            />
          </div>

          {/* Mobile Filter Button */}
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-3 rounded-2xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 shadow-xs"
          >
            <Filter className="w-4 h-4 text-emerald-600" />
            <span>Filter</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
            )}
          </button>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6 text-xs">
            <span className="text-slate-400 font-medium">Active filters:</span>

            {search && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                Keyword: "{search}"
                <button onClick={() => setSearch('')}>
                  <X className="w-3 h-3 text-emerald-600 hover:text-emerald-800" />
                </button>
              </span>
            )}

            {selectedCity !== 'All Cities' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                City: {selectedCity}
                <button onClick={() => setSelectedCity('All Cities')}>
                  <X className="w-3 h-3 text-emerald-600 hover:text-emerald-800" />
                </button>
              </span>
            )}

            {filters.sport !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                Sport: {filters.sport}
                <button onClick={() => removeFilterTag('sport')}>
                  <X className="w-3 h-3 text-emerald-600 hover:text-emerald-800" />
                </button>
              </span>
            )}

            {filters.priceRange !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                Price: {filters.priceRange}
                <button onClick={() => removeFilterTag('priceRange')}>
                  <X className="w-3 h-3 text-emerald-600 hover:text-emerald-800" />
                </button>
              </span>
            )}

            {filters.venueType !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                Type: {filters.venueType}
                <button onClick={() => removeFilterTag('venueType')}>
                  <X className="w-3 h-3 text-emerald-600 hover:text-emerald-800" />
                </button>
              </span>
            )}

            {filters.minRating > 0 && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                Rating: {filters.minRating}+ ★
                <button onClick={() => removeFilterTag('minRating')}>
                  <X className="w-3 h-3 text-emerald-600 hover:text-emerald-800" />
                </button>
              </span>
            )}

            <button
              onClick={handleClearFilters}
              className="text-xs font-semibold text-red-600 hover:text-red-700 ml-2"
            >
              Reset All
            </button>
          </div>
        )}

        {/* Main 2-Column Grid: Filters Sidebar + Venues Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Left Column: Filter Panel (desktop) */}
          <div className="hidden lg:block lg:col-span-1 sticky top-24">
            <FilterPanel
              filters={filters}
              onChange={(f) => {
                setFilters(f);
                setPage(1);
              }}
              onClear={handleClearFilters}
            />
          </div>

          {/* Right Column: Venues Grid */}
          <div className="lg:col-span-3 space-y-6">
            {/* Header with Result Count */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {loading ? 'Searching venues...' : `${totalCount} Venues Found`}
              </span>
              <span className="text-xs text-slate-400">
                Page {page} of {totalPages}
              </span>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : venues.length === 0 ? (
              /* Empty State */
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-4 shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-2xl">
                  🏟️
                </div>
                <h3 className="text-base font-bold text-slate-900 font-display">
                  No Venues Match Your Search
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  We couldn't find any courts matching your current filters. Try changing your sport, location or price range.
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleClearFilters}
                  leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
                >
                  Reset All Filters
                </Button>
              </div>
            ) : (
              /* Venues Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {venues.map((venue) => (
                  <VenueCard
                    key={venue.id}
                    venue={venue}
                    onViewDetails={(id) => onNavigate(`/venues/${id}`)}
                    onBookNow={(id) => onNavigate(`/booking/${id}`)}
                  />
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {!loading && totalPages > 1 && (
              <div className="pt-6">
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={(p) => {
                    setPage(p);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      <FilterPanel
        filters={filters}
        onChange={(f) => {
          setFilters(f);
          setPage(1);
        }}
        onClear={handleClearFilters}
        isOpenMobile={mobileFilterOpen}
        onCloseMobile={() => setMobileFilterOpen(false)}
      />
    </div>
  );
};
