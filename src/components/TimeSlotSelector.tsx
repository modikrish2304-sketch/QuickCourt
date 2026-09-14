import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Sun, Sunset, Moon, Timer, RefreshCw, Activity, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { TimeSlot, SlotStatus } from '../types';

export type { TimeSlot };

export interface TimeSlotSelectorProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  selectedSlot: TimeSlot | null;
  onSelectSlot: (slot: TimeSlot) => void;
  slots: TimeSlot[];
  duration?: number;
  onDurationChange?: (duration: number) => void;
  onManualRefresh?: () => void;
  lastUpdated?: Date;
}

const DURATION_OPTIONS = [
  { label: '1 Hour', value: 1, sublabel: 'Standard session' },
  { label: '2 Hours', value: 2, sublabel: 'Recommended / Match' },
  { label: '3 Hours', value: 3, sublabel: 'Long training' },
  { label: '4 Hours', value: 4, sublabel: 'Tournament / Half day' },
];

function formatHourToAMPM(hour: number): string {
  const period = hour >= 12 && hour < 24 ? 'PM' : 'AM';
  let formattedHour = hour % 12;
  if (formattedHour === 0) formattedHour = 12;
  const hourStr = formattedHour < 10 ? `0${formattedHour}` : `${formattedHour}`;
  return `${hourStr}:00 ${period}`;
}

