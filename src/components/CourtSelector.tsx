import React from 'react';
import { Court } from '../types';
import { Check } from 'lucide-react';

export interface CourtSelectorProps {
  courts: Court[];
  selectedCourtId: string;
  onSelectCourt: (court: Court) => void;
  selectedSport?: string;
}

export const CourtSelector: React.FC<CourtSelectorProps> = ({
  courts,
  selectedCourtId,
  onSelectCourt,
  selectedSport,
}) => {
  const filteredCourts = selectedSport
    ? courts.filter((c) => c.sport.toLowerCase() === selectedSport.toLowerCase())
    : courts;

  if (filteredCourts.length === 0) {
    return (
      <div className="p-6 rounded-2xl border border-dashed border-slate-200 text-center">
        <p className="text-sm font-semibold text-slate-600">
          No courts currently registered for {selectedSport || 'this sport'}.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filteredCourts.map((court) => {
          const isSelected = court.id === selectedCourtId;

          return (
            <div
              key={court.id}
              onClick={() => onSelectCourt(court)}
              className={`cursor-pointer rounded-2xl border p-4 transition-all duration-200 flex items-start justify-between relative ${
                isSelected
                  ? 'border-emerald-600 bg-emerald-50/40 ring-2 ring-emerald-500/20 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900 font-display">
                    {court.name}
                  </h4>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {court.type || 'Indoor'}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-500">
                  <span>{court.sport}</span>
                  <span>•</span>
                  <span>{court.openingTime || '06:00'} - {court.closingTime || '23:00'}</span>
                </div>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-base font-black text-slate-900 font-display">
                    ₹{court.pricePerHour}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">/ hour</span>
                </div>
              </div>

              {/* Selection Circle */}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'border-2 border-slate-300 bg-white'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
