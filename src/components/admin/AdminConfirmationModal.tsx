import React from 'react';
import { AlertTriangle, CheckCircle2, ShieldAlert, X } from 'lucide-react';

export interface AdminConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'success' | 'info';
  inputPlaceholder?: string;
  inputValue?: string;
  onInputChange?: (value: string) => void;
  showInput?: boolean;
  onConfirm: () => void;
  onClose: () => void;
  isLoading?: boolean;
}

export const AdminConfirmationModal: React.FC<AdminConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'warning',
  inputPlaceholder = 'Optional feedback / reason...',
  inputValue = '',
  onInputChange,
  showInput = false,
  onConfirm,
  onClose,
  isLoading = false,
}) => {
  if (!isOpen) return null;

  const iconConfig = {
    danger: {
      bg: 'bg-rose-50 text-rose-600 border-rose-200',
      btn: 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs',
      icon: ShieldAlert,
    },
    warning: {
      bg: 'bg-amber-50 text-amber-600 border-amber-200',
      btn: 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs',
      icon: AlertTriangle,
    },
    success: {
      bg: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      btn: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs',
      icon: CheckCircle2,
    },
    info: {
      bg: 'bg-blue-50 text-blue-600 border-blue-200',
      btn: 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs',
      icon: CheckCircle2,
    },
  }[variant];

  const Icon = iconConfig.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-in zoom-in-95 duration-150">
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className={`p-3 rounded-xl border ${iconConfig.bg}`}>
              <Icon className="w-6 h-6" />
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-4 space-y-2">
            <h3 className="text-lg font-bold font-display text-slate-900">
              {title}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {message}
            </p>
          </div>

          {showInput && (
            <div className="mt-4">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Reason / Internal Comment
              </label>
              <textarea
                value={inputValue}
                onChange={(e) => onInputChange?.(e.target.value)}
                placeholder={inputPlaceholder}
                rows={3}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
              />
            </div>
          )}

          <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors disabled:opacity-50"
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all disabled:opacity-50 ${iconConfig.btn}`}
            >
              {isLoading ? 'Processing...' : confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
