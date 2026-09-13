import React from 'react';
import { Clock, DollarSign, Edit3, Trash2, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Court } from '../../types';
import { CourtStatusBadge } from './CourtStatusBadge';

export interface CourtCardProps {
  court: Court;
  onEdit: (court: Court) => void;
  onDelete: (court: Court) => void;
  onToggleStatus: (court: Court) => void;
  onViewSchedule?: (court: Court) => void;
}

export const CourtCard: React.FC<CourtCardProps> = ({
  court,
  onEdit,
  onDelete,
  onToggleStatus,
  onViewSchedule,
}) => {
  return (
    <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
      <div>
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-base font-bold font-display text-slate-900 group-hover:text-emerald-700 transition-colors">
                {court.name}
              </h4>
              <CourtStatusBadge status={court.status} />
            </div>
            <span className="text-xs font-semibold text-emerald-600 block mt-0.5">
              {court.sport}
            </span>
          </div>

          <div className="text-right">
            <span className="text-lg font-extrabold text-slate-900 font-display">
              ₹{court.pricePerHour}
            </span>
            <span className="text-[11px] text-slate-400 block font-normal">/ hour</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Surface Type:</span>
            <span className="font-semibold text-slate-800">
              {court.type || 'Indoor Synthetic'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Operating Schedule:</span>
            <span className="font-medium text-slate-700 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>
                {court.openingTime} - {court.closingTime}
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <button
          onClick={() => onToggleStatus(court)}
          className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ${
            court.status === 'active'
              ? 'bg-amber-50 text-amber-700 hover:bg-amber-100'
              : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
          }`}
        >
          {court.status === 'active' ? (
            <>
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Set Maintenance</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Activate</span>
            </>
          )}
        </button>

        <div className="flex items-center gap-1">
          {onViewSchedule && (
            <button
              onClick={() => onViewSchedule(court)}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              Slots
            </button>
          )}
          <button
            onClick={() => onEdit(court)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
            title="Edit Court"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(court)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            title="Delete Court"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
