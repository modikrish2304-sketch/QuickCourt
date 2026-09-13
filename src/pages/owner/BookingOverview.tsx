import React, { useState, useEffect } from 'react';
import {
  CalendarCheck,
  Search,
  Filter,
  Eye,
  XCircle,
  Clock,
  User,
  ShieldAlert,
  ArrowUpDown,
  Download,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { OwnerLayout } from '../../components/owner/OwnerLayout';
import { BookingDetailsModal } from '../../components/owner/BookingDetailsModal';
import { bookingService } from '../../services/bookingService';
import { facilityService } from '../../services/facilityService';
import { courtService } from '../../services/courtService';
import { Booking } from '../../types';

export interface BookingOverviewProps {
  onNavigate: (route: string) => void;
  onShowToast?: (type: 'success' | 'warning' | 'error' | 'info', title: string, msg?: string) => void;
}

export const BookingOverview: React.FC<BookingOverviewProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const { user } = useAuth();
  const facility = facilityService.getOwnerFacility(user?.id || 'usr_owner_1');
  const courts = courtService.getCourts(facility.id);

  const [bookings, setBookings] = useState<Booking[]>(() =>
    bookingService.getBookings()
  );

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
  const [sportFilter, setSportFilter] = useState('All');
  const [courtFilter, setCourtFilter] = useState('All');

  // Modal
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const refreshBookings = () => {
    setBookings(bookingService.getBookings());
  };

  useEffect(() => {
    refreshBookings();
  }, []);

  const handleCancelBooking = (bookingId: string, reason: string) => {
    bookingService.cancelBooking(bookingId, reason);
    refreshBookings();
    if (onShowToast) {
      onShowToast(
        'info',
        'Booking Cancelled',
        `Booking ${bookingId} has been cancelled and refunded.`
      );
    }
  };

  const todayStr = new Date().toISOString().split('T')[0];

  // Filtering
  const filteredBookings = bookings.filter((b) => {
    // Search
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      b.id.toLowerCase().includes(q) ||
      (b.userName && b.userName.toLowerCase().includes(q)) ||
      (b.courtName && b.courtName.toLowerCase().includes(q)) ||
      (b.sport && b.sport.toLowerCase().includes(q));

    // Status
    const matchesStatus =
      statusFilter === 'All' ||
      b.status.toLowerCase() === statusFilter.toLowerCase();

    // Date
    let matchesDate = true;
    if (dateFilter === 'Today') {
      matchesDate = b.date === todayStr;
    } else if (dateFilter === 'Upcoming') {
      matchesDate = b.date >= todayStr && b.status === 'confirmed';
    } else if (dateFilter === 'Past') {
      matchesDate = b.date < todayStr || b.status === 'completed';
    }

    // Sport
    const matchesSport = sportFilter === 'All' || b.sport === sportFilter;

    // Court
    const matchesCourt = courtFilter === 'All' || b.courtId === courtFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesDate &&
      matchesSport &&
      matchesCourt
    );
  });

  const allSports = Array.from(new Set(bookings.map((b) => b.sport)));

  return (
    <OwnerLayout
      currentRoute="/owner/bookings"
      onNavigate={onNavigate}
      pageTitle="Booking Ledger & Player Passes"
    >
      <div className="space-y-6 animate-in fade-in duration-200">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold font-display text-slate-900">
                Booking Management
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                {bookings.length} Total Records
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              View player reservations, check-in passes, track earnings escrow, and manage cancellations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (onShowToast) onShowToast('success', 'CSV Exported', 'Booking records downloaded.');
              }}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1.5"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 text-xs">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Booking ID, Player Name, Court or Sport..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white text-xs"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 text-xs font-semibold focus:outline-none focus:border-emerald-500"
              >
                <option value="All">All Statuses</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>

              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 text-xs font-semibold focus:outline-none focus:border-emerald-500"
              >
                <option value="All">All Dates</option>
                <option value="Today">Today Only</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Past">Past Bookings</option>
              </select>

              <select
                value={sportFilter}
                onChange={(e) => setSportFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 text-xs font-semibold focus:outline-none focus:border-emerald-500"
              >
                <option value="All">All Sports</option>
                {allSports.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              <select
                value={courtFilter}
                onChange={(e) => setCourtFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 text-xs font-semibold focus:outline-none focus:border-emerald-500"
              >
                <option value="All">All Courts</option>
                {courts.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          {filteredBookings.length === 0 ? (
            <div className="text-center py-12">
              <CalendarCheck className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-slate-800">No bookings found</h4>
              <p className="text-xs text-slate-400 mt-1">
                Try selecting a different filter or search query.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-3">Booking ID</th>
                    <th className="py-3 px-3">Player</th>
                    <th className="py-3 px-3">Court & Sport</th>
                    <th className="py-3 px-3">Scheduled Slot</th>
                    <th className="py-3 px-3">Amount</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredBookings.map((b) => (
                    <tr
                      key={b.id}
                      className="hover:bg-slate-50/70 transition-colors group"
                    >
                      <td className="py-3.5 px-3 font-mono font-bold text-slate-800">
                        {b.id}
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-[11px] shrink-0">
                            {b.userName ? b.userName[0].toUpperCase() : 'P'}
                          </div>
                          <div>
                            <span className="font-semibold text-slate-900 block">
                              {b.userName || 'Player'}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {b.userPhone || '+91 98765 43210'}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="font-semibold text-slate-800 block">
                          {b.courtName}
                        </span>
                        <span className="text-[11px] text-emerald-600 font-medium">
                          {b.sport}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-slate-600">
                        <div className="font-medium text-slate-800">{b.date}</div>
                        <div className="text-[11px] text-slate-400">
                          {b.startTime} - {b.endTime}
                        </div>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="font-bold text-slate-900 text-sm">
                          ₹{b.totalAmount || b.courtPrice}
                        </span>
                        <span className="text-[10px] text-slate-400 block">Paid</span>
                      </td>
                      <td className="py-3.5 px-3">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            b.status === 'confirmed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : b.status === 'cancelled'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <button
                          onClick={() => setSelectedBooking(b)}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors inline-flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Details</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Booking Details Modal */}
      <BookingDetailsModal
        booking={selectedBooking}
        isOpen={Boolean(selectedBooking)}
        onClose={() => setSelectedBooking(null)}
        onCancelBooking={handleCancelBooking}
      />
    </OwnerLayout>
  );
};
