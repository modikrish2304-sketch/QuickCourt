import React from 'react';
import { LucideIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export interface KPICardProps {
  id?: string;
  label: string;
  value: string | number;
  subtext?: string;
  growth?: string;
  isPositive?: boolean;
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
  isPositive = true,
  icon: Icon,
  iconColor = 'text-emerald-600',
  iconBg = 'bg-emerald-50',
  onClick,
}) => {
  return (
    <div
      id={id}
      onClick={onClick}
      className={`relative p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 group text-left ${
        onClick ? 'cursor-pointer hover:border-emerald-300 active:scale-[0.99]' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {label}
          </span>
          <div className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
            {value}
          </div>
        </div>

        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${iconBg}`}
        >
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        {growth ? (
          <div
            className={`flex items-center gap-1 font-semibold ${
              isPositive ? 'text-emerald-600' : 'text-rose-600'
            }`}
          >
            {isPositive ? (
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5 stroke-[2.5]" />
            )}
            <span>{growth}</span>
          </div>
        ) : (
          <span className="text-slate-400">vs previous period</span>
        )}

        {subtext && <span className="text-slate-500 font-medium">{subtext}</span>}
      </div>
    </div>
  );
};
