import React, { useState } from 'react';
import {
  Search,
  Bell,
  Menu,
  CheckCheck,
  ChevronDown,
  User,
  Shield,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ownerService, OwnerNotification } from '../../services/ownerService';

export interface OwnerHeaderProps {
  onToggleSidebar?: () => void;
  onNavigate: (route: string) => void;
  pageTitle?: string;
}

export const OwnerHeader: React.FC<OwnerHeaderProps> = ({
  onToggleSidebar,
  onNavigate,
  pageTitle,
}) => {
  const { user, switchDemoRole } = useAuth();
  const [notifications, setNotifications] = useState<OwnerNotification[]>(() =>
    ownerService.getNotifications()
  );
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    const updated = ownerService.markAllNotificationsRead();
    setNotifications(updated);
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left side: Hamburger + Page Title */}
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
            aria-label="Toggle Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div className="hidden sm:block">
          <h2 className="text-sm font-bold text-slate-900 font-display">
            {pageTitle || 'Facility Management Command Center'}
          </h2>
          <span className="text-[11px] text-slate-400">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </span>
        </div>
      </div>

      {/* Center Search Bar */}
      <div className="flex-1 max-w-md hidden lg:block">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search courts, booking IDs, player names..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Right controls: Demo Switcher + Notifications + User Avatar */}
      <div className="flex items-center gap-3">
        {/* Role Switcher Pill for Reviewers / Evaluators */}
        <div className="relative">
          <button
            onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/70 border border-slate-200/80 text-xs font-semibold text-slate-700 transition-colors"
          >
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Role:</span>
            <span className="text-emerald-700 font-bold">Facility Owner</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {isRoleDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <span className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Quick Demo Role Switch
              </span>
              <button
                onClick={() => {
                  switchDemoRole('player');
                  setIsRoleDropdownOpen(false);
                  onNavigate('/');
                }}
                className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl flex items-center justify-between"
              >
                <span>Player Mode (Explore & Book)</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button
                onClick={() => {
                  switchDemoRole('facility_owner');
                  setIsRoleDropdownOpen(false);
                  onNavigate('/owner/dashboard');
                }}
                className="w-full text-left px-3 py-2 text-xs font-bold text-emerald-700 bg-emerald-50 rounded-xl flex items-center justify-between"
              >
                <span>Facility Owner (Active)</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              </button>
            </div>
          )}
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-emerald-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center border-2 border-white">
                {unreadCount}
              </span>
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Facility Alerts
                  </h4>
                  {unreadCount > 0 && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    <span>Mark all read</span>
                  </button>
                )}
              </div>

              <div className="mt-3 space-y-2 max-h-72 overflow-y-auto divide-y divide-slate-50">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-2.5 rounded-xl transition-colors ${
                      n.read ? 'bg-white' : 'bg-emerald-50/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold text-slate-900 block">
                        {n.title}
                      </span>
                      <span className="text-[10px] text-slate-400 shrink-0">
                        {n.time}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {n.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Owner Profile Avatar */}
        <div
          onClick={() => onNavigate('/owner/profile')}
          className="flex items-center gap-2.5 pl-2 border-l border-slate-200 cursor-pointer group"
        >
          <img
            src={
              user?.avatar ||
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
            }
            alt="Owner Avatar"
            className="w-8 h-8 rounded-xl object-cover ring-2 ring-emerald-600/30 group-hover:ring-emerald-600 transition-all"
          />
          <div className="hidden xl:block text-left">
            <span className="text-xs font-bold text-slate-900 block group-hover:text-emerald-600 transition-colors">
              {user?.name || user?.fullName || 'Arjun Mehta'}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">
              Venue Partner
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
