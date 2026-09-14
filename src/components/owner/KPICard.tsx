import React from 'react';
import { LucideIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export interface KPICardProps {
  id?: string;
  label: string;
  value: string | number;
  subtext?: string;
  growth?: string;
  growthLabel?: string;
  isPositive?: boolean;
  badge?: string;
  badgeVariant?: 'success' | 'info' | 'warning';
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  onClick?: () => void;
}

export const KPICard: React.FC<KPICardProps> = ({
  id,
  label,
  value,
  subtext,
  growth,
  growthLabel,
  isPositive = true,
  badge,
  badgeVariant = 'success',
  icon: Icon,
  iconColor = 'text-emerald-600',
  iconBg = 'bg-emerald-50',
  onClick,
}) => {
  return (
    <div
      id={id}
      onClick={onClick}
      className={`relative p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group text-left ${
        onClick ? 'cursor-pointer hover:border-emerald-400/80 active:scale-[0.99]' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1.5 min-w-0">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block truncate">
            {label}
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 tracking-tight">
            {value}
          </div>
        </div>

        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 shadow-2xs ${iconBg}`}
        >
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs gap-2 min-h-[28px]">
        {growth ? (
          <div className="flex items-center gap-1.5 font-semibold shrink-0">
            <span
              className={`inline-flex items-center gap-0.5 text-xs font-bold px-1.5 py-0.5 rounded-md ${
                isPositive
                  ? 'text-emerald-700 bg-emerald-50'
                  : 'text-rose-700 bg-rose-50'
              }`}
            >
              {isPositive ? (
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              ) : (
                <ArrowDownRight className="w-3.5 h-3.5 stroke-[2.5]" />
              )}
              {growth}
            </span>
            {growthLabel && (
              <span className="text-[11px] text-slate-400 font-normal truncate hidden sm:inline">
                {growthLabel}
              </span>
            )}
          </div>
        ) : badge ? (
          <span
            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold shrink-0 ${
              badgeVariant === 'success'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                : badgeVariant === 'info'
                ? 'bg-blue-50 text-blue-700 border border-blue-200/60'
                : 'bg-amber-50 text-amber-700 border border-amber-200/60'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                badgeVariant === 'success'
                  ? 'bg-emerald-500 animate-pulse'
                  : badgeVariant === 'info'
                  ? 'bg-blue-500'
                  : 'bg-amber-500'
              }`}
            />
            {badge}
          </span>
        ) : (
          <span className="text-slate-400 text-[11px]">vs previous period</span>
        )}

        {subtext && (
          <span className="text-slate-500 font-medium text-[11px] truncate text-right ml-auto">
            {subtext}
          </span>
        )}
      </div>
    </div>
  );
};
