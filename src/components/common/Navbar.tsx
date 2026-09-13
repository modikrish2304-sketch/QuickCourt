import React, { useState } from 'react';
import {
  Trophy,
  Calendar,
  Users,
  Bell,
  MapPin,
  Zap,
  Shield,
  Building2,
  User as UserIcon,
  LogOut,
  ChevronDown,
  Menu,
  X,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { UserRole } from '../../types';

interface NavbarProps {
  currentRoute: string;
  navigate: (route: string) => void;
  onOpenPlayNow: () => void;
  onOpenLocation: () => void;
  selectedCity: string;
  selectedRadius: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  navigate,
  onOpenPlayNow,
  onOpenLocation,
  selectedCity,
  selectedRadius,
}) => {
  const { user, role, switchDemoRole, logout } = useAuth();
  const { notifications, unreadCount, markAsRead } = useNotifications();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleRoleSwitch = (newRole: UserRole) => {
    switchDemoRole(newRole);
    setIsRoleMenuOpen(false);
    if (newRole === 'facility_owner') {
      navigate('/owner/dashboard');
    } else if (newRole === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/venues');
    }
  };

  const getRoleBadge = () => {
    if (role === 'admin') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
          <Shield className="w-3 h-3 text-rose-400" />
          Admin
        </span>
      );
    }
    if (role === 'facility_owner') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
          <Building2 className="w-3 h-3 text-amber-400" />
          Owner
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
        <Trophy className="w-3 h-3 text-emerald-400" />
        Player
      </span>
    );
  };

  return (
    <nav className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-3 text-left group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <Trophy className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold tracking-tight text-white font-display">
                    QUICK<span className="text-emerald-400">COURT</span>
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 tracking-wider uppercase font-medium hidden sm:block">
                  Find Your Court. Find Your Game.
                </p>
              </div>
            </button>

            {/* Location Pill */}
            <button
              onClick={onOpenLocation}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-xs font-medium text-slate-300 border border-slate-700/60 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>{selectedCity}</span>
              <span className="text-slate-500">•</span>
              <span className="text-emerald-400">{selectedRadius} km</span>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => navigate('/venues')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                currentRoute === '/venues'
                  ? 'bg-emerald-500/10 text-emerald-400'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Building2 className="w-4 h-4" />
              Courts & Venues
            </button>

            <button
              onClick={() => navigate('/matches')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                currentRoute === '/matches'
                  ? 'bg-emerald-500/10 text-emerald-400'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Users className="w-4 h-4" />
              Matches & Community
            </button>

            {/* Role specific links */}
            {role === 'player' && (
              <>
                <button
                  onClick={() => navigate('/my-bookings')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                    currentRoute === '/my-bookings'
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  My Bookings
                </button>
                <button
                  onClick={() => navigate('/profile')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                    currentRoute === '/profile'
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <UserIcon className="w-4 h-4" />
                  Profile & Stats
                </button>
              </>
            )}

            {role === 'facility_owner' && (
              <>
                <button
                  onClick={() => navigate('/owner/dashboard')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                    currentRoute === '/owner/dashboard'
                      ? 'bg-amber-500/10 text-amber-400'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  Owner Hub
                </button>
                <button
                  onClick={() => navigate('/owner/bookings')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                    currentRoute === '/owner/bookings'
                      ? 'bg-amber-500/10 text-amber-400'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  Facility Bookings
                </button>
              </>
            )}

            {role === 'admin' && (
              <>
                <button
                  onClick={() => navigate('/admin/dashboard')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                    currentRoute === '/admin/dashboard'
                      ? 'bg-rose-500/10 text-rose-400'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Shield className="w-4 h-4" />
                  Admin Console
                </button>
                <button
                  onClick={() => navigate('/admin/facilities')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                    currentRoute === '/admin/facilities'
                      ? 'bg-rose-500/10 text-rose-400'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  Approvals Queue
                </button>
              </>
            )}
          </div>

          {/* Right Action Items */}
          <div className="flex items-center gap-3">
            {/* Play Now Fast Action */}
            <button
              onClick={onOpenPlayNow}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-wide uppercase bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 shadow-md shadow-emerald-500/20 active:scale-95 transition-all"
            >
              <Zap className="w-3.5 h-3.5 fill-slate-950" />
              <span>PLAY NOW</span>
            </button>

            {/* DEMO ROLE SWITCHER (Judge friendly) */}
            <div className="relative">
              <button
                onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
                title="Quickly switch role to test all 3 personas"
              >
                {getRoleBadge()}
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {isRoleMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-2 border-b border-slate-800 mb-1">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Switch Role (Judge Demo)
                    </p>
                    <p className="text-xs text-slate-500">Test all three platform views instantly</p>
                  </div>

                  <button
                    onClick={() => handleRoleSwitch('player')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors ${
                      role === 'player' ? 'bg-emerald-500/10 text-emerald-400' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-emerald-400" />
                      <div>
                        <div className="font-semibold text-slate-100">Player</div>
                        <div className="text-[10px] text-slate-400">Krish Patel (Bookings, Matches)</div>
                      </div>
                    </div>
                    {role === 'player' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </button>

                  <button
                    onClick={() => handleRoleSwitch('facility_owner')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors ${
                      role === 'facility_owner' ? 'bg-amber-500/10 text-amber-400' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-amber-400" />
                      <div>
                        <div className="font-semibold text-slate-100">Facility Owner</div>
                        <div className="text-[10px] text-slate-400">Rajesh Sharma (Courts, Earnings)</div>
                      </div>
                    </div>
                    {role === 'facility_owner' && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                  </button>

                  <button
                    onClick={() => handleRoleSwitch('admin')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors ${
                      role === 'admin' ? 'bg-rose-500/10 text-rose-400' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-rose-400" />
                      <div>
                        <div className="font-semibold text-slate-100">Platform Admin</div>
                        <div className="text-[10px] text-slate-400">Priya Verma (Approvals, Users)</div>
                      </div>
                    </div>
                    {role === 'admin' && <CheckCircle2 className="w-4 h-4 text-rose-400" />}
                  </button>
                </div>
              )}
            </div>

            {/* Notifications Popover */}
            <div className="relative">
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-emerald-500 text-[10px] font-bold text-slate-950 flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl p-3 z-50">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Notifications ({unreadCount} new)
                    </span>
                  </div>

                  <div className="max-h-72 overflow-y-auto space-y-2">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-slate-500 py-4 text-center">No notifications yet</p>
                    ) : (
                      notifications.slice(0, 6).map((n) => (
                        <div
                          key={n.id}
                          onClick={() => {
                            markAsRead(n.id);
                            if (n.link) navigate(n.link);
                            setIsNotifOpen(false);
                          }}
                          className={`p-2.5 rounded-lg text-xs cursor-pointer transition-colors ${
                            n.read ? 'bg-slate-800/40 text-slate-400' : 'bg-slate-800 text-slate-200 border-l-2 border-emerald-400'
                          }`}
                        >
                          <div className="font-semibold text-slate-100 flex items-center justify-between">
                            <span>{n.title}</span>
                            <span className="text-[10px] text-slate-500 font-normal">
                              {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <p className="mt-1 text-slate-400 leading-relaxed">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Avatar / Logout */}
            <div className="relative">
              {user ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 focus:outline-none"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full border border-slate-700 object-cover"
                    />
                    <span className="text-xs font-medium text-slate-300 hidden md:block">{user.name}</span>
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-10 w-52 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl p-2 z-50">
                      <div className="px-3 py-2 border-b border-slate-800 mb-1">
                        <p className="text-xs font-semibold text-slate-200">{user.name}</p>
                        <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                      </div>

                      {role === 'player' && (
                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            navigate('/profile');
                          }}
                          className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-300 hover:bg-slate-800 flex items-center gap-2"
                        >
                          <UserIcon className="w-3.5 h-3.5" />
                          Profile & Activity
                        </button>
                      )}

                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          logout();
                          navigate('/');
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg text-xs text-rose-400 hover:bg-rose-500/10 flex items-center gap-2"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate('/auth/login')}
                    className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => navigate('/auth/signup')}
                    className="text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-3.5 py-1.5 rounded-lg transition-colors"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-900 px-4 pt-3 pb-5 space-y-2">
          <button
            onClick={() => {
              navigate('/venues');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-slate-800 flex items-center gap-2"
          >
            <Building2 className="w-4 h-4 text-emerald-400" />
            Courts & Venues
          </button>
          <button
            onClick={() => {
              navigate('/matches');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-slate-800 flex items-center gap-2"
          >
            <Users className="w-4 h-4 text-emerald-400" />
            Matches & Community
          </button>
          {role === 'player' && (
            <>
              <button
                onClick={() => {
                  navigate('/my-bookings');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-slate-800 flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-emerald-400" />
                My Bookings
              </button>
              <button
                onClick={() => {
                  navigate('/profile');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-slate-800 flex items-center gap-2"
              >
                <UserIcon className="w-4 h-4 text-emerald-400" />
                Profile & Stats
              </button>
            </>
          )}
          {role === 'facility_owner' && (
            <button
              onClick={() => {
                navigate('/owner/dashboard');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm text-amber-400 hover:bg-slate-800 flex items-center gap-2"
            >
              <Building2 className="w-4 h-4" />
              Owner Dashboard
            </button>
          )}
          {role === 'admin' && (
            <button
              onClick={() => {
                navigate('/admin/dashboard');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm text-rose-400 hover:bg-slate-800 flex items-center gap-2"
            >
              <Shield className="w-4 h-4" />
              Admin Center
            </button>
          )}
        </div>
      )}
    </nav>
  );
};
