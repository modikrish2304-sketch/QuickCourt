import React, { useState, useRef } from 'react';
import {
  User,
  Mail,
  Phone,
  Building2,
  ShieldCheck,
  Camera,
  CheckCircle2,
  Lock,
  Upload,
  X,
  Sparkles,
  Image as ImageIcon,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { OwnerLayout } from '../../components/owner/OwnerLayout';
import { facilityService } from '../../services/facilityService';

const PRESET_OWNER_AVATARS = [
  {
    label: 'Executive Manager',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=250&auto=format&fit=crop&q=80',
  },
  {
    label: 'Operations Lead',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=250&auto=format&fit=crop&q=80',
  },
  {
    label: 'Head Coach',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=250&auto=format&fit=crop&q=80',
  },
  {
    label: 'Facility Director',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=250&auto=format&fit=crop&q=80',
  },
  {
    label: 'Club Founder',
    url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=250&auto=format&fit=crop&q=80',
  },
  {
    label: 'Sports Coordinator',
    url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=250&auto=format&fit=crop&q=80',
  },
];

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
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        if (onShowToast) onShowToast('warning', 'File Too Large', 'Please select an image smaller than 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatar(event.target.result as string);
          setIsPhotoModalOpen(false);
          if (onShowToast) onShowToast('success', 'Photo Updated', 'Profile photo updated from device.');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        if (onShowToast) onShowToast('error', 'Invalid File', 'Please drop a valid image file.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        if (onShowToast) onShowToast('warning', 'File Too Large', 'Please select an image smaller than 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatar(event.target.result as string);
          setIsPhotoModalOpen(false);
          if (onShowToast) onShowToast('success', 'Photo Updated', 'Profile photo updated successfully.');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrlInput.trim()) return;
    setAvatar(customUrlInput.trim());
    setCustomUrlInput('');
    setIsPhotoModalOpen(false);
    if (onShowToast) onShowToast('success', 'Avatar Updated', 'Profile photo updated from web address.');
  };

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
                className="w-20 h-20 rounded-2xl object-cover ring-4 ring-emerald-50 border border-slate-200 shadow-xs"
              />
              <button
                type="button"
                onClick={() => setIsPhotoModalOpen(true)}
                className="absolute -bottom-1.5 -right-1.5 w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white shadow-md hover:shadow-lg flex items-center justify-center ring-2 ring-white hover:scale-110 active:scale-95 transition-all duration-150 cursor-pointer group"
                title="Change Profile Photo"
                aria-label="Change Profile Photo"
              >
                <Camera className="w-4 h-4 group-hover:rotate-6 transition-transform" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileSelect}
              />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-slate-900 block font-display">
                  {name}
                </span>
                <button
                  type="button"
                  onClick={() => setIsPhotoModalOpen(true)}
                  className="text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 hover:underline"
                >
                  Change photo
                </button>
              </div>
              <span className="text-xs text-slate-400 block font-medium mt-0.5">
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

      {/* Avatar Selection & Upload Modal */}
      {isPhotoModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsPhotoModalOpen(false);
          }}
        >
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Camera className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-display">
                    Update Profile Photo
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Upload an image or select a verified avatar
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsPhotoModalOpen(false)}
                className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Current Preview */}
              <div className="flex items-center gap-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <img
                  src={avatar}
                  alt="Current Avatar"
                  className="w-14 h-14 rounded-xl object-cover ring-2 ring-emerald-500/30 border border-white shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Current Picture
                  </span>
                  <p className="text-xs font-semibold text-slate-800 truncate">
                    {name}
                  </p>
                  <p className="text-[11px] text-emerald-600 font-medium mt-0.5">
                    Visible to players & staff across QuickCourt
                  </p>
                </div>
              </div>

              {/* 1. Upload from Computer */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  1. Upload From Device
                </label>
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
                    dragOver
                      ? 'border-emerald-500 bg-emerald-50/50 scale-[0.99]'
                      : 'border-slate-200 hover:border-emerald-400 hover:bg-slate-50/80'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2.5">
                    <Upload className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-bold text-slate-800">
                    Click to browse or drop an image file
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Supports PNG, JPG, WEBP, SVG (Max 5MB)
                  </p>
                </div>
              </div>

              {/* 2. Choose Preset Avatar */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                    2. Or Choose Curated Avatar
                  </label>
                  <span className="text-[10px] text-slate-400">1-click select</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {PRESET_OWNER_AVATARS.map((item, idx) => {
                    const isSelected = avatar === item.url;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setAvatar(item.url);
                          setIsPhotoModalOpen(false);
                          if (onShowToast) {
                            onShowToast('success', 'Avatar Updated', `Selected ${item.label} avatar.`);
                          }
                        }}
                        className={`group relative flex flex-col items-center p-2 rounded-xl border text-center transition-all ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-500/20'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden mb-1.5">
                          <img
                            src={item.url}
                            alt={item.label}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          {isSelected && (
                            <div className="absolute inset-0 bg-emerald-600/30 flex items-center justify-center">
                              <CheckCircle2 className="w-4 h-4 text-white drop-shadow-xs" />
                            </div>
                          )}
                        </div>
                        <span className="text-[10px] font-semibold text-slate-700 leading-tight">
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Paste Web Image URL */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  3. Or Paste Image URL
                </label>
                <form onSubmit={handleApplyCustomUrl} className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={customUrlInput}
                    onChange={(e) => setCustomUrlInput(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors shrink-0"
                  >
                    Apply
                  </button>
                </form>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setIsPhotoModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-200/60 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </OwnerLayout>
  );
};
