import React from 'react';
import { ArrowRight, Calendar, Clock, User, ShieldCheck } from 'lucide-react';
import { Booking } from '../../types';

export interface RecentBookingsProps {
  bookings: Booking[];
  onViewAll?: () => void;
  onSelectBooking?: (booking: Booking) => void;
}

export const RecentBookings: React.FC<RecentBookingsProps> = ({
  bookings,
  onViewAll,
  onSelectBooking,
}) => {
  const displayList = bookings.slice(0, 6);

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold font-display text-slate-900">
            Recent Facility Bookings
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Latest court bookings made by players across all surfaces
          </p>
        </div>

        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 group transition-colors"
          >
            <span>View All ({bookings.length})</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        )}
      </div>

      {displayList.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xs text-slate-400">No recent player bookings recorded.</p>
        </div>
      ) : (
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-2">Player</th>
                <th className="py-3 px-2">Court</th>
                <th className="py-3 px-2">Sport</th>
                <th className="py-3 px-2">Schedule</th>
                <th className="py-3 px-2">Amount</th>
                <th className="py-3 px-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {displayList.map((b) => (
                <tr
                  key={b.id}
                  onClick={() => onSelectBooking && onSelectBooking(b)}
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                >
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-[10px] shrink-0">
                        {b.userName ? b.userName[0].toUpperCase() : 'P'}
                      </div>
                      <div className="truncate max-w-[120px]">
                        <span className="font-semibold text-slate-900 block truncate">
                          {b.userName || 'Player'}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {b.id}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-2 font-medium text-slate-700">
                    {b.courtName || 'Court 01'}
                  </td>
                  <td className="py-3 px-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700">
                      {b.sport}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-slate-600">
                    <div className="flex items-center gap-1 text-[11px]">
                      <span>{b.date}</span>
                      <span className="text-slate-300">•</span>
                      <span>{b.startTime}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2 font-bold text-slate-900">
                    ₹{b.totalAmount || b.courtPrice}
                  </td>
                  <td className="py-3 px-2">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        b.status === 'confirmed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : b.status === 'cancelled'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {b.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
