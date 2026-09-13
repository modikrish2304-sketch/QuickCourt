import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { venueService } from '../services/venueService';
import { bookingService } from '../services/bookingService';
import { Facility, Court, SportType } from '../types';
import { CourtSelector } from '../components/CourtSelector';
import { TimeSlotSelector, TimeSlot } from '../components/TimeSlotSelector';
import { Button } from '../components/Button';
import { LoadingSpinner } from '../components/LoadingSpinner';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  CreditCard,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

export interface BookingPageProps {
  venueId: string;
  onNavigate: (route: string) => void;
  onShowToast?: (type: 'success' | 'warning' | 'error' | 'info', title: string, msg?: string) => void;
}

export const BookingPage: React.FC<BookingPageProps> = ({
  venueId,
  onNavigate,
  onShowToast,
}) => {
  const { user, isAuthenticated } = useAuth();
  const [venue, setVenue] = useState<Facility | null>(null);
  const [courts, setCourts] = useState<Court[]>([]);
  const [loading, setLoading] = useState(true);

  // Booking selections
  const [selectedSport, setSelectedSport] = useState<string>('');
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchVenueAndCourts = async () => {
      try {
        setLoading(true);
        const v = await venueService.getVenueById(venueId);
        if (v) {
          setVenue(v);
          setCourts(v.courts || []);
          if (v.sports && v.sports.length > 0) {
            setSelectedSport(v.sports[0]);
          }
          if (v.courts && v.courts.length > 0) {
            setSelectedCourt(v.courts[0]);
          }
        }
      } finally {
        setLoading(false);
      }
    };
    fetchVenueAndCourts();
  }, [venueId]);

  // Handle sport change -> reset court to first court matching sport
  const handleSportChange = (sport: string) => {
    setSelectedSport(sport);
    const matching = courts.find((c) => c.sport.toLowerCase() === sport.toLowerCase());
    setSelectedCourt(matching || courts[0] || null);
    setSelectedSlot(null);
  };

  const slots = React.useMemo(() => {
    return venueService.getTimeSlotsForCourt(selectedCourt?.id || 'crt_1_1', selectedDate);
  }, [selectedCourt, selectedDate]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-white">
        <LoadingSpinner size="lg" text="Setting up your booking session..." />
      </div>
    );
  }

  if (!venue) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-white">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Venue Not Found</h2>
        <Button variant="primary" size="sm" onClick={() => onNavigate('/venues')}>
          Browse Venues
        </Button>
      </div>
    );
  }

  // Pricing calculations
  const courtPrice = selectedCourt?.pricePerHour || venue.startingPrice;
  const pricing = bookingService.calculatePricing(courtPrice, 1);

  const canProceed = Boolean(selectedCourt && selectedDate && selectedSlot);

  const handleProceedToPayment = async () => {
    if (!isAuthenticated || !user) {
      if (onShowToast) {
        onShowToast('warning', 'Login Required', 'Please log in to complete your court booking.');
      }
      onNavigate(`/login?redirect=/booking/${venue.id}`);
      return;
    }

    if (!canProceed || !selectedCourt || !selectedSlot) {
      if (onShowToast) {
        onShowToast('error', 'Incomplete Selection', 'Please select a court and an available time slot.');
      }
      return;
    }

    try {
      setIsSubmitting(true);
      // Create initial pending/draft booking
      const newBooking = await bookingService.createBooking({
        userId: user.id,
        userName: user.fullName || user.name,
        userEmail: user.email,
        userPhone: user.phone || '+91 98765 43210',
        venueId: venue.id,
        venueName: venue.name,
        venueImage: venue.images?.[0],
        venueAddress: venue.address || `${venue.area}, ${venue.city}`,
        courtId: selectedCourt.id,
        courtName: selectedCourt.name,
        sport: (selectedSport as SportType) || (selectedCourt.sport as SportType),
        date: selectedDate,
        startTime: selectedSlot.startTime,
        endTime: selectedSlot.endTime,
        duration: '1 Hour',
        courtPrice: pricing.courtPrice,
        platformFee: pricing.platformFee,
        totalAmount: pricing.total,
      });

      if (onShowToast) {
        onShowToast('info', 'Slot Reserved', 'Proceeding to secure checkout...');
      }

      onNavigate(`/payment/${newBooking.id}`);
    } catch (err: any) {
      if (onShowToast) {
        onShowToast('error', 'Booking Error', err.message || 'Failed to initiate booking.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-6 sm:py-10 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Back Nav */}
        <button
          onClick={() => onNavigate(`/venues/${venue.id}`)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {venue.name}</span>
        </button>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Book a Court
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Choose your preferred court, date and 1-hour slot at <span className="font-bold text-slate-700">{venue.name}</span>.
          </p>
        </div>

        {/* Auth prompt banner if not signed in */}
        {!isAuthenticated && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-amber-900">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>You are currently booking as a guest. You will be prompted to sign in before payment.</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate(`/login?redirect=/booking/${venue.id}`)}
              className="bg-white text-xs border-amber-300 hover:bg-amber-100/50 shrink-0"
            >
              Sign In Now
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left 2 Columns: Court & Slot Selection Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Sport Selection */}
            {venue.sports.length > 1 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  1. Select Sport
                </label>
                <div className="flex flex-wrap gap-2">
                  {venue.sports.map((sport) => {
                    const isSelected = selectedSport.toLowerCase() === sport.toLowerCase();
                    return (
                      <button
                        key={sport}
                        type="button"
                        onClick={() => handleSportChange(sport)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/20'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {sport}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Court Selection */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  {venue.sports.length > 1 ? '2. Select Court' : '1. Select Court'}
                </label>
                {selectedCourt && (
                  <span className="text-xs font-bold text-emerald-600">
                    Selected: {selectedCourt.name}
                  </span>
                )}
              </div>

              <CourtSelector
                courts={courts}
                selectedCourtId={selectedCourt?.id || ''}
                onSelectCourt={(c) => setSelectedCourt(c)}
                selectedSport={selectedSport}
              />
            </div>

            {/* Step 3: Date & Slot Selection */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                {venue.sports.length > 1 ? '3. Select Date & Slot' : '2. Select Date & Slot'}
              </label>

              <TimeSlotSelector
                selectedDate={selectedDate}
                onDateChange={(d) => {
                  setSelectedDate(d);
                  setSelectedSlot(null);
                }}
                selectedSlot={selectedSlot}
                onSelectSlot={(s) => setSelectedSlot(s)}
                slots={slots}
              />
            </div>
          </div>

          {/* Right Column: Pricing & Confirmation Summary */}
          <div className="lg:col-span-1 lg:sticky lg:top-24 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg shadow-slate-200/40 space-y-5">
              <h3 className="text-base font-bold text-slate-900 font-display border-b border-slate-100 pb-3">
                Booking Summary
              </h3>

              {/* Venue snippet */}
              <div className="flex gap-3 items-center">
                <img
                  src={venue.images?.[0] || 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=200'}
                  alt={venue.name}
                  className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    {venue.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                    {venue.area}, {venue.city}
                  </p>
                </div>
              </div>

              {/* Selected parameters list */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Sport:</span>
                  <span className="font-bold text-slate-800">{selectedSport || 'Not selected'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Court:</span>
                  <span className="font-bold text-slate-800 truncate max-w-[160px]">
                    {selectedCourt ? selectedCourt.name : 'Select a court'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Date:</span>
                  <span className="font-bold text-slate-800">
                    {new Date(selectedDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Time Slot:</span>
                  <span className="font-bold text-emerald-700">
                    {selectedSlot ? `${selectedSlot.startTime} - ${selectedSlot.endTime}` : 'Select a slot'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Duration:</span>
                  <span className="font-bold text-slate-800">1 Hour</span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Court Rate (1 hr)</span>
                  <span>₹{pricing.courtPrice}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Platform Service Fee</span>
                  <span>₹{pricing.platformFee}</span>
                </div>
                <div className="flex items-center justify-between text-base font-black text-slate-900 font-display pt-2 border-t border-slate-100">
                  <span>Total Amount</span>
                  <span>₹{pricing.total}</span>
                </div>
              </div>

              {/* Proceed CTA */}
              <Button
                variant="primary"
                size="lg"
                onClick={handleProceedToPayment}
                disabled={!canProceed}
                isLoading={isSubmitting}
                className="w-full mt-2"
                rightIcon={<CreditCard className="w-4 h-4" />}
              >
                Proceed to Payment
              </Button>

              <p className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Slot held for 15 mins during checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
