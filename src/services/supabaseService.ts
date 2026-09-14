import { supabase, SUPABASE_PROJECT_ID, SUPABASE_URL } from '../lib/supabase';
import { Booking } from '../types';

export interface SupabaseSyncResult {
  success: boolean;
  tableUsed?: string;
  error?: string;
  code?: string;
  data?: any;
}

export interface FailedBookingRecord {
  id?: string;
  userId?: string;
  userName?: string;
  userEmail?: string;
  userPhone?: string;
  venueId?: string;
  venueName?: string;
  courtId?: string;
  courtName?: string;
  sport?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  duration?: string;
  courtPrice?: number;
  totalAmount?: number;
  errorMessage: string;
  errorType?: 'validation' | 'slot_unavailable' | 'payment_failed' | 'user_abandoned' | 'system_error';
  timestamp?: string;
}

// SQL Schema for user to run in Supabase SQL Editor
export const SUPABASE_BOOKINGS_SQL = `-- Run this in your Supabase SQL Editor (Project: ${SUPABASE_PROJECT_ID})
-- This creates the bookings table for all filled and failed appointment booking forms

CREATE TABLE IF NOT EXISTS public.bookings (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  user_name TEXT,
  user_email TEXT,
  user_phone TEXT,
  venue_id TEXT,
  venue_name TEXT,
  court_id TEXT,
  court_name TEXT,
  sport TEXT,
  date TEXT,
  start_time TEXT,
  end_time TEXT,
  duration TEXT,
  court_price NUMERIC,
  platform_fee NUMERIC DEFAULT 0,
  tax NUMERIC DEFAULT 0,
  discount NUMERIC DEFAULT 0,
  total_amount NUMERIC,
  status TEXT DEFAULT 'confirmed',
  payment_status TEXT DEFAULT 'successful',
  transaction_id TEXT,
  cancellation_reason TEXT,
  error_message TEXT,
  error_type TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Allow public anonymous and authenticated insertions (for booking form submissions)
CREATE POLICY "Allow public insert on bookings"
  ON public.bookings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow public read access to bookings
CREATE POLICY "Allow public select on bookings"
  ON public.bookings
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow public updates (for payment confirmations and status updates)
CREATE POLICY "Allow public update on bookings"
  ON public.bookings
  FOR UPDATE
  TO anon, authenticated
  USING (true);
`;

class SupabaseService {
  private lastStatus: { connected: boolean; tableExists: boolean; message: string } = {
    connected: false,
    tableExists: false,
    message: 'Checking...',
  };

  /**
   * Check connection and see if the bookings table is ready in Supabase
   */
  async checkConnection(): Promise<{ connected: boolean; tableExists: boolean; message: string }> {
    try {
      // Test querying bookings table
      const { data, error } = await supabase.from('bookings').select('id').limit(1);

      if (!error) {
        this.lastStatus = {
          connected: true,
          tableExists: true,
          message: 'Connected to Supabase (table "bookings" ready)',
        };
        return this.lastStatus;
      }

      // Check if table is missing in Supabase schema cache
      if (
        error.message?.includes('schema cache') ||
        error.code === '42P01' ||
        error.message?.includes('does not exist')
      ) {
        // Try fallback table 'appointments'
        const apptRes = await supabase.from('appointments').select('id').limit(1);
        if (!apptRes.error) {
          this.lastStatus = {
            connected: true,
            tableExists: true,
            message: 'Connected to Supabase (table "appointments" ready)',
          };
          return this.lastStatus;
        }

        this.lastStatus = {
          connected: true,
          tableExists: false,
          message: 'Connected to Supabase! Table "bookings" needs to be created in SQL Editor.',
        };
        return this.lastStatus;
      }

      this.lastStatus = {
        connected: false,
        tableExists: false,
        message: error.message || 'Supabase query returned an error',
      };
      return this.lastStatus;
    } catch (err: any) {
      this.lastStatus = {
        connected: false,
        tableExists: false,
        message: err.message || 'Failed to reach Supabase',
      };
      return this.lastStatus;
    }
  }

  getLastStatus() {
    return this.lastStatus;
  }

