import { Review, Booking, Facility } from '../types';
import { SEED_REVIEWS } from '../data/seedData';

const STORAGE_REVIEWS_KEY = 'quickcourt_reviews_v1';
const STORAGE_FACILITIES_KEY = 'quickcourt_venues_240_v1';
const STORAGE_BOOKINGS_KEY = 'quickcourt_bookings';

export interface SubmitReviewInput {
  bookingId: string;
  facilityId: string;
  facilityName: string;
  courtName?: string;
  sport?: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number; // 1 to 5 overall
  courtQuality: number; // 1 to 5
  cleanliness: number; // 1 to 5
  staffService: number; // 1 to 5
  tags?: string[];
  comment?: string;
}

export const REVIEW_TAG_OPTIONS = [
  'Great court',
  'Clean facility',
  'Friendly staff',
  'Good lighting',
  'Value for money',
  'Needs improvement',
] as const;

function initializeReviews(): Review[] {
  const existing = localStorage.getItem(STORAGE_REVIEWS_KEY);
  if (existing) {
    try {
      const parsed: Review[] = JSON.parse(existing);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch {
      // Fallback
    }
  }

  // Normalize seed reviews to match full schema
  const seeded: Review[] = SEED_REVIEWS.map((r) => ({
    ...r,
    courtQuality: r.categories?.courtQuality || r.rating || 5,
    cleanliness: r.categories?.cleanliness || r.rating || 5,
    staffService: r.categories?.staff || r.categories?.staffService || r.rating || 5,
    tags: r.tags || ['Great court', 'Clean facility'],
    verifiedBooking: r.verifiedBooking !== undefined ? r.verifiedBooking : true,
  }));

  localStorage.setItem(STORAGE_REVIEWS_KEY, JSON.stringify(seeded));
  return seeded;
}

export const reviewService = {
  getAllReviews(): Review[] {
    return initializeReviews();
  },

  getReviewsForFacility(facilityId: string | number): Review[] {
    const all = initializeReviews();
    return all.filter((r) => String(r.facilityId) === String(facilityId));
  },

  getReviewByBookingId(bookingId: string): Review | null {
    if (!bookingId) return null;
    const all = initializeReviews();
    return all.find((r) => r.bookingId === bookingId) || null;
  },

  canReviewBooking(booking: Booking): { canReview: boolean; reason?: string; alreadyRated?: boolean } {
    if (!booking) {
      return { canReview: false, reason: 'Invalid booking reference.' };
    }

    const currentStatus = String(booking.liveStatus || booking.status);

    if (currentStatus === 'cancelled' || booking.status === 'cancelled') {
      return { canReview: false, reason: 'Cancelled bookings cannot be reviewed.' };
    }

    if (currentStatus === 'upcoming' || currentStatus === 'ready_for_entry') {
      return { canReview: false, reason: 'Rating is available only after your booked slot has completed.' };
    }

    if (currentStatus === 'in_progress') {
      return { canReview: false, reason: 'Your match is currently in progress. You can review once the slot concludes.' };
    }

    if (currentStatus !== 'completed' && booking.status !== 'completed') {
      return { canReview: false, reason: 'Booking is not yet marked as completed.' };
    }

    // Check if already rated
    const existing = this.getReviewByBookingId(booking.id);
    if (existing || booking.isRated) {
      return { canReview: true, alreadyRated: true, reason: 'You have already rated this match.' };
    }

    return { canReview: true, alreadyRated: false };
  },

  getFacilityRatingStats(facilityId: string | number) {
    const reviews = this.getReviewsForFacility(facilityId);
    if (reviews.length === 0) {
      return {
        averageRating: 4.8,
        totalReviews: 0,
        courtQualityAvg: 4.8,
        cleanlinessAvg: 4.8,
        staffServiceAvg: 4.8,
        valueForMoneyAvg: 4.7,
        tagCounts: {} as Record<string, number>,
      };
    }

    const sumRating = reviews.reduce((acc, r) => acc + (Number(r.rating) || 5), 0);
    const sumCourt = reviews.reduce((acc, r) => acc + (Number(r.courtQuality) || Number(r.rating) || 5), 0);
    const sumClean = reviews.reduce((acc, r) => acc + (Number(r.cleanliness) || Number(r.rating) || 5), 0);
    const sumStaff = reviews.reduce((acc, r) => acc + (Number(r.staffService) || Number(r.rating) || 5), 0);

    const tagCounts: Record<string, number> = {};
    reviews.forEach((r) => {
      if (Array.isArray(r.tags)) {
        r.tags.forEach((t) => {
          tagCounts[t] = (tagCounts[t] || 0) + 1;
        });
      }
    });

    return {
      averageRating: parseFloat((sumRating / reviews.length).toFixed(1)),
      totalReviews: reviews.length,
      courtQualityAvg: parseFloat((sumCourt / reviews.length).toFixed(1)),
      cleanlinessAvg: parseFloat((sumClean / reviews.length).toFixed(1)),
      staffServiceAvg: parseFloat((sumStaff / reviews.length).toFixed(1)),
      valueForMoneyAvg: 4.8,
      tagCounts,
    };
  },

  async submitReview(input: SubmitReviewInput): Promise<{
    review: Review;
    facilityRating: number;
    reviewCount: number;
  }> {
    if (!input.rating || input.rating < 1 || input.rating > 5) {
      throw new Error('Please select an overall star rating between 1 and 5.');
    }

    const allReviews = initializeReviews();

    // Prevent duplicate review submissions for same booking
    const existingIndex = allReviews.findIndex((r) => r.bookingId === input.bookingId);
    if (existingIndex !== -1) {
      // Switch to update instead of creating duplicate
      return this.updateReview(allReviews[existingIndex].id, input);
    }

    const reviewId = `rev_${Date.now()}_${Math.floor(100 + Math.random() * 900)}`;
    const newReview: Review = {
      id: reviewId,
      bookingId: input.bookingId,
      facilityId: String(input.facilityId),
      facilityName: input.facilityName,
      courtName: input.courtName,
      sport: input.sport,
      userId: input.userId,
      userName: input.userName || 'Player',
      userAvatar:
        input.userAvatar ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      rating: Number(input.rating),
      courtQuality: Number(input.courtQuality || input.rating),
      cleanliness: Number(input.cleanliness || input.rating),
      staffService: Number(input.staffService || input.rating),
      categories: {
        courtQuality: Number(input.courtQuality || input.rating),
        cleanliness: Number(input.cleanliness || input.rating),
        staffService: Number(input.staffService || input.rating),
        staff: Number(input.staffService || input.rating),
        facilityQuality: Number(input.courtQuality || input.rating),
        valueForMoney: 5,
      },
      tags: input.tags || [],
      comment: (input.comment || '').trim(),
      verifiedBooking: true, // Only submitted from verified completed bookings
      createdAt: new Date().toISOString(),
    };

    allReviews.unshift(newReview);
    localStorage.setItem(STORAGE_REVIEWS_KEY, JSON.stringify(allReviews));

    // 1. Update Booking state in localStorage
    this._updateBookingWithRating(input.bookingId, reviewId, input.rating);

    // 2. Recalculate Venue Average Rating and Total Review Count
    const { facilityRating, reviewCount } = this._recalculateVenueRating(input.facilityId);

    // 3. Dispatch global events so all components refresh in real-time
    this._broadcastUpdates();

    return {
      review: newReview,
      facilityRating,
      reviewCount,
    };
  },

  async updateReview(
    reviewId: string,
    input: Partial<SubmitReviewInput>
  ): Promise<{
    review: Review;
    facilityRating: number;
    reviewCount: number;
  }> {
    const allReviews = initializeReviews();
    const index = allReviews.findIndex((r) => r.id === reviewId || (input.bookingId && r.bookingId === input.bookingId));
    if (index === -1) {
      throw new Error('Review not found to update.');
    }

    const prev = allReviews[index];
    const newRating = input.rating !== undefined ? Number(input.rating) : prev.rating;
    const newCourt = input.courtQuality !== undefined ? Number(input.courtQuality) : prev.courtQuality;
    const newClean = input.cleanliness !== undefined ? Number(input.cleanliness) : prev.cleanliness;
    const newStaff = input.staffService !== undefined ? Number(input.staffService) : prev.staffService;

    const updatedReview: Review = {
      ...prev,
      rating: newRating,
      courtQuality: newCourt,
      cleanliness: newClean,
      staffService: newStaff,
      categories: {
        courtQuality: newCourt,
        cleanliness: newClean,
        staffService: newStaff,
        staff: newStaff,
        facilityQuality: newCourt,
        valueForMoney: 5,
      },
      tags: input.tags !== undefined ? input.tags : prev.tags,
      comment: input.comment !== undefined ? input.comment.trim() : prev.comment,
      updatedAt: new Date().toISOString(),
    };

    allReviews[index] = updatedReview;
    localStorage.setItem(STORAGE_REVIEWS_KEY, JSON.stringify(allReviews));

    // Update booking record
    this._updateBookingWithRating(prev.bookingId, updatedReview.id, newRating);

    // Recalculate Venue
    const { facilityRating, reviewCount } = this._recalculateVenueRating(prev.facilityId);

    this._broadcastUpdates();

    return {
      review: updatedReview,
      facilityRating,
      reviewCount,
    };
  },

  _updateBookingWithRating(bookingId: string, reviewId: string, rating: number) {
    try {
      const stored = localStorage.getItem(STORAGE_BOOKINGS_KEY);
      if (!stored) return;
      const bookings: Booking[] = JSON.parse(stored);
      const bIndex = bookings.findIndex((b) => b.id === bookingId);
      if (bIndex !== -1) {
        bookings[bIndex] = {
          ...bookings[bIndex],
          isRated: true,
          userRating: rating,
          reviewId,
          ratedAt: new Date().toISOString(),
        };
        localStorage.setItem(STORAGE_BOOKINGS_KEY, JSON.stringify(bookings));
      }
    } catch {
      // Ignore
    }
  },

  _recalculateVenueRating(facilityId: string | number): { facilityRating: number; reviewCount: number } {
    try {
      const allReviews = initializeReviews();
      const facReviews = allReviews.filter((r) => String(r.facilityId) === String(facilityId));
      const count = facReviews.length;
      let avg = 4.8;

      if (count > 0) {
        const sum = facReviews.reduce((acc, r) => acc + (Number(r.rating) || 5), 0);
        avg = parseFloat((sum / count).toFixed(1));
      }

      // Update venue list in storage
      const storedFacs = localStorage.getItem(STORAGE_FACILITIES_KEY);
      if (storedFacs) {
        const facs: Facility[] = JSON.parse(storedFacs);
        const fIndex = facs.findIndex((f) => String(f.id) === String(facilityId) || f.idStr === String(facilityId));
        if (fIndex !== -1) {
          facs[fIndex] = {
            ...facs[fIndex],
            rating: avg,
            reviewCount: count,
          };
          localStorage.setItem(STORAGE_FACILITIES_KEY, JSON.stringify(facs));
        }
      }

      return { facilityRating: avg, reviewCount: count };
    } catch {
      return { facilityRating: 4.8, reviewCount: 1 };
    }
  },

  _broadcastUpdates() {
    window.dispatchEvent(new Event('quickcourt_reviews_updated'));
    window.dispatchEvent(new Event('quickcourt_facilities_updated'));
    window.dispatchEvent(new Event('quickcourt_slots_updated'));
    window.dispatchEvent(new Event('storage'));
  },
};
