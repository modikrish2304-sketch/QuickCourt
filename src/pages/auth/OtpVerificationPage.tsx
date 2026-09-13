import React, { useState, useRef, useEffect } from 'react';
import { ShieldCheck, ArrowRight, RotateCcw, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';

interface OtpVerificationPageProps {
  navigate: (route: string) => void;
  email?: string;
}

export const OtpVerificationPage: React.FC<OtpVerificationPageProps> = ({
  navigate,
  email = 'player@quickcourt.demo',
}) => {
  const { verifyOtp, resendOtp } = useAuth();
  const { addToast } = useNotifications();

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(45);
  const [canResend, setCanResend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Countdown timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pasteData)) {
      const digits = pasteData.split('');
      setOtp(digits);
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < 6) {
      setError('Please enter the full 6-digit verification code.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await verifyOtp(email, code);
      setIsSuccess(true);
      addToast('Account Verified!', 'Your QuickCourt account is fully activated.', 'system');
      setTimeout(() => {
        navigate('/venues');
      }, 1200);
    } catch (err: any) {
      setError(err.message || 'Verification failed. Demo code is 123456.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await resendOtp(email);
      setTimer(45);
      setCanResend(false);
      addToast('New Code Sent', 'A fresh 6-digit OTP code was sent.', 'system');
    } catch (err: any) {
      setError(err.message || 'Failed to resend code.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-md">
            <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
          </div>
          <h2 className="text-2xl font-extrabold font-display text-white">
            Verify Your Account
          </h2>
          <p className="text-xs text-slate-400">
            We sent a verification code to <span className="text-emerald-400 font-semibold">{email}</span>
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs text-center">
              {error}
            </div>
          )}

          {isSuccess ? (
            <div className="py-6 text-center space-y-2">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
              <div className="text-sm font-bold text-white">Verification Complete!</div>
              <div className="text-xs text-slate-400">Redirecting to sports venues...</div>
            </div>
          ) : (
            <form onSubmit={handleVerify} className="space-y-6">
              {/* 6 Digit Inputs */}
              <div className="flex justify-between gap-2">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => (inputRefs.current[idx] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    onPaste={handlePaste}
                    className="w-12 h-14 text-center text-xl font-bold rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                ))}
              </div>

              {/* Demo Hint */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setOtp(['1', '2', '3', '4', '5', '6']);
                    inputRefs.current[5]?.focus();
                  }}
                  className="text-[11px] text-emerald-400 hover:underline font-semibold"
                >
                  ⚡ Autofill Demo Code (123456)
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading || otp.some((d) => !d)}
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{isLoading ? 'Verifying Code...' : 'Verify & Continue'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Resend Timer */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Didn't receive code?</span>
            {canResend ? (
              <button
                type="button"
                onClick={handleResend}
                className="text-emerald-400 hover:underline font-bold flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Resend Code</span>
              </button>
            ) : (
              <span className="text-slate-500 font-mono">
                Resend in 00:{timer < 10 ? `0${timer}` : timer}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
