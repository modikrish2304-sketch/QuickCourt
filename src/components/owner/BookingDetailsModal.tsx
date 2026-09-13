import React, { useState } from 'react';
import { X, Calendar, Clock, DollarSign, User, ShieldCheck, MapPin, AlertTriangle } from 'lucide-react';
import { Booking } from '../../types';

export interface BookingDetailsModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
  onCancelBooking?: (bookingId: string, reason: string) => void;
}

export const BookingDetailsModal: React.FC<BookingDetailsModalProps> = ({
  booking,
  isOpen,
  onClose,
  onCancelBooking,
}) => {
  const [showCancelPrompt, setShowCancelPrompt] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

  if (!isOpen || !booking) return null;

  const handleConfirmCancel = () => {
    if (onCancelBooking && cancelReason.trim()) {
      onCancelBooking(booking.id, cancelReason);
      setShowCancelPrompt(false);
      onClose();
    }
  };

  const isConfirmed = booking.status === 'confirmed';
  const isCancelled = booking.status === 'cancelled';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 text-left">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-500">
                {booking.id}
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  isConfirmed
                    ? 'bg-emerald-100 text-emerald-800'
                    : isCancelled
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                {booking.status}
              </span>
            </div>
            <h3 className="text-base font-bold font-display text-slate-900 mt-0.5">
              Player Booking Record
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Player Profile Card */}
        <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-sm">
              {booking.userName ? booking.userName[0].toUpperCase() : 'P'}
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 block">
                {booking.userName || 'Player'}
              </span>
              <span className="text-xs text-slate-500">
                {booking.userEmail || 'player@quickcourt.in'}
              </span>
            </div>
          </div>

          <span className="text-xs font-semibold text-slate-600">
            {booking.userPhone || '+91 98765 43210'}
          </span>
        </div>

        {/* Match / Reservation Details Grid */}
        <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block mb-1">Sport & Court</span>
            <span className="font-bold text-slate-900 block text-sm">
              {booking.courtName}
            </span>
            <span className="text-emerald-700 font-semibold">{booking.sport}</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block mb-1">Total Paid (Escrow)</span>
            <span className="font-bold text-emerald-600 block text-base font-display">
              ₹{booking.totalAmount || booking.courtPrice}
            </span>
            <span className="text-[10px] text-slate-400">Online Confirmed</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block mb-1">Scheduled Date</span>
            <span className="font-bold text-slate-900 block">
              {booking.date}
            </span>
            <span className="text-slate-500">{booking.duration || '1 Hour'} Slot</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block mb-1">Reserved Time</span>
            <span className="font-bold text-slate-900 block">
              {booking.startTime} - {booking.endTime}
            </span>
            <span className="text-slate-500">Auto-Pass Generated</span>
          </div>
        </div>

        {booking.facilityAddress && (
          <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2 text-xs text-slate-600">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <span>
              {booking.facilityName} — {booking.facilityAddress}
            </span>
          </div>
        )}

        {/* Cancellation Section if active */}
        {showCancelPrompt ? (
          <div className="mt-4 p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-3 animate-in fade-in">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-xs">
              <AlertTriangle className="w-4 h-4" />
              <span>Owner Cancellation</span>
            </div>
            <p className="text-xs text-rose-700">
              Cancelling will instantly notify the player and initiate a 100% refund.
            </p>
            <input
              type="text"
              required
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              placeholder="Reason for cancellation (e.g. Unforeseen electrical repair)..."
              className="w-full bg-white border border-rose-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowCancelPrompt(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 bg-white border border-slate-200"
              >
                Keep Booking
              </button>
              <button
                type="button"
                onClick={handleConfirmCancel}
                disabled={!cancelReason.trim()}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 disabled:opacity-50"
              >
                Confirm Cancellation & Refund
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            {isConfirmed && onCancelBooking && (
              <button
                type="button"
                onClick={() => setShowCancelPrompt(true)}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline"
              >
                Cancel Booking
              </button>
            )}
            <div className="ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs"
              >
                Close Details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
