import React, { useState } from 'react';
import { Trophy, Mail, Lock, User, MapPin, ArrowRight, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { UserRole, SportType } from '../../types';

interface SignupPageProps {
  navigate: (route: string) => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({ navigate }) => {
  const { register } = useAuth();
  const { addToast } = useNotifications();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('player');
  const [city, setCity] = useState('Bengaluru');
  const [skillLevel, setSkillLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await register({
        name,
        email,
        phone,
        password,
        role,
        city,
        skillLevel,
        sportsPreferences: ['Badminton', 'Football'],
      });

      addToast(
        'Account Registered',
        'We sent a 6-digit verification code to your email.',
        'system'
      );
      navigate(`/auth/verify-otp?email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      setError(err.message || 'Registration failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-md">
            <Trophy className="w-6 h-6 stroke-[2.5]" />
          </div>
          <h2 className="text-2xl font-extrabold font-display text-white">
            Join QuickCourt
          </h2>
          <p className="text-xs text-slate-400">
            Book local courts and discover sports partners in your area
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Role Switcher */}
            <div>
              <label className="block text-slate-400 mb-1.5 font-bold uppercase tracking-wider text-[10px]">
                I want to join as
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('player')}
                  className={`py-2 px-3 rounded-xl border font-semibold transition-all ${
                    role === 'player'
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                      : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  🏸 Player / Team
                </button>
                <button
                  type="button"
                  onClick={() => setRole('facility_owner')}
                  className={`py-2 px-3 rounded-xl border font-semibold transition-all ${
                    role === 'facility_owner'
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                      : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  🏢 Facility Owner
                </button>
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Full Name</label>
              <div className="relative flex items-center">
                <User className="w-4 h-4 text-slate-500 absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Phone</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">City</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi-NCR">Delhi-NCR</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Pune">Pune</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Skill Level</label>
                <select
                  value={skillLevel}
                  onChange={(e) => setSkillLevel(e.target.value as any)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Password</label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-95"
            >
              <span>{isLoading ? 'Creating Account...' : 'Continue to OTP Verification'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-3 border-t border-slate-800 text-center text-xs text-slate-400">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/auth/login')}
              className="text-emerald-400 hover:underline font-bold"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
