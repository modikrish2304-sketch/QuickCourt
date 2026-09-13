import React from 'react';
import { LucideIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export interface AdminKPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  growth?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  onClick?: () => void;
}

export const AdminKPICard: React.FC<AdminKPICardProps> = ({
  title,
  value,
  subtitle,
  growth,
  isPositive = true,
  icon: Icon,
  iconColor = 'text-emerald-600',
  iconBg = 'bg-emerald-50 border-emerald-100',
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-2xs hover:shadow-md transition-all text-left ${
        onClick ? 'cursor-pointer hover:border-emerald-300 group' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <span className="text-xs font-semibold text-slate-500">{title}</span>
        <div className={`p-2.5 rounded-xl border ${iconBg} ${iconColor} transition-transform group-hover:scale-105`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-3">
        <div className="text-2xl font-bold font-display text-[#172033] tracking-tight">
          {value}
        </div>

        <div className="mt-2 flex items-center gap-2 flex-wrap text-xs">
          {growth && (
            <span
              className={`inline-flex items-center gap-0.5 font-bold ${
                isPositive ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {isPositive ? (
                <ArrowUpRight className="w-3.5 h-3.5" />
              ) : (
                <ArrowDownRight className="w-3.5 h-3.5" />
              )}
              {growth}
            </span>
          )}
          {subtitle && <span className="text-slate-500 font-medium">{subtitle}</span>}
        </div>
      </div>
    </div>
  );
};
