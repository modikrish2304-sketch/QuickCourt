
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
  initialLocation?: string;
}

export const VenuesPage: React.FC<VenuesPageProps> = ({
  onNavigate,
  initialQuery = '',
  initialSport = 'all',
  initialCity = 'all',
  initialLocation = 'all',
}) => {
  const normalizedInitialCity = !initialCity || initialCity === 'All Cities' ? 'all' : initialCity;
  const normalizedInitialSport = !initialSport || initialSport === 'All Sports' ? 'all' : initialSport;
  const normalizedInitialLocation = !initialLocation || initialLocation === 'All Locations' ? 'all' : initialLocation;

  const [venues, setVenues] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(initialQuery);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');

  const [filters, setFilters] = useState<FilterState>({
    sport: normalizedInitialSport,
    city: normalizedInitialCity,
    venueSearch: '',
    location: normalizedInitialLocation,
    priceRange: 'all',
    venueType: 'all',
    minRating: 0,
    verifiedOnly: false,
  });

  // Sync state when props change (e.g. from hero search or navbar navigation)
  useEffect(() => {
    setSearch(initialQuery);
    setFilters((prev) => ({
      ...prev,
      sport: !initialSport || initialSport === 'All Sports' ? 'all' : initialSport,
      city: !initialCity || initialCity === 'All Cities' ? 'all' : initialCity,
      location: !initialLocation || initialLocation === 'All Locations' ? 'all' : initialLocation,
    }));
    setPage(1);
  }, [initialQuery, initialSport, initialCity, initialLocation]);

  const fetchVenues = async () => {
    try {
      setLoading(true);
      
      const filterParams: VenueFilterParams = {
        search,
        venueSearch: filters.venueSearch && filters.venueSearch.trim() ? filters.venueSearch.trim() : undefined,
        sport: filters.sport && filters.sport !== 'all' && filters.sport !== 'All Sports' ? filters.sport : undefined,
        city: filters.city && filters.city !== 'all' && filters.city !== 'All Cities' ? filters.city : undefined,
        location: filters.location && filters.location !== 'all' && filters.location !== 'All Locations' ? filters.location : undefined,
        priceRange: filters.priceRange !== 'all' ? (filters.priceRange as any) : undefined,
        venueType: filters.venueType !== 'all' ? (filters.venueType as any) : undefined,
        minRating: filters.minRating > 0 ? filters.minRating : undefined,
        verifiedOnly: filters.verifiedOnly ? true : undefined,
        page,
        limit: 12,
      };

      let result = await venueService.getVenues(filterParams);
      
      let sortedVenues = [...result.venues];
      if (sortBy === 'top-rated') {
        sortedVenues.sort((a, b) => ((b.topRated ? 1 : 0) - (a.topRated ? 1 : 0)) || b.rating - a.rating);
      } else if (sortBy === 'rating') {
        sortedVenues.sort((a, b) => b.rating - a.rating);
      } else if (sortBy === 'price-low') {
        sortedVenues.sort((a, b) => (a.pricePerHour ?? a.startingPrice) - (b.pricePerHour ?? b.startingPrice));
      } else if (sortBy === 'price-high') {
        sortedVenues.sort((a, b) => (b.pricePerHour ?? b.startingPrice) - (a.pricePerHour ?? a.startingPrice));
      } else if (sortBy === 'most-reviewed') {
        sortedVenues.sort((a, b) => ((b.reviews ?? b.reviewCount ?? 0) - (a.reviews ?? a.reviewCount ?? 0)));
      }
      
      setVenues(sortedVenues);
      setTotalPages(result.totalPages);
      setTotalCount(result.total);
    } catch (error) {
      console.error('Failed to fetch venues', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, [filters, search, page, sortBy]);

  const handleClearFilters = () => {
    setFilters({
      sport: 'all',
      city: 'all',
      venueSearch: '',
      location: 'all',
      priceRange: 'all',
      venueType: 'all',
      minRating: 0,
      verifiedOnly: false,
    });
    setSearch('');
    setPage(1);
    setSortBy('recommended');
  };

  const removeFilterTag = (key: keyof FilterState) => {
    setFilters({ ...filters, [key]: key === 'minRating' ? 0 : key === 'verifiedOnly' ? false : key === 'venueSearch' ? '' : 'all' });
    setPage(1);
  };

  const hasActiveFilters =
    (filters.sport !== 'all' && filters.sport !== 'All Sports') ||
    (Boolean(filters.city) && filters.city !== 'all' && filters.city !== 'All Cities') ||
    Boolean(filters.venueSearch) ||
    (filters.location !== 'all' && filters.location !== 'All Locations') ||
    filters.priceRange !== 'all' ||
    filters.venueType !== 'all' ||
    filters.minRating > 0 ||
    filters.verifiedOnly ||
    search !== '';

  return (
    <div className="min-h-screen bg-slate-50/70 pt-24 sm:pt-28 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Page Header / Breadcrumb Frame */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200/80 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Availability
              </span>
              <span className="text-xs font-semibold text-slate-300">•</span>
              <span className="text-xs font-semibold text-slate-500">
                {totalCount} Verified Arenas
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
              Explore Courts & Venues
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Find and book available courts across badminton, football, cricket, tennis, pickleball and more.
            </p>
          </div>
        </div>

        {/* Top Search & Filter Trigger Bar Frame */}
        <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-2xs mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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
            
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 shadow-2xs">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Sort:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer"
                >
                  <option value="recommended">Recommended</option>
                  <option value="top-rated">Top Rated</option>
                  <option value="rating">Rating: High to Low</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="most-reviewed">Most Reviewed</option>
                </select>
              </div>

              {/* Mobile Filter Button */}
              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-100 shadow-2xs transition-colors"
              >
                <Filter className="w-4 h-4 text-emerald-600" />
                <span>Filters</span>
                {hasActiveFilters && (
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Filter Panel */}
        <div className="hidden lg:block mb-8">
            <FilterPanel
              filters={filters}
              onChange={(f) => {
                setFilters(f);
                setPage(1);
              }}
              onClear={handleClearFilters}
            />
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
            {filters.venueSearch && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                Venue: "{filters.venueSearch}"
                <button onClick={() => removeFilterTag('venueSearch')}>
                  <X className="w-3 h-3 text-emerald-600 hover:text-emerald-800" />
                </button>
              </span>
            )}
            {filters.city && filters.city !== 'all' && filters.city !== 'All Cities' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                City: {filters.city}
                <button onClick={() => removeFilterTag('city')}>
                  <X className="w-3 h-3 text-emerald-600 hover:text-emerald-800" />
                </button>
              </span>
            )}
            {filters.location !== 'all' && filters.location !== 'All Locations' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                Location: {filters.location}
                <button onClick={() => removeFilterTag('location')}>
                  <X className="w-3 h-3 text-emerald-600 hover:text-emerald-800" />
                </button>
              </span>
            )}
            {filters.sport && filters.sport !== 'all' && filters.sport !== 'All Sports' && (
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
            {filters.verifiedOnly && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                Verified Only
                <button onClick={() => removeFilterTag('verifiedOnly')}>
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

        {/* Venues Grid Container */}
        <div className="space-y-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
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
                No venues found
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Try changing your sport, city, price range, or filters.
              </p>
              <Button
                variant="primary"
                size="sm"
                onClick={handleClearFilters}
                leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            /* Venues Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
