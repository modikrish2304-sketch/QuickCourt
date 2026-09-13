import React, { useState } from 'react';
import {
  X,
  User as UserIcon,
  Mail,
  Phone,
  Calendar,
  Shield,
  MapPin,
  Building2,
  Activity,
  DollarSign,
  Ban,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { User, Booking, Facility } from '../../types';
import { userManagementService } from '../../services/userManagementService';
import { adminService } from '../../services/adminService';
import { AdminConfirmationModal } from './AdminConfirmationModal';

interface UserDetailsModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onBanUser: (userId: string, reason?: string) => void;
  onUnbanUser: (userId: string) => void;
  onViewFacility?: (facility: Facility) => void;
}

export const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
  user,
  isOpen,
  onClose,
  onBanUser,
  onUnbanUser,
  onViewFacility,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'bookings'>('profile');
  const [isConfirmBanOpen, setIsConfirmBanOpen] = useState(false);
  const [isConfirmUnbanOpen, setIsConfirmUnbanOpen] = useState(false);
  const [banReason, setBanReason] = useState('');

  if (!isOpen || !user) return null;

  const bookings: Booking[] = userManagementService.getUserBookings(user.id);
  const totalSpent = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);

  // If facility owner, find their facility
  const ownedFacility =
    user.role === 'facility_owner'
      ? adminService.getFacilities().find((f) => f.ownerId === user.id)
      : null;

  const handleExecuteBan = () => {
    onBanUser(user.id, banReason);
    setIsConfirmBanOpen(false);
  };

  const handleExecuteUnban = () => {
    onUnbanUser(user.id);
    setIsConfirmUnbanOpen(false);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
        <div className="w-full max-w-3xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
          {/* Modal Header */}
          <div className="p-4 sm:p-6 border-b border-[#E5E7EB] flex items-center justify-between bg-[#F7F9F8]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-xs shrink-0">
                <img
                  src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-bold font-display text-[#172033]">
                    {user.name}
                  </h2>
                  <span
                    className={`px-2 py-0.5 text-xs font-bold rounded-md uppercase ${
                      user.isBanned
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {user.isBanned ? 'Banned' : 'Active'}
                  </span>
                  <span className="px-2 py-0.5 text-xs font-semibold bg-slate-200 text-slate-700 rounded-md capitalize">
                    {user.role.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  UID: <span className="font-mono">{user.id}</span> • Joined {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="px-6 border-b border-[#E5E7EB] bg-white flex items-center gap-6">
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-3 text-xs font-bold border-b-2 transition-colors ${
                activeTab === 'profile'
                  ? 'border-emerald-600 text-emerald-700'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Profile & Account Details
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`py-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'bookings'
                  ? 'border-emerald-600 text-emerald-700'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <span>Booking History</span>
              <span className="px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded-md text-[10px]">
                {bookings.length}
              </span>
            </button>
          </div>

          {/* Modal Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {activeTab === 'profile' ? (
              <div className="space-y-6">
                {/* Stats Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-[#F7F9F8] rounded-xl border border-slate-200/80">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Activity Score
                    </span>
                    <span className="text-lg font-bold text-slate-900 mt-0.5 flex items-center gap-1">
                      <Activity className="w-4 h-4 text-emerald-600" />
                      {user.activityScore || 85} / 100
                    </span>
                  </div>
                  <div className="p-3 bg-[#F7F9F8] rounded-xl border border-slate-200/80">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Games Played
                    </span>
                    <span className="text-lg font-bold text-slate-900 mt-0.5 block">
                      {user.gamesPlayed || bookings.length} Matches
                    </span>
                  </div>
                  <div className="p-3 bg-[#F7F9F8] rounded-xl border border-slate-200/80">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Total Spent
                    </span>
                    <span className="text-lg font-bold text-slate-900 mt-0.5 block">
                      ₹{totalSpent.toLocaleString()}
                    </span>
                  </div>
                  <div className="p-3 bg-[#F7F9F8] rounded-xl border border-slate-200/80">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Skill Level
                    </span>
                    <span className="text-lg font-bold text-slate-900 mt-0.5 block">
                      {user.skillLevel || 'Intermediate'}
                    </span>
                  </div>
                </div>

                {/* Contact & Personal info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2.5">
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Mail className="w-4 h-4 text-slate-400" /> Email Address
                    </div>
                    <p className="text-xs text-slate-700 font-medium">{user.email}</p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2.5">
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Phone className="w-4 h-4 text-slate-400" /> Contact Phone
                    </div>
                    <p className="text-xs text-slate-700 font-medium">{user.phone || '+91 98765 43210'}</p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2.5">
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-slate-400" /> City
                    </div>
                    <p className="text-xs text-slate-700 font-medium">{user.city || 'Bengaluru'}</p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2.5">
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Shield className="w-4 h-4 text-slate-400" /> Verification Status
                    </div>
                    <p className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Phone & OTP Verified
                    </p>
                  </div>
                </div>

                {/* Preferred Sports */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Sports Preferences
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(user.sportsPreferences || ['Badminton', 'Football']).map((sport) => (
                      <span
                        key={sport}
                        className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200/70 rounded-xl text-xs font-bold"
                      >
                        {sport}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Facility Owner Specific Section */}
                {user.role === 'facility_owner' && (
                  <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-emerald-700" />
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">
                            Registered Facility
                          </h4>
                          <p className="text-[11px] text-slate-500">
                            Associated facility owned and managed by this account
                          </p>
                        </div>
                      </div>
                      {ownedFacility && onViewFacility && (
                        <button
                          onClick={() => {
                            onClose();
                            onViewFacility(ownedFacility);
                          }}
                          className="px-3 py-1.5 bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-50 rounded-lg text-xs font-bold transition-colors"
                        >
                          View Facility Profile
                        </button>
                      )}
                    </div>

                    {ownedFacility ? (
                      <div className="p-3 bg-white rounded-lg border border-emerald-100 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-slate-900">{ownedFacility.name}</p>
                          <p className="text-[11px] text-slate-500">{ownedFacility.address}, {ownedFacility.city}</p>
                        </div>
                        <span
                          className={`px-2 py-0.5 text-[10px] font-bold rounded-md ${
                            ownedFacility.status === 'approved'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {ownedFacility.status.toUpperCase()}
                        </span>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500">No facilities registered yet under this owner.</p>
                    )}
                  </div>
                )}
              </div>
            ) : (
              /* Bookings Tab */
              <div className="space-y-3">
                {bookings.length === 0 ? (
                  <div className="py-12 text-center text-xs text-slate-400">
                    No bookings found for this user.
                  </div>
                ) : (
                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#F7F9F8] border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase">
                        <tr>
                          <th className="py-2.5 px-3">Booking ID</th>
                          <th className="py-2.5 px-3">Facility</th>
                          <th className="py-2.5 px-3">Sport / Court</th>
                          <th className="py-2.5 px-3">Date & Time</th>
                          <th className="py-2.5 px-3">Amount</th>
                          <th className="py-2.5 px-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {bookings.map((b) => (
                          <tr key={b.id} className="hover:bg-slate-50">
                            <td className="py-2.5 px-3 font-mono font-bold text-slate-800">
                              {b.id}
                            </td>
                            <td className="py-2.5 px-3 text-slate-700 font-medium">
                              {b.facilityName}
                            </td>
                            <td className="py-2.5 px-3 text-slate-600">
                              {b.sport} • {b.courtName}
                            </td>
                            <td className="py-2.5 px-3 text-slate-500">
                              {b.date} ({b.startTime} - {b.endTime})
                            </td>
                            <td className="py-2.5 px-3 font-bold text-slate-900">
                              ₹{b.totalAmount}
                            </td>
                            <td className="py-2.5 px-3">
                              <span
                                className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
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
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer with Ban / Unban actions */}
          <div className="p-4 sm:p-6 border-t border-[#E5E7EB] bg-white flex items-center justify-between">
            <div>
              {user.isBanned ? (
                <button
                  type="button"
                  onClick={() => setIsConfirmUnbanOpen(true)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Unban User Account</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsConfirmBanOpen(true)}
                  className="px-4 py-2 rounded-xl border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <Ban className="w-4 h-4" />
                  <span>Ban User Account</span>
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modals */}
      <AdminConfirmationModal
        isOpen={isConfirmBanOpen}
        title={`Ban user "${user.name}"?`}
        message="This will immediately suspend the user's access to QuickCourt. They will not be able to log in or reserve new courts."
        confirmLabel="Ban User"
        variant="danger"
        showInput={true}
        inputValue={banReason}
        onInputChange={setBanReason}
        inputPlaceholder="Reason for ban (e.g. Terms violation, fraudulent bookings)..."
        onConfirm={handleExecuteBan}
        onClose={() => setIsConfirmBanOpen(false)}
      />

      <AdminConfirmationModal
        isOpen={isConfirmUnbanOpen}
        title={`Restore access for "${user.name}"?`}
        message="This user will regain full access to login and book courts on QuickCourt."
        confirmLabel="Restore Account"
        variant="success"
        onConfirm={handleExecuteUnban}
        onClose={() => setIsConfirmUnbanOpen(false)}
      />
    </>
  );
};
