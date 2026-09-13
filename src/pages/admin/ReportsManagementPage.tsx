import React, { useState, useMemo } from 'react';
import {
  AlertTriangle,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Shield,
  Eye,
  ChevronLeft,
  ChevronRight,
  User,
  Building2,
} from 'lucide-react';
import { reportService } from '../../services/reportService';
import { Report } from '../../types';
import { ReportDetailsModal } from '../../components/admin/ReportDetailsModal';

export const ReportsManagementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'resolved' | 'dismissed'>('pending');
  const [targetType, setTargetType] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(Date.now());

  const counts = useMemo(() => reportService.getReportCounts(), [lastUpdated]);

  const queryResult = useMemo(() => {
    return reportService.getReports({
      status: activeTab,
      targetType: targetType as any,
      search,
      page,
      limit: 8,
    });
  }, [activeTab, targetType, search, page, lastUpdated]);

  const handleResolve = (reportId: string, actionTaken: string) => {
    reportService.resolveReport(reportId, actionTaken);
    setLastUpdated(Date.now());
  };

  const handleDismiss = (reportId: string, note?: string) => {
    reportService.dismissReport(reportId, note);
    setLastUpdated(Date.now());
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black font-display tracking-tight text-[#172033]">
              Reports & Community Moderation
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-bold bg-amber-100 text-amber-800 rounded-full">
              {counts.pending} Action Required
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Review community incident flags, fraudulent activity reports, and facility safety disputes.
          </p>
        </div>
      </div>

      {/* Quick Tabs Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => {
            setActiveTab('all');
            setPage(1);
          }}
          className={`p-4 rounded-2xl border text-left transition-all ${
            activeTab === 'all'
              ? 'bg-white border-slate-500 ring-2 ring-slate-100 shadow-xs'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="text-xs font-semibold text-slate-500">All Reports</div>
          <div className="text-2xl font-black font-display text-slate-900 mt-1">{counts.all}</div>
        </button>

        <button
          onClick={() => {
            setActiveTab('pending');
            setPage(1);
          }}
          className={`p-4 rounded-2xl border text-left transition-all ${
            activeTab === 'pending'
              ? 'bg-white border-amber-500 ring-2 ring-amber-100 shadow-xs'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="text-xs font-semibold text-amber-600 flex items-center justify-between">
            <span>Pending Action</span>
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          </div>
          <div className="text-2xl font-black font-display text-amber-900 mt-1">{counts.pending}</div>
        </button>

        <button
          onClick={() => {
            setActiveTab('resolved');
            setPage(1);
          }}
          className={`p-4 rounded-2xl border text-left transition-all ${
            activeTab === 'resolved'
              ? 'bg-white border-emerald-500 ring-2 ring-emerald-100 shadow-xs'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="text-xs font-semibold text-emerald-600">Resolved</div>
          <div className="text-2xl font-black font-display text-emerald-900 mt-1">{counts.resolved}</div>
        </button>

        <button
          onClick={() => {
            setActiveTab('dismissed');
            setPage(1);
          }}
          className={`p-4 rounded-2xl border text-left transition-all ${
            activeTab === 'dismissed'
              ? 'bg-white border-slate-400 ring-2 ring-slate-100 shadow-xs'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="text-xs font-semibold text-slate-500">Dismissed</div>
          <div className="text-2xl font-black font-display text-slate-900 mt-1">{counts.dismissed}</div>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 shadow-2xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by target name, reporter, or reason..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#F7F9F8] border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
          />
        </div>

        <select
          value={targetType}
          onChange={(e) => {
            setTargetType(e.target.value);
            setPage(1);
          }}
          className="bg-[#F7F9F8] border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700 font-semibold focus:outline-none focus:border-emerald-500 w-full sm:w-auto"
        >
          <option value="all">Target: All Categories</option>
          <option value="facility">Facilities</option>
          <option value="user">Users</option>
          <option value="review">Reviews</option>
        </select>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-2xs overflow-hidden">
        {queryResult.reports.length === 0 ? (
          <div className="py-16 text-center text-xs text-slate-500">
            <AlertTriangle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="font-bold text-slate-700">No reports found</p>
            <p className="mt-1">All reports for this category have been addressed.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7F9F8] border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Report ID</th>
                  <th className="py-3 px-4">Reported Target</th>
                  <th className="py-3 px-4">Violation Category</th>
                  <th className="py-3 px-4">Reporter</th>
                  <th className="py-3 px-4">Logged At</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {queryResult.reports.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                      {r.id}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        {r.targetType === 'facility' ? (
                          <Building2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : (
                          <User className="w-4 h-4 text-blue-600 shrink-0" />
                        )}
                        <div>
                          <span className="font-bold text-slate-900">{r.targetName}</span>
                          <span className="text-[10px] text-slate-400 capitalize block">
                            {r.targetType}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-800 bg-amber-50 text-amber-800 border border-amber-200/60 px-2 py-0.5 rounded-md text-[11px]">
                        {r.reason}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-slate-600">
                      <div className="font-medium text-slate-800">{r.reporterName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">UID: {r.reporterId}</div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-500">
                      <div className="flex items-center gap-1 text-[11px]">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{new Date(r.createdAt).toLocaleDateString()}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                          r.status === 'resolved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : r.status === 'dismissed'
                            ? 'bg-slate-100 text-slate-700'
                            : 'bg-amber-100 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedReport(r);
                          setIsDetailsOpen(true);
                        }}
                        className="px-2.5 py-1.5 bg-[#F7F9F8] hover:bg-slate-100 text-slate-700 font-bold rounded-lg border border-slate-200 transition-colors flex items-center gap-1 text-[11px] ml-auto"
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-500" />
                        <span>Review</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        {queryResult.totalPages > 1 && (
          <div className="p-4 border-t border-[#E5E7EB] bg-[#F7F9F8] flex items-center justify-between text-xs text-slate-600">
            <div>
              Showing <span className="font-bold">{(page - 1) * queryResult.limit + 1}</span> to{' '}
              <span className="font-bold">
                {Math.min(page * queryResult.limit, queryResult.total)}
              </span>{' '}
              of <span className="font-bold">{queryResult.total}</span> reports
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-3 font-semibold">
                Page {page} of {queryResult.totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(queryResult.totalPages, p + 1))}
                disabled={page === queryResult.totalPages}
                className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Details Modal */}
      <ReportDetailsModal
        report={selectedReport}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        onResolve={handleResolve}
        onDismiss={handleDismiss}
      />
    </div>
  );
};
