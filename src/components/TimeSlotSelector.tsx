import React from 'react';
import { Calendar, Clock, Sun, Sunset, Moon } from 'lucide-react';

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  available: boolean;
  bookedBy?: string;
}

export interface TimeSlotSelectorProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  selectedSlot: TimeSlot | null;
  onSelectSlot: (slot: TimeSlot) => void;
  slots: TimeSlot[];
}

export const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  selectedDate,
  onDateChange,
  selectedSlot,
  onSelectSlot,
  slots,
}) => {
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
            const isBooked = !slot.available;

            return (
              <button
                key={slot.id}
                type="button"
                disabled={isBooked}
                onClick={() => onSelectSlot(slot)}
                className={`py-3 px-3 rounded-xl text-center text-xs font-bold transition-all relative flex flex-col items-center justify-center border ${
                  isBooked
                    ? 'bg-slate-100/70 border-slate-200 text-slate-400 cursor-not-allowed'
                    : isSelected
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'bg-white border-slate-200 text-slate-800 hover:border-emerald-500 hover:bg-emerald-50/30'
                }`}
              >
                <span>{slot.startTime}</span>
                <span
                  className={`text-[10px] font-medium mt-0.5 ${
                    isBooked
                      ? 'text-slate-400'
                      : isSelected
                      ? 'text-emerald-100'
                      : 'text-slate-400'
                  }`}
                >
                  {isBooked ? 'Booked' : `to ${slot.endTime}`}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Date Carousel / Pill Bar */}
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

      {/* Slots Section */}
      <div className="space-y-5 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            Select 1-Hour Time Slot
          </label>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1 text-slate-600">
              <span className="w-2.5 h-2.5 rounded-full border border-slate-300 bg-white" />
              Available
            </span>
            <span className="flex items-center gap-1 text-slate-600">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
              Selected
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              Booked
            </span>
          </div>
        </div>

        {renderSlotGroup('Morning', <Sun className="w-3.5 h-3.5 text-amber-500" />, morningSlots)}
        {renderSlotGroup('Afternoon', <Sunset className="w-3.5 h-3.5 text-orange-500" />, afternoonSlots)}
        {renderSlotGroup('Evening & Night', <Moon className="w-3.5 h-3.5 text-indigo-500" />, eveningSlots)}
      </div>
    </div>
  );
};
