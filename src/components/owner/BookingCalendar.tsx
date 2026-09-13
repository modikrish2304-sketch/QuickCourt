import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, User, ChevronLeft, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { Booking } from '../../types';
import { bookingService } from '../../services/bookingService';

export interface BookingCalendarProps {
  facilityId?: string;
  onSelectBooking?: (booking: Booking) => void;
}

export const BookingCalendar: React.FC<BookingCalendarProps> = ({
  facilityId,
  onSelectBooking,
}) => {
  const [view, setView] = useState<'Day' | 'Week' | 'Month'>('Day');
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const allBookings = bookingService.getBookings();
  const dateStr = currentDate.toISOString().split('T')[0];

  const filteredBookings = allBookings.filter((b) => {
    if (facilityId && b.facilityId !== facilityId && b.venueId !== facilityId) return false;
    if (view === 'Day') {
      return b.date === dateStr || b.date === dateStr.replace(/-/g, '');
    }
    return true;
  });

  const nextDay = () => {
    const next = new Date(currentDate);
    next.setDate(next.getDate() + 1);
    setCurrentDate(next);
  };

  const prevDay = () => {
    const prev = new Date(currentDate);
    prev.setDate(prev.getDate() - 1);
    setCurrentDate(prev);
  };

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold font-display text-slate-900 flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-emerald-600" />
            <span>Facility Schedule Calendar</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time court reservations, player bookings, and maintenance blocks
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Day / Week / Month Switcher */}
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200/60 text-xs font-semibold">
            {(['Day', 'Week', 'Month'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setView(tab)}
                className={`px-3 py-1 rounded-lg transition-all ${
                  view === tab
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Date Navigator */}
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl p-1 text-xs">
            <button
              onClick={prevDay}
              className="p-1 rounded-lg hover:bg-slate-200/60 text-slate-600"
              title="Previous Day"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 font-semibold text-slate-800">
              {currentDate.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              })}
            </span>
            <button
              onClick={nextDay}
              className="p-1 rounded-lg hover:bg-slate-200/60 text-slate-600"
              title="Next Day"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid / Slots list */}
      <div className="mt-4">
        {filteredBookings.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-xl bg-slate-50/50 border border-dashed border-slate-200">
            <Clock className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700">No bookings scheduled for this date</p>
            <p className="text-xs text-slate-500 mt-1">
              All courts are currently open for player reservations.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredBookings.map((b) => {
              const isConfirmed = b.status === 'confirmed';
              const isCancelled = b.status === 'cancelled';
              const isCompleted = b.status === 'completed';

              return (
                <div
                  key={b.id}
                  onClick={() => onSelectBooking && onSelectBooking(b)}
                  className={`p-4 rounded-xl border transition-all text-left group cursor-pointer ${
                    isConfirmed
                      ? 'bg-emerald-50/40 border-emerald-200/80 hover:border-emerald-400 hover:shadow-xs'
                      : isCancelled
                      ? 'bg-rose-50/30 border-rose-200/60 hover:border-rose-300'
                      : 'bg-slate-50/60 border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-bold text-slate-700 tracking-wide block">
                        {b.courtName || 'Court 01'} • {b.sport}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>
                          {b.startTime} - {b.endTime}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        isConfirmed
                          ? 'bg-emerald-100 text-emerald-800'
                          : isCancelled
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-200/50 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 font-medium text-slate-800 truncate">
                      <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{b.userName || 'Player'}</span>
                    </div>
                    <span className="font-bold text-slate-900 shrink-0">
                      ₹{b.totalAmount || b.courtPrice}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
