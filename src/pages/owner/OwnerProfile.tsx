import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  Building2,
  ShieldCheck,
  Camera,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { OwnerLayout } from '../../components/owner/OwnerLayout';
import { facilityService } from '../../services/facilityService';

export interface OwnerProfileProps {
  onNavigate: (route: string) => void;
  onShowToast?: (type: 'success' | 'warning' | 'error' | 'info', title: string, msg?: string) => void;
}

export const OwnerProfile: React.FC<OwnerProfileProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const { user, updateUser } = useAuth();
  const facility = facilityService.getOwnerFacility(user?.id || 'usr_owner_1');

  const [name, setName] = useState(user?.name || user?.fullName || 'Arjun Mehta');
  const [email, setEmail] = useState(user?.email || 'owner@quickcourt.in');
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210');
  const [businessName, setBusinessName] = useState(
    user?.businessName || facility.name || 'Smash Arena Sports Club'
  );
  const [avatar, setAvatar] = useState(
    user?.avatar ||
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80'
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (updateUser) {
        updateUser({
          name,
          fullName: name,
          email,
          phone,
          businessName,
          avatar,
        });
      }
      if (onShowToast) {
        onShowToast('success', 'Profile Updated', 'Your profile details have been saved.');
      }
    } catch (err: any) {
      if (onShowToast) {
        onShowToast('error', 'Update Failed', 'Could not update profile.');
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <OwnerLayout
      currentRoute="/owner/profile"
      onNavigate={onNavigate}
      pageTitle="Partner Profile & Credentials"
    >
      <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-200">
        {/* Top Header */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold font-display text-slate-900">
                  Facility Owner Profile
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Verified Partner
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Manage your administrative credentials, contact details, and registered sports entity.
              </p>
            </div>
          </div>
        </div>

        {/* Profile Card & Form */}
        <form
          onSubmit={handleSave}
          className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-6"
        >
          {/* Avatar Section */}
          <div className="flex items-center gap-5 pb-6 border-b border-slate-100">
            <div className="relative">
              <img
                src={avatar}
                alt="Owner Avatar"
                className="w-20 h-20 rounded-2xl object-cover ring-4 ring-emerald-50 border border-slate-200"
              />
              <button
                type="button"
                onClick={() => {
                  const newUrl = prompt('Enter image URL for avatar:', avatar);
                  if (newUrl) setAvatar(newUrl);
                }}
                className="absolute -bottom-1 -right-1 p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                title="Change Avatar"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            <div>
              <span className="text-sm font-bold text-slate-900 block font-display">
                {name}
              </span>
              <span className="text-xs text-slate-400 block font-medium">
                {businessName}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 mt-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Facility Owner Account</span>
              </span>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Registered Sports Business / Facility
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Official Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Contact Phone
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">
                Platform Role
              </label>
              <input
                type="text"
                disabled
                value="Facility Owner (Full Access)"
                className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
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
              <span>{isSaving ? 'Saving...' : 'Save Profile Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </OwnerLayout>
  );
};
