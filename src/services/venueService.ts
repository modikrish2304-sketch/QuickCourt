import { Facility, Court, Review, SportType } from '../types';
import { SEED_FACILITIES, SEED_COURTS, SPORTS, CITIES } from '../data/seedData';
import { timeslotService } from './timeslotService';
import { reviewService } from './reviewService';

const STORAGE_FACILITIES_KEY = 'quickcourt_venues_240_v1';
const STORAGE_COURTS_KEY = 'quickcourt_courts_240_v1';

function initializeFacilities(): Facility[] {
  const existing = localStorage.getItem(STORAGE_FACILITIES_KEY);
  if (existing) {
    try {
      const parsed = JSON.parse(existing);
      if (Array.isArray(parsed) && parsed.length >= 240) {
        return parsed;
      }
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
      const parsed = JSON.parse(existing);
      if (Array.isArray(parsed) && parsed.length >= 480) {
        return parsed;
      }
    } catch {
      // Fallback
    }
  }
  localStorage.setItem(STORAGE_COURTS_KEY, JSON.stringify(SEED_COURTS));
  return SEED_COURTS;
}

export interface VenueFilterParams {
  search?: string;
  venueSearch?: string;
  sport?: SportType | string;
  priceRange?: 'all' | 'under-300' | '300-500' | '500-1000' | 'above-1000';
  venueType?: 'all' | 'Indoor' | 'Outdoor' | 'Premium' | 'Community' | 'both';
  minRating?: number;
  city?: string;
  location?: string;
  verifiedOnly?: boolean;
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
  getAllSports() {
    return SPORTS;
  },

  getAllCities() {
    return CITIES;
  },

  getLocationsByCity(cityId: string) {
    const city = CITIES.find(c => c.id === cityId || c.name === cityId);
    return city ? city.famousLocations : [];
  },

  getVerifiedLocationsBySportAndCity(sport?: string, city?: string, venueSearch?: string): string[] {
    const venues = initializeFacilities().filter(f => f.status === 'approved' && f.verifiedBadge);
    const courts = initializeCourts();

    const matched = venues.filter((v) => {
      // Check venue search match
      if (venueSearch && venueSearch.trim()) {
        const vs = venueSearch.trim().toLowerCase();
        if (!v.name.toLowerCase().includes(vs)) {
          return false;
        }
      }

      // Check city match
      if (city && city !== 'all' && city !== 'All Cities') {
        if (v.city.toLowerCase() !== city.toLowerCase()) {
          return false;
        }
      }

      // Check sport match
      if (sport && sport !== 'all' && sport !== 'All Sports' && sport !== 'All Outdoor Courts') {
        const sp = sport.toLowerCase();
        const hasFacilitySport = v.sports.some((s) => {
          const sLower = s.toLowerCase();
          return (
            sLower === sp ||
            (sp.includes('pickleball') && sLower.includes('pickleball')) ||
            (sp.includes('badminton') && sLower.includes('badminton'))
          );
        });
        const hasCourtSport = courts
          .filter((c) => c.facilityId === v.id)
          .some((c) => {
            const cLower = c.sport.toLowerCase();
            return (
              cLower === sp ||
              (sp.includes('pickleball') && cLower.includes('pickleball')) ||
              (sp.includes('badminton') && cLower.includes('badminton'))
            );
          });

        if (!hasFacilitySport && !hasCourtSport) {
          return false;
        }
      }

      return true;
    });

    const uniqueLocs = Array.from(
      new Set(matched.map((v) => v.area || v.location).filter(Boolean))
    );
    return uniqueLocs.sort();
  },

