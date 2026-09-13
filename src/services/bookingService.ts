import { Booking, SportType } from '../types';
import { SEED_BOOKINGS } from '../data/seedData';

const STORAGE_BOOKINGS_KEY = 'quickcourt_bookings';

function initializeBookings(): Booking[] {
  const existing = localStorage.getItem(STORAGE_BOOKINGS_KEY);
  if (existing) {
    try {
      return JSON.parse(existing);
    } catch {
      // Fallback
    }
  }
  localStorage.setItem(STORAGE_BOOKINGS_KEY, JSON.stringify(SEED_BOOKINGS));
  return SEED_BOOKINGS;
}

export interface CreateBookingDraft {
  userId: string;
  userName: string;
  userEmail: string;
  userPhone?: string;
  venueId: string;
  venueName: string;
  venueImage?: string;
  venueAddress?: string;
  courtId: string;
  courtName: string;
  sport: SportType;
  date: string;
  startTime: string;
  endTime: string;
  duration?: string;
  courtPrice: number;
  platformFee?: number;
  tax?: number;
  discount?: number;
  totalAmount?: number;
}

export const bookingService = {
  getBookings(userId?: string): Booking[] {
    const all = initializeBookings();
    if (!userId) return all;
    return all.filter((b) => b.userId === userId || b.userEmail?.toLowerCase() === userId.toLowerCase());
  },

  getBookingById(id: string): Booking | null {
    const all = initializeBookings();
    return all.find((b) => b.id === id) || null;
  },

  calculatePricing(courtPrice: number, durationHours = 1) {
    const subtotal = courtPrice * durationHours;
    const platformFee = 25; // Standard flat ₹25 platform fee as requested in Section 31
    const total = subtotal + platformFee;
    return {
      courtPrice: subtotal,
      platformFee,
      tax: 0,
      discount: 0,
      total,
    };
  },

  async createBooking(draft: CreateBookingDraft): Promise<Booking> {
    const all = initializeBookings();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const dateFormatted = draft.date.replace(/-/g, '');
    const bookingId = `QC-${dateFormatted}-${randomSuffix}`;
    const transactionId = `TXN-QC-${Math.floor(100000 + Math.random() * 900000)}`;

    const platformFee = draft.platformFee !== undefined ? draft.platformFee : 25;
    const totalAmount = draft.totalAmount || (draft.courtPrice + platformFee);

    const newBooking: Booking = {
      id: bookingId,
      userId: draft.userId,
      userName: draft.userName,
      userEmail: draft.userEmail,
      userPhone: draft.userPhone || '+91 98765 43210',
      facilityId: draft.venueId,
      facilityName: draft.venueName,
      venueId: draft.venueId,
      venueName: draft.venueName,
      facilityImage:
        draft.venueImage ||
        'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=900&auto=format&fit=crop&q=80',
      facilityAddress: draft.venueAddress || 'Main Stadium Road',
      courtId: draft.courtId,
      courtName: draft.courtName,
      sport: draft.sport,
      date: draft.date,
      startTime: draft.startTime,
      endTime: draft.endTime,
      duration: draft.duration || '1 Hour',
      courtPrice: draft.courtPrice,
      platformFee,
      tax: draft.tax || 0,
      discount: draft.discount || 0,
      totalAmount,
      total: totalAmount,
      price: draft.courtPrice,
      status: 'confirmed',
      paymentStatus: 'successful',
      paymentId: `pay_sim_${Date.now()}`,
      transactionId,
      qrCodeData: `QC-PASS|${bookingId}|${draft.userId}|${draft.venueId}|${draft.courtId}|${draft.date}|${draft.startTime}-${draft.endTime}`,
      createdAt: new Date().toISOString(),
    };

    all.unshift(newBooking);
    localStorage.setItem(STORAGE_BOOKINGS_KEY, JSON.stringify(all));

    return newBooking;
  },

  async cancelBooking(bookingId: string, reason = 'Cancelled by player'): Promise<Booking> {
    const all = initializeBookings();
    const index = all.findIndex((b) => b.id === bookingId);
    if (index === -1) {
      throw new Error('Booking not found');
    }

    const booking = all[index];
    if (booking.status === 'completed') {
      throw new Error('Past or completed bookings cannot be cancelled.');
    }

    const updatedBooking: Booking = {
      ...booking,
      status: 'cancelled',
      paymentStatus: 'refunded',
      cancellationReason: reason,
      refundAmount: booking.totalAmount,
    };

    all[index] = updatedBooking;
    localStorage.setItem(STORAGE_BOOKINGS_KEY, JSON.stringify(all));

    return updatedBooking;
  }
};
