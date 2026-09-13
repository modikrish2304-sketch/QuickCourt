import React, { useState, useEffect } from 'react';
import { X, Layers, AlertCircle } from 'lucide-react';
import { Court, SportType } from '../../types';

export interface CourtFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (courtData: any) => void;
  initialData?: Court | null;
  facilityId: string;
}

export const CourtFormModal: React.FC<CourtFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  facilityId,
}) => {
  const [name, setName] = useState('');
  const [sport, setSport] = useState<SportType>('Badminton');
  const [pricePerHour, setPricePerHour] = useState<number>(450);
  const [type, setType] = useState('Indoor Synthetic');
  const [openingTime, setOpeningTime] = useState('06:00 AM');
  const [closingTime, setClosingTime] = useState('11:00 PM');
  const [status, setStatus] = useState<'active' | 'maintenance' | 'inactive'>('active');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setSport(initialData.sport);
      setPricePerHour(initialData.pricePerHour);
      setType(initialData.type || 'Indoor Synthetic');
      setOpeningTime(initialData.openingTime || '06:00 AM');
      setClosingTime(initialData.closingTime || '11:00 PM');
      setStatus(initialData.status);
    } else {
      setName('');
      setSport('Badminton');
      setPricePerHour(450);
      setType('Indoor Synthetic');
      setOpeningTime('06:00 AM');
      setClosingTime('11:00 PM');
      setStatus('active');
    }
    setError('');
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Court name is required');
      return;
    }
    if (!pricePerHour || pricePerHour <= 0) {
      setError('Hourly rate must be greater than ₹0');
      return;
    }

    onSubmit({
      id: initialData?.id,
      facilityId,
      name: name.trim(),
      sport,
      pricePerHour: Number(pricePerHour),
      type,
      openingTime,
      closingTime,
      status,
    });
  };

  const sportsList: SportType[] = [
    'Badminton',
    'Football',
    'Tennis',
    'Cricket',
    'Basketball',
    'Pickleball',
    'Table Tennis',
    'Volleyball',
    'Squash',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 text-left">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold font-display text-slate-900">
              {initialData ? 'Edit Court Parameters' : 'Add New Court'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Court Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Court 01 (Yonex Synthetic)"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Sport Type
              </label>
              <select
                value={sport}
                onChange={(e) => setSport(e.target.value as SportType)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
              >
                {sportsList.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Price / Hour (₹)
              </label>
              <input
                type="number"
                required
                min={50}
                step={50}
                value={pricePerHour}
                onChange={(e) => setPricePerHour(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Surface & Court Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
            >
              <option value="Indoor Synthetic">Indoor Synthetic Mat</option>
              <option value="Indoor Wooden">Indoor Teak Wood</option>
              <option value="Outdoor Acrylic">Outdoor Acrylic Hard Court</option>
              <option value="Artificial Turf">50mm Artificial Grass Turf</option>
              <option value="Clay Court">Natural Red Clay</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Opening Time
              </label>
              <input
                type="text"
                value={openingTime}
                onChange={(e) => setOpeningTime(e.target.value)}
                placeholder="06:00 AM"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Closing Time
              </label>
              <input
                type="text"
                value={closingTime}
                onChange={(e) => setClosingTime(e.target.value)}
                placeholder="11:00 PM"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Operational Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
            >
              <option value="active">Active (Available for Booking)</option>
              <option value="maintenance">Maintenance (Temporarily Blocked)</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xs transition-colors"
            >
              {initialData ? 'Save Changes' : 'Create Court'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