  async getVenues(params: VenueFilterParams = {}): Promise<PaginatedVenuesResult> {
    const all = initializeFacilities().filter(
      (f) => f.status === 'approved'
    );
    const courts = initializeCourts();

    let filtered = all.map((fac) => ({
      ...fac,
      courts: courts.filter((c) => String(c.facilityId) === String(fac.id)),
      reviewsList: reviewService.getReviewsForFacility(fac.id),
    }));

    // Venue Name Search filter
    if (params.venueSearch && params.venueSearch.trim()) {
      const vs = params.venueSearch.trim().toLowerCase();
      filtered = filtered.filter((f) => f.name.toLowerCase().includes(vs));
    }

    // City filter
    if (params.city && params.city !== 'All Cities' && params.city !== 'all') {
      filtered = filtered.filter(
        (f) => f.city.toLowerCase() === params.city?.toLowerCase()
      );
    }

    // Location / Area filter
    if (params.location && params.location !== 'all' && params.location !== 'All Locations' && params.location !== 'All Verified Locations' && params.location !== 'none') {
      const loc = params.location.toLowerCase();
      filtered = filtered.filter(
        (f) =>
          (f.area && f.area.toLowerCase() === loc) ||
          (f.location && f.location.toLowerCase() === loc) ||
          (f.address && f.address.toLowerCase().includes(loc))
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
        f.sports.some((s) => {
          const sLower = s.toLowerCase();
          return (
            sLower === sp ||
            (sp.includes('pickleball') && sLower.includes('pickleball')) ||
            (sp.includes('badminton') && sLower.includes('badminton'))
          );
        })
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

  async getVenueById(venueId: string | number): Promise<(Omit<Facility, 'reviews'> & { courts: Court[]; reviews: Review[]; reviewsCount?: number }) | null> {
    const venues = initializeFacilities();
    const courts = initializeCourts();
    const found = venues.find((f) => String(f.id) === String(venueId) || f.idStr === String(venueId));
    if (!found) return null;

    let facCourts = courts.filter((c) => String(c.facilityId) === String(found.id));
    if (facCourts.length === 0) {
      const sport = found.sports?.[0] || 'Badminton';
      facCourts = [
        {
          id: `court_${found.id}_1`,
          facilityId: String(found.id),
          name: `Court 1 (${sport})`,
          sport: sport,
          type: found.venueType,
          pricePerHour: found.pricePerHour || found.startingPrice,
          openingTime: '06:00',
          closingTime: '23:00',
          status: 'active',
          availableSlots: ['07:00 AM', '08:00 AM', '09:00 AM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'],
        },
        {
          id: `court_${found.id}_2`,
          facilityId: String(found.id),
          name: `Court 2 (${sport})`,
          sport: sport,
          type: found.venueType,
          pricePerHour: found.pricePerHour || found.startingPrice,
          openingTime: '06:00',
          closingTime: '23:00',
          status: 'active',
          availableSlots: ['07:00 AM', '08:00 AM', '09:00 AM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'],
        },
      ];
    }

    const facReviews = reviewService.getReviewsForFacility(found.id);
    const stats = reviewService.getFacilityRatingStats(found.id);

    return {
      ...found,
      rating: stats.totalReviews > 0 ? stats.averageRating : found.rating,
      reviewCount: stats.totalReviews > 0 ? stats.totalReviews : found.reviewCount,
      reviewsCount: stats.totalReviews > 0 ? stats.totalReviews : found.reviewCount,
      courts: facCourts,
      reviews: facReviews,
    };
  },

  async getCourtsForVenue(venueId: string | number): Promise<Court[]> {
    const courts = initializeCourts();
    const res = courts.filter((c) => String(c.facilityId) === String(venueId));
    if (res.length > 0) return res;
    return [
      {
        id: `court_${venueId}_1`,
        facilityId: String(venueId),
        name: 'Court 1',
        sport: 'Badminton',
        pricePerHour: 500,
        openingTime: '06:00',
        closingTime: '23:00',
        status: 'active',
        availableSlots: ['07:00 AM', '08:00 AM', '05:00 PM', '06:00 PM', '07:00 PM'],
      }
    ];
  },

  async getPopularVenues(limit = 6): Promise<Facility[]> {
    const all = initializeFacilities().filter((f) => f.status === 'approved');
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
        image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=600&auto=format&fit=crop',
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
        image: 'https://upload.wikimedia.org/wikipedia/commons/7/71/A_pickleball_paddle_with_two_pickleballs.jpg',
        description: 'USA Pickleball regulation sized cushioned multi-color courts'
      }
    ];
  },

  getTimeSlotsForCourt(courtId: string, date: string) {
    return timeslotService.getSlotsForCourt(courtId, date);
  }
};
