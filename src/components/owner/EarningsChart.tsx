import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { analyticsService } from '../../services/analyticsService';

export interface EarningsChartProps {
  facilityId?: string;
}

export const EarningsChart: React.FC<EarningsChartProps> = ({ facilityId }) => {
  const [filter, setFilter] = useState<'Today' | 'This Week' | 'This Month' | 'This Year'>(
    'This Month'
  );

  const earningsData = analyticsService.getEarningsSummary(facilityId, filter);

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold font-display text-slate-900">
              Earnings Summary
            </h3>
            <span className="text-xs font-bold text-emerald-600">
              ₹{earningsData.totalEarnings.toLocaleString()}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Revenue breakdown across courts for {filter.toLowerCase()}
          </p>
        </div>

        {/* Filter dropdown / tabs */}
        <div className="inline-flex p-1 bg-slate-100 rounded-xl self-start sm:self-auto border border-slate-200/60">
          {(['Today', 'This Week', 'This Month', 'This Year'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-all ${
                filter === tab
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
          <BarChart
            data={earningsData.breakdown}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis
              dataKey="courtName"
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
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                borderColor: '#E2E8F0',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                fontSize: '12px',
              }}
              formatter={(val: any) => [`₹${Number(val).toLocaleString()}`, 'Gross Payout']}
            />
            <Bar dataKey="earnings" fill="#16A34A" radius={[6, 6, 0, 0]} barSize={34} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Court 02 & Court 04 generate highest hourly yield</span>
        <span className="font-semibold text-slate-700">Bank settlement: Active</span>
      </div>
    </div>
  );
};
