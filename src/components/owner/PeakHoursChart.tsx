import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { analyticsService } from '../../services/analyticsService';

export interface PeakHoursChartProps {
  facilityId?: string;
}

export const PeakHoursChart: React.FC<PeakHoursChartProps> = ({ facilityId }) => {
  const peakData = analyticsService.getPeakBookingHours(facilityId);

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold font-display text-slate-900">
              Peak Booking Hours
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/60">
              98% Peak Utilization
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Hourly court occupancy distribution throughout operating schedule
          </p>
        </div>
      </div>

      <div className="h-64 sm:h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={peakData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="peakGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0D9488" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#0D9488" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis
              dataKey="label"
              stroke="#94A3B8"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#E2E8F0' }}
            />
            <YAxis
              stroke="#94A3B8"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                borderColor: '#E2E8F0',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                fontSize: '12px',
              }}
              formatter={(val: any, _, item: any) => [
                `${val}% Occupancy (${item.payload.level})`,
                'Utilization',
              ]}
            />
            <Area
              type="monotone"
              dataKey="occupancy"
              stroke="#0D9488"
              strokeWidth={2.5}
              fill="url(#peakGradient)"
              activeDot={{ r: 6, fill: '#0D9488', stroke: '#FFFFFF', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Low (&lt;40%)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>Medium (40-75%)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span>High (&gt;75%)</span>
          </span>
        </div>
        <span className="font-semibold text-slate-700">Prime Window: 18:00 – 21:00</span>
      </div>
    </div>
  );
};
