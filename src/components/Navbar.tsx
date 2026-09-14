import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Logo } from './Logo';
import { Button } from './Button';
import {
  Menu,
  X,
  User as UserIcon,
  CalendarCheck,
  LogOut,
  ChevronDown,
  Sparkles,
  Building2,
  Shield,
} from 'lucide-react';

export interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onOpenLoginModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: 'Home', route: '/' },
    { label: 'Find Venues', route: '/venues' },
    ...(isAuthenticated ? [{ label: 'My Bookings', route: '/my-bookings' }] : []),
  ];

  const handleLinkClick = (route: string) => {
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    onNavigate('/');
  };

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLandingPage = currentRoute === '/';
  const isTransparent = isLandingPage && !isScrolled;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isTransparent 
        ? 'bg-white/10 backdrop-blur-[20px] border-b border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.05)]' 
        : 'bg-white/85 backdrop-blur-xl border-b border-slate-200 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[68px] flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div
          onClick={() => handleLinkClick('/')}
          className="cursor-pointer flex items-center shrink-0"
        >
          <Logo showTagline={false} size="md" variant={isTransparent ? 'dark' : 'light'} />
        </div>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden md:flex items-center justify-center gap-1.5 flex-1 max-w-xl mx-auto">
          {navLinks.map((link) => {
            const isActive =
              link.route === '/'
                ? currentRoute === '/'
                : currentRoute.startsWith(link.route);

            return (
              <button
                key={link.route}
                onClick={() => handleLinkClick(link.route)}
                className={`px-4 py-1.5 rounded-full text-[14px] font-semibold transition-all duration-200 ${
                  isActive
                    ? 'text-white bg-[#16A34A] shadow-xs'
                    : isTransparent
                      ? 'text-white/85 hover:text-white hover:bg-white/10'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right side: Auth Controls / User Profile */}
        <div className="hidden md:flex items-center gap-3 shrink-0 justify-end">
          {isAuthenticated && user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className={`flex items-center gap-2.5 p-1 pr-2 rounded-full transition-colors focus:outline-none ${
                  isTransparent
                    ? 'hover:bg-white/10 text-white'
                    : 'hover:bg-slate-100 text-slate-900'
                }`}
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.fullName || user.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/20"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                    {(user.fullName || user.name || 'U').charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="text-left hidden lg:flex flex-col items-start justify-center">
                  <span className={`text-[13px] font-semibold block leading-tight ${isTransparent ? 'text-white' : 'text-slate-900'}`}>
                    {user.fullName || user.name}
                  </span>
                  <span className={`text-[10px] font-bold capitalize block ${isTransparent ? 'text-[#4ade80]' : 'text-[#16A34A]'}`}>
                    {user.role || 'Player'}
                  </span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 ml-0.5 transition-transform ${userDropdownOpen ? 'rotate-180' : ''} ${isTransparent ? 'text-white/70' : 'text-slate-400'}`} />
              </button>

              {/* Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in-50 zoom-in-95 duration-150">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {user.fullName || user.name}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {user.email}
                    </p>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        handleLinkClick('/owner/dashboard');
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs font-bold text-emerald-700 hover:bg-emerald-50 flex items-center gap-2.5 transition-colors"
                    >
                      <Building2 className="w-4 h-4 text-emerald-600" />
                      Owner Dashboard
                    </button>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        handleLinkClick('/profile');
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 flex items-center gap-2.5 transition-colors"
                    >
                      <UserIcon className="w-4 h-4 text-slate-400" />
                      My Profile
                    </button>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        handleLinkClick('/my-bookings');
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 flex items-center gap-2.5 transition-colors"
                    >
                      <CalendarCheck className="w-4 h-4 text-slate-400" />
                      My Bookings
                    </button>
                  </div>

                  <div className="border-t border-slate-100 pt-1 mt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition-colors"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleLinkClick('/login')}
              >
                Log In
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleLinkClick('/signup')}
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-xl transition-colors ${
              isTransparent
                ? 'text-white hover:bg-white/10'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive =
                link.route === '/'
                  ? currentRoute === '/'
                  : currentRoute.startsWith(link.route);

              return (
                <button
                  key={link.route}
                  onClick={() => handleLinkClick(link.route)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'text-emerald-700 bg-emerald-50 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}

            {isAuthenticated && (
              <button
                onClick={() => handleLinkClick('/profile')}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  currentRoute === '/profile'
                    ? 'text-emerald-700 bg-emerald-50 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                My Profile
              </button>
            )}
          </div>

          <div className="pt-3 border-t border-slate-100">
            {isAuthenticated && user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-2 py-1">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.fullName || user.name}
                      className="w-10 h-10 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-sm">
                      {(user.fullName || user.name || 'U').charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-slate-900 truncate">
                      {user.fullName || user.name}
                    </p>
                    <p className="text-xs text-slate-500 truncate">{user.email}</p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  leftIcon={<LogOut className="w-4 h-4 text-red-500" />}
                  className="w-full text-red-600 border-red-200 hover:bg-red-50"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => handleLinkClick('/login')}
                  className="w-full"
                >
                  Log In
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handleLinkClick('/signup')}
                  className="w-full"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
