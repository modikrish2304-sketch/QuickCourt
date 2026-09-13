import React, { useState, useEffect } from 'react';
import {
  Layers,
  Plus,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { OwnerLayout } from '../../components/owner/OwnerLayout';
import { CourtCard } from '../../components/courts/CourtCard';
import { CourtFormModal } from '../../components/courts/CourtFormModal';
import { courtService } from '../../services/courtService';
import { facilityService } from '../../services/facilityService';
import { Court, SportType } from '../../types';

export interface CourtManagementProps {
  onNavigate: (route: string) => void;
  onShowToast?: (type: 'success' | 'warning' | 'error' | 'info', title: string, msg?: string) => void;
}

export const CourtManagement: React.FC<CourtManagementProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const { user } = useAuth();
  const facility = facilityService.getOwnerFacility(user?.id || 'usr_owner_1');

  const [courts, setCourts] = useState<Court[]>(() =>
    courtService.getCourts(facility.id)
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingCourt, setEditingCourt] = useState<Court | null>(null);
  const [deletingCourt, setDeletingCourt] = useState<Court | null>(null);

  const refreshCourts = () => {
    setCourts(courtService.getCourts(facility.id));
  };

  const handleCreateOrUpdateCourt = async (courtData: any) => {
    try {
      if (courtData.id) {
        await courtService.updateCourt(courtData.id, courtData);
        if (onShowToast) {
          onShowToast('success', 'Court Updated', `${courtData.name} details have been updated.`);
        }
      } else {
        await courtService.addCourt(courtData);
        if (onShowToast) {
          onShowToast('success', 'Court Created', `${courtData.name} is now ready for reservations.`);
        }
      }
      setIsFormModalOpen(false);
      setEditingCourt(null);
      refreshCourts();
    } catch (err: any) {
      if (onShowToast) {
        onShowToast('error', 'Action Failed', err.message || 'Error saving court');
      }
    }
  };

  const handleDeleteCourt = async () => {
    if (!deletingCourt) return;
    try {
      await courtService.deleteCourt(deletingCourt.id);
      if (onShowToast) {
        onShowToast('info', 'Court Removed', `${deletingCourt.name} has been removed.`);
      }
      setDeletingCourt(null);
      refreshCourts();
    } catch (err: any) {
      if (onShowToast) {
        onShowToast('error', 'Delete Failed', err.message || 'Unable to remove court');
      }
    }
  };

  const handleToggleStatus = async (court: Court) => {
    const newStatus = court.status === 'active' ? 'maintenance' : 'active';
    try {
      await courtService.updateCourt(court.id, { status: newStatus });
      refreshCourts();
      if (onShowToast) {
        onShowToast(
          newStatus === 'active' ? 'success' : 'warning',
          'Status Changed',
          `${court.name} is now ${newStatus}.`
        );
      }
    } catch (err: any) {
      // ignore
    }
  };

  // Filtered list
  const filteredCourts = courts.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.sport.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.type && c.type.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSport = selectedSport === 'All' || c.sport === selectedSport;
    const matchesStatus = selectedStatus === 'All' || c.status === selectedStatus;
    return matchesSearch && matchesSport && matchesStatus;
  });

  const allSports = Array.from(new Set(courts.map((c) => c.sport)));

  return (
    <OwnerLayout
      currentRoute="/owner/courts"
      onNavigate={onNavigate}
      pageTitle="Court Inventory & Surfaces"
    >
      <div className="space-y-6 animate-in fade-in duration-200">
        {/* Top Header with Add Court Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold font-display text-slate-900">
                Court Management
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                {courts.length} Courts Total
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Configure sports surfaces, hourly pricing, schedule boundaries, and operational statuses.
            </p>
          </div>

          <button
            onClick={() => {
              setEditingCourt(null);
              setIsFormModalOpen(true);
            }}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-2 shrink-0 active:scale-[0.98]"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>+ Add Court</span>
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by court name, surface, or sport..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white text-xs"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Sport Filter */}
            <select
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 text-xs font-semibold focus:outline-none focus:border-emerald-500"
            >
              <option value="All">All Sports</option>
              {allSports.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 text-xs font-semibold focus:outline-none focus:border-emerald-500"
            >
              <option value="All">All Statuses</option>
              <option value="active">Active Only</option>
              <option value="maintenance">Under Maintenance</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Courts Grid */}
        {filteredCourts.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-white border border-slate-200/90 shadow-xs">
            <Layers className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-800">No courts found</h3>
            <p className="text-xs text-slate-500 mt-1">
              Try adjusting your search query or filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCourts.map((court) => (
              <CourtCard
                key={court.id}
                court={court}
                onEdit={(c) => {
                  setEditingCourt(c);
                  setIsFormModalOpen(true);
                }}
                onDelete={(c) => setDeletingCourt(c)}
                onToggleStatus={handleToggleStatus}
                onViewSchedule={(c) => onNavigate(`/owner/timeslots?courtId=${c.id}`)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add / Edit Court Modal */}
      <CourtFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingCourt(null);
        }}
        onSubmit={handleCreateOrUpdateCourt}
        initialData={editingCourt}
        facilityId={facility.id}
      />

      {/* Delete Confirmation Modal */}
      {deletingCourt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 text-left">
            <div className="flex items-center gap-3 text-rose-600 mb-3">
              <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold font-display text-slate-900">
                Delete Court?
              </h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to delete{' '}
              <span className="font-bold text-slate-900">
                "{deletingCourt.name}"
              </span>
              ? All future player bookings associated with this court will be cancelled and refunded.
              This action cannot be undone.
            </p>

            <div className="mt-6 flex items-center justify-end gap-2 text-xs">
              <button
                onClick={() => setDeletingCourt(null)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteCourt}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold shadow-xs transition-colors"
              >
                Yes, Delete Court
              </button>
            </div>
          </div>
        </div>
      )}
    </OwnerLayout>
  );
};
