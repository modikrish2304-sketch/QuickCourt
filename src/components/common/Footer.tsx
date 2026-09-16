import React from 'react';
import { Trophy, ShieldCheck, Zap, Heart, MapPin, Phone, Mail } from 'lucide-react';

export const Footer: React.FC<{ navigate: (r: string) => void }> = ({ navigate }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Vision */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center">
                <Trophy className="w-4 h-4 text-slate-950 stroke-[2.5]" />
              </div>
              <span className="text-lg font-bold text-white font-display">
                QUICK<span className="text-emerald-400">COURT</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Find Your Court. Find Your Game. The unified sports technology platform connecting local sports venues, real-time court availability, and passionate players.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Sports Venues & Zero Double-Booking Guarantee</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Explore Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('/venues')} className="hover:text-emerald-400 transition-colors">
                  Find Sports Venues
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/matches')} className="hover:text-emerald-400 transition-colors">
                  Open Matches & Teammates
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/venues?sport=Badminton')} className="hover:text-emerald-400 transition-colors">
                  Badminton Courts
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/venues?sport=Football')} className="hover:text-emerald-400 transition-colors">
                  Football Turfs & Box Cricket
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/venues?sport=Tennis')} className="hover:text-emerald-400 transition-colors">
                  Tennis & Pickleball Clubs
                </button>
              </li>
            </ul>
          </div>

          {/* For Venue Owners & Admins */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Platform Administration
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('/admin/dashboard')} className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                  Admin Console & Approvals
                </button>
              </li>
              <li>
                <span className="text-slate-500">B2B Venue Automation</span>
              </li>
              <li>
                <span className="text-slate-500">Dynamic Slot Yield Management</span>
              </li>
            </ul>
          </div>

          {/* Coverage & Helpline */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Live Cities & Support
            </h4>
            <div className="flex items-center gap-2 text-xs">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Bengaluru, Mumbai, Delhi-NCR, Hyderabad, Pune</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Phone className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Court Support: +91 (800) 420-GAME</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
              <span>support@quickcourt.com</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 QuickCourt Technologies Inc. Built for Hackathon Excellence.</p>
          <div className="flex items-center gap-1">
            <span>Powered by</span>
            <span className="text-emerald-400 font-semibold">React, Express & Real-time Booking Engine</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
