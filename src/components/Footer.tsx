import React from 'react';
import { Logo } from './Logo';
import { ShieldCheck, Zap, Headphones, Heart, Lock } from 'lucide-react';

export interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-auto">
      {/* Top Value Proposition Badges */}
      <div className="border-b border-slate-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3.5 p-3 rounded-xl">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">100% Verified Venues</h4>
                <p className="text-xs text-slate-500 mt-0.5">Every facility is inspected for court quality & standards.</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3 rounded-xl">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Instant Real-Time Booking</h4>
                <p className="text-xs text-slate-500 mt-0.5">Live slot availability with instant digital passes.</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3 rounded-xl">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Dedicated Player Support</h4>
                <p className="text-xs text-slate-500 mt-0.5">Easy cancellations, transparent pricing & no hidden charges.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Link Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand & Summary */}
          <div className="col-span-2 space-y-4">
            <Logo size="md" showTagline />
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              QuickCourt is India's premier sports facility discovery and court reservation platform. Seamlessly connect with top-tier badminton arenas, football turfs, cricket pitches, and tennis clubs in seconds.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
              <span>Made with passion for sports</span>
              <span>•</span>
              <span className="text-emerald-700 font-semibold">Hackathon Edition</span>
            </div>
          </div>

          {/* Sports */}
          <div>
            <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 font-display">
              Popular Sports
            </h5>
            <ul className="space-y-2 text-xs text-slate-600">
              {['Badminton', 'Football', 'Cricket', 'Tennis', 'Basketball', 'Pickleball'].map((s) => (
                <li key={s}>
                  <button
                    onClick={() => onNavigate(`/venues?sport=${s}`)}
                    className="hover:text-emerald-600 transition-colors"
                  >
                    {s} Courts
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 font-display">
              Top Cities
            </h5>
            <ul className="space-y-2 text-xs text-slate-600">
              {['Bengaluru', 'Ahmedabad', 'Mumbai', 'Delhi', 'Pune', 'Hyderabad'].map((c) => (
                <li key={c}>
                  <button
                    onClick={() => onNavigate(`/venues?city=${c}`)}
                    className="hover:text-emerald-600 transition-colors"
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform & Quick Links */}
          <div>
            <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 font-display">
              Quick Links
            </h5>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button
                  onClick={() => onNavigate('/')}
                  className="hover:text-emerald-600 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/venues')}
                  className="hover:text-emerald-600 transition-colors"
                >
                  Explore Venues
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/my-bookings')}
                  className="hover:text-emerald-600 transition-colors"
                >
                  My Bookings
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/profile')}
                  className="hover:text-emerald-600 transition-colors"
                >
                  Player Profile
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col items-center justify-center gap-6 text-center">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <button onClick={() => onNavigate('/')} className="hover:text-emerald-700 transition-colors">Privacy Policy</button>
            <button onClick={() => onNavigate('/')} className="hover:text-emerald-700 transition-colors">Terms of Service</button>
            <button onClick={() => onNavigate('/')} className="hover:text-emerald-700 transition-colors">Court Rules</button>
            <button onClick={() => onNavigate('/owner')} className="hover:text-emerald-700 transition-colors flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Access</span>
            </button>
          </div>
          <p className="text-xs text-slate-400">© {new Date().getFullYear()} QuickCourt Sports Technologies Pvt. Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
