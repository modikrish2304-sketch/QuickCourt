import React from 'react';
import {
  LayoutDashboard,
  Building2,
  Layers,
  Clock,
  CalendarCheck,
  UserCheck,
  Settings,
  LogOut,
  ChevronRight,
  Sparkles,
  ExternalLink,
  X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export interface OwnerSidebarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const OwnerSidebar: React.FC<OwnerSidebarProps> = ({
  currentRoute,
  onNavigate,
  isOpen = false,
  onClose,
}) => {
  const { user, logout, switchDemoRole } = useAuth();

  const mainNav = [
    {
      label: 'Dashboard',
      route: '/owner/dashboard',
      icon: LayoutDashboard,
    },
    {
      label: 'Facility Management',
      route: '/owner/facility',
      icon: Building2,
    },
    {
      label: 'Court Management',
      route: '/owner/courts',
      icon: Layers,
    },
    {
      label: 'Time Slots',
      route: '/owner/timeslots',
      icon: Clock,
    },
    {
      label: 'Bookings',
      route: '/owner/bookings',
      icon: CalendarCheck,
    },
  ];

  const accountNav = [
    {
      label: 'Profile',
      route: '/owner/profile',
      icon: UserCheck,
    },
    {
      label: 'Settings',
      route: '/owner/settings',
      icon: Settings,
    },
  ];

  const handleNav = (route: string) => {
    onNavigate(route);
    if (onClose) onClose();
  };

  const content = (
    <aside className="w-64 h-full flex flex-col bg-white border-r border-slate-200 text-slate-700 select-none">
      {/* Brand & Venue Name Banner */}
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <div
          onClick={() => handleNav('/owner/dashboard')}
          className="flex items-center gap-2.5 cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-xs font-black tracking-tight text-base font-display">
            QC
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-slate-900 font-display">
                QuickCourt
              </span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase">
                Owner
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium truncate max-w-[130px]">
              {user?.businessName || 'Smash Arena Hub'}
            </p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {/* Main Section */}
        <div>
          <span className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Main
          </span>
          <nav className="space-y-1">
            {mainNav.map((item) => {
              const Icon = item.icon;
              const isActive =
                currentRoute === item.route ||
                (item.route !== '/owner/dashboard' &&
                  currentRoute.startsWith(item.route));

              return (
                <button
                  key={item.route}
                  onClick={() => handleNav(item.route)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 font-bold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? 'text-emerald-600' : 'text-slate-400'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {isActive && (
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Account Section */}
        <div>
          <span className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Account
          </span>
          <nav className="space-y-1">
            {accountNav.map((item) => {
              const Icon = item.icon;
              const isActive = currentRoute === item.route;

              return (
                <button
                  key={item.route}
                  onClick={() => handleNav(item.route)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 font-bold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? 'text-emerald-600' : 'text-slate-400'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {isActive && (
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Switch to Player / Public App CTA */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/60 space-y-2">
        <button
          onClick={() => {
            switchDemoRole('player');
            handleNav('/');
          }}
          className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 hover:border-emerald-300 text-slate-700 hover:text-emerald-700 text-xs font-semibold flex items-center justify-between shadow-2xs transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
            <span>Switch to Player Mode</span>
          </span>
          <ChevronRight className="w-3 h-3 text-slate-400" />
        </button>

        <button
          onClick={() => {
            logout();
            handleNav('/login');
          }}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop static sidebar */}
      <div className="hidden md:block shrink-0 h-screen sticky top-0">
        {content}
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={onClose}
          />
          <div className="relative z-10 animate-in slide-in-from-left duration-200">
            {content}
          </div>
        </div>
      )}
    </>
  );
};
