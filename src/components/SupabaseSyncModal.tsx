import React, { useState, useEffect } from 'react';
import { Database, Check, Copy, ExternalLink, RefreshCw, X, AlertTriangle, ShieldCheck } from 'lucide-react';
import { supabaseService, SUPABASE_BOOKINGS_SQL } from '../services/supabaseService';
import { SUPABASE_PROJECT_ID, SUPABASE_URL } from '../lib/supabase';

export interface SupabaseSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseSyncModal: React.FC<SupabaseSyncModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<{ connected: boolean; tableExists: boolean; message: string }>({
    connected: true,
    tableExists: false,
    message: 'Testing connection...',
  });
  const [isLoading, setIsLoading] = useState(false);

  const checkStatus = async () => {
    setIsLoading(true);
    const res = await supabaseService.checkConnection();
    setStatus(res);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      checkStatus();
    }
  }, [isOpen]);

  const handleCopySQL = () => {
    navigator.clipboard.writeText(SUPABASE_BOOKINGS_SQL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-2xs">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
                Supabase Backend Integration
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Connected
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Project: <code className="font-mono text-slate-700 font-semibold">{SUPABASE_PROJECT_ID}</code>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-600">
          {/* Status Box */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                {status.tableExists ? (
                  <>
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Table `bookings` Active & Recording</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <span>Table `bookings` Ready to be Created</span>
                  </>
                )}
              </div>
              <p className="text-slate-500">{status.message}</p>
              <p className="text-[11px] text-emerald-700 font-medium pt-1">
                ✓ Captures all filled appointment booking forms<br />
                ✓ Automatically records any failed booking attempts (conflicts, validation errors, payment fails)
              </p>
            </div>

            <button
              onClick={checkStatus}
              disabled={isLoading}
              className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-white text-slate-700 font-semibold flex items-center gap-1.5 text-xs transition-colors shrink-0 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Test Connection</span>
            </button>
          </div>

          {/* Configuration Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Supabase URL
              </span>
              <code className="text-xs font-mono text-slate-800 break-all">{SUPABASE_URL}</code>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Table Target
              </span>
              <span className="text-xs font-bold text-slate-800">
                public.bookings / public.appointments
              </span>
            </div>
          </div>

          {/* SQL Setup Script */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 text-xs">
                Run this SQL in your Supabase SQL Editor:
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/sql/new`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:underline"
                >
                  <span>Open Supabase SQL Editor</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  onClick={handleCopySQL}
                  className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold flex items-center gap-1.5 text-xs shadow-2xs transition-all"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy SQL'}</span>
                </button>
              </div>
            </div>

            <div className="relative rounded-2xl bg-slate-900 p-4 font-mono text-[11px] text-emerald-300 overflow-x-auto max-h-56 leading-relaxed border border-slate-800">
              <pre>{SUPABASE_BOOKINGS_SQL}</pre>
            </div>
            <p className="text-[11px] text-slate-500">
              Once created, whenever someone fills or fails an appointment booking form, every detail (user name, phone, court, slot, price, payment status, and error logs) is inserted instantly into your Supabase database table.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-end bg-slate-50/50">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 font-semibold text-slate-800 text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
