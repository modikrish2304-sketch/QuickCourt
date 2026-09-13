import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from 'recharts';
import { analyticsService } from '../../services/analyticsService';

export const ActiveSportsChart: React.FC = () => {
  const [metric, setMetric] = useState<'bookings' | 'courts'>('bookings');
  const data = analyticsService.getMostActiveSports(metric);

  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="text-sm font-bold font-display text-[#172033]">
            Most Active Sports
          </h3>
          <p className="text-xs text-slate-500">
            {metric === 'bookings'
              ? 'Sport popularity based on total player reservations'
              : 'Inventory distribution of active courts across platform'}
          </p>
        </div>

        <div className="inline-flex p-1 bg-[#F7F9F8] border border-[#E5E7EB] rounded-xl text-xs font-semibold self-start sm:self-auto">
          <button
            onClick={() => setMetric('bookings')}
            className={`px-3 py-1 rounded-lg transition-all ${
              metric === 'bookings'
                ? 'bg-white text-emerald-800 font-bold shadow-2xs border border-slate-200/60'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            By Bookings
          </button>
          <button
            onClick={() => setMetric('courts')}
            className={`px-3 py-1 rounded-lg transition-all ${
              metric === 'courts'
                ? 'bg-white text-emerald-800 font-bold shadow-2xs border border-slate-200/60'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            By Active Courts
          </button>
        </div>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
            <XAxis
              type="number"
              stroke="#94A3B8"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              type="category"
              dataKey="sport"
              stroke="#475569"
              fontSize={12}
              fontWeight={600}
              tickLine={false}
              axisLine={false}
              width={80}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload;
                  return (
                    <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-lg text-xs space-y-1">
                      <p className="font-bold text-slate-800">{item.sport}</p>
                      <p className="text-emerald-700 font-semibold">
                        {metric === 'bookings' ? 'Total Bookings' : 'Active Courts'}:{' '}
                        {item.value.toLocaleString()}
                      </p>
                      <p className="text-slate-500 font-medium">
                        Platform Share: {item.share}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="value" radius={[0, 6, 6, 0]} maxBarSize={22}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
