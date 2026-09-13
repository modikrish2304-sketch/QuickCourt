import React from 'react';

export interface CourtStatusBadgeProps {
  status: 'active' | 'maintenance' | 'inactive';
}

export const CourtStatusBadge: React.FC<CourtStatusBadgeProps> = ({ status }) => {
  if (status === 'active') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span>Active</span>
      </span>
    );
  }

  if (status === 'maintenance') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200/80">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
        <span>Maintenance</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
      <span>Inactive</span>
    </span>
  );
};
