import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/Logo';
import { Button } from '../components/Button';
import { CheckCircle2, RotateCcw, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export interface OtpVerificationPageProps {
  email?: string;
  redirectUrl?: string;
  onNavigate: (route: string) => void;
  onShowToast?: (type: 'success' | 'error' | 'info', title: string, msg?: string) => void;
}

export const OtpVerificationPage: React.FC<OtpVerificationPageProps> = ({
  email = '',
  redirectUrl = '/venues',
  onNavigate,
  onShowToast,
}) => {
  const { verifyOtp, resendOtp } = useAuth();
  const [otp, setOtp] = useState(['1', '2', '3', '4', '5', '6']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleOtpChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[index] = val.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleAutofillDemoOtp = () => {
    setOtp(['1', '2', '3', '4', '5', '6']);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = otp.join('');
    if (fullCode.length !== 6) {
      setError('Please enter the full 6-digit OTP.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await verifyOtp(email || 'demo@quickcourt.in', fullCode);
      if (onShowToast) {
        onShowToast(
          'success',
          'Account Verified!',
          'Welcome to QuickCourt. Your account is now active.'
        );
      }
      onNavigate(redirectUrl);
    } catch (err: any) {
      setError(err.message || 'Invalid or expired OTP. Use demo OTP: 123456');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    resendOtp(email || 'demo@quickcourt.in');
    setTimer(30);
    if (onShowToast) {
      onShowToast('info', 'OTP Resent', 'A new 6-digit code has been dispatched.');
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
            Verify Your Email
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            We've sent a 6-digit verification code to <br />
            <span className="font-bold text-slate-800">{email || 'your email'}</span>
          </p>
        </div>

        {/* Demo OTP Helper Chip */}
        <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs text-emerald-900">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Demo OTP: <strong className="font-mono text-emerald-700 font-black">123456</strong>
            </span>
          </div>
          <button
            type="button"
            onClick={handleAutofillDemoOtp}
            className="text-[11px] font-bold text-emerald-700 bg-white border border-emerald-200 px-2.5 py-1 rounded-lg hover:bg-emerald-50 transition-colors"
          >
            Auto-fill
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
            {error}
          </div>
        )}

        {/* 6-box OTP inputs */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between gap-2 sm:gap-3">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-${idx}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl font-black font-display rounded-2xl border border-slate-300 bg-slate-50/50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all shadow-xs"
              />
            ))}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            className="w-full"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Verify & Continue
          </Button>
        </form>

        {/* Resend timer */}
        <div className="text-center pt-2 text-xs text-slate-500">
          {timer > 0 ? (
            <span>Resend code in <strong className="text-slate-700">{timer}s</strong></span>
          ) : (
            <button
              onClick={handleResend}
              className="font-bold text-emerald-600 hover:text-emerald-700 flex items-center justify-center gap-1 mx-auto transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Resend 6-Digit OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
