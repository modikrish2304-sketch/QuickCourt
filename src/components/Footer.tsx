import React, { useState } from 'react';
import { Logo } from './Logo';
import { ShieldCheck, Zap, Headphones, Lock, X, FileText, Scale, BookOpen } from 'lucide-react';

export interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | 'rules' | null>(null);
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
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-semibold text-slate-500">
            <button
              type="button"
              onClick={() => setActiveModal('privacy')}
              className="hover:text-emerald-700 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => setActiveModal('terms')}
              className="hover:text-emerald-700 transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              type="button"
              onClick={() => setActiveModal('rules')}
              className="hover:text-emerald-700 transition-colors cursor-pointer"
            >
              Court Rules
            </button>
            <button onClick={() => onNavigate('/owner')} className="hover:text-emerald-700 transition-colors flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Access</span>
            </button>
          </div>
          <p className="text-xs text-slate-400">© {new Date().getFullYear()} QuickCourt Sports Technologies Pvt. Ltd. All rights reserved.</p>
        </div>
      </div>

      {/* Modal Dialog for Privacy Policy, Terms of Service, and Court Rules */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  {activeModal === 'privacy' && <FileText className="w-4 h-4" />}
                  {activeModal === 'terms' && <Scale className="w-4 h-4" />}
                  {activeModal === 'rules' && <BookOpen className="w-4 h-4" />}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {activeModal === 'privacy' && 'Privacy Policy'}
                    {activeModal === 'terms' && 'Terms of Service'}
                    {activeModal === 'rules' && 'Court Rules'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {activeModal === 'privacy' && 'QuickCourt Legal & Data Protection Notice'}
                    {activeModal === 'terms' && 'Player & Facility Booking Agreement'}
                    {activeModal === 'rules' && 'Standard Playing Etiquette & Guidelines'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm text-slate-600 leading-relaxed">
              {activeModal === 'privacy' && (
                <>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1.5">1. Information We Collect</h4>
                    <p>
                      QuickCourt collects information necessary to facilitate sports facility discovery and court bookings. This includes your name, verified phone number, email address, and transaction logs. When permitted, we process your approximate location to highlight venues near you.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1.5">2. Use of Your Data</h4>
                    <p>
                      Your information is used exclusively to generate live digital booking passes, send slot confirmation alerts, prevent double-bookings, authenticate your player profile, and provide customer support.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1.5">3. Payment Security & Processing</h4>
                    <p>
                      All financial transactions are encrypted and processed through certified PCI-DSS compliant payment gateways. QuickCourt does not store your raw credit/debit card numbers or UPI PINs.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1.5">4. Sharing with Facility Partners</h4>
                    <p>
                      When you confirm a booking, only required reservation details (player name, slot time, sport, and booking ID) are shared with the respective venue manager for court admission and gate verification.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1.5">5. Your Privacy Rights & Contact</h4>
                    <p>
                      You may review, update, or request deletion of your account and personal data at any time through your Player Profile or by reaching out to support@quickcourt.in.
                    </p>
                  </div>
                </>
              )}

              {activeModal === 'terms' && (
                <>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1.5">1. Platform Services</h4>
                    <p>
                      QuickCourt provides an online marketplace connecting sports players with verified sports facilities. By reserving a slot, you agree to comply with platform terms and all specific rules enforced by the booked venue.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1.5">2. Booking & Slot Confirmation</h4>
                    <p>
                      A court reservation is finalized once payment is processed and a digital booking ID is issued. Confirmed slots guarantee exclusive access to the selected court for the booked duration.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1.5">3. Cancellation & Refund Policy</h4>
                    <p>
                      Cancellations made prior to the venue's cut-off window are eligible for refund or credit according to the facility's policy. No-shows or last-minute cancellations within the lock-in window are non-refundable.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1.5">4. Fair Play & Player Decorum</h4>
                    <p>
                      Commercial reselling of booked slots, abusive behavior toward venue staff, or intentional destruction of court property is strictly prohibited and subject to immediate account termination.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1.5">5. Assumption of Risk & Liability</h4>
                    <p>
                      Players acknowledge that physical sports involve inherent risks of injury. Players are responsible for their own physical fitness, equipment readiness, and safety during play.
                    </p>
                  </div>
                </>
              )}

              {activeModal === 'rules' && (
                <>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1.5">1. Footwear & Appropriate Attire</h4>
                    <p>
                      Non-marking gum-sole shoes are strictly mandatory for all indoor badminton, squash, and basketball wooden or synthetic surfaces. Turf shoes or rubber studs must be worn on artificial football pitches. Metal cleats and regular outdoor street shoes are strictly banned.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1.5">2. Punctuality & Slot Handover</h4>
                    <p>
                      Please arrive 10 minutes prior to your reserved slot for check-in. Play must conclude promptly when your booked hour ends to allow the subsequent group immediate court access.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1.5">3. Food & Beverages</h4>
                    <p>
                      Only water and electrolyte hydration drinks in spill-proof bottles are permitted court-side. Chewing gum, food items, glass containers, smoking, and alcoholic beverages are strictly forbidden inside sports arenas.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1.5">4. Equipment & Facility Property Care</h4>
                    <p>
                      Treat nets, goal posts, court flooring, and lighting fixtures with care. Rented racquets, balls, and equipment must be returned in good condition to the facility reception before departure.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1.5">5. Sportsmanship & Safety</h4>
                    <p>
                      Maintain respectful sportsmanship at all times. In case of any injury, spill, or court hazard, notify the venue marshal or facility desk immediately for first-aid assistance.
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 border-t border-slate-100 flex justify-end bg-slate-50/60">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
