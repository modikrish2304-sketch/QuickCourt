import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/Logo';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Mail, Lock, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export interface LoginPageProps {
  onNavigate: (route: string) => void;
  redirectUrl?: string;
  onShowToast?: (type: 'success' | 'error' | 'info', title: string, msg?: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onNavigate,
  redirectUrl = '/venues',
  onShowToast,
}) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      if (onShowToast) {
        onShowToast('success', 'Welcome Back!', 'Logged in successfully.');
      }
      onNavigate(redirectUrl);
    } catch (err: any) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemoLogin = async (demoEmail: string, demoPass: string) => {
    setError('');
    setIsLoading(true);
    try {
      await login(demoEmail, demoPass);
      if (onShowToast) {
        onShowToast('success', 'Demo Login', `Signed in as ${demoEmail}`);
      }
      onNavigate(redirectUrl);
    } catch (err: any) {
      setError(err.message || 'Demo login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50/50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
        {/* Header */}
        <div className="text-center">
          <div className="inline-block mb-3 cursor-pointer" onClick={() => onNavigate('/')}>
            <Logo size="lg" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight font-display">
            Welcome Back
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Sign in to manage your court reservations and digital passes.
          </p>
        </div>

        {/* Demo One-Click Login Callout for Hackathon Judges */}
        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            Hackathon One-Click Demo Logins
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('arjun@quickcourt.in', 'password123')}
              className="px-3 py-2 rounded-xl bg-white border border-emerald-200 text-[11px] font-bold text-slate-800 hover:bg-emerald-50 transition-colors text-left"
            >
              <span className="block text-emerald-700">👤 Demo Player</span>
              <span className="text-[10px] text-slate-400 font-normal">Arjun Mehta</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('rajesh@smasharena.com', 'password123')}
              className="px-3 py-2 rounded-xl bg-white border border-emerald-200 text-[11px] font-bold text-slate-800 hover:bg-emerald-50 transition-colors text-left"
            >
              <span className="block text-emerald-700">🏢 Venue Partner</span>
              <span className="text-[10px] text-slate-400 font-normal">Rajesh Sharma</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4" />}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<Lock className="w-4 h-4" />}
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            className="w-full mt-2"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Sign In
          </Button>
        </form>

        {/* Footer link to Signup */}
        <div className="text-center pt-2 text-xs text-slate-500">
          Don't have an account?{' '}
          <button
            onClick={() => onNavigate(`/signup?redirect=${encodeURIComponent(redirectUrl)}`)}
            className="font-bold text-emerald-600 hover:text-emerald-700 transition-colors underline"
          >
            Create Free Account
          </button>
        </div>
      </div>
    </div>
  );
};
