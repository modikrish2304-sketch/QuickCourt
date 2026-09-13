import React, { useState, useEffect } from 'react';
import {
  Users,
  Plus,
  Filter,
  Calendar,
  Clock,
  MapPin,
  Trophy,
  Shield,
  Zap,
  CheckCircle2,
  AlertCircle,
  X,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Match, SportType, Facility } from '../types';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';

interface MatchesPageProps {
  navigate: (route: string) => void;
  facilities: Facility[];
  selectedCity: string;
}

export const MatchesPage: React.FC<MatchesPageProps> = ({
  navigate,
  facilities,
  selectedCity,
}) => {
  const { user } = useAuth();
  const { addToast } = useNotifications();

  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedSport, setSelectedSport] = useState<string>('All');
  const [selectedSkill, setSelectedSkill] = useState<string>('All Levels');
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Create match form state
  const [newSport, setNewSport] = useState<SportType>('Badminton');
  const [newFacilityName, setNewFacilityName] = useState<string>(facilities[0]?.name || 'Smash Arena Indiranagar');
  const [newCourtName, setNewCourtName] = useState<string>('Court 1');
  const [newDate, setNewDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [newStartTime, setNewStartTime] = useState<string>('19:00');
  const [newMaxPlayers, setNewMaxPlayers] = useState<number>(4);
  const [newSkillLevel, setNewSkillLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels'>('Intermediate');
  const [newCost, setNewCost] = useState<number>(400);
  const [newDescription, setNewDescription] = useState<string>('Looking for players to join an energetic game. Non-marking shoes required!');

  const sportsFilter = ['All', 'Badminton', 'Football', 'Tennis', 'Pickleball', 'Cricket', 'Basketball'];
  const skillLevels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];

  useEffect(() => {
    setIsLoading(true);
    api.getMatches({ sport: selectedSport, skillLevel: selectedSkill, city: selectedCity })
      .then((data) => setMatches(data))
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, [selectedSport, selectedSkill, selectedCity]);

  const handleJoinMatch = async (matchId: string) => {
    if (!user) {
      alert('Please log in to join matches!');
      navigate('/auth/login');
      return;
    }

    try {
      const updated = await api.joinMatch(matchId, {
        userId: user.id,
        name: user.name,
        avatar: user.avatar,
      });

      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });

      addToast(
        '🏸 Joined Match!',
        `You joined the ${updated.sport} match at ${updated.facilityName}. See you on the court!`,
        'match_joined'
      );

      setMatches((prev) => prev.map((m) => (m.id === matchId ? updated : m)));
    } catch (err: any) {
      alert(err.message || 'Could not join match.');
    }
  };

  const handleCreateMatchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Please log in to create matches!');
      navigate('/auth/login');
      return;
    }

    try {
      const created = await api.createMatch({
        hostId: user.id,
        hostName: user.name,
        hostAvatar: user.avatar,
        sport: newSport,
        facilityId: facilities.find((f) => f.name === newFacilityName)?.id || 'fac_1',
        facilityName: newFacilityName,
        courtName: newCourtName,
        date: newDate,
        startTime: newStartTime,
        maxPlayers: Number(newMaxPlayers),
        skillLevel: newSkillLevel,
        description: newDescription,
        totalCourtCost: Number(newCost),
      });

      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });

      addToast(
        '📢 Match Created!',
        `Your ${created.sport} match is open for community players.`,
        'match_joined'
      );

      setMatches((prev) => [created, ...prev]);
      setIsCreateModalOpen(false);
    } catch (err: any) {
      alert(err.message || 'Failed to create match.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
                Matches & Community
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                {matches.length} Open Games
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Find teammates, join open games, and automatically split court costs in {selectedCity}.
            </p>
          </div>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 active:scale-95 transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Create a Match</span>
          </button>
        </div>

        {/* WOW FEATURE: Smart Matchmaking Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-teal-950/40 to-slate-900 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white uppercase tracking-wide">
                  Smart Matchmaking (Recommended For You)
                </span>
                <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded">
                  98% Match
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Based on your {user?.sportsPreferences?.join(', ') || 'Badminton'} preference: 1 slot left tonight at Smash Arena Indiranagar!
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              if (matches[0]) handleJoinMatch(matches[0].id);
            }}
            className="px-4 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shrink-0"
          >
            Join Best Match
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Sports filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-none">
            {sportsFilter.map((sp) => (
              <button
                key={sp}
                onClick={() => setSelectedSport(sp)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedSport === sp
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {sp}
              </button>
            ))}
          </div>

          {/* Skill Filter */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-[11px] text-slate-400 font-semibold">Skill:</span>
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-white focus:outline-none focus:border-emerald-500"
            >
              {skillLevels.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Matches Grid */}
        {isLoading ? (
          <div className="py-12 text-center text-xs text-slate-400">
            <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            Loading open matches...
          </div>
        ) : matches.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <Users className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No open matches found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Be the first to host an open match at a nearby court! Teammates in {selectedCity} will be notified.
            </p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
            >
              Create a Match Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((match) => {
              const isJoined = match.playersJoined.some((p) => p.userId === user?.id);
              const isFull = match.playersJoined.length >= match.maxPlayers;
              const fillPercent = Math.round(
                (match.playersJoined.length / match.maxPlayers) * 100
              );

              return (
                <div
                  key={match.id}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 flex flex-col justify-between space-y-4 shadow-lg transition-all"
                >
                  <div className="space-y-3">
                    {/* Header: Sport & Skill level */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">
                          {match.sport} Match
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                          {match.skillLevel}
                        </span>
                      </div>

                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          isFull
                            ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                            : fillPercent >= 75
                            ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                            : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {isFull ? 'Full' : `${match.maxPlayers - match.playersJoined.length} Slots Left`}
                      </span>
                    </div>

                    {/* Venue & Time */}
                    <div>
                      <h4 className="text-base font-bold text-white font-display">
                        {match.facilityName}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span>{match.courtName} • {match.area}</span>
                      </p>
                      <div className="mt-2 flex items-center gap-3 text-xs text-slate-300 font-medium">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {match.date}
                        </span>
                        <span className="flex items-center gap-1 text-emerald-400">
                          <Clock className="w-3.5 h-3.5" />
                          {match.startTime} - {match.endTime}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {match.description}
                    </p>

                    {/* Visual Player Progress Bar (Master prompt specification) */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between text-[11px] font-semibold">
                        <span className="text-slate-400">Players Joined</span>
                        <span className="text-emerald-400 font-bold">
                          {match.playersJoined.length} / {match.maxPlayers}
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all"
                          style={{ width: `${fillPercent}%` }}
                        />
                      </div>

                      {/* Player Avatars */}
                      <div className="flex items-center gap-1.5 pt-1">
                        {match.playersJoined.map((player) => (
                          <img
                            key={player.userId}
                            src={player.avatar}
                            alt={player.name}
                            title={`${player.name} (Share Paid: ₹${player.sharePaid})`}
                            className="w-6 h-6 rounded-full object-cover border border-slate-700"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Split Cost Breakdown & CTA */}
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
                        Per Player Share
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-base font-extrabold text-emerald-400 font-display">
                          ₹{match.entryFeePerPlayer}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          (Total ₹{match.totalCourtCost})
                        </span>
                      </div>
                    </div>

                    {isJoined ? (
                      <span className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center gap-1 border border-emerald-500/30">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Registered</span>
                      </span>
                    ) : (
                      <button
                        disabled={isFull}
                        onClick={() => handleJoinMatch(match.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          isFull
                            ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                            : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 active:scale-95 shadow-md'
                        }`}
                      >
                        {isFull ? 'Match Full' : 'Join Match'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Create Match Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
            <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-base font-bold text-white font-display">
                    Host a Community Sports Match
                  </h3>
                </div>
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateMatchSubmit} className="mt-4 space-y-4 text-xs">
                {/* Sport */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Sport
                  </label>
                  <select
                    value={newSport}
                    onChange={(e) => setNewSport(e.target.value as SportType)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-emerald-500"
                  >
                    {['Badminton', 'Football', 'Tennis', 'Pickleball', 'Cricket', 'Basketball'].map((sp) => (
                      <option key={sp} value={sp}>
                        {sp}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Facility */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Sports Facility
                  </label>
                  <select
                    value={newFacilityName}
                    onChange={(e) => setNewFacilityName(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-emerald-500"
                  >
                    {facilities.map((f) => (
                      <option key={f.id} value={f.name}>
                        {f.name} ({f.area})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date & Start Time */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={newStartTime}
                      onChange={(e) => setNewStartTime(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Max Players & Skill Level */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Total Players Needed
                    </label>
                    <input
                      type="number"
                      min={2}
                      max={22}
                      value={newMaxPlayers}
                      onChange={(e) => setNewMaxPlayers(Number(e.target.value))}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Skill Level
                    </label>
                    <select
                      value={newSkillLevel}
                      onChange={(e) => setNewSkillLevel(e.target.value as any)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="All Levels">All Levels</option>
                    </select>
                  </div>
                </div>

                {/* Total Court Cost & Split Calculation */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Total Court Cost (₹)
                  </label>
                  <input
                    type="number"
                    value={newCost}
                    onChange={(e) => setNewCost(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-emerald-500"
                  />
                  <div className="mt-1 text-[11px] text-emerald-400 font-semibold">
                    Each player pays: ₹{Math.round(newCost / Math.max(1, newMaxPlayers))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Game Notes & Etiquette
                  </label>
                  <textarea
                    rows={2}
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
                  >
                    Publish Match
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
