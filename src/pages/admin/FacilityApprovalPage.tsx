import React, { useState, useMemo } from 'react';
import {
  Building2,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  ChevronLeft,
  ChevronRight,
  MapPin,
  RefreshCw,
  Plus,
} from 'lucide-react';
import { facilityApprovalService } from '../../services/facilityApprovalService';
import { adminService } from '../../services/adminService';
import { Facility } from '../../types';
import { FacilityReviewModal } from '../../components/admin/FacilityReviewModal';
import { AdminConfirmationModal } from '../../components/admin/AdminConfirmationModal';

export const FacilityApprovalPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [search, setSearch] = useState('');
  const [venueType, setVenueType] = useState('all');
  const [sport, setSport] = useState('all');
  const [city, setCity] = useState('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'name' | 'status'>('newest');
  const [page, setPage] = useState(1);

  // Modals state
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [quickActionFacility, setQuickActionFacility] = useState<Facility | null>(null);
  const [quickActionType, setQuickActionType] = useState<'approve' | 'reject' | null>(null);
  const [quickReason, setQuickReason] = useState('');
  const [lastUpdated, setLastUpdated] = useState(Date.now());

  // Data fetching
  const counts = useMemo(() => facilityApprovalService.getFacilityCounts(), [lastUpdated]);

  const queryResult = useMemo(() => {
    return facilityApprovalService.getFacilities({
      status: activeTab,
      search,
      venueType: venueType as any,
      sport,
      city,
      sortBy,
      page,
      limit: 8,
    });
  }, [activeTab, search, venueType, sport, city, sortBy, page, lastUpdated]);

  const handleApprove = (facilityId: string, comment?: string) => {
    facilityApprovalService.approveFacility(facilityId, comment);
    setLastUpdated(Date.now());
  };

  const handleReject = (facilityId: string, reason: string) => {
    facilityApprovalService.rejectFacility(facilityId, reason);
    setLastUpdated(Date.now());
  };

  const handleExecuteQuickAction = () => {
    if (!quickActionFacility) return;
    if (quickActionType === 'approve') {
      handleApprove(quickActionFacility.id, quickReason || 'Approved by administrator.');
    } else if (quickActionType === 'reject') {
      handleReject(quickActionFacility.id, quickReason || 'Verification requirements not met.');
    }
    setQuickActionFacility(null);
    setQuickActionType(null);
    setQuickReason('');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black font-display tracking-tight text-[#172033]">
              Facility Approvals & Directory
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-bold bg-emerald-100 text-emerald-800 rounded-full">
              {counts.all} Total
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Review partner onboarding submissions, inspect venue safety guidelines, and manage directory visibility.
          </p>
        </div>

        <button
          onClick={() => {
            // Seed a new pending facility submission for demo demonstration
            const newPending = {};
            setLastUpdated(Date.now());
            setActiveTab('pending');
          }}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Simulate New Submission</span>
        </button>
      </div>

      {/* Quick Stats Summary Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => {
            setActiveTab('all');
            setPage(1);
          }}
          className={`p-4 rounded-2xl border text-left transition-all ${
            activeTab === 'all'
              ? 'bg-white border-emerald-500 ring-2 ring-emerald-100 shadow-xs'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="text-xs font-semibold text-slate-500">All Venues</div>
          <div className="text-2xl font-black font-display text-slate-900 mt-1">{counts.all}</div>
        </button>

        <button
          onClick={() => {
            setActiveTab('pending');
            setPage(1);
          }}
          className={`p-4 rounded-2xl border text-left transition-all ${
            activeTab === 'pending'
              ? 'bg-white border-amber-500 ring-2 ring-amber-100 shadow-xs'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="text-xs font-semibold text-amber-600 flex items-center justify-between">
            <span>Pending Review</span>
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          </div>
          <div className="text-2xl font-black font-display text-amber-900 mt-1">{counts.pending}</div>
        </button>

        <button
          onClick={() => {
            setActiveTab('approved');
            setPage(1);
          }}
          className={`p-4 rounded-2xl border text-left transition-all ${
            activeTab === 'approved'
              ? 'bg-white border-emerald-500 ring-2 ring-emerald-100 shadow-xs'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="text-xs font-semibold text-emerald-600">Approved & Active</div>
          <div className="text-2xl font-black font-display text-emerald-900 mt-1">{counts.approved}</div>
        </button>

        <button
          onClick={() => {
            setActiveTab('rejected');
            setPage(1);
          }}
          className={`p-4 rounded-2xl border text-left transition-all ${
            activeTab === 'rejected'
              ? 'bg-white border-rose-500 ring-2 ring-rose-100 shadow-xs'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="text-xs font-semibold text-rose-600">Rejected / Needs Fix</div>
          <div className="text-2xl font-black font-display text-rose-900 mt-1">{counts.rejected}</div>
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
              placeholder="Search by facility name, owner, city, or area..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#F7F9F8] border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
            />
          </div>

          {/* Filters Row */}
          <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0">
            <select
              value={venueType}
              onChange={(e) => {
                setVenueType(e.target.value);
                setPage(1);
              }}
              className="bg-[#F7F9F8] border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700 font-semibold focus:outline-none focus:border-emerald-500"
            >
              <option value="all">Venue: All Types</option>
              <option value="Indoor">Indoor</option>
              <option value="Outdoor">Outdoor</option>
              <option value="Premium">Premium</option>
              <option value="Community">Community</option>
            </select>

            <select
              value={sport}
              onChange={(e) => {
                setSport(e.target.value);
                setPage(1);
              }}
              className="bg-[#F7F9F8] border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700 font-semibold focus:outline-none focus:border-emerald-500"
            >
              <option value="all">Sport: All Sports</option>
              <option value="Badminton">Badminton</option>
              <option value="Tennis">Tennis</option>
              <option value="Football">Football</option>
              <option value="Cricket">Cricket</option>
              <option value="Basketball">Basketball</option>
              <option value="Squash">Squash</option>
              <option value="Swimming">Swimming</option>
            </select>

            <select
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                setPage(1);
              }}
              className="bg-[#F7F9F8] border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700 font-semibold focus:outline-none focus:border-emerald-500"
            >
              <option value="all">City: All Cities</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Chennai">Chennai</option>
              <option value="Pune">Pune</option>
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
              <option value="status">Sort: Status</option>
            </select>
          </div>
        </div>
      </div>

      {/* Facilities Table */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-2xs overflow-hidden">
        {queryResult.facilities.length === 0 ? (
          <div className="py-16 text-center text-xs text-slate-500">
            <Building2 className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="font-bold text-slate-700">No facilities found</p>
            <p className="mt-1">Try adjusting your status filter, search query, or city selector.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7F9F8] border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Facility & Location</th>
                  <th className="py-3 px-4">Owner Contact</th>
                  <th className="py-3 px-4">Sports</th>
                  <th className="py-3 px-4">Type & Pricing</th>
                  <th className="py-3 px-4">Submitted</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {queryResult.facilities.map((fac) => (
                  <tr key={fac.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                          <img
                            src={fac.images?.[0] || 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=120'}
                            alt={fac.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-[#172033] text-xs leading-snug">
                            {fac.name}
                          </div>
                          <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            <span>
                              {fac.area}, {fac.city}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-800">{fac.ownerName}</div>
                      <div className="text-[11px] text-slate-500 font-mono">ID: {fac.ownerId}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1 max-w-[180px]">
                        {fac.sports.slice(0, 2).map((sp) => (
                          <span
                            key={sp}
                            className="px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded-md text-[10px] font-bold"
                          >
                            {sp}
                          </span>
                        ))}
                        {fac.sports.length > 2 && (
                          <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[10px]">
                            +{fac.sports.length - 2}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">₹{fac.startingPrice} / hr</div>
                      <div className="text-[11px] text-slate-500 capitalize">{fac.venueType}</div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-500">
                      <div className="flex items-center gap-1 text-[11px]">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{new Date(fac.createdAt).toLocaleDateString()}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold capitalize ${
                          fac.status === 'approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : fac.status === 'pending'
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {fac.status === 'pending' && <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
                        {fac.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setSelectedFacility(fac);
                            setIsReviewOpen(true);
                          }}
                          className="px-2.5 py-1.5 bg-[#F7F9F8] hover:bg-slate-100 text-slate-700 font-bold rounded-lg border border-slate-200 transition-colors flex items-center gap-1 text-[11px]"
                          title="Full Review & Photos"
                        >
                          <Eye className="w-3.5 h-3.5 text-slate-500" />
                          <span>Review</span>
                        </button>

                        {fac.status !== 'approved' && (
                          <button
                            onClick={() => {
                              setQuickActionFacility(fac);
                              setQuickActionType('approve');
                            }}
                            className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                            title="Quick Approve"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        )}

                        {fac.status !== 'rejected' && (
                          <button
                            onClick={() => {
                              setQuickActionFacility(fac);
                              setQuickActionType('reject');
                            }}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Quick Reject"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}
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
              of <span className="font-bold">{queryResult.total}</span> facilities
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

      {/* Facility Review Modal */}
      <FacilityReviewModal
        facility={selectedFacility}
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        onApprove={handleApprove}
        onReject={handleReject}
      />

      {/* Quick Action Confirmation Modal */}
      <AdminConfirmationModal
        isOpen={!!quickActionFacility && !!quickActionType}
        title={
          quickActionType === 'approve'
            ? `Approve "${quickActionFacility?.name}"?`
            : `Reject "${quickActionFacility?.name}"?`
        }
        message={
          quickActionType === 'approve'
            ? 'This facility will immediately become active and public for all players.'
            : 'Please specify the reason why this facility submission is rejected.'
        }
        confirmLabel={quickActionType === 'approve' ? 'Approve' : 'Reject'}
        variant={quickActionType === 'approve' ? 'success' : 'danger'}
        showInput={true}
        inputValue={quickReason}
        onInputChange={setQuickReason}
        inputPlaceholder={
          quickActionType === 'approve'
            ? 'Optional approval note...'
            : 'Reason for rejection (e.g. invalid license, inaccurate court dimensions)...'
        }
        onConfirm={handleExecuteQuickAction}
        onClose={() => {
          setQuickActionFacility(null);
          setQuickActionType(null);
        }}
      />
    </div>
  );
};
