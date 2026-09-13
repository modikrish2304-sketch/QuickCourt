import React, { useState, useEffect } from 'react';
import {
  Clock,
  Calendar,
  Layers,
  ShieldAlert,
  CheckCircle2,
  Lock,
  Unlock,
  AlertCircle,
  Plus,
  RefreshCw,
  User,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { OwnerLayout } from '../../components/owner/OwnerLayout';
import { BlockSlotModal } from '../../components/timeslots/BlockSlotModal';
import { timeslotService } from '../../services/timeslotService';
import { courtService } from '../../services/courtService';
import { facilityService } from '../../services/facilityService';
import { Court, TimeSlot, SlotStatus } from '../../types';

export interface TimeSlotManagementProps {
  onNavigate: (route: string) => void;
  onShowToast?: (type: 'success' | 'warning' | 'error' | 'info', title: string, msg?: string) => void;
}

export const TimeSlotManagement: React.FC<TimeSlotManagementProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const { user } = useAuth();
  const facility = facilityService.getOwnerFacility(user?.id || 'usr_owner_1');
  const courts = courtService.getCourts(facility.id);

  // Read court query param if present
  const queryParams = new URLSearchParams(window.location.search);
  const initialCourtId = queryParams.get('courtId') || courts[0]?.id || '';

  const [selectedCourtId, setSelectedCourtId] = useState<string>(initialCourtId);
  const [selectedDate, setSelectedDate] = useState<string>(
    () => new Date().toISOString().split('T')[0]
  );
  const [slots, setSlots] = useState<any[]>([]);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [selectedSlotForAction, setSelectedSlotForAction] = useState<any | null>(null);

  // Quick Date Selectors
  const today = new Date().toISOString().split('T')[0];
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrow = tomorrowDate.toISOString().split('T')[0];

  const refreshSlots = () => {
    if (!selectedCourtId) return;
    const computedSlots = timeslotService.getSlotsForCourt(selectedCourtId, selectedDate);
    setSlots(computedSlots);
  };

  useEffect(() => {
    refreshSlots();
  }, [selectedCourtId, selectedDate]);

  const activeCourt = courts.find((c) => c.id === selectedCourtId) || courts[0];

  const handleBlockSubmit = async (payload: any) => {
    try {
      await timeslotService.blockSlot(payload);
      setIsBlockModalOpen(false);
      refreshSlots();
      if (onShowToast) {
        onShowToast(
          'warning',
          'Slots Blocked',
          `Reserved from ${payload.startTime} to ${payload.endTime} for ${payload.reason}`
        );
      }
    } catch (err: any) {
      if (onShowToast) {
        onShowToast('error', 'Action Failed', err.message || 'Error blocking slots');
      }
    }
  };

  const handleUnblockSlot = async (slot: any) => {
    try {
      if (slot.blockId) {
        await timeslotService.unblockSlot(slot.blockId);
      } else {
        await timeslotService.unblockSlotByCourtDateTime(
          selectedCourtId,
          selectedDate,
          slot.rawStart || slot.startTime
        );
      }
      refreshSlots();
      if (onShowToast) {
        onShowToast('success', 'Slot Unblocked', `${slot.startTime} is now available for player reservations.`);
      }
    } catch (err: any) {
      if (onShowToast) {
        onShowToast('error', 'Failed', 'Could not unblock slot.');
      }
    }
  };

  const availableCount = slots.filter((s) => s.status === 'available').length;
  const bookedCount = slots.filter((s) => s.status === 'booked').length;
  const maintenanceCount = slots.filter((s) => s.status === 'maintenance').length;

  return (
    <OwnerLayout
      currentRoute="/owner/timeslots"
      onNavigate={onNavigate}
      pageTitle="Time Slot & Capacity Management"
    >
      <div className="space-y-6 animate-in fade-in duration-200">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold font-display text-slate-900">
                Time Slot Management
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                Live Sync
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Configure daily availability, reserve slots for maintenance or coaching, and review booked hours.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={refreshSlots}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              title="Refresh Schedule"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsBlockModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-2"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Block Slots (Bulk / Maintenance)</span>
            </button>
          </div>
        </div>

        {/* Court & Date Selectors */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-5">
          {/* Court Selector Pills */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Select Court
            </label>
            <div className="flex flex-wrap gap-2">
              {courts.map((court) => {
                const isSelected = court.id === selectedCourtId;
                return (
                  <button
                    key={court.id}
                    onClick={() => setSelectedCourtId(court.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-2 ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Layers className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                    <span>{court.name}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-medium ${
                        isSelected ? 'bg-emerald-700 text-white' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {court.sport}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Date Selector */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                Schedule Date:
              </span>
              <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200/60 font-semibold">
                <button
                  onClick={() => setSelectedDate(today)}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    selectedDate === today
                      ? 'bg-white text-emerald-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Today
                </button>
                <button
                  onClick={() => setSelectedDate(tomorrow)}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    selectedDate === tomorrow
                      ? 'bg-white text-emerald-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Tomorrow
                </button>
              </div>

              <div className="relative">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Summary Counters */}
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-slate-700">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>{availableCount} Available</span>
              </span>
              <span className="flex items-center gap-1.5 text-slate-700">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span>{bookedCount} Booked</span>
              </span>
              <span className="flex items-center gap-1.5 text-slate-700">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>{maintenanceCount} Blocked</span>
              </span>
            </div>
          </div>
        </div>

        {/* Time Slot Grid (06:00 to 23:00) */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold font-display text-slate-900">
                Operating Schedule Slots (06:00 - 23:00)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Click any available slot to block it, or unblock maintenance slots directly.
              </p>
            </div>
            {activeCourt && (
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                ₹{activeCourt.pricePerHour} / hour
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {slots.map((slot) => {
              const isAvailable = slot.status === 'available';
              const isBooked = slot.status === 'booked';
              const isMaintenance = slot.status === 'maintenance';

              return (
                <div
                  key={slot.id}
                  className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between relative group ${
                    isAvailable
                      ? 'bg-white border-slate-200 hover:border-emerald-500 hover:shadow-xs'
                      : isBooked
                      ? 'bg-rose-50/50 border-rose-200'
                      : 'bg-amber-50/60 border-amber-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                      <span>{slot.startTime}</span>
                      {isAvailable && (
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      )}
                      {isBooked && (
                        <span className="w-2 h-2 rounded-full bg-rose-500" />
                      )}
                      {isMaintenance && (
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      to {slot.endTime}
                    </span>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    {isAvailable && (
                      <>
                        <span className="text-emerald-700 font-semibold">Available</span>
                        <button
                          onClick={() => {
                            timeslotService.blockSlot({
                              courtId: selectedCourtId,
                              date: selectedDate,
                              startTime: slot.rawStart || slot.id,
                              endTime: slot.rawEnd || `${parseInt(slot.id) + 1}:00`,
                              reason: 'Manual Maintenance Block',
                            }).then(() => {
                              refreshSlots();
                              if (onShowToast) onShowToast('warning', 'Slot Blocked', `${slot.startTime} has been blocked.`);
                            });
                          }}
                          className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-amber-600 transition-opacity"
                          title="Block this slot"
                        >
                          <Lock className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}

                    {isBooked && (
                      <div className="w-full">
                        <span className="text-rose-700 font-bold block truncate">
                          Booked
                        </span>
                        <span className="text-[10px] text-slate-500 truncate block">
                          {slot.bookedBy}
                        </span>
                      </div>
                    )}

                    {isMaintenance && (
                      <div className="w-full flex items-center justify-between">
                        <span className="text-amber-800 font-semibold truncate text-[10px]" title={slot.blockReason}>
                          {slot.blockReason || 'Blocked'}
                        </span>
                        <button
                          onClick={() => handleUnblockSlot(slot)}
                          className="p-1 rounded bg-white hover:bg-amber-100 text-amber-700 shadow-2xs font-bold shrink-0 ml-1"
                          title="Unblock Slot"
                        >
                          <Unlock className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Block Slot Modal */}
      <BlockSlotModal
        isOpen={isBlockModalOpen}
        onClose={() => setIsBlockModalOpen(false)}
        courts={courts}
        selectedCourtId={selectedCourtId}
        selectedDate={selectedDate}
        onConfirmBlock={handleBlockSubmit}
      />
    </OwnerLayout>
  );
};
