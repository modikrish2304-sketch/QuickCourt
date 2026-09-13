import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/Logo';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { UserRole } from '../types';
import { Mail, Lock, User as UserIcon, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export interface SignupPageProps {
  onNavigate: (route: string) => void;
  redirectUrl?: string;
  onShowToast?: (type: 'success' | 'error' | 'info', title: string, msg?: string) => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({
  onNavigate,
  redirectUrl = '/venues',
  onShowToast,
}) => {
  const { initiateSignup } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('player');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (fullName.trim().length < 2) {
      setError('Please provide your full name.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await initiateSignup({
        fullName,
        email,
        password,
        role,
      });

      if (onShowToast) {
        onShowToast('info', 'OTP Sent', `Verification code sent to ${email}`);
      }

      // Navigate to OTP verification page
      onNavigate(
        `/verify-otp?email=${encodeURIComponent(email)}&redirect=${encodeURIComponent(redirectUrl)}`
      );
    } catch (err: any) {
      setError(err.message || 'Signup failed. Please try again.');
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
            Create Your Account
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Join QuickCourt to find and book courts in your city.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
            {error}
          </div>
        )}

        {/* Role Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Account Type</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setRole('player')}
              className={`p-3 rounded-xl border text-center text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                role === 'player'
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-500/20'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>🏸 Sports Player</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('owner')}
              className={`p-3 rounded-xl border text-center text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                role === 'owner'
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-500/20'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>🏢 Venue Partner</span>
            </button>
          </div>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            placeholder="e.g. Rohan Patel"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            leftIcon={<UserIcon className="w-4 h-4" />}
            required
          />

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
            label="Create Password"
            type="password"
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<Lock className="w-4 h-4" />}
            required
          />

          <div className="pt-2 text-[11px] text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>We'll send a 6-digit OTP to verify your email address.</span>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            className="w-full mt-2"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Continue to Verification
          </Button>
        </form>

        {/* Footer link to Login */}
        <div className="text-center pt-2 text-xs text-slate-500">
          Already have an account?{' '}
          <button
            onClick={() => onNavigate(`/login?redirect=${encodeURIComponent(redirectUrl)}`)}
            className="font-bold text-emerald-600 hover:text-emerald-700 transition-colors underline"
          >
            Sign In Here
          </button>
        </div>
      </div>
    </div>
  );
};
