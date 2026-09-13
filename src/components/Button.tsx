import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs font-semibold gap-1.5 min-h-[36px]',
    md: 'px-4 py-2.5 text-sm font-semibold gap-2 min-h-[44px]',
    lg: 'px-6 py-3 text-base font-bold gap-2.5 min-h-[48px]',
  };

  const variantClasses = {
    primary:
      'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm shadow-emerald-600/20 focus:ring-emerald-500 border border-emerald-600',
    secondary:
      'bg-slate-900 text-white hover:bg-slate-800 shadow-sm focus:ring-slate-900 border border-slate-900',
    outline:
      'bg-white text-slate-700 hover:bg-slate-50 border border-slate-300 focus:ring-emerald-500 hover:border-slate-400',
    ghost:
      'bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-300',
    danger:
      'bg-red-600 text-white hover:bg-red-700 shadow-sm focus:ring-red-500 border border-red-600',
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
