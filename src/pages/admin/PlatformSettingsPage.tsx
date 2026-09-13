import React, { useState } from 'react';
import {
  Settings,
  Percent,
  Calendar,
  Activity,
  Bell,
  Save,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Shield,
  Smartphone,
  Mail,
  Zap,
} from 'lucide-react';
import { adminService } from '../../services/adminService';

export const PlatformSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<any>(() =>
    adminService.getSettings()
  );
  const [isSaved, setIsSaved] = useState(false);
  const [resetFeedback, setResetFeedback] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    adminService.updateSettings(settings);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleToggleSport = (sport: string) => {
    const active = settings.activeSports.includes(sport);
    const updated = active
      ? settings.activeSports.filter((s) => s !== sport)
      : [...settings.activeSports, sport];
    setSettings({ ...settings, activeSports: updated });
  };

  const handleResetDemoData = () => {
    if (
      window.confirm(
        'Are you sure you want to reset demo data? This will restore initial facilities, users, and bookings.'
      )
    ) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const availableSports = [
    'Badminton',
    'Tennis',
    'Football',
    'Cricket',
    'Basketball',
    'Squash',
    'Swimming',
    'Table Tennis',
    'Pickleball',
    'Volleyball',
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black font-display tracking-tight text-[#172033]">
              Platform Configuration & Policies
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-bold bg-emerald-100 text-emerald-800 rounded-full">
              System v2.4
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Global commission fee rates, cancellation rules, supported sport categories, and alert dispatches.
          </p>
        </div>

        <button
          onClick={handleResetDemoData}
          className="px-3.5 py-2 rounded-xl text-xs font-bold border border-rose-200 text-rose-700 hover:bg-rose-50 transition-colors flex items-center gap-1.5 self-start sm:self-auto"
          title="Reset database to initial seed values"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo Database</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Commission & Monetary Settings */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold font-display text-[#172033] flex items-center gap-2">
            <Percent className="w-4 h-4 text-emerald-600" />
            Revenue & Commission Model
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Platform Take Rate (Fee %)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="30"
                  step="0.5"
                  value={settings.platformFeePercent}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      platformFeePercent: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full bg-[#F7F9F8] border border-slate-200 rounded-xl p-2.5 pr-8 text-slate-900 font-bold focus:outline-none focus:border-emerald-500 focus:bg-white"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                  %
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Convenience fee automatically deducted on customer checkout before partner payout.
              </p>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Default Currency & Locale
              </label>
              <input
                type="text"
                disabled
                value="INR (₹) - Indian Rupee (en-IN)"
                className="w-full bg-slate-100 border border-slate-200 rounded-xl p-2.5 text-slate-600 font-medium cursor-not-allowed"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Currently configured for India multi-city sports facilities.
              </p>
            </div>
          </div>
        </div>

        {/* Booking & Cancellation Policies */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold font-display text-[#172033] flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-600" />
            Reservation & Cancellation Policies
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Cancellation Window
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="72"
                  value={settings.cancellationWindowHours}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      cancellationWindowHours: parseInt(e.target.value) || 1,
                    })
                  }
                  className="w-full bg-[#F7F9F8] border border-slate-200 rounded-xl p-2.5 text-slate-900 font-bold focus:outline-none focus:border-emerald-500 focus:bg-white"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">
                  hours
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Notice required prior to slot time for refund eligibility.
              </p>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Refund Percentage
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={settings.refundPercentage}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      refundPercentage: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full bg-[#F7F9F8] border border-slate-200 rounded-xl p-2.5 text-slate-900 font-bold focus:outline-none focus:border-emerald-500 focus:bg-white"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">
                  %
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Standard refund returned to user's original payment mode.
              </p>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Max Advance Booking Days
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={settings.maxAdvanceBookingDays}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      maxAdvanceBookingDays: parseInt(e.target.value) || 7,
                    })
                  }
                  className="w-full bg-[#F7F9F8] border border-slate-200 rounded-xl p-2.5 text-slate-900 font-bold focus:outline-none focus:border-emerald-500 focus:bg-white"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">
                  days
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                How far in advance players can schedule recurring court slots.
              </p>
            </div>
          </div>
        </div>

        {/* Supported Sports Directory */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold font-display text-[#172033] flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-600" />
              Active Sports Taxonomy
            </h3>
            <span className="text-xs font-semibold text-slate-500">
              {settings.activeSports.length} active
            </span>
          </div>

          <p className="text-xs text-slate-500">
            Select the sports available for facility registration, search discovery, and player match-making:
          </p>

          <div className="flex flex-wrap gap-2.5">
            {availableSports.map((sport) => {
              const isActive = settings.activeSports.includes(sport);
              return (
                <button
                  type="button"
                  key={sport}
                  onClick={() => handleToggleSport(sport)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                    isActive
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                      : 'bg-[#F7F9F8] border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {sport} {isActive ? '✓' : '+'}
                </button>
              );
            })}
          </div>
        </div>

        {/* Alerts & Maintenance */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold font-display text-[#172033] flex items-center gap-2">
            <Bell className="w-4 h-4 text-emerald-600" />
            System Notifications & Maintenance Mode
          </h3>

          <div className="space-y-3 divide-y divide-slate-100 text-xs">
            <div className="pt-2 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900">Email Alerts on Facility Submission</h4>
                <p className="text-[11px] text-slate-500">
                  Notify administration team immediately when an owner submits a new venue.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setSettings({
                    ...settings,
                    emailAlertsOnSubmission: !settings.emailAlertsOnSubmission,
                  })
                }
                className={`w-11 h-6 rounded-full transition-colors relative ${
                  settings.emailAlertsOnSubmission ? 'bg-emerald-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    settings.emailAlertsOnSubmission ? 'right-1' : 'left-1'
                  }`}
                />
              </button>
            </div>

            <div className="pt-3 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900">SMS / WhatsApp Urgent Incident Alerts</h4>
                <p className="text-[11px] text-slate-500">
                  Dispatch priority SMS for critical safety or fraudulent booking reports.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setSettings({
                    ...settings,
                    smsAlertsOnUrgentReport: !settings.smsAlertsOnUrgentReport,
                  })
                }
                className={`w-11 h-6 rounded-full transition-colors relative ${
                  settings.smsAlertsOnUrgentReport ? 'bg-emerald-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    settings.smsAlertsOnUrgentReport ? 'right-1' : 'left-1'
                  }`}
                />
              </button>
            </div>

            <div className="pt-3 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  Platform Maintenance Mode
                </h4>
                <p className="text-[11px] text-slate-500">
                  Temporarily lock player booking checkouts while database upgrades run.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setSettings({
                    ...settings,
                    maintenanceMode: !settings.maintenanceMode,
                  })
                }
                className={`w-11 h-6 rounded-full transition-colors relative ${
                  settings.maintenanceMode ? 'bg-amber-500' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    settings.maintenanceMode ? 'right-1' : 'left-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-center justify-between shadow-xs">
          <div>
            {isSaved && (
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4" /> Platform settings updated and synchronized!
              </span>
            )}
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Save System Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
