import React from 'react';
import { Building2, ArrowRight, Clock, MapPin } from 'lucide-react';
import { Facility } from '../../types';

interface PendingFacilitiesProps {
  facilities: Facility[];
  onReviewAll: () => void;
  onSelectFacility: (facility: Facility) => void;
}

export const PendingFacilities: React.FC<PendingFacilitiesProps> = ({
  facilities,
  onReviewAll,
  onSelectFacility,
}) => {
  const pending = facilities.filter((f) => f.status === 'pending').slice(0, 4);

  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-2xs flex flex-col h-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold font-display text-[#172033]">
              Pending Facility Approvals
            </h3>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 rounded-md border border-amber-200">
              {facilities.filter((f) => f.status === 'pending').length} Pending
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Venues awaiting safety, court & licensing verification
          </p>
        </div>

        <button
          onClick={onReviewAll}
          className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 hover:underline"
        >
          <span>Review All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-3 flex-1">
        {pending.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400">
            All facility submissions have been reviewed!
          </div>
        ) : (
          pending.map((fac) => (
            <div
              key={fac.id}
              onClick={() => onSelectFacility(fac)}
              className="p-3 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all flex items-center justify-between gap-3 cursor-pointer group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                  <img
                    src={fac.images?.[0] || 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=120'}
                    alt={fac.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="truncate">
                  <h4 className="text-xs font-bold text-[#172033] group-hover:text-emerald-700 truncate">
                    {fac.name}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                    <span className="flex items-center gap-0.5 truncate">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {fac.city}
                    </span>
                    <span>•</span>
                    <span className="truncate">Owner: {fac.ownerName}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-1">
                    <Clock className="w-3 h-3" />
                    <span>Submitted {new Date(fac.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <span className="px-2.5 py-1 text-xs font-bold text-emerald-700 bg-emerald-50 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors shrink-0">
                Review
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
