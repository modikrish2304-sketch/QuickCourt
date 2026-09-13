import React, { useState, useMemo } from 'react';
import {
  CalendarCheck,
  Search,
  Filter,
  DollarSign,
  Clock,
  Building2,
  User,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from 'lucide-react';
import { adminService } from '../../services/adminService';
import { Booking } from '../../types';

export const BookingsOverviewPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sportFilter, setSportFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const allBookings = useMemo(() => adminService.getBookings(), []);

  // Filter logic
  const filteredBookings = useMemo(() => {
    let list = [...allBookings];

    if (statusFilter !== 'all') {
      list = list.filter((b) => b.status === statusFilter);
    }

    if (sportFilter !== 'all') {
      list = list.filter((b) => b.sport.toLowerCase() === sportFilter.toLowerCase());
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (b) =>
          b.id.toLowerCase().includes(q) ||
          b.userName.toLowerCase().includes(q) ||
          b.facilityName.toLowerCase().includes(q) ||
          b.sport.toLowerCase().includes(q)
      );
    }

    // Default newest first
    list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return list;
  }, [allBookings, statusFilter, sportFilter, search]);

  const total = filteredBookings.length;
  const limit = 8;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const paginated = filteredBookings.slice((page - 1) * limit, page * limit);

  // Overall counts
  const totalVolume = allBookings.reduce((s, b) => s + (b.totalAmount || 0), 0);
  const confirmedCount = allBookings.filter((b) => b.status === 'confirmed').length;
  const completedCount = allBookings.filter((b) => b.status === 'completed').length;
  const cancelledCount = allBookings.filter((b) => b.status === 'cancelled').length;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black font-display tracking-tight text-[#172033]">
              Platform Bookings & GMV
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-bold bg-purple-100 text-purple-800 rounded-full">
              {allBookings.length} Total Passes
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Global view of court reservations across all partner venues and payment settlements.
          </p>
        </div>

        <button
          onClick={() => {
            const csv =
              'Booking ID,Player,Facility,Sport,Court,Date,Time,Amount,Status\n' +
              filteredBookings
                .map(
                  (b) =>
                    `"${b.id}","${b.userName}","${b.facilityName}","${b.sport}","${b.courtName}","${b.date}","${b.startTime}-${b.endTime}",${b.totalAmount},"${b.status}"`
                )
                .join('\n');
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'quickcourt_bookings_ledger.csv';
            a.click();
          }}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Export Ledger (CSV)</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-white rounded-2xl border border-slate-200">
          <span className="text-xs font-semibold text-slate-500">Gross Volume (GMV)</span>
          <div className="text-2xl font-black font-display text-slate-900 mt-1">
            ₹{totalVolume.toLocaleString()}
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200">
          <span className="text-xs font-semibold text-emerald-600">Confirmed & Active</span>
          <div className="text-2xl font-black font-display text-emerald-900 mt-1">
            {confirmedCount}
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200">
          <span className="text-xs font-semibold text-blue-600">Completed Sessions</span>
          <div className="text-2xl font-black font-display text-blue-900 mt-1">
            {completedCount}
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200">
          <span className="text-xs font-semibold text-rose-600">Cancelled / Refunded</span>
          <div className="text-2xl font-black font-display text-rose-900 mt-1">
            {cancelledCount}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 shadow-2xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by booking ID, player name, facility, or sport..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#F7F9F8] border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="bg-[#F7F9F8] border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700 font-semibold focus:outline-none focus:border-emerald-500"
          >
            <option value="all">Status: All</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            value={sportFilter}
            onChange={(e) => {
              setSportFilter(e.target.value);
              setPage(1);
            }}
            className="bg-[#F7F9F8] border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700 font-semibold focus:outline-none focus:border-emerald-500"
          >
            <option value="all">Sport: All</option>
            <option value="Badminton">Badminton</option>
            <option value="Tennis">Tennis</option>
            <option value="Football">Football</option>
            <option value="Cricket">Cricket</option>
            <option value="Basketball">Basketball</option>
            <option value="Squash">Squash</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-2xs overflow-hidden">
        {paginated.length === 0 ? (
          <div className="py-16 text-center text-xs text-slate-500">
            <CalendarCheck className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="font-bold text-slate-700">No bookings found</p>
            <p className="mt-1">Try adjusting your status or search filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7F9F8] border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Booking ID</th>
                  <th className="py-3 px-4">Player</th>
                  <th className="py-3 px-4">Facility & Court</th>
                  <th className="py-3 px-4">Date & Slot</th>
                  <th className="py-3 px-4">Gross Total</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginated.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      {b.id}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-800">{b.userName}</div>
                      <div className="text-[11px] text-slate-500 font-mono">UID: {b.userId}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-800">{b.facilityName}</div>
                      <div className="text-[11px] text-slate-500">
                        {b.sport} • {b.courtName}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-600">
                      <div className="font-medium text-slate-800">{b.date}</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>
                          {b.startTime} - {b.endTime}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      ₹{b.totalAmount}
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                          b.status === 'confirmed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : b.status === 'completed'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedBooking(b)}
                        className="px-2.5 py-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
                      >
                        View Pass
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-[#E5E7EB] bg-[#F7F9F8] flex items-center justify-between text-xs text-slate-600">
            <div>
              Showing <span className="font-bold">{(page - 1) * limit + 1}</span> to{' '}
              <span className="font-bold">{Math.min(page * limit, total)}</span> of{' '}
              <span className="font-bold">{total}</span> records
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-3 font-semibold">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Booking Details / Pass Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Booking Receipt #{selectedBooking.id}
                </h3>
                <span className="text-[11px] text-slate-500 font-mono">
                  Txn ID: TXN_{selectedBooking.id}992
                </span>
              </div>
              <span
                className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                  selectedBooking.status === 'confirmed'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                {selectedBooking.status}
              </span>
            </div>

            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Player</span>
                <span className="font-bold text-slate-900">{selectedBooking.userName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Facility</span>
                <span className="font-bold text-slate-900">{selectedBooking.facilityName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Sport & Court</span>
                <span className="font-bold text-slate-900">
                  {selectedBooking.sport} • {selectedBooking.courtName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date & Slot</span>
                <span className="font-bold text-slate-900">
                  {selectedBooking.date} ({selectedBooking.startTime} - {selectedBooking.endTime})
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-100">
                <span className="text-slate-500 font-semibold">Total Paid</span>
                <span className="font-bold text-emerald-700 text-sm">
                  ₹{selectedBooking.totalAmount}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedBooking(null)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors"
              >
                Close Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
