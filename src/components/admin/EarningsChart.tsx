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

export const EarningsChart: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'Monthly' | 'Weekly' | 'Daily'>('Monthly');
  const data = analyticsService.getPlatformEarningsSimulation(timeframe);

  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold font-display text-[#172033]">
              Platform Gross Revenue & Take Rate
            </h3>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded-md">
              ₹18.4L (Sep Run Rate)
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Combined player payment volume and platform convenience fee collection
          </p>
        </div>

        <div className="inline-flex p-1 bg-[#F7F9F8] border border-[#E5E7EB] rounded-xl text-xs font-semibold self-start sm:self-auto">
          {(['Daily', 'Weekly', 'Monthly'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setTimeframe(tab)}
              className={`px-3 py-1 rounded-lg transition-all ${
                timeframe === tab
                  ? 'bg-white text-emerald-800 font-bold shadow-2xs border border-slate-200/60'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#16A34A" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#16A34A" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis
              dataKey="name"
              stroke="#94A3B8"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#94A3B8"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload;
                  return (
                    <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-lg text-xs space-y-1">
                      <p className="font-bold text-slate-800">{label}</p>
                      <p className="text-emerald-700 font-bold">
                        Gross Volume: ₹{item.revenue.toLocaleString()}
                      </p>
                      <p className="text-slate-600 font-medium">
                        Platform Fee Share: ₹{item.fee.toLocaleString()}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#16A34A"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#earningsGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
