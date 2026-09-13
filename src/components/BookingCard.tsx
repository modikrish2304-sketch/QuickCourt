import React from 'react';
import { Calendar, Clock, MapPin, QrCode, Ban, CheckCircle2, AlertCircle } from 'lucide-react';
import { Booking } from '../types';
import { Button } from './Button';

export interface BookingCardProps {
  booking: Booking;
  onCancel: (booking: Booking) => void;
  onViewPass: (booking: Booking) => void;
}

export const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  onCancel,
  onViewPass,
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

  const getStatusBadge = () => {
    switch (booking.status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Confirmed
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
            Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200">
            <AlertCircle className="w-3 h-3 text-red-600" />
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
      </div>

      {/* Footer: Price & Actions */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3 flex-wrap">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 block">
            Amount Paid
          </span>
          <span className="text-lg font-black text-slate-900 font-display">
            ₹{booking.totalAmount || booking.total || booking.courtPrice}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {canCancel && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onCancel(booking)}
              leftIcon={<Ban className="w-3.5 h-3.5 text-red-500" />}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 hover:border-red-200"
            >
              Cancel
            </Button>
          )}

          <Button
            variant={booking.status === 'confirmed' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => onViewPass(booking)}
            leftIcon={<QrCode className="w-3.5 h-3.5" />}
          >
            Digital Pass
          </Button>
        </div>
      </div>
    </div>
  );
};
