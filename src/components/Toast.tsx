import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'warning' | 'error' | 'info';

export interface ToastProps {
  id?: string;
  type?: ToastType;
  title: string;
  message?: string;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  type = 'success',
  title,
  message,
  onClose,
  duration = 4000,
}) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const config = {
    success: {
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
      border: 'border-emerald-200',
      bg: 'bg-emerald-50/90',
      titleColor: 'text-emerald-900',
    },
    warning: {
      icon: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
      border: 'border-amber-200',
      bg: 'bg-amber-50/90',
      titleColor: 'text-amber-900',
    },
    error: {
      icon: <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />,
      border: 'border-red-200',
      bg: 'bg-red-50/90',
      titleColor: 'text-red-900',
    },
    info: {
      icon: <Info className="w-5 h-5 text-blue-600 shrink-0" />,
      border: 'border-blue-200',
      bg: 'bg-blue-50/90',
      titleColor: 'text-blue-900',
    },
  }[type];

  return (
    <div
      className={`fixed top-5 right-5 z-50 flex items-start gap-3 rounded-xl border ${config.border} ${config.bg} p-4 shadow-xl backdrop-blur-md max-w-sm w-full animate-in slide-in-from-top-4 fade-in duration-300`}
      role="alert"
    >
      {config.icon}
      <div className="flex-1 min-w-0">
        <h4 className={`text-sm font-bold ${config.titleColor}`}>{title}</h4>
        {message && (
          <p className="text-xs text-slate-600 mt-0.5 leading-relaxed break-words">
            {message}
          </p>
        )}
      </div>
      <button
        onClick={onClose}
        className="text-slate-400 hover:text-slate-700 p-0.5 rounded-lg transition-colors"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
