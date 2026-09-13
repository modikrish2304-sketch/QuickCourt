import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/userService';
import { bookingService } from '../services/bookingService';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import {
  User as UserIcon,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  CalendarCheck,
  Trophy,
  Activity,
  CheckCircle2,
  Camera,
} from 'lucide-react';

export interface ProfilePageProps {
  onNavigate: (route: string) => void;
  onShowToast?: (type: 'success' | 'error' | 'info', title: string, msg?: string) => void;
}

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
];

export const ProfilePage: React.FC<ProfilePageProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const { user, isAuthenticated, updateUser } = useAuth();

  const [fullName, setFullName] = useState(user?.fullName || user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210');
  const [city, setCity] = useState(user?.city || 'Ahmedabad');
  const [avatar, setAvatar] = useState(user?.avatar || PRESET_AVATARS[1]);
  const [isSaving, setIsSaving] = useState(false);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-white">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Access Denied</h2>
        <p className="text-xs text-slate-500 mb-4">Please log in to view and edit your player profile.</p>
        <Button variant="primary" size="sm" onClick={() => onNavigate('/login?redirect=/profile')}>
          Sign In
        </Button>
      </div>
    );
  }

  // Calculate some stats from user's bookings
  const userBookings = bookingService.getBookings(user.id);
  const activeBookings = userBookings.filter((b) => b.status === 'confirmed').length;
  const completedMatches = userBookings.filter((b) => b.status === 'completed').length || 8;

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      const updated = await userService.updateUserProfile(user.id, {
        fullName,
        name: fullName,
        email,
        phone,
        city,
        avatar,
      });

      // Update state in AuthContext
      updateUser(updated);

      if (onShowToast) {
        onShowToast('success', 'Profile Updated', 'Your profile details have been successfully saved.');
      }
    } catch (err: any) {
      if (onShowToast) {
        onShowToast('error', 'Update Failed', err.message || 'Could not update profile.');
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-8 sm:py-12 text-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Player Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your personal details, playing location, and sports preferences.
          </p>
        </div>

        {/* Top Summary & Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Active Bookings
              </span>
              <span className="text-xl font-black text-slate-900 font-display">
                {activeBookings} Upcoming
              </span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Matches Played
              </span>
              <span className="text-xl font-black text-slate-900 font-display">
                {completedMatches} Matches
              </span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Player Status
              </span>
              <span className="text-xl font-black text-emerald-700 font-display">
                Verified Pro
              </span>
            </div>
          </div>
        </div>

        {/* Profile Form Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <form onSubmit={handleSaveProfile} className="space-y-6">
            {/* Avatar Section */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-3">
                Player Avatar
              </label>
              <div className="flex items-center gap-4">
                <img
                  src={avatar}
                  alt={fullName}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-500/20 shadow-sm"
                />
                <div>
                  <p className="text-xs font-semibold text-slate-700 mb-1.5">Choose Avatar</p>
                  <div className="flex gap-2">
                    {PRESET_AVATARS.map((av, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setAvatar(av)}
                        className={`w-9 h-9 rounded-xl overflow-hidden border-2 transition-all ${
                          avatar === av
                            ? 'border-emerald-600 ring-2 ring-emerald-500/20 scale-105'
                            : 'border-slate-200 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={av} alt={`Avatar option ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <Input
                label="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                leftIcon={<UserIcon className="w-4 h-4" />}
                required
              />

              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="w-4 h-4" />}
                required
              />

              <Input
                label="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                leftIcon={<Phone className="w-4 h-4" />}
                required
              />

              <Input
                label="Primary City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                leftIcon={<MapPin className="w-4 h-4" />}
                required
              />
            </div>

            {/* Submit Action */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Account verified via OTP authentication</span>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isSaving}
                rightIcon={<CheckCircle2 className="w-4 h-4" />}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
