import React, { useState } from 'react';
import {
  X,
  AlertTriangle,
  CheckCircle2,
  Shield,
  User,
  Building2,
  Clock,
  Ban,
  FileText,
} from 'lucide-react';
import { Report } from '../../types';
import { AdminConfirmationModal } from './AdminConfirmationModal';

interface ReportDetailsModalProps {
  report: Report | null;
  isOpen: boolean;
  onClose: () => void;
  onResolve: (reportId: string, actionTaken: string) => void;
  onDismiss: (reportId: string, note?: string) => void;
  onBanUser?: (userId: string, reason: string) => void;
}

export const ReportDetailsModal: React.FC<ReportDetailsModalProps> = ({
  report,
  isOpen,
  onClose,
  onResolve,
  onDismiss,
  onBanUser,
}) => {
  const [actionNote, setActionNote] = useState('Reviewed report and took corrective action.');
  const [dismissNote, setDismissNote] = useState('Report dismissed as invalid / resolved amicably.');
  const [isConfirmResolve, setIsConfirmResolve] = useState(false);
  const [isConfirmDismiss, setIsConfirmDismiss] = useState(false);

  if (!isOpen || !report) return null;

  const handleExecuteResolve = () => {
    onResolve(report.id, actionNote);
    setIsConfirmResolve(false);
    onClose();
  };

  const handleExecuteDismiss = () => {
    onDismiss(report.id, dismissNote);
    setIsConfirmDismiss(false);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
        <div className="w-full max-w-2xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 duration-150 flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-[#E5E7EB] flex items-center justify-between bg-[#F7F9F8]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-bold font-display text-[#172033]">
                    Incident Report #{report.id}
                  </h2>
                  <span
                    className={`px-2 py-0.5 text-xs font-bold rounded-md uppercase ${
                      report.status === 'resolved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : report.status === 'dismissed'
                        ? 'bg-slate-200 text-slate-700'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {report.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Logged on {new Date(report.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 sm:p-6 space-y-6">
            {/* Target & Reporter Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Reported Target ({report.targetType})
                </span>
                <div className="flex items-center gap-2">
                  {report.targetType === 'facility' ? (
                    <Building2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <User className="w-4 h-4 text-blue-600" />
                  )}
                  <span className="text-xs font-bold text-slate-900">
                    {report.targetName}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-mono">
                  Target ID: {report.targetId}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Report Filed By
                </span>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-slate-500" />
                  <span className="text-xs font-bold text-slate-900">
                    {report.reporterName}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-mono">
                  Reporter ID: {report.reporterId}
                </p>
              </div>
            </div>

            {/* Violation Category & Description */}
            <div className="space-y-3">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Violation Category
                </span>
                <div className="text-xs font-bold text-slate-900 bg-amber-50 border border-amber-200 p-2.5 rounded-xl">
                  {report.reason}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Incident Description & Evidence
                </span>
                <div className="text-xs text-slate-700 bg-[#F7F9F8] border border-slate-200 p-3.5 rounded-xl leading-relaxed whitespace-pre-wrap">
                  {report.description}
                </div>
              </div>

              {report.actionTaken && (
                <div>
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                    Resolution Note
                  </span>
                  <div className="text-xs text-slate-800 bg-emerald-50/50 border border-emerald-200 p-3 rounded-xl font-medium">
                    {report.actionTaken}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 sm:p-6 border-t border-[#E5E7EB] bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {report.status === 'pending' && (
                <>
                  <button
                    onClick={() => setIsConfirmResolve(true)}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Resolve Report</span>
                  </button>

                  <button
                    onClick={() => setIsConfirmDismiss(true)}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors"
                  >
                    Dismiss
                  </button>
                </>
              )}
            </div>

            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modals */}
      <AdminConfirmationModal
        isOpen={isConfirmResolve}
        title="Resolve Incident Report"
        message="Document the corrective action taken to address this incident. This will mark the report as Resolved."
        confirmLabel="Confirm Resolution"
        variant="success"
        showInput={true}
        inputValue={actionNote}
        onInputChange={setActionNote}
        onConfirm={handleExecuteResolve}
        onClose={() => setIsConfirmResolve(false)}
      />

      <AdminConfirmationModal
        isOpen={isConfirmDismiss}
        title="Dismiss Report"
        message="Dismiss this report if it is determined to be non-actionable or invalid."
        confirmLabel="Dismiss Report"
        variant="warning"
        showInput={true}
        inputValue={dismissNote}
        onInputChange={setDismissNote}
        onConfirm={handleExecuteDismiss}
        onClose={() => setIsConfirmDismiss(false)}
      />
    </>
  );
};