export const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  selectedDate,
  onDateChange,
  selectedSlot,
  onSelectSlot,
  slots,
  duration = 1,
  onDurationChange,
  onManualRefresh,
  lastUpdated = new Date(),
}) => {
  const [secondsAgo, setSecondsAgo] = useState(0);

  useEffect(() => {
    setSecondsAgo(0);
    const interval = setInterval(() => {
      setSecondsAgo((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [lastUpdated]);

  // Generate next 10 days for quick date pills
  const nextDays = React.useMemo(() => {
    const days: { dateStr: string; dayName: string; dayNumber: string; monthName: string }[] = [];
    const today = new Date();
    for (let i = 0; i < 10; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];
      const dayName = i === 0 ? 'Today' : i === 1 ? 'Tmrw' : d.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNumber = d.getDate().toString();
      const monthName = d.toLocaleDateString('en-US', { month: 'short' });
      days.push({ dateStr, dayName, dayNumber, monthName });
    }
    return days;
  }, []);

  // Helper to verify if duration slots starting at `slotIndex` are all available
  const getSlotAvailabilityForDuration = (slot: TimeSlot) => {
    const startHour = parseInt(slot.id.split(':')[0], 10);
    const endHour = startHour + duration;

    // Check if endHour exceeds closing time (e.g., 23:00)
    if (endHour > 23) {
      return {
        isAvailable: false,
        reason: 'Exceeds venue closing time (11:00 PM)',
        computedEndTime: formatHourToAMPM(Math.min(endHour, 23)),
        effectiveStatus: 'blocked' as SlotStatus,
      };
    }

    const computedEndTime = formatHourToAMPM(endHour);

    // If initial slot itself is not available, inherit its exact live status
    if (!slot.available) {
      return {
        isAvailable: false,
        reason: slot.liveStatusLabel || (slot.status === 'in_progress' ? 'Currently in progress' : 'Slot unavailable'),
        computedEndTime,
        effectiveStatus: slot.status,
      };
    }

    // Check all consecutive 1-hour slots required for duration > 1
    for (let h = startHour; h < endHour; h++) {
      const slotKey = h < 10 ? `0${h}:00` : `${h}:00`;
      const match = slots.find((s) => s.id === slotKey);
      if (!match || !match.available) {
        return {
          isAvailable: false,
          reason: match
            ? (match.status === 'in_progress'
                ? 'Consecutive hour currently in progress'
                : match.status === 'completed'
                ? 'Consecutive hour has passed'
                : match.status === 'maintenance'
                ? 'Consecutive hour under maintenance'
                : 'Consecutive hour already booked')
            : 'Unavailable',
          computedEndTime,
          effectiveStatus: match?.status || ('booked' as SlotStatus),
        };
      }
    }

    return {
      isAvailable: true,
      reason: null,
      computedEndTime,
      effectiveStatus: 'available' as SlotStatus,
    };
  };

  const handleSlotClick = (slot: TimeSlot) => {
    const info = getSlotAvailabilityForDuration(slot);
    if (!info.isAvailable) return;

    onSelectSlot({
      ...slot,
      endTime: info.computedEndTime,
    });
  };

  // Categorize slots by morning (before 12pm), afternoon (12pm-5pm), evening (5pm+)
  const morningSlots = slots.filter((s) => {
    const hour = parseInt(s.id.split(':')[0], 10);
    return hour < 12;
  });

  const afternoonSlots = slots.filter((s) => {
    const hour = parseInt(s.id.split(':')[0], 10);
    return hour >= 12 && hour < 17;
  });

  const eveningSlots = slots.filter((s) => {
    const hour = parseInt(s.id.split(':')[0], 10);
    return hour >= 17;
  });

  const renderSlotBadge = (slot: TimeSlot, isSelected: boolean, isAvailable: boolean, status: SlotStatus) => {
    if (isSelected) {
      return (
        <span className="mt-1 px-1.5 py-0.5 rounded bg-white text-[9px] text-emerald-800 font-bold uppercase tracking-wider flex items-center gap-1 shadow-xs">
          <CheckCircle2 className="w-2.5 h-2.5" />
          Selected
        </span>
      );
    }

    if (isAvailable) {
      return (
        <span className="mt-1 px-1.5 py-0.5 rounded bg-emerald-50 text-[9px] text-emerald-700 font-semibold border border-emerald-200/80 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Available
        </span>
      );
    }

    if (status === 'in_progress') {
      return (
        <span className="mt-1 px-1.5 py-0.5 rounded bg-amber-50 text-[9px] text-amber-800 font-bold border border-amber-300 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          In Progress
        </span>
      );
    }

    if (status === 'booked') {
      return (
        <span className="mt-1 px-1.5 py-0.5 rounded bg-rose-50 text-[9px] text-rose-700 font-semibold border border-rose-200 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
          Booked
        </span>
      );
    }

    if (status === 'completed' || status === 'past') {
      return (
        <span className="mt-1 px-1.5 py-0.5 rounded bg-slate-100 text-[9px] text-slate-500 font-medium border border-slate-200 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
          Completed
        </span>
      );
    }

    if (status === 'maintenance' || status === 'blocked') {
      return (
        <span className="mt-1 px-1.5 py-0.5 rounded bg-slate-100 text-[9px] text-slate-600 font-medium border border-slate-300 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
          Maintenance
        </span>
      );
    }

    return null;
  };

  const renderSlotGroup = (title: string, icon: React.ReactNode, groupSlots: TimeSlot[]) => {
    if (groupSlots.length === 0) return null;

    return (
      <div className="space-y-2.5">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 uppercase tracking-wider">
          {icon}
          <span>{title}</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
          {groupSlots.map((slot) => {
            const isSelected = selectedSlot?.id === slot.id;
            const check = getSlotAvailabilityForDuration(slot);
            const isAvailable = check.isAvailable;
            const effectiveStatus = check.effectiveStatus;

            // Determine border & background styles based on exact status colors
            let containerStyle = 'bg-white border-slate-200 text-slate-800 hover:border-emerald-500 hover:bg-emerald-50/20';

            if (isSelected) {
              containerStyle = 'bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-600/20 ring-2 ring-emerald-600/30';
            } else if (!isAvailable) {
              if (effectiveStatus === 'in_progress') {
                containerStyle = 'bg-amber-50/70 border-amber-200 text-amber-900/80 cursor-not-allowed';
              } else if (effectiveStatus === 'booked') {
                containerStyle = 'bg-rose-50/60 border-rose-200 text-rose-900/70 cursor-not-allowed';
              } else if (effectiveStatus === 'completed' || effectiveStatus === 'past') {
                containerStyle = 'bg-slate-100/80 border-slate-200 text-slate-400 cursor-not-allowed';
              } else {
                containerStyle = 'bg-slate-100/70 border-slate-200 text-slate-400 cursor-not-allowed';
              }
            }

            return (
              <button
                key={slot.id}
                type="button"
                disabled={!isAvailable}
                onClick={() => handleSlotClick(slot)}
                title={
                  check.reason
                    ? `${slot.startTime}: ${check.reason}`
                    : `${slot.startTime} to ${check.computedEndTime} (${duration} hr${duration > 1 ? 's' : ''})`
                }
                className={`py-3 px-2.5 rounded-xl text-center text-xs font-bold transition-all relative flex flex-col items-center justify-center border ${containerStyle}`}
              >
                <div className="flex items-center gap-1">
                  <span>{slot.startTime}</span>
                </div>

                <span
                  className={`text-[10px] font-medium mt-0.5 truncate max-w-full ${
                    isSelected
                      ? 'text-emerald-100'
                      : !isAvailable
                      ? effectiveStatus === 'in_progress'
                        ? 'text-amber-700'
                        : effectiveStatus === 'booked'
                        ? 'text-rose-600'
                        : 'text-slate-400'
                      : 'text-slate-500'
                  }`}
                >
                  {isAvailable ? `to ${check.computedEndTime}` : slot.nextAvailableTime || check.reason || 'Unavailable'}
                </span>

                {/* Status Badge */}
                {renderSlotBadge(slot, isSelected, isAvailable, effectiveStatus)}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* 1. Duration Selector */}
      {onDurationChange && (
        <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Timer className="w-4 h-4 text-emerald-600" />
              <span>Select Booking Duration</span>
            </label>
            <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              {duration} Hour{duration > 1 ? 's' : ''} Selected
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {DURATION_OPTIONS.map((opt) => {
              const isSelected = duration === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onDurationChange(opt.value)}
                  className={`py-2.5 px-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm shadow-emerald-600/20'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/20'
                  }`}
                >
                  <div className="text-xs font-bold flex items-center justify-between">
                    <span>{opt.label}</span>
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>
                    {opt.sublabel}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Date Carousel / Pill Bar */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-emerald-600" />
            Select Date
          </label>
          <input
            type="date"
            value={selectedDate}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => onDateChange(e.target.value)}
            className="text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg px-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {nextDays.map((d) => {
            const isSelected = d.dateStr === selectedDate;
            return (
              <button
                key={d.dateStr}
                type="button"
                onClick={() => onDateChange(d.dateStr)}
                className={`flex-shrink-0 w-18 py-2.5 px-2 rounded-2xl border text-center transition-all flex flex-col items-center justify-center ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span className={`text-[11px] font-semibold ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>
                  {d.dayName}
                </span>
                <span className="text-base font-black font-display my-0.5">
                  {d.dayNumber}
                </span>
                <span className={`text-[10px] font-medium ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>
                  {d.monthName}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Real-Time Slot Status Header & Legend */}
      <div className="space-y-4 pt-2 border-t border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-50/80 p-3 rounded-xl border border-slate-200/70">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-xs font-bold text-slate-700">Real-Time Slot Availability</span>
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              (Updated {secondsAgo}s ago)
            </span>
          </div>

          {/* Real-Time Status Legend */}
          <div className="flex items-center gap-3 text-[11px] flex-wrap">
            <span className="flex items-center gap-1 font-medium text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Available
            </span>
            <span className="flex items-center gap-1 font-medium text-amber-700">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              In Progress
            </span>
            <span className="flex items-center gap-1 font-medium text-rose-700">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              Booked
            </span>
            <span className="flex items-center gap-1 font-medium text-slate-400">
              <span className="w-2 h-2 rounded-full bg-slate-300" />
              Completed
            </span>

            {onManualRefresh && (
              <button
                type="button"
                onClick={onManualRefresh}
                title="Refresh real-time slot status"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 hover:text-emerald-700 bg-white px-2 py-0.5 rounded-md border border-slate-200 transition-colors ml-1"
              >
                <RefreshCw className="w-3 h-3 text-slate-500" />
                <span>Refresh</span>
              </button>
            )}
          </div>
        </div>

        {renderSlotGroup('Morning Slots', <Sun className="w-3.5 h-3.5 text-amber-500" />, morningSlots)}
        {renderSlotGroup('Afternoon Slots', <Sunset className="w-3.5 h-3.5 text-orange-500" />, afternoonSlots)}
        {renderSlotGroup('Evening & Night Slots', <Moon className="w-3.5 h-3.5 text-indigo-500" />, eveningSlots)}
      </div>
    </div>
  );
};
