import React from 'react';
import {
  Building2,
  CalendarCheck,
  CheckCircle2,
  UserPlus,
  AlertTriangle,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { analyticsService } from '../../services/analyticsService';

interface RecentActivityProps {
  onNavigate?: (path: string) => void;
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ onNavigate }) => {
  const activities = analyticsService.getRecentPlatformActivity();

  const getIcon = (type: string) => {
    switch (type) {
      case 'facility_submitted':
        return {
          icon: Building2,
          bg: 'bg-blue-50 text-blue-600 border-blue-100',
        };
      case 'booking':
        return {
          icon: CalendarCheck,
          bg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        };
      case 'facility_approved':
        return {
          icon: CheckCircle2,
          bg: 'bg-teal-50 text-teal-600 border-teal-100',
        };
      case 'user':
        return {
          icon: UserPlus,
          bg: 'bg-purple-50 text-purple-600 border-purple-100',
        };
      case 'report':
        return {
          icon: AlertTriangle,
          bg: 'bg-amber-50 text-amber-600 border-amber-100',
        };
      default:
        return {
          icon: Clock,
          bg: 'bg-slate-50 text-slate-600 border-slate-100',
        };
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-2xs flex flex-col h-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-bold font-display text-[#172033]">
            Recent Platform Activity
          </h3>
          <p className="text-xs text-slate-500">Live system audit events</p>
        </div>
        <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Realtime
        </span>
      </div>

      <div className="space-y-4 flex-1">
        {activities.map((act) => {
          const { icon: Icon, bg } = getIcon(act.type);
          return (
            <div key={act.id} className="flex items-start gap-3 text-left">
              <div className={`p-2 rounded-xl border ${bg} shrink-0 mt-0.5`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-bold text-[#172033] truncate">
                    {act.title}
                  </p>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap">
                    {act.time}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-1">
                  {act.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {onNavigate && (
        <div className="pt-4 mt-4 border-t border-slate-100">
          <button
            onClick={() => onNavigate('/admin/facilities')}
            className="w-full py-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Review Pending Approvals</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
