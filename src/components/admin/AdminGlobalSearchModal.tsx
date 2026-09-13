import React, { useState, useMemo } from 'react';
import { Search, X, Building2, User as UserIcon, Calendar, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { adminService } from '../../services/adminService';
import { Facility, User, Booking } from '../../types';

interface AdminGlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const AdminGlobalSearchModal: React.FC<AdminGlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim() || query.trim().length < 2) {
      return { facilities: [], users: [], bookings: [] };
    }
    const q = query.trim().toLowerCase();

    const facilities = adminService
      .getFacilities()
      .filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.ownerName.toLowerCase().includes(q) ||
          f.city.toLowerCase().includes(q) ||
          f.sports.some((s) => s.toLowerCase().includes(q))
      )
      .slice(0, 4);

    const users = adminService
      .getUsers()
      .filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.role.toLowerCase().includes(q) ||
          u.id.toLowerCase().includes(q)
      )
      .slice(0, 4);

    const bookings = adminService
      .getBookings()
      .filter(
        (b) =>
          b.id.toLowerCase().includes(q) ||
          b.userName.toLowerCase().includes(q) ||
          b.facilityName.toLowerCase().includes(q) ||
          b.sport.toLowerCase().includes(q)
      )
      .slice(0, 4);

    return { facilities, users, bookings };
  }, [query]);

  if (!isOpen) return null;

  const totalResults =
    results.facilities.length + results.users.length + results.bookings.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Search Header */}
        <div className="flex items-center px-4 border-b border-slate-100">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search facilities, users, bookings, sports (e.g., Smash, Priya, Badminton)..."
            className="w-full py-4 text-xs text-slate-900 placeholder-slate-400 bg-transparent focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-semibold text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Search Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!query.trim() && (
            <div className="py-8 text-center text-xs text-slate-500">
              <p className="font-semibold text-slate-700">QuickCourt Global Search</p>
              <p className="mt-1">
                Type at least 2 characters to search across all facilities, users, and reservations.
              </p>
            </div>
          )}

          {query.trim().length >= 2 && totalResults === 0 && (
            <div className="py-8 text-center text-xs text-slate-500">
              No matching records found for "{query}".
            </div>
          )}

          {/* Facilities Results */}
          {results.facilities.length > 0 && (
            <div>
              <div className="text-[11px] font-bold tracking-wider uppercase text-slate-400 px-2 mb-2 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" /> Facilities
              </div>
              <div className="space-y-1">
                {results.facilities.map((fac: Facility) => (
                  <button
                    key={fac.id}
                    onClick={() => {
                      onClose();
                      onNavigate(`/admin/facilities`);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/70 border border-transparent hover:border-emerald-200 transition-colors text-left group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                        <img
                          src={fac.images?.[0] || 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=100'}
                          alt={fac.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="truncate">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">
                            {fac.name}
                          </span>
                          <span
                            className={`px-1.5 py-0.5 text-[10px] font-bold rounded-md ${
                              fac.status === 'approved'
                                ? 'bg-emerald-100 text-emerald-800'
                                : fac.status === 'pending'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {fac.status}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                          <span className="flex items-center gap-0.5">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            {fac.area}, {fac.city}
                          </span>
                          <span>•</span>
                          <span>Owner: {fac.ownerName}</span>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Users Results */}
          {results.users.length > 0 && (
            <div>
              <div className="text-[11px] font-bold tracking-wider uppercase text-slate-400 px-2 mb-2 flex items-center gap-1.5">
                <UserIcon className="w-3.5 h-3.5" /> Users & Accounts
              </div>
              <div className="space-y-1">
                {results.users.map((u: User) => (
                  <button
                    key={u.id}
                    onClick={() => {
                      onClose();
                      onNavigate(`/admin/users`);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/70 border border-transparent hover:border-emerald-200 transition-colors text-left group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                        <img
                          src={u.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.email}`}
                          alt={u.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="truncate">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">
                            {u.name}
                          </span>
                          <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-slate-100 text-slate-700 rounded-md capitalize">
                            {u.role.replace('_', ' ')}
                          </span>
                          {u.isBanned && (
                            <span className="px-1.5 py-0.5 text-[10px] font-bold bg-rose-100 text-rose-700 rounded-md">
                              Banned
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {u.email} • {u.city || 'Bengaluru'}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Bookings Results */}
          {results.bookings.length > 0 && (
            <div>
              <div className="text-[11px] font-bold tracking-wider uppercase text-slate-400 px-2 mb-2 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Bookings & Passes
              </div>
              <div className="space-y-1">
                {results.bookings.map((b: Booking) => (
                  <button
                    key={b.id}
                    onClick={() => {
                      onClose();
                      onNavigate(`/admin/bookings`);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/70 border border-transparent hover:border-emerald-200 transition-colors text-left group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">
                        {b.sport.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="truncate">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 font-mono">
                            {b.id}
                          </span>
                          <span className="text-xs text-slate-600 font-medium">
                            {b.userName}
                          </span>
                          <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-slate-100 text-slate-700 rounded-md">
                            ₹{b.totalAmount}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {b.facilityName} • {b.date} ({b.startTime} - {b.endTime})
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Tip: Press ESC to exit search</span>
          <span>QuickCourt Admin Central</span>
        </div>
      </div>
    </div>
  );
};