  /**
   * Save a filled/submitted appointment booking form to Supabase
   */
  async saveBooking(booking: Booking | any): Promise<SupabaseSyncResult> {
    const payload = {
      id: booking.id,
      user_id: booking.userId || null,
      user_name: booking.userName || 'Player',
      user_email: booking.userEmail || null,
      user_phone: booking.userPhone || null,
      venue_id: booking.venueId || booking.facilityId || null,
      venue_name: booking.venueName || booking.facilityName || null,
      court_id: booking.courtId || null,
      court_name: booking.courtName || null,
      sport: booking.sport || null,
      date: booking.date || null,
      start_time: booking.startTime || null,
      end_time: booking.endTime || null,
      duration: booking.duration || '1 Hour',
      court_price: Number(booking.courtPrice) || 0,
      platform_fee: Number(booking.platformFee) || 0,
      tax: Number(booking.tax) || 0,
      discount: Number(booking.discount) || 0,
      total_amount: Number(booking.totalAmount || booking.total || booking.courtPrice) || 0,
      status: booking.status || 'confirmed',
      payment_status: booking.paymentStatus || 'successful',
      transaction_id: booking.transactionId || null,
      cancellation_reason: booking.cancellationReason || null,
      error_message: null,
      error_type: null,
      created_at: booking.createdAt || new Date().toISOString(),
    };

    return await this.insertToSupabase(payload, 'bookings');
  }

  /**
   * Save whenever someone FAILS an appointment booking form
   * (e.g. invalid inputs, slot taken, payment failure, form cancellation)
   */
  async recordFailedBooking(failure: FailedBookingRecord): Promise<SupabaseSyncResult> {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const dateStr = failure.date ? failure.date.replace(/-/g, '') : new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const failureId = failure.id || `FAILED-QC-${dateStr}-${randomSuffix}`;

    const payload = {
      id: failureId,
      user_id: failure.userId || null,
      user_name: failure.userName || 'Guest User',
      user_email: failure.userEmail || null,
      user_phone: failure.userPhone || null,
      venue_id: failure.venueId || null,
      venue_name: failure.venueName || null,
      court_id: failure.courtId || null,
      court_name: failure.courtName || null,
      sport: failure.sport || null,
      date: failure.date || new Date().toISOString().split('T')[0],
      start_time: failure.startTime || null,
      end_time: failure.endTime || null,
      duration: failure.duration || '1 Hour',
      court_price: Number(failure.courtPrice) || 0,
      platform_fee: 0,
      tax: 0,
      discount: 0,
      total_amount: Number(failure.totalAmount || failure.courtPrice) || 0,
      status: 'failed',
      payment_status: 'failed',
      transaction_id: null,
      cancellation_reason: null,
      error_message: failure.errorMessage,
      error_type: failure.errorType || 'validation',
      created_at: failure.timestamp || new Date().toISOString(),
    };

    console.log('[Supabase] Recording failed appointment booking form:', payload);
    return await this.insertToSupabase(payload, 'bookings');
  }

  /**
   * Update booking status (e.g. after successful or failed payment)
   */
  async updateBookingStatus(
    bookingId: string,
    updates: {
      status?: string;
      payment_status?: string;
      transaction_id?: string;
      error_message?: string;
      error_type?: string;
    }
  ): Promise<SupabaseSyncResult> {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .update(updates)
        .eq('id', bookingId)
        .select();

      if (error) {
        // Try fallback table
        const apptRes = await supabase
          .from('appointments')
          .update(updates)
          .eq('id', bookingId)
          .select();

        if (apptRes.error) {
          return { success: false, error: error.message, code: error.code };
        }
        return { success: true, tableUsed: 'appointments', data: apptRes.data };
      }

      return { success: true, tableUsed: 'bookings', data };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }

  /**
   * Helper to insert to primary or fallback table with error resilience
   */
  private async insertToSupabase(payload: Record<string, any>, primaryTable = 'bookings'): Promise<SupabaseSyncResult> {
    try {
      // 1. Try primary table 'bookings'
      const { data, error } = await supabase.from(primaryTable).upsert(payload).select();

      if (!error) {
        console.log(`[Supabase] Successfully saved record to "${primaryTable}":`, payload.id);
        return { success: true, tableUsed: primaryTable, data };
      }

      console.warn(`[Supabase] Note on "${primaryTable}" table:`, error.message);

      // 2. If 'bookings' table not found, try 'appointments'
      if (
        primaryTable === 'bookings' &&
        (error.message?.includes('schema cache') ||
          error.code === '42P01' ||
          error.message?.includes('does not exist'))
      ) {
        const fallbackRes = await supabase.from('appointments').upsert(payload).select();
        if (!fallbackRes.error) {
          console.log(`[Supabase] Successfully saved record to fallback table "appointments":`, payload.id);
          return { success: true, tableUsed: 'appointments', data: fallbackRes.data };
        }
      }

      return {
        success: false,
        error: error.message,
        code: error.code,
      };
    } catch (err: any) {
      console.warn('[Supabase] Network/Unexpected error during Supabase sync:', err);
      return {
        success: false,
        error: err.message || 'Failed to sync with Supabase',
      };
    }
  }
}

export const supabaseService = new SupabaseService();
