import React from 'react';
import { Loader2 } from 'lucide-react';

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  text,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-7 h-7',
    lg: 'w-10 h-10',
  };

  return (
    <div className={`flex flex-col items-center justify-center p-8 gap-3 ${className}`}>
      <Loader2 className={`${sizeClasses[size]} animate-spin text-emerald-600`} />
      {text && <p className="text-xs font-semibold text-slate-500">{text}</p>}
    </div>
  );
};
