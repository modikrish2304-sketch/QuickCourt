import React, { useState } from 'react';
import { Trophy, Mail, Lock, ArrowRight, Eye, EyeOff, CheckCircle2, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';

interface LoginPageProps {
  navigate: (route: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ navigate }) => {
  const { login, switchRole } = useAuth();
  const { addToast } = useNotifications();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const user = await login(email, password);
      addToast('Welcome Back!', `Signed in as ${user.name}`, 'system');

      if (user.role === 'facility_owner') {
        navigate('/owner/dashboard');
      } else if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/venues');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Try demo accounts below.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemo = (role: 'player' | 'facility_owner' | 'admin') => {
    switchRole(role);
    addToast('Demo Switch Active', `Logged in as ${role.replace('_', ' ').toUpperCase()}`, 'system');
    if (role === 'facility_owner') {
      navigate('/owner/dashboard');
    } else if (role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/venues');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6">
        {/* Brand */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-md">
            <Trophy className="w-6 h-6 stroke-[2.5]" />
          </div>
          <h2 className="text-2xl font-extrabold font-display text-white">
            Welcome to QuickCourt
          </h2>
          <p className="text-xs text-slate-400">
            Sign in to book courts, manage facilities, or join games
          </p>
        </div>

        {/* 1-Click Demo Accounts Selector (Crucial for Judge Demo Flow!) */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
            <Shield className="w-3.5 h-3.5" />
            <span>Judge / Evaluator Instant Demo Logins</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('player')}
              className="py-2 px-2.5 rounded-xl bg-slate-800 hover:bg-emerald-500/20 hover:border-emerald-500 border border-slate-700 text-left transition-all group"
            >
              <div className="text-[11px] font-bold text-white group-hover:text-emerald-300">
                🏸 Player
              </div>
              <div className="text-[9px] text-slate-400">Krish Patel</div>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('facility_owner')}
              className="py-2 px-2.5 rounded-xl bg-slate-800 hover:bg-amber-500/20 hover:border-amber-500 border border-slate-700 text-left transition-all group"
            >
              <div className="text-[11px] font-bold text-white group-hover:text-amber-300">
                🏢 Owner
              </div>
              <div className="text-[9px] text-slate-400">Ramesh S.</div>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('admin')}
              className="py-2 px-2.5 rounded-xl bg-slate-800 hover:bg-rose-500/20 hover:border-rose-500 border border-slate-700 text-left transition-all group"
            >
              <div className="text-[11px] font-bold text-white group-hover:text-rose-300">
                ⚡ Admin
              </div>
              <div className="text-[9px] text-slate-400">Moderator</div>
            </button>
          </div>
        </div>

        {/* Login Card */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Email Address</label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="player@quickcourt.demo"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-slate-400">Password</label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Password reset link sent to demo email.');
                  }}
                  className="text-[11px] text-emerald-400 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-9 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-95"
            >
              <span>{isLoading ? 'Signing In...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-3 border-t border-slate-800 text-center text-xs text-slate-400">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/auth/signup')}
              className="text-emerald-400 hover:underline font-bold"
            >
              Sign Up Free
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
