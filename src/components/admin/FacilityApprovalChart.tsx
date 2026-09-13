import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { analyticsService } from '../../services/analyticsService';

export const FacilityApprovalChart: React.FC = () => {
  const [period, setPeriod] = useState<'Weekly' | 'Monthly'>('Monthly');
  const data = analyticsService.getFacilityApprovalTrends(period);

  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="text-sm font-bold font-display text-[#172033]">
            Facility Approvals vs Submissions
          </h3>
          <p className="text-xs text-slate-500">
            Audit velocity of submitted, approved, and rejected venues
          </p>
        </div>

        <div className="inline-flex p-1 bg-[#F7F9F8] border border-[#E5E7EB] rounded-xl text-xs font-semibold self-start sm:self-auto">
          {(['Weekly', 'Monthly'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setPeriod(tab)}
              className={`px-3 py-1 rounded-lg transition-all ${
                period === tab
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
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-lg text-xs space-y-1">
                      <p className="font-bold text-slate-800">{label}</p>
                      <p className="text-blue-600 font-semibold">
                        Submitted: {payload[0]?.value}
                      </p>
                      <p className="text-emerald-700 font-semibold">
                        Approved: {payload[1]?.value}
                      </p>
                      <p className="text-rose-600 font-semibold">
                        Rejected: {payload[2]?.value}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: '11px', paddingBottom: '10px' }}
            />
            <Bar
              dataKey="submitted"
              name="Submitted"
              fill="#93C5FD"
              radius={[4, 4, 0, 0]}
              maxBarSize={28}
            />
            <Bar
              dataKey="approved"
              name="Approved"
              fill="#16A34A"
              radius={[4, 4, 0, 0]}
              maxBarSize={28}
            />
            <Bar
              dataKey="rejected"
              name="Rejected"
              fill="#F87171"
              radius={[4, 4, 0, 0]}
              maxBarSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
