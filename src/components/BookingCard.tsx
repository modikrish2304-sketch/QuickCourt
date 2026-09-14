import React from 'react';
import { Calendar, Clock, MapPin, QrCode, Ban, CheckCircle2, AlertCircle, Star, Sparkles, Edit3 } from 'lucide-react';
import { Booking } from '../types';
import { Button } from './Button';

export interface BookingCardProps {
  booking: Booking;
  onCancel: (booking: Booking) => void;
  onViewPass: (booking: Booking) => void;
  onRebook?: (booking: Booking) => void;
  onRate?: (booking: Booking) => void;
}

export const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  onCancel,
  onViewPass,
  onRebook,
  onRate,
}) => {
  const isFuture = () => {
    try {
      const bookingDate = new Date(booking.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return bookingDate >= today;
    } catch {
      return true;
    }
  };

  const canCancel = booking.status === 'confirmed' && isFuture();
  const isCompleted = (booking.liveStatus || booking.status) === 'completed';
  const venueName = booking.venueName || booking.facilityName;

  const getStatusBadge = () => {
    const status = booking.liveStatus || booking.status;
    switch (status) {
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-300 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            In Progress
          </span>
        );
      case 'ready_for_entry':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            Ready for Entry
          </span>
        );
      case 'upcoming':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
            Upcoming
          </span>
        );
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Confirmed
          </span>
        );
      case 'completed':
        return (
          <div className="flex items-center gap-1.5">
            {booking.isRated && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-300 shadow-2xs">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                Rated {booking.userRating ? `★ ${booking.userRating}` : '★ 5'}
              </span>
            )}
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
              Completed
            </span>
          </div>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <AlertCircle className="w-3 h-3 text-rose-600" />
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
            {booking.status}
          </span>
        );
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Top bar: ID and Status */}
        <div className="flex items-center justify-between gap-2 pb-3.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
              {booking.id}
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100">
              {booking.sport}
            </span>
          </div>
          {getStatusBadge()}
        </div>

        {/* Venue and Court info */}
        <div className="mt-4 flex gap-4 items-start">
          <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
            <img
              src={booking.facilityImage || 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&auto=format&fit=crop&q=80'}
              alt={booking.venueName || booking.facilityName}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-slate-900 font-display truncate">
              {booking.venueName || booking.facilityName}
            </h3>
            <p className="text-xs font-semibold text-emerald-700 mt-0.5">
              {booking.courtName}
            </p>
            {booking.facilityAddress && (
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-1 truncate">
                <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                {booking.facilityAddress}
              </p>
            )}
          </div>
        </div>

        {/* Date and Time slots */}
        <div className="mt-4 grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Date
              </span>
              <span className="text-xs font-bold text-slate-800">
                {new Date(booking.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Slot
              </span>
              <span className="text-xs font-bold text-slate-800">
                {booking.startTime} - {booking.endTime}
              </span>
            </div>
          </div>
        </div>

        {/* Post-Booking Rating Callout Banner (Completed Bookings) */}
        {isCompleted && (
          <div className="mt-3.5 p-3.5 rounded-xl bg-gradient-to-r from-emerald-50/90 to-teal-50/70 border border-emerald-200/80 flex items-center justify-between gap-3">
            <div className="space-y-0.5 min-w-0">
              <span className="text-xs font-black text-slate-900 block font-display">
                How was your game?
              </span>
              <span className="text-[11px] text-slate-600 italic block truncate">
                Rate your experience at <strong className="text-slate-800 not-italic">{venueName}</strong>.
              </span>
            </div>

            {booking.isRated ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRate && onRate(booking);
                }}
                className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold border border-slate-200 shadow-2xs transition-all cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                <span>Edit Review</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRate && onRate(booking);
                }}
                className="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-sm shadow-emerald-600/20 transition-all cursor-pointer"
              >
                <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                <span>Rate Game</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Footer: Price & Actions */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3 flex-wrap">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
            {booking.status === 'cancelled' ? 'Refunded' : 'Amount Paid'}
          </span>
          <span className={`text-lg font-black font-display ${booking.status === 'cancelled' ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
            ₹{booking.totalAmount || booking.total || booking.courtPrice}
          </span>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
          {canCancel && (
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={(e) => {
                e.stopPropagation();
                onCancel(booking);
              }}
              leftIcon={<Ban className="w-4 h-4 text-rose-500" />}
              className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 hover:border-rose-300 font-semibold px-3.5 py-2 min-h-[40px] text-xs transition-colors"
            >
              Cancel Booking
            </Button>
          )}

          {isCompleted && (
            <Button
              type="button"
              variant={booking.isRated ? 'outline' : 'primary'}
              size="md"
              onClick={(e) => {
                e.stopPropagation();
                onRate && onRate(booking);
              }}
              leftIcon={<Star className={`w-4 h-4 ${booking.isRated ? 'fill-amber-400 text-amber-400' : 'fill-amber-300 text-amber-300'}`} />}
              className="font-bold px-3.5 py-2 min-h-[40px] text-xs"
            >
              {booking.isRated ? `Rated ★ ${booking.userRating || 5}` : 'Rate Your Experience'}
            </Button>
          )}

          {booking.status === 'cancelled' && onRebook && (
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={(e) => {
                e.stopPropagation();
                onRebook(booking);
              }}
              className="text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 border-emerald-300 font-semibold px-3.5 py-2 min-h-[40px] text-xs transition-colors"
            >
              Book Again
            </Button>
          )}

          {booking.status !== 'cancelled' && (
            <Button
              type="button"
              variant={booking.status === 'confirmed' ? 'primary' : 'outline'}
              size="md"
              onClick={(e) => {
                e.stopPropagation();
                onViewPass(booking);
              }}
              leftIcon={<QrCode className="w-4 h-4" />}
              className="font-semibold px-4 py-2 min-h-[40px] text-xs shadow-xs"
            >
              Digital Pass
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
