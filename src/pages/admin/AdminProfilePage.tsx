import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  Shield,
  Key,
  Lock,
  CheckCircle2,
  Clock,
  Save,
  MapPin,
  Laptop,
  Smartphone,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { adminService } from '../../services/adminService';

export const AdminProfilePage: React.FC = () => {
  const { user } = useAuth();

  const [name, setName] = useState(user?.name || 'Priya Verma');
  const [email, setEmail] = useState(user?.email || 'admin@quickcourt.com');
  const [phone, setPhone] = useState(user?.phone || '+91 98450 12345');
  const [officeLocation, setOfficeLocation] = useState('Bengaluru HQ - Indiranagar Tech Park');
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  // Security password fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordFeedback, setPasswordFeedback] = useState('');

  const auditLogs = adminService.getAuditLogs().slice(0, 5);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 8) {
      setPasswordFeedback('New password must be at least 8 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordFeedback('Passwords do not match.');
      return;
    }
    setPasswordFeedback('Password updated successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPasswordFeedback(''), 4000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black font-display tracking-tight text-[#172033]">
          Administrator Profile & Credentials
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage your platform root credentials, dual-factor authentication, and security audit logs.
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-emerald-500 ring-4 ring-emerald-50 shadow-sm shrink-0">
            <img
              src={
                user?.avatar ||
                'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80'
              }
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-lg font-bold font-display text-slate-900">{name}</h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                SUPER ADMIN
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">QuickCourt Platform Operations</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-600 mt-3 font-medium">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                {email}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                Bengaluru, India
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Details Form */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold font-display text-[#172033] flex items-center gap-2">
            <User className="w-4 h-4 text-emerald-600" />
            General Information
          </h3>

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Full Legal Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#F7F9F8] border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Official Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#F7F9F8] border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Emergency Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#F7F9F8] border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Office Location</label>
              <input
                type="text"
                value={officeLocation}
                onChange={(e) => setOfficeLocation(e.target.value)}
                className="w-full bg-[#F7F9F8] border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              {isSaved && (
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 animate-in fade-in">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Changes saved!
                </span>
              )}
              <button
                type="submit"
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all shadow-xs flex items-center gap-1.5 ml-auto"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Profile</span>
              </button>
            </div>
          </form>
        </div>

        {/* Security & Password Form */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold font-display text-[#172033] flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-600" />
            Security & Authentication
          </h3>

          <form onSubmit={handleUpdatePassword} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#F7F9F8] border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">New Master Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 8 chars..."
                className="w-full bg-[#F7F9F8] border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password..."
                className="w-full bg-[#F7F9F8] border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
              />
            </div>

            {passwordFeedback && (
              <p
                className={`text-xs font-bold ${
                  passwordFeedback.includes('successfully') ? 'text-emerald-700' : 'text-rose-600'
                }`}
              >
                {passwordFeedback}
              </p>
            )}

            <div className="pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold transition-all shadow-xs flex items-center gap-1.5"
              >
                <Key className="w-3.5 h-3.5" />
                <span>Update Password</span>
              </button>
            </div>
          </form>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-slate-900">Two-Factor Authentication</h4>
              <p className="text-[11px] text-slate-500">Require OTP code for administrative access</p>
            </div>
            <button
              onClick={() => setIs2FAEnabled(!is2FAEnabled)}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                is2FAEnabled ? 'bg-emerald-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                  is2FAEnabled ? 'right-1' : 'left-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Audit Log Section */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold font-display text-[#172033] flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600" />
              Recent Admin Action Audit Trail
            </h3>
            <p className="text-xs text-slate-500">
              Immutable activity records for compliance and platform security
            </p>
          </div>
          <span className="text-[10px] font-mono text-slate-400">Audited by Platform Engine</span>
        </div>

        <div className="space-y-3">
          {auditLogs.map((log) => (
            <div
              key={log.id}
              className="p-3 bg-[#F7F9F8] rounded-xl border border-slate-200/80 flex items-start justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{log.action}</span>
                  <span className="px-1.5 py-0.2 bg-slate-200 text-slate-700 rounded-md text-[10px] font-mono">
                    {"facility"}: {log.target}
                  </span>
                </div>
                <p className="text-slate-600 text-[11px]">{"Updated setting"}</p>
              </div>

              <span className="text-[10px] text-slate-400 whitespace-nowrap">
                {new Date(log.timestamp).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
