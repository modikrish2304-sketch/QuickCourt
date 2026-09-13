import React, { useState } from 'react';
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

export interface BookingTrendChartProps {
  facilityId?: string;
}

export const BookingTrendChart: React.FC<BookingTrendChartProps> = ({ facilityId }) => {
  const [period, setPeriod] = useState<'Daily' | 'Weekly' | 'Monthly'>('Daily');

  const data = analyticsService.getBookingTrends(facilityId, period);

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold font-display text-slate-900">
              Booking Trends
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              Live Sync
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Volume of player court reservations over time
          </p>
        </div>

        {/* Period Selector Tabs */}
        <div className="inline-flex p-1 bg-slate-100 rounded-xl self-start sm:self-auto border border-slate-200/60">
          {(['Daily', 'Weekly', 'Monthly'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setPeriod(tab)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                period === tab
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="h-64 sm:h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#16A34A" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#16A34A" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis
              dataKey="name"
              stroke="#94A3B8"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#E2E8F0' }}
            />
            <YAxis
              stroke="#94A3B8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => `${val}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                borderColor: '#E2E8F0',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                fontSize: '12px',
              }}
              formatter={(val: any) => [`${val} Bookings`, 'Total Bookings']}
            />
            <Area
              type="monotone"
              dataKey="bookings"
              stroke="#16A34A"
              strokeWidth={2.5}
              fill="url(#trendGradient)"
              activeDot={{ r: 6, fill: '#16A34A', stroke: '#FFFFFF', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Highest activity recorded on weekend evenings (18:00 - 21:00)</span>
        <span className="font-semibold text-emerald-600">Avg 38 bookings/day</span>
      </div>
    </div>
  );
};
