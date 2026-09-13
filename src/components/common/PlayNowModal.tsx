import React, { useState } from 'react';
import { Zap, X, Clock, MapPin, Trophy, Users, ArrowRight, Check } from 'lucide-react';
import { SportType } from '../../types';

interface PlayNowModalProps {
  isOpen: boolean;
  onClose: () => void;
  navigate: (route: string) => void;
  selectedCity: string;
}

export const PlayNowModal: React.FC<PlayNowModalProps> = ({
  isOpen,
  onClose,
  navigate,
  selectedCity,
}) => {
  const [selectedSport, setSelectedSport] = useState<SportType>('Badminton');
  const [timing, setTiming] = useState<'immediate' | 'tonight' | 'tomorrow'>('tonight');

  if (!isOpen) return null;

  const sportsList: { name: SportType; icon: string }[] = [
    { name: 'Badminton', icon: '🏸' },
    { name: 'Football', icon: '⚽' },
    { name: 'Tennis', icon: '🎾' },
    { name: 'Pickleball', icon: '🏓' },
    { name: 'Basketball', icon: '🏀' },
    { name: 'Cricket', icon: '🏏' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 overflow-hidden">
        {/* Glow accent */}
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Zap className="w-5 h-5 text-slate-950 fill-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white font-display">⚡ PLAY NOW</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  INSTANT DISPATCH
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Find available courts & open teams ready right now in {selectedCity}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Select Sport */}
        <div className="mt-5 space-y-2">
          <label className="text-xs font-semibold text-slate-300">What do you want to play?</label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {sportsList.map((item) => (
              <button
                key={item.name}
                onClick={() => setSelectedSport(item.name)}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  selectedSport === item.name
                    ? 'bg-emerald-500/15 border-emerald-500 text-white shadow-sm'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="text-xl mb-1">{item.icon}</div>
                <div className="text-xs font-semibold truncate">{item.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Timing choice */}
        <div className="mt-4 space-y-2">
          <label className="text-xs font-semibold text-slate-300">When are you ready?</label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setTiming('immediate')}
              className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                timing === 'immediate'
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              Within 2 Hours
            </button>
            <button
              onClick={() => setTiming('tonight')}
              className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                timing === 'tonight'
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              Tonight (7-10 PM)
            </button>
            <button
              onClick={() => setTiming('tomorrow')}
              className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                timing === 'tomorrow'
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              Tomorrow Morning
            </button>
          </div>
        </div>

        {/* Live Instant Matches & Available Courts Results */}
        <div className="mt-5 space-y-3">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Available Instantly Nearby
          </label>

          {/* Option 1: Live Court Slot */}
          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between hover:border-emerald-500/50 transition-colors">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-bold text-white">Smash Arena Indiranagar</span>
                <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                  🟢 3 Courts Open
                </span>
              </div>
              <div className="text-xs text-slate-400 flex items-center gap-2">
                <MapPin className="w-3 h-3 text-slate-500" />
                <span>1.8 km away • 19:00 - 20:00 • ₹400/hr</span>
              </div>
            </div>
            <button
              onClick={() => {
                onClose();
                navigate('/venues/fac_1/book');
              }}
              className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-sm"
            >
              <span>Instant Book</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Option 2: Active Open Match */}
          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between hover:border-teal-500/50 transition-colors">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-teal-400" />
                <span className="text-xs font-bold text-white">Badminton Doubles Match</span>
                <span className="text-[10px] text-teal-400 font-semibold bg-teal-500/10 px-1.5 py-0.5 rounded">
                  3/4 Players Joined
                </span>
              </div>
              <div className="text-xs text-slate-400 flex items-center gap-2">
                <span>Rohan & Ananya need 1 player • ₹100 share • 19:00</span>
              </div>
            </div>
            <button
              onClick={() => {
                onClose();
                navigate('/matches');
              }}
              className="px-3 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-sm"
            >
              <span>Join Team</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Real-time availability refreshed 2 seconds ago
          </span>
          <button
            onClick={() => {
              onClose();
              navigate(`/venues?sport=${selectedSport}`);
            }}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
          >
            <span>Browse all {selectedSport} courts</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
