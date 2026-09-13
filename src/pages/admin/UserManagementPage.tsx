import React, { useState, useMemo } from 'react';
import {
  Users,
  Search,
  Filter,
  Shield,
  Ban,
  CheckCircle2,
  Eye,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  Calendar,
  Activity,
  UserCheck,
} from 'lucide-react';
import { userManagementService } from '../../services/userManagementService';
import { User, Facility } from '../../types';
import { UserDetailsModal } from '../../components/admin/UserDetailsModal';
import { FacilityReviewModal } from '../../components/admin/FacilityReviewModal';
import { AdminConfirmationModal } from '../../components/admin/AdminConfirmationModal';

interface UserManagementPageProps {
  onNavigate?: (path: string) => void;
}

export const UserManagementPage: React.FC<UserManagementPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'players' | 'owners' | 'banned'>('all');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'name' | 'bookings'>('newest');
  const [page, setPage] = useState(1);

  // Modals state
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [isFacilityReviewOpen, setIsFacilityReviewOpen] = useState(false);

  // Ban confirmation
  const [quickBanUser, setQuickBanUser] = useState<User | null>(null);
  const [banReason, setBanReason] = useState('');
  const [lastUpdated, setLastUpdated] = useState(Date.now());

  const counts = useMemo(() => userManagementService.getUserCounts(), [lastUpdated]);

  const queryResult = useMemo(() => {
    return userManagementService.getUsers({
      tab: activeTab,
      search,
      status: statusFilter as any,
      sortBy,
      page,
      limit: 8,
    });
  }, [activeTab, search, statusFilter, sortBy, page, lastUpdated]);

  const handleBanUser = (userId: string, reason?: string) => {
    userManagementService.banUser(userId, reason);
    setLastUpdated(Date.now());
    if (selectedUser && selectedUser.id === userId) {
      setSelectedUser({ ...selectedUser, isBanned: true });
    }
  };

  const handleUnbanUser = (userId: string) => {
    userManagementService.unbanUser(userId);
    setLastUpdated(Date.now());
    if (selectedUser && selectedUser.id === userId) {
      setSelectedUser({ ...selectedUser, isBanned: false });
    }
  };

  const handleExecuteQuickBan = () => {
    if (!quickBanUser) return;
    if (quickBanUser.isBanned) {
      handleUnbanUser(quickBanUser.id);
    } else {
      handleBanUser(quickBanUser.id, banReason || 'Violating community standards.');
    }
    setQuickBanUser(null);
    setBanReason('');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black font-display tracking-tight text-[#172033]">
              User Management
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-bold bg-blue-100 text-blue-800 rounded-full">
              {counts.all} Registered
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Monitor player accounts, facility owners, account standing, and activity metrics.
          </p>
        </div>
      </div>

      {/* Quick Tabs Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => {
            setActiveTab('all');
            setPage(1);
          }}
          className={`p-4 rounded-2xl border text-left transition-all ${
            activeTab === 'all'
              ? 'bg-white border-blue-500 ring-2 ring-blue-100 shadow-xs'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="text-xs font-semibold text-slate-500">All Accounts</div>
          <div className="text-2xl font-black font-display text-slate-900 mt-1">{counts.all}</div>
        </button>

        <button
          onClick={() => {
            setActiveTab('players');
            setPage(1);
          }}
          className={`p-4 rounded-2xl border text-left transition-all ${
            activeTab === 'players'
              ? 'bg-white border-emerald-500 ring-2 ring-emerald-100 shadow-xs'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="text-xs font-semibold text-emerald-600">Active Players</div>
          <div className="text-2xl font-black font-display text-emerald-900 mt-1">{counts.players}</div>
        </button>

        <button
          onClick={() => {
            setActiveTab('owners');
            setPage(1);
          }}
          className={`p-4 rounded-2xl border text-left transition-all ${
            activeTab === 'owners'
              ? 'bg-white border-purple-500 ring-2 ring-purple-100 shadow-xs'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="text-xs font-semibold text-purple-600">Facility Owners</div>
          <div className="text-2xl font-black font-display text-purple-900 mt-1">{counts.owners}</div>
        </button>

        <button
          onClick={() => {
            setActiveTab('banned');
            setPage(1);
          }}
          className={`p-4 rounded-2xl border text-left transition-all ${
            activeTab === 'banned'
              ? 'bg-white border-rose-500 ring-2 ring-rose-100 shadow-xs'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="text-xs font-semibold text-rose-600">Banned Accounts</div>
          <div className="text-2xl font-black font-display text-rose-900 mt-1">{counts.banned}</div>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 shadow-2xs space-y-3">
        <div className="flex flex-col lg:flex-row items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by user name, email address, user ID, or city..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#F7F9F8] border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
            />
          </div>

          {/* Filters Row */}
          <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="bg-[#F7F9F8] border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700 font-semibold focus:outline-none focus:border-emerald-500"
            >
              <option value="all">Status: All</option>
              <option value="active">Active & Verified</option>
              <option value="pending">Pending Verification</option>
              <option value="banned">Banned</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value as any);
                setPage(1);
              }}
              className="bg-[#F7F9F8] border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700 font-semibold focus:outline-none focus:border-emerald-500"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="oldest">Sort: Oldest First</option>
              <option value="name">Sort: Name (A-Z)</option>
              <option value="bookings">Sort: Most Bookings</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-2xs overflow-hidden">
        {queryResult.users.length === 0 ? (
          <div className="py-16 text-center text-xs text-slate-500">
            <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="font-bold text-slate-700">No users found</p>
            <p className="mt-1">Try changing your search term or tab selection.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7F9F8] border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Contact Info</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Activity & Matches</th>
                  <th className="py-3 px-4">Joined</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {queryResult.users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                          <img
                            src={u.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.email}`}
                            alt={u.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-[#172033] text-xs leading-snug">
                            {u.name}
                          </div>
                          <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                            ID: {u.id}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-800">{u.email}</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>{u.phone || '+91 98765 43210'}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold capitalize ${
                          u.role === 'admin'
                            ? 'bg-emerald-100 text-emerald-800'
                            : u.role === 'facility_owner'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {u.role.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 flex items-center gap-1">
                        <Activity className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{u.activityScore || 85}% Score</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {u.gamesPlayed || 4} matches played
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-500">
                      <div className="flex items-center gap-1 text-[11px]">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{new Date(u.createdAt).toLocaleDateString()}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      {u.isBanned ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                          Banned
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          <CheckCircle2 className="w-3 h-3" />
                          Active
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setSelectedUser(u);
                            setIsDetailsOpen(true);
                          }}
                          className="px-2.5 py-1.5 bg-[#F7F9F8] hover:bg-slate-100 text-slate-700 font-bold rounded-lg border border-slate-200 transition-colors flex items-center gap-1 text-[11px]"
                          title="View Profile & History"
                        >
                          <Eye className="w-3.5 h-3.5 text-slate-500" />
                          <span>View</span>
                        </button>

                        <button
                          onClick={() => setQuickBanUser(u)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            u.isBanned
                              ? 'text-emerald-600 hover:bg-emerald-50'
                              : 'text-rose-600 hover:bg-rose-50'
                          }`}
                          title={u.isBanned ? 'Unban User' : 'Ban User'}
                        >
                          <Ban className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        {queryResult.totalPages > 1 && (
          <div className="p-4 border-t border-[#E5E7EB] bg-[#F7F9F8] flex items-center justify-between text-xs text-slate-600">
            <div>
              Showing <span className="font-bold">{(page - 1) * queryResult.limit + 1}</span> to{' '}
              <span className="font-bold">
                {Math.min(page * queryResult.limit, queryResult.total)}
              </span>{' '}
              of <span className="font-bold">{queryResult.total}</span> users
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-3 font-semibold">
                Page {page} of {queryResult.totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(queryResult.totalPages, p + 1))}
                disabled={page === queryResult.totalPages}
                className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* User Details Modal */}
      <UserDetailsModal
        user={selectedUser}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        onBanUser={handleBanUser}
        onUnbanUser={handleUnbanUser}
        onViewFacility={(fac) => {
          setSelectedFacility(fac);
          setIsFacilityReviewOpen(true);
        }}
      />

      {/* Facility Review Modal (for viewing owner's facility) */}
      <FacilityReviewModal
        facility={selectedFacility}
        isOpen={isFacilityReviewOpen}
        onClose={() => setIsFacilityReviewOpen(false)}
        onApprove={(id, c) => userManagementService.banUser(id, c)} // stub
        onReject={(id, r) => userManagementService.banUser(id, r)} // stub
      />

      {/* Quick Ban/Unban Confirmation Modal */}
      <AdminConfirmationModal
        isOpen={!!quickBanUser}
        title={
          quickBanUser?.isBanned
            ? `Unban "${quickBanUser?.name}"?`
            : `Ban user "${quickBanUser?.name}"?`
        }
        message={
          quickBanUser?.isBanned
            ? 'This will restore full access for this user to login and make bookings.'
            : 'This user will be immediately barred from logging in or reserving courts.'
        }
        confirmLabel={quickBanUser?.isBanned ? 'Unban User' : 'Ban User'}
        variant={quickBanUser?.isBanned ? 'success' : 'danger'}
        showInput={!quickBanUser?.isBanned}
        inputValue={banReason}
        onInputChange={setBanReason}
        inputPlaceholder="Reason for ban (e.g. Terms violation, fraudulent activity)..."
        onConfirm={handleExecuteQuickBan}
        onClose={() => setQuickBanUser(null)}
      />
    </div>
  );
};
