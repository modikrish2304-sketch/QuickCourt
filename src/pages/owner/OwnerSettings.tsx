import React, { useState } from 'react';
import {
  Settings,
  Shield,
  Wallet,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { OwnerLayout } from '../../components/owner/OwnerLayout';
import { ownerService, OwnerSettings } from '../../services/ownerService';

export interface OwnerSettingsPageProps {
  onNavigate: (route: string) => void;
  onShowToast?: (type: 'success' | 'warning' | 'error' | 'info', title: string, msg?: string) => void;
}

export const OwnerSettingsPage: React.FC<OwnerSettingsPageProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const [settings, setSettings] = useState<OwnerSettings>(() =>
    ownerService.getSettings()
  );
  const [autoApprove, setAutoApprove] = useState(settings.autoApproveBookings);
  const [cancellationWindow, setCancellationWindow] = useState(
    settings.cancellationWindowHours
  );
  const [instantRefund, setInstantRefund] = useState(settings.instantRefundAllowed);
  const [payoutUpi, setPayoutUpi] = useState(settings.payoutUpiId);
  const [bankAccount, setBankAccount] = useState(settings.bankAccount);
  const [ifsc, setIfsc] = useState(settings.ifscCode);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const updated = ownerService.saveSettings({
        autoApproveBookings: autoApprove,
        cancellationWindowHours: Number(cancellationWindow),
        instantRefundAllowed: instantRefund,
        payoutUpiId: payoutUpi,
        bankAccount,
        ifscCode: ifsc,
      });
      setSettings(updated);
      if (onShowToast) {
        onShowToast(
          'success',
          'Settings Saved',
          'Facility operating preferences and payout credentials updated.'
        );
      }
    } catch (err) {
      if (onShowToast) {
        onShowToast('error', 'Error', 'Failed to save settings.');
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <OwnerLayout
      currentRoute="/owner/settings"
      onNavigate={onNavigate}
      pageTitle="Facility Settings & Settlement"
    >
      <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-200">
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          <h1 className="text-xl sm:text-2xl font-extrabold font-display text-slate-900">
            Venue Operations & Payout Configuration
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure reservation approval policies, cancellation windows, and linked bank settlement details.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Reservation Rules */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
            <h3 className="text-base font-bold font-display text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>Booking & Cancellation Policy</span>
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <div>
                  <span className="font-semibold text-slate-900 block">
                    Instant Auto-Confirmation
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Automatically confirm player reservations once online payment succeeds
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={autoApprove}
                  onChange={(e) => setAutoApprove(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Cancellation Cutoff Window (Hours before start time)
                </label>
                <select
                  value={cancellationWindow}
                  onChange={(e) => setCancellationWindow(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 text-xs focus:outline-none focus:border-emerald-500"
                >
                  <option value={1}>1 Hour before match</option>
                  <option value={2}>2 Hours before match (Recommended)</option>
                  <option value={4}>4 Hours before match</option>
                  <option value={12}>12 Hours before match</option>
                  <option value={24}>24 Hours before match</option>
                </select>
                <p className="text-[11px] text-slate-400 mt-1">
                  Players cancelling within this window receive a 100% refund automatically.
                </p>
              </div>
            </div>
          </div>

          {/* Payout & Banking Credentials */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
            <h3 className="text-base font-bold font-display text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
              <Wallet className="w-4 h-4 text-emerald-600" />
              <span>Escrow Payout Settlement</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">
                  UPI VPA for Instant Direct Settlements
                </label>
                <input
                  type="text"
                  required
                  value={payoutUpi}
                  onChange={(e) => setPayoutUpi(e.target.value)}
                  placeholder="e.g. smasharena@okhdfcbank"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Registered Bank Account Number
                </label>
                <input
                  type="text"
                  required
                  value={bankAccount}
                  onChange={(e) => setBankAccount(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  IFSC Code
                </label>
                <input
                  type="text"
                  required
                  value={ifsc}
                  onChange={(e) => setIfsc(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="p-3 bg-emerald-50/60 border border-emerald-200/80 rounded-xl text-[11px] text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>
                Net earnings are credited every Tuesday at 02:00 AM directly into your linked bank account.
              </span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 p-4 bg-white border border-slate-200/90 rounded-2xl shadow-xs">
            <button
              type="button"
              onClick={() => onNavigate('/owner/dashboard')}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
            </button>
          </div>
        </form>
      </div>
    </OwnerLayout>
  );
};
