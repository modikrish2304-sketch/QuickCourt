import React, { useState } from 'react';
import { X, ShieldAlert, Clock, AlertCircle } from 'lucide-react';
import { Court } from '../../types';

export interface BlockSlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  courts: Court[];
  selectedCourtId?: string;
  selectedDate?: string;
  onConfirmBlock: (payload: {
    courtId: string;
    date: string;
    startTime: string;
    endTime: string;
    reason: string;
  }) => void;
}

export const BlockSlotModal: React.FC<BlockSlotModalProps> = ({
  isOpen,
  onClose,
  courts,
  selectedCourtId,
  selectedDate,
  onConfirmBlock,
}) => {
  const [courtId, setCourtId] = useState(selectedCourtId || courts[0]?.id || '');
  const [date, setDate] = useState(
    selectedDate || new Date().toISOString().split('T')[0]
  );
  const [startTime, setStartTime] = useState('14:00');
  const [endTime, setEndTime] = useState('16:00');
  const [reasonCategory, setReasonCategory] = useState('Maintenance');
  const [customReason, setCustomReason] = useState('Surface Cleaning & Net Repair');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmBlock({
      courtId: courtId || courts[0]?.id || '',
      date,
      startTime,
      endTime,
      reason: `${reasonCategory}: ${customReason}`,
    });
  };

  const timeOptions = [
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 text-left">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display text-slate-900">
                Block Court Time Slot
              </h3>
              <span className="text-[11px] text-slate-500">
                Prevent player bookings during maintenance or private events
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Select Court
            </label>
            <select
              value={courtId}
              onChange={(e) => setCourtId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
            >
              {courts.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.sport})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Date
            </label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Start Time
              </label>
              <select
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
              >
                {timeOptions.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                End Time
              </label>
              <select
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
              >
                {timeOptions.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Primary Reason
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['Maintenance', 'Private Event', 'Cleaning', 'Other'].map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setReasonCategory(cat)}
                  className={`py-1.5 px-2 rounded-lg border text-center font-semibold transition-all ${
                    reasonCategory === cat
                      ? 'bg-amber-50 border-amber-300 text-amber-800'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Reason Details
            </label>
            <input
              type="text"
              required
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              placeholder="e.g. Surface cleaning & lighting maintenance"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
            />
          </div>

          <div className="p-3 bg-amber-50/60 border border-amber-200/80 rounded-xl text-[11px] text-amber-800">
            <span className="font-semibold">Notice:</span> Players viewing the
            court reservation page will immediately see these slots marked as
            unavailable.
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-xs transition-colors"
            >
              Confirm Block
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
