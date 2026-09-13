import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Bell,
  ChevronDown,
  Shield,
  User,
  Settings,
  LogOut,
  Repeat,
  ExternalLink,
  Menu,
  CheckCircle2,
  AlertCircle,
  Building2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { adminService } from '../../services/adminService';
import { AdminGlobalSearchModal } from './AdminGlobalSearchModal';

interface AdminHeaderProps {
  onToggleSidebar?: () => void;
  onNavigate: (path: string) => void;
  currentPath: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  onToggleSidebar,
  onNavigate,
}) => {
  const { user, switchDemoRole, logout } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(() => adminService.getNotifications());

  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut Cmd+K or Ctrl+K to open global search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    notifications.forEach((n) => adminService.markNotificationRead(n.id));
    setNotifications(adminService.getNotifications());
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-[#E5E7EB] flex items-center justify-between px-4 sm:px-6">
      {/* Left section: mobile hamburger & Global Search */}
      <div className="flex items-center gap-3 w-full max-w-md">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search trigger */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="w-full max-w-sm flex items-center justify-between px-3.5 py-2 text-xs text-slate-500 bg-[#F7F9F8] border border-[#E5E7EB] rounded-xl hover:border-slate-300 hover:bg-white transition-all shadow-2xs group"
        >
          <div className="flex items-center gap-2.5 truncate">
            <Search className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
            <span className="truncate">Search users, facilities, bookings...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white border border-slate-200 rounded-md">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right section: Role switcher, Notifications, Admin Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Role Switcher Pill for Demo Review */}
        <div className="hidden md:flex items-center bg-[#F7F9F8] border border-[#E5E7EB] rounded-xl p-1 text-[11px] font-semibold text-slate-600">
          <span className="px-2 text-slate-400 flex items-center gap-1">
            <Repeat className="w-3 h-3" /> Demo:
          </span>
          <button
            onClick={() => {
              switchDemoRole('player');
              onNavigate('/');
            }}
            className="px-2.5 py-1 rounded-lg hover:text-slate-900 hover:bg-white transition-all"
            title="Switch to Player View"
          >
            Player
          </button>
          <button
            onClick={() => {
              switchDemoRole('facility_owner');
              onNavigate('/owner/dashboard');
            }}
            className="px-2.5 py-1 rounded-lg hover:text-slate-900 hover:bg-white transition-all"
            title="Switch to Facility Owner View"
          >
            Owner
          </button>
          <button
            className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold shadow-xs"
            title="Currently in Admin View"
          >
            Admin
          </button>
        </div>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-600 rounded-full ring-2 ring-white" />
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-[#E5E7EB] rounded-2xl shadow-xl overflow-hidden z-50 animate-in zoom-in-95 duration-150">
              <div className="p-3.5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#172033]">Notifications</h4>
                  <p className="text-[11px] text-slate-500">{unreadCount} unread platform alerts</p>
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="text-[11px] font-semibold text-emerald-600 hover:text-emerald-700"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-500">
                    No new notifications.
                  </div>
                ) : (
                  notifications.slice(0, 6).map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        adminService.markNotificationRead(n.id);
                        setNotifications(adminService.getNotifications());
                        if (n.link) onNavigate(n.link);
                        setIsNotifOpen(false);
                      }}
                      className={`p-3.5 hover:bg-[#F7F9F8] transition-colors cursor-pointer text-left ${
                        !n.read ? 'bg-emerald-50/40' : ''
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="p-1.5 bg-emerald-100 text-emerald-700 rounded-lg mt-0.5 shrink-0">
                          {n.type.includes('facility') ? (
                            <Building2 className="w-3.5 h-3.5" />
                          ) : (
                            <AlertCircle className="w-3.5 h-3.5" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-slate-900 leading-snug">{n.title}</p>
                          <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-2">{n.message}</p>
                          <span className="text-[10px] text-slate-400 mt-1 block">
                            {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Admin Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border border-emerald-300 ring-2 ring-emerald-100">
              <img
                src={
                  user?.avatar ||
                  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
                }
                alt={user?.name || 'Admin'}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-bold text-[#172033] leading-none">
                {user?.name || 'Priya Verma'}
              </div>
              <div className="text-[10px] font-semibold text-emerald-600 mt-0.5">
                Admin Control
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-[#E5E7EB] rounded-2xl shadow-xl py-1.5 z-50 animate-in zoom-in-95 duration-150">
              <div className="px-4 py-2.5 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900">{user?.name || 'Priya Verma'}</p>
                <p className="text-[11px] text-slate-500 truncate">{user?.email || 'admin@quickcourt.com'}</p>
                <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                  <Shield className="w-3 h-3" /> Platform Administrator
                </div>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    onNavigate('/admin/profile');
                  }}
                  className="w-full px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 font-medium"
                >
                  <User className="w-4 h-4 text-slate-400" /> Admin Profile
                </button>
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    onNavigate('/admin/settings');
                  }}
                  className="w-full px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 font-medium"
                >
                  <Settings className="w-4 h-4 text-slate-400" /> System Settings
                </button>
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    onNavigate('/');
                  }}
                  className="w-full px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 font-medium"
                >
                  <ExternalLink className="w-4 h-4 text-slate-400" /> View Player App
                </button>
              </div>

              <div className="border-t border-slate-100 pt-1">
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    logout();
                    onNavigate('/login');
                  }}
                  className="w-full px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 font-semibold"
                >
                  <LogOut className="w-4 h-4 text-rose-500" /> Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Global Search Modal */}
      <AdminGlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={onNavigate}
      />
    </header>
  );
};
