import { Facility, Court, Review, SportType } from '../types';
import { SEED_FACILITIES, SEED_COURTS, SEED_REVIEWS } from '../data/seedData';
import { timeslotService } from './timeslotService';

const STORAGE_FACILITIES_KEY = 'quickcourt_facilities';
const STORAGE_COURTS_KEY = 'quickcourt_courts';

function initializeFacilities(): Facility[] {
  const existing = localStorage.getItem(STORAGE_FACILITIES_KEY);
  if (existing) {
    try {
      return JSON.parse(existing);
    } catch {
      // Fallback
    }
  }
  localStorage.setItem(STORAGE_FACILITIES_KEY, JSON.stringify(SEED_FACILITIES));
  return SEED_FACILITIES;
}

function initializeCourts(): Court[] {
  const existing = localStorage.getItem(STORAGE_COURTS_KEY);
  if (existing) {
    try {
      return JSON.parse(existing);
    } catch {
      // Fallback
    }
  }
  localStorage.setItem(STORAGE_COURTS_KEY, JSON.stringify(SEED_COURTS));
  return SEED_COURTS;
}

export interface VenueFilterParams {
  search?: string;
  sport?: SportType | string;
  priceRange?: 'all' | 'under-300' | '300-500' | '500-1000' | 'above-1000';
  venueType?: 'all' | 'Indoor' | 'Outdoor' | 'Premium' | 'Community' | 'both';
  minRating?: number;
  city?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedVenuesResult {
  venues: Facility[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}

export const venueService = {
  async getVenues(params: VenueFilterParams = {}): Promise<PaginatedVenuesResult> {
    const all = initializeFacilities().filter(
      (f) => f.status === 'approved' || f.status === undefined || (f as any).approved !== false
    );
    const courts = initializeCourts();

    let filtered = all.map((fac) => ({
      ...fac,
      courts: courts.filter((c) => c.facilityId === fac.id),
      reviews: SEED_REVIEWS.filter((r) => r.facilityId === fac.id),
    }));

    // City filter
    if (params.city && params.city !== 'All Cities') {
      filtered = filtered.filter(
        (f) => f.city.toLowerCase() === params.city?.toLowerCase()
      );
    }

    // Dynamic Search: matches name, location/address/area, or sports
    if (params.search && params.search.trim()) {
      const q = params.search.trim().toLowerCase();
      filtered = filtered.filter((f) => {
        const nameMatch = f.name.toLowerCase().includes(q);
        const areaMatch = f.area.toLowerCase().includes(q) || f.address.toLowerCase().includes(q);
        const cityMatch = f.city.toLowerCase().includes(q);
        const sportMatch = f.sports.some((s) => s.toLowerCase().includes(q));
        return nameMatch || areaMatch || cityMatch || sportMatch;
      });
    }

    // Sport filter
    if (params.sport && params.sport !== 'All' && params.sport !== 'all') {
      const sp = params.sport.toLowerCase();
      filtered = filtered.filter((f) =>
        f.sports.some((s) => s.toLowerCase() === sp)
      );
    }

    // Price range filter
    if (params.priceRange && params.priceRange !== 'all') {
      switch (params.priceRange) {
        case 'under-300':
          filtered = filtered.filter((f) => f.startingPrice < 300);
          break;
        case '300-500':
          filtered = filtered.filter((f) => f.startingPrice >= 300 && f.startingPrice <= 500);
          break;
        case '500-1000':
          filtered = filtered.filter((f) => f.startingPrice >= 500 && f.startingPrice <= 1000);
          break;
        case 'above-1000':
          filtered = filtered.filter((f) => f.startingPrice >= 1000);
          break;
      }
    }

    // Venue type filter
    if (params.venueType && params.venueType !== 'all') {
      const vt = params.venueType.toLowerCase();
      filtered = filtered.filter((f) => {
        const facType = f.venueType.toLowerCase();
        if (vt === 'indoor') return facType === 'indoor' || facType === 'both';
        if (vt === 'outdoor') return facType === 'outdoor' || facType === 'both';
        if (vt === 'premium') return facType === 'premium' || f.startingPrice >= 500;
        if (vt === 'community') return facType === 'community' || f.startingPrice < 350;
        return facType === vt;
      });
    }

    // Min rating filter
    if (params.minRating && params.minRating > 0) {
      filtered = filtered.filter((f) => f.rating >= (params.minRating || 0));
    }

    // Pagination
    const page = Math.max(1, params.page || 1);
    const limit = params.limit || 8;
    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const offset = (page - 1) * limit;
    const paginated = filtered.slice(offset, offset + limit);

    return {
      venues: paginated,
      total,
      page,
      totalPages,
      limit,
    };
  },

  async getVenueById(venueId: string): Promise<(Facility & { courts: Court[]; reviews: Review[] }) | null> {
    const venues = initializeFacilities();
    const courts = initializeCourts();
    const found = venues.find((f) => f.id === venueId);
    if (!found) return null;

    const facCourts = courts.filter((c) => c.facilityId === found.id);
    const facReviews = SEED_REVIEWS.filter((r) => r.facilityId === found.id);

    return {
      ...found,
      courts: facCourts,
      reviews: facReviews,
    };
  },

  async getCourtsForVenue(venueId: string): Promise<Court[]> {
    const courts = initializeCourts();
    return courts.filter((c) => c.facilityId === venueId);
  },

  async getPopularVenues(limit = 6): Promise<Facility[]> {
    const all = initializeFacilities().filter((f) => f.status === 'approved' || (f as any).approved !== false);
    // Sort by rating desc
    return all.sort((a, b) => b.rating - a.rating).slice(0, limit);
  },

  getPopularSports() {
    return [
      {
        name: 'Badminton',
        slug: 'badminton',
        venueCount: 18,
        icon: '🏸',
        image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=600&auto=format&fit=crop',
        description: 'BWF standard wooden & synthetic courts with tournament lighting'
      },
      {
        name: 'Football',
        slug: 'football',
        venueCount: 14,
        icon: '⚽',
        image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=600&auto=format&fit=crop',
        description: 'FIFA grade 5v5 & 7v7 artificial rubber-infill turf pitches'
      },
      {
        name: 'Cricket',
        slug: 'cricket',
        venueCount: 12,
        icon: '🏏',
        image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=600&auto=format&fit=crop',
        description: 'Box cricket arenas & outdoor net practice bowling wickets'
      },
      {
        name: 'Tennis',
        slug: 'tennis',
        venueCount: 10,
        icon: '🎾',
        image: 'https://images.unsplash.com/photo-1587280501635-6cb10ce690a2?q=80&w=600&auto=format&fit=crop',
        description: 'ITF certified acrylic, clay & floodlit grass courts'
      },
      {
        name: 'Basketball',
        slug: 'basketball',
        venueCount: 9,
        icon: '🏀',
        image: 'https://images.unsplash.com/photo-1505666287802-931dc83948e9?q=80&w=600&auto=format&fit=crop',
        description: 'Indoor maple wood & outdoor acrylic full courts'
      },
      {
        name: 'Pickleball',
        slug: 'pickleball',
        venueCount: 11,
        icon: '🏓',
        image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=600&auto=format&fit=crop',
        description: 'USA Pickleball regulation sized cushioned multi-color courts'
      }
    ];
  },

  getTimeSlotsForCourt(courtId: string, date: string) {
    return timeslotService.getSlotsForCourt(courtId, date);
  }
};
